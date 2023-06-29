import { component$ } from '@builder.io/qwik';
import type { selectOption } from '~/interfaces/iTableFieldConfiguratio';

//import { Field } from '@modular-forms/qwik';


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
          <label class="text-lg text-colororange " for={field.fieldName}>
            {field.title}:
          </label>
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
                // console.log("e.target.value", e.target.value);
              }}
            />
          )}
          {field.type === "select" && (
            <select
              class={`${
                field.key
                  ? "hidden"
                  : "input input-bordered input-primary w-auto  "
              }`}
              {...props}
              value={fie.value}
              onChange$={(e) => {
                fie.value = e.target.value;
                // console.log("e.target.value", e.target.value);
              }}
            >
              {field.options.map((option: selectOption) => {
                //console.log("option", option);
                // console.log("field.Options", field.options);

                return <option key={option.value} value={option.value}>{option.label}</option>;
              })}
            </select>
          )}
          {(field.type === "text" ||
            field.type === "number" ||
            field.type === "time" ||
            field.type === "date") && (
            <input
              class={`${
                field.key
                  ? "hidden"
                  : "input input-bordered input-primary w-auto"
              }`}
              {...props}
              type={field.type}
              value={fie.value}
              onChange$={(e) => {
                fie.value = e.target.value;
                // console.log("e.target.value", e.target.value);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
});