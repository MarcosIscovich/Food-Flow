import { component$ , useSignal} from '@builder.io/qwik';
import { Link, type DocumentHead } from '@builder.io/qwik-city';
import { IcoAdicionador, IcoAdmin, IcoCajero } from '../../components/router-head/iconos/iconos';

export default component$(() => {
  const count = useSignal(0);
  console.log("contador" , count.value);
  
  return (
    <>
      <h1 class="text-7xl">Administrativa 👋</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Food-Floow Administrativa',
  meta: [
    {
      name: 'description',
      content: 'Administrativa site description',
    },
  ],
};
