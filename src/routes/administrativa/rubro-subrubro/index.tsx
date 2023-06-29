import { component$ } from "@builder.io/qwik";

import { routeLoader$ } from "@builder.io/qwik-city";

export const useRubroSubRubro = routeLoader$(
    () => import("./layout"),
);


export default component$(() => {
    return (
        <div class="p-5 ">
        <div class="container w-full">
            <div class="grid grid-cols-2 gap-8">
                <div>
                    rubros

                </div>


                <div >
                    subrubros
                    
                </div>
            </div>
        </div>


    </div>
    );
    }
);