import { v4 as uuidv4 } from 'uuid';
import ChatRoomPreview from './ChatRoomPreview';

const chatRooms: ChatRoom[] = [
  {
    chat_room_id: uuidv4(),
    chat_room_name: 'Barcelona',
    chat_room_desc:
      'Let`s talk about the latest news for barcelona, champions league and so much more...',
    chat_room_img:
      'https://play-lh.googleusercontent.com/ue88El81ZXdm4YPNcsn3No7VYnh9ZEWwJYNbCTxM6_K1cLfpezsLS6fOxwQR1Z9kEms',
  },
  {
    chat_room_id: uuidv4(),
    chat_room_name: 'Real Madrid',
    chat_room_desc:
      'Let`s talk about rma and the latest news about transfers, goalkeepers and so much more...',
    chat_room_img:
      'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png',
  },
  {
    chat_room_id: uuidv4(),
    chat_room_name: 'NFL',
    chat_room_desc:
      '2023 NFL season, Week 1: What We Learned from Lions knocking off Chiefs in Kickoff Game',
  },
  {
    chat_room_id: uuidv4(),
    chat_room_name: 'Masterson',
    chat_room_desc:
      'Actor Danny Masterson sentenced to 30 years to life in prison for rape',
  },
];

type Props = {
  chatRooms: ChatRoom[] | undefined;
};

function ChatRooms({ chatRooms }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-5 gap-4">
      {chatRooms?.map((chatRoom) => (
        <ChatRoomPreview key={chatRoom.chat_room_id} chatRoom={chatRoom} />
      ))}
    </div>
  );
}

export default ChatRooms;
