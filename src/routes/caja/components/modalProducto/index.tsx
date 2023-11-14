import { type PropFunction, component$, $, useContext } from '@builder.io/qwik';
import { PermisoContext } from '~/context/supervisor/supervisor.context';


interface parametros {
    cantidad: any,
    preferencia: any,
    itemSelectedTable: any,
    infoToast: any,
    addProducto: PropFunction<() => any>
}

export const ModalProducto = component$((props: parametros) => {

    const { cantidad, preferencia, itemSelectedTable, addProducto, infoToast } = props;
    const permisoContext = useContext(PermisoContext);

    const _addProducto = $(() => {    
        if(cantidad.value)
        {
            console.log("paso por modal_Producto", cantidad.value)
            addProducto()
            modal_Producto.close()
        }
        else{
            infoToast.show = true;
            infoToast.msg = "No se puede agregar producto sin cantidad"
            infoToast.type = "error"
        }
    })
    return (
        <div>
            <dialog
                id="modal_Producto"
            >
                <div>
                    <div>
                        <div class="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
                            <div class="text-center lg:text-center m-3">
                                {permisoContext.action == "eliminarProducto" ? (
                                    <h1 class="text-4xl font-bold mb-1">
                                        Cantidad a eliminar
                                    </h1>
                                ) : (
                                    <>
                                    <h1 class="text-4xl font-bold mb-1">
                                    Ingrese detalle
                                </h1>
                                <h1 class="text-4xl font-bold ">de producto</h1>
                                </>
                                ) }
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
                                            !itemSelectedTable.value && (
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
                                    {/* <div class="grid grid-col-3 grid-flow-col gap-2 justify-between"> */}
                                        <div class="form-control mt-6 flex flex-row justify-end">
                                            <button
                                                class="btn btn-error w-1/2"
                                                onClick$={() =>
                                                    (modal_Producto.close())
                                                }
                                            >
                                                Cancel
                                            </button>
                                       
                                            <button
                                                type="button"
                                                onClick$={() => _addProducto()}
                                                class="btn btn-primary w-1/2 ml-3"
                                            >
                                                Aceptar
                                            </button>
                                        </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>

    )
});



