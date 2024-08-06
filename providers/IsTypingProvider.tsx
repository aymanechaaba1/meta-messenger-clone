'use client';

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type TypingContext = {
  isTyping: boolean;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
};
export const TypingContext = createContext<TypingContext | null>(null);

function IsTypingProvider({ children }: { children: Readonly<ReactNode> }) {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  return (
    <TypingContext.Provider value={{ isTyping, setIsTyping }}>
      {children}
    </TypingContext.Provider>
  );
}

export default IsTypingProvider;
