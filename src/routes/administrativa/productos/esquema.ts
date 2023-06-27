import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
import type { iPageData } from "~/interfaces/iPageData";
import { z } from "@builder.io/qwik-city";



export const infoTitle: iPageData = {
  titulo: "Productos",
  subTitulo: "Utilidad para gestionar productos",
  ayuda:
    "Permite administrar todos los productos",
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
    title: "Descripción",
    fieldName: "descripcion",
    hiddenInMobile: false,
    visibleInTable: true,
    defaultValue: "",
    type: "text",
  },
  {
    title: "Precio",
    fieldName: "precio",
    hiddenInMobile: true,
    visibleInTable: true,
    defaultValue: "",
    type: "text",
  },
  {
    title: "Disponible",
    fieldName: "disponible",
    hiddenInMobile: true,
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
  {
    title: "SubRubro",
    fieldName: "sub_rubro_id",
    hiddenInMobile: true,
    visibleInTable: true,
    defaultValue: "",
    options: [],
    type: "select",
  },
  {
    title: "Sector",
    fieldName: "sector_id",
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
  descripcion: z.string().min(1, "Ingrese una descripción."),
  precio: z.union([z.string().min(1, "Ingrese un precio."), z.number().min(1, "Ingrese un precio.")]),
  disponible: z.union([z.string().min(1, "Ingrese si el producto esta disponible."), z.number().min(1, "Ingrese si el producto esta disponible.")]),
  imagen: z.string().min(1, "Ingrese una imagen."),
  sub_rubro_id: z.union([z.string().min(1, "Ingrese un subrubro."), z.number().min(1, "Ingrese un subrubro.")]),
  sector_id: z.union([z.string().min(1, "Ingrese un sector."), z.number().min(1, "Ingrese un sector.")]),

});

export type FormField = "id" | "nombre" | "descripcion" | "precio" | "disponible" | "imagen" | "sub_rubro_id" | "sector_id";

export const dataInicial = {
  id: "",
  nombre: "",
  descripcion: "",
  precio: "",
  disponible: "",
  imagen: "",
  sub_rubro_id: "",
  sector_id: "",
};






