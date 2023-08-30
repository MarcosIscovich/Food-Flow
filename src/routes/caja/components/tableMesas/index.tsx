import { $, component$, useContext, useSignal, useStore, useTask$ } from '@builder.io/qwik';
import { Form, routeAction$ } from '@builder.io/qwik-city';
import { AuthContext } from '~/context/auth/auth.context';
import { findUsers } from "~/services/generico.service";
import { useForm } from '@modular-forms/qwik';

interface parametros {
    mesaSelected: any;
    productoSelected: any;
}

export const TableMesas = component$((props: parametros) => {

    const { mesaSelected, productoSelected } = props;
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


    console.log("Mesa: ", mesaSelected);

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
        track(() => {productoSelected})
        console.log("Producto en MESA", productoSelected, );
        if (productoSelected) {
            openModalProducto.value = true;
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


    return (
      <>
        <div class="card  bg-secondary-100" style="height: 100%;">
          <div class="card-body p-7">
            <h2 class="card-title flex justify-center">
              MESA {mesaSelected?.id}{" "}
            </h2>
            <div class="overflow-x-auto " style="height:400px">
              {!camareroSelected.value ? (
                <div class="flex justify-center">
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
                  <table class="table table-zebra bg-white table-pin-rows">
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
                            <tr key={idx}>
                              <td>{producto.nombre}</td>
                              <td>{producto?.cantidad}</td>
                              <td>{producto.precio}</td>
                              <td>{producto?.preferencia}</td>
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
                <div class="stat-value text-white">{total}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );

});