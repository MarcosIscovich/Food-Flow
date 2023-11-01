import { $, type PropFunction, component$, useContext, useSignal, useStore, useTask$ } from '@builder.io/qwik';
import { AuthContext } from '~/context/auth/auth.context';
import { findClients, findUsers } from "~/services/generico.service";
import { getMesa } from '~/services/mesa.service';
// import { deleteProducto, updateProducto } from '~/services/comanda.service';
import { deleteMesa } from '~/services/mesa.service';
import { agruparItems } from '~/services/orden.service';
// import { ModalCamarero } from '../modalCamarero/index';
import { ModalBuscar } from '../modalBuscar/index';


interface parametros {
  mesaSelected: any;
  productoSelected: any;
  guardarComandaFlag: any;
  marcharComandaFlag: any; 
  eliminarMesaFlag: any;
  agruparFlag: any;
  cambiarCamareroFlag: any;  
  cancelBtn: any;
  productosBusqueda: any;
  itemSelectedTable: any;
  filaSeleccinada: any;
  productos: any;
  orden: any;
  refreshMesa: any;
  camareroSelected: any;
  infoToast:any
  fechaTicket: any;
  // newComanda: PropFunction<(productoSelected: any, camarero: any, total: any) => any>;
  // editComanda: PropFunction<(productos: any, total: any, orden: any) => any>;
  closeTable: PropFunction<() => any>;
  cancelData: PropFunction<() => any>;
  sendProducto: PropFunction<(prod:any)=>any>;
}

export const TableMesas = component$((props: parametros) => {

  const { mesaSelected, camareroSelected, fechaTicket,   orden, guardarComandaFlag,
    marcharComandaFlag, filaSeleccinada, eliminarMesaFlag, agruparFlag, productosBusqueda, infoToast,
    cambiarCamareroFlag, refreshMesa, cancelBtn, itemSelectedTable, productos , cancelData, /* newComanda */ closeTable, /* editComanda */ sendProducto  } = props;


    console.log("PRODUCTOS IN TABLE MESA" , productos);
    
  const authContext = useContext(AuthContext);

  const users = useStore<any>([]);
  const camareroID = useStore<any>({});
  // const camareroSelected = useStore<any>({});
  // const productos = useStore<any[]>([]);
  const openModalProducto = useSignal<boolean>(false);
  const data = useStore<any>({});  
  const total = useSignal<number>(0);  
  const itemSelected = useStore<any>({});
  const openModalClave = useSignal<boolean>(false);
  const openModalCamarero = useSignal<boolean>(false);
  const openModalMudar = useSignal<boolean>(false);
  const tienePermiso = useSignal<boolean>(false);
  // const refreshMesa = useSignal<boolean>(false);
  const horaMesa = useSignal<string>("");
  const mesaChange = useSignal<any>({});
  const cliente = useStore<any>({});

  console.log("Mesa: ", mesaSelected);


  const clearData = $(() => {
    console.log("Clear Data");
    camareroSelected.value = null;
    productos.length = 0;
    total.value = 0;
    mesaSelected.value = null;
    orden.value = null;
    openModalProducto.value = false
    openModalClave.value = false;
    tienePermiso.value = false;
    itemSelected.value = null;
    filaSeleccinada.value = null;
    agruparFlag.value = false;
    cambiarCamareroFlag.value = false;
    eliminarMesaFlag.value = false;
    cancelBtn.value = false;
    guardarComandaFlag.value = false;
    marcharComandaFlag.value = false;
    camareroID.value = "";
    data.value = {};
    openModalCamarero.value = false;
    openModalMudar.value = false;
    mesaChange.value = {};    
    productosBusqueda.value = null;
  })


  // const quitarProducto = $(() => {
  //   deleteProducto(authContext.token, itemSelected.value).then((resp) => {
  //     if (resp.success) {
  //       console.log("RESPONSE ELMINIAR PRODUCTO", resp);
  //       if (productos.length === 1) {
  //         productos.splice(filaSeleccinada.value, 1);
  //         tienePermiso.value = false;
  //         openModalClave.value = false;
  //         openModalProducto.value = false;
  //         refreshMesa.value = !refreshMesa.value;
  //         filaSeleccinada.value = null;
          
  //       } else {
  //         productos.splice(filaSeleccinada.value, 1);
  //         total.value = productos.map((producto: any) => producto.precio * producto.cantidad).reduce((a, b) => a + b, 0);
          
  //         openModalClave.value = false;
  //         openModalProducto.value = false;
  //         filaSeleccinada.value = null;          
  //       }
  //     }
  //   })
  // })

  // const liberarMesa = $(() => {
  //   deleteMesa(authContext.token, mesaSelected).then((resp) => {
  //     console.log("RESPONSE ELIMINAR MESA", resp);
  //     if (resp.status === 200) {
  //       tienePermiso.value = false;
  //       filaSeleccinada.value = null;
  //       // refreshMesa.value = !refreshMesa.value;
  //       openModalClave.value = false;
  //       clearData();
  //       closeTable();
  //     }
  //   })
  // })

  const agruparProductos = $(() => {
    const productosAgrupados: any = {};
    const productosAgrupadosArray: any[] = [];
    let agrupo = false;

    productos.forEach((producto:any) => {
      if (!(producto.nombre in productosAgrupados)) {
        console.log("NO AGRUPA");        
        productosAgrupados[producto.nombre] = { ...producto };
        productosAgrupados[producto.nombre].cantidad = Number(producto.cantidad);

      } else {
        console.log("AGRUPA");
        agrupo = true;
        productosAgrupados[producto.nombre].cantidad += Number(producto.cantidad);
      }
    });

    for (const key in productosAgrupados) {
      if (Object.prototype.hasOwnProperty.call(productosAgrupados, key)) {
        productosAgrupadosArray.push(productosAgrupados[key]);
      }
    }
    console.log("Productos Agrupados", productosAgrupadosArray);

    return {
      prod : productosAgrupadosArray,
      agrupo: agrupo
    }
  });

  useTask$(async ({ track }) => {
    track(() => authContext.token)
    if (authContext.token) {
      console.log("useTask$");
      clearData();
      const response = await findUsers(authContext.token, "findusers");
      users.value = response.filter((user: any) => user.role.nombre === "Camarero")
      if(mesaSelected.estado_id == 3){
          const response = await findClients(authContext.token, "clientes"); 

          console.log("useTask$ ReservarMesa" , response);    
          cliente.value = response.data.filter((cliente: any) => cliente.id == mesaSelected.reserva.cliente_id)[0]
      }
    }
  });

  useTask$(async ({ track }) => {
    track(() => agruparFlag.value)
    console.log("Agrupar Flag", agruparFlag.value);
    
    if (agruparFlag.value) {
      const procesada = productos.some((producto: any) => producto?.procesada === 1);               
      const noAgrupa = productos.some((producto: any) => producto?.procesada != 1);

      if (noAgrupa && procesada) {
        infoToast.show = true;
        infoToast.msg = "No se puede agrupar productos comandados junto a los no comandados"
        infoToast.type = "error"
        // alert("No se puede agrupar productos comandados junto a los no comandados");
        // clearData();
        // refreshMesa.value = !refreshMesa.value;
        agruparFlag.value = false
        return
      }
      const data = await agruparProductos();
      
      console.log("DATA", data);
      const prodsAgrupados = data.prod;
      
      productos.length = 0;
      //productos.values = [...prodsAgrupados]
       productos.push(...prodsAgrupados);
      console.log("Productos Agrupados PUSH", productos.values);
      
      if(!data.agrupo){
        infoToast.show = true;
        infoToast.msg = "No hay productos para agrupar"
        infoToast.type = "error"
        
        agruparFlag.value = false
        return

      }

      if (procesada) {
        agruparItems(authContext.token, orden.value.id, data.prod).then((resp) => {
          if (resp.success) { 
            productos.length = 0;          
            refreshMesa.value = !refreshMesa.value;
            // clearData();
          }
        })
      }
      agruparFlag.value = false
    }
  });

  useTask$(async ({ track }) => {
    track(() => camareroID.value)
    console.log("Camarero", camareroID.value);
    camareroSelected.value = users.value.find((user: any) => user.id == camareroID.value)
    console.log("CamareroSelected", camareroSelected.value);
  });

  useTask$(async ({ track }) => {
    track(() => cancelBtn.value)
    if (cancelBtn.value) {
      console.log("Cancel Btn");
      clearData();
      cancelData();
    }
  });
  
/*   useTask$(async ({ track }) => {
    track(() => { cambiarCamareroFlag.value, tienePermiso.value })
    if (cambiarCamareroFlag.value) {
      openModalClave.value = true;
      modal_Supervisor.showModal();
    }

    if (cambiarCamareroFlag.value && tienePermiso.value) {
      openModalCamarero.value = true;
      openModalClave.value = false;

    }
  }); */
  

 /*  useTask$(async ({ track }) => {
    track(() => { eliminarProductoFlag.value, tienePermiso.value })
console.log("eliminar PRODUCTO", eliminarProductoFlag.value);
console.log("eliminar PRODUCTO", itemSelected.value);

    if (eliminarProductoFlag.value && itemSelected.value) {
      console.log("ELiminar Producto", itemSelected.value);

      if (itemSelected.value.procesada === 1) {
        // openModalClave.value = true;
        modal_Supervisor.showModal();
        if (permisoContext.tienePermiso) {
          console.log("ELiminar Producto PERMISO OK", itemSelected.value);
          
          if (itemSelected.value.cantidad === 1) {
            quitarProducto();
            if (productos.length === 1) {
              liberarMesa();
            }
          } else {
            openModalProducto.value = true;
          }
        }

      } else {
        productos.splice(filaSeleccinada.value, 1);
        total.value = productos.map((producto: any) => producto.precio * producto.cantidad).reduce((a, b) => a + b, 0);
        eliminarProductoFlag.value = false;
        alert("Producto Eliminado");
      }
    }else if(eliminarProductoFlag.value && !itemSelected.value){
      alert("Primero selecione un producto")
      clearData();
    }

  }); */

/* 
  useTask$(async ({ track }) => {
    track(() => { eliminarMesaFlag.value, tienePermiso.value })
    console.log("ELiminar Mesa", eliminarMesaFlag.value,);
    if (eliminarMesaFlag.value) {
      openModalClave.value = true;
    }

    if (eliminarMesaFlag.value && tienePermiso.value) {
      console.log("ENTRA ELIMINAR MESA", mesaSelected);
      deleteMesa(authContext.token, mesaSelected).then((resp) => {
        console.log("RESPONSE ELIMINAR MESA", resp);
        if (resp.status === 200) {
          console.log("entro");
          eliminarMesaFlag.value = false;
          tienePermiso.value = false;
          clearData();
          closeTable();
        }
      })
    }
  }); */

/*   useTask$(async ({ track }) => {
    track(() => { guardarComandaFlag.value, marcharComandaFlag.value })
    console.log("Guardar Comanda Flag", guardarComandaFlag.value);

    if (guardarComandaFlag || marcharComandaFlag) {
      console.log("Guardar Comanda", total.value);
      const _productos: any = []
      let flagProcesada = false;
      productos.map((producto: any) => {
        if (!producto.procesada) {
          _productos.push(producto)
        }
        if (producto.procesada) {
          flagProcesada = true;
        }
      })
      console.log("Productos no ENviados", _productos);
      if (_productos.length > 0 && flagProcesada) {
       await  editComanda(_productos, total.value, orden.value.id)
        refreshMesa.value = !refreshMesa.value;
        openModalProducto.value = false
      } else if (productos.length > 0 && !flagProcesada) {
        await newComanda(productos, camareroSelected.value?.id, total.value);
        refreshMesa.value = !refreshMesa.value;
        openModalProducto.value = false
      }
      else {
        if (guardarComandaFlag.value && !marcharComandaFlag.value) {
          console.log("ENTRA CLOSE TABLE");
          refreshMesa.value = !refreshMesa.value;
          closeTable();
        }
      }
      //todo: limpiar variables 
      // if (guardarComandaFlag.value) {
      //   clearData();
      // }

    }
  }); */

  const horaMesaFunct = $(async (fecha: any) => {
    const date = new Date(fecha);
    const hora = date.getHours();
    const minutos = date.getMinutes();
    const horaFormateada = `${hora}:${minutos}`;
    fechaTicket.value = date;
    horaMesa.value = horaFormateada;
  })

  useTask$(async ({ track }) => {
    track(() => { mesaSelected.estado_id, refreshMesa.value })
    
    if (mesaSelected.estado_id == "2" || refreshMesa.value) {
      console.log("Mesa Ocupada", mesaSelected);
      await getMesa(authContext.token, mesaSelected.id).then((item) => {
        console.log("Mesa DATA", item.mesa);
        if (item.mesa) {
          orden.value = item.mesa.orden;
          
          camareroSelected.value = {
            nombre: item?.mesa?.orden?.user?.nombre
          }
          horaMesaFunct(item?.mesa?.orden?.created_at)
          item.mesa?.orden?.comandas?.map((comanda: any) => {
            comanda.productos.map((producto: any) => {
              //  productos.length = 0
              productos.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.pivot.precio,
                cantidad: producto.pivot.cantidad,
                preferencia: producto.pivot.preferencia,
                procesada: producto.pivot.procesada,
                comanda_id: producto.pivot.comanda_id,
                orden_id: item.mesa.orden_id
              })
            })
          })
          total.value = item?.mesa?.orden?.totalACobrar;
          console.log("Total", total);
          console.log("productos", productos);
        }
      })

    }
  });


  // const editarProducto = $((item: any) => {
  //   updateProducto(authContext.token, item).then((resp) => {
  //     console.log("RESPONSE EDITAR PRODUCTO", resp);
  //     if (resp.success) {
  //       refreshMesa.value = true;
  //       openModalProducto.value = false;
  //       tienePermiso.value = false;
  //       openModalClave.value = false;
  //       clearData();
  //     }
  //   })
  // })

  // const addProducto = $(async () => {   
  //   console.log("data", data);
  //   if (itemSelected.value) {
  //     console.log("EDIT", itemSelected.value, cantidad.value, preferencia.value);
  //     if (cantidad.value < itemSelected.value.cantidad) {
  //       itemSelected.value.cantidad = cantidad.value;
  //       editarProducto(itemSelected.value);
  //     } else if (cantidad.value == itemSelected.value.cantidad) {
  //       quitarProducto();
  //       if (productos.length === 0) {
  //         liberarMesa();
  //       }
  //     } else {
  //       alert("No puede quitar mas cantidad de la que ya tiene");
  //       return;
  //     }

  //   } else {
  //     productos.push({
  //       id: productoSelected?.id,
  //       nombre: productoSelected?.nombre,
  //       precio: productoSelected?.precio,
  //       cantidad: cantidad.value,
  //       preferencia: preferencia.value
  //     })
  //     console.log("Productos", productoSelected);
  //     total.value = productos.map((producto: any) => producto.precio * producto.cantidad).reduce((a, b) => a + b, 0);      
  //     openModalProducto.value = false;
  //     productoSelected.values = {};

  //   }

  // })

  const selectProducto = $((producto: any) => {
    console.log("Select Producto", producto);
    itemSelected.value = producto;
    itemSelectedTable.value = producto;
  })

  const productoBuscado$ = $(async (producto: any) => {
    console.log("Producto Selected ", producto);
    // productoSelected.value = {};
    // productoSelected.value = producto;
    my_modal_2.close();
    
  }
  )


  return (
    <>
      {/* <ModalSupervisor openModalClave={openModalClave} tienePermiso={tienePermiso} /> */}
      {/* <ModalCamarero openModalCamarero={openModalCamarero} orden={orden} refreshMesa={refreshMesa} cambiarCamareroFlag={cambiarCamareroFlag} tienePermiso={tienePermiso} /> */}
      <ModalBuscar
        productoBuscado$={productoBuscado$}
        sendProducto={sendProducto}
        show={false}
        onClose$={$(() => {
          false;
        })}
        title={"Buscar Producto"}
        productos={productosBusqueda}
      />

      <div class="card  bg-secondary-100" style="height: 100%;">
        <div class="card-body p-7">
          <h2 class="card-title flex justify-center">
            MESA {mesaSelected?.id}{" "}
          </h2>
          <div class="overflow-x-auto " style="height:400px">
            {mesaSelected?.estado_id === 3 ? (
              <div class="flex flex-col justify-center">
                <span class="badge badge-outline badge-success text-xl mb-2">
                  Mesa Reservada a: {mesaSelected.reserva.cliente + " " + mesaSelected.reserva.telefono}
                </span>

                <span class="badge badge-outline badge-success text-xl">
                  Día de Reserva: {mesaSelected.reserva.dia + " " + mesaSelected.reserva.hora}
                </span>
              </div>
            ) : (
              <div>
                {!camareroSelected.value && mesaSelected?.estado_id !== 3 ? (
                  <div class="flex justify-center">
                    {mesaSelected?.estado_id != "2" && (
                      <select
                        class="select select-primary w-full max-w-xs"
                        onChange$={(e) => {
                          camareroID.value = e.target.value;
                        }}
                      >
                        <option disabled selected>
                          Seleccione un Camarero
                        </option>
                        {users.value &&
                          users.value.map((user: any, idx: number) => {
                            return (
                              <option value={user.id} key={idx}>
                                {user.nombre}
                              </option>
                            );
                          })}
                      </select>
                    )}
                  </div>
                ) : (
                  <>
                    <table class="table  bg-white table-pin-rows">
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Precio</th>
                          <th>Preferencia</th>
                          <th>Procesada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productos.length > 0 &&
                          productos.map((producto: any, idx: number) => {
                            return (
                              <tr
                                class={`${
                                  filaSeleccinada.value === idx
                                    ? "bg-primary-300"
                                    : ""
                                } hover:bg-primary-300 hover:cursor-pointer`}
                                key={idx}
                                onClick$={() => {
                                  selectProducto(producto);
                                  filaSeleccinada.value = idx;
                                }}
                              >
                                <td>{producto.nombre}</td>
                                <td>{producto?.cantidad}</td>
                                <td>{producto.precio}</td>
                                <td>{producto?.preferencia}</td>
                                <td>
                                  {" "}
                                  {producto?.procesada === 1 ? (
                                    <span class="badge badge-outline badge-success">
                                      Si
                                    </span>
                                  ) : (
                                    <span class="badge badge-outline badge-error">
                                      No
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            )}
          </div>
          <div class="stats shadow p-6">
            <div class="stat place-items-center bg-primary-400 rounded ">
              <div class="stat-title text-white">Camarero</div>
              <div class="stat-value text-white">
                {camareroSelected.value?.nombre}
              </div>
            </div>
            <div class="stat place-items-center rounded">
              <div class="stat-title">Apertura</div>
              <div class="stat-value text-secondary">{horaMesa.value}Hs</div>
            </div>
            <div class="stat place-items-center bg-primary-400 rounded">
              <div class="stat-title text-white">Total</div>
              <div class="stat-value text-white">${total}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

});