import React, { useContext } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { IoIosSend } from 'react-icons/io';
import { sendMessage } from '@/actions/sendMessage';

function ChatInput() {
  return (
    <form
      action={sendMessage}
      className="flex items-center gap-x-5 container bg-transparent py-3"
    >
      <Input
        name="message"
        placeholder="type a message..."
        autoComplete="off"
        className="shadow-sm flex-1"
      />
      <Button type="submit" className="shadow-sm rounded-xl">
        <IoIosSend size={23} />
      </Button>
    </form>
  );
}

export default ChatInput;
