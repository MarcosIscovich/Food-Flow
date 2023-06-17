import {
    component$,
    useSignal,
    useStore,
    $,
    useComputed$,
    type PropFunction,
    useTask$,
  } from "@builder.io/qwik";
  
  import moment from "moment";
  import { Modal } from "~/components/sharedComponents/modal";
  import { ITableField } from ".";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { Field } from "@modular-forms/qwik";
  interface parametros {
    tableFields: ITableField[];
    show: boolean;
    title: string;
    itemData: {
      id: number;
      nombre: string;
      apellido: string;
      email: string;
      telefono: string;
      direccion: string;
      ciudad: string;
      codigo_postal: string;
      cuit: string;
      razon_social: string;
      condicion_iva: string;
      fecha_nacimiento: string;
    };
    onClose$: PropFunction<() => void>;
    onSave$: PropFunction<(data: any) => any>;
  }

    interface IitemData {
      id: number;
      nombre: string;
      apellido: string;
      email: string;
      telefono: string;
      direccion: string;
      ciudad: string;
      codigo_postal: string;
      cuit: string;
      razon_social: string;
      condicion_iva: string;
      fecha_nacimiento: string;
    }
  

  
  export const ClienteModal = component$<parametros>((props) => {
    const { show, title, itemData: _itemData, onClose$, onSave$, tableFields } = props;
  
    const loading = useSignal<boolean>(true);
   
    const itemDataS = useStore<any[]>([]
    //   {
    //     id: _itemData.id,
    //     nombre: _itemData.nombre,
    //     apellido: _itemData.apellido,
    //     email: _itemData.email,
    //     telefono: _itemData.telefono,
    //     direccion: _itemData.direccion,
    //     ciudad: _itemData.ciudad,
    //     codigo_postal: _itemData.codigo_postal,
    //     cuit: _itemData.cuit,
    //     razon_social: _itemData.razon_social,
    //     condicion_iva: _itemData.condicion_iva,
    //     fecha_nacimiento: _itemData.fecha_nacimiento,      
    // }
    );
  
      useTask$(({ track }) => {
        track(() => [_itemData, show]);
        console.log("cambia datos que llegan", _itemData);
        loading.value = true;
        let count=0;
        if (_itemData) {

        Object.entries(_itemData).forEach(([key, value]) => {
          itemDataS[count] =value;
          count++;
        });
        console.log("cambia datos que llegan ItemDataS", itemDataS);
        loading.value = false;
}
          
        

      });

    useTask$(({ track }) => {
      track(() => [itemDataS]);
      
      console.log("cambia data inputs", itemDataS);
        // itemData.id= _itemData.id,
        // itemData.nombre= _itemData.nombre,
        // itemData.apellido= _itemData.apellido,
        // itemData.email= _itemData.email,
        // itemData.telefono= _itemData.telefono,
        // itemData.direccion= _itemData.direccion,
        // itemData.ciudad= _itemData.ciudad,
        // itemData.codigo_postal= _itemData.codigo_postal,
        // itemData.cuit= _itemData.cuit,
        // itemData.razon_social= _itemData.razon_social,
        // itemData.condicion_iva= _itemData.condicion_iva,
        // itemData.fecha_nacimiento= moment(_itemData.fecha_nacimiento).format("yyyy-MM-DD")
    });
  
    const msgErrorTxt = useSignal<string>("");
  
    const itemSave = $(async () => {
      //itemData.cantCuponesCrear = parseInt(cantidadCupones.value);
      //const validatedForm = validateSchema.parse(itemDataS);
      onSave$(itemDataS);
    });
  
    const getValues = ((index: number) => {
      console.log("getValues", index, itemDataS[index]);
      return itemDataS[index];
    });

    const validateSchema = z.object({
      nombre: z.string().min(1).max(50),
      apellido: z.string().min(1).max(50),
      email: z.string().email(),
      telefono: z.string().min(1).max(50),
      direccion: z.string().min(1).max(50),
      ciudad: z.string().min(1).max(50),
      codigo_postal: z.string().min(1).max(50),
      cuit: z.string().min(1).max(50),
      razon_social: z.string().min(1).max(50),
      condicion_iva: z.string().min(1).max(50),
      fecha_nacimiento: z.date(),
    });


    const handleSubmit: SubmitHandler<any> = $((values, event) => {
//      event.preventDefault();
      console.log("handleSubmit", itemDataS);
       const validatedForm =  validateSchema.parse(itemDataS);
       
      // if (validatedForm) {
      //   //itemSave();
      // } else {
      //   msgErrorTxt.value = "Verifique los datos ingresados";
      // }
    });

    // const validateForm = useComputed$(() => {
    //   let valid = true;
    //   tableFields.forEach((field, index) => {
    //     if (field.zod ) {
    //       console.log("valida", z.field.zod, itemDataS[index]);

    //       valid = field.zod(itemDataS[index]).success;
    //     }
    //   });
    //   return valid;
    // });
  
    return (
      <div class=" ">
        <Modal
          show={show}
          size="sm"
          onClose$={$(() => {
            onClose$();
          })}
          title={title}
        >
          <div class="border-b border-gray-900/10 pb-4 pt-0 mt-0">
            {!loading.value ? (
            <form class="w-full flex flex-col  ">

              {tableFields.map((field, index) => {
                if(!field.key) {
                return (
                  <div
                    key={index}
                    class="flex flex-col w-full"
                  >
                    <div class="form-control">
                      <label
                        for={field.nombre}
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.nombre}
                        name={field.nombre}
                        //bind:value={itemData[index]}
                        onChange$={($event) => {
                          console.log("cambia input", $event.target.value);
                          itemDataS[index] = $event.target.value;
                          console.log("cambia input itemData", itemDataS);
                        }}
                        //bind:value={itemDataS[index]}
                        value={getValues(index)}
                        type={field.tipo}
                        onInput$={($event) => {
                          console.log("cambia input", $event.target);
                          itemDataS[index] = (
                            $event.target as HTMLInputElement
                          ).value;
                          console.log("cambia input itemData", itemDataS);
                        }}
                        //autoComplete={field.name}
                        class="  p-2 w-full input input-sm max-w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                );}
              }
              )}
            </form>
            ):(
              <div class="w-full flex flex-col  ">
                Loading
              </div>
                )}

            {msgErrorTxt.value?.length > 0 && msgErrorTxt.value ? (
              <div class="mt-10 p-3 text-red-500 bg-yellow-200 rounded-lg w-full text-center">
                {msgErrorTxt}
              </div>
            ) : (
              <button
                //disabled={validateForm.value}

                class="btn btn-primary btn-block mt-10"
                onClick$={() => {
                  itemSave();
                }}
              >
                CREAR
              </button>
            )}
          </div>
        </Modal>
      </div>
    );
  });
  