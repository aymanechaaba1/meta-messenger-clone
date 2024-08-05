'use server';

import { serverPusher } from '@/lib/pusher';

export async function sendMessage(formData: FormData) {
  'use server';

  let data = Object.fromEntries(formData.entries()) as { message: string };
  if (!data.message) return;

  console.log(data.message);

  serverPusher.trigger('my-channel', 'my-event', {
    message: data.message,
  });
}
