import { component$ } from '@builder.io/qwik';
import mesas from './mesas';

export const ViewMesas = component$(() => {
    return <div class="card bg-orange-300 ">
        <figure>
           <h1>Mesas</h1>
            </figure>
            <div class="card-body">
    <div class="grid grid-cols-10">
        {mesas.map((mesa, idx) => (
            <div class="grid" key={idx}>
                <div>
                    <button class="btn bg-green-600 m-1">{mesa.id}</button>
                </div>
            </div>
        ))}
    </div>
</div>
    </div>
});