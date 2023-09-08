import { redisTime } from '@/utils/helpers';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import TimeAgo from 'react-timeago';

type Props = {
  message: Message;
};

function Message({ message }: Props) {
  const { data: session } = useSession();

  const isUser = session?.user?.email === message.user.email;

  return (
    <div
      key={message.message_id}
      className={`flex ${isUser && 'flex-row-reverse'} gap-2`}
    >
      <Image
        src={message.user?.profile_pic!}
        alt={message.user?.username}
        width={40}
        height={40}
        className="rounded-full object-cover w-14 h-14"
      />
      <div className="space-y-1">
        <p
          className={`text-xs text-slate-500 ${
            isUser ? 'text-right' : 'text-left'
          }`}
        >
          {message.user?.username}
        </p>
        <p
          className={`${
            isUser ? 'bg-blue-400' : 'bg-orange-400'
          }  py-2 px-3 rounded-lg text-slate-100`}
        >
          {message.content}
        </p>
        <small
          className={`text-slate-500 opacity-90 ${
            isUser ? 'float-right' : 'float-left'
          }`}
        >
          <TimeAgo date={new Date()} />
        </small>
      </div>
    </div>
  );
}

export default Message;
