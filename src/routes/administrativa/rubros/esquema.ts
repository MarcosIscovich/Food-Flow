import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";


export  const infoTitle: iPageData = {
    titulo: "Rubros",
    subTitulo: "Utilidad para gestionar rubros",
    ayuda:
      "Permite administrar los rubros para luego asociarlo a los subrubros.",
  };
  
export const modeloUrl = "rubros";
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
   nombre: z.string().min(1, "Ingrese el nombre del usuario."), 
   imagen: z.string().min(1, "Ingrese una imagen."),
 });
 
 export type FormField = "id" | "nombre" ;
 
export const dataInicial= {
   id: "",
   nombre: "",
    imagen: "",
 };
 