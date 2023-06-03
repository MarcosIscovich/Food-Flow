import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export const Navbar = component$(() => {
  return (
    <>
      {/* <div class="navbar bg-neutral text-neutral-content">
          <div class="drawer-content">
            <label for="my-drawer" class="btn btn-primary drawer-button">
              Open drawer
            </label>
          </div>
      </div>
    
      <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
          <div class="drawer-side">
         
            <label for="my-drawer" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content">
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
                <Link href="/administrativa/administrativa/clientes">Clientes</Link>
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
                <Link href="/configuracion">Configuracion</Link>
              </li>
            </ul>
          </div>
        </div> */}

{/* <div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <label tabIndex={0} class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul class="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li tabIndex={0}>
        <details>
          <summary>Parent</summary>
          <ul class="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    <a class="btn">Button</a>
  </div>
</div> */}


      <div class="navbar bg-neutral text-neutral-content">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabIndex={0} class="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              //class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                class="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-200 text-base-content w-80"
            >
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
      </div>
    </>
  );
});

