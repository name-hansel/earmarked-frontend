import {api} from "./client.ts";

export type RegisterInput = {
    email: string,
    password: string,
    username: string,
}

export type RegisterOutput = {
    message: string,
}

export type LoginInput = {
    email: string,
    password: string
}

export type ActivateAccountInput = {
    token: string
}

export type DeleteAccountInput = {
    password: string
}

export type CurrentUser = {
    userId: string,
    username: string,
}

export async function registerUser(input: RegisterInput): Promise<RegisterOutput> {
    const response = await api.post<RegisterOutput>('/auth/register', input);
    return response.data;
}

export async function loginUser(input: LoginInput): Promise<void> {
    await api.post<void>('/auth/login', input, {skipAuthRefresh: true});
}

export async function activateAccount(input: ActivateAccountInput): Promise<void> {
    await api.post<void>('/auth/activate-account', input);
}

export async function fetchCurrentUser(): Promise<CurrentUser> {
    const response = await api.get<CurrentUser>("/auth/me");
    return response.data;
}

export async function logoutUser(): Promise<void> {
    await api.post("/auth/logout");
}

export async function deleteAccount(input: DeleteAccountInput): Promise<void> {
    await api.delete("/auth/delete-account", {
        data: {
            password: input.password,
        }
    });
}