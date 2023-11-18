import { createContext, useState, useContext } from 'react';
import { useSignInMutation, useSignUpMutation } from '@/api';
import { Loader } from '@/components/Loader/Loader';

export const AuthContext = createContext<{
  user: any;
  setUser: (value: unknown) => void;
  signIn: (email: string, password: string) => void;
}>({
  user: null,
  setUser: () => {},
  signIn: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [signInFetch, { isLoading: sigInLoading, error: signInError }] =
    useSignInMutation();

  const [signUpFetch, { isLoading: sigUpLoading, error: signUpError }] =
    useSignUpMutation();

  const signIn = async (email: string, password: string) => {
    console.log({ email, password });
    try {
      const { user } = await signInFetch({ email, password }).unwrap();
    } catch (e) {
      console.log({ e });
    }
  };

  const isLoading = sigInLoading || sigUpLoading;
  return (
    <AuthContext.Provider value={{ user, setUser, signIn }}>
      {/*<Loader />*/}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
