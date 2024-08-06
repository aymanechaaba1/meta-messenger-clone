'use client';

import { pusher } from '@/lib/pusher';
import { useContext, useEffect, useRef, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import * as timeago from 'timeago.js';
import { TypingContext } from '@/providers/IsTypingProvider';
import { triggerTyping } from '@/actions/triggerTyping';
import { toast } from 'sonner';

export type Message = {
  id: string;
  message: string;
  userId: string;
  timestamp: number;
  imageUrl?: string;
};

function ChatMessage({ _messages }: { _messages: Message[] }) {
  let [messages, setMessages] = useState<Message[]>(_messages);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();
  let scrollTargetRef = useRef<HTMLDivElement>(null);
  // let typingContext = useContext(TypingContext);
  let [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    let channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data: Message) => {
      setMessages((prev) => [...prev, data]);
      // toast(
      //   <div className="flex items-center gap-x-2">
      //     {data.imageUrl && (
      //       <Image
      //         src={data.imageUrl}
      //         width={30}
      //         height={30}
      //         alt={data.userId}
      //         className="object-cover rounded-full"
      //       />
      //     )}
      //     <p>new message</p>
      //   </div>
      // );
      // toast(`new message from`);
    });

    scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });

    return () => {
      channel.unsubscribe();
      pusher.unsubscribe('my-channel');
    };
  }, [messages, pusher, isTyping, setIsTyping]);

  return (
    <div className={cn('space-y-4 flex flex-col my-3 container')}>
      {messages.map((message, i) => (
        <div key={message.id}>
          <p
            className={cn('text-right text-sm mb-2', {
              'text-left': message.userId !== userId,
            })}
          >
            {timeago.format(message.timestamp)}
          </p>
          <div
            className={cn('flex items-center justify-start w-full gap-x-2', {
              'justify-end': message.userId === userId,
            })}
          >
            {user?.imageUrl && (
              <Image
                src={message.imageUrl!}
                width={30}
                height={30}
                alt="user"
                className={cn('rounded-full object-cover', {
                  'order-2': message.userId === userId,
                })}
              />
            )}
            <p
              className={cn('text-white bg-gray-900 px-3 py-1 rounded-full', {
                'text-gray-900 bg-gray-200': message.userId !== userId,
              })}
            >
              {message.message}
            </p>
          </div>
        </div>
      ))}
      <div ref={scrollTargetRef} />
    </div>
  );
}

export default ChatMessage;
