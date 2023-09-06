import { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import ChatInput from '@/components/ChatInput';

export const metadata: Metadata = {
  title: 'Meta Messenger Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <main className="flex flex-col h-screen">{children}</main>
      </body>
    </html>
  );
}
