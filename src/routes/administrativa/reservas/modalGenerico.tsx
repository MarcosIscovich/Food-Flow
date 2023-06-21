import { component$, $, type PropFunction, useTask$ } from "@builder.io/qwik";
import type { SubmitHandler } from "@modular-forms/qwik";
import { setValue, useForm, zodForm$, clearError } from "@modular-forms/qwik";
import type { z } from "@builder.io/qwik-city";

import { Modal } from "~/components/sharedComponents/modal/index";
import type { FormField } from "./index";
import { useFormLoader, validationSchema } from "./index";
import type { iTableFieldConfiguration } from "~/interfaces/iTableFieldConfiguratio";

type IBaseSchema = z.infer<typeof validationSchema>;

interface parametros {
  tableFields: iTableFieldConfiguration[];
  show: boolean;
  title: string;
  itemData: any;

  onClose$: PropFunction<() => void>;
  onSave$: PropFunction<(data: any) => any>;
}

export const ModalGenerico = component$<parametros>((props) => {
  const {
    show,
    title,
    itemData: _itemData,
    tableFields,
    onClose$,
    onSave$,
  } = props;

  const [genericForm, { Form, Field }] = useForm<IBaseSchema>({
    loader: useFormLoader(),
    validate: zodForm$(validationSchema),
  });

  useTask$(({ track }) => {
    track(() => [_itemData, show]);

    if (_itemData != undefined && genericForm != undefined) {
      Object.entries(_itemData).forEach(([key, value]) => {
        if (_itemData.id) {
          setValue(genericForm, key as FormField, value as any);
        } else {
          setValue(genericForm, key as FormField, "");
        }
        clearError(genericForm, key as FormField);
      });
    }
  });

  const handleSubmit: SubmitHandler<IBaseSchema> = $((values) => {
    console.log("handle", values);
    if (_itemData.id) {
      values.id = _itemData.id;
    }
    onSave$(values);
    onClose$();
  });

  return (
    <div class=" ">
      <Modal
        show={show}
        onClose$={$(() => {
          onClose$();
        })}
        title={title}
      >
        <div class="border-b border-gray-900/10 pb-4 pt-0 mt-0">
          <div class=" ">
            <div class="  ">
              <Form
                onSubmit$={$((values, event) => {
                  console.log("values", values);
                  handleSubmit(values, event);
                })}
              >
                <div class="grid grid-cols-1 gap-x-2 gap-y-8 md:grid-cols-2">
                  {tableFields != undefined &&
                    tableFields
                      .filter((item) => item.fieldName !== "id")
                      .map((field, index) => {
                        return (
                          <div key={index}>
                            <Field name={field.fieldName as FormField}>
                              {(fie, props) => (
                                <div>
                                  <label for={field.fieldName}>
                                    <span class="   !text-xs">
                                      {field.title}
                                    </span>
                                  </label>
                                  <input
                                    class="block p-2 w-full input input-sm max-w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...props}
                                    type={field.type}
                                    value={fie.value}
                                  />
                                  {fie.value && fie.error && (
                                    <div>{fie.error}</div>
                                  )}
                                </div>
                              )}
                            </Field>
                          </div>
                        );
                      })}
                </div>
                <div class="w-full flex justify-center items-center my-6  ">
                  <button type="submit" class="btn btn-primary">
                    GUARDAR
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
});
