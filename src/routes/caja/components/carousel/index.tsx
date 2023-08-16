import { $, component$, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { AuthContext } from '~/context/auth/auth.context';
import { lista } from '~/services/generico.service';
import type { IRubros } from '~/interfaces/iRubros';
import type { ISubRubros } from '~/interfaces/iSubRubro';
import type { IProductos } from '~/interfaces/iProductos';



export const CarouselItems = component$(() => {
  const authContext = useContext(AuthContext);
  const rubrosData = useSignal<IRubros[]>([]);
  const subrubrosData = useSignal<ISubRubros[]>([]);
  const productosData = useSignal<IProductos[]>([]);
  const selectedRubro = useSignal<string | null>(null);
  const selectedSubrubro = useSignal<string | null>(null);
  const showRubros = useSignal<boolean>(true);
  const showSubrubros = useSignal<boolean>(false);
  const showProductos = useSignal<boolean>(false);

  useTask$(async ({ track }) => {
    track(() => authContext.token)
    if (authContext.token) {
      console.log("useTask$");
      const subrubros = await lista(authContext.token || "", 1, 20, "", "", "", "subrubros", []);
      console.log("SUBRUBROS", subrubros);
      subrubrosData.value = subrubros.data;

      const rubros = await lista(authContext.token || "", 1, 20, "", "", "", "rubros", []);
      rubrosData.value = rubros.data;
      console.log("Rubros", rubrosData.value);

      const productos = await lista(authContext.token || "", 1, 20, "", "", "", "productos", []);
      productosData.value = productos.data;
      console.log("Productos", productosData.value);
    }
  });

  const showItems = $((id: string, action: string) => {
    console.log("showItems", id);
    if (action === "showSubrubros") {
      showRubros.value = false;
      selectedRubro.value = id;
      showSubrubros.value = true;
    }
    if (action === "showProductos") {
      showSubrubros.value = false;
      selectedSubrubro.value = id;
      showProductos.value = true;
    }
  });

  const clearShow = $(() => {
    showRubros.value = true;
    showSubrubros.value = false;
    showProductos.value = false;
  });

  return (
    <>
      <div class="grid grid-cols-2 bg-gray-200 ml-7 mr-7 rounded h-6">
        <div class="flex justify-start">
          <button onClick$={() => clearShow()}>Volver</button>
        </div>
        <div>

          <span>
            {
              showRubros.value && "Rubros" ||
              showSubrubros.value && "Subrubros" ||
              showProductos.value && "Productos"
            }
          </span>
        </div>

      </div>
      {showRubros.value && (
        <div class="grid grid-cols-10 justify-center mt-3 ml-7 mr-7">
          {rubrosData.value.map((rubro, idx) => (
              <div class="grid h-full" key={idx}>
                <button class="h-24 w-28 bg-colorblue hover:bg-blue-400 text-white font-bold border-colorblue hover:border-blue-500 rounded flex"
                  onClick$={() => rubro.id !== undefined && showItems(rubro.id, "showSubrubros")}>
                  {rubro.nombre}
                </button>
              </div>
            ))}
        </div>
      )}

      {showSubrubros.value && (
        <div class="grid grid-cols-10 justify-center mt-3 ml-7 mr-7">
          {subrubrosData.value
            .filter(subrubro => subrubro.rubro_id === selectedRubro.value)
            .map((subrubro, idx) => (
              <button class="h-24 w-28 bg-colorblue hover:bg-blue-400 text-white font-bold border-colorblue hover:border-blue-500 rounded flex"
                key={idx}
                onClick$={() => subrubro.id !== undefined && showItems(subrubro.id, "showProductos")}>
                {subrubro.nombre}
              </button>
            ))}
        </div>
      )}

      {showProductos.value && (
        <div class="grid grid-cols-10 justify-center mt-3 ml-7 mr-7">
          {productosData.value
            .filter(producto => producto.sub_rubro_id === selectedSubrubro.value)
            .map((producto, idx) => (
              <div class="h-24 w-28 bg-colorblue hover:bg-blue-400 text-white font-bold border-colorblue hover:border-blue-500 rounded flex" key={idx}>
                <span>{producto.nombre}</span>
              </div>
            ))}
        </div>
      )}
    </>
  )
});
