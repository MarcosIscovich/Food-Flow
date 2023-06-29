import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";


export const infoTitle: iPageData = {
  titulo: "Sectores",
  subTitulo: "Utilidad para gestionar sectores",
  ayuda:
    "Permite administrar los rubros para luego asociarlo a los productos.",
};

export const modeloUrl = "sectores";
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
    title: "Impresora",
    fieldName: "impresora",
    hiddenInMobile: false,
    visibleInTable: true,
    defaultValue: "",
    type: "text",
  },
];

export const validationSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "Ingrese el nombre del sector."),
  impresora: z.string().min(1, "Ingrese una impresora."),
});

export type FormField = "id" | "nombre" | "impresora";

export let dataInicial = {
  id: "",
  nombre: "",
  impresora: "",
};
