'use client';

import { sendMessage } from '@/actions/actions';
import Header from '@/components/Header';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

import {
  useEffect,
  experimental_useOptimistic as useOptimistic,
  useRef,
} from 'react';
import { clientPusher } from '@/lib/pusher';

type Props = {
  messages: Message[];
};

function Chat({ messages }: Props) {
  const isUser = true;
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[]>(
    messages,
    // @ts-ignore
    (state: Message[], newMessage: Message) => [...state, newMessage]
  );

  useEffect(() => {
    const channel = clientPusher.subscribe('messages');
    // channel.bind('new-message', async (message: Message) => {
    // addOptimisticMessage(message);
    // });
    // return () => {
    //   clientPusher.unsubscribe('messages');
    //   channel.unbind('new-message');
    // };

    return () => {
      clientPusher.unsubscribe('messages');
    };
  }, [clientPusher]);

  const redisTime = (seconds: number) => new Date(seconds * 1000);

  return (
    <>
      <Header />
      <div className="space-y-4 flex-1 overflow-scroll p-5">
        {optimisticMessages.map((message) => (
          <div
            key={message.message_id}
            className={`flex ${isUser && 'flex-row-reverse'} gap-2`}
          >
            <Image
              src={message.profile_pic}
              alt="profile_pic"
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            <div className="space-y-1">
              <p
                className={`text-xs text-slate-500 ${
                  isUser ? 'text-right' : 'text-left'
                }`}
              >
                {message.username}
              </p>
              <p
                className={`${
                  isUser ? 'bg-blue-400' : 'bg-orange-600'
                }  py-2 px-3 rounded-lg text-slate-100`}
              >
                {message.content}
              </p>
              <small
                className={`text-slate-500 opacity-90 ${
                  isUser ? 'float-right' : 'float-left'
                }`}
              >
                {new Intl.DateTimeFormat('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                }).format(new Date(Date.now()))}
              </small>
            </div>
          </div>
        ))}
      </div>
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          const content = formData.get('content') as string;
          if (!content) return;

          const newMessage: Message = {
            message_id: uuidv4(),
            content,
            created_at: Date.now(),
            profile_pic:
              'https://avatars.githubusercontent.com/u/125804169?v=4',
            username: 'Aymane Chaaba',
            email: 'aymanechaaba@gmail.com',
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
