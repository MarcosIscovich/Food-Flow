import { component$ , useSignal} from '@builder.io/qwik';
import {type DocumentHead } from '@builder.io/qwik-city';
import { ModalClave } from '~/components/modalClave';

export default component$(() => {
  const count = useSignal(0);
  console.log("contador" , count.value);
  //para probar commit
  return (
    <>
      <ModalClave />
      <h1 class="text-7xl">Adicionador 👋</h1>
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
