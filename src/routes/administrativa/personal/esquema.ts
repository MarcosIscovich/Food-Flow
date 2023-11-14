import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";

export interface IPersonal {
    id?: string;
    nombre: string;
    apellido: string;
    telefono: string;
    dni: string;
    clave: string;
    role_id: string;
    fecha_nacimiento: string;
    email: string;
    password?: string;
    password_c?: string;
    changePassword?: string;
  };

  export  const infoTitle: iPageData = {
    titulo: "Personal",
    subTitulo: "Utilidad para gestionar personal",
    ayuda:
      "Permite administrar los personal",
  };
  
export const modeloUrl = "personal";

export const filter = ["nombre"];

export const order = "apellido";

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
      fieldName: "apellido",
      title: "Apellido",
      ordenable: true,
      type: "text",
      hiddenInMobile: true,
      visibleInTable: true,
      defaultValue: 0,
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
      fieldName: "telefono",
      title: "Teléfono",
      ordenable: true,
      type: "text",
      hiddenInMobile: true,
      visibleInTable: true,
      defaultValue: 0,
    },
    {
      fieldName: "dni",
      title: "DNI",
      ordenable: false,
      type: "text",
      hiddenInMobile: true,
      visibleInTable: true,
      defaultValue: 0,
    },
    {
      fieldName: "clave",
      title: "Clave",
      ordenable: false,
      type: "text",
      hiddenInMobile: true,
      visibleInTable: false,
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
        fieldName: "role_id",
        title: "Rol",
        ordenable: true,
        type: "select",
        options: [],
        hiddenInMobile: true,
        visibleInTable: true,
        defaultValue: 0,
    },
    {
      fieldName: "password",
      title: "Password",
      type: "password",
      hiddenInMobile: true,
      visibleInTable: false,
      defaultValue: 0,
  },
  {
    fieldName: "password_c",
    title: "Password Confirm",
    type: "password",
    hiddenInMobile: true,
    visibleInTable: false,
    defaultValue: 0,
},
{
  fieldName: "changePassword",
  title: "Password Confirm",
  type: "checkbox",
  label: "Cambiar Password",
  hiddenInMobile: true,
  visibleInTable: false,
  defaultValue: 0,
},
  ];

  export const validationSchema = z
    .object({
      id: z.string().optional(),
      nombre: z.string().min(1, "Please enter your name."),
      apellido: z.string().min(1, "Please enter your last name."),
      telefono: z
        .string()
        .min(6, "Ingrese un nro telefono"),
        //.transform((data) => Number(data)),
      dni: z
        .string()
        .min(6, "Ingrese un nro DNI minimo 6 digitos")
        .max(8, "Ingrese un nro DNI maximo 8 digitos")
        .regex(new RegExp(".*[0-9].*"), "Ingrese un nro DNI valido"),
      clave: z.union([
        z.string().min(1, "Por favor ingrese un rol"),
        z.number().min(1, "Por favor ingrese un rol"),
      ]),
      role_id: z.union([
        z.string().min(1, "Por favor ingrese un rol"),
        z.number().min(1, "Por favor ingrese un rol"),
      ]),
      fecha_nacimiento: z.string().min(1).max(50),
      email: z
        .string()
        .min(1, "Please enter your email.")
        .email("The email address is badly formatted."),
      changePassword: z.string(),
      password: z
        .string()
        .min(6, "Please enter your password min 6 caracteres"),
      password_c: z
        .string()
        .min(6, "Please enter your password min 6 caracteres"),
    })
    .refine((data) => data.password === data.password_c, {
      message: "Passwords don't match",
      path: ["password_c"],
    });
  

  export type FormField =
    | "id"
    | "nombre"
    | "apellido"
    | "telefono"
    | "dni"
    | "clave"
    | "role_id"
    | "fecha_nacimiento"
    | "email"
    | "password"
    | "password_c"
    | "changePassword";
    
 export let dataInicial = {
   id: "",
   nombre: "",
   apellido: "",
   telefono: "",
    dni: "",
    clave: "",
    role_id: "",
    fecha_nacimiento: "",
    email: "",
    password: "",
    password_c: "",
    changePassword: "",
  };
  