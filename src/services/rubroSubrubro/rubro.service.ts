import { configuration } from "~/config/env.config"

export const createRubro = async (  rubro: string) => {   
    console.log("RUBRO Service", rubro);
     
    return await fetch(configuration.api + 'rubros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        autorization: 'Bearer ' + localStorage.getItem('token')
     },
        body: JSON.stringify({rubro})
    })
     .then(async (data) => {
        const response = await data.json()
        return response
     })
}

export const createSubRubro = async (subrubro: string, rubroId: number) => {    
    return await fetch(`${configuration.api}/subrubro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({subrubro, rubroId})
    })
     .then(async (data) => {
        const response = await data.json()
        return response
     })
}

export const getRubros = async () => {
    return await fetch(`${configuration.api}/rubro`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
     .then(async (data) => {
        const response = await data.json()
        return response
     })
}

export const getSubRubros = async () => {
    return await fetch(`${configuration.api}/subrubro`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
     .then(async (data) => {
        const response = await data.json()
        return response
     })
}