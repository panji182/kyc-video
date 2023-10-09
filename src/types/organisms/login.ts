export interface Users {
  username: string;
  password: string;
  role: string;
}

export type Login = {
  users: Users[];
  secretKey: string;
};
