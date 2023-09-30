import { $, PropFunction, component$, } from '@builder.io/qwik';


interface parametros {
  openModalMudar: any,
  mesaChange: any,
  changeMesa: PropFunction<(mesa: any) => void>;

}

export const ModalMudarMesa = component$((props: parametros) => {

  const { openModalMudar, mesaChange, changeMesa } = props;

  /*  const authContext = useContext(AuthContext);
   const users = useStore<any>([]); */
  // const mesaId = useSignal<any>(0);



  return (
    <div>
      <dialog id="my_modal_1" class={openModalMudar.value ? 'modal modal-open' : 'modal'}>
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
                        bind:value={mesaChange}
                        class="input input-bordered"
                      />
                    </div>

                  </div>
                  <div class="grid grid-col-3 grid-flow-col gap-2 justify-between">
                    <div class="form-control mt-6 col-span-2">
                      <button
                        class="btn btn-error"
                        onClick$={() =>
                          (openModalMudar.value = false)
                        }
                      >
                        Cancel
                      </button>
                    </div>
                    <div class="form-control mt-6 col-span-2">
                      <button
                        type="submit"
                        onClick$={() => changeMesa(mesaChange.value)}
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



