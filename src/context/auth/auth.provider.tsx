import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { AuthState } from "./auth.context";
import { AuthContext } from "./auth.context";
import { verifyToken } from "~/services/auth.service";
import jwt from 'jsonwebtoken';

export const AuthProvider = component$(() => {

    const authStore = useStore<AuthState>({
        token: null,
        isAutenticated: false,
        loading: true,
        user: null
    })

    useContextProvider(AuthContext, authStore); 
    //cuando no le ponemos track al useVisibleTask$ se ejecuta una sola vez
    useVisibleTask$(async () => {
        const token = localStorage.getItem('token');
        if(token && token.length >0)
        {
            authStore.loading = true
            const newToken = await verifyToken(token);
            if(newToken && newToken.access_token)
            {
                authStore.token = newToken.access_token;
                authStore.isAutenticated = true;
                authStore.loading = false;
                console.log("newToken**********", newToken);   
                authStore.user = {id: newToken.user.id,
                    email: newToken.user.email,
                    name: newToken.user.name,
                    rol: newToken.user.role.nombre,
                    imagen: newToken.user.imagen
                }
                console.log("authStore.user**********", authStore.user);
            }
            else{
                authStore.loading = false;
                localStorage.removeItem('token');
                window.location.href="/";
            }
            
        }
        else{
            authStore.loading = false;
        }
    });

    useVisibleTask$(async ({ track }) => {
        track(() => {
            authStore.token //, authStore.user
        })
        console.log("CAMBIO EL TOKEN", authStore.token);
        if(authStore.token && authStore.token.length >0)
        {
            authStore.isAutenticated = true;
            authStore.loading = false;
            localStorage.setItem('token', authStore.token);    
        }
    });

    return (
        <Slot />    
    ) 
});