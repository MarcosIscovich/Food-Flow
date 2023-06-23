import { component$, type PropFunction } from "@builder.io/qwik";

interface parametros {
  msg: string;
  show: boolean;
  resultOk$: PropFunction<() => void>;
  resultCancel$: PropFunction<() => void>;
}

export const Confirm = component$((props: parametros) => {
  const { show, msg, resultOk$, resultCancel$ } = props;

  console.log("Show confirm: ", show);
  return (
    <div>
      <div class={show ? "modal  modal-open" : "modal "}>
        <div class="modal-box w-11/12 max-w-5xl">
          <p class="py-4">{msg}</p>
          <div class="modal-action">
            <button class="btn btn-error " onClick$={resultCancel$}>
              cancelar
            </button>
            <button class="btn btn-success " onClick$={resultOk$}>
              aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
