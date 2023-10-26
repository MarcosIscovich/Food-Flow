import { component$, Slot, useVisibleTask$ } from '@builder.io/qwik';


export default component$(() => {

  useVisibleTask$(() => {
    localStorage.setItem("ruta", window.location.href);
  });

  return (
   /*  style="height: 100vh; width: 100vw; overflow: hidden;" */
    <div >
    <Slot />
  </div>
  
  )
});
