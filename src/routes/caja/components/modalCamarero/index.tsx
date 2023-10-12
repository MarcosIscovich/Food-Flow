import { $,type PropFunction, component$, useContext, useStore, useTask$, } from '@builder.io/qwik';
import { AuthContext } from '~/context/auth/auth.context';
import { findUsers } from "~/services/generico.service";
import { updateCamarero } from '~/services/orden.service';


interface parametros {
    orden: any
    refreshMesa: any
    infoToast: any
    clearContexts: PropFunction<() => any>
}

export const ModalCamarero = component$((props: parametros) => {

    const {  orden , refreshMesa,  infoToast , clearContexts} = props;

    const authContext = useContext(AuthContext);
    const users = useStore<any>([]);
    const camareroID = useStore<any>({});

    const cambiarCamarero = $(() => {
        console.log("CAMBIAR CAMARERO" , orden.value);
        console.log("CAMBIAR CAMARERO" , camareroID.value); 
        const data = {
            user_id : camareroID.value
        }
        updateCamarero(authContext.token ,  data, orden.value.id ).then((resp) => {
            console.log("RESP CAMBIAR CAMARERO" , resp);
            if (resp.success) {
                infoToast.show = true;
                infoToast.msg = "Camarero cambiado correctamente";
                infoToast.type = "success";                               
                camareroID.value = {};
                refreshMesa.value = !refreshMesa.value;
                modal_Camarero.close();
                clearContexts();
            } else {
                infoToast.show = true;
                infoToast.msg = "Error al cambiar camarero";
                infoToast.type = "error";
                modal_Camarero.close();
                clearContexts();
            }
        });


    });

    useTask$(async ({ track }) => {
        track(() => authContext.token)
        if (authContext.token) {
          console.log("useTask$");
          const response = await findUsers(authContext.token, "findusers");     
          users.value = response.filter((user: any) => user.role.nombre === "Camarero")          
        }
      });


    return (
        <div>
            
            <dialog id="modal_Camarero" >
                <div class="hero min-h-screen bg-base-200" style="z-index : 12500">
                    <div class="hero-content flex-col ">
                        <div class="text-center lg:text-left">
                            <h1 class="text-5xl font-bold mb-10">Seleccione Camarero clave</h1>
                        </div>
                        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div class="card-body">
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

                                <button class="btn btn-primary mt-5" onClick$={() => {  
                                    cambiarCamareroFlag.value = false;
                                    tienePermiso.value = false;
                                    openModalCamarero.value = false;
                                   
                                }}>Cancelar</button>

                                <button class="btn btn-primary mt-5" onClick$={() => {
                                    if (camareroID.value === "") {
                                        alert("Seleccione un camarero");
                                        return;
                                    } 
                                    cambiarCamarero();
                                }}>Aceptar</button>


                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>

    )
});



