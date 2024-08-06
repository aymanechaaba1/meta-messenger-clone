'use server';

import { Message } from '@/components/ChatMessage';
import { serverPusher } from '@/lib/pusher';
import redis from '@/lib/redis';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

export async function sendMessage(formData: FormData) {
  const { userId } = auth();
  if (!userId) return;

  let data = Object.fromEntries(formData.entries()) as { message: string };
  if (!data.message) return;

  let newMessage: Message = {
    id: uuidv4(),
    message: data.message,
    userId,
    timestamp: Date.now(),
  };

  serverPusher.trigger('my-channel', 'my-event', newMessage);

  await redis.lpush(`messages`, JSON.stringify(newMessage));

  revalidatePath('/');
}
