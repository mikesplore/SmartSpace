import axios from "axios"
import { API_BASE_URL } from "./baseUrl"

// API interfaces based on the swagger documentation
export interface RegisterData {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirm: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    email: string;
    access_token: string;
    refresh_token: string;
}

export interface RegisterResponse {
    message: string;
}

export interface PasswordResetData {
    email: string;
}

export interface SetNewPasswordData {
    password: string;
    password_confirm: string;
    uidb64: string;
    token: string;
}

export interface OTPVerificationData {
    otp: string;
}

// Login user
export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login/`, data);
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Register user  
export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register/`, data);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

// Logout user
export const logoutUser = async (refreshToken: string): Promise<void> => {
    try {
        await axios.post(`${API_BASE_URL}/users/logout/`, {
            refresh_token: refreshToken
        });
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

// Password reset request
export const requestPasswordReset = async (data: PasswordResetData): Promise<void> => {
    try {
        await axios.post(`${API_BASE_URL}/users/password-reset/`, data);
    } catch (error) {
        console.error('Password reset request error:', error);
        throw error;
    }
};

// Confirm password reset
export const confirmPasswordReset = async (uidb64: string, token: string): Promise<void> => {
    try {
        await axios.get(`${API_BASE_URL}/users/password-reset-confirm/${uidb64}/${token}/`);
    } catch (error) {
        console.error('Password reset confirm error:', error);
        throw error;
    }
};

// Set new password
export const setNewPassword = async (data: SetNewPasswordData): Promise<void> => {
    try {
        await axios.patch(`${API_BASE_URL}/users/set-new-password/`, data);
    } catch (error) {
        console.error('Set new password error:', error);
        throw error;
    }
};

// Verify email with OTP
export const verifyEmail = async (data: OTPVerificationData): Promise<{ message: string }> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/verify-email/`, data);
        return response.data;
    } catch (error) {
        console.error('Email verification error:', error);
        throw error;
    }
};

// Refresh token function
export const refreshToken = async (refresh: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh
        });
        return response.data;
    } catch (error) {
        console.error('Token refresh error:', error);
        throw error;
    }
};

// Legacy functions for backward compatibility
export const login = loginUser;
export const register = registerUser;

export default {
    loginUser,
    registerUser,
    logoutUser,
    requestPasswordReset,
    confirmPasswordReset,
    setNewPassword,
    verifyEmail,
    refreshToken,
    // Legacy exports
    login,
    register
};