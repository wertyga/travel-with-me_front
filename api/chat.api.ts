import { baseQuery } from '@/app/query';

import { Chat } from '@/types';

export const fetchMyChats = async (params: {
  slug?: string;
  _id?: string;
  withPlaces?: boolean;
}): Promise<Chat[]> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/chat/my-chats',
  });

  return data;
};

export const fetchChat = async (params: { chatId: string }): Promise<Chat> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/chat/chat',
    params,
  });

  return data;
};

export const fetchChatByUser = async ({
  silentError,
  ...params
}: {
  withUserId: string;
  silentError?: boolean;
}): Promise<Chat> => {
  const { data } = await baseQuery({
    method: 'get',
    url: '/chat/user-chat',
    params,
    silentError,
  });

  return data;
};

export const sendMessage = async (body: {
  text: string;
  to: string;
}): Promise<Chat> => {
  const { data } = await baseQuery({
    method: 'post',
    url: '/chat/send-message',
    data: body,
  });

  return data;
};
