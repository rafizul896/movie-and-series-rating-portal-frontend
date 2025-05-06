export interface IUser {
  name?: string;
  email?: string;
  password?: string;
  userId?: string;
  image?: string | null;
  role: string;
  iat: number;
  exp: number;
}
