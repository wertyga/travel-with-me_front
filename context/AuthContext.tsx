import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import {
  guideApi,
  subscriptionApi,
  useGetSelfQuery,
  useSignInMutation,
  useSignUpMutation,
  userApi,
} from '@/api';
import {
  GUIDE_SIGNINOUT_TAGS,
  SUBSCRIPTION_SIGNINOUT_TAGS,
  USER_SIGNINOUT_TAGS,
} from '@/app/query/base-api';
import { storage } from '@/utils';
import { AuthCommonRequest } from '@/types';
import { User } from '@/types/user';

export type AuthContextType = {
  user?: User;
  signIn: (data: AuthCommonRequest) => Promise<{
    user?: User;
    error?: { message: string; statusCode: number };
  }>;
  logout: () => void;
  signUp: (data: AuthCommonRequest) => Promise<boolean>;
  isLoading: boolean;
  sigUpLoading: boolean;
  sigInLoading: boolean;
  resetSignInOutTags: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: (() => {}) as any,
  logout: () => {},
  resetSignInOutTags: () => {},
  signUp: () => false as any,
  isLoading: false,
  sigUpLoading: false,
  sigInLoading: false,
});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    user: undefined,
    token: null,
    loading: false,
  });

  const [signInFetch, { isLoading: sigInLoading }] = useSignInMutation();
  const [signUpFetch, { isLoading: sigUpLoading }] = useSignUpMutation();
  const {
    data: userSelf,
    isFetching: selfFetching,
    error: fetchSelfError,
  } = useGetSelfQuery(undefined, {
    skip: !state.token,
  });

  const isLoading = selfFetching || state.loading;

  const resetSignInOutTags = () => {
    dispatch(guideApi.util.invalidateTags(GUIDE_SIGNINOUT_TAGS));
    dispatch(userApi.util.invalidateTags(USER_SIGNINOUT_TAGS));
    dispatch(subscriptionApi.util.invalidateTags(SUBSCRIPTION_SIGNINOUT_TAGS));
  };

  const signIn = async ({ email, password }: AuthCommonRequest) => {
    const { data, error } = await signInFetch({ email, password });

    if (data?.user) {
      storage.set('token', data.user.token);
      setState(prev => ({ ...prev, user: data.user, token: data.user.token }));
      resetSignInOutTags();
    }

    return { user: data?.user, error };
  };

  const signUp = async ({ email, password, username }: AuthCommonRequest) => {
    const { data } = await signUpFetch({ email, password, username });
    if (data?.success) {
      Toast.show({
        type: 'success',
        text1: 'Check your e-mail for confirmation',
      });
    }

    return !!data?.success;
  };

  const logout = async () => {
    setState(prev => ({ ...prev, loading: true }));

    setTimeout(() => {
      storage.delete('token');
      setState(prev => ({
        ...prev,
        user: undefined,
        token: null,
        loading: false,
      }));
    });
    setTimeout(() => {
      resetSignInOutTags();
    });
  };

  useEffect(() => {
    storage.get('token').then(token => {
      if (!token) return;
      setState(prev => ({ ...prev, token }));
    });
  }, []);

  useEffect(() => {
    if (!userSelf) return;

    setState(prev => ({ ...prev, user: userSelf }));
  }, [userSelf]);

  useEffect(() => {
    if (!fetchSelfError) return;

    logout();
  }, [fetchSelfError]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        signIn,
        signUp,
        logout,
        isLoading,
        sigUpLoading,
        sigInLoading,
        resetSignInOutTags,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
