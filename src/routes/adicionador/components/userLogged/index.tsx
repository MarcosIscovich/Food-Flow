import { component$, useContext, useTask$ } from '@builder.io/qwik';
import { AuthContext} from '~/context/auth/auth.context';
// import { IconUser } from '~/components/sharedComponents/icons';
import logoFF from '~/components/logo_FF.png';



export const UserLogged = component$(() => {

    const authContext = useContext(AuthContext);

    useTask$(() => {
        console.log("AUTHCONTEXT", authContext);
    });

    return (
      <>
        <div class="stats shadow flex justify-end bg-white">
          <div class="stat">
            <div class="stat-figure">
              {/* <IconUser size={"60"} /> */}
              <div class="avatar">
                <div class="w-24 mask mask-squircle">
                  <img src={logoFF} width={50} height={50} />
                </div>
              </div>
              {/* <div class="avatar online">
        <div class="w-16 rounded-full bg-white">
          <IconUser/>
        </div>
      </div> */}
            </div>
            <div class="stat-title text-secondary-500 font-bold">
              Logeado como
            </div>
            <div class="stat-title text-secondary-500 flex justify-center font-bold">
              {authContext.user?.operario.nombre}
            </div>
            <div class="stat-desc text-secondary-500 flex justify-center">
              {authContext.user?.operario.rol}
            </div>
          </div>
        </div>
      </>
    ); 
    
});