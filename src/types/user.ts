export interface IUser {
  name: string;
  email: string;
  password: string;
  userId: string;
  image?: string | null;
}

// for data table uses

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export interface IUserType {
  id: string;
  name: string;
  profileImage?: string | null;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string; // or Date
  updatedAt: string; // or Date
}
