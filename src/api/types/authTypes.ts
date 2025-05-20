export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    __v: number;
}

export interface LoginResponse {
    token: string;
    user: User;
}
export interface LoginRequest {
    email: string;
    password: string;
}
