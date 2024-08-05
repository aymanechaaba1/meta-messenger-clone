interface ChatRoom {
  chat_room_id: string;
  chat_room_name: string;
  chat_room_desc?: string;
  chat_room_img?: string;
}

interface Chat {
  chat_id: string;
  messages_id: string[]; // foreign key
  users_id: string[]; // foreign key
}

interface Message {
  message_id?: string;
  created_at?: number;
  content: string;
  user: User;
  chat_room_id: string;
}

interface User {
  user_id?: string;
  name: string;
  email: string;
  profile_pic?: string | '';
}
