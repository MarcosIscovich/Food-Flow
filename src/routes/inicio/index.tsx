import { component$, useContext } from '@builder.io/qwik';
import { Link, type DocumentHead } from '@builder.io/qwik-city';
import { IcoAdicionador, IcoAdmin , IcoCajero  } from '../../components/router-head/iconos/iconos';
import { AuthContext } from '~/context/auth/auth.context';

import styles from "./styles.module.css"


export default component$(() => {

  const authcontext = useContext(AuthContext);

  return (
    <div >

      {authcontext.isAutenticated ? (
        <div class={styles.contenedorInicial}>
          <div class="flex flex-col items-center justify-center h-screen">
            <div class="flex flex-row items-center justify-center space-x-6">
              {authcontext.user?.rol === "Administrador" && (
                <Link href="/administrativa" >
                  <div class={styles.cardd}>
                      <div class={styles.cardcontent}>
                        <div class={styles.cardtitle}>
                          <div class="flex justify-center" >
                            <IcoAdmin size={"40"} />
                          </div>
                        </div>
                        <div class="flex justify-center">
                          <button class={styles.cardbutton}>Administracion</button>
                        </div>

                      </div>
                    </div>
                </Link>
              )}
              {(authcontext.user?.rol === "Administrador" || authcontext.user?.rol === "Encargado") && (
                <>
                  <Link href="/adicionador">
                    <div class={styles.cardd}>
                      <div class={styles.cardcontent}>
                        <div class={styles.cardtitle}>
                          <div class="flex justify-center" >
                            <IcoAdicionador size={"40"} />
                          </div>
                        </div>
                        <div class="flex justify-center">
                          <button class={styles.cardbutton}>Adicionador</button>
                        </div>

                      </div>
                    </div>
                  </Link>  
                  <Link href="/caja" >
                  <div class={styles.cardd}>
                      <div class={styles.cardcontent}>
                        <div class={styles.cardtitle}>
                          <div class="flex justify-center" >
                            <IcoCajero size={"40"} />
                          </div>
                        </div>
                        <div class="flex justify-center">
                          <button class={styles.cardbutton}>Caja</button>
                        </div>

                      </div>
                    </div>
                    


                  </Link>
                </>

              )}
            </div>
          </div>
        </div>
      ) :
        (
          <progress class="progress w-56"></progress>
        )
      }
    </div>
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

