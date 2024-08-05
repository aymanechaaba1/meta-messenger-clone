import ServerPusher from 'pusher';
import Pusher from 'pusher-js';

export const serverPusher = new ServerPusher({
  appId: '1844939',
  key: '634c0764ea342e8d4df8',
  secret: process.env.PUSHER_SECRET!,
  cluster: 'eu',
  useTLS: true,
});

export const pusher = new Pusher('634c0764ea342e8d4df8', {
  cluster: 'eu',
});
