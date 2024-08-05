import { pusher } from '@/lib/pusher';
import { ReactNode, useEffect, useState } from 'react';

function Chat({ children }: { children: Readonly<ReactNode> }) {
  return <>{children}</>;
}

export default Chat;
