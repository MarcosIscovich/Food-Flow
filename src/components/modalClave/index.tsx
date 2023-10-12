import { $, component$, useContext, useSignal,} from '@builder.io/qwik';
import { AuthContext } from '~/context/auth/auth.context';
import { loginOperario } from '~/services/generico.service';
import accessControl from '~/utils/accessControl';

export const ModalClave = component$(() => {
    const clave = useSignal<string>("");

        const authContext = useContext(AuthContext);

        const loginUsuario = $(async () => {
            console.log("llega al action", clave.value);

            const resp = await loginOperario( authContext.token || "" , clave.value , "loginOperario");
            console.log("respuesta de login", resp)
            
            if(!accessControl(resp.role.nombre , "ACCESO-COMANDA")){
                alert("No tiene permisos para acceder a esta seccion");
                return;
            }

            if(authContext.user != null){
                authContext.user.operario = {
                    id: resp.id,
                    clave: resp.clave,
                    nombre: resp.nombre,
                    rol: resp.role?.nombre
                };
            }
            console.log("respuesta de login", authContext.user);            
        });

    return (
        <div>
            <dialog id="my_modal_1" class={authContext.user?.operario?.id ? 'modal' : 'modal modal-open'}>
            <div class="bg-gradient-to-b from-gray-200 to-transparent p-12 rounded-xl">
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



