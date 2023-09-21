import { configuration } from "~/config/env.config";

export const newOrden = async (
    token: any,
    item: any,

): Promise<any> => {
    console.log("llega a crear payload ", item);
    console.log("llega a crear token ", token);

    const encoded = encodeURI(`${configuration.api}orden`)
    console.log(encoded);
    const resp = await fetch(encoded, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
    });

    const data = resp.json();
    // console.log("llega cupon/create", data);
    return data;
};

export const editOrden = async (
    token: any,
    item: any,
    ordenId: any,
): Promise<any> => {
    console.log("llega a crear payload ", item);
    console.log("llega a crear token ", token);    

    const encoded = encodeURI(`${configuration.api}orden/${ordenId}`)
    console.log(encoded);
    
    const resp = await fetch(encoded, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
    });

    const data = resp.json();
    // console.log("llega cupon/create", data);
    return data;

}
export const agruparItems = async (
    token: any,
    ordenId: any,
    productos: any,
): Promise<any> => {
    console.log("llega a crear token ", token);    

    const encoded = encodeURI(`${configuration.api}agruparitem/${ordenId}`)
    console.log(encoded);
    
    const resp = await fetch(encoded, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productos),
    });

    const data = resp.json();
    // console.log("llega cupon/create", data);
    return data;
}