interface Room {
  id: string;
  title: string;
  message: Message;
}

interface Message {
  name: string;
  message: string;
  time: string;
}
