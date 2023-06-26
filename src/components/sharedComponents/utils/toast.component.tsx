import { component$, useVisibleTask$ } from "@builder.io/qwik";

interface parametros {
  msg: string;
  type: string;
  show: boolean;
  onFinish: () => boolean;
}

export const Toast = component$<parametros>((props) => {
  const { msg, type, show } = props;

  let typeClass = "alert alert-info";
  if (type == "error") {
    typeClass = "alert alert-error";
  }
  if (type == "success") {
    typeClass = "alert alert-success";
  }

  useVisibleTask$(({ track }) => {
    track(() => show);
    if (show) {
      console.log("iniciar temporizadon de 3 segundos");

      // create interval of 3000 miliseconds
      const interval = setInterval(() => {
        // call onFinish function
        props.onFinish();
        // clear interval
        clearInterval(interval);
  
      }, 3000);
    }
  });

  return (
    <div>
      {show && (
        <div class="toast toast-top toast-end mt-14">
          <div class={typeClass}>
            <div>
              <span>{msg}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
