import {
  component$,
  useSignal,
  useStore,
  $,
  useContext,
  Slot,
} from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";

import { Breadcrumbs } from "~/components/sharedComponents/utils/breadcrumbs";
import { Confirm } from "~/components/sharedComponents/utils/confirm.component";
import { Toast } from "~/components/sharedComponents/utils/toast.component";
import { AuthContext } from "~/context/auth/auth.context";

import { create, update, deleteItem } from "~/services/generico.service";
import { ModalGenerico } from "./modalGenerico";
import { IconQuestion } from "~/components/sharedComponents/icons";
import { Table } from "~/components/sharedComponents/utils/table";
import type { InitialValues } from "@modular-forms/qwik";
import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { infoTitle, modeloUrl, tableFieldConfiguration, dataInicial, filter } from './esquema';
import type { FormField } from "./esquema";
import { info, table } from "console";
import { selectOption } from '../../../interfaces/iTableFieldConfiguratio';
import type { IRubros } from "~/interfaces/iRubros";

export const useSelectOption = routeLoader$<selectOption[]>(() => {

  const selectOptions: selectOption[] = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ];

  return selectOptions;

});

export const useFormLoader = routeLoader$<InitialValues<IBaseCrud>>(() => {

  return dataInicial;
});

export default component$(() => {

  const authContext = useContext(AuthContext);
  const itemData = useStore<IBaseCrud>(
    /*  dataInicial */
    {
      id: "",
      nombre: "",
      //   telefono: "",
      //   hora: "",
      //   dia: "",
      //   cantpersonas: 0,
    }
  );

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
    console.log("fillItemData", item);
    if (item === null) {

      Object.entries(itemData).forEach(([key, value]) => {
        //typeof value === "number" ? (itemData[key] = 0) : (itemData[key] = "");
        const _key = key as keyof IBaseCrud;
        itemData[_key] = "";
      });

      console.log("fillItemData Null", itemData);
      // itemData.id = "";
      // itemData.cliente = "";
      // itemData.telefono = "";
      // itemData.hora = "";
      // itemData.dia = "";
      // itemData.cantpersonas = 0;
    } else {
      Object.entries(itemData).forEach(([key, value]) => {
        const _key = key as keyof IBaseCrud;
        itemData[_key] = item[_key] || "";
      });
      console.log("fillItemData Not Null", itemData);
      // itemData.id = item.id;
      // itemData.cliente = item.cliente;
      // itemData.telefono = item.telefono;
      // itemData.hora = item.hora;
      // itemData.dia = item.dia;
      // itemData.cantpersonas = item.cantpersonas;
    }
  });

  const confirmDeleteItem = $(async (_itemData: IBaseCrud) => {
    await fillItemData(_itemData);
    infoConfirm.show = true;
  });

  const itemDelete = $(async (itemData: IBaseCrud) => {
    const resp = await deleteItem(authContext.token || "", itemData, modeloUrl);

    console.log(modeloUrl, resp);

    infoConfirm.show = false;

    infoToast.msg = `Se ha eliminado el elemento correctamente`;
    infoToast.type = "success";
    infoToast.show = true;

    refreshData.value = !refreshData.value;
  });

  const itemSave = $(async () => {
    let resp: any;
    let tipoAccion = "creado";
    console.log("llega a itemSave", itemData);

    if (itemData?.id && itemData.id) {
      console.log("llega a editar itemSave", itemData);
      // Editar
      tipoAccion = "editado y guardado";
      resp = await update(authContext.token || "", itemData, modeloUrl);
    } else {
      console.log("llega a crear itemSave", itemData);
      resp = await create(authContext.token || "", itemData, modeloUrl);
    }

    refreshData.value = !refreshData.value;

    console.log(resp);
    if (resp && (resp?.data.id || tipoAccion == "editado y guardado")) {
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


  return <div>
  <Breadcrumbs />
  <div class="flex justify-center">
    <span class="text-3xl font-bold mb-7">Productos</span>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div class="col-span-1">
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-bold mb-4">Tabla</h2>
        <div class="flex mb-4">
          <input type="text" class="flex-1 px-4 py-2 border rounded-l" placeholder="Buscar..." />
          <button class="px-4 py-2 bg-blue-500 text-white rounded-r">Buscar</button>
        </div>
        <Table
          fieldConfiguration={tableFieldConfiguration}
          modeloURL={modeloUrl}
          refreshData={refreshData.value}
          inputTxt={inputTxt.value}
          setItemData={setItemData}
          confirmDeleteItem={confirmDeleteItem}
          _order={"id"}
          _orderSign={""}
          filter={filter}
        />
      </div>
    </div>

    <div class="col-span-1">
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-bold mb-4">Agregar Nuevo Producto</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <label for="nombre" class="block mb-2">Nombre:</label>
            <input type="text" id="nombre" name="nombre" class="w-full px-4 py-2 border rounded mb-4" />

            <label for="descripcion" class="block mb-2">Descripción:</label>
            <input type="text" id="descripcion" name="descripcion" class="w-full px-4 py-2 border rounded mb-4" />
          </div>

          <div class="col-span-2">
            <label for="disponible" class="flex items-center mb-2">
              <input type="checkbox" id="disponible" name="disponible" class="mr-2" />
              Disponible
            </label>
            Precio:
            <input type="text" id="precio" name="precio" class="w-full px-4 py-2 border rounded mb-4" />
          </div>

          <div class="col-span-2">
            <label for="imagen" class="block mb-2">Imagen:</label>
            <input type="file" id="imagen" name="imagen" class="w-full px-4 py-2 border rounded mb-4" />
          </div>

          <div class="col-span-2">
            <label for="subrubro" class="block mb-2">Subrubro:</label>
            <select id="subrubro" name="subrubro" class="w-full px-4 py-2 border rounded mb-4">
              <option value="1">Opción 1</option>
              <option value="2">Opción 2</option>
            </select>

            <label for="sector" class="block mb-2">Sector:</label>
            <select id="sector" name="sector" class="w-full px-4 py-2 border rounded mb-4">
              <option value="1">Opción 1</option>
              <option value="2">Opción 2</option>
            </select>
          </div>
        </div>
        <div class="flex justify-evenly">
          <button class="px-4 py-2 bg-blue-500 text-white rounded">Guardar</button>
          <button class="px-4 py-2 bg-blue-500 text-white rounded">Editar</button>
          <button class="px-4 py-2 bg-blue-500 text-white rounded">Deshabilitar</button>
          <button class="px-4 py-2 bg-blue-500 text-white rounded">Eliminar</button>
        </div>

      </div>
    </div>
  </div>
</div>



});