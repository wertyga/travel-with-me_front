import { createContext, useState, useContext, useEffect } from 'react';
import {
  guideApi,
  subscriptionApi,
  useGetSelfQuery,
  userApi,
  useSignInMutation,
  useSignUpMutation,
} from '@/api';
import { AuthCommonRequest, AuthContextType } from '@/types';
import { User } from '@/types/user';
import Toast from 'react-native-toast-message';
import { storage } from '@/utils';
import { SafeLoader } from '@/components/SafeLoader';
import { useDispatch } from 'react-redux';
import {
  baseApi,
  GUIDE_SIGNINOUT_TAGS,
  SIGNINOUT_VALIDATION_TAGS,
  SUBSCRIPTION_SIGNINOUT_TAGS,
  USER_SIGNINOUT_TAGS,
} from '@/app/query/base-api';

export const AuthContext = createContext<AuthContextType>({
  setUser: () => {},
  signIn: (() => {}) as any,
  logout: () => {},
  signUp: () => false as any,
  isLoading: false,
});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | undefined>();
  const [token, setToken] = useState(null);
  const [stateLoading, setStateLoading] = useState(false);

  // TODO: subscription
  // const { data: { subscription } = {} } = useGetMySubscriptionQuery(undefined, {
  //   skip: !user,
  // });
  const [signInFetch, { isLoading: sigInLoading }] = useSignInMutation();
  const [signUpFetch, { isLoading: sigUpLoading }] = useSignUpMutation();
  const {
    data: userSelf,
    isFetching: selfFetching,
    error: fetchSelfError,
  } = useGetSelfQuery(undefined, {
    skip: !token,
  });

  const resetSignInOutTags = () => {
    dispatch(guideApi.util.invalidateTags(GUIDE_SIGNINOUT_TAGS));
    dispatch(userApi.util.invalidateTags(USER_SIGNINOUT_TAGS));
    dispatch(subscriptionApi.util.invalidateTags(SUBSCRIPTION_SIGNINOUT_TAGS));
  };

  const signIn = async ({ email, password }: AuthCommonRequest) => {
    const { data, error } = await signInFetch({ email, password });

    if (data?.user) {
      storage.set('token', data.user.token);
      setUser(data.user);
      setToken(data.user.token);
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
    setStateLoading(true);

    setTimeout(() => {
      storage.delete('token');
      setToken(null);
      setUser(null);
      setStateLoading(false);
    });
    setTimeout(() => {
      resetSignInOutTags();
    });
  };

  useEffect(() => {
    storage.get('token').then(token => {
      if (!token) return;
      setToken(token);
    });
  }, []);

  useEffect(() => {
    if (!userSelf) return;

    setUser(userSelf);
  }, [userSelf]);

  useEffect(() => {
    if (!fetchSelfError) return;

    logout();
  }, [fetchSelfError]);

  if (selfFetching) {
    return <SafeLoader />;
  }

  const isLoading = sigInLoading || sigUpLoading || stateLoading;
  return (
    <AuthContext.Provider
      value={{ user, setUser, signIn, signUp, logout, isLoading }}
    >
      {children}
      {/*{isLoading && <Loader />}*/}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
