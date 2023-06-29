import { component$ } from '@builder.io/qwik';
import type { selectOption } from '~/interfaces/iTableFieldConfiguratio';


export interface InputType {
  field: any,
  fie: any,
  propss: any
}

export const InputType = component$<InputType>((props) => {
  const { field, fie } = props;

  return (
    <>
      <div class="grid grid-cols-4 gap-4 mt-7 ">
        <div class="col-span-auto flex justify-end align-text-bottom">
          {
            field.type !== "checkbox" && <label class="text-lg text-colororange " for={field.fieldName}>
              {field.title}:
            </label>

          }

        </div>
        <div class="col-span-2">
          {field.type === "textarea" && (
            <textarea
              {...props}
              value={fie.value}
              rows={4}
              class="rounded-md "
              onChange$={(e) => {
                fie.value = e.target.value;
              }}
            />
          )}
          {field.type === "select" && (
            <select
              class={`${field.key
                ? "hidden"
                : "input input-bordered input-primary w-auto  "
                }`}
              {...props}
              value={fie.value}
              onChange$={(e) => {
                fie.value = e.target.value;
              }}
            >
              {field.options.map((option: selectOption) => {
                return <option key={option.value} value={option.value}>{option.label}</option>;
              })}
            </select>
          )}
          {field.type === "checkbox" && (
            <div class="flex flex-row justify-start items-center">
              <input
                class="form-checkbox input input-bordered input-primary w-auto mr-2"
                type="checkbox"
                id={field.fieldName}
                checked={fie.value == "1" ? true : false}
                onChange$={(e) => {
                  fie.value = e.target.checked ? "1" : "0";
                }}
              />
              <label class="text-lg text-colororange ">{field.label}</label>
            </div>
          )}
          {(field.type === "text" ||
            field.type === "number" ||
            field.type === "time" ||
            field.type === "date" ||
            field.type === "email") && (
              <input
                class={`${field.key
                  ? "hidden"
                  : "input input-bordered input-primary w-auto"
                  }`}
                {...props}
                type={field.type}
                value={fie.value}
                onChange$={(e) => {
                  fie.value = e.target.value;
                }}
              />
            )}
        </div>
      </div>
    </>
  );
});