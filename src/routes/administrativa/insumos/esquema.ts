import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";

export interface IInsumo {
  id?: string;
  nombre: string;
  cantidad: string;
  unidad_medida_id: string;
  provedor_id: string;
};

export  const infoTitle: iPageData = {
    titulo: "Insumos",
    subTitulo: "Utilidad para gestionar insumos",
    ayuda:
      "Permite administrar los insumos",
  };
  
export const modeloUrl = "insumo";

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
    title: "Cantidad",
    fieldName: "cantidad",
    hiddenInMobile: false,
    visibleInTable: true,
    defaultValue: "",
    type: "number",
  },
  {
    title: "Unidad",
    fieldName: "unidad_medida_id",
    hiddenInMobile: true,
    visibleInTable: true,
    defaultValue: "",
    options: [],
    type: "select",
  },
  {
    title: "Proveedor",
    fieldName: "provedor_id",
    hiddenInMobile: true,
    visibleInTable: true,
    defaultValue: "",
    options: [],
    type: "select",
  }

];
 
 export const validationSchema = z.object({
   id: z.string().optional(),
   nombre: z.string().min(1, "Ingrese el nombre del insumo."),
   cantidad:  z.union([z.string().min(1, "Ingrese una cantidad."), z.number().min(1, "Ingrese una cantidad.")]),
   unidad_medida_id: z.union([z.string().min(1, "Ingrese una medida."), z.number().min(1, "Ingrese una medida.")]),
   provedor_id: z.union([z.string().min(1, "Ingrese un Provedor."), z.number().min(1, "Ingrese un Provedor.")]),
     
 });
 
 export type FormField = "id" | "nombre" | "cantidad" | "unidad_medida_id" | "provedor_id";
 
export let dataInicial= {
   id: "0",
   nombre: "",
   cantidad: "0",
   unidad_medida_id: "0",
   provedor_id: "0",
 };
 





 