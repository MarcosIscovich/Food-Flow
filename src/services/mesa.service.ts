import { configuration } from "~/config/env.config";

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