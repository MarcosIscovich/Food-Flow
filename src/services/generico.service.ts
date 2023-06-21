import { url } from "inspector";
import { configuration } from "~/config/env.config";

export const lista = async (
    token: string,
    pageNumber: number = 0,
    pageSize: number = 10,
    searchText: string = "",
    order: string = "",
    orderSign: string = "",
    url: string = ""
  ): Promise<any> => {
    
    const encoded = encodeURI(`${configuration.api}${url}?page=${pageNumber}&limit=${pageSize}&sort=${orderSign == "-" ? "-": "" }${order}`)//?page=${pageNumber}&per_page=${pageSize}&sort=${order}`) //&searchText=${searchText});${orderSign == "-" ? "-": "" }
    console.log(encoded);
    console.log("order", order)
    const resp = await fetch(
    encoded,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    const data = await resp.json();
      console.log("llega a lista: ", data);
    return data;
  };

  export const create = async (
    token: string,
    item: any,
    url: string 

  ): Promise<any> => {
    console.log("llega a crear: ", item);
    const encoded = encodeURI(`${configuration.api}${url}/`) 
    console.log(encoded);
    const resp = await fetch(encoded, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });
  
    const data = await resp.json();
    console.log("llega cupon/create", data);  
    return data;
  };



export const update = async (
    token: string,
    data: any,
    url: string 
  ): Promise<any> => {
    const resp = await fetch(
      `${configuration.api}${url}/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
  
    const respuesta = await resp.json();
  
    return respuesta;
  };

  export const deleteItem = async (
    token: string,
    item: any,
    url: string
  ): Promise<any> => {
    console.log("llega a eliminar: ", item);
  
    const resp = await fetch(
      `${configuration.api}${url}/${item.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      }
    );
  
    const data =  resp;
    console.log("llega cupon/delete", data);
  
    return data;
  };
  