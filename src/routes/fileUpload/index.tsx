import { component$ } from "@builder.io/qwik";
import {  Form, routeAction$ } from '@builder.io/qwik-city';
import { sendImage } from "~/services/fileUpload.service";


export const useSubmit = routeAction$(async(form , event ) => {  
  
  const FormData = await event.request.formData();
  const token = '9227|4PKHyfPDB8amB3urKKhHiW0TxIhCxXnBQHrHWS56'
  const file = FormData.get('upload') as File;
  console.log("USESUBMIT",file);

    if (file) {
      const res = await sendImage(token , file);
      console.log("res", res);
      
    } else {
      return {
        success: false,
        message: 'No file uploaded'
      }
    }
    return {
      success: true
    }
  });


  
  export default  component$(() => {

  const action = useSubmit();
  return (
    <>
      <h1>
        Upload Image
      </h1>
      <Form action={action}>
        <input type="file" name="upload" />
        <button type="submit">Upload</button>
      </Form>
    </>
  );
});