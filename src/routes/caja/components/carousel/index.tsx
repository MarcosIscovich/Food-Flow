import { component$, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { AuthContext } from '~/context/auth/auth.context';
import { lista } from '~/services/generico.service';

export const CarouselItems = component$(() => {
    const authContext = useContext(AuthContext);
    const rubrosData = useSignal([]);

    useTask$(async ({ track }) => {
        track(() => authContext.token)
        if (authContext.token) {
            console.log("useTask$");
            const subrubros = await lista(authContext.token || "", 1, 20, "", "", "", "subrubros", []);
            console.log("SUBRUBROS", subrubros);

            const rubros = await lista(authContext.token || "", 1, 20, "", "", "", "rubros", []);
            rubrosData.value = rubros.data;
            console.log("Rubros", rubrosData.value);

            const productos = await lista(authContext.token || "", 1, 20, "", "", "", "productos", []);
            console.log("Productos", productos);
        }
    });
    return (
        <>
 <div class="flex justify-center bg-gray-200 ml-7 mr-7 rounded h-6">
            <span>Rubros</span>
          </div>
          <div class="grid grid-cols-10 justify-center mt-3 ml-7 mr-7">
            {rubrosData.value.map((rubro, idx) => (
              <div class="grid h-full" key={idx}>               
                  <button class="h-24 w-28 bg-colorblue hover:bg-blue-400 text-white font-bold border-colorblue hover:border-blue-500 rounded flex">
                    {rubro.nombre}
                  </button>
               
              </div>
            ))}
          </div>
        </>
    )

});