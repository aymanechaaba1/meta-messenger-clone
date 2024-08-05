import Chat from '@/components/Chat';
import redis from '@/lib/redis';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Server } from 'socket.io';
import { createServer } from 'http';
import ChatInput from '@/components/ChatInput';
import ChatMessage, { type Message } from '@/components/ChatMessage';

export default async function Home() {
  let { userId } = auth();
  let messagesJSON = await redis.lrange(`messages`, 0, -1);
  let messages = messagesJSON.map((message) =>
    JSON.parse(message)
  ) as Message[];

  return (
    <div>
      {userId && (
        <Chat>
          <ChatMessage _messages={messages} />
        </Chat>
      )}
    </div>
  );
}
