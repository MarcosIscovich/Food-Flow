import { component$, $, type PropFunction,  useSignal,  useVisibleTask$ } from "@builder.io/qwik";


import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";

// type IBaseSchema = z.infer<typeof validationSchema>;

interface parametros {
    show: boolean;
    title: string;
    productos: any;
    productoBuscado$: PropFunction<(prducto:any) => void>;
    sendProducto: PropFunction<(prod:any)=>any>;
    onClose$: PropFunction<() => void>;
}

export const ModalBuscar = component$<parametros>((props) => {
    const {
        productos,
        productoBuscado$,
        sendProducto,
    } = props;

    const inputTxt = useSignal<string>("");
    //const itemSelected = useStore<any>({});
    const tableFieldConfiguration: iTableFieldConfiguration[] = [
        
        {
            title: "Nombre",
            fieldName: "nombre",
            hiddenInMobile: false,
            visibleInTable: true,
            defaultValue: "",
            type: "text",
        },
        {
            title: "Descripción",
            fieldName: "descripcion",
            hiddenInMobile: false,
            visibleInTable: true,
            defaultValue: "",
            type: "text",
        },
        {
            title: "Precio",
            fieldName: "precio",
            hiddenInMobile: true,
            visibleInTable: true,
            defaultValue: "",
            type: "text",
        },
        // {
        //     title: "Disponible",
        //     fieldName: "disponible",
        //     hiddenInMobile: true,
        //     visibleInTable: true,
        //     defaultValue: "",
        //     label: "Disponible",
        //     type: "checkbox",
        // },
        {
            title: "Imagen",
            fieldName: "imagen",
            hiddenInMobile: true,
            visibleInTable: true,
            defaultValue: "",
            type: "text",
        },        

    ];
    const filaSeleccinada = useSignal<any>(null);

   console.log("Productos ******************************", productos);
   useVisibleTask$(({track}) => {
    track(async () => productos.values)
    console.log("PRODUCTOS*********************", productos.values);
   

   });
   
    const selectProducto = $((producto: any) => {
       // console.log("Select Producto", producto);
        productoBuscado$(producto);
        sendProducto(producto);
      })

     
    return (
      <dialog id="my_modal_2" class="modal ">
        <div class="modal-box max-w-5xl" >
          <h3 class="font-bold text-lg text-center">Buscar Producto</h3>
          <div class="">
            <div class="m-2">
              <div class="flex flex-col w-full border-opacity-50">
                <div class="grid card bg-base-200 rounded-box  place-items-center">
                  <div class="text-center flex flex-col  ">
                    <div class="grid  grid-cols-1 md:grid-cols-3   gap-1 p-4 w-full  ">
                      <div></div>
                      <div class="  first-line: text-center">
                        <input
                          type="text"
                          bind:value={inputTxt}
                          placeholder="Búsqueda por texto"
                          class="input input-bordered w-full max-w-xs "
                        />
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div class=" h-2"></div>
                <div class=" card bg-slate-300 rounded-box place-items-end">
                  <div class="overflow-x-auto  w-full p-2"></div>
                </div>
              </div>
            </div>
          </div>
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
                            {productos?.values &&
                              productos.values.filter((p:any) => p.nombre.toLowerCase().includes(inputTxt.value.toLowerCase())).map(
                                (producto: any, idx: number) => {
                                  return (
                                    <tr
                                      class={`${
                                        filaSeleccinada.value === idx
                                          ? "bg-primary-300"
                                          : ""
                                      } hover:bg-primary-300 hover:cursor-pointer`}
                                      key={idx}
                                      onClick$={() => {
                                        selectProducto(producto);
                                        filaSeleccinada.value = idx;
                                      }}
                                    >
                                      <td>{producto.nombre}</td>
                                      <td>{producto?.descripcion}</td>
                                      <td>{producto.precio}</td>
                                      <td>{producto?.imagen}</td>
                                    </tr>
                                  );
                                }
                              )}
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
