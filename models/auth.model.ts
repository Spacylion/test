export interface RegistrationData {
    password: string;
    login: string;
    locale: string;
    email: string;
    lastname: string;
    firstname: string;
    gmt?: number;
    phone?: string;
    jobtitle?: string;
}

export interface AuthResponse {
    status: number;
    access_token: string;
    refresh_token: string;
}

export interface AuthTokens {
    access_token: string;
    refresh_token: string;
}
