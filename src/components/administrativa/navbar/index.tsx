import { Slot, component$, useContext } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { AuthContext } from '~/context/auth/auth.context';
//import styles from './administrativa.module.css';


export const Navbar = component$(() => {

  /* const rolesTodos = ["ADM", "SUP", "OPE"];
  const soloSUP = ["SUP"];
  const soloAdmins = ["ADM", "SUP"]; */
  const authContext = useContext(AuthContext);
  
  const menuItems = [
    {
      id: 1,
      titulo: "Productos",
      // Roles: rolesTodos,
      url: "/administrativa/productos",
      child: [
        {
          id: 2,
          titulo: "Agregar Producto",
          //Roles: rolesTodos,
          url: "/administrativa/productos",
        },
        {
          id: 3,
          titulo: "Rubros",
          //Roles: soloAdmins,
          url: "/administrativa/rubros",
        },
        {
          id: 11,
          titulo: "SubRubros",
          //Roles: soloAdmins,
          url: "/administrativa/subrubros",
        },
        {
          id: 4,
          titulo: "Sectores",
          //Roles: soloAdmins,
          url: "/administrativa/sectores",
        },
      ],
    },
    {
      id: 6,
      titulo: "Personal",
      //Roles: soloAdmins,
      url: "/administrativa/personal",
      child: [
        {
          id: 1,
          titulo: "Personal",
          //Roles: soloAdmins,
          url: "/administrativa/personal",
        },
        {
          id: 2,
          titulo: "Roles",
          //Roles: soloAdmins,
          url: "/administrativa/roles",
        },
      ],
    },
    {
      id: 7,
      titulo: "Clientes",
      //Roles: soloAdmins,
      url: "/administrativa/clientes",
    },
    {
      id: 8,
      titulo: "Reservas",
      //Roles: soloAdmins,
      url: "/administrativa/reservas",
    },
    {
      id: 9,
      titulo: "Proveedores",
      //Roles: soloAdmins,
      url: "/administrativa/proveedores",
    },
    {
      id: 10,
      titulo: "Insumos",
      //Roles: soloAdmins,
      url: "/administrativa/insumos",
    },
  ];

  return (
    <>
      <div class="drawer ">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col ">

          <div class="w-full navbar bg-primary-500 ">
            <div class="flex-none navbar-start ">
              <label for="my-drawer-3" class="btn btn-square btn-ghost text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>
            <div class="navbar-center ">
              <span class="font-bold text-white">FOODFLOW</span>
            </div>
            <div class="navbar-end" style="z-index:10000">
              <div class="dropdown dropdown-end">
                <label tabIndex={0} class="btn btn-ghost btn-circle avatar ">
                  <div class="w-10 rounded-full ">
                    <img src="" width={200} height={200} alt="logoFF" />
                  </div>
                </label>
                <ul tabIndex={0} class="mt-3 p-2 shadow menu menu-sm dropdown-content rounded-box w-52 text-white hover:bg-indigo-500 bg-primary-500">
                  <li><button onClick$={() => {authContext.token = "";
                                              localStorage.removeItem("token");
                                                 window.location.href="/" }}>Logout</button></li>
                </ul>
              </div>
            </div>

          </div>

          <div class="h-full ">
            <Slot />
          </div>
        </div>
        <div class="drawer-side " style="z-index : 1000">
          <label for="my-drawer-3" class="drawer-overlay"></label>
          <ul class="menu p-4 w-56  mt-16 bg-primary-500 ">
            {
              menuItems.map((item, idx) => {
                return (
                  <>
                    {
                      item.child ? (
                        <li key={idx} >
                          <details >
                            <summary class="text-white hover:bg-slate-400 hover:rounded-md">{item.titulo}</summary>
                            <ul >
                              {
                                item.child?.map((child, idx) => {
                                  return (
                                    <li key={idx} class="text-white hover:bg-slate-400 hover:rounded-md"><Link  href={child.url}>{child.titulo}</Link></li>
                                  )
                                })
                              }
                            </ul>
                          </details>
                        </li>
                      ) : (
                        <li class="text-white  hover:bg-slate-400 hover:rounded-md" key={idx} ><Link href={item.url}>{item.titulo}</Link></li>
                      )
                    }
                  </>

                )
              })
            }

          </ul>
        </div>
      </div>
    
      <script>
        {`
        $("a").click(function(){
          $("drawer-side").toggleClass('open', 'close');
        });
        `}
      </script>

    </>
  );
});



