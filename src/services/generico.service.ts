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
  console.log("llega a crear payload ", item);
  console.log("llega a crear token ", token);
  
  const encoded = encodeURI(`${configuration.api}${url}`)
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

export const update = async (
  token: string,
  data: any,
  url: string
): Promise<any> => {
  console.log("llega a actualizar: ", data, url, token);
  const encoded = encodeURI(`${configuration.api}${url}/${data.id}`)
  console.log("URLLLLLLLL", encoded);
  const resp = await fetch(encoded,
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

  const respuesta = resp.json();
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
  
    const data = await resp.json();
    console.log("llega cupon/create", data);  
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

export const findUsers = async (
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
  console.log("llega Users", data);

  return data;
}

export const loginOperario = async (
  token: string,
  clave: string,
  url: string
): Promise<any> => {
  console.log("llega a loginOperario: ", clave, `${configuration.api}${url}/`);


  const resp = await fetch(
    `${configuration.api}${url}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ clave: clave }),
    }
  );

  const data = await resp.json();
  console.log("llega selectItems", data);

  return data;
}
export const loginSupervisor = async (
  token: string,
  clave: string,
  url: string
): Promise<any> => {
  console.log("llega a loginSupervisor: ", clave, `${configuration.api}${url}/`);


  const resp = await fetch(
    `${configuration.api}${url}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ clave: clave }),
    }
  );

  const data = await resp.json();
  console.log("llega selectItems", data);

  return data;
}


