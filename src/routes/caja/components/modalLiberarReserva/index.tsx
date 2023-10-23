import { type PropFunction, component$, useContext, $ } from '@builder.io/qwik';
import { AuthContext } from '~/context/auth/auth.context';

import styles from './style.module.css';
import stylesC from '../../../inicio/styles.module.css'
import { updateMesa } from '~/services/mesa.service';
interface parametros {
    mesa: any
    refreshMesa: any
    infoToast: any
    clearContexts: PropFunction<() => any>
    volverAmesa: PropFunction<() => any>
}

export const ModalLiberarReserva = component$((props: parametros) => {
    const { mesa, refreshMesa, infoToast, clearContexts, volverAmesa } = props;
    const authContext = useContext(AuthContext);
    
    const liberarReserva = $(async () => {
        const resp = await updateMesa(authContext.token, mesa.value.id, {mesa_id: mesa.value.id, estado_id: 1, reserva_id: null });
        console.log("Resp Liberar Reserva", resp);
        if(resp.success){
            infoToast.show = true;
            infoToast.msg = "Mesa liberada correctamente";
            infoToast.type = "success";
            refreshMesa.value = !refreshMesa.value;
            modal_Liberar_Reserva.close();
            clearContexts();
            volverAmesa();
            mesa.value = {};
        }
        else{
            infoToast.show = true;
            infoToast.msg = "Error al liberar mesa";
            infoToast.type = "error";
            modal_Liberar_Reserva.close();
            clearContexts();
        }
    });

    return (
      // <div >
      //   <dialog id="modal_Liberar_Reserva">
      //     <div class={styles.subscribe}>
      //         <p>SUBSCRIBE</p>
      //         <input placeholder="Your e-mail" class={styles.subscribeinput} name="email" type="email"/>

      //         <div class={styles.submitbtn}>SUBMIT</div>
      //     </div>
      //   </dialog>
      // </div>
      <div>
        <dialog id="modal_Liberar_Reserva">
          <div class="modal-box w-11/12 max-w-5xl flex flex-col justify-center">
            <p class="py-4">Confirma liberar reserva?</p>
            <div class="modal-action flex justify-center">
              <div class=" mt-6 flex flex-row justify-center">
                <button
                  class="btn btn-error mr-1"
                  onClick$={() => {
                    modal_Liberar_Reserva.close();
                  }}
                >
                  Cancelar
                </button>

                <button
                  class="btn btn-primary"
                  type="submit"
                  onClick$={liberarReserva}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    );
});