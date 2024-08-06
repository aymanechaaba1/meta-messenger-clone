'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { IoMdSend } from 'react-icons/io';
import { sendMessage } from '@/actions/sendMessage';
import { TypingContext } from '@/providers/IsTypingProvider';
import { triggerTyping } from '@/actions/triggerTyping';

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
      <button type="submit" className="shadow-sm rounded-xl">
        <IoMdSend size={30} />
      </button>
    </form>
  );
}

export default ChatInput;
