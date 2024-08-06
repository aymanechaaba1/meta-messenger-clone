'use server';

import { serverPusher } from '@/lib/pusher';

export async function triggerTyping() {
  serverPusher.trigger('my-channel', 'typing', null);
}
