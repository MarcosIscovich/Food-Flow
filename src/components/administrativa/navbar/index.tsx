import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export const Navbar = component$(() => {
  return (
    <>
      <div class="navbar bg-neutral text-neutral-content">
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
        </div>
    </>
  );
});

