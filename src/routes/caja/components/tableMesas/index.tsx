import { $, type PropFunction, component$, useContext, useSignal, useStore, useTask$ } from '@builder.io/qwik';
import { AuthContext } from '~/context/auth/auth.context';
import { findUsers } from "~/services/generico.service";
import { getMesa } from '~/services/mesa.service';
import { ModalSupervisor } from '../modalSupervisor/index';
import { deleteProducto } from '~/services/comanda.service';
import { deleteMesa } from '~/services/mesa.service';

interface parametros {
  mesaSelected: any;
  productoSelected: any;
  guardarComandaFlag: any;
  marcharComandaFlag: any;
  eliminarProductoFlag: any;
  eliminarMesaFlag: any;
  cancelBtn: any;
  newComanda: PropFunction<(productoSelected: any, camarero: any, total: any) => any>;
  editComanda: PropFunction<(productos: any, total: any, orden: any) => any>;
  closeTable: PropFunction<() => any>;
  cancelData: PropFunction<() => any>;
}

export const TableMesas = component$((props: parametros) => {

  const { mesaSelected, productoSelected, guardarComandaFlag,
    marcharComandaFlag, eliminarProductoFlag, eliminarMesaFlag,
    cancelBtn, cancelData, newComanda, closeTable, editComanda } = props;
  const authContext = useContext(AuthContext);
  const users = useStore<any>([]);
  const camareroID = useStore<any>({});
  const camareroSelected = useStore<any>({});
  const productos = useStore<any[]>([]);
  const openModalProducto = useSignal<boolean>(false);
  const data = useStore<any>({});
  const cantidad = useSignal<string>('');
  const preferencia = useSignal<string>('');
  const total = useSignal<number>(0);
  const orden = useStore<any>({});
  const filaSeleccinada = useSignal<any>(null);
  const itemSelected = useStore<any>({});
  const openModalClave = useSignal<boolean>(false);
  const tienePermiso = useSignal<boolean>(false);


  console.log("Mesa: ", mesaSelected);


  const clearData = $(() => {
    console.log("Clear Data");
    camareroSelected.value = null;
    productos.length = 0;
    total.value = 0;
    mesaSelected.value = null;
    orden.value = null;
    openModalProducto.value = false
  })


  const quitarProducto = $(() => {
    deleteProducto(authContext.token, itemSelected.value).then((resp) => {
      if (resp.success) {
        console.log("RESPONSE ELMINIAR PRODUCTO", resp);
        if (productos.length === 1) {
          productos.splice(filaSeleccinada.value, 1);
          eliminarProductoFlag.value = false;
          tienePermiso.value = false;
          total.value = productos.map((producto: any) => producto.precio * producto.cantidad).reduce((a, b) => a + b, 0);
        }
      }
    })


  })

  useTask$(async ({ track }) => {
    track(() => authContext.token)
    if (authContext.token) {
      console.log("useTask$");
      const response = await findUsers(authContext.token, "findusers");
      console.log("Response", response);

      users.value = response.filter((user: any) => user.role.nombre === "Camarero")
      console.log("Users", users);
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
    track(() => { productoSelected })
    console.log("Producto en MESA", productoSelected,);
    if (productoSelected) {
      openModalProducto.value = true;
    }
  });
  useTask$(async ({ track }) => {
    track(() => { eliminarProductoFlag.value })
    console.log("ELiminar Producto", eliminarProductoFlag.value,);
    if (eliminarProductoFlag.value) {
      console.log("ELiminar Producto", itemSelected.value);

      if (itemSelected.value.procesada === 1) {
        openModalClave.value = true;

      } else {
        productos.splice(filaSeleccinada.value, 1);
        total.value = productos.map((producto: any) => producto.precio * producto.cantidad).reduce((a, b) => a + b, 0);
        eliminarProductoFlag.value = false;
        alert("Producto Eliminado");
      }
    }
  });

  useTask$(async ({ track }) => {
    track(() => { eliminarMesaFlag.value })
    console.log("ELiminar Mesa", eliminarMesaFlag.value,);
    if (eliminarMesaFlag.value) {
      openModalClave.value = true;
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
        editComanda(_productos, total.value, orden.value.id)
      } else if (productos.length > 0 && !flagProcesada) {
        await newComanda(productos, camareroSelected.value?.id, total.value);
      }
      else {
        if (guardarComandaFlag.value && !marcharComandaFlag.value) {
          console.log("ENTRA CLOSE TABLE");
          closeTable();
        }
      }
      //todo: limpiar variables 
      if (guardarComandaFlag.value) {
        clearData();
      }

    }
  });

  useTask$(async ({ track }) => {
    track(() => { mesaSelected.estado_id })
    if (mesaSelected.estado_id == "2") {
      console.log("Mesa Ocupada", mesaSelected);
      getMesa(authContext.token, mesaSelected.id).then((item) => {
        console.log("Mesa DATA", item.mesa);
        if (item) {
          orden.value = item.mesa.orden;
          console.log("Camarero", camareroSelected.value);
          camareroSelected.value = {
            nombre: item.mesa.orden.user.nombre
          }
          item.mesa.orden.comandas.map((comanda: any) => {
            comanda.productos.map((producto: any) => {
              productos.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.pivot.precio,
                cantidad: producto.pivot.cantidad,
                preferencia: producto.pivot.preferencia,
                procesada: producto.pivot.procesada,
                comanda_id: producto.pivot.comanda_id,
                orden_id: producto.pivot.orden_id
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
  useTask$(async ({ track }) => {
    track(() => { tienePermiso.value })
    if (tienePermiso.value) {
      if (eliminarMesaFlag.value) {
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
      if (eliminarProductoFlag.value) {
        console.log("ENTRA ELIMINAR PRODUCTO");
        if (productos.length == 1) {
          console.log("hay solo 1 producto");
          quitarProducto();
          deleteMesa(authContext.token, mesaSelected).then((resp) => {
            console.log("RESPONSE ELIMINAR MESA", resp);
            if (resp.status === 200) {
              eliminarProductoFlag.value = false;
              tienePermiso.value = false;
              clearData();
              closeTable();
            }
          })

        } else {
          console.log("hay mas de 1 producto");
          quitarProducto();


        }
      }
    }

  });


  const addProducto = $(() => {
    console.log("data", data);
    productos.push({
      id: productoSelected?.id,
      nombre: productoSelected?.nombre,
      precio: productoSelected?.precio,
      cantidad: cantidad.value,
      preferencia: preferencia.value
    })
    console.log("Productos", productos);
    total.value = productos.map((producto: any) => producto.precio * producto.cantidad).reduce((a, b) => a + b, 0);
    cantidad.value = "";
    preferencia.value = "";
    openModalProducto.value = false;
  })

  const selectProducto = $((producto: any) => {
    console.log("Select Producto", producto);
    itemSelected.value = producto;
  })


  return (
    <>

      <ModalSupervisor openModalClave={openModalClave} tienePermiso={tienePermiso} />

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
                <dialog
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
                                  type="string"
                                  placeholder="Cantidad"
                                  name="cantidad"
                                  bind:value={cantidad}
                                  class="input input-bordered"
                                />
                              </div>
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
                </dialog>
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
              <div class="stat-value text-secondary">21:00hs</div>
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