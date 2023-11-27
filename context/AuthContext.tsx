import { createContext, useState, useContext, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useGetSelfQuery, useSignInMutation, useSignUpMutation } from '@/api';
import { AuthCommonRequest, AuthContextType } from '@/types';
import { User } from '@/types/user';
import { Loader } from '@/components/Loader';
import Toast from 'react-native-toast-message';
import { storage } from '@/utils';
import { SafeLoader } from '@/components/SafeLoader';

export const AuthContext = createContext<AuthContextType>({
  setUser: () => {},
  signIn: (() => {}) as any,
  logout: () => {},
  signUp: () => false as any,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [token, setToken] = useState(null);

  const [signInFetch, { isLoading: sigInLoading }] = useSignInMutation();
  const [signUpFetch, { isLoading: sigUpLoading }] = useSignUpMutation();
  const {
    data: userSelf,
    isFetching: selfFetching,
    error: fetchSelfError,
  } = useGetSelfQuery(undefined, {
    skip: !token,
  });

  const signIn = async ({ email, password }: AuthCommonRequest) => {
    const { data, error } = await signInFetch({ email, password });

    if (data?.user) {
      storage.set('token', data.user.token);
      setUser(data.user);
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
    storage.delete('token');
    setToken(null);
    setUser(null);
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

  const isLoading = sigInLoading || sigUpLoading;
  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signUp, logout }}>
      {children}
      {isLoading && <Loader />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
