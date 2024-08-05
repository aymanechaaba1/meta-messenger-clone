import { pusher } from '@/lib/pusher';
import { ReactNode, useEffect, useState } from 'react';

function Chat({ children }: { children: Readonly<ReactNode> }) {
  return <div className="">{children}</div>;
}

export default Chat;
