import {  component$, useContext, useSignal, $, } from '@builder.io/qwik';
import { MesasContext } from '~/context/mesa/mesa.context';

interface parametros {
  infoToast: any,
}

export const ModalMudar = component$((props: parametros) => {

  const { infoToast } = props;

  const mesaContext = useContext(MesasContext);  

  const mesaId = useSignal<any>("");

  const sendMesa = $(async (mesa: any) => {
    console.log("mesa ENVIADA", mesa);
    mesaContext.numeroMesa = mesa;
    mesaId.value = "";
  });

  const closeModal = $(async () => {
    modal_Mudar.close()
  });

  const mudar = $(() => {
   if(mesaId.value)
   {
    sendMesa(mesaId.value)
    closeModal()
   }
   else {
    infoToast.show = true;
    infoToast.msg = "No se puede cambiar de mesa si no ingresa una"
    infoToast.type = "error"
   }
  })

  return (
    <div>
      <dialog id="modal_Mudar">
        <div>
          <div>
            <div class="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
              <div class="text-center lg:text-center m-3">
                <h1 class="text-4xl font-bold mb-1">
                  Ingrese mesa de destino
                </h1>

              </div>
              <div class="card-body">
                <div class="">
                  <div class="flex flex-row">
                    <div class="form-control mr-1">
                      <label class="label">
                        <span class="label-text">Mesa</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Mesa"
                        name="cantidad"
                        bind:value={mesaId}
                        class="input input-bordered"
                      />
                    </div>

                  </div>
                  
                    <div class="form-control mt-6 flex flex-row">
                      <button
                        class="btn btn-error w-1/2"
                        onClick$={() => { closeModal() }}
                      >
                        Cancel
                      </button>
                    
                      <button
                        type="submit"
                        // onClick$={() => changeMesa(mesaChange.value)}
                        onClick$={() => {mudar() }}
                        class="btn btn-primary w-1/2 ml-3"
                      >
                        Aceptar
                      </button>
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



