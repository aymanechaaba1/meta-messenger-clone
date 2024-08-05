import Image from 'next/image';
import Link from 'next/link';

type Props = {
  chatRoom: ChatRoom;
};

function ChatRoomPreview({ chatRoom }: Props) {
  return (
    <Link prefetch={false} href={`/chat-room/${chatRoom.chat_room_id}`}>
      <div className="rounded-lg border shadow-lg p-4">
        {chatRoom.chat_room_img && (
          <Image
            src={chatRoom.chat_room_img!}
            alt={chatRoom.chat_room_name}
            width={40}
            height={40}
            className="rounded-full object-cover w-14 h-14 mb-2"
          />
        )}

        <h1 className="font-medium">{chatRoom.chat_room_name}</h1>
        {chatRoom.chat_room_desc && (
          <p className="text-sm">{chatRoom.chat_room_desc}</p>
        )}
      </div>
    </Link>
  );
}

export default ChatRoomPreview;
