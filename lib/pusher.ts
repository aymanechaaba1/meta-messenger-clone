import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

const serverPusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: 'eu',
  useTLS: true,
});

const clientPusher = new ClientPusher(process.env.PUSHER_KEY!, {
  cluster: process.env.PUSHER_CLUSTER!,
  forceTLS: true,
});

export { serverPusher, clientPusher };
