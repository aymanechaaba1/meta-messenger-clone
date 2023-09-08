'use server';

import { serverPusher } from '@/lib/pusher';
import redis from '@/lib/redis';
import { revalidatePath } from 'next/cache';

export const sendMessage = async (message: Message) => {
  try {
    await redis.rpush('messages', JSON.stringify(message));
    // pusher
    serverPusher.trigger('messages', 'new-message', JSON.stringify(message));
  } catch (err) {
    return err;
  } finally {
    revalidatePath('/');
  }
};
