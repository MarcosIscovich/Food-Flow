import { component$, useSignal } from '@builder.io/qwik';


export default component$(() => {

    const openModal = useSignal(false)

    return <div class="p-5">
        <div class="flex flex-row justify-between">
            <div class="text-2xl font-bold">
                Rubros
            </div>
            <div >
                <div >
                    <div class="flex flex-row">
                        <div>
                            <input class="input join-item" placeholder="Search..." />
                        </div>
                        <button class="btn join-item">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                    {/* <select class="select join-item">
    <option disabled selected>Category</option>
    <option>Sci-fi</option>
    <option>Drama</option>
    <option>Action</option>
  </select> */}
                    <div class="indicator">
                    </div>
                </div>


            </div>
            <div>
                <button class="btn btn-primary" onClick$={() => openModal.value = !openModal.value} >Agregar Rubro</button>

                <dialog id="my_modal_1" class={openModal.value ? "modal modal-open" : "modal"}>
                    <form method="dialog" class="modal-box">
                        <h3 class="font-bold text-lg">Hello!</h3>
                        <p class="py-4">Press ESC key or click the button below to close</p>
                        <div class="modal-action">

                            <button class="btn">Close</button>
                        </div>
                    </form>
                </dialog>
            </div>

        </div>

        {/* <div class="overflow-x-auto pt-5 ">
            <div class="flex flex-col w-full border-opacity-50">
                <div class="grid h-20 card rounded-box  shadow-md bg-blue-800 place-items-center">content</div>
            </div>
        </div> */}

        <div class=" mt-7 card rounded-box p-7 shadow-md bg-slate-200 ">
            <div class="flex flex-row justify-end mb-3 ">

                <div class="join">
                    <button class="join-item btn">«</button>
                    <button class="join-item btn">1</button>
                    <button class="join-item btn">2</button>
                    <button class="join-item btn btn-disabled">...</button>
                    <button class="join-item btn">99</button>
                    <button class="join-item btn">100</button>
                    <button class="join-item btn">»</button>
                </div>


            </div>
            <table class="table w-full  table-zebra ">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>

                    <tr class="hover">
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                    </tr>

                    <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

});