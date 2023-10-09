import { configuration } from "~/config/env.config";

export const getAllProducts = async (
    token: any,
    
): Promise<any> => {  

    const encoded = encodeURI(`${configuration.api}getAllProducts`)
    console.log(encoded);
    
    const resp = await fetch(encoded, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
       
    });

    const data = resp.json();
    console.log("llega del back getAllproducts", data);
    return data;
}

export const mudar_Producto = async (
    token: any,
    mesaId: any,
    dataSend: any,

): Promise<any> => {
    console.log("llega a crear payload ", mesaId);
    console.log("llega a crear token ", token);

    const encoded = encodeURI(`${configuration.api}mudarProducto/${mesaId}`)
    console.log(encoded);
    const resp = await fetch(encoded, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataSend),
    });

    const data = resp.json();
    return data;
}