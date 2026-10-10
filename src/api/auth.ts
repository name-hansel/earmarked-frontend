import {api} from "./client.ts";

export type RegisterInput = {
    email: string,
    password: string,
    username: string,
}

export type RegisterOutput = {
    message: string,
}

export async function registerUser(input: RegisterInput): Promise<RegisterOutput> {
    const response = await api.post<RegisterOutput>('/auth/register', input);
    return response.data;
}