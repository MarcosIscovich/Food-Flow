import { $, component$, useContext, useSignal, useStore, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { TableMesas } from './components/tableMesas';
import { ViewMesas } from './components/viewMesas';
import { CarouselItems } from './components/carousel';
import { ModalClave } from '~/components/modalClave';
import { newOrden, editOrden, ticketMesa, informeVentas } from '~/services/orden.service';
import { AuthContext } from '~/context/auth/auth.context';
import { getAllProducts } from '~/services/productos.service';
import { ModalSupervisor } from './components/modalSupervisor';
import { PermisoContext } from '~/context/supervisor/supervisor.context';
import { MesasContext } from '~/context/mesa/mesa.context';
import { deleteMesa, mudarMesa, reservarMesaServicio } from '~/services/mesa.service';
import { ModalMudar } from './components/modalMudar';
import { mudar_Producto } from '~/services/productos.service';
import { Toast } from '~/components/sharedComponents/utils/toast.component';
import { deleteProducto, updateProducto } from '~/services/comanda.service';
import { ModalProducto } from './components/modalProducto';
import { ModalCamarero } from './components/modalCamarero';
import { ModalReservas } from './components/modalReservas';
import { ModalLiberarReserva } from './components/modalLiberarReserva';
import { mesaId } from '../../context/mesa/mesa.context';
import { ModalInformeVentas } from './components/modalInformeVentas';
import { IconDelete, IconBack, IconSearch, IconReserve, IconBill, IconMove, IconChange, IconComanda, IconComandaS, IconLogOut } from '~/components/sharedComponents/icons';
import { IconJoin } from '../../components/sharedComponents/icons';
import logoFF from '~/components/logo_FF.png';
import { UserLogged } from '../adicionador/components/userLogged';

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
  const camareroSelected = useStore<any>({});
  const prodProcesado = useSignal<boolean>(false);
  const fechaTicket = useSignal<string>('');
  const infoOrdenes = useStore<any>([]);


  useVisibleTask$(({track}) => {
    track(() => {permisoContext});
    console.log("permisoContext", permisoContext);
  });

  const clearContexts = $(() => {
    permisoContext.tienePermiso = false;
    permisoContext.action = "";
    mesaContext.numeroMesa = "";
    //tuve que comentar ya que se rompia el reservar mesa
    mesaSelected.value = null;
    camareroSelected.value = null;
  })

  const productoProcesado = $(() => {
   // console.log("Productos PROCESADOS", productos);
    if (prodProcesado.value) {
      prodProcesado.value = false;
    }
    productos?.map((producto: any) => {
      if (!producto.procesada) {
        prodProcesado.value = true
      }

    })
  })

  const mudarProducto = $(async (producto: any, mesaDestino: any, mesaActual: any) => {
   // console.log("mudarProducto", producto);
    modal_Mudar.showModal();
    if (mesaContext.numeroMesa.length > 0) {
     // console.log("Numero de mesa", mesaContext.numeroMesa);
      const data = {
        producto: producto,
        mesaDestino: mesaDestino
      }
      const respMudarProd = await mudar_Producto(authContext.token, mesaActual, data);
     // console.log("RESP MUDAR PRODUCTO", respMudarProd);
      if (respMudarProd.success) {

        infoToast.show = true;
        infoToast.msg = respMudarProd.message;
        infoToast.type = "success";
        changeView.value = false;

        clearContexts()
        itemSelectedTable.value = null;

      } else {
        infoToast.show = true;
        infoToast.msg = respMudarProd.message;
        infoToast.type = "error";


        clearContexts()
        itemSelectedTable.value = null;
      }
      modal_Mudar.close();


    }
  })

  const changeMesa = $(async (mesa: any) => {
   // console.log("Mesa CHANGE IN CAJA ", mesaSelected.value);
    modal_Mudar.showModal();
    if (mesaContext.numeroMesa.length > 0) {
     // console.log("Numero de mesa", mesaContext.numeroMesa);
      const data = {
        newMesa: mesa
      }
      const resp = await mudarMesa(authContext.token, mesaSelected.value.id, data);
      //console.log("RESP", resp);
      if (resp.message === 'Mesa ocupada') {
        infoToast.show = true;
        infoToast.msg = resp.message;
        infoToast.type = "error";
        permisoContext.tienePermiso = false;
        permisoContext.action = "";
        //clearContexts()
        itemSelectedTable.value = null;
      } else {
        infoToast.show = true;
        infoToast.msg = resp.message;
        infoToast.type = "success";
        changeView.value = false;
        clearContexts()
        itemSelectedTable.value = null;
      }

      modal_Mudar.close();
    }
  })

  const quitarProducto = $((itemSelectedTable: any) => {
   //console.log("Quitar Producto", itemSelectedTable);
    deleteProducto(authContext.token, itemSelectedTable).then((resp) => {
      if (resp.success) {
       // console.log("RESPONSE ELMINIAR PRODUCTO", resp);
        if (productos.length === 1) {
          productos.splice(filaSeleccinada.value, 1);
        } else {
          productos.splice(filaSeleccinada.value, 1);
          total.value = productos.map((producto: any) => producto.precio * producto.cantidad).reduce((a: any, b: any) => a + b, 0);

        }
      }
      cantidad.value = "";
      preferencia.value = "";
      modal_Supervisor.close();
      refreshMesa.value = !refreshMesa.value;
    })
  })

  const liberarMesa = $(() => {
    deleteMesa(authContext.token, mesaSelected.value).then((resp) => {
      //console.log("RESPONSE ELIMINAR MESA", resp);
      if (resp.status === 200) {
        changeView.value = false;
        infoToast.show = true;
        infoToast.msg = "Mesa liberada";
        infoToast.type = "success";
      }
      clearContexts()
      itemSelectedTable.value = null;
    })
  })

  const eliminarProd = $(async () => {
    let flagSave = false;
    if (itemSelectedTable.value) {
      console.log("ELiminar Producto", itemSelectedTable.value);

      if (itemSelectedTable.value.procesada === 1) {
        // openModalClave.value = true;
       // modal_Supervisor.showModal();
        if (permisoContext.tienePermiso) {
         // console.log("ELiminar Producto PERMISO OK", itemSelectedTable.value);

          if (itemSelectedTable.value.cantidad === 1) {

            quitarProducto(itemSelectedTable.value);
            infoToast.show = true;
            infoToast.msg = "Producto eliminado";
            infoToast.type = "success";
            if (productos.length === 1) {
              liberarMesa();
            }
          } else {
            modal_Producto.showModal();
            flagSave = true;
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
    } else if (eliminarProductoFlag.value && !itemSelectedTable.value) {
      infoToast.show = true;
      infoToast.msg = "Seleccione un producto";
      infoToast.type = "error";

    }
    console.log("Termina eliminar productos", productos);
    if(!flagSave){
      permisoContext.tienePermiso = false;
      permisoContext.action = "";
    }
   
  })

  const cambiarCamarero = $(async () => {
    console.log("CAMBIAR CAMARERO", mesaSelected.value);
    modal_Camarero.showModal();
  })

  const newComanda = $(async (productos: any, camarero: any, total: any) => {
    //console.log("Nueva Comanda", productos);
    const data = {
      mesa_id: mesaSelected.value.id,
      user_id: camarero,
      productos: productos,
      totalACobrar: total
    }

    const resp = await newOrden(authContext.token, data);
    //todo: hacer validacion 
    //console.log("Respuesta", resp);
    if (resp.success) {
      productoSelected.value = null;
      cantidad.value = "";
      preferencia.value = "";
    }

  })

  const editComanda = $(async (_productos: any, total: any, ordenID: any) => {
    //console.log("Editar Comanda", _productos, total, ordenID);
    const data = {
      productos: _productos,
      mesa_id: mesaSelected.value.id,
      totalACobrar: total
    }
    const resp = await editOrden(authContext.token, data, ordenID);
    //console.log("Respuesta", resp);
    if (resp.success) {
      productoSelected.value = null;
      cantidad.value = "";
      preferencia.value = "";
    }
  })

  const saveComanda = $(async (guardar: any) => {
    //console.log("Guardar Comanda");
    const _productos: any = []
    let flagProcesada = false;
    productos.map((producto: any) => {
      if (!producto.procesada) {
        _productos.push(producto)
      }
      if (producto.procesada) {
        flagProcesada = true;
      }
    })
    //console.log("Productos no ENviados", _productos);
    if (_productos.length > 0 && flagProcesada) {
      await editComanda(_productos, total.value, orden.value.id)
      if (guardar === 'guardar') {
        changeView.value = false;
      }
      productos.length = 0;
      refreshMesa.value = !refreshMesa.value;
      permisoContext.tienePermiso = false;
      permisoContext.action = "";
      infoToast.show = true;
      infoToast.msg = "Comanda emitida";
      infoToast.type = "success";
      //clearContexts()
    } else if (productos.length > 0 && !flagProcesada) {
      await newComanda(productos, camareroSelected.value?.id, total.value);
      if (guardar === 'guardar') {
        changeView.value = false;
      }
      productos.length = 0;
      infoToast.show = true;
      infoToast.msg = "Comanda emitida";
      infoToast.type = "success";
      mesaSelected.value.estado_id = 2;
      refreshMesa.value = !refreshMesa.value;
      permisoContext.tienePermiso = false;
      permisoContext.action = "";
      //clearContexts()
    }
    productoProcesado();
  })

  const cobrarMesa = $(async (ordenID: any) => {
    const resp = await ticketMesa(authContext.token, ordenID, fechaTicket.value);
   //console.log("RESP", resp);
    if (resp) {
      changeView.value = false;
      liberarMesa();
      // recargar pagina
      // window.addEventListener('unload', function () {
      //   liberarMesa();
      //   //window.location.reload();
      // });
    } else {
      infoToast.show = true;
      infoToast.msg = "No se pudo cobrar la mesa";
      infoToast.type = "error";
    }
  })

  const informeVenta = $(async () => {
    const resp = await informeVentas(authContext.token, Date.now());
    modal_informeVentas.showModal();
    console.log("RESP servicio", resp);
    infoOrdenes.values = resp.ordenes;
  })

  const logOut = $(() => {
    authContext.token = "";
    localStorage.removeItem("token");
    window.location.href="/"
  })

  const liberarReserva = $(async () => {
    modal_Liberar_Reserva.showModal();
   
  });

  const reservarMesa = $(async () => { 
    //console.log("Reservar Mesa", mesaSelected.value);
    if(mesaSelected?.value?.estado_id !== 3){
      modal_Reservas.showModal();
     
    }
    else{
      liberarReserva();
     
    }
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

        case "guardarComanda":
          saveComanda('guardar');
          break;
        case "marharComanda":
          saveComanda('marchar');
          break;
        case "cobrarMesa":
          cobrarMesa(orden.value.id);
          break;
        case "reservarMesa":
          reservarMesa();
          break;
        
        case "eliminarMesa":
          liberarMesa();
          break;
        case "logOut":
          logOut();
          break;

        default:
          break;
      }
    }
  })

  const sendMesa = $((mesa: any) => {
    //console.log("Mesa IN CAJA ", mesa);
    mesaSelected.value = mesa;
    changeView.value = true
    //console.log("Change View", changeView.value);

  })

  const closeTable = $(() => {
    //console.log("Close TAble");
    changeView.value = false;
    guardarComandaFlag.value = false;
    marcharComandaFlag.value = false;
  })

  const cancelData = $(() => {
    //console.log("Cancel Data");
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





  const getAllProductos = $(async () => {
    const resp = await getAllProducts(authContext.token || "");
    //console.log("Respuesta", resp);
    if (resp.res) {
      allProductos.values = resp.productos;
    }
  });

  useVisibleTask$(async ({ track }) => {
    track(async () => authContext.token)
    //console.log("Token", authContext);
    
    if (authContext.token) {
      getAllProductos();
      productoProcesado();
    }

  });

  useTask$(async ({ track }) => {
    track(async () => itemSelectedTable.value)
    //console.log("itemSelectedTable", itemSelectedTable.value);
  })

  const editarProducto = $((item: any) => {
    console.log("Editar Producto", item);
    updateProducto(authContext.token, item).then((resp) => {
      console.log("RESPONSE EDITAR PRODUCTO", resp);
      if (resp.success) {
        //console.log("RESPONSE EDITAR PRODUCTO", resp);
        modal_Producto.close();
        modal_Supervisor.close();
        cantidad.value = "";
        preferencia.value = "";
        refreshMesa.value = !refreshMesa.value;
        // refreshMesa.value = true;
      }
    })
  })


  const addProducto = $(async () => {
    // console.log("data", data);

    //console.log("itemSelectedTable en addPRoducto", itemSelectedTable.value);

    if (itemSelectedTable.value) {
      //console.log("EDIT", itemSelectedTable.value, cantidad.value, preferencia.value);
      if (cantidad.value < itemSelectedTable.value.cantidad) {
        console.log("entro a editar producto");
        const _cantidad = Number(itemSelectedTable.value.cantidad) - Number(cantidad.value);
        itemSelectedTable.value.cantidad = _cantidad;

        editarProducto(itemSelectedTable.value);
        itemSelectedTable.value = null;
        refreshMesa.value = !refreshMesa.value;
        filaSeleccinada.value = -1;
        infoToast.show = true;
        infoToast.msg = "Producto editado";
        infoToast.type = "success";
      } else if (cantidad.value == itemSelectedTable.value.cantidad) {
        console.log("entro a quitar producto");
        quitarProducto(itemSelectedTable.value);
        itemSelectedTable.value = null;
        refreshMesa.value = !refreshMesa.value;
        infoToast.show = true;
        infoToast.msg = "Producto eliminado";
        infoToast.type = "success";
        filaSeleccinada.value = -1;
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
      console.log("entro a agregar producto")
      // const newProd = {
      //   id: productoSelected.value.id,
      //   nombre: productoSelected.value.nombre,
      //   precio: productoSelected.value.precio,
      //   cantidad: cantidad.value,
      //   preferencia: preferencia.value
      // }


      productos.push({
        id: productoSelected?.value.id,
        nombre: productoSelected?.value.nombre,
        precio: productoSelected?.value.precio,
        cantidad: cantidad?.value,
        preferencia: preferencia?.value
      })
      productoProcesado();
      //console.log("Productos", productoSelected.value);
      total.value = productos.map((producto: any) => producto.precio * producto.cantidad).reduce((a, b) => a + b, 0);
      productoSelected.values = {};
      cantidad.value = "";
      preferencia.value = "";
      modal_Producto.close();
    }
      permisoContext.tienePermiso = false;
      permisoContext.action = "";
  })


  const sendProducto = $((producto: any) => {
    //console.log("Producto Selected index", producto);
    modal_Producto.showModal();
    productoSelected.value = {};
    productoSelected.value = producto;
  })

  const clearDataCaja = $(() => {
    //console.log("Clear Data");
    //camareroSelected.value = null;
    productos.length = 0;
    itemSelectedTable.value = null;
    //total.value = 0;
    mesaSelected.value = null;
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
    { id: 3, nombre: "Eliminar Mesa", icono: <IconDelete size='32px'/>, class: "btn-func btn--rojo", classDisabled: "btn-func btn--verdeDisabled btn-disabled", 
    action: $(() => { 
      if (mesaSelected.value) {
        permisoContext.action = "eliminarMesa";
        modal_Supervisor.showModal();
      }
     }), habilitado: [changeView.value, mesaSelected?.value?.estado_id == 2] },
    { id: 2, nombre: mesaSelected?.value?.estado_id !== 3 ? "Reservar Mesa" : "Liberar Mesa", icono: <IconReserve size="32px" />, class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled",
    action: $(() => {
      if (mesaSelected.value) {
        permisoContext.action = "reservarMesa";
        permisoContext.tienePermiso = true;
      }
    }),
    habilitado: [(mesaSelected?.value?.estado_id == 1) || (mesaSelected?.value?.estado_id == 3) , changeView.value] },
    {
      id: 1, nombre: "Cobrar Mesa", icono: <IconBill size="32ps" />, class: "btn-func btn--verde ", classDisabled: "btn-func btn--verdeDisabled btn-disabled",
      action: $(() => {
        const prodProc = productos.filter((producto: any) => producto.procesada === 1);
        //console.log("prodProc", prodProc);

        if (productos.length === prodProc.length) {
          permisoContext.action = "cobrarMesa";
          permisoContext.tienePermiso = true;
          // cobrarMesa(orden.value.id)

        } else {
          infoToast.show = true;
          infoToast.msg = "Todos los productos deben estar comandados";
          infoToast.type = "error";
          clearContexts()
        }
      })
      , habilitado: [changeView.value, mesaSelected?.value?.estado_id == 2]
    },
    {
      id: 3, nombre: "Eliminar Producto", icono: <IconDelete size='32px'/>, class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled",
      action: $(() => {
        if (itemSelectedTable.value) {
          permisoContext.action = "eliminarProducto";
          modal_Supervisor.showModal();
        }
      }), habilitado: [itemSelectedTable.value, changeView.value]
    },
    {
      id: 4, nombre: "Mudar Mesa", icono: <IconMove size="32px" />, class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled", action: $(() => {
        if (mesaSelected.value) {
          permisoContext.action = "mudarMesa";
          // openModalClave.value = true;
          modal_Supervisor.showModal();
        }
      }), habilitado: [changeView.value, (mesaSelected?.value?.estado_id == 2)]
    },

    {
      id: 5, nombre: "Mudar Producto", icono: <IconMove size="32px" />, class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled",
      action: $(() => {
        if (itemSelectedTable.value) {
          if (itemSelectedTable.value) {
            permisoContext.action = "mudarProducto";
            modal_Supervisor.showModal();
          }

        } else {
          infoToast.show = true;
          infoToast.msg = "Seleccione un producto";
          infoToast.type = "error";

        }
      }), habilitado: [itemSelectedTable.value, changeView.value]
    },
    { id: 6, nombre: "Agrupar Items", icono: <IconJoin size="32px" />, class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled", 
        action: $(() => { agruparFlag.value = true }), 
        habilitado: [changeView.value, productos.length>0] },
    {
      id: 7, nombre: "Marchar Comanda", icono: <IconComandaS size="32px" />, class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled",
      action: $(() => {
        if (productos.length > 0) {
          permisoContext.action = "marharComanda";
          permisoContext.tienePermiso = true;
        } else {
          infoToast.show = true;
          infoToast.msg = "No hay productos para guardar";
          infoToast.type = "error";
        }
      }), habilitado: [prodProcesado.value, changeView.value]
    },
    {
      id: 8, nombre: "Cambiar Camarero", icono: <IconChange size="32ps" />, class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled",
      action: $(() => {
        if (mesaSelected.value) {
          permisoContext.action = "cambiarCamarero";
          modal_Supervisor.showModal();
        }
      }), habilitado: [changeView.value, (mesaSelected?.value?.estado_id == 2)]
    },
    {
      id: 10, nombre: "Volver a Mesas", icono: <IconBack size='32' />, class: "btn-func btn--rojo", classDisabled: "btn-func btn--verdeDisabled btn-disabled",
      action: $(() => { volverAmesa() }), habilitado: [changeView.value]
    },
    { id: 9, nombre: "Buscar Producto", icono: <IconSearch size="32px" />, class: "btn-func btn--azul", classDisabled: "btn-func btn--verdeDisabled btn-disabled",
     action: $(() => { 
      
      permisoContext.action = "";
      permisoContext.tienePermiso = false;
      if(permisoContext.action === ""){
        my_modal_2.showModal() 
      }
    }),
      habilitado: [changeView.value, (mesaSelected.value && camareroSelected.value)] },
    {
      id: 11, nombre: "Guardar Comanda", icono: <IconComanda size="32px" />, class: "btn-func btn--verde", classDisabled: "btn-func btn--verdeDisabled btn-disabled",
      action: $(() => {
        if (productos.length > 0) {
          permisoContext.action = "guardarComanda";
          permisoContext.tienePermiso = true;

        } else {
          infoToast.show = true;
          infoToast.msg = "No hay productos para guardar";
          infoToast.type = "error";
        }
      }), habilitado: [prodProcesado.value, changeView.value]
    },
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
      <ModalInformeVentas 
       show={false}
       onClose$={$(() => {
         false;
       })}
       title={"Informe de ventas"}
       productos={infoOrdenes}
      />
      <ModalClave />
      <ModalSupervisor 
        tienePermiso={tienePermiso} 
        openModalClave={false} 
        infoToast={infoToast}
      />
      <ModalMudar  infoToast={infoToast}/>
      <ModalProducto
        cantidad={cantidad}
        preferencia={preferencia}
        itemSelectedTable={itemSelectedTable}
        addProducto={addProducto}
        infoToast={infoToast}
      />
      <ModalCamarero
        orden={orden}
        refreshMesa={refreshMesa}
        infoToast={infoToast}
        clearContexts={clearContexts}
      />
      <ModalReservas
        volverAmesa={volverAmesa}
        mesa={mesaSelected}
        refreshMesa={refreshMesa}
        infoToast={infoToast}
        clearContexts={clearContexts}
      />
      <ModalLiberarReserva
        volverAmesa={volverAmesa}
        mesa={mesaSelected}
        refreshMesa={refreshMesa}
        infoToast={infoToast}
        clearContexts={clearContexts}
      />
      <Toast
        msg={infoToast.msg}
        type={infoToast.type}
        show={infoToast.show}
        onFinish={$(() => (infoToast.show = false))}
      />
      <div class="">
        <div class="flex flex-col">
          <div class="grid grid-cols-2">
            <div class="p-7" style="display: flex;">
              {changeView.value ? (
                <div style="flex: 1;">
                  <TableMesas
                    closeTable={closeTable}
                    mesaSelected={mesaSelected.value}
                    productoSelected={productoSelected.value}
                    guardarComandaFlag={guardarComandaFlag}
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
                    camareroSelected={camareroSelected}
                    infoToast={infoToast}
                    fechaTicket={fechaTicket}
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
                    Funcionalidades de Caja
                  </h2>
                  
                  
                  <div class="card-actions justify-center items-center">
                    <div class="grid grid-cols-3 gap-3">
                      {funcionalidades.map(async (funcionalidad, idx) => (
                        <div class="grid h-full" key={idx}>
                          <div class="w-full h-full">
                            <div
                              class={
                                !changeView.value &&
                                "tooltip tooltip-bottom tooltip-secondary"
                              }
                              data-tip="Abrir mesa habilita funcionalidades"
                            >
                              <button
                                class={
                                  (await habilitado(funcionalidad))
                                    ? funcionalidad.class
                                    : funcionalidad.classDisabled
                                }
                                onClick$={() => {
                                  funcionalidad?.action &&
                                    funcionalidad.action();
                                }}
                              >
                                <div class="flex justify-center items-center">
                                  <span class="w-1/4"> {funcionalidad.icono} </span>
                                  <span class="w-3/4">{funcionalidad.nombre}</span>
                                </div>
                                
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
          
          {(mesaSelected.value && camareroSelected.value) ? (
            <div class="px-7 pb-7">
              <CarouselItems sendProducto={sendProducto} />
            </div>
          ) : (
            <>
            {!changeView.value && (
            <div class="bg-secondary-100 rounded-2xl h-52  px-7 pb-7 ml-7 mr-7 flex items-center justify-center">
               
                          <div class="w-full h-full flex justify-between items-center">
                          {/* <img src={logoFF}  alt="logo" width={120} height={120} /> */}
                          <UserLogged />
                            <div
                              class={
                                
                                "tooltip tooltip-bottom tooltip-secondary"
                              }
                              data-tip="Informes de ventas"
                            >
                              <button
                                class="btn-func btn--azul"
                                onClick$={() => {
                                 // console.log("Informe de ventas");
                                  informeVenta();
                                }}
                              >
                                <span>Informe Ventas</span>
                              </button>
                            </div>
                            <div class={
                                
                                "tooltip tooltip-bottom tooltip-secondary"
                              }
                              data-tip="Salir del sistema">
                            <button
                                class="btn-func btn--rojo"
                                onClick$={() => {
                                  console.log("Informe de ventas");
                                  permisoContext.action = "logOut";
                                  modal_Supervisor.showModal();
                                  //logOut();
                                }}
                              >
                                <div class="flex justify-center items-center">
                                  <span class="w-1/4"> <IconLogOut size="32px" /> </span>
                                  <span class="w-3/4">Log Out</span>
                                </div>
                                
                                
                              </button>
                            </div>
                          </div>
               
              </div>
            )}
            </>
          )
        }

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

