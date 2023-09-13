import { $, PropFunction, component$, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { AuthContext } from '~/context/auth/auth.context';
import { lista } from '~/services/generico.service';
import type { IRubros } from '~/interfaces/iRubros';
import type { ISubRubros } from '~/interfaces/iSubRubro';
import type { IProductos } from '~/interfaces/iProductos';

interface parametros {
  sendProducto: PropFunction<(mesa:any)=>any>;
}

export const CarouselItems = component$((props: parametros) => {

  const {sendProducto} = props;

  const authContext = useContext(AuthContext);
  const rubrosData = useSignal<IRubros[]>([]);
  const subrubrosData = useSignal<ISubRubros[]>([]);
  const productosData = useSignal<IProductos[]>([]);
  const selectedRubro = useSignal<string | null>(null);
  const selectedSubrubro = useSignal<string | null>(null);
  const showRubros = useSignal<boolean>(true);
  const showSubrubros = useSignal<boolean>(false);
  const showProductos = useSignal<boolean>(false);
  const slides = useSignal<any>([]);
  const slidesSubProductos = useSignal<any>([]);
  const slidesProductos = useSignal<any>([]);

  useTask$(({track}) => {
    track(() => selectedSubrubro.value)
    console.log("selectedSubRubro", selectedSubrubro.value);
    if(selectedSubrubro.value){
      const _productosData =  productosData.value.filter((producto) => producto.sub_rubro_id === selectedSubrubro.value)
      console.log("_ProductosData", _productosData);
      if(_productosData.length > 0){
        console.log("Subrubros", _productosData);
        const _slidesProductos = [];
        for (let i = 0; i < _productosData.length; i += 10) {
          const items = [];
          for (let j = i; j < i + 10; j++) {
            if (_productosData[j]) {
              items.push(_productosData[j]);
              console.log("items", items);
            }
          }
          _slidesProductos.push(items);
        }
        slidesProductos.value = _slidesProductos;
        console.log("slidesSubProductos", slidesProductos.value.length);
      }
      else{
        slidesProductos.value = [];
      }
    }
  })

  useTask$(({track}) => {
    track(() => selectedRubro.value)
    console.log("selectedRubro", selectedRubro.value);
    if(selectedRubro.value){
      const _subRubrosData =  subrubrosData.value.filter((subrubro) => subrubro.rubro_id === selectedRubro.value)
      console.log("_subRubrosData", _subRubrosData);
      if(_subRubrosData.length > 0){
        console.log("Subrubros", _subRubrosData);
        const _slidesSubProductos = [];
        for (let i = 0; i < _subRubrosData.length; i += 10) {
          const items = [];
          for (let j = i; j < i + 10; j++) {
            if (_subRubrosData[j]) {
              items.push(_subRubrosData[j]);
              console.log("items", items);
            }
          }
          _slidesSubProductos.push(items);
        }
        slidesSubProductos.value = _slidesSubProductos;
        console.log("slidesSubProductos", slidesSubProductos.value.length);
      }
      else{
        slidesSubProductos.value = [];
      }
    }
  })

  useTask$(({track}) => {
    track(() => (rubrosData.value, productosData.value))
    if(rubrosData.value.length > 0){
      console.log("Rubros", rubrosData.value);
      //todo: build a carousel with this data
      const _slides = [];
      for (let i = 0; i < rubrosData.value.length; i += 10) {
        const items = [];
        for (let j = i; j < i + 10; j++) {
          if (rubrosData.value[j]) {
            items.push(rubrosData.value[j]);
            //console.log("items", items);
          }
        }
        _slides.push(items);
        
      }
      slides.value = _slides;
      console.log("slides", slides.value.length);
    }
    
    if(productosData.value.length > 0){
      console.log("Productos", productosData.value);
      const _slidesProductos = [];
      for (let i = 0; i < productosData.value.length; i += 10) {
        const items = [];
        for (let j = i; j < i + 10; j++) {
          if (productosData.value[j]) {
            items.push(productosData.value[j]);
           // console.log("items", items);
          }
        }
        _slidesProductos.push(items);
      }
      slidesProductos.value = _slidesProductos;
      console.log("slidesProductos", slidesProductos.value.length);
    }
  })

  useTask$(async ({ track }) => {
    track(() => authContext.token)
    if (authContext.token) {
      console.log("useTask$");
      const subrubros = await lista(authContext.token || "", 1, 20, "", "", "", "subrubros", []);
      console.log("SUBRUBROS", subrubros);
      subrubrosData.value = subrubros.data;

      const rubros = await lista(authContext.token || "", 1, 20, "", "", "", "rubros", []);
      rubrosData.value = rubros.data;
      console.log("Rubros", rubrosData.value);

      const productos = await lista(authContext.token || "", 1, 20, "", "", "", "productos", []);
      productosData.value = productos.data;
      console.log("Productos", productosData.value);
    }
  });

  const showItems = $((id: string, action: string) => {
    console.log("showItems", id);
    if (action === "showSubrubros") {
      showRubros.value = false;
      selectedRubro.value = id;
      showSubrubros.value = true;
    }
    if (action === "showProductos") {
      showSubrubros.value = false;
      selectedSubrubro.value = id;
      showProductos.value = true;
    }
  });

  const addItems = $((id: string, action: string) => {
    console.log("addItems", id);
  });

  const clearShow = $(() => {
    showRubros.value = true;
    showSubrubros.value = false;
    showProductos.value = false;
  });

  return (
    <div class="bg-secondary-100 rounded-2xl">
      <div class="flex flex-row ml-7 mr-7 h-full">
        <div class="flex flex-col items-center justify-center mr-10">
          <div>
            <span class="text-2xl">
              {(showRubros.value && "Rubros") ||
                (showSubrubros.value && "Subrubros") ||
                (showProductos.value && "Productos")}
            </span>
          </div>
          <div class="flex" >
            <button class="btn-func btn--verde" style="width: 100px; height: 50px" onClick$={() => clearShow()}>
              <span>Volver</span> </button>
          </div>
        </div>
        {/* {showRubros.value && (
        <div class="grid grid-cols-10 justify-center mt-3 ml-7 mr-7">
          {rubrosData.value.map((rubro, idx) => (
              <div class="grid h-full" key={idx}>
                <button class="h-24 w-28 bg-primary-500 hover:bg-blue-400 text-white font-bold border-primary-500 hover:border-blue-500 rounded flex"
                  onClick$={() => rubro.id !== undefined && showItems(rubro.id, "showSubrubros")}>
                  {rubro.nombre}
                </button>
              </div>
            ))}
        </div>
      )} */}
        <>
          {showRubros.value && (
            <>
              {slides.value && (
                <div class="carousel w-full">
                  {slides.value.map((slide:any, idx:any) => {
                    const totalSlider = slides.value.length;
                    console.log("totalSlider", totalSlider);
                    const ref1 =
                      "#" + (slides.value.length - 1 - idx).toString();
                    const ref2 = "#" + (idx + 1);
                    return (
                      <div id={idx} class="carousel-item relative w-full " key={idx}>
                        <div class="flex justify-between mx-auto">
                          {slide.map((item:any, idxi:any) => (
                            <div
                              class="grid h-full"
                              key={idx}
                              style="z-index : 1000"
                            >
                              <div
                                class="flex justify-center items-center h-32 w-32 p-4"
                                //key={idxi}
                              >
                                <button
                                  class="btn-rubro btn--azul"
                                  onClick$={() =>
                                    item.id !== undefined &&
                                    showItems(item.id, "showSubrubros")
                                  }
                                >
                                  <span class="text-white font-bold">
                                    {item.nombre}
                                  </span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                          <a href={ref1} class="btn btn-circle btn--azul">
                            ❮
                          </a>
                          <a href={ref2} class="btn btn-circle btn--azul">
                            ❯
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}


           {showSubrubros.value && (
            <>
                {slidesSubProductos.value && (
                <div class="carousel w-full">
                  {slidesSubProductos.value.map((slide:any, idx:any) => {
                    const totalSlider = slidesSubProductos.value.length;
                    console.log("totalSlider", totalSlider);
                    const ref1 =
                      "#" + (slidesSubProductos.value.length - 1 - idx).toString();
                    const ref2 = "#" + (idx + 1);
                    return (
                      <div id={idx} class="carousel-item relative w-full " key={idx}>
                        <div class="flex justify-between mx-auto">
                          {slide.map((item:any, idxi:any) => (
                            <div
                              class="grid h-full"
                              key={idx}
                              style="z-index : 1000"
                            >
                              <div
                                class="flex justify-center items-center h-32 w-32 p-4"
                                //key={idxi}
                              >
                                <button
                                  class="btn-rubro btn--azul"
                                  onClick$={() =>
                                    item.id !== undefined &&
                                    showItems(item.id, "showProductos")
                                  }
                                >
                                  <span class="text-white font-bold">
                                    {item.nombre}
                                  </span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                          <a href={ref1} class="btn btn-circle btn--azul">
                            ❮
                          </a>
                          <a href={ref2} class="btn btn-circle btn--azul">
                            ❯
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </>
          )}

          {/* {showSubrubros.value && (
            <div class="grid grid-cols-10 justify-center mt-3 ml-7 mr-7">
              {subrubrosData.value
                .filter((subrubro) => subrubro.rubro_id === selectedRubro.value)
                .map((subrubro, idx) => (
                  <button
                    class="h-24 w-28 bg-primary-500 hover:bg-blue-400 text-white font-bold border-primary-500 hover:border-blue-500 rounded flex"
                    key={idx}
                    onClick$={() =>
                      subrubro.id !== undefined &&
                      showItems(subrubro.id, "showProductos")
                    }
                  >
                    {subrubro.nombre}
                  </button>
                ))}
            </div>
          )} */}


        {showProductos.value && (
            <>
                {slidesProductos.value && (
                <div class="carousel w-full">
                  {slidesProductos.value.map((slide:any, idx:any) => {
                    const totalSlider = slidesProductos.value.length;
                    console.log("totalSlider", totalSlider);
                    const ref1 =
                      "#" + (slidesProductos.value.length - 1 - idx).toString();
                    const ref2 = "#" + (idx + 1);
                    return (
                      <div id={idx} class="carousel-item relative w-full " key={idx}>
                        <div class="flex justify-between mx-auto">
                          {slide.map((item:any, idxi:any) => (
                            <div
                              class="grid h-full"
                              key={idx}
                              style="z-index : 500"
                            >
                              <div
                                class="flex justify-center items-center h-32 w-32 p-4"
                                //key={idxi}
                              >
                                <button
                                  class="btn-rubro btn--azul"
                                  onClick$={() =>
                                    item.id !== undefined &&
                                    sendProducto(item)
                                  }
                                >
                                  <span class="text-white font-bold">
                                    {item.nombre}
                                  </span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                          <a href={ref1} class="btn btn-circle btn--azul">
                            ❮
                          </a>
                          <a href={ref2} class="btn btn-circle btn--azul">
                            ❯
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </>
          )}
          {/* {showProductos.value && (
            <div class="grid grid-cols-10 justify-center mt-3 ml-7 mr-7">
              {productosData.value
                .filter(
                  (producto) => producto.sub_rubro_id === selectedSubrubro.value
                )
                .map((producto, idx) => (
                  <div
                    class="h-24 w-28 bg-primary-500 hover:bg-blue-400 text-white font-bold border-primary-500 hover:border-blue-500 rounded flex"
                    key={idx}
                  >
                    <span>{producto.nombre}</span>
                  </div>
                ))}
            </div>
          )} */}
        </>
      </div>
    </div>
  );
});
