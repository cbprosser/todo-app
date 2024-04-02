import { Simplify } from 'type-fest';

export type AuthenticationBody = {
  username: string;
  password: string;
};

export type SignupBody = {
  username: string;
  email: string;
  password: string;
};

export type ForgotBody = {
  email: string;
};

export type RecoverBody = {
  password: string;
}

export type StringUser = {
  userId: string;
  username: string;
  email: string;
  joined: string;
};

export type StringList = {
  listId: string;
  title: string;
  created: string;
  count: number;
  description?: string;
  items?: StringItem[];
};

export type StringItem = {
  listItemId: string;
  description: string;
  created: string;
};
