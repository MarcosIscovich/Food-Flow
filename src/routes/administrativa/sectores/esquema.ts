import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";


export  const infoTitle: iPageData = {
    titulo: "Sectores",
    subTitulo: "Utilidad para gestionar sectores",
    ayuda:
      "Permite administrar los sectores del sistema",
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
   nombre: z.string().min(1, "Ingrese el nombre del sector."),
  
 });
 
 export type FormField = "id" | "nombre" ;
 
export const dataInicial= {
   id: "",
   nombre: "",
   impresora: ""
   
 };
 