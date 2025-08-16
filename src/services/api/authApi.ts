import api from "./recipeApi";
import { User, ApiResponse } from "../../types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

export const authApi = {
  // User login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      credentials
    );
    return response.data.data;
  },

  // User registration
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      data
    );
    return response.data.data;
  },

  // User logout
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>("/auth/me");
    return response.data.data;
  },

  // Refresh token
  refreshToken: async (): Promise<{ token: string }> => {
    const response =
      await api.post<ApiResponse<{ token: string }>>("/auth/refresh");
    return response.data.data;
  },

  // Request password reset
  requestPasswordReset: async (data: PasswordResetRequest): Promise<void> => {
    await api.post("/auth/password-reset-request", data);
  },

  // Confirm password reset
  confirmPasswordReset: async (data: PasswordResetConfirm): Promise<void> => {
    await api.post("/auth/password-reset-confirm", data);
  },

  // Update user profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put<ApiResponse<User>>("/auth/profile", data);
    return response.data.data;
  },

  // Change password
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> => {
    await api.put("/auth/change-password", data);
  },

  // Upload avatar
  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await api.post<ApiResponse<{ avatarUrl: string }>>(
      "/auth/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data;
  },

  // Delete account
  deleteAccount: async (): Promise<void> => {
    await api.delete("/auth/account");
  },

  // Verify email
  verifyEmail: async (token: string): Promise<void> => {
    await api.post("/auth/verify-email", { token });
  },

  // Resend verification email
  resendVerificationEmail: async (): Promise<void> => {
    await api.post("/auth/resend-verification");
  },
};
