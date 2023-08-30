import  { type PropFunction, component$, useTask$, useSignal, useContext} from '@builder.io/qwik';
import { AuthContext } from '~/context/auth/auth.context';
import { IMesas } from '~/interfaces/iMesas';
import { selectItems } from '~/services/generico.service';
//import mesas from './mesas';

interface parametros {
    sendMesa: PropFunction<(mesa:any)=>any>;
}
export const ViewMesas = component$((props: parametros) => {
  
  const authContext = useContext(AuthContext);
  const {sendMesa} = props;

  const mesas = useSignal<IMesas[]>([]);
  const loading = useSignal<boolean>(false);

  useTask$(async ({track}) => {
    track(() => authContext.token)
    if(authContext.token){
      const _mesas = await selectItems(authContext.token, "mesas");
      console.log("mesas", _mesas);
      mesas.value = _mesas.data;
      loading.value = true;
    }
  });

    return (
      <>
        <div class="card  bg-secondary-100" style="height: 100%;">
          <figure>
            <h1>Mesas click para cambiar</h1>
          </figure>
          <div class="card-body">
            <div class="grid grid-cols-10">
              {loading.value &&  mesas.value.map((mesa, idx) => {
                let $class =
                        mesa.estado_id == "2"
                      ? "mesa--ocupada"
                      : mesa.estado_id == "4"
                      ? "mesa--cerrada"
                      : mesa.estado_id == "3"
                      ? "mesa--reservada"
                      : "mesa--libre"
                   //console.log($class);
                   $class = "mesa m-1 w-16 " + $class 

                return (
                  <div class="grid" key={idx}>
                    <div>
                      <button
                        class={$class}
                        onClick$={() => {
                            sendMesa(mesa)
                        }}
                      >
                        {mesa.id}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    ); 
    
});