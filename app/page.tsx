import Chat from '@/components/Chat';
import redis from '@/lib/redis';
import { getServerSession } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export default async function Home() {
  const messages: Message[] = await redis.lrange('messages', 0, -1);
  const session = await getServerSession();

  return (
    <>
      {/* @ts-ignore */}
      <Chat session={session} messages={messages} />
    </>
  );
}
