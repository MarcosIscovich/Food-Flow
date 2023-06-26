import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";


export  const infoTitle: iPageData = {
    titulo: "Productos",
    subTitulo: "Utilidad para gestionar Productos",
    ayuda:
      "Agregar los productos al sistema ",
  };
  
export const modeloUrl = "productos";
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
 });
 
 export type FormField = "id" | "nombre" ;
 
export const dataInicial= {
   id: "",
   nombre: "",
 };
 