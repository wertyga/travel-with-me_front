import { User } from './user';

export type ChatMessage = {
  _id: string;
  from: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type Chat = {
  from: User;
  to: User;
  messages: ChatMessage[];
};
