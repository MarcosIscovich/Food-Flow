// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { $, component$, useSignal, } from '@builder.io/qwik';
import { routeLoader$, z } from '@builder.io/qwik-city';
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { formAction$, useForm, zodForm$ } from '@modular-forms/qwik';
import { ITableField } from "../clientes/index";
import { Modal } from "~/components/sharedComponents/modal";

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

const clienteSchema = z.object({
  nombre: z.string().min(1, 'Please enter your name.'),
  apellido: z.string().min(1, 'Please enter your last name.'),
  email: z
    .string()
    .min(1, 'Please enter your email.')
    .email('The email address is badly formatted.'),
  // password: z
  //   .string()
  //   .min(1, 'Please enter your password.')
  //   .min(8, 'You password must have 8 characters or more.'),
});
 
type ClienteForm = z.infer<typeof clienteSchema>;
 
export const useFormLoader = routeLoader$<InitialValues<ClienteForm>>(() => ({
  nombre: '',
  apellido: '',
  email: '',
  //password: '',
}));
 
export const useFormAction = formAction$<ClienteForm>((values) => {
  // Runs on server
}, zodForm$(clienteSchema));
 
export default component$<parametros>((props) => {
  const { show, title, itemData: _itemData, onClose$, onSave$, tableFields } = props;
  const loading = useSignal<boolean>(true);

  const [loginForm, { Form, Field }] = useForm<ClienteForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(clienteSchema),
  });
 
  const handleSubmit: SubmitHandler<ClienteForm> = $((values, event) => {
    // Runs on client
    console.log(values);
  });
 
  return (
    <>
      <Modal
        show={show}
        size="sm"
        onClose$={$(() => {
          onClose$();
        })}
        title={title}
      >
        {!loading.value ? (
          <Form onSubmit$={handleSubmit} class="w-full flex flex-col">
            {tableFields.map((field, index) => {
              if (!field.key) {
                return (
                  <div key={index} class="flex flex-col w-full">
                    <Field name={field.nombre}>
                      {(fie, props) => (
                        <div>
                          <input
                            {...props}
                            type={field.tipo}
                            value={fie.value}
                          />
                          {fie.error && <div>{fie.error}</div>}
                        </div>
                      )}
                    </Field>
                  </div>
                );
              }
            })}
            {/* <Field name="password">
        {(field, props) => (
          <div>
            <input {...props} type="password" value={field.value} />
            {field.error && <div>{field.error}</div>}
          </div>
        )}
      </Field> */}
            <button type="submit">Login</button>
          </Form>
        ) : (
          <div>Loading...</div>
        )}
      </Modal>
    </>
  );
});