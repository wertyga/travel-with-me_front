import { baseQuery } from '@/app/query';

import { getIsNetConnected } from '@/utils/etc';

export const sendLogs = async (data: any): Promise<void> => {
  if (!getIsNetConnected()) return;

  try {
    await baseQuery({
      method: 'post',
      url: '/logs',
      data,
    });
  } catch (e) {}
};
