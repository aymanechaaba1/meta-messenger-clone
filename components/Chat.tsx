'use client';

import { sendMessage } from '@/actions/actions';
import Header from '@/components/Header';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import TimeAgo from 'react-timeago';

import {
  useEffect,
  experimental_useOptimistic as useOptimistic,
  useRef,
} from 'react';
import { clientPusher } from '@/lib/pusher';
import { SessionProvider, useSession } from 'next-auth/react';
import redis from '@/lib/redis';
import { Session } from 'next-auth';
import Message from './Message';

type Props = {
  messages: Message[];
  session: Session;
};

function Chat({ session, messages }: Props) {
  // const { data: session, status } = useSession();

  const currentUser: User = {
    email: session?.user?.email as string,
    username: session?.user?.name as string,
    profile_pic: session.user?.image as string,
  };

  const formRef = useRef<HTMLFormElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[]>(
    messages,
    // @ts-ignore
    (state: Message[], newMessage: Message) => [...state, newMessage]
  );

  useEffect(() => {
    // Scroll to the bottom when messages change or component mounts
    if (chatMessagesRef.current) {
      chatMessagesRef.current!.scrollTop =
        chatMessagesRef.current?.scrollHeight;
    }
  }, [optimisticMessages]);

  useEffect(() => {
    // const channel = clientPusher.subscribe('messages');
    // channel.bind('new-message', async (message: Message) => {
    //   addOptimisticMessage(message);
    // });
    // return () => {
    //   clientPusher.unsubscribe('messages');
    //   channel.unbind('new-message');
    // };
  }, []);

  return (
    <>
      <Header user={currentUser} />
      <div
        className="flex gap-4 flex-col flex-1 overflow-scroll p-5"
        ref={chatMessagesRef}
      >
        {optimisticMessages.map((message) => (
          <SessionProvider>
            <Message message={message} />
          </SessionProvider>
        ))}
      </div>
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          const content = formData.get('content') as string;
          if (!content) return;
          if (!session) return;

          const newMessage: Message = {
            message_id: uuidv4(),
            content,
            created_at: await redis.time(),
            user: {
              email: session?.user?.email!,
              username: session.user?.name!,
              profile_pic: session?.user?.image!,
            },
          };

          // optimistic stuff
          addOptimisticMessage(newMessage);

          // reset form
          formRef.current?.reset();

          // add message to redis db (server stuff)
          await sendMessage(newMessage);
        }}
        className="flex py-2 bg-white gap-4 px-5"
        autoComplete="off"
      >
        <input
          type="text"
          placeholder="type a message..."
          name="content"
          className="flex-1 outline-none rounded-lg border px-3"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white text-center rounded-lg hover:shadow-lg py-2 px-5"
        >
          Send
        </button>
      </form>
    </>
  );
}

export default Chat;
