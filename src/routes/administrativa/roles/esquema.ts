import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";

export interface IRol {
  id?: string;
  nombre: string;
};

export  const infoTitle: iPageData = {
    titulo: "Roles",
    subTitulo: "Utilidad para gestionar roles",
    ayuda:
      "Permite administrar los roles",
  };
  
export const modeloUrl = "roles";

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
  }

];
 
 export const validationSchema = z.object({
   id: z.string().optional(),
   nombre: z.string().min(1, "Ingrese el nombre del insumo."),  
 });
 
 export type FormField = "id" | "nombre";
 
export let dataInicial= {
   id: "0",
   nombre: "",
 };
 





 