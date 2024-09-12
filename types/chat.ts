import { User } from './user';

export type ChatMessage = {
  _id: string;
  from: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  hasRead: boolean;
};

export type Chat = {
  _id: string;
  from: User;
  to: User;
  messages: ChatMessage[];
  lastMessage: ChatMessage;
  hasChatUnreadMessage: boolean;
};
