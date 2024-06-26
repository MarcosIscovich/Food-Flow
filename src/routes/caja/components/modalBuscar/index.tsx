import { component$, $, type PropFunction, useTask$, useSignal, useContext, useStore } from "@builder.io/qwik";
import type { SubmitHandler } from "@modular-forms/qwik";
import { setValue, useForm, zodForm$, clearError } from "@modular-forms/qwik";
import type { z } from "@builder.io/qwik-city";
import { Modal } from "./modal/index";
import { AuthContext } from "~/context/auth/auth.context";


import { useFormLoader } from "./index";
import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import { InputType } from "~/components/sharedComponents/utils/inputType.component";
import { IconQuestion } from "~/components/sharedComponents/icons";
import { getAllProducts } from "~/services/productos.service";

// type IBaseSchema = z.infer<typeof validationSchema>;

interface parametros {
    show: boolean;
    title: string;
    onClose$: PropFunction<() => void>;
}

export const ModalBuscar = component$<parametros>((props) => {
    const {
        show,
        title,
        onClose$,
    } = props;

    const inputTxt = useSignal<string>("");
    const authContext = useContext(AuthContext);
    const itemSelected = useStore<any>({});
    const productos = useStore<any>({});
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
        {
            title: "Disponible",
            fieldName: "disponible",
            hiddenInMobile: true,
            visibleInTable: true,
            defaultValue: "",
            label: "Disponible",
            type: "checkbox",
        },
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



    const getAllProductos = $(async () => {
        const resp = await getAllProducts(authContext.token || "");
        if (resp.success) {
            productos.values = resp.data;
        }
    });

    const selectProducto = $((producto: any) => {
        console.log("Select Producto", producto);
        itemSelected.value = producto;
      })

      useTask$(async ({ track }) => {
        track(async () => show)
        if (show) {
         const resp = await getAllProductos();
         console.log("Respuesta", resp);
         
        }
      });

    return (
        <div >
            <Modal
                show={show}
                onClose$={$(() => {
                    onClose$();
                })}
                title={title}
                size="3xl"
            >
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick$={onClose$}>✕</button>
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
                                    <div class=" text-right ">
                                    <table class="table  bg-white table-pin-rows">
                  <thead>
                    <tr>
                      {
                        tableFieldConfiguration.map((field, idx) => {
                          if (field.visibleInTable) {
                            return (
                              <th class="text-left" key={idx}>
                                {field.title}
                              </th>
                            );
                          }
                        })
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {productos.length > 0 &&
                      productos.value.map((producto: any, idx: number) => {
                        return (
                          <tr class={`${filaSeleccinada.value === idx ? 'bg-primary-300' : ''
                            } hover:bg-primary-300 hover:cursor-pointer`} key={idx} onClick$={() => {
                              selectProducto(producto);
                              filaSeleccinada.value = idx;
                            }}>
                            <td >{producto.nombre}</td>
                            <td >{producto?.cantidad}</td>
                            <td >{producto.precio}</td>
                            <td >{producto?.preferencia}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" h-2"></div>
                        <div class=" card bg-slate-300 rounded-box place-items-end">
                            <div class="overflow-x-auto  w-full p-2">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
});
