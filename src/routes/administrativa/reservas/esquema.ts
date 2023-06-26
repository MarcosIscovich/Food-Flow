import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";


export  const infoTitle: iPageData = {
    titulo: "Reservas",
    subTitulo: "Utilidad para gestionar reservas",
    ayuda:
      "Permite administrar los usuarios que pueden acceder a la app de chat.",
  };
  
export const modeloUrl = "reservas";
export const filter = ["cliente"];

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
    title: "Cliente",
    fieldName: "cliente",
    hiddenInMobile: false,
    visibleInTable: true,
    defaultValue: "",
    type: "text",
  },
  {
    title: "Telefono",
    fieldName: "telefono",
    hiddenInMobile: false,
    visibleInTable: true,
    defaultValue: "",
    type: "text",
  },
  {
    title: "Hora",
    fieldName: "hora",
    hiddenInMobile: true,
    visibleInTable: true,
    defaultValue: "",
    type: "time",
  },
  {
    title: "Fecha",
    fieldName: "dia",
    hiddenInMobile: true,
    visibleInTable: true,
    defaultValue: "",
    type: "date",
  },
  {
    title: "Cantidad",
    fieldName: "cantpersonas",
    hiddenInMobile: true,
    visibleInTable: true,
    defaultValue: "",
    options: [],
    type: "select",
  },
];
 
 export const validationSchema = z.object({
   id: z.string().optional(),
   cliente: z.string().min(1, "Ingrese el nombre del usuario."),
   telefono: z.string().min(1, "Ingrese el teléfono del usuario.").max(50),
   hora: z
     .string()
     .min(1, "Ingrese la hora.")
     .min(5, "Por favor ingrese una hora."),
     dia: z
     .string(),
     cantpersonas: z.union([z.string().min(1, "Ingrese la la cantidad."), z.number().min(1, "Ingrese la la cantidad.")])
     
 });
 
 export type FormField = "id" | "cliente" | "telefono" | "hora" | "dia" | "cantpersonas";
 
export let dataInicial= {
   id: "",
   cliente: "",
   telefono: "",
   hora: "",
   dia: "",
   cantpersonas: "0",
 };
 