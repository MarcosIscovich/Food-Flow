import type { QRL } from "@builder.io/qwik";
import { component$, $ } from "@builder.io/qwik";
import { IconLeft, IconRight } from "../icons";

interface parametros {
  currentPage: number;
  totalPages: number;
  incrementPage: QRL<() => number>;
  decrementPage: QRL<() => number>;
  goPage: (num: number) => number;
}

export const Pagination = component$<parametros>((props) => {
  const { totalPages, currentPage, goPage } = props;
  const pages = [];

  const _goPage = $((num: number) => {
    goPage(num);
  });
  if (totalPages > 1) {
    // Generar los botones de página
    // Generar los botones de página
    if (totalPages <= 10) {
      // Si el número de páginas es menor o igual a 10, mostrar todos los botones
      for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        const buttonClass = isActive ? "btn btn-active  btn-sm" : "btn  btn-sm";

        pages.push(
          <button
            key={i}
            class={buttonClass}
            onClick$={() => {
              _goPage(i);
            }}
          >
            {i}
          </button>
        );
      }
    } else {
      // Si el número de páginas es mayor a 10, mostrar botones de numeración en los extremos y en el centro
      const showFirst = currentPage > 4;
      const showLast = currentPage < totalPages - 3;

      pages.push(
        <button
          class={currentPage === 1 ? "btn btn-active  btn-sm" : "btn   btn-sm"}
          onClick$={() => {
            _goPage(1);
          }}
        >
          1
        </button>
      );

      if (showFirst) {
        pages.push(
          <button class="btn  btn-sm" disabled={true}>
            ...
          </button>
        );

        let desde = currentPage - 2;
        if (currentPage > totalPages - 4) {
          desde = totalPages - 5;
        }
        const hasta = currentPage + 2;

        for (let i = desde; i <= hasta; i++) {
          const isActive = i === currentPage;
          const buttonClass = isActive
            ? "btn btn-active  btn-sm"
            : "btn   btn-sm";

          if (i < totalPages) {
            pages.push(
              <button
                key={i}
                class={buttonClass}
                onClick$={() => {
                  _goPage(i);
                }}
              >
                {i}
              </button>
            );
          }
        }
      } else if (showLast) {
        for (let i = 2; i <= 6; i++) {
          const isActive = i === currentPage;
          const buttonClass = isActive
            ? "btn btn-active  btn-sm"
            : "btn  btn-sm";

          pages.push(
            <button
              key={i}
              class={buttonClass}
              onClick$={() => {
                _goPage(i);
              }}
            >
              {i}
            </button>
          );
        }

        pages.push(
          <button class="btn  btn-sm" disabled={true}>
            ...
          </button>
        );
      } else {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          const isActive = i === currentPage;
          const buttonClass = isActive
            ? "btn btn-active  btn-sm"
            : "btn  btn-sm";

          pages.push(
            <button
              key={i}
              class={buttonClass}
              onClick$={() => {
                _goPage(i);
              }}
            >
              {i}
            </button>
          );
        }
      }

      pages.push(
         <button
           key={totalPages}
           class={
             currentPage === totalPages
               ? "btn btn-active  btn-sm"
               : "btn  btn-sm"
           }
           onClick$={() => {
             _goPage(totalPages);
           }}
         >
           {totalPages}
         </button>
       );
    }
  }

  const incrementPage = $((props: { incrementPage: () => void }) => {
    if (currentPage < totalPages) {
      props.incrementPage();
    }
  });

  const decrementPage = $((props: { decrementPage: () => void }) => {
    if (currentPage > 1) {
      props.decrementPage();
    }
  });

  return (
    <>
      {totalPages > 1 && (
        <div class="btn-group m-3 ">
          <button
            class="btn  btn-outline btn-sm"
            disabled={currentPage === 1}
            onClick$={$(() => decrementPage(props))}
          >
            <IconLeft />
          </button>
          {pages}
          <button
            class="btn btn-outline  btn-sm"
            disabled={currentPage === totalPages}
            onClick$={() => incrementPage(props)}
          >
            <IconRight />
          </button>
        </div>
      )}
    </>
  );
});
