import { component$, useSignal } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { TableMesas } from './components/tableMesas';
import { ViewMesas } from './components/viewMesas';
//import { ModalClave } from '~/components/modalClave';

const funcionalidades = [
  { id: 1, nombre: "Cobrar", icono: "fas fa-cash-register" },
  { id: 2, nombre: "Cancelar", icono: "fas fa-ban" },
  { id: 3, nombre: "Eliminar Mesa", icono: "fas fa-trash" },
  { id: 4, nombre: "Mudar Mesa", icono: "fas fa-exchange-alt" },
  { id: 5, nombre: "Dividir Mesa", icono: "fas fa-columns" },
  { id: 6, nombre: "Agrupar Items", icono: "fas fa-object-group" },
  { id: 7, nombre: "Marchar Comanda", icono: "fas fa-utensils" },
  { id: 8, nombre: "Guardar Comanda", icono: "fas fa-save" },
  { id: 9, nombre: "Cambiar Camarero", icono: "fas fa-user-edit" },
  { id: 10, nombre: "Buscar Producto", icono: "fas fa-search" },
  { id: 11, nombre: "funcionalidad 1", icono: "fas fa-search" },
  { id: 12, nombre: "funcionalidad 2", icono: "fas fa-search" },
  { id: 13, nombre: "funcionalidad 3", icono: "fas fa-search" },
  { id: 14, nombre: "funcionalidad 4", icono: "fas fa-search" },
]


export default component$(() => {

  const changeView = useSignal<boolean>(false);


  return (
    <>
      <div class="grid grid-rows-2 bg-grey-200">
        <div class="grid grid-cols-2 p-7 ">
          {
            changeView.value ? <div class="p-3 border-solid border-2">
              <TableMesas />
            </div> : <div class="p-3 border-solid border-2">
              <ViewMesas />
            </div>
          }


          <div class="card">
          <div class="card-body p-7">
    <h2 class="card-title flex justify-center">Funcionalidades</h2>
    <div class="grid grid-cols-3 gap-3">
        {funcionalidades.map((funcionalidad, idx) => (
            <div class="grid h-full" key={idx}>
                <div class="w-full h-full">
                    <button class="w-full h-full  bg-colorblue hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                        {funcionalidad.nombre}
                    </button>
                </div>
            </div>
        ))}
    </div>
</div>
          </div>

        </div>
        <div>row 2
          <button class="btn btn-primary" onClick$={() => changeView.value = !changeView.value}>chageview</button>
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
