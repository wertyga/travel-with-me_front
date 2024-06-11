import Toast from 'react-native-toast-message';
import {
  changeEmail as changeEmailApi,
  recoveryPassword as recoveryPasswordApi,
  recoveryPasswordInit as recoveryPasswordInitApi,
  signInRequest,
  signUpRequest,
} from '@/api';
import { withLoading } from '@/mobx/store.utils';
import { action, makeObservable, observable } from 'mobx';
import { storage } from '@/utils';
import { RootStoreType } from '@/types';

export class AuthStore {
  @observable isLoading: boolean;
  @observable isInitialLoading: boolean;

  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }

  @withLoading async signIn(...data: Parameters<typeof signInRequest>) {
    try {
      const { user } = await signInRequest(...data);
      this.rootStore.userStore.setUser(user);

      return !!user;
    } catch (e) {
      console.error(e);
    }
  }

  @withLoading async signUp(
    ...data: Parameters<typeof signUpRequest>
  ): Promise<boolean> {
    try {
      const isSuccess = await signUpRequest(...data);

      if (isSuccess) {
        Toast.show({
          type: 'success',
          text1: 'Check your e-mail for confirmation',
        });
      }

      return isSuccess;
    } catch (e) {}
  }

  @action async logout() {
    await storage.delete('token');

    this.rootStore.userStore.dropStore();
    this.rootStore.subscriptionStore.dropStore();
  }

  @withLoading async changeEmail(...data: Parameters<typeof changeEmailApi>) {
    try {
      const response = await changeEmailApi(...data);
      
      return response;
    } catch (e) {}
  }

  @withLoading async recoveryPasswordInit(
    ...data: Parameters<typeof recoveryPasswordInitApi>
  ) {
    try {
      const response = await recoveryPasswordInitApi(...data);
    
      return response;
    } catch (e) {}
  }

  @withLoading async recoveryPassword(
    ...data: Parameters<typeof recoveryPasswordApi>
  ) {
    try {
      const response = await recoveryPasswordApi(...data);

      return response
    } catch (e) {}
  }
}
