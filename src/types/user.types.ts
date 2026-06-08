export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "customer" | "admin";
  isActive: boolean;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
