import { component$, $, type PropFunction, useVisibleTask$, useStore, useSignal } from "@builder.io/qwik";


import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import moment from 'moment';

// type IBaseSchema = z.infer<typeof validationSchema>;

interface parametros {
  show: boolean;
  title: string;
  productos: any;
  onClose$: PropFunction<() => void>;
}

export const ModalInformeVentas = component$<parametros>((props) => {
  const {
    productos,
    // productoBuscado$,
    // sendProducto,
  } = props;
  //const _productos = useStore<any>([]);
  //const itemSelected = useStore<any>({});
  const tableFieldConfiguration: iTableFieldConfiguration[] = [

    {
      title: "Camarero",
      fieldName: "nombre",
      hiddenInMobile: false,
      visibleInTable: true,
      defaultValue: "",
      type: "text",
    },
    {
      title: "Ventas",
      fieldName: "descripcion",
      hiddenInMobile: false,
      visibleInTable: true,
      defaultValue: "",
      type: "text",
    }

  ];
  const allOrdenes = useStore<any>([]);
  const totalDia = useSignal(0);

  const calcularTotal = $(() => {    
    totalDia.value = 0;
    const usuariosTotales = new Map<string, number>();
    productos.values.forEach((fila: any) => {
      const usuario = fila.user.nombre;
      const total = parseFloat(fila.totalACobrar);


      // Si el usuario ya existe en el mapa, sumamos el total.
      if (usuariosTotales.has(usuario)) {
        const sumaTotal = usuariosTotales.get(usuario)! + total;
        usuariosTotales.set(usuario, sumaTotal);
      } else {
        // Si el usuario no existe en el mapa, lo añadimos con el total.
        usuariosTotales.set(usuario, total);
      }
    })
    const usuariosTotalesObj: {}[] = []; // Initialize as an empty array

    usuariosTotales.forEach((value, key) => {
      usuariosTotalesObj.push({ nombre: key, total: value });
    });

    allOrdenes.values = usuariosTotalesObj;
    allOrdenes.values.map((total: any) => {
      totalDia.value = totalDia.value + total.total;
    })
    //console.log("allOrdenes", allOrdenes.values);


  })


  useVisibleTask$(async ({ track }) => {
    track(async () => productos.values)
    //console.log("INFOORDENES*********************", productos.values);
    //_productos.value = productos.values;
    // Recorremos el array original.
    if (productos.values.length > 0) {
      calcularTotal();
    }


  });



  return (
    <dialog id="modal_informeVentas" class="modal ">
      <div class="modal-box max-w-5xl" >
        <h3 class="font-bold text-3xl text-center">Informe de ventas - {moment(Date.now()).format("DD-MM-YYYY")}</h3>

        <div class=" text-right ">
          <table class="table  bg-white table-pin-rows">
            <thead>
              <tr>
                {tableFieldConfiguration.map((field, idx) => {
                  if (field.visibleInTable) {
                    return (
                      <th class="text-left" key={idx}>
                        {field.title}
                      </th>
                    );
                  }
                })}
              </tr>
            </thead>
            <tbody class="overflow-auto">
              {allOrdenes.values.length > 0 &&
                allOrdenes.values.map(
                  (producto: any, idx: number) => {
                    return (
                      <tr
                        class=" hover:bg-primary-300 hover:cursor-pointer"
                        key={idx}
                      >
                        <td>{producto.nombre}</td>
                        <td>${producto.total}</td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
          <div class="flex justify-center">
            <div class="stats text-primary-content">

              <div class="stat flex justify-center">
                <div class="stat-title text-secondary-600 text-3xl">Total de ventas</div>
                <div class="stat-value text-black">${totalDia.value}</div>

              </div>

            </div>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
});
