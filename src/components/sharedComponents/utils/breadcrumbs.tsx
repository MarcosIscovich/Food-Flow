import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface Diccionario {
  [key: string]: string;
}

const diccionario: Diccionario = {
  admin: "Dashboard",
};

export const Breadcrumbs = component$(() => {
  const urlPath = useSignal<string[]>([]);

  useVisibleTask$(() => {
    // get path url, and create return vecto of string
    const pathUrl = window.location.pathname.split("/");
    urlPath.value = pathUrl.filter((item) => item !== "") || [];
  });

  const getPath = (index: number) => {
    return "/" + urlPath.value.slice(0, index + 1).join("/");
  };

  const getNamePath = (nombre: string) => {
    if (diccionario[nombre]) {
      return diccionario[nombre];
    }else{
      nombre = nombre.replace(/-/g, " ");
    }
    return nombre;
  };

  return (
    <div class="text-sm breadcrumbs ml-5 relative lg:absolute ">
      <ul>
        {urlPath.value.map((item, index) => (
          <li key={index} class="capitalize">
            <Link href={getPath(index)}>{getNamePath(item)}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
});