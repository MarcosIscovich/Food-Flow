import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";


export const infoTitle: iPageData = {
  titulo: "Subrubros",
  subTitulo: "Utilidad para gestionar Subrubros",
  ayuda:
    "Agregar los Subrubros al sistema para poder cargar productos",
};

export const modeloUrl = "subrubros";
export const filter = ["nombre"];

export const tableFieldConfiguration: iTableFieldConfiguration[] = [
  {
    title: "ID",
    fieldName: "id",
    hiddenInMobile: true,
    visibleInTable: true,
    defaultValue: 0,
    type: "number",
  },
  {
    title: "Rubro",
    fieldName: "rubroId",
    hiddenInMobile: false,
    visibleInTable: true,
    defaultValue: "",
    type: "select",
  },
  {
    title: "Nombre",
    fieldName: "nombre",
    hiddenInMobile: false,
    visibleInTable: true,
    defaultValue: "",
    type: "text",
  },


];

export const validationSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "Ingrese el nombre del rubro."),
  rubroId: z.string().min(1, "Ingrese el rubro."),
});

export type FormField = "id" | "nombre";

export let dataInicial = {
  id: "",
  nombre: "",
  rubroId: "",
};
