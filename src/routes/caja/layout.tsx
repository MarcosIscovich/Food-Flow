import { component$, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import { PermisoContext } from '~/context/supervisor/supervisor.context';
// import { ModalClave } from '~/components/modalClave';



export default component$(() => {

  const permisoSupervisor = useStore<PermisoContext>({
    tienePermiso: false,
    action: ""
  })

  useContextProvider(PermisoContext, permisoSupervisor);

  return  <>
    {/* <ModalClave /> */}
    <div style="height: 100vh; width: 100vw; overflow: auto;">
        <Slot />
      </div>
  
  </>

  
});
