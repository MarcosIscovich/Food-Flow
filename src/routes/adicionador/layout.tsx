import { component$, Slot } from '@builder.io/qwik';


export default component$(() => {
  return (
   /*  style="height: 100vh; width: 100vw; overflow: hidden;" */
    <div >
    <Slot />
  </div>
  
  )
});
