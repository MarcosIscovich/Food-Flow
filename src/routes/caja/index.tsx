import { $, component$, useContext, useSignal, useStore, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { TableMesas } from './components/tableMesas';
import { ViewMesas } from './components/viewMesas';
import { CarouselItems } from './components/carousel';
import { ModalClave } from '~/components/modalClave';
import { newOrden, editOrden } from '~/services/orden.service';
import { AuthContext } from '~/context/auth/auth.context';
import { getAllProducts } from '~/services/productos.service';
import { ModalSupervisor } from './components/modalSupervisor';
import { PermisoContext } from '~/context/supervisor/supervisor.context';
import { MesasContext } from '~/context/mesa/mesa.context';
import { deleteMesa, mudarMesa } from '~/services/mesa.service';
import { ModalMudar } from './components/modalMudar';
import { mudar_Producto } from '~/services/productos.service';
import { Toast } from '~/components/sharedComponents/utils/toast.component';
import { deleteProducto, updateProducto } from '~/services/comanda.service';
import { ModalProducto } from './components/modalProducto';
import { ModalCamarero } from './components/modalCamarero';


export default component$(() => {

  const authContext = useContext(AuthContext);
  const permisoContext = useContext(PermisoContext);
  const mesaContext = useContext(MesasContext);

  const changeView = useSignal<boolean>(false);
  const guardarComandaFlag = useSignal<boolean>(false);
  const marcharComandaFlag = useSignal<boolean>(false);
  const eliminarProductoFlag = useSignal<boolean>(false);
  const eliminarMesaFlag = useSignal<boolean>(false);
  const agruparFlag = useSignal<boolean>(false);
  const cambiarCamareroFlag = useSignal<boolean>(false);
  const cancelBtn = useSignal<boolean>(false);
  const mesaSelected = useStore<any>({});
  const productoSelected = useStore<any>({});
  const allProductos = useStore<any>({});  
  const productos = useStore<any[]>([]);
  const itemSelectedTable = useStore<any>({});
  const tienePermiso = useSignal<boolean>(false);
  const infoToast = useStore({
    msg: "",
    type: "success",
    show: false,
  }); 
  const filaSeleccinada = useSignal<number>(0);
  const total = useSignal<number>(0);
  const cantidad = useSignal<string>('');
  const preferencia = useSignal<string>('');
  const orden = useStore<any>({});
  const refreshMesa = useSignal<boolean>(false);

  const clearContexts = $(() => {
    permisoContext.tienePermiso = false;
    permisoContext.action = "";
    mesaContext.numeroMesa = "";
    itemSelectedTable.value = null;
  })

  

  const mudarProducto = $(async (producto: any, mesaDestino: any, mesaActual: any) => {
    console.log("mudarProducto", producto);
    modal_Mudar.showModal();
    if (mesaContext.numeroMesa.length > 0) {
      console.log("Numero de mesa", mesaContext.numeroMesa);
      const data = {
        producto: producto,
        mesaDestino: mesaDestino
      }
      const respMudarProd = await mudar_Producto(authContext.token, mesaActual, data);
      console.log("RESP MUDAR PRODUCTO", respMudarProd);
      if(respMudarProd.success){
        alert(respMudarProd.message);
        changeView.value = false;
        
        clearContexts()
      }else {
        alert(respMudarProd.message);
        
        clearContexts()
      } 
    
    }
  })

  const changeMesa = $(async (mesa: any) => {
    console.log("Mesa CHANGE IN CAJA ", mesaSelected.value);
    modal_Mudar.showModal();
    if (mesaContext.numeroMesa.length > 0) {
      console.log("Numero de mesa", mesaContext.numeroMesa);
      const data = {
        newMesa: mesa
      }
      const resp = await mudarMesa(authContext.token, mesaSelected.value.id, data);
      console.log("RESP", resp);
      if (resp.message === 'Mesa ocupada') {       
        infoToast.show = true;
        infoToast.msg = resp.message;
        infoToast.type = "error";
        clearContexts()
      } else {       
        infoToast.show = true;
        infoToast.msg = resp.message;
        infoToast.type = "success";
        changeView.value = false;
        clearContexts()        
      }
      modal_Mudar.close();
      
    }
  })

  const quitarProducto = $(() => {
    console.log("Quitar Producto", itemSelectedTable.value);
    deleteProducto(authContext.token, itemSelectedTable.value).then((resp) => {
      if (resp.success) {
        console.log("RESPONSE ELMINIAR PRODUCTO", resp);
        if (productos.length === 1) {
          productos.splice(filaSeleccinada.value, 1);  
        } else {
          productos.splice(filaSeleccinada.value, 1);
          total.value = productos.map((producto: any) => producto.precio * producto.cantidad).reduce((a:any, b:any) => a + b, 0);        
                  
        }
      }
    })
  })

  const liberarMesa = $(() => {
    deleteMesa(authContext.token, mesaSelected.value).then((resp) => {
      console.log("RESPONSE ELIMINAR MESA", resp);
      if (resp.status === 200) {     
        changeView.value = false;
      }
      clearContexts()
    })
  })

  const eliminarProd = $(async () => {

    if ( itemSelectedTable.value) {
      console.log("ELiminar Producto", itemSelectedTable.value);

      if (itemSelectedTable.value.procesada === 1) {
        // openModalClave.value = true;
        modal_Supervisor.showModal();
        if (permisoContext.tienePermiso) {
          console.log("ELiminar Producto PERMISO OK", itemSelectedTable.value);
          
          if (itemSelectedTable.value.cantidad === 1) {
            quitarProducto();
            if (productos.length === 1) {
              liberarMesa();
            }
          } else {
            modal_Producto.showModal();
          }
        }

      } else {
        productos.splice(filaSeleccinada.value, 1);
        // total.value = productos.map((producto: any) => producto.precio * producto.cantidad).reduce((a, b) => a + b, 0);
        eliminarProductoFlag.value = false;
        infoToast.show = true;
        infoToast.msg = "Producto eliminado";
        infoToast.type = "success";
      }
    }else if(eliminarProductoFlag.value && !itemSelectedTable.value){
      infoToast.show = true;
      infoToast.msg = "Seleccione un producto";
      infoToast.type = "error";
      
    }
    clearContexts()
  })

  const cambiarCamarero = $(async () => {
    console.log("CAMBIAR CAMARERO", mesaSelected.value);
    modal_Camarero.showModal();
  })

  useTask$(async ({ track }) => {
    track(async () => { permisoContext.tienePermiso, mesaContext.numeroMesa })
    if (permisoContext.tienePermiso) {
      switch (permisoContext.action) {
        case "mudarProducto":
          mudarProducto(itemSelectedTable.value, mesaContext.numeroMesa, mesaSelected.value.id);
          break;

        case "mudarMesa":
          changeMesa(mesaContext.numeroMesa);
          break;

        case "eliminarProducto":
          eliminarProd();
          break;
        
        case "cambiarCamarero":
          cambiarCamarero();
          break;

        default:
          break;
      }
    }
  })

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

  

  // const productoSelected$ = $(async (producto: any) => {
  //   console.log("Producto Selected ", producto);
  //   productoSelected.value = {};
  //   productoSelected.value = producto;
  //   my_modal_2.close();

  // }
  // )

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

  const getAllProductos = $(async () => {
    const resp = await getAllProducts(authContext.token || "");
    console.log("Respuesta", resp);
    if (resp.res) {
      allProductos.values = resp.productos;
    }
  });

  useVisibleTask$(async ({ track }) => {
    track(async () => authContext.token)
    console.log("Token", authContext);
    if (authContext.token) {
      getAllProductos();
    }

  });

  useTask$(async ({ track }) => {
    track(async () => itemSelectedTable.value)
    console.log("itemSelectedTable", itemSelectedTable.value);

  })

  const editarProducto = $((item: any) => {
    updateProducto(authContext.token, item).then((resp) => {
      console.log("RESPONSE EDITAR PRODUCTO", resp);
      if (resp.success) {
        console.log("RESPONSE EDITAR PRODUCTO", resp);
        modal_Producto.close();
        // refreshMesa.value = true;
      }
    })
  })

  
  const addProducto = $(async () => {   
    // console.log("data", data);
    if (itemSelectedTable.value) {
      console.log("EDIT", itemSelectedTable.value, cantidad.value, preferencia.value);
      if (cantidad.value < itemSelectedTable.value.cantidad) {
        itemSelectedTable.value.cantidad = cantidad.value;
        editarProducto(itemSelectedTable.value);
      } else if (cantidad.value == itemSelectedTable.value.cantidad) {
        quitarProducto();
       
        if (productos.length === 0) {
          liberarMesa();
          
        }
      } else {
        
        infoToast.show = true;
        infoToast.msg = "No puede quitar mas cantidad de la que ya tiene";
        infoToast.type = "error";
        
        return;
      }
      
    } else {

      productos.push({
        id: productoSelected.value.id,
        nombre: productoSelected.value.nombre,
        precio: productoSelected.value.precio,
        cantidad: cantidad.value,
        preferencia: preferencia.value
      })
      console.log("Productos", productoSelected.value);
      total.value = productos.map((producto: any) => producto.precio * producto.cantidad).reduce((a, b) => a + b, 0);
      productoSelected.values = {};
     modal_Producto.close();
    }    
  })


  const sendProducto = $((producto: any) => {
    console.log("Producto Selected index", producto);
    modal_Producto.showModal();
    productoSelected.value = {};
    productoSelected.value = producto;
  })

  const clearDataCaja = $(() => {
    console.log("Clear Data");
    //camareroSelected.value = null;
    productos.length = 0;
    itemSelectedTable.value = null;
    //total.value = 0;
    //mesaSelected.value = null;
    // orden.value = null;
    // cantidad.value = "";
    // preferencia.value = "";
    // openModalProducto.value = false
    // openModalClave.value = false;
    tienePermiso.value = false;
    //itemSelected.value = null;
    //filaSeleccinada.value = null;
    agruparFlag.value = false;
    cambiarCamareroFlag.value = false;
    eliminarProductoFlag.value = false;
    eliminarMesaFlag.value = false;
    cancelBtn.value = false;
    guardarComandaFlag.value = false;
    marcharComandaFlag.value = false;
    // camareroID.value = "";
    // data.value = {};
    // openModalCamarero.value = false;
    // openModalMudar.value = false;
    // mesaChange.value = {};
    productoSelected.value = null;
    // productosBusqueda.value = null;
  })

  const volverAmesa = $(() => {
    changeView.value = !changeView.value;
    cancelBtn.value = true;
    clearDataCaja();
  })


  const funcionalidades = [
    { id: 3, nombre: "Eliminar Mesa", icono: "fas fa-trash", class: "btn-func btn--rojo", classDisabled: "btn-func btn--verdeDisabled btn-disabled", action: $(() => { eliminarMesaFlag.value = true }), habilitado: [changeView.value] },
    { id: 2, nombre: "Reservar Mesa", icono: "fas fa-search", class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled", habilitado: [changeView.value] },
    { id: 1, nombre: "Cobrar Mesa", icono: "fas fa-cash-register", class: "btn-func btn--verde ", classDisabled: "btn-func btn--verdeDisabled btn-disabled", habilitado: [changeView.value] },
    { id: 3, nombre: "Eliminar Producto", icono: "fas fa-trash", class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled", 
    action: $(() => { 
      if (itemSelectedTable.value) {
        permisoContext.action = "eliminarProducto";
        modal_Supervisor.showModal();
      }
    }), habilitado: [itemSelectedTable.value, changeView.value] },
    {
      id: 4, nombre: "Mudar Mesa", icono: "fas fa-exchange-alt", class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled", action: $(() => {
        if (mesaSelected.value) {
          permisoContext.action = "mudarMesa";
          // openModalClave.value = true;
          modal_Supervisor.showModal();
        }
      }), habilitado: [changeView.value]
    },

    {
      id: 5, nombre: "Mudar Producto", icono: "fas fa-columns", class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled",
      action: $(() => {
        if (itemSelectedTable.value) {
          if (itemSelectedTable.value) {
            permisoContext.action = "mudarProducto";
            modal_Supervisor.showModal();
          }

        } else {
          alert("Seleccione un producto");
        }
      }), habilitado: [itemSelectedTable.value, changeView.value]
    },
    { id: 6, nombre: "Agrupar Items", icono: "fas fa-object-group", class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled", action: $(() => { agruparFlag.value = true }), habilitado: [changeView.value] },
    { id: 7, nombre: "Marchar Comanda", icono: "fas fa-utensils", class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled", action: $(() => { marcharComandaFlag.value = true }), habilitado: [changeView.value] },
    { id: 8, nombre: "Cambiar Camarero", icono: "fas fa-user-edit", class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled", 
    action: $(() => { 
      if (mesaSelected.value) {
        permisoContext.action = "cambiarCamarero";
        modal_Supervisor.showModal();
      }
     }), habilitado: [changeView.value, (mesaSelected?.value?.estado_id == 2)] },
    { id: 10, nombre: "Volver a Mesas", icono: "fas fa-ban", class: "btn-func btn--rojo", classDisabled: "btn-func btn--verdeDisabled btn-disabled", 
    action: $(() => { volverAmesa() }), habilitado: [changeView.value] },
    { id: 9, nombre: "Buscar Producto", icono: "fas fa-search", class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled", action: $(() => { my_modal_2.showModal() }), habilitado: [changeView.value] },
    { id: 11, nombre: "Guardar Comanda", icono: "fas fa-save", class: "btn-func btn--verde", classDisabled: "btn-func btn--verdeDisabled btn-disabled", action: $(() => { guardarComandaFlag.value = true }), habilitado: [changeView.value] },
  ]

  const habilitado = $((funcionalidad: any) => {
    
    let ret = true;
    funcionalidad.habilitado?.forEach((element: any) => {
      
      if (!element) {
        ret = false;
      }
    });
    
    return ret;
  }
  )
  return (
    <>
      <ModalClave />
      <ModalSupervisor tienePermiso={tienePermiso} openModalClave={false} />
      <ModalMudar />
      <ModalProducto cantidad={cantidad} preferencia={preferencia} itemSelectedTable={itemSelectedTable} addProducto={addProducto} />
      <ModalCamarero orden={orden} refreshMesa={refreshMesa} infoToast={infoToast} clearContexts={clearContexts} />
      <Toast msg={infoToast.msg} type={infoToast.type} show={infoToast.show} onFinish={$(() => (infoToast.show = false))} />
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
                    eliminarMesaFlag={eliminarMesaFlag}
                    agruparFlag={agruparFlag}
                    cambiarCamareroFlag={cambiarCamareroFlag}
                    productosBusqueda={allProductos}
                    productos={productos}
                    sendProducto={sendProducto}
                    itemSelectedTable={itemSelectedTable}
                    filaSeleccinada={filaSeleccinada}
                    orden={orden}
                    refreshMesa={refreshMesa}
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
                      {funcionalidades.map(async (funcionalidad, idx) => (
                        <div class="grid h-full" key={idx}>
                          <div class="w-full h-full">
                            <div class={!changeView.value && 'tooltip tooltip-bottom tooltip-secondary'} data-tip="Abrir mesa habilita funcionalidades">
                              <button class={await habilitado(funcionalidad) ? funcionalidad.class : funcionalidad.classDisabled} onClick$={() => { funcionalidad?.action && funcionalidad.action() }}>

                                <span>{funcionalidad.nombre}</span>
                              </button>
                            </div>
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

