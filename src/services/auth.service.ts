import { api } from "./api";
import type { User, AuthTokens, LoginPayload, RegisterPayload } from "@/types/user.types";
import type { ApiResponse } from "@/types/api.types";

export const authService = {
  login(payload: LoginPayload): Promise<ApiResponse<AuthTokens>> {
    return api.post<AuthTokens>("/auth/login", payload);
  },

  register(payload: RegisterPayload): Promise<ApiResponse<User>> {
    return api.post<User>("/auth/register", payload);
  },

  me(): Promise<ApiResponse<User>> {
    return api.get<User>("/auth/me");
  },

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
  },
};
