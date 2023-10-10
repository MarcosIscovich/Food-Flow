import {  component$, useContext, useSignal, $, } from '@builder.io/qwik';
import { MesasContext } from '~/context/mesa/mesa.context';



export const ModalMudar = component$(() => {

  const mesaContext = useContext(MesasContext);  

  const mesaId = useSignal<any>("");

  const sendMesa = $(async (mesa: any) => {
    console.log("mesa ENVIADA", mesa);
    mesaContext.numeroMesa = mesa;
    mesaId.value = "";
    modal_Mudar.close();
  });

  const closeModal = $(async () => {
    modal_Mudar.close()
  });

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
                        <span class="label-text">Cantidad</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Cantidad"
                        name="cantidad"
                        bind:value={mesaId}
                        class="input input-bordered"
                      />
                    </div>

                  </div>
                  <div class="grid grid-col-3 grid-flow-col gap-2 justify-between">
                    <div class="form-control mt-6 col-span-2">
                      <button
                        class="btn btn-error"
                        onClick$={() => { closeModal() }}
                      >
                        Cancel
                      </button>
                    </div>
                    <div class="form-control mt-6 col-span-2">
                      <button
                        type="submit"
                        // onClick$={() => changeMesa(mesaChange.value)}
                        onClick$={() => { sendMesa(mesaId.value) }}
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
    </div>

  )
});



