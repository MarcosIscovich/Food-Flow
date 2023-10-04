import { $, component$, useContext, useSignal, } from '@builder.io/qwik';
import { AuthContext } from '~/context/auth/auth.context';
import { loginSupervisor } from '~/services/generico.service';
import accessControl from '~/utils/accessControl';
import {PermisoContext} from '~/context/supervisor/supervisor.context';


interface parametros {
    openModalClave: any,
    tienePermiso: any
}

export const ModalSupervisor = component$((props: parametros) => {

    const { openModalClave , tienePermiso} = props;

    const clave = useSignal<string>("");

    const authContext = useContext(AuthContext);
    const permisoContext = useContext(PermisoContext);

    const loginUsuario = $(async () => {


        loginSupervisor(authContext.token || "", clave.value, "loginSupervisor").then((resp) => {
            console.log("resp", resp);
            if (!resp.success) {
                alert(resp.message);
                openModalClave.value = false;
                tienePermiso.value = false;
                clave.value = "";
                return;
            } else {
                if (!accessControl(resp.data.role.nombre, "ACCESO-FULL")) {
                    alert("No tiene permisos para acceder a esta seccion");
                    clave.value = "";
                    tienePermiso.value = false;
                    openModalClave.value = false;
                    return;
                } else {
                    clave.value = "";
                    tienePermiso.value = true;
                    permisoContext.tienePermiso = true;
                    
                    console.log("permiso MODAL", permisoContext);                    
                    
                    modal_Supervisor.close();
                    // openModalClave.value = false;
                }
            }
        });


    });

    return (
        <div>
            <dialog id="modal_Supervisor" class={openModalClave.value ? 'modal modal-open' : 'modal'}>
                <div class="hero min-h-screen bg-base-200" style="z-index : 12500">
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
                                        <input type="number" placeholder="clave" name='clave' bind:value={clave} class="input input-bordered" />
                                    </div>

                                    <div class="form-control mt-6">

                                        <button class="btn btn-primary" type='submit' onClick$={loginUsuario} >Login</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>

    )
});



