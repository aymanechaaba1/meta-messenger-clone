'use client';

import { sendMessage } from '@/actions/actions';
import redis from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import { experimental_useOptimistic as useOptimistic } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  messages: Message[];
};

function ChatInput() {
  return (
    <form
      action={async (formData: FormData) => {
        const content = formData.get('content') as string;
        if (!content) return;

        const message_id = uuidv4();
        const newMessage = {
          message_id,
          content,
          created_at: await redis.time(),
          profile_pic: 'https://avatars.githubusercontent.com/u/125804169?v=4',
          username: 'Aymane Chaaba',
          email: 'aymanechaaba@gmail.com',
        };

        // optimistic stuff

        // add message to redis db (server stuff)
        // await sendMessage(newMessage);
      }}
      className="flex py-2 bg-white gap-4"
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
  );
}

export default ChatInput;
