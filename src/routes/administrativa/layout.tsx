import { component$, Slot, useVisibleTask$ } from '@builder.io/qwik';
import { Navbar } from '../../components/administrativa/navbar';


export default component$(() => {

  useVisibleTask$(() => {
    localStorage.setItem("ruta", window.location.href);
  });
  
  return (
    <>
      <Navbar />
        <Slot />   
      
    </>
  );

});
