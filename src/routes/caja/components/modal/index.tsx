import { Slot, component$ } from "@builder.io/qwik"

export const Modal =  component$(() => {
    
    return (    
        <dialog id="my_modal_2" class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Hello!</h3>
          <p class="py-4">Press ESC key or click outside to close</p>
          <Slot />
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
}   )