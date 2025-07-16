export function login(email: string, password: string): Promise<any>;

export interface RegisterData {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirm: string;
}

export function register(data: RegisterData): Promise<any>;
