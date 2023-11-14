import {
  component$,
  $,
  Resource,
  useResource$,
  useStore,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import { AuthContext } from "~/context/auth/auth.context";
import { IconDelete, IconDown, IconEdit, IconUp, IconCheck, IconClose, IconPhoto } from "~/components/sharedComponents/icons";

import { lista } from "~/services/generico.service";
import { Pagination } from "./pagination.component";
import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";
//import { Field } from "@modular-forms/qwik";
//import  { options } from '../../../../../admin-qwik/src/routes/admin/index';

interface parametros {
  fieldConfiguration: iTableFieldConfiguration[];
  refreshData: boolean;
  modeloURL: string;
  inputTxt: string;
  setItemData: (item: any) => void;
  confirmDeleteItem: (item: any) => void;
  uploadPhoto?: (item: any) => void;
  _order: string;
  _orderSign: string;
  filter: string[]
}

export const Table = component$<parametros>((props) => {
  const {
    fieldConfiguration,
    modeloURL,
    inputTxt,
    refreshData,
    setItemData,
    confirmDeleteItem,
    uploadPhoto,
    _order,
    _orderSign,
    filter,
  } = props;



  const authContext = useContext(AuthContext);

  const order = useSignal<string>(_order);
  const orderSign = useSignal<string>(_orderSign);

  const pagination = useStore({
    currentPage: 1,
    totalPages: 1,
  });

  const setOrder = $((value: string) => {
    if (order.value != value) {
      order.value = value;
      orderSign.value = "";
    } else {
      orderSign.value = orderSign.value == "" ? "-" : "";
    }
  });

  const getIconOrder = $((value: string) => {
    if (order.value == value) {
      return orderSign.value == "" ? <IconUp /> : <IconDown />;
    } else {
      return <></>;
    }
  });

  const listaResource = useResource$<any>(async ({ track, cleanup }) => {
    const _paginaActual = track(() => pagination.currentPage);
    track(() => [
      authContext.token,
      inputTxt,
      order.value,
      orderSign.value,
      refreshData,
    ]);

    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));

    if (authContext.isAutenticated) {
      const response = await lista(authContext.token || "",
        _paginaActual,
        8,
        inputTxt || "",
        order.value,
        orderSign.value,
        modeloURL,
        filter || ""
      );

      //console.log("response", response);
      if (response?.meta && response?.meta.last_page) {
        pagination.totalPages = response.meta.last_page;

        //console.log("total paginas: ", pagination.totalPages);
      } else {
        pagination.totalPages = 1;
      }

     // console.log("Llegan los "+ modeloURL, response.data);

      return response.data; //.data.rows;
    }

    return [];
  });

  return (
    <div>
      <table class="table table-zebra table-xs w-full ">
        <thead>
          <tr>
            {fieldConfiguration.filter((item: any) => item.visibleInTable).map((item: any, index: number) => {
              
              return (
                <th
                  key={index}
                  class={`${item.hiddenInMobile ? " hidden md:table-cell w-auto " : ""
                    } ${item.ordenable ? " cursor-pointer " : ""} hover:bg-slate-400 rounded-md w-auto `}
                  onClick$={$(() => { item.ordenable ? setOrder(item.fieldName) : "" })}
                >
                  <div class="flex">
                    {item.title} {getIconOrder(item.fieldName)}
                  </div>
                </th>
              );
            })}

            <th style="width: 200px">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="text-sm font-normal text-gray-700 items-center">
          <Resource
            value={listaResource}
            onPending={() => (
              <div class="m-4  ">
                <span class="loading loading-dots loading-lg  "></span>
              </div>
            )}
            onResolved={(data) => {
              return data.map((item: any, index: number) => {

                return (
                  <tr key={index} class="hover ">
                    {fieldConfiguration.filter((item: any) => item.visibleInTable).map((fieldItem: any, index: number) => {


                      return (
                        <>
                          {fieldItem.options && fieldItem.options.length > 0 ? (
                            fieldItem.options.map((option: any) => {
                              if (option.value == item[fieldItem.fieldName]) {
                               
                                
                                return (
                                  <th key={index} class={`${fieldItem.hiddenInMobile ? "hidden md:table-cell" : ""}  `} >
                                    {option.label}
                                  </th>
                                );
                              }
                            })
                          ) : fieldItem.type === "checkbox" ? (
                            <th key={index} class={`${fieldItem.hiddenInMobile ? "hidden md:table-cell " : ""}  `}>
                              <div class="flex justify-center">
                                {item[fieldItem.fieldName] == 1 ? <IconCheck size="30px" /> : <IconClose size="30px" />}
                              </div>
                            </th>
                          ) : fieldItem.fieldName === "imagen" ? (
                            <th key={index} class={`${fieldItem.hiddenInMobile ? "hidden md:table-cell " : ""}  `}>
                              
                              <img src={'http://127.0.0.1:5501/FoodFlow-Api/'+item.imagen} class="p-3" width="100" height="100" alt="Imagen" />
                            </th>
                          ) : (
                            <th key={index} class={`${fieldItem.hiddenInMobile ? "hidden md:table-cell" : ""}  `}>
                              {item[fieldItem.fieldName]}
                            </th>
                          )}
                        </>
                      );
                    })}

                    <td >
                      <div class="flex flex-row justify-around items-center">
                      <button
                        class="btn btn-square mr-1 btn-secondary btn-sm"
                        onClick$={async () => {
                          await setItemData(item);
                        }}
                      >
                        <IconEdit />
                      </button>
                      <button
                        class="btn btn-square mr-1 btn-error btn-sm"
                        onClick$={() => {
                          confirmDeleteItem(item);
                        }}
                      >
                        <IconDelete />
                      </button>
                     {(modeloURL == "productos" || modeloURL == "rubros" || modeloURL == "subrubros") && ( 
                      <button
                        class="btn btn-square btn-success btn-sm"
                        onClick$={() => { 
                          if(uploadPhoto) {uploadPhoto(item);}
                        }}
                      >
                        <IconPhoto />
                      </button>
                     )}
                      </div>
                    </td>
                  </tr>
                );
              });
            }}
          />
        </tbody>
      </table>

      <div class="flex w-full  align-middle justify-center p-2">
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          goPage={$((num: number): any => {
            pagination.currentPage = num;
          })}
          decrementPage={$((): any => {
            pagination.currentPage -= 1;
          })}
          incrementPage={$((): any => {
            pagination.currentPage += 1;
          })}
        />
      </div>
    </div>
  );
});