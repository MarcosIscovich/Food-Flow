import { $, component$ } from '@builder.io/qwik';
import mesas from './mesas';

export const ViewMesasAdicionador = component$(() => {

const mesaSelected = $((id: number) => {
    //console.log("mesaSelected" , id);
})

    return (
      <>
    <div class="card  bg-white  p-7 " >
        <figure>
           <h1>Mesas click para cambiar</h1>
            </figure>
            <div class="card-body">
    <div class="grid grid-cols-10">
        {mesas.map((mesa, idx) => (
            <div class="grid" key={idx}>
                <div>
                    <button class="btn bg-terciary-600 m-1 w-16" onClick$={() => {mesaSelected(mesa.id)}} >{mesa.id}</button>
                </div>
            </div>
        ))}
    </div>
</div>
    </div>
    </>  
    ) 
    
});