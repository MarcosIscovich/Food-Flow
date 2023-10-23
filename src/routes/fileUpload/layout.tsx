import { Slot, component$ } from '@builder.io/qwik';
import {type DocumentHead } from '@builder.io/qwik-city';



export default component$(() => {
 
  //para probar commit
  return (
    <>     
    <div class="p-7 bg-secondary-400" >      
      <Slot />
      </div> 
    </>
  );
});

export const head: DocumentHead = {
  title: 'Food-Floow Caja',
  meta: [
    {
      name: 'description',
      content: 'Caja',
    },
  ],
};
