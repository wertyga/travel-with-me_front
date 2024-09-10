import { makeObservable, observable } from 'mobx';

import { fetchChatByUser, sendMessage as sendMessageApi } from '@/api';

import { RootStoreType } from '@/types';
import { withLoading } from '@/mobx/store.utils';

export class ChatsStore {
  @observable isLoading = false;
  
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }

  async getChatWithUser(withUserId: string, silentError?: boolean) {
    try {
      const chat = await fetchChatByUser({ withUserId, silentError });

      return chat;
    } catch (e) {}
  }
  
  @withLoading async sendMessage(data: { text: string; to: string; }) {
    try {
      const message = await sendMessageApi(data);

      return message;
    } catch (e) {
    
    }
  }
}
