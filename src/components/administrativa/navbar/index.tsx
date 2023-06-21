import { Slot, component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
//import styles from './administrativa.module.css';


export const Navbar = component$(() => {

  /* const rolesTodos = ["ADM", "SUP", "OPE"];
  const soloSUP = ["SUP"];
  const soloAdmins = ["ADM", "SUP"]; */

  const menuItems = [
    {
      id: 1,
      titulo: "Productos",
      // Roles: rolesTodos,
      url: "/administrativa/productos",
      child: [
        {
          id: 2,
          titulo: "Rubros/SubRubros",
          //Roles: soloAdmins,
          url: "/administrativa/rubros",
        },
      ]
    },
    {
      id: 4,
      titulo: "Roles",
      //Roles: soloAdmins,
      url: "/administrativa/roles",
    },
    {
      id: 5,
      titulo: "Personal",
      //Roles: soloAdmins,
      url: "/administrativa/personal",
    },
    {
      id: 6,
      titulo: "Clientes",
      //Roles: soloAdmins,
      url: "/administrativa/clientes",
    },
    {
      id: 7,
      titulo: "Reservas",
      //Roles: soloAdmins,
      url: "/administrativa/reservas",
    },

  ]

  return (
    <>
      <div class="drawer ">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col ">

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

          <div class="h-full ">
            <Slot />
          </div>
        </div>
        <div class="drawer-side">
          <label for="my-drawer-3" class="drawer-overlay"></label>
          {/* <ul class="menu p-4 w-60 h-full  text-base-content mt-16 bg-colorblue">
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
          </ul> */}
          <ul class="menu p-4 bg-base-200 w-56 rounded-box">
            {
              menuItems.map((item, idx) => {
                return (
                  <>
                    {
                      item.child ? (
                        <li key={idx}>
                          <details open>
                            <summary>{item.titulo}</summary>
                            <ul>
                              {
                                item.child?.map((child, idx) => {
                                  return (
                                    <li key={idx}><Link href={child.url}>{child.titulo}</Link></li>
                                  )
                                })
                              }
                            </ul>
                          </details>
                        </li>
                      ) : (
                        <li key={idx}><Link href={item.url}>{item.titulo}</Link></li>
                      )
                    }
                  </>

                )
              })
            }

          </ul>
        </div>
      </div>
      {/* <div class={styles.menu}>
        <div class="bg-colorblue pb-10">
          <label tabIndex={0} class="btn btn-ghost btn-circle avatar ">
            <div class="w-10 rounded-full ">
              <img src="" alt="logoFF" />
            </div>
          </label>
        </div>
        <div class="fixed top-4 right-4">
          
          <div class="dropdown dropdown-end">
          <label tabIndex={0} class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </label>
            <ul tabIndex={0} class="dropdown-content menu p-2 shadow bg-clorblue rounded-box w-52">
              <li><a>Cerrar Sesion</a></li>

            </ul>
          </div>
        </div>
        <div class="bg-colorblue text-white pt-5 pb-5 flex justify-center">
          <span>FOODFLOW</span>
        </div>
        <ul class="menu h-full bg-colorblue">
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

      <div class={styles.content}>
        <Slot />
      </div> */}


    </>
  );
});



