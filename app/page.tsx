'use client';

import Chat from '@/components/Chat';
import { clientPusher } from '@/lib/pusher';
import redis from '@/lib/redis';
import {
  experimental_useOptimistic as useOptimistic,
  useEffect,
  useState,
} from 'react';

export default async function Home() {
  const messages: Message[] = await redis.lrange('messages', 0, -1);

  return (
    <>
      <Chat messages={messages} />
    </>
  );
}
