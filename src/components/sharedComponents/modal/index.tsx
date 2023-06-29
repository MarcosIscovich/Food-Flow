import { type PropFunction, Slot, component$ } from "@builder.io/qwik";

interface ComponentProps {
  show: boolean;
  title: string;
  size?: string;
  onClose$: PropFunction<() => void>;
}

export const Modal = component$<ComponentProps>((props) => {
  const { show, title, onClose$, size: _size } = props;

  const sizeModal = _size
    ? _size.length > 0
      ? "lg:max-w-" + _size
      : "lg:max-w-2xl"
    : "lg:max-w-2xl";

  return (
    <div class={show ? "modal modal-middle modal-open " : "modal modal-middle"}>
      <div class={`modal-box  ${sizeModal} border-solid border-2 border-indigo-600`}>
        <h3 class="font-bold text-3xl flex justify-center text-colororange">{title}</h3>
        <div class="">
          <Slot />
        </div>

       
      </div>
    </div>
  );
});
