import { url } from "inspector";
import { configuration } from "~/config/env.config";


export const lista = async (
    token: string,
    pageNumber: number = 0,
    pageSize: number = 10,
    searchText: string = "",
    order: string = "",
    orderSign: string = "",
    url: string = "",
    filter: string[]
  ): Promise<any> => {
    console.log("llega a lista filter: ", filter);

    const filtro = filter.length > 0 ? filter.map((item) => `&filter[${item}]=${searchText}`).join(",") : "";
    const fil = filtro == "" ? "" : filtro;
   // console.log("llega a lista filtro: ", filtro);
    const encoded = encodeURI(`${configuration.api}${url}?page=${pageNumber}${fil}&limit=${pageSize}&sort=${orderSign == "-" ? "-": "" }${order}`)//?page=${pageNumber}&per_page=${pageSize}&sort=${order}`) //&searchText=${searchText});${orderSign == "-" ? "-": "" }
    console.log("Encoded",encoded);
    //console.log("order", order)
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
    console.log("llega a actualizar: ", data, url, token);
    const encoded = encodeURI(`${configuration.api}${url}/${data.id}`) 
    console.log("URLLLLLLLL", encoded);
    const resp = await fetch( encoded,
      // `${configuration.api}${url}/${data.id}`,
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
    console.log("llega cupon/update", respuesta);
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


  export const selectItems = async (
    token: string,
    url: string
  ): Promise<any> => {

    const resp = await fetch(
      `${configuration.api}${url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    const data = await resp.json();
    console.log("llega selectItems", data);
  
    return data;
  }
  
  export const selectwis = async (
    token: string,
    //url: string
  ): Promise<any> => {

    // const url = "https://www.cloud.wispro.co/api/v1/invoicing/invoices?client_custom_id_eq=2054"

    // const resp = await fetch(
    //   `${url}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "accept": "application/json",
    //       Authorization: `49a1a1f0-85ef-4c72-908f-c5bd87127a6e`,
    //     },
    //   }
    // );
  
    // const data = await resp.json();
    // console.log("llega WIS", data);


    //return data;
  }