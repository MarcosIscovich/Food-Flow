import { configuration } from "~/config/env.config";

export const sendImage = async (
    token: any,
    file: any,
    itemId: any,
    tipo: any
): Promise<any> => {
    console.log("UPLOAD PRODUCTO ", file);
    console.log("TOKEN ", token);

    const encoded = encodeURI(`${configuration.api}sendImage/${itemId}?tipo=${tipo}`)
    console.log(encoded);

    const formData = new FormData();
    formData.append('file', file);
    console.log("FORMDATA" , formData); 
    const resp = await fetch(encoded,  {
        method: "post",
        headers: {
            // "Content-Type": "multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD",
            Authorization: `Bearer ${token}`,
        },
        body: formData,

    });

    const data = resp.json();
    return data;
};
