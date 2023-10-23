import { configuration } from "~/config/env.config";
import { update } from './generico.service';

export const getMesa = async (
    token: any,
    item: any,

): Promise<any> => {
    console.log("llega a crear payload ", item);
    console.log("llega a crear token ", token);

    const encoded = encodeURI(`${configuration.api}mesaOcupada/${item}`)
    console.log(encoded);
    const resp = await fetch(encoded, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = resp.json();
    // console.log("llega cupon/create", data);
    return data;
};


export const deleteMesa = async (
    token: any,
    id: any,

): Promise<any> => {
    console.log("llega a crear payload ", id);
    console.log("llega a crear token ", token);

    const encoded = encodeURI(`${configuration.api}deleteMesa/`)
    console.log(encoded);
    const resp = await fetch(encoded, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(id),
    });

    const data = resp.json();
    return data;
};

export const mudarMesa = async (
    token: any,
    id: any,
    newMesa: any,

): Promise<any> => {
    console.log("llega a crear payload ", id);
    console.log("llega a crear token ", token);

    const encoded = encodeURI(`${configuration.api}mudarMesa/${id}`)
    console.log(encoded);
    const resp = await fetch(encoded, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
         body: JSON.stringify(newMesa),
    });

    const data = resp.json();
    return data;
};

export const reservarMesaServicio = async (
    token: any,
    id: any,
    clienteId: any,

): Promise<any> => {
    console.log("llega a crear payload ", id);
    console.log("llega a crear token ", token);

    const encoded = encodeURI(`${configuration.api}reservarMesa/${id}`)
    console.log(encoded);
    const resp = await fetch(encoded, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clienteId),
    });

    const data = resp.json();
    return data;
}

export const updateMesa = async (
    token: any,
    id: any,
    mesa: any,

): Promise<any> => {
    console.log("llega a crear payload ", id);
    console.log("llega a crear token ", token);

    const encoded = encodeURI(`${configuration.api}mesas/${id}`)
    console.log(encoded);
    const resp = await fetch(encoded, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mesa),
    });

    const data = resp.json();
    return data;
}