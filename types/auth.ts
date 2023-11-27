import { User } from './user';

export enum USER_TAGS {
  List = 'User.List',
  User = 'User',
  Self = 'Self',
}

export type AuthCommonRequest = {
  email: string;
  password: string;
  username?: string;
};

export type AuthContextType = {
  user?: User;
  setUser: (user: User) => void;
  signIn: (data: AuthCommonRequest) => Promise<{
    user?: User;
    error?: { message: string; statusCode: number };
  }>;
  logout: () => void;
  signUp: (data: AuthCommonRequest) => Promise<boolean>;
};

export type ChangeEmailRequest = {
  newEmail: string;
  password: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type OauthGoogleRequest = {
  accessToken: string;
  tokenType: string;
};

export type OauthFacebookRequest = {
  accessToken: string;
};

export type UserResponse = {
  user: User;
};

export type SignUpRequest = {
  username: string;
  password: string;
  email: string;
};

export type RecoveryPasswordInitRequest = {
  email: string;
};

export type RecoveryPasswordRequest = {
  email: string;
  token: string;
  password: string;
};
