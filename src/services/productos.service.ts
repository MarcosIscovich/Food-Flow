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
    console.log("llega del back", data);
    return data;
}