import { component$, useContext, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Form, routeAction$, useNavigate, z, zod$ } from '@builder.io/qwik-city';
import { AuthContext } from '~/context/auth/auth.context';
import { login } from '~/services/auth.service';
// import style from './logincss.module.css'
import logoFF from '~/components/logo_FF.png';
import { ModalTerminos } from './caja/components/modalTerminos';


export const useLoginAction = routeAction$(
  async (data, /* { cookie, redirect } */) => {
    const { email, password } = data;

    console.log("llega al action", data);

    const resp = await login(email, password);

    console.log("respuesta de login", resp);

    if (resp && resp.access_token) {
      return {
        success: true,
        data: resp,
      };
    }

    return {
      success: false,
    };
  },
  zod$({
    email: z.string().min(5, "Mínimo 5 caracteres"),
    password: z.string().min(5, "Mínimo 5 caracteres"),
  })
);

export default component$(() => {
  const nav = useNavigate();
  const actionForm = useLoginAction();
  const authContext = useContext(AuthContext);
  
  

  useVisibleTask$(({ track }) => {
    track(() => {
      authContext.isAutenticated
    })
    if (authContext.isAutenticated) {
      nav('/inicio');
    }
  });

  useTask$(({ track }) => {
    track(() => { actionForm.value })
    if (actionForm.value?.success) {
      //implementar la grabacion de token
      console.log("authContext", authContext);
      console.log("actionForm", actionForm.value.data.user);
      authContext.token = actionForm.value.data.access_token;
      authContext.user = {
        id: actionForm.value.data.user.id,
        email: actionForm.value.data.user.email,
        name: actionForm.value.data.user.name,
        rol: actionForm.value.data.user.role.nombre,
        imagen: actionForm.value.data.user.imagen,
        operario: {
          id: actionForm.value.data.user.id,
          clave: actionForm.value.data.user.clave,
          nombre: actionForm.value.data.user.nombre,
          rol: actionForm.value.data.user.role.nombre,
        }
      }
      nav('/inicio');
    }
    else {
      console.log("error", actionForm.value?.failed);
    }
  });

  return (
    <>
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col ">
          <div class="text-center lg:text-left flex justify-center flex-col">
            <div class="flex justify-center">

            <img src={logoFF}  alt="logo" width={100} height={120} />
            </div>
            <h1 class="text-4xl font-bold mb-10">Ingresa al sistema</h1>
          </div>

          <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
              <Form action={actionForm}>
                <div class="form-control">
                  <label class="label" >
                    <span class="label-text font-bold">Email</span>
                  </label>
                  <input type="text" placeholder="email" name='email' class="input input-bordered" />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold">Password</span>
                  </label>
                  <input type="text" placeholder="password" name='password' class="input input-bordered" />
                  <label class="label">
                    <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div class="form-control mt-6">
                  <button class=" bg-primary-500 text-white rounded-md hover:text-lg h-12" type='submit'>Login</button>
                </div>
              </Form>

            </div>
            <div class="flex justify-center pb-7  ">

        <a class=" text-black hover:text-primary-800 cursor-pointer hover:text-lg " onClick$={() => modal_Terminos.showModal()} >Terminos y Condiciones</a>
        <ModalTerminos />
            </div>
          </div>
        </div>
      </div>

    

    </>
  );
});

export const head: DocumentHead = {
  title: 'Food-Flow',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
