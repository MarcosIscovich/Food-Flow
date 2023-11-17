import { $,type PropFunction, component$, useContext, useStore, useTask$, useSignal, } from '@builder.io/qwik';
import { now } from 'moment';
import { AuthContext } from '~/context/auth/auth.context';
import { findClients } from "~/services/generico.service";
import { reservarMesaServicio } from '~/services/mesa.service';
import mesas from '../viewMesas/mesas';
import moment from 'moment';


interface parametros {
    mesa: any
    refreshMesa: any
    infoToast: any
    clearContexts: PropFunction<() => any>
    volverAmesa: PropFunction<() => any>
}

export const ModalReservas = component$((props: parametros) => {

    const {  mesa ,  refreshMesa,  infoToast , clearContexts , volverAmesa} = props;

    const authContext = useContext(AuthContext);
    const users = useStore<any>([]);
    const cantidad = useSignal<any>(1);
    const hora = useSignal<any>("9:00");
    const dia = useSignal<Date>();
    const clienteSelected = useStore<any>({});
    const reservarMesa = $(() => {
        
        const _cliente = users.value.find((user: any) => user.id == clienteSelected.value);
        
        const fecha = new Date();
        reservarMesaServicio(authContext.token, mesa.value.id, 
            {cliente: _cliente, 
            mesa_id: mesa.value.id, 
            dia: dia.value, 
            hora: hora.value,
            cantpersonas: cantidad.value
            }).then((resp) => {
            //console.log("RESP RESERVA MESA" , resp);
            if (resp.success) {
                infoToast.show = true;
                infoToast.msg = "Mesa reservada correctamente";
                infoToast.type = "success";                               
               // camareroID.value = {};
                refreshMesa.value = !refreshMesa.value;
                modal_Reservas.close();
                clearContexts();
                volverAmesa();
            } else {
                infoToast.show = true;
                infoToast.msg = "Error al resevar mesa";
                infoToast.type = "error";
                modal_Reservas.close();
                clearContexts();
            }
        });

        dia.value=undefined;
        hora.value=undefined;
    });

    useTask$(async ({ track }) => {
        track(() => authContext.token)
        if (authContext.token) {
         // console.log("useTask$ ReservarMesa");
          const response = await findClients(authContext.token, "clientes"); 
         // console.log("useTask$ ReservarMesa" , response);    
          users.value = response.data      
        }
      });


    return (
      <div>
        {/* <!-- Modal --> */}
        {/* {mesa.value?.id == "1" ? ( */}
        <dialog id="modal_Reservas">
          <div class="hero min-h-screen bg-base-200" style="z-index : 12500">
            <div class="hero-content flex-col ">
              <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold mb-10">Seleccione Cliente</h1>
              </div>
              <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                  <select
                    class="select select-primary w-full max-w-xs"
                    onChange$={(e) => {
                      clienteSelected.value = e.target.value;
                    }}
                  >
                    <option disabled selected>
                      Seleccione un Cliente
                    </option>
                    {users?.value &&
                      users?.value.map((user: any, idx: number) => {
                        return (
                          <option value={user.id} key={idx}>
                            {user.nombre}
                          </option>
                        );
                      })}
                  </select>
                  <div class="form-control mr-1">
                    <label class="label">
                      <span class="label-text">Cantidad de Personas</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Cantidad"
                      name="cantidad"
                      bind:value={cantidad}
                      class="input input-bordered"
                    />
                  </div>
                  <div class="form-control mr-1">
                    <label class="label">
                      <span class="label-text">Día</span>
                    </label>
                    <input
                      type="date"
                      placeholder="Día"
                      name="dia"
                      bind:value={dia}
                      class="input input-bordered"
                      min={moment(Date.now()).format("YYYY-MM-DD")}
                     //min="2023-11-05"
                      max={moment(Date.now()).add(1,'w').format("YYYY-MM-DD")}
                      required />
                      <span class="validity"></span>
                    
                  </div>

                  <div class="form-control mr-1">
                    <label class="label">
                      <span class="label-text">Hora</span>
                    </label>
                    <input
                      type="time"
                      placeholder="Hora"
                      name="hora"
                      bind:value={hora}
                      class="input input-bordered"
                    />
                  </div>

                  <button
                    class="btn btn-primary mt-5"
                    onClick$={() => {
                      modal_Reservas.close();
                    }}
                  >
                    Cancelar
                  </button>

                  <button
                    class="btn btn-primary mt-5"
                    onClick$={() => {
                      reservarMesa();
                    }}
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </dialog>
        {/* ) : 
        (
            <div class="hero min-h-screen bg-base-200" style="z-index : 12500">
                <div >
                    Liberar mesa
                </div>
            </div>
        )
    } */}
      </div>
    );
});



