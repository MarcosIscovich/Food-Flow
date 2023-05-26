import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { AuthState } from "./auth.context";
import { AuthContext } from "./auth.context";

export const AuthProvider = component$(() => {

    const authStore = useStore<AuthState>({
        token: null,
        isAutenticated: false,
        loading: true,
        user: null
    })

    useContextProvider(AuthContext, authStore); 
    
    useVisibleTask$(async ({ track }) => {
        track(() => {
            authStore.token
        })
        console.log("CAMBIO EL TOKEN", authStore.token);
        
    });

    return (
        <Slot />    
    ) 
});