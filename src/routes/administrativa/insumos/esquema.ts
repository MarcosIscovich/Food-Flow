import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";

export interface IInsumo {
  id: number;
  nombre: string;
  cantidad: number;
  tipo_unidad: string;
  proveedor: string;
  // createdAt?: Date;
  // updatedAt?: Date;
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
    fieldName: "tipo_unidad",
    hiddenInMobile: true,
    visibleInTable: true,
    defaultValue: "",
    options: [],
    type: "select",
  },
  {
    title: "Proveedor",
    fieldName: "proveedor",
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
   cantidad: z.number().min(1, "Ingrese una cantidad."),
   tipo_unidad: z.string().min(1, "Ingrese una unidad válida."),
    proveedor: z.string().min(1, "Ingrese un proveedor válido."),
     
 });
 
 export type FormField = "id" | "nombre" | "cantidad" | "tipo_unidad" | "proveedor";
 
export let dataInicial= {
   id: 0,
   nombre: "",
   cantidad: 0,
   tipo_unidad: "",
    proveedor: "",
 };
 





 