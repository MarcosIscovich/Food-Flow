// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { $, component$, useSignal, useStore, useTask$} from '@builder.io/qwik';
import { routeLoader$, z } from '@builder.io/qwik-city';
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { formAction$, reset, setValues, setValue, useForm, zodForm$ } from '@modular-forms/qwik';
import { ITableField } from ".";
import { Modal } from "~/components/sharedComponents/modal";
import { table } from 'console';
import {useFormLoader} from './index'
import { on } from 'events';

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
      observaciones: string;
    };
    onClose$: PropFunction<() => void>;
    onSave$: PropFunction<(data: any) => any>;
  }
   
const clienteSchema = z.object({
    id: z.number().optional(),
    nombre: z.string().min(1, 'Please enter your name.'),
    apellido: z.string().min(1, 'Please enter your last name.'),
    telefono: z.string().min(1).max(50),
    direccion: z.string().min(1).max(50),
    ciudad: z.string().min(1).max(50),
    codigo_postal: z.string().min(1).max(50),
    cuit: z.string().min(10).max(11),
    razon_social: z.string().min(1).max(50),
    condicion_iva: z.string().min(1).max(50),
    fecha_nacimiento: z.string(),
email: z
  .string()
  .min(1, 'Please enter your email.')
  .email('The email address is badly formatted.'),
  observaciones: z.string().min(1).max(50),
// password: z
//   .string()
//   .min(1, 'Please enter your password.')
//   .min(8, 'You password must have 8 characters or more.'),
});

type ClienteForm = z.infer<typeof clienteSchema>;

export const useFormAction = formAction$<ClienteForm>((values) => {
  // Runs on server
  console.log('action', values);
}, zodForm$(clienteSchema));
 
export default component$<parametros>((props) => {
  const { show, title, itemData: _itemData, onClose$, onSave$, tableFields } = props;
  const loading = useSignal<boolean>(true);
  const [clienteForm, { Form, Field }] = useForm<ClienteForm>({
    loader: useFormLoader(_itemData),
    action: useFormAction(),
    validate: zodForm$(clienteSchema),
  });
  
  const itemDataS = useStore<ClienteForm[]>([]
    );
 
    useTask$(({ track }) => {
      track(() => [_itemData, show]);
      console.log("cambia datos que llegan", _itemData);
      loading.value = true;
      let count = 0;
      if (_itemData.id > 0) {
        Object.entries(_itemData).forEach(([key, value]) => {
          itemDataS[count] = value;
          setValue(clienteForm, key, value);
          count++;
        });
        console.log("cambia datos que llegan ItemDataS", itemDataS);
       const val = [itemDataS];
       console.log("cambia datos que llegan val", val);
        //reset(clienteForm, {initialValues: val[0] });
     
       
      }
      loading.value = false;
    });

    const itemSave = $(async () => {
        //itemData.cantCuponesCrear = parseInt(cantidadCupones.value);
        //const validatedForm = validateSchema.parse(itemDataS);
        onSave$(itemDataS);
      });
    

  const handleSubmit: SubmitHandler<ClienteForm> = $((values, event) => {
    // Runs on client
    console.log('handle', values);
    onSave$(values);
    onClose$();
    //itemSave();
  });
 
  return (
    <>
      <Modal
        show={show}
        size=""
        onClose$={$(() => {
          onClose$();
        })}
        title={title}
      >
        {!loading.value ? (
        <div class="w-full">
          <Form onSubmit$={handleSubmit} class="flex flex-col items-center">
            <div class="rounded-md text-2xl m-2">
            {tableFields.map((field, index) => {
             
                return (
                  <div key={index} >
                    <Field name={field.nombre} >  
                      {(fie, props) => (
                        <div class="rounded-md text-2xl m-2 flex flex-col">
                             <label class={field.key ? 'hidden' : ''} for={field.nombre}>{field.label}</label>
                            <input class={`${field.key ? 'hidden' : 'm-2 p-2 border-2 border-gray-300 rounded-md'}`}
                            {...props}
                            type={field.tipo}
                            value={fie.value}
                          />
                          {fie.error && <div >{fie.error}</div>}
                        </div>
                      )}
                    </Field>
                  </div>
                );
              
            })}
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </Form>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Modal>
    </>
  );
});