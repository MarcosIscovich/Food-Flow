import { PropFunction, component$, useContext, useTask$, useVisibleTask$, $ } from '@builder.io/qwik';
import {  Form, globalAction$, routeAction$ } from '@builder.io/qwik-city';
import { sendImage } from "~/services/fileUpload.service";
import { AuthContext } from "~/context/auth/auth.context";
import { options } from '../../../../admin-qwik/src/routes/admin/index';
import { SubmitHandler, useForm } from '@modular-forms/qwik';

export const useSubmit = globalAction$(async(form , event ) => {  
  //console.log("USESUBMIT",form);

  const FormData = await event.request.formData();
  const file = FormData.get('upload') as File;
  //console.log("USESUBMIT",file);

    if (file) {
      const res = await sendImage(form.token , file, form.itemId, form.tipo);
     // console.log("res", res.success);
    //   if (res.success) {
    //     console.log("success FileUpload");
    //     return {
    //       success: true,
    //       message: res.message
    //     }
    //   } else {
    //     return {
    //       success: false,
    //       message: res.message
    //     }
    //   }
    // } else {
    //   return {
    //     success: false,
    //     message: 'No file uploaded'
    //   }
    // }
    }
    return {
      success: true,
      message: 'No file uploaded'
    }

  });

interface ComponentProps {
  modalOpen: boolean;
  onClose$: PropFunction<() => void>;
  itemId?: string;
  tipo: string;
}
  
type UpForm = {
  file: any;
};
  export const FileUpload = component$<ComponentProps>((props) => {
    const { modalOpen, onClose$, itemId, tipo } = props;
    const authContext = useContext(AuthContext);
    const action = useSubmit();

    useTask$(({ track }) => {
      track(() => { action.value })
      //console.log("action", action.value);
      if (action.value?.success) {
       // console.log("success");
        //implementar la grabacion de token
        onClose$();
      }
    });

  return (
    <>
      <Form action={action}>
        <div class="flex flex-col">
          <input type="file" name="upload" class="input input-info mt-3" />
          <input type="text" hidden name="itemId" value={itemId} class="input input-info mt-3" />
          <input type="text" hidden name="token" value={authContext.token} class="input input-info mt-3" />
          <input type="text" hidden name="tipo" value={tipo} class="input input-info mt-3" />
          <div class="flex flex-row justify-end">
            <button class="btn btn-secondary mt-3 mr-2" onClick$={onClose$}>
              Cancel
            </button>
            <button type="submit"  class="btn btn-primary mt-3">
              Upload
            </button>
          </div>
        </div>
      </Form>
    </>
  );
});