import { configuration } from "~/config/env.config";

export const newOrden = async (
    token: any,
    item: any,

): Promise<any> => {
    //console.log("llega a crear payload ", item);
    //console.log("llega a crear token ", token);

    const encoded = encodeURI(`${configuration.api}orden`)
    //console.log(encoded);
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
    //console.log("llega a crear payload ", item);
    //console.log("llega a crear token ", token);    

    const encoded = encodeURI(`${configuration.api}orden/${ordenId}`)
    //console.log(encoded);
    
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
export const updateCamarero = async (
    token: any,
    item: any,
    ordenId: any,
): Promise<any> => {
    //console.log("llega updateCamarero ", ordenId);
    //console.log("llega a crear token ", token);    

    const encoded = encodeURI(`${configuration.api}updateCamarero/${ordenId}`)
    //console.log(encoded);
    
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

export const ticketMesa = async (token:any, ordenId:any , horaMesa:any) => { 
    //console.log("llega a crear token ", horaMesa);
     
    const encoded = encodeURI(`${configuration.api}ticketmesa/${ordenId}`);
    
    const resp = await fetch(encoded, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(horaMesa),
    });

    if (resp.status === 200) {
        // Extraer el contenido del archivo PDF de la respuesta
        const blob = await resp.blob();

        // Crear una URL para el archivo
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace (link) para descargar el archivo
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ticket.pdf'; // Nombre del archivo que se descargará
        a.style.display = 'none';

        // Agregar el enlace al documento
        document.body.appendChild(a);

        // Simular un clic en el enlace para iniciar la descarga
        a.click();

        // Liberar recursos
        window.URL.revokeObjectURL(url);
        return true;
    } else {
        // Manejar errores en caso de que la solicitud no sea exitosa
        console.error(`Error en la solicitud: ${resp.status}`);
        return false;
    }
}


export const agruparItems = async (
    token: any,
    ordenId: any,
    productos: any,
): Promise<any> => {
    //console.log("llega a crear token ", token);    

    const encoded = encodeURI(`${configuration.api}agruparitem/${ordenId}`)
    //console.log(encoded);
    
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

export const informeVentas = async (token:any, fecha:any) => {
    //console.log("llega a informe ventas fecha ", fecha);
    //console.log("llega a informe ventas token ", token); 
    const encoded = encodeURI(`${configuration.api}informeVentas/${fecha}`);
    
    const resp = await fetch(encoded, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    //console.log("Servicio Informe de ventas " , resp);
    if (resp.status === 200) {
        return resp.json();
    } else {
        // Manejar errores en caso de que la solicitud no sea exitosa
        console.error(`Error en la solicitud: ${resp.status}`);
        return false;
    }
    // if (resp.status === 200) {
    //     // Extraer el contenido del archivo PDF de la respuesta
    //     const blob = await resp.blob();

    //     // Crear una URL para el archivo
    //     const url = window.URL.createObjectURL(blob);

    //     // Crear un enlace (link) para descargar el archivo
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'ticket.pdf'; // Nombre del archivo que se descargará
    //     a.style.display = 'none';

    //     // Agregar el enlace al documento
    //     document.body.appendChild(a);

    //     // Simular un clic en el enlace para iniciar la descarga
    //     a.click();

    //     // Liberar recursos
    //     window.URL.revokeObjectURL(url);
    //     return true;
    // } else {
    //     // Manejar errores en caso de que la solicitud no sea exitosa
    //     console.error(`Error en la solicitud: ${resp.status}`);
    //     return false;
    // }
}