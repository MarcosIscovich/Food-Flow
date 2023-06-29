import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";

export interface IProvedor {
  id?: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigo_postal: string;
  cuit: string;
  razon_social: string;
  condicion_ivas_id: string;
  fecha_nacimiento: string;
  // createdAt?: Date;
  // updatedAt?: Date;
};

export  const infoTitle: iPageData = {
    titulo: "Proveedores",
    subTitulo: "Utilidad para gestionar proveedores",
    ayuda:
      "Permite administrar los proveedores",
  };
  
export const modeloUrl = "provedor";

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
    title: "Apellido",
    fieldName: "apellido",
    hiddenInMobile: false,
    visibleInTable: true,
    defaultValue: "",
    type: "text",
  },
  {
    title: "Email",
    fieldName: "email",
    hiddenInMobile: true,
    visibleInTable: true,
    defaultValue: "",
    type: "email",
  },
  {
    title: "Telefono",
    fieldName: "telefono",
    hiddenInMobile: true,
    visibleInTable: true,
    defaultValue: "",
    type: "text",
  },
  {
    title: "Direccion",
    fieldName: "direccion",
    hiddenInMobile: true,
    visibleInTable: true,
    defaultValue: "",
    type: "text",
  },
   {
     title: "Ciudad",
     fieldName: "ciudad",
     hiddenInMobile: true,
     visibleInTable: true,
     defaultValue: "",
     options: [],
     type: "text",
   },
   {
     title: "Codigo Postal",
     fieldName: "codigo_postal",
     hiddenInMobile: true,
     visibleInTable: true,
     defaultValue: "",
     type: "text",
   },
   {
     title: "Cuit",
     fieldName: "cuit",
     hiddenInMobile: true,
     visibleInTable: true,
     defaultValue: "",
     type: "text",
   },
   {
     title: "Razon Social",
     fieldName: "razon_social",
     hiddenInMobile: true,
     visibleInTable: true,
     defaultValue: "",
     type: "text",
   },
   {
     title: "Condicion IVA",
     fieldName: "condicion_ivas_id",
     hiddenInMobile: true,
     visibleInTable: true,
     defaultValue: "",
     options: [],
     type: "select",
   },
   {
     title: "Fecha Nacimiento",
     fieldName: "fecha_nacimiento",
     hiddenInMobile: true,
     visibleInTable: false,
     defaultValue: "",
     type: "date",
   },

];
 
 export const validationSchema = z.object({
   id: z.string().optional(),
   nombre: z.string().min(1, "Ingrese el nombre del usuario."),
   apellido: z.string().min(1, "Ingrese el apellido del usuario."),
   email: z.string().email("Ingrese un email válido."),
   telefono: z.string().min(1, "Ingrese el teléfono del usuario.").max(50),
   direccion: z.string().min(1, "Ingrese la dirección del usuario.").max(50),
   ciudad: z.string().min(1, "Ingrese la ciudad del usuario.").max(50),
   codigo_postal: z.string().min(1, "Ingrese el código postal del usuario.").max(50),
   cuit: z.string().min(1, "Ingrese el cuit del usuario.").max(50),
   razon_social: z.string().min(1, "Ingrese la razón social del usuario.").max(50),
   condicion_ivas_id: z.string().min(1, "Ingrese la condición IVA del usuario.").max(50),
   fecha_nacimiento: z.string().min(1, "Ingrese la fecha de nacimiento del usuario.").max(50),
     
 });
 
 export type FormField =
   | "id"
   | "nombre"
   | "apellido"
   | "email"
   | "telefono"
   | "direccion"
   | "ciudad"
   | "codigo_postal"
   | "cuit"
   | "razon_social"
   | "condicion_ivas_id"
   | "fecha_nacimiento";
 
export let dataInicial= {
   id: "0",
   nombre: "",
   apellido: "",
   email: "",
   telefono: "",
   direccion: "",
   ciudad: "",
   codigo_postal: "",
   cuit: "",
   razon_social: "",
   condicion_ivas_id: "",
   fecha_nacimiento: "",
   
 };
 





 