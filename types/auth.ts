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
  signIn: (data: AuthCommonRequest) => void;
  signUp: (data: AuthCommonRequest) => Promise<boolean>;
};

export type ChangeEmailRequest = {
  newEmail: string;
  redirectUrl: string;
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
  redirectUrl: string;
};

export type RecoveryPasswordInitRequest = {
  email: string;
  redirectUrl: string;
};

export type RecoveryPasswordRequest = {
  token: string;
  password: string;
  confirmPassword: string;
};
