import {  Slot, component$, useContextProvider, useStore, } from "@builder.io/qwik";
import { PermisoContext } from "./supervisor.context";

export const PermisoProvider = component$(() => {
    
        const permisoStore = useStore<any>({
            tienePermiso: false
        })
    
        useContextProvider(PermisoContext, permisoStore.tienePermiso); 
    
        return (
            <Slot/>    
        ) 
    });