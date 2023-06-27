import {
  component$,
  useSignal,
  useStore,
  $,
  useResource$,
  useContext,
  Resource,
} from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, z } from "@builder.io/qwik-city";
import moment from "moment";
//import { Breadcrumbs } from "~/components/layout/breadcrumbs.component";
import { Confirm } from "~/components/sharedComponents/utils/confirm.component";
import { Toast } from "~/components/sharedComponents/utils/toast.component";
import { AuthContext } from '~/context/auth/auth.context';
import {
  lista,
  create,
  update,
  deleteRegistro,
 } from "~/services/clientes.service";
import { IconDown, IconUp } from "~/components/sharedComponents/icons";
import { Pagination } from "~/components/sharedComponents/utils/pagination.component";
import  ClienteForm  from "./Form";
import { InitialValues } from "@modular-forms/qwik";
import { selectOption } from "~/interfaces/iTableFieldConfiguratio";

export interface ICliente {
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
    createdAt?: Date;
    updatedAt?: Date;
  };

  const EnumCondicionIva = [
   "Responsable Inscripto",
   "Monotributista",
   "Exento",
   "Consumidor Final"
  ];

  const TableFields:ITableField [] = [
    { fieldName: "id", title: "ID", ordenable: true, type: "number", hiddenInMobile: true,
    visibleInTable: true, },
    { fieldName: "nombre", title: "Nombre", ordenable: true, type: "text" , hiddenInMobile: true,
    visibleInTable: true,},
    { fieldName: "apellido", title: "Apellido", ordenable: true, type: "text",  hiddenInMobile: true,
    visibleInTable: true, },
    { fieldName: "email", title: "Email", ordenable: true, type: "text",  hiddenInMobile: true,
    visibleInTable: true, },
    { fieldName: "telefono", title: "Teléfono", ordenable: true, type: "text",  hiddenInMobile: true,
    visibleInTable: true, },
    { fieldName: "direccion", title: "Dirección", ordenable: false, type: "text",  hiddenInMobile: true,
    visibleInTable: true, },
    { fieldName: "ciudad", title: "Ciudad", ordenable: false, type: "text",  hiddenInMobile: true,
    visibleInTable: true, },
    { fieldName: "codigo_postal", title: "Código Postal", ordenable: false, type: "text",  hiddenInMobile: true,
    visibleInTable: true, },
    { fieldName: "cuit", title: "CUIT", ordenable: false, type: "text",  hiddenInMobile: true,
    visibleInTable: true, },
    { fieldName: "razon_social", title: "Razón Social", ordenable: false, type: "text",  hiddenInMobile: true,
    visibleInTable: true, },
    { fieldName: "condicion_iva", title: "Condición IVA", ordenable: true,  hiddenInMobile: true,
    visibleInTable: true,  type: "select",  options: []} ,
    { fieldName: "fecha_nacimiento", title: "Fecha Nacimiento", ordenable: false,  hiddenInMobile: true,
    visibleInTable: true, type: "date" },
    { fieldName: "observaciones", title: "Observaciones", ordenable: true,  hiddenInMobile: true,
    visibleInTable: false,  type: "textarea"},
  ]

  
  export interface ITableField {
    fieldName: string;
    title: string;
    ordenable: boolean;
    type: string;
    key?: boolean;
    hiddenInMobile: boolean,
    visibleInTable: boolean,
    //las opciones son para los campos tipo select, salen de un Enum
    options?: selectOption[];
  }
    
    const infoTitle = {
  titulo: "Clientes",
  subTitulo: "Utilidad para gestionar clientes",
  ayuda:
    "Permite administrar clientes creados desde templates o generar nuevo manualmente",
};

export const clienteSchema = z.object({
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
 
export type ClienteForm = z.infer<typeof clienteSchema>;

export const useSelectOption = routeLoader$<selectOption[]> (() => {

  const selectOptions: selectOption[] = [
     { value: "1", label: "Responsable Inscripto" },
     { value: "2", label: "Monotributista" },
     { value: "3", label: "Exento" },
     { value: "4", label: "Consumidor Final" },
    // {label: "Responsable Inscripto"},
    // {label: "Monotributista"},
    // {label: "Exento"},
    // {label: "Consumidor Final"},

  ];

  return selectOptions;

});

export const useFormLoader = routeLoader$<InitialValues<ClienteForm>>((item) => 
  {
    const data = {
  id: 0,
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  codigo_postal: '',
  cuit: '',
  razon_social: '',
  condicion_iva: '',
  fecha_nacimiento: moment().add(30, "days").format("yyyy-MM-DD"),
  observaciones: '',
    }
    return data
}
);

export default component$(() => {
  const authContext = useContext(AuthContext);
  TableFields[10].options = useSelectOption().value;
  console.log("TableFields", TableFields);
  const itemData = useStore({
    id: 0,
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigo_postal: "",
    cuit: "",
    razon_social: "",
    condicion_iva: "",
    fecha_nacimiento: moment().add(30, "days").format("yyyy-MM-DD"),
    observaciones: "",
  });

  const infoToast = useStore({
    msg: "",
    type: "success",
    show: false,
  });
  const infoConfirm = useStore({
    msg: "Confirma eliminar el cliente?",
    show: false,
  });

  const loading = useSignal(false);
  const modalOpen = useSignal(false);

  const inputTxt = useSignal<string>("");
  const order = useSignal<string>("id");
  const orderSign = useSignal<string>("+");
  const refresh = useSignal<boolean>(false);

  const pagination = useStore({
    currentPage: 1,
    totalPages: 1,
  });

  const itemDelete = $(async (itemData: any) => {
    const resp = await deleteRegistro(authContext.token || "", itemData);

    console.log("delete", resp);

    infoConfirm.show = false;

    infoToast.msg = resp.ok ? `Se ha eliminado el template de cupón correctamente` : `La acción no se ha realizado, compruebe los datos ingresados e intente nuevamente`;
    infoToast.type = resp.ok ? "success" : "error";
    infoToast.show = true;

    refresh.value = !refresh.value;
    
  });

  const itemSave = $(async () => {
    let resp: any;
    let tipoAccion = "creado";

    if (itemData.id > 0) {
      // Editar
      tipoAccion = "editado y guardado";
      resp = await update(authContext.token || "", itemData);
    } else {
      resp = await create(authContext.token || "", itemData);
    }

    console.log(resp);
    if (resp && (resp?.id || tipoAccion == "editado y guardado")) {
      // show toast
      infoToast.msg = `Se ha ${tipoAccion} el cliente correctamente`;
      infoToast.type = "success";
      infoToast.show = true;

      const pag = pagination.currentPage;
      pagination.currentPage = 0;
      pagination.currentPage = pag;
      modalOpen.value = false;
    } else {
      // show toast
      infoToast.msg = `La acción no se ha realizado, compruebe los datos ingresados e intente nuevamente`;
      infoToast.type = "error";
      infoToast.show = true;
    }
  });

  const listaResource = useResource$<any>(async ({ track, cleanup }) => {
    const _paginaActual = track(() => pagination.currentPage);
    const _refersh = track(() => refresh.value);
    const _alterSearch = track(() => [
      authContext.token,
      inputTxt.value,
      order.value,
      orderSign.value,
      
    ]);
    const _carga = track(() =>  authContext.isAutenticated,);

    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));

    if (authContext.isAutenticated) {
      const response = await lista(
        _alterSearch[0] || "",
        _paginaActual,
        10,
        _alterSearch[1] || "",
        order.value,
        orderSign.value
      );
      console.log("lista", response);

      pagination.totalPages = response.meta.last_page;

      return response.data;
    }

    return [];
  });

  const setOrder = $((value: string) => {
    if (order.value != value) {
      order.value = value;
      orderSign.value = "+";
    } else {
      orderSign.value = orderSign.value == "+" ? "-" : "+";
    }
  });

  const getIconOrder = $((value: string) => {
    if (order.value == value) {
      return orderSign.value == "+" ? <IconUp /> : <IconDown />;
    } else {
      return <></>;
    }
  });

  const setItemData = $((item: any) => {
        if (item == null) {
          itemData.id= 0,
          itemData.nombre= "",
            itemData.apellido= "",
            itemData.email= "",
            itemData.telefono= "",
            itemData.direccion= "",
            itemData.ciudad= "",
            itemData.codigo_postal= "",
            itemData.cuit= "",
            itemData.razon_social= "",
            itemData.condicion_iva= "",
            itemData.fecha_nacimiento=  moment().add(30, "days").format("yyyy-MM-DD"),
            itemData.observaciones= "";

        } else {
          console.log("setDataItem", item);
            itemData.id= item.id,
            itemData.nombre= item.nombre,
            itemData.apellido= item.apellido,
            itemData.email= item.email,
            itemData.telefono= item.telefono,
            itemData.direccion= item.direccion,
            itemData.ciudad= item.ciudad,
            itemData.codigo_postal= item.codigo_postal,
            itemData.cuit= item.cuit,
            itemData.razon_social= item.razon_social,
            itemData.condicion_iva= item.condicion_iva,
            itemData.fecha_nacimiento= moment(item.fecha_nacimiento).format("yyyy-MM-DD"),
            itemData.observaciones= item.observaciones;
        }    
  });

  
  return (
    <div class="m-2">
      <div class="flex flex-col w-full border-opacity-50">
        <div class="grid card bg-base-200 rounded-box  place-items-center">
          {/* <div class="w-full place-content-start ">
            <Breadcrumbs />
          </div> */}
          <div class="text-center flex flex-col  ">
            <div
              class="tooltip tooltip-bottom  tooltip-warning -mb-5 "
              data-tip={infoTitle.ayuda}
            >
              <button class="btn btn-circle btn-ghost ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11.95 18q.525 0 .888-.363t.362-.887q0-.525-.362-.888t-.888-.362q-.525 0-.887.363t-.363.887q0 .525.363.888t.887.362Zm-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.313.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
                  />
                </svg>
              </button>{" "}
            </div>

            <div class="  pt-0">
              <h1 class="text-3xl font-bold  mt-3">
                {infoTitle.titulo}

                <p class=" mt-0 text-sm ">{infoTitle.subTitulo}</p>
              </h1>
            </div>

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
                <button
                  class="btn btn-primary mt-2 mr-5"
                  onClick$={async () => {
                    await setItemData(null);
                    modalOpen.value = true;
                  }}
                >
                  Nuevo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class=" h-2"></div>
        <div class=" card bg-slate-300 rounded-box place-items-end">
          <div class="overflow-x-auto  w-full p-2">
            <table class="table   table-xs w-full ">
              <thead>
                <tr>
                  {TableFields.map((field) => {
                    return (
                      <th
                        class={`${!field.visibleInTable ? " hidden " : field.hiddenInMobile ? "hidden md:table-cell ": ""}} ${field.ordenable ? " cursor-pointer " : ""}hover:bg-slate-400  rounded-md `}
                        onClick$={$(() => field.ordenable ? setOrder(field.fieldName): null)}
                      >
                        <div class="flex">
                          {field.title} {field.ordenable ? getIconOrder(field.fieldName): ""}
                        </div>
                      </th>
                    );
                  })}
                  <th></th>
                </tr>
              </thead>
              <tbody class="text-sm font-normal text-gray-700">
                <Resource
                  value={listaResource}
                  onPending={() => (
                    <div class="m-4  ">
                      <span class="loading loading-dots loading-lg  "></span>
                    </div>
                  )}
                  onResolved={(data) => {
                    
                    return data.map((item: any, index: number) => {
                      return (
                        <tr
                          key={index}
                        >
                          {TableFields.map((field) => {
                            return (
                              <td
                                class={`${!field.visibleInTable ? " hidden " : field.hiddenInMobile ? "hidden md:table-cell ": ""} `}
                      
                              >
                                  {item[field.fieldName]}  
                              </td>
                            );
                          }
                          )}  
                          <td>
                            <button
                              class="btn btn-square mr-1 btn-secondary btn-sm"
                              onClick$={async () => {
                                await setItemData(item);
                                modalOpen.value = true;
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
                                />
                              </svg>
                            </button>
                            <button
                              class="btn btn-square btn-error btn-sm"
                              onClick$={() => {
                                itemData.id = item.id;
                                infoConfirm.show = true;
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    });
                  }}
                />
              </tbody>
            </table>
          </div>
          <div class="flex w-full  align-middle justify-center p-2">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              goPage={$((num: number): any => {
                pagination.currentPage = num;
              })}
              decrementPage={$((): any => {
                pagination.currentPage -= 1;
              })}
              incrementPage={$((): any => {
                pagination.currentPage += 1;
              })}
            />
          </div>
        </div>
      </div>

      <ClienteForm
        tableFields={TableFields}
        show={modalOpen.value}
        itemData={itemData}
        onSave$={$(async (data: any) => {
          await setItemData(data);
          itemSave();
        })}
        onClose$={$(() => {
          modalOpen.value = false;
        })}
        title={
          itemData.id > 0
            ? "Editar Cliente"
            : "Nuevo Cliente"
        }
      />

      <Confirm
        msg={infoConfirm.msg}
        show={infoConfirm.show}
        resultOk$={$(() => {
          itemDelete(itemData);
        })}
        resultCancel$={$(() => {
          infoConfirm.show = false;
        })}
      />
      <Toast
        msg={infoToast.msg}
        show={infoToast.show}
        type={infoToast.type}
        onFinish={$(() => (infoToast.show = false))}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Clientes - Administracion",
  meta: [
    {
      name: "description",
      content: "Panel de control general",
    },
  ],
};
