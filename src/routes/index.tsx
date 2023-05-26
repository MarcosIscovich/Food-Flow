import { component$, useContext, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';
import { AuthContext } from '~/context/auth/auth.context';
import { login } from '~/services/auth.service';


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

  const actionForm = useLoginAction();
  const authContext = useContext(AuthContext);

  useTask$( ({ track }) => {
    track(() => { actionForm.value})

    if(actionForm.value?.success){
      console.log("success");
      //implementar la grabacion de token

      console.log("authContext", authContext);
    
      authContext.token = actionForm.value.data.access_token;
    }

  });

  return (
    <>
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold">Ingresa al sistema</h1>
          </div>


          <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
              <Form action={actionForm}>
                <div class="form-control">
                  <label class="label" >
                    <span class="label-text">Email</span>
                  </label>
                  <input type="text" placeholder="email" name='email' class="input input-bordered" />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input type="text" placeholder="password" name='password' class="input input-bordered" />
                  <label class="label">
                    <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div class="form-control mt-6">
                  <button class="btn btn-primary" type='submit'>Login</button>
                </div>
              </Form>

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
