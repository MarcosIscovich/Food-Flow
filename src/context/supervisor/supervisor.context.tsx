import { createContextId } from "@builder.io/qwik";



export interface permiso {
    tienePermiso : boolean;
    action: string;
} 

export const PermisoContext = createContextId<permiso>('permiso-context')
