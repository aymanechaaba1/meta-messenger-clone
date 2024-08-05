import { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import ChatInput from '@/components/ChatInput';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Meta Messenger Clone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            'min-h-screen flex flex-col bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <Header />
          {children}
          <ChatInput />
        </body>
      </html>
    </ClerkProvider>
  );
}
