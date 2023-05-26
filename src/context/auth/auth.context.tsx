import { createContextId } from "@builder.io/qwik";

export interface User {
    id: number;
    email: string;
    name: string;
    rol: string;
    imagen: string;
}

export interface AuthState {
    token: string | null;
    isAutenticated: boolean;
    loading: boolean;
    user: User | null;
}

export const AuthContext = createContextId<AuthState>('auth-context') 