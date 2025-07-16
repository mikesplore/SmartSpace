import axios from "axios"
import { API_BASE_URL } from "./baseUrl"

export interface RegisterData {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirm: string;
}

export interface LoginResponse {
    email: string;
    access_token: string;
    refresh_token: string;
}

export interface RegisterResponse {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_BASE_URL}/users/login/`, {
            email,
            password
        });
        console.log("Login successful:", response.data);
        return response.data;
    } catch (error: any) {
        console.log("Login error:", error);
        if (error.response) {
            throw new Error(error.response.data.detail || 'Login failed');
        }
        throw error;
    }
};

// Register API
export const register = async (data: RegisterData): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>(`${API_BASE_URL}/users/register/`, data);
        console.log("Register successful:", response.data);
        return response.data;
    } catch (error: any) {
        console.log("Register error:", error);
        if (error.response) {
            throw new Error(error.response.data.detail || 'Registration failed');
        }
        throw error;
    }
};

// Function to refresh the access token using refresh token
export const refreshToken = async (refresh_token: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/token/refresh/`, {
            refresh: refresh_token
        });
        return response.data;
    } catch (error) {
        console.error("Token refresh failed:", error);
        throw error;
    }
};

export default {
    login,
    register,
    refreshToken
};