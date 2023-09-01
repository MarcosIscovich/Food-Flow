import { component$, useContext } from '@builder.io/qwik';
import { Link, type DocumentHead } from '@builder.io/qwik-city';
import { IcoAdicionador, IcoAdmin, IcoCajero } from '../../components/router-head/iconos/iconos';
import { AuthContext } from '~/context/auth/auth.context';
import styles from "./style.module.css"
import estilo from "./estilo.module.css"
import prueba from "./prueba.module.css"

export default component$(() => {

  const authcontext = useContext(AuthContext);

  return (
    <>

      {authcontext.isAutenticated ? (
        <>
          <div class="h-full flex flex-col items-center justify-center">
            <div class="flex flex-row items-center justify-center space-x-6">
              {authcontext.user?.rol === "Administrador" && (
                <Link href="/administrativa" >
                  {/* <span class="ml-2">Adminsitrador</span> */}
                  <div class="body">
                    <a class={[styles.card, styles.credentialing]} href="#">
                      <div class={styles.overlay}></div>
                      <div class={styles.circle}>
                        <IcoAdmin size={"40"} />
                      </div>
                      <span style="font-weight: bold">Admistración</span>
                    </a>
                  </div>
                </Link>
              )}
              {(authcontext.user?.rol === "Administrador" || authcontext.user?.rol === "Encargado") && (
                <>
                  <Link href="/adicionador">
                    <div class={estilo.cardd}>
                      <div class={estilo.cardcontent}>
                        <div class={estilo.cardtitle}>
                          <div class="flex justify-center" >
                            <IcoAdicionador size={"40"} />
                          </div>
                        </div>
                        <div class="flex justify-center">
                          <button class={estilo.cardbutton}>Adicionador</button>
                        </div>

                      </div>
                    </div>
                  </Link>  
                  <Link href="/caja" >
                    <div class={prueba.cardC}>
                      <div class="flex justify-center">
                           <IcoCajero size={"40"} />
                      </div>
                 
                      Cajero
                    </div>


                  </Link>
                </>

              )}
            </div>
          </div>
        </>
      ) :
        (
          <progress class="progress w-56"></progress>
        )
      }
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

