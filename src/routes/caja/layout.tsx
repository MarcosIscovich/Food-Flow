import { component$, Slot } from '@builder.io/qwik';
//import { ModalClave } from '~/components/modalClave';



export default component$(() => {
  return  <>
    {/* <ModalClave /> */}
    <div style="height: 100vh; width: 100vw; overflow: hidden;">
        <Slot />
      </div>
  
  </>

  
});
