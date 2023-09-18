import { $, component$, useContext, useSignal, useStore } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { TableMesas } from './components/tableMesas';
import { ViewMesas } from './components/viewMesas';
import { CarouselItems } from './components/carousel';
import { ModalClave } from '~/components/modalClave';
import { newOrden, editOrden } from '~/services/orden.service';
import { AuthContext } from '~/context/auth/auth.context';
import { ModalBuscar } from './components/modalBuscar';
import { IconDelete } from '~/components/sharedComponents/icons';
import styles from './components/styles.module.css';






export default component$(() => {

  const authContext = useContext(AuthContext);


  const changeView = useSignal<boolean>(false);
  const guardarComandaFlag = useSignal<boolean>(false);
  const marcharComandaFlag = useSignal<boolean>(false);
  const eliminarProductoFlag = useSignal<boolean>(false);
  const eliminarMesaFlag = useSignal<boolean>(false);
  const modalBuscar = useSignal<boolean>(false);
  const cancelBtn = useSignal<boolean>(false);
  const mesaSelected = useStore<any>({});
  const productoSelected = useStore<any>({});
  const funcionalidades = [
    { id: 1, nombre: "Cobrar Mesa", icono: "fas fa-cash-register", class: "btn-func btn--verde" },
    { id: 2, nombre: "Reservar Mesa", icono: "fas fa-search", class: "btn-func btn--azul" },
    { id: 3, nombre: "Eliminar Mesa", icono: "fas fa-trash", class: "btn-func btn--rojo" , action: $(() => { eliminarMesaFlag.value = true })},
    { id: 3, nombre: "Eliminar Producto", icono: "fas fa-trash", class: "btn-func btn--azul", action: $(() => { eliminarProductoFlag.value = true }) },
    { id: 4, nombre: "Mudar Mesa", icono: "fas fa-exchange-alt", class: "btn-func btn--azul" },
    { id: 5, nombre: "Dividir Mesa", icono: "fas fa-columns", class: "btn-func btn--azul" },
    { id: 6, nombre: "Agrupar Items", icono: "fas fa-object-group", class: "btn-func btn--azul" },
    { id: 7, nombre: "Marchar Comanda", icono: "fas fa-utensils", class: "btn-func btn--azul", action: $(() => { marcharComandaFlag.value = true }) },
    { id: 8, nombre: "Cambiar Camarero", icono: "fas fa-user-edit", class: "btn-func btn--azul" },
    { id: 9, nombre: "Guardar Comanda", icono: "fas fa-save", class: "btn-func btn--verde", action: $(() => { guardarComandaFlag.value = true }) },
    { id: 10, nombre: "Buscar Producto", icono: "fas fa-search", class: "btn-func btn--azul", action: $(() => { modalBuscar.value = true }) },
    { id: 11, nombre: "Volver a Mesas", icono: "fas fa-ban", class: "btn-func btn--rojo", action: $(() => { changeView.value = !changeView.value, cancelBtn.value = true }) },

    // { id: 12, nombre: "funcionalidad 2", icono: "fas fa-search" },
    // { id: 13, nombre: "funcionalidad 3", icono: "fas fa-search" },
    // { id: 14, nombre: "funcionalidad 4", icono: "fas fa-search" },
  ]



  const sendMesa = $((mesa: any) => {
    console.log("Mesa IN CAJA ", mesa);
    mesaSelected.value = mesa;
    changeView.value = true
    console.log("Change View", changeView.value);

  })

  const closeTable = $(() => {
    console.log("Close TAble");
    changeView.value = false;
    guardarComandaFlag.value = false;
    marcharComandaFlag.value = false;
  })

  const cancelData = $(() => {
    console.log("Cancel Data");
    cancelBtn.value = false;
    changeView.value = false;
    guardarComandaFlag.value = false;
    marcharComandaFlag.value = false;
    productoSelected.value = null;
  })

  const sendProducto = $((producto: any) => {
    console.log("Producto Selected ", producto);
    productoSelected.value = producto;
  })

  const newComanda = $(async (productos: any, camarero: any, total: any) => {
    console.log("Nueva Comanda", productos);
    const data = {
      mesa_id: mesaSelected.value.id,
      user_id: camarero,
      productos: productos,
      totalACobrar: total
    }

    const resp = await newOrden(authContext.token, data);
    //todo: hacer validacion 
    console.log("Respuesta", resp);
    if (guardarComandaFlag.value) {

      closeTable();
      productoSelected.value = null;
    }

  })

  const editComanda = $(async (_productos: any, total: any, ordenID: any) => {
    console.log("Editar Comanda", _productos, total, ordenID);
    const data = {
      productos: _productos,
      mesa_id: mesaSelected.value.id,
      totalACobrar: total
    }
    const resp = await editOrden(authContext.token, data, ordenID);
    console.log("Respuesta", resp);
    if (guardarComandaFlag.value) {
      closeTable();
    }
  })

  return (
    <>
      <ModalClave />
      <ModalBuscar show={modalBuscar.value} onClose$={$(() => { modalBuscar.value = false; })} title={"Buscar Producto"} />
      <div class="">
        <div class="flex flex-col">
          <div class="grid grid-cols-2">
            <div class="p-7" style="display: flex;">
              {changeView.value ? (
                <div style="flex: 1;">
                  <TableMesas editComanda={editComanda} closeTable={closeTable} mesaSelected={mesaSelected.value}
                    productoSelected={productoSelected.value} newComanda={newComanda} guardarComandaFlag={guardarComandaFlag}
                    marcharComandaFlag={marcharComandaFlag}
                    cancelBtn={cancelBtn}
                    cancelData={cancelData}
                    eliminarProductoFlag={eliminarProductoFlag}
                    eliminarMesaFlag={eliminarMesaFlag}
                  />
                </div>
              ) : (
                <div style="flex: 1;">
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
                            <button class={funcionalidad.class} onClick$={() => { funcionalidad?.action() }}>

                              <span>{funcionalidad.nombre}</span>
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

