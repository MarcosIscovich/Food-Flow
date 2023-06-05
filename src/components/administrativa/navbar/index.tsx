import { Slot, component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';


export const Navbar = component$(() => {
  return (
    <>
<div class="drawer">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" /> 
  <div class="drawer-content flex flex-col">
    {/* <!-- Navbar --> */}
    <div class="w-full navbar bg-base-300">
      <div class="flex-none">
        <label for="my-drawer-3" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div>     
    </div>
    {/* <!-- Page content here --> */}
    <div class="h-full">
    <Slot />
    </div>
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay"></label> 
    <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content mt-16">
              <li>
                <Link href="/administrativa/personal">Personal</Link>
              </li>
              <li>
                <Link href="/administrativa/roles">Roles</Link>
              </li>
              <li>
                <Link href="/administrativa/productos">Productos</Link>
              </li>
              <li>
                <Link href="/administrativa/mapas">Mapas</Link>
              </li>
              <li>
                <Link href="/administrativa/clientes">Clientes</Link>
              </li>
              <li>
                <Link href="/administrativa/proveedores">Proveedores</Link>
              </li>
              <li>
                <Link href="/administrativa/informes">Informes</Link>
              </li>
              <li>
                <Link href="/administrativa/reservas">Reservas</Link>
              </li>
              <li>
                <Link href="/administrativa/configuracion">Configuracion</Link>
              </li>
            </ul>
    
  </div>
</div>

  
    </>
  );
});

