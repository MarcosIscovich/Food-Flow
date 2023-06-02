import { component$ , useContext, useSignal} from '@builder.io/qwik';
import { Link, type DocumentHead } from '@builder.io/qwik-city';
import { IcoAdicionador, IcoAdmin, IcoCajero } from '../../components/router-head/iconos/iconos';
import { AuthContext } from '~/context/auth/auth.context';

export default component$(() => {
  const count = useSignal(0);
  console.log("contador" , count.value);
  
  const authcontext = useContext(AuthContext);
    
  return (
    <>
    {/* esta es para un merge a develop */}
    {authcontext.isAutenticated ? (
      <>
      <h1>Admin 👋</h1>
      <div class="h-full flex flex-col items-center justify-center">
      <div class="flex flex-row items-center justify-center">
    {authcontext.user?.rol === "Administrador" && (
    <Link href="/administrativa" class="btn btn-lg mr-2"><IcoAdmin size={"40"}/>
            <span class="ml-2">Adminsitrador</span>
            </Link>
    )}
    <Link href="/adicionador" class="btn btn-lg mr-2"><IcoAdicionador size={"40"}/>
            <span class="ml-2">Adicionador</span>
            </Link>
    <Link href="/caja" class="btn btn-lg mr-2"><IcoCajero size={"40"}/>
            <span class="ml-2">Cajero</span>
            </Link>
      </div>
      </div>
      </>
    ):
    (
      <progress class="progress w-56"></progress>
    )}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Food-Floow',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
