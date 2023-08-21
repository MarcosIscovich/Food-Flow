import { component$ } from '@builder.io/qwik';
import mesas from './mesas';

export const ViewMesas = component$(() => {
    return (
      <>
        <div class="card  bg-secondary-100" style="height: 100%;">
          <figure>
            <h1>Mesas click para cambiar</h1>
          </figure>
          <div class="card-body">
            <div class="grid grid-cols-10">
              {mesas.map((mesa, idx) => {
                let $class =
                        mesa.estado === "ocupada"
                      ? "mesa--ocupada"
                      : mesa.estado === "cerrada"
                      ? "mesa--cerrada"
                      : mesa.estado === "reservada"
                      ? "mesa--reservada"
                      : "mesa--libre"
                   //console.log($class);
                   $class = "mesa m-1 w-16 " + $class 

                return (
                  <div class="grid" key={idx}>
                    <div>
                      <button
                        class={$class}
                        onClick$={() => {
                            console.log("Mesa: ", mesa.id);
                        }}
                      >
                        {mesa.id}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    ); 
    
});