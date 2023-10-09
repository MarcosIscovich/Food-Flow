import { createContextId } from "@builder.io/qwik";

export interface mesaId {
    numeroMesa : any
} 

export const MesasContext = createContextId<mesaId>('mesas-context')