import { $, component$, useContext, useSignal, useStore} from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { TableMesas } from './components/tableMesas';
import { ViewMesas } from './components/viewMesas';
import { CarouselItems } from './components/carousel';
import { ModalClave } from '~/components/modalClave';
import { newOrden } from '~/services/orden.service';  
import { AuthContext } from '~/context/auth/auth.context';






export default component$(() => {

  const authContext = useContext(AuthContext);


  const changeView = useSignal<boolean>(false);
  const guardarComandaFlag = useSignal<boolean>(false);
  const mesaSelected = useStore<any>({});
  const productoSelected = useStore<any>({});
  const funcionalidades = [
    { id: 1, nombre: "Cobrar", icono: "fas fa-cash-register", class: "btn-func btn--verde" },
    { id: 2, nombre: "Reservar Mesa", icono: "fas fa-search", class: "btn-func btn--azul" },
    { id: 3, nombre: "Eliminar Mesa", icono: "fas fa-trash", class: "btn-func btn--rojo" },
    { id: 3, nombre: "Eliminar Producto", icono: "fas fa-trash", class: "btn-func btn--azul" },
    { id: 4, nombre: "Mudar Mesa", icono: "fas fa-exchange-alt", class: "btn-func btn--azul" },
    { id: 5, nombre: "Dividir Mesa", icono: "fas fa-columns", class: "btn-func btn--azul" },
    { id: 6, nombre: "Agrupar Items", icono: "fas fa-object-group", class: "btn-func btn--azul" },
    { id: 7, nombre: "Marchar Comanda", icono: "fas fa-utensils", class: "btn-func btn--azul" },
    { id: 8, nombre: "Cambiar Camarero", icono: "fas fa-user-edit", class: "btn-func btn--azul" },
    { id: 9, nombre: "Guardar Comanda", icono: "fas fa-save", class: "btn-func btn--verde" ,  action: $(() =>  { guardarComandaFlag.value = true} )  },
    { id: 10, nombre: "Buscar Producto", icono: "fas fa-search", class: "btn-func btn--azul" },
    { id: 11, nombre: "Cancelar", icono: "fas fa-ban", class: "btn-func btn--rojo", action: $(() => { changeView.value = false }) },

    // { id: 12, nombre: "funcionalidad 2", icono: "fas fa-search" },
    // { id: 13, nombre: "funcionalidad 3", icono: "fas fa-search" },
    // { id: 14, nombre: "funcionalidad 4", icono: "fas fa-search" },
  ]



  const sendMesa = $((mesa: any) => {
    console.log("Mesa: ", mesa);
    mesaSelected.value = mesa;
    changeView.value = true
  })

  const sendProducto = $((producto: any) => {
    console.log("Producto Selected ", producto);
    productoSelected.value = producto;
  })

  const newComanda = $(async (productos:any , camarero:any , total:any) => {
    console.log("Nueva Comanda" , productos);
    const data = {
      mesa_id: mesaSelected.value.id,
      user_id: camarero,
      productos: productos,
      totalACobrar: total
    }
    if(guardarComandaFlag.value){
   const resp =  await newOrden( authContext.token, data);
   console.log("Respuesta", resp);
   
    }
    
  })


  return (
    <>
      <ModalClave />
      <div class="">
        <div class="flex flex-col">
          <div class="grid grid-cols-2">
            <div class="p-7" style="display: flex;">
              {changeView.value ? (
                <div
                  style="flex: 1;"
                // onClick$={() => (changeView.value = !changeView.value)}
                >
                  <TableMesas mesaSelected={mesaSelected.value} productoSelected={productoSelected.value} newComanda={newComanda} guardarComandaFlag={guardarComandaFlag} />
                </div>
              ) : (
                <div
                  style="flex: 1;"
                // onClick$={() => (changeView.value = !changeView.value)}
                >
                  <ViewMesas sendMesa={sendMesa} />
                </div>
              )}
            </div>
            <div class="py-7 pr-7 " style="flex: 1">
              <div class="card bg-secondary-100" style="height: 100%">
                <div class="card-body justify-evenly">
                  <h2 class="card-title flex justify-center">
                    Funcionalidades
                  </h2>
                  <div class="card-actions justify-center items-center">
                    <div class="grid grid-cols-3 gap-3">
                      {funcionalidades.map((funcionalidad, idx) => (
                        <div class="grid h-full" key={idx}>
                          <div class="w-full h-full">
                            <button class={funcionalidad.class} onClick$={() => 
                            {
                              funcionalidad?.action()
                            }} >
                              {funcionalidad.nombre}

                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-7 pb-7">
            <CarouselItems sendProducto={sendProducto} />
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Food-Floow Caja',
  meta: [
    {
      name: 'description',
      content: 'Caja',
    },
  ],
};

