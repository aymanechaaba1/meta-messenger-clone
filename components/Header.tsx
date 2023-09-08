import { DefaultSession, getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

type Props = {
  user: User;
};

function Header({ user }: Props) {
  return (
    <div className="py-5 flex justify-between shadow-lg px-5 bg-gray-100">
      <Image
        src={`https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png`}
        width={50}
        height={50}
        alt="META LOGO"
        className="object-contain"
      />
      <div className="space-y-1">
        <h2 className="text-sm text-right text-slate-600">Logged in as:</h2>
        <div className="flex items-center gap-3">
          <form action="">
            <button
              formAction={() => signOut()}
              className="bg-blue-500 text-white text-center rounded-lg hover:shadow-lg py-2 px-3"
            >
              Logout
            </button>
          </form>

          <Image
            src={user.profile_pic!}
            alt={user.username}
            width={50}
            height={50}
            className="object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
