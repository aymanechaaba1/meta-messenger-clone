'use client';

import Image from 'next/image';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { FaFacebookMessenger } from 'react-icons/fa';
import { Button } from './ui/button';

function Header() {
  return (
    <div className="flex justify-between container">
      <FaFacebookMessenger size={30} />
      <div>
        <SignedOut>
          <Button className="">
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
