import { IReservas } from "./iReservas";

export interface IMesas {   
    id?: string;
    numero: string;
    estado_id: string;
    capacidad: string;
    orden_id?: number;
    reserva: IReservas;
}