import {
  component$,
  useSignal,
  useStore,
  $,
  useContext,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { Breadcrumbs } from "~/components/sharedComponents/utils/breadcrumbs";
import { Confirm } from "~/components/sharedComponents/utils/confirm.component";
import { Toast } from "~/components/sharedComponents/utils/toast.component";
import { AuthContext } from "~/context/auth/auth.context";
import { create, update, deleteItem, lista, selectItems } from "~/services/generico.service";
import { ModalGenerico } from "./modalGenerico";
import { IconQuestion } from "~/components/sharedComponents/icons";
import { Table } from "~/components/sharedComponents/utils/table";
import type { InitialValues } from "@modular-forms/qwik";
import { infoTitle, modeloUrl, tableFieldConfiguration, dataInicial,filter, IPersonal, order } from "./esquema";
import { selectOption } from '../../../interfaces/iTableFieldConfiguratio';

interface IBaseCrud extends IPersonal {}

export const useFormLoader = routeLoader$<InitialValues<IBaseCrud>>(() => {
  return dataInicial;
});

export default component$(() => {

  const authContext = useContext(AuthContext);
  const itemData = useStore<IBaseCrud>(
    dataInicial
  );
  const load = useSignal<boolean>(false);

 
  useTask$(async({track}) => {
    track(() => authContext.token);
    if(authContext?.token){
     // console.log("useTask$");
      const iva = await selectItems(authContext.token || "", "roles");
     // console.log("lista", iva);

      const selectOptions: selectOption[] = iva.data.map((item: any) => {
        return { value: item.id, label: item.nombre };
      });
      tableFieldConfiguration[8].options = selectOptions;
      load.value = true;

      
    }
  });

  const infoToast = useStore({
    msg: "",
    type: "success",
    show: false,
  });
  const infoConfirm = useStore({
    msg: "Confirma eliminar el usuario?",
    show: false,
  });

  const modalOpen = useSignal(false);

  const inputTxt = useSignal<string>("");
  const refreshData = useSignal<boolean>(false);

  const fillItemData = $((item: IBaseCrud | null) => {
   // console.log("fillItemData", item);
    if (item === null) {
      Object.entries(itemData).forEach(([key]) => {
        const _key = key as keyof IBaseCrud;
        itemData[_key] = "";
      });

    } else {
      Object.entries(itemData).forEach(([key]) => {
        const _key = key as keyof IBaseCrud;
        itemData[_key] = item[_key] || "";
      });
    }
  });

  const confirmDeleteItem = $(async (_itemData: IBaseCrud) => {
    await fillItemData(_itemData);
    infoConfirm.show = true;
  });

  const itemDelete = $(async (itemData: IBaseCrud) => {
    const resp = await deleteItem(authContext.token || "", itemData, modeloUrl);

    //console.log(modeloUrl, resp);

    infoConfirm.show = false;

    infoToast.msg = `Se ha eliminado el elemento correctamente`;
    infoToast.type = "success";
    infoToast.show = true;

    refreshData.value = !refreshData.value;
  });

  const itemSave = $(async () => {
    let resp: any;
    let tipoAccion = "creado";
   // console.log("llega a itemSave", itemData);

    if (itemData?.id && itemData.id) {
    //  console.log("llega a editar itemSave", itemData);
      // Editar
      tipoAccion = "editado y guardado";
      resp = await update(authContext.token || "", itemData, modeloUrl);
    } else {
     // console.log("llega a crear itemSave", itemData);
      resp = await create(authContext.token || "", itemData, modeloUrl);
    }

    refreshData.value = !refreshData.value;

   // console.log(resp);
    if (resp.data.id && (resp?.data.id || tipoAccion == "editado y guardado")) {
      // show toast
      infoToast.msg = `Se ha ${tipoAccion} el elemento correctamente`;
      infoToast.type = "success";
      infoToast.show = true;

      modalOpen.value = false;
    } else {
      // show toast
      infoToast.msg = `La acción no se ha realizado, compruebe los datos ingresados e intente nuevamente`;
      infoToast.type = "error";
      infoToast.show = true;
    }
  });

  const setItemData = $(async (_itemData: IBaseCrud | null) => {
    await fillItemData(_itemData);
    modalOpen.value = true;
  });

  return (
    <div class="m-2">
      <div class="flex flex-col w-full border-opacity-50">
        <div class="grid card bg-base-200 rounded-box  place-items-center">
          <div class="w-full place-content-start ">
            <Breadcrumbs />
          </div>
          <div class="text-center flex flex-col  ">
            <div
              class="tooltip tooltip-bottom  tooltip-warning -mb-5 "
              data-tip={infoTitle.ayuda}
            >
              <button class="btn btn-circle btn-ghost ">
                <IconQuestion />
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
                  class="btn  mt-2 mr-5  btn-warning  "
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
          {authContext.token && load && (
            <Table
              fieldConfiguration={tableFieldConfiguration}
              modeloURL={modeloUrl}
              refreshData={refreshData.value}
              inputTxt={inputTxt.value}
              setItemData={setItemData}
              confirmDeleteItem={confirmDeleteItem}
              _order={order}
              _orderSign={""}
              filter={filter}
              //uploadPhoto={(item: any) => console.log("uploadPhoto", item)}
            />
          )}
          </div>
        </div>
      </div>
      {authContext.token && load && (
      <ModalGenerico
        show={modalOpen.value}
        itemData={itemData}
        tableFields={tableFieldConfiguration}
        onSave$={$(async (data: any) => {
          await setItemData(data);
          itemSave();
        })}
        onClose$={$(() => {
          modalOpen.value = false;
        })}
        title={
          itemData?.id && itemData?.id ? `Editar ${infoTitle.titulo}` : `Nuevo ${infoTitle.titulo}`
        }
      />
      )}

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
  title: infoTitle.titulo,
  meta: [
    {
      name: "description",
      content: infoTitle.subTitulo,
    },
  ],
};
