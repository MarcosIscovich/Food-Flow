import { Slot, component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';


export const Navbar = component$(() => {
  return (
    <>
      <div class="drawer ">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col ">
          {/* <!-- Navbar --> */}
          <div class="w-full navbar bg-colorblue ">
            <div class="flex-none navbar-start ">
              <label for="my-drawer-3" class="btn btn-square btn-ghost text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>
            <div class="navbar-center ">
             <span class="font-bold text-white">FOODFLOW</span> 
            </div>
            <div class="navbar-end">
<div class="dropdown dropdown-end">
            <label tabIndex={0} class="btn btn-ghost btn-circle avatar ">
              <div class="w-10 rounded-full ">
                <img src="" alt="logoFF" />
              </div>
            </label>
            <ul tabIndex={0} class="mt-3 p-2 shadow menu menu-sm dropdown-content rounded-box w-52 text-white hover:bg-indigo-500 bg-colorblue">
              <li><a>Logout</a></li>
            </ul>
          </div>
            </div>
            
          </div>
          {/* <!-- Page content here --> */}
          <div class="h-full">
            <Slot />
          </div>
        </div>
        <div class="drawer-side">
          <label for="my-drawer-3" class="drawer-overlay"></label>
          <ul class="menu p-4 w-60 h-full  text-base-content mt-16 bg-colorblue">
            <li>
              <Link class="text-white text-xl hover:bg-indigo-500" href="/administrativa/personal">Personal</Link>
            </li>
            <li>
              <Link class="text-white text-xl hover:bg-indigo-500" href="/administrativa/roles">Roles</Link>
            </li>
            <li>
              <Link class="text-white text-xl hover:bg-indigo-500" href="/administrativa/productos">Productos</Link>
            </li>
            <li>
              <Link class="text-white text-xl hover:bg-indigo-500" href="/administrativa/mapas">Mapas</Link>
            </li>
            <li>
              <Link class="text-white text-xl hover:bg-indigo-500" href="/administrativa/clientes">Clientes</Link>
            </li>
            <li>
              <Link class="text-white text-xl hover:bg-indigo-500" href="/administrativa/proveedores">Proveedores</Link>
            </li>
            <li>
              <Link class="text-white text-xl hover:bg-indigo-500" href="/administrativa/informes">Informes</Link>
            </li>
            <li>
              <Link class="text-white text-xl hover:bg-indigo-500" href="/administrativa/reservas">Reservas</Link>
            </li>
            <li>
              <Link class="text-white text-xl hover:bg-indigo-500" href="/administrativa/configuracion">Configuracion</Link>
            </li>
          </ul>

        </div>
      </div>


    </>
  );
});


{/* <div class="navbar-end">
  <div class="flex-none gap-2">
    <div class="dropdown dropdown-end ">
      <label tabIndex={0} class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="" alt="logoFF" />
        </div>
      </label>
      <ul tabIndex={0} class="mt-3 p-2 shadow menu menu-sm dropdown-content rounded-box w-52 text-white hover:bg-indigo-500 bg-bgblue">
        <li><a>Logout</a></li>
      </ul>
    </div>

  </div>
</div>
 */}