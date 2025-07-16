import axios from "axios"
import { API_BASE_URL } from "./baseUrl"

export interface RegisterData {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirm: string;
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, {
            email,
            password
        });
        console.log("Login successful:", response.data);
        return response.data; // Return server response data
    } catch (error: any) {
        console.log("Login error:", error);
        if (error.response) {
            return error.response.data;
        }
        throw error;
    }
};

// Register API
export const register = async (data: RegisterData) => {
    // data: { email, first_name, last_name, password, password_confirm }
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, data);
        console.log("Register successful:", response.data);
        return response.data;
    } catch (error: any) {
        console.log("Register error:", error);
        if (error.response) {
            return error.response.data;
        }
        throw error;
    }
};

export default login;