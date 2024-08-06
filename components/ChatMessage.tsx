'use client';

import { pusher } from '@/lib/pusher';
import { useEffect, useRef, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import * as timeago from 'timeago.js';

export type Message = {
  id: string;
  message: string;
  userId: string;
  timestamp: number;
};

function ChatMessage({ _messages }: { _messages: Message[] }) {
  let [messages, setMessages] = useState<Message[]>(_messages);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();
  let scrollTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });

    return () => {
      channel.unsubscribe();
      pusher.unsubscribe('my-channel');
    };
  }, [messages, pusher]);

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
                src={user?.imageUrl!}
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
