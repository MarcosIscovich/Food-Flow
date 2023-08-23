import { component$, useContext, useSignal, useStore, useTask$ } from '@builder.io/qwik';
import { AuthContext } from '~/context/auth/auth.context';
import { findUsers } from "~/services/generico.service";
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
        track(() => productoSelected)
        console.log("Producto en MESA", productoSelected);
        if (productoSelected) {
            openModalProducto.value = true;
            data.value = {
                id: productoSelected?.id,
                nombre: productoSelected?.nombre,
                precio: productoSelected?.precio,
                cantidad: '',
                preferencia: ''
            }
        }


        // if (productoSelected) {
        //     productos.push(productoSelected)
        //     console.log("Productos", productos);
        // }
    });

    return <>
        <div class="card  bg-secondary-100" style="height: 100%;">


            <div class="card-body p-7">

                <h2 class="card-title flex justify-center">MESA {mesaSelected?.id} </h2>
                <div class="overflow-x-auto " style="height:400px">
                    {
                        !camareroSelected.value ? (
                            <div class="flex justify-center">

                                <select class="select select-primary w-full max-w-xs" onChange$={(e) => { camareroID.value = e.target.value }}>
                                    <option disabled selected>Seleccione un Camarero</option>
                                    {
                                        users.value &&
                                        users.value.map((user: any, idx: number) => {
                                            return <option value={user.id} key={idx}>{user.nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        ) :
                            <>
                                <dialog id="my_modal_1" class={openModalProducto.value ? 'modal modal-open ' : 'modal '}>
                                    <div >
                                        <div class="hero-content flex-col ">
                                            <div class="text-center lg:text-left">
                                                <h1 class="text-5xl font-bold mb-10">Ingresa clave</h1>
                                            </div>
                                            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                                <div class="card-body">
                                                    <div >
                                                        <div class="form-control">
                                                            <label class="label" >
                                                                <span class="label-text">Clave</span>
                                                            </label>
                                                            <input type="number" placeholder="Cantidad" name={data.value?.cantidad} bind:value={data.value?.cantidad} class="input input-bordered" />
                                                        </div>
                                                        <div class="form-control">
                                                            <label class="label" >
                                                                <span class="label-text">Clave</span>
                                                            </label>
                                                            <input type="number" placeholder="Preferencia" name={data.value?.preferencia} bind:value={data.value?.preferencia} class="input input-bordered" />
                                                        </div>

                                                        <div class="form-control mt-6">
                                                            <button class="btn btn-primary" onClick$={() => openModalProducto.value = false} >Cancel</button>
                                                        </div>
                                                        <div class="form-control mt-6">
                                                            <button class="btn btn-primary">ok</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </dialog>
                                <table class="table table-zebra bg-white table-pin-rows" >
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Preferencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productos.length > 0 &&
                                            productos.map((producto: any, idx: number) => {
                                                return <tr key={idx}>
                                                    <td>{producto.nombre}</td>
                                                    <td>{producto?.cantidad}</td>
                                                    <td>{producto.precio}</td>
                                                    <td>{producto?.preferencia}</td>
                                                </tr>
                                            })
                                        }

                                    </tbody>



                                </table>
                            </>


                    }




                </div>
                <div class="stats shadow p-6">
                    <div class="stat place-items-center bg-primary-400 rounded ">
                        <div class="stat-title text-white">Camarero</div>
                        <div class="stat-value text-white">{camareroSelected.value?.nombre}</div>
                    </div>
                    <div class="stat place-items-center rounded">
                        <div class="stat-title">Apertura</div>
                        <div class="stat-value text-secondary">21:00hs</div>
                    </div>
                    <div class="stat place-items-center bg-primary-400 rounded">
                        <div class="stat-title text-white">Total</div>
                        <div class="stat-value text-white">$1,200</div>
                    </div>

                </div>

            </div>
        </div>
    </>

});