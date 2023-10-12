import { $, type PropFunction, component$, useContext, useSignal, useStore, useTask$ } from '@builder.io/qwik';
import { AuthContext } from '~/context/auth/auth.context';
import { findUsers } from "~/services/generico.service";
import { getMesa } from '~/services/mesa.service';
import { deleteProducto, updateProducto } from '~/services/comanda.service';
import { deleteMesa } from '~/services/mesa.service';
import { agruparItems } from '~/services/orden.service';
import { ModalCamarero } from '../modalCamarero/index';
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
  newComanda: PropFunction<(productoSelected: any, camarero: any, total: any) => any>;
  editComanda: PropFunction<(productos: any, total: any, orden: any) => any>;
  closeTable: PropFunction<() => any>;
  cancelData: PropFunction<() => any>;
  sendProducto: PropFunction<(prod:any)=>any>;
}

export const TableMesas = component$((props: parametros) => {

  const { mesaSelected, productoSelected, orden, guardarComandaFlag,
    marcharComandaFlag, filaSeleccinada, eliminarMesaFlag, agruparFlag, productosBusqueda,
    cambiarCamareroFlag, refreshMesa, cancelBtn, itemSelectedTable, productos , cancelData, newComanda, closeTable, editComanda, sendProducto  } = props;


    console.log("PRODUCTOS IN TABLE MESA" , productos);
    
  const authContext = useContext(AuthContext);

  const users = useStore<any>([]);
  const camareroID = useStore<any>({});
  const camareroSelected = useStore<any>({});
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

    productos.forEach((producto) => {
      if (!(producto.nombre in productosAgrupados)) {
        productosAgrupados[producto.nombre] = { ...producto };
        productosAgrupados[producto.nombre].cantidad = Number(producto.cantidad);
      } else {
        productosAgrupados[producto.nombre].cantidad += Number(producto.cantidad);
      }
    });

    for (const key in productosAgrupados) {
      if (Object.prototype.hasOwnProperty.call(productosAgrupados, key)) {
        productosAgrupadosArray.push(productosAgrupados[key]);
      }
    }
    console.log("Productos Agrupados", productosAgrupadosArray);

    return productosAgrupadosArray;
  });

  useTask$(async ({ track }) => {
    track(() => authContext.token)
    if (authContext.token) {
      console.log("useTask$");
      clearData();
      const response = await findUsers(authContext.token, "findusers");
      users.value = response.filter((user: any) => user.role.nombre === "Camarero")

    }
  });

  useTask$(async ({ track }) => {
    track(() => agruparFlag.value)
    if (agruparFlag.value) {
      console.log("Agrupar Flag", productos);

      const procesada = productos.some((producto: any) => producto?.procesada === 1);   
      
         
      const noAgrupa = productos.some((producto: any) => producto?.procesada != 1);
      if (noAgrupa) {
        alert("No se puede agrupar productos comandados junto a los no comandados");
        clearData();
        refreshMesa.value = !refreshMesa.value;
        return
      }
      const data = await agruparProductos();

      productos.length = 0;
      productos.push(...data);

      if (procesada) {
        agruparItems(authContext.token, orden.value.id, data).then((resp) => {
          if (resp.success) {
            data
            refreshMesa.value = !refreshMesa.value;
            clearData();
          }
        })
      }
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
  
  useTask$(async ({ track }) => {
    track(() => { cambiarCamareroFlag.value, tienePermiso.value })
    if (cambiarCamareroFlag.value) {
      openModalClave.value = true;
      modal_Supervisor.showModal();
    }

    if (cambiarCamareroFlag.value && tienePermiso.value) {
      openModalCamarero.value = true;
      openModalClave.value = false;

    }
  });
  

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
  });

  useTask$(async ({ track }) => {
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
  });

  const horaMesaFunct = $(async (fecha: any) => {
    const date = new Date(fecha);
    const hora = date.getHours();
    const minutos = date.getMinutes();
    const horaFormateada = `${hora}:${minutos}`
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
          item.mesa.orden.comandas.map((comanda: any) => {
            comanda.productos.map((producto: any) => {
              productos.length = 0
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
          total.value = item.mesa.orden.totalACobrar;
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
      <ModalBuscar productoBuscado$={productoBuscado$} sendProducto={sendProducto} show={false} onClose$={$(() => { false; })} title={"Buscar Producto"} productos= {productosBusqueda}/>
      
      <div class="card  bg-secondary-100" style="height: 100%;">
        <div class="card-body p-7">
          <h2 class="card-title flex justify-center">
            MESA {mesaSelected?.id}{" "}
          </h2>
          <div class="overflow-x-auto " style="height:400px">
            {!camareroSelected.value ? (
              <div class="flex justify-center">
                {
                  mesaSelected?.estado_id != "2" && (
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
                  )
                }

              </div>
            ) : (
              <>
                {/* <dialog
                  id="my_modal_1"
                  class={
                    openModalProducto.value ? "modal modal-open " : "modal "
                  }
                >
                  <div>
                    <div>
                      <div class="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
                        <div class="text-center lg:text-center m-3">
                          <h1 class="text-4xl font-bold mb-1">
                            Ingrese detalle
                          </h1>
                          <h1 class="text-4xl font-bold ">de producto</h1>
                        </div>
                        <div class="card-body">
                          <div class="">
                            <div class="flex flex-row">
                              <div class="form-control mr-1">
                                <label class="label">
                                  <span class="label-text">Cantidad</span>
                                </label>
                                <input
                                  type="number"
                                  placeholder="Cantidad"
                                  name="cantidad"
                                  bind:value={cantidad}
                                  class="input input-bordered"
                                />
                              </div>
                              {
                                !itemSelected.value && (
                                  <div class="form-control ml-1">
                                    <label class="label">
                                      <span class="label-text">Preferencia</span>
                                    </label>
                                    <input
                                      type="string"
                                      placeholder="Preferencia"
                                      name="preferencia"
                                      bind:value={preferencia}
                                      class="input input-bordered"
                                    />
                                  </div>
                                )
                              }
                            </div>
                            <div class="grid grid-col-3 grid-flow-col gap-2 justify-between">
                              <div class="form-control mt-6 col-span-2">
                                <button
                                  class="btn btn-error"
                                  onClick$={() =>
                                    (openModalProducto.value = false)
                                  }
                                >
                                  Cancel
                                </button>
                              </div>
                              <div class="form-control mt-6 col-span-2">
                                <button
                                  type="submit"
                                  onClick$={addProducto}
                                  class="btn btn-primary"
                                >
                                  ok
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </dialog> */}
                <table class="table  bg-white table-pin-rows">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Preferencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.length > 0 &&
                      productos.map((producto: any, idx: number) => {
                        return (
                          <tr class={`${filaSeleccinada.value === idx ? 'bg-primary-300' : ''
                            } hover:bg-primary-300 hover:cursor-pointer`} key={idx} onClick$={() => {
                              selectProducto(producto);
                              filaSeleccinada.value = idx;
                            }}>
                            <td >{producto.nombre}</td>
                            <td >{producto?.cantidad}</td>
                            <td >{producto.precio}</td>
                            <td >{producto?.preferencia}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </>
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