import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { IoIosSend } from 'react-icons/io';
import { serverPusher } from '@/lib/pusher';
import { auth } from '@clerk/nextjs/server';
import redis from '@/lib/redis';
import { v4 as uuidv4 } from 'uuid';
import { Message } from './ChatMessage';

function ChatInput() {
  const { userId } = auth();

  async function sendMessage(formData: FormData) {
    'use server';

    let data = Object.fromEntries(formData.entries()) as { message: string };
    if (!data.message || !userId) return;

    let newMessage: Message = {
      id: uuidv4(),
      message: data.message,
      userId,
      timestamp: Date.now(),
    };

    serverPusher.trigger('my-channel', 'my-event', newMessage);

    await redis.lpush(`messages`, JSON.stringify(newMessage));
  }

  return (
    <form action={sendMessage} className="flex items-center gap-x-5 container">
      <Input
        name="message"
        placeholder="type a message..."
        autoComplete="off"
      />
      <Button type="submit">
        <IoIosSend size={23} />
      </Button>
    </form>
  );
}

export default ChatInput;
