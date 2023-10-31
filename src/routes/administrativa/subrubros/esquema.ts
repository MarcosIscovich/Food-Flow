import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";


export const infoTitle: iPageData = {
  titulo: "SubRubros",
  subTitulo: "Utilidad para gestionar Subrubros",
  ayuda:
    "Permite administrar los subrubros para luego asociarlo a los productos.",
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
    ordenable: true,
  },
  {
    title: "Nombre",
    fieldName: "nombre",
    hiddenInMobile: false,
    visibleInTable: true,
    defaultValue: "",
    type: "text",
  },
  {
    title: "Rubro",
    fieldName: "rubro_id",
    hiddenInMobile: false,
    visibleInTable: true,
    defaultValue: "",
    options: [],
    type: "select",
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

export const validationSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "Ingrese el nombre del rubro."),
  rubro_id: z.union([z.string().min(1, "Ingrese un Rubro."), z.number().min(1, "Ingrese un Rubro.")]),
  imagen: z.string().min(1, "Ingrese una imagen."),
});

export type FormField = "id" | "nombre" | "rubro_id";

/* export type FormField = {
  id: string;
  nombre: string;
  rubro_id: string;
}; */

export const dataInicial = {
  id: "",
  nombre: "",
  imagen: "",
  rubro_id: "",
};
