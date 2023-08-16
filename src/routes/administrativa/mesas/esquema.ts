import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";


export const infoTitle: iPageData = {
  titulo: "Mesas",
  subTitulo: "Utilidad para gestionar mesas",
  ayuda:
    "Permite administrar las mesas.",
};

export const modeloUrl = "mesas";
export const filter = ["numero"];

export const tableFieldConfiguration: iTableFieldConfiguration[] = [
  {
    title: "ID",
    fieldName: "id",
    hiddenInMobile: true,
    visibleInTable: true,
    defaultValue: 0,
    type: "string",
  },
  {
    title: "Numero de mesa",
    fieldName: "numero",
    hiddenInMobile: false,
    visibleInTable: true,
    defaultValue: "",
    type: "text",
  },
  {
    title: "Capacidad",
    fieldName: "capacidad",
    hiddenInMobile: false,
    visibleInTable: true,
    defaultValue: "",
    type: "text",
  },
  {
    title: "Estado",
    fieldName: "estado_id",
    hiddenInMobile: false,
    visibleInTable: true,
    defaultValue: "",
    options: [],
    type: "select",
  }
];

export const validationSchema = z.object({
  id: z.string().optional(),
  numero: z.string().min(1, "Ingrese el numero de la mesa."),
  capacidad: z.string().min(1, "Ingresa capacidad para la mesa."),
  estado_id: z.string().min(1, "Ingrese un estado a la mesa"),
});

export type FormField = "id" | "numero" | "capacidad" | "estado_id";

export const dataInicial = {
  id: "",
  numero: "",
  capacidad: "",
  estado_id: "",
};
