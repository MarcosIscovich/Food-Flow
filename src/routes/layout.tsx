import { component$, Slot, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  useVisibleTask$(() => {
   // console.log("Referer*************", document.referrer);
   // console.log("windows.location.href**********", window.location.href);
   // console.log("windows.location**********", localStorage.getItem("ruta"));
  //todo ver si incluye administrativa
    if(window.location.href !== localStorage.getItem("ruta")){
      if(localStorage.getItem("token")){
       // console.log("entra al if de logout");
        localStorage.clear();
        if(!window.location.href.includes( "inicio" ))
          window.location.href = "/";
      }
    }
  });

  return <Slot />;
});
