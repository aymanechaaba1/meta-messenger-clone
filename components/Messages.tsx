import { useEffect, useRef } from 'react';
import Message from './Message';

type Props = {
  optimisticMessages: Message[];
};

function Messages({ optimisticMessages }: Props) {
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change or component mounts
    if (chatMessagesRef.current) {
      chatMessagesRef.current!.scrollTop =
        chatMessagesRef.current?.scrollHeight;
    }
  }, [optimisticMessages]);

  return (
    <div
      className="flex-1 flex gap-4 flex-col overflow-scroll p-5"
      ref={chatMessagesRef}
    >
      {optimisticMessages.map((message) => (
        <Message key={message.message_id} message={message} />
      ))}
    </div>
  );
}

export default Messages;
