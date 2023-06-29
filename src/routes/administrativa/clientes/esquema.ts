import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";

export interface ICliente {
    id?: string;
    nombre: string;
    apellido: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    codigo_postal: string;
    cuit: string;
    razon_social: string;
    condicion_ivas_id: string;
    fecha_nacimiento: string;
    email: string;
    observaciones: string;
 
  };

  export  const infoTitle: iPageData = {
    titulo: "Clientes",
    subTitulo: "Utilidad para gestionar clientes",
    ayuda:
      "Permite administrar los clientes",
  };
  
export const modeloUrl = "clientes";

export const filter = ["nombre"];

export const tableFieldConfiguration: iTableFieldConfiguration[] = [
    {
      fieldName: "id",
      title: "ID",
      type: "number",
      hiddenInMobile: true,
      visibleInTable: true,
      defaultValue: 0,
      ordenable: true,
    },
    {
      fieldName: "nombre",
      title: "Nombre",
      ordenable: true,
      type: "text",
      hiddenInMobile: true,
      visibleInTable: true,
      defaultValue: 0,
    },
    {
      fieldName: "apellido",
      title: "Apellido",
      ordenable: true,
      type: "text",
      hiddenInMobile: true,
      visibleInTable: true,
      defaultValue: 0,
    },
    {
      fieldName: "telefono",
      title: "Teléfono",
      ordenable: true,
      type: "text",
      hiddenInMobile: true,
      visibleInTable: true,
      defaultValue: 0,
    },
    {
      fieldName: "direccion",
      title: "Dirección",
      ordenable: false,
      type: "text",
      hiddenInMobile: true,
      visibleInTable: true,
      defaultValue: 0,
    },
    {
      fieldName: "ciudad",
      title: "Ciudad",
      ordenable: false,
      type: "text",
      hiddenInMobile: true,
      visibleInTable: true,
      defaultValue: 0,
    },
    {
      fieldName: "codigo_postal",
      title: "Código Postal",
      ordenable: false,
      type: "text",
      hiddenInMobile: true,
      visibleInTable: true,
      defaultValue: 0,
    },
    {
      fieldName: "cuit",
      title: "CUIT",
      ordenable: false,
      type: "text",
      hiddenInMobile: true,
      visibleInTable: true,
      defaultValue: 0,
    },
    {
      fieldName: "razon_social",
      title: "Razón Social",
      ordenable: false,
      type: "text",
      hiddenInMobile: true,
      visibleInTable: true,
      defaultValue: 0,
    },
    {
      fieldName: "condicion_ivas_id",
      title: "Condición IVA",
      hiddenInMobile: true,
      visibleInTable: true,
      type: "select",
      options: [],
      defaultValue: 0,
    },
    {
      fieldName: "fecha_nacimiento",
      title: "Fecha Nacimiento",
      ordenable: false,
      hiddenInMobile: true,
      visibleInTable: true,
      type: "date",
      defaultValue: 0,
    },
    {
        fieldName: "email",
        title: "Email",
        ordenable: true,
        type: "text",
        hiddenInMobile: true,
        visibleInTable: true,
        defaultValue: 0,
    },
    {
      fieldName: "observaciones",
      title: "Observaciones",
      ordenable: true,
      hiddenInMobile: true,
      visibleInTable: false,
      type: "textarea",
      defaultValue: 0,
    }
  ];

  export const validationSchema = z.object({
    id: z.string().optional(),
    nombre: z.string().min(1, 'Please enter your name.'),
    apellido: z.string().min(1, 'Please enter your last name.'),
    telefono: z.string().min(1).max(50),
    direccion: z.string().min(1).max(50),
    ciudad: z.string().min(1).max(50),
    codigo_postal: z.string().min(1).max(50),
    cuit: z.string().min(10).max(11),
    razon_social: z.string().min(1).max(50),
    condicion_ivas_id: z.string().min(1).max(50),
    fecha_nacimiento: z.string().min(1).max(50),
    email: z.string().min(1, 'Please enter your email.').email('The email address is badly formatted.'),
    observaciones: z.string().min(1).max(250)
  });
  
  export type FormField =
    | "id"
    | "nombre"
    | "apellido"
    | "telefono"
    | "direccion"
    | "ciudad"
    | "codigo_postal"
    | "cuit"
    | "razon_social"
    | "condicion_ivas_id"
    | "fecha_nacimiento"
    | "email"
    | "observaciones";
  
 export let dataInicial = {
   id: "0",
   nombre: "",
   apellido: "",
   telefono: "",
   direccion: "",
   ciudad: "",
   codigo_postal: "",
   cuit: "",
   razon_social: "",
   condicion_ivas_id: "",
   fecha_nacimiento: "",
   email: "",
   observaciones: ""

 };
  