import { component$ , useSignal} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  const count = useSignal(0);
  console.log("contador" , count.value);
  
  return (
    <>
      <h1>Admin 👋</h1>

     
    </>
  );
});

export const head: DocumentHead = {
  title: 'Food-Floow',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
