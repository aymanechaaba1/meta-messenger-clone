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
import { dark } from '@clerk/themes';

function Header() {
  return (
    <div className="flex justify-between container py-3">
      <Image
        src={`https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/640px-Facebook_Messenger_logo_2020.svg.png`}
        width={50}
        height={50}
        alt="messenger logo"
        className="object-cover"
      />
      <div>
        <SignedOut>
          <Button className="">
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox:
                  'w-[40px] h-[40px] object-cover border-2 border-gray-200 bg-transparent',
              },
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
