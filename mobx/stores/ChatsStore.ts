import { computed, makeObservable, observable, runInAction } from 'mobx';

import { fetchChatByUser, fetchMyChats, sendMessage as sendMessageApi } from '@/api';

import { Chat, RootStoreType } from '@/types';
import { withLoading } from '@/mobx/store.utils';

export class ChatsStore {
  @observable isLoading = false;
  @observable myChats: Chat[] = [];
  
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
  
   async getMyChats() {
    try {
      const chats = await fetchMyChats();

      runInAction(() => {
        this.myChats = chats;
      });
    } catch (e) {
      return [];
    }
  }
  
  @computed get myChatsCount() {
    return this.myChats.length;
  }
}
