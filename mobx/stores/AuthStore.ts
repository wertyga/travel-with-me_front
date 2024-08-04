import Toast from 'react-native-toast-message';
import {
  changeEmail as changeEmailApi, oauthGoogleRegister,
  recoveryPassword as recoveryPasswordApi,
  recoveryPasswordInit as recoveryPasswordInitApi,
  signInRequest,
  signUpRequest,
} from '@/api';
import { withLoading } from '@/mobx/store.utils';
import { action, makeObservable, observable } from 'mobx';
import { storage } from '@/utils';
import { RootStoreType } from '@/types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
      this.rootStore.subscriptionStore.dropStore();
      
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
    try {
      await storage.delete('token');
      
      this.rootStore.userStore.dropStore();
      this.rootStore.subscriptionStore.dropStore();
      
      const googleUser = GoogleSignin.getCurrentUser();
      if (googleUser) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
    } catch (e) {
    }
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
  
  @withLoading async oauthGoogleRegister(...data: Parameters<typeof oauthGoogleRegister>) {
    try {
      const { user } = await oauthGoogleRegister(...data);
   
      this.rootStore.userStore.setUser(user);
      this.rootStore.subscriptionStore.dropStore();
      
      if (this.rootStore.routerStore.navigator.canGoBack()) {
        this.rootStore.routerStore.navigator.goBack();
      }
      
    } catch (e) {}
  }
}
