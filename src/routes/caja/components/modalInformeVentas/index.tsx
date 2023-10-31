import { component$, $, type PropFunction,  useSignal,  useVisibleTask$, useStore } from "@builder.io/qwik";


import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";

// type IBaseSchema = z.infer<typeof validationSchema>;

interface parametros {
    show: boolean;
    title: string;
    productos: any;
    //productoBuscado$: PropFunction<(prducto:any) => void>;
    //sendProducto: PropFunction<(prod:any)=>any>;
    onClose$: PropFunction<() => void>;
}

export const ModalInformeVentas = component$<parametros>((props) => {
    const {
        productos,
       // productoBuscado$,
       // sendProducto,
    } = props;

    const inputTxt = useSignal<string>("");
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
    const filaSeleccinada = useSignal<any>(null);
   
    const calcularTotal = $(() => {    
      const usuariosTotales = new Map<string, number>();
      productos.forEach((fila:any) => {
        const usuario = fila.user.nombre + " " + fila.user.apellido;
        const total = fila.totalACobrar;
  
        // Si el usuario ya existe en el mapa, sumamos el total.
        if (usuariosTotales.has(usuario)) {
          const sumaTotal = usuariosTotales.get(usuario)! + total;
          usuariosTotales.set(usuario, sumaTotal);
        } else {
          // Si el usuario no existe en el mapa, lo añadimos con el total.
          usuariosTotales.set(usuario, total);
        }
    })
    return usuariosTotales;
    })

   console.log("InfoVentas ******************************", productos);
   
   useVisibleTask$(async({track}) => {
    track(async () => productos.values)
    console.log("INFOORDENES*********************", productos.values);
    //_productos.value = productos.values;
    // Recorremos el array original.
    if(productos.values) console.log("calularTotal", await calcularTotal());


   });
   
    
     
    return (
      <dialog id="modal_informeVentas" class="modal ">
        <div class="modal-box max-w-5xl" >
          <h3 class="font-bold text-lg text-center">Informe de ventas</h3>
          
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
                          <tbody  class="overflow-auto">
                            {/* {usuariosTotales?.values.length > 0  &&
                              usuariosTotales.values.map(
                                (producto: any, idx: number) => {
                                  return (
                                    <tr
                                      class={`${
                                        filaSeleccinada.value === idx
                                          ? "bg-primary-300"
                                          : ""
                                      } hover:bg-primary-300 hover:cursor-pointer`}
                                      key={idx}
                                    >
                                      <td>{producto.user.nombre}</td>
                                       <td>{calcularTotal(producto.user)}</td> 
                                    </tr>
                                  );
                                }
                              )} */}
                          </tbody>
                        </table>
                      </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
});
