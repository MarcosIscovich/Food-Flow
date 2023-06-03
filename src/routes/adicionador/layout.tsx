import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
  <div class="flex flex-col h-screen items-center justify-center">
    <Slot />
  </div>
  )
});
