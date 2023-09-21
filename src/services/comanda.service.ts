import { configuration } from "~/config/env.config";

export const deleteProducto = async (
    token: any,
    item: any,
): Promise<any> => {
    console.log("DELETE PRODUCTO ", item);
    console.log("TOKEN ", token);

    const encoded = encodeURI(`${configuration.api}deleteProducto`)
    console.log(encoded);
    const resp = await fetch(encoded, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),

    });

    const data = resp.json();
    return data;
};

export const updateProducto = async (
    token: any,
    item: any,
): Promise<any> => {
    console.log("UPDATE PRODUCTO ", item);
    console.log("TOKEN ", token);

    const encoded = encodeURI(`${configuration.api}updateProducto`)
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
    return data;
}
