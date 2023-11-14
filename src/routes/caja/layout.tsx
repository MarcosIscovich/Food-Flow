import { component$, Slot, useContext, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { PermisoContext } from '~/context/supervisor/supervisor.context';
import { MesasContext } from '~/context/mesa/mesa.context';
// import { ModalClave } from '~/components/modalClave';



export default component$(() => {

  

  useVisibleTask$(() => {
    localStorage.setItem("ruta", window.location.href);
  });

 
  
  const permisoSupervisor = useStore<PermisoContext>({
    tienePermiso: false,
    action: ""
  })

  const mesaContext = useStore<MesasContext>({
    numeroMesa: 0
  })

  useContextProvider(PermisoContext, permisoSupervisor);
  useContextProvider(MesasContext, mesaContext);
  
  

  return  <>
    {/* <ModalClave /> */}
    <div style="height: 100vh; width: 100vw; overflow: auto;">
        <Slot />
      </div>
  
  </>

  
});
