interface User {
  email: string;
  username: string;
  profile_pic?: string | '';
}

interface Message {
  message_id: string;
  content: string;
  created_at: Promise;
  user: User;
}
