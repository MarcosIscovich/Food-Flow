import { component$ } from '@builder.io/qwik';
import {type DocumentHead } from '@builder.io/qwik-city';
import { ViewMesasAdicionador } from './components/viewMesasAdicionador';
import { UserLogged } from './components/userLogged';



export default component$(() => {
 
  //para probar commit
  return (
    <>     
    <div class="p-7 bg-secondary-400" >      
      <div class="flex justify-end mb-5">
      <UserLogged />
      </div>
      <ViewMesasAdicionador />
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
