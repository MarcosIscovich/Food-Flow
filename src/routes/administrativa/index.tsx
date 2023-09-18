import { component$ } from '@builder.io/qwik';
import {  type DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  
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
