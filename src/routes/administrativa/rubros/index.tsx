import { $, component$, useSignal } from '@builder.io/qwik';
import  { createRubro }  from '~/services/rubroSubrubro/rubro.service';


export default component$(() => {

    const openModal = useSignal(false)
    const openModalSub = useSignal(false)
    const rubro = useSignal("")
   // const subRubro = useSignal("")

    const addRubro = $(async () => {
        
        const rubroData =  rubro.value ;     
       
       const response = await createRubro( rubroData );
       console.log("response", response);
       

    });
    const addSubRubro = $(async () => {
       
       
       //const response = await createRubro(rubro);

    });
            

    return <div class="p-5 ">
        <div class="container w-full">
            <div class="grid grid-cols-2 gap-8">
                <div>
                    <h2 class="text-lg font-bold mb-4">Rubros</h2>
                    <div class="flex items-center space-x-4 mb-4">
                        <div class="relative flex items-center w-full">
                            <input type="text" placeholder="Buscar rubro" class="input input-primary w-full pr-10" />
                            <button class="absolute right-0 top-0 h-full px-3">
                                <svg class="text-gray-600 h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M22 22l-6-6"></path>
                                    <circle cx="10" cy="10" r="7"></circle>
                                </svg>
                            </button>
                        </div>
                        <button class="btn btn-primary" onClick$={() => openModal.value = !openModal.value} >Agregar Rubro</button>

                        <dialog id="my_modal_1" class={openModal.value ? "modal modal-open " : "modal"}>

                            <form method="dialog" onSubmit$={addRubro} class="modal-box w-80 border-solid border-2 border-indigo-600 " preventdefault:submit >
                                <div class="flex flex-row justify-center ">
                                    <h3 class="font-bold text-lg text-colororange">Agregar Rubro</h3>
                                </div>

                                <div class="mb-4 mt-7 flex justify-center w-60 ml-3 ">

                                    <label for="name" class="label font-bold text-colororange ">Nombre:</label>
                                    <input onInput$={ (e) => rubro.value = (e.target as HTMLInputElement).value} type="text" name='rubro' placeholder="Ingrese nombre del rubro" class="input input-primary border-solid" />

                                </div>
                                <div class="modal-action flex justify-evenly">

                                    <button class="btn btn-secondary" onClick$={() => openModal.value = !openModal.value}>Cerrar</button>
                                    <button class="btn btn-primary" type='submit'>Guardar</button>

                                </div>
                            </form>
                        </dialog>
                    </div>
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
                                    <th>Nombre</th>
                                    <th>Acciones</th>

                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>

                                </tr>

                                <tr class="hover">
                                    <th>2</th>
                                    <td>Hart Hagerty</td>
                                    <td>Desktop Support Technician</td>

                                </tr>

                                <tr>
                                    <th>3</th>
                                    <td>Brice Swyre</td>
                                    <td>Tax Accountant</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>



                <div >
                    <h2 class="text-lg font-bold mb-4 ">Subrubros</h2>
                    <div class="flex items-center space-x-4 mb-4">
                        <div class="relative flex items-center w-full">
                            <input type="text" placeholder="Buscar subrubro" class="input input-primary w-full pr-10" />
                            <button class="absolute right-0 top-0 h-full px-3">
                                <svg class="text-gray-600 h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M22 22l-6-6"></path>
                                    <circle cx="10" cy="10" r="7"></circle>
                                </svg>
                            </button>
                        </div>
                        <button class="btn btn-primary" onClick$={() => openModalSub.value = !openModalSub.value} >Agregar SubRubro</button>

                        <dialog id="my_modal_1" class={openModalSub.value ? "modal modal-open" : "modal"}>
                            <form method="dialog" onSubmit$={addSubRubro} class="modal-box w-full border-solid border-2 border-indigo-600 " >
                                <div class="flex flex-row justify-center ">
                                    <h3 class="font-bold text-lg text-colororange">Agregar SubRubro</h3>
                                    <div class="flex flex-col justify-end">
                                      <div class="tooltip" data-tip="hello">
                                        <button class="absolute right-0 top-0 h-full ">
                                        <svg class="text-gray-600 h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M22 22l-6-6"></path>
                                    <circle cx="10" cy="10" r="7"></circle>
                                </svg>
                                        </button>
                                    </div>  
                                    </div>
                                    
                                </div>

                                <div class="mb-4 mt-7 flex  ml-3 ">
                                    <label for="name" class="label font-bold text-colororange ">Rubro:</label>
                                    <select class="select select-primary w-full max-w-xs ml-4">
                                        {/* <option disabled selected>What is the best TV show?</option> */}
                                        <option>rubro 1 </option>
                                        <option>rubro 2</option>
                                        <option>rubro 3</option>
                                        <option>rubro 4</option>
                                    </select>


                                </div>
                                <div class="mb-4 mt-7 flex  ml-3 ">

                                    <label for="name" class="label font-bold text-colororange ">Nombre:</label>
                                    <input type="text" id="name" name="name" placeholder="Ingrese nombre del rubro" class="input input-primary border-solid" />

                                </div>
                                <div class="modal-action flex justify-evenly">

                                    <button class="btn btn-secondary" onClick$={() => openModalSub.value = !openModalSub.value}>Cerrar</button>
                                    <button class="btn btn-primary" type='submit'>Guardar</button>

                                </div>
                            </form>
                        </dialog>
                    </div>
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
                                    <th>Nombre</th>
                                    <th>Pertenece a</th>
                                    <th>Acciones</th>
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
            </div>
        </div>

























        {/* <div class="flex flex-row justify-between">
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
                    <select class="select join-item">
                        <option disabled selected>Category</option>
                        <option>Sci-fi</option>
                        <option>Drama</option>
                        <option>Action</option>
                    </select>
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

        <div class="overflow-x-auto pt-5 ">
            <div class="flex flex-col w-full border-opacity-50">
                <div class="grid h-20 card rounded-box  shadow-md bg-blue-800 place-items-center">content</div>
            </div>
        </div>

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
        </div> */}


    </div>

});