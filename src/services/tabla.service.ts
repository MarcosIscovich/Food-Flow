import { configuration } from "~/config/env.config";

export const getElements = async (tabla: string) => {
    const ruta = configuration.api + tabla;
    console.log("RUTA", ruta);
    return await fetch(ruta, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                 'Authorization': 'BEARER token:11|4Z19r1OncjSeQby7PGTGsUEJDGZ5EpJ3xxjuboLv',
                 'Access-Control-Allow-Origin': '*' },
    })
        .then(async (data) => {
            console.log("DATA", data)
            const response = await data.json()
            console.log("RESPONSE", response)
            return response;
        }
        )
}