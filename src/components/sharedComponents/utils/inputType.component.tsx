import { PropFunction, component$, useSignal } from '@builder.io/qwik';
import { selectOption } from '~/interfaces/iTableFieldConfiguratio';
import { setValue } from '@modular-forms/qwik';
//import { Field } from '@modular-forms/qwik';
import { on } from 'events';
import { value } from '@modular-forms/qwik';

export interface InputType {
  field: any,
  fie: any,
  propss: any
}

export const InputType = component$<InputType>((props) => {
    const { field, fie , propss } = props;
  const count = useSignal(0);
  return (
    <>
      <label for={field.fieldName}>
        <span class="   !text-xs">{field.title}</span>
      </label>
      {field.type === "textarea" && (
        <textarea
          {...props}
          value={fie.value}
          rows={4}
          class="rounded-md w-full max-w-xs col-span-2"
        />
      )}
      {field.type === "select" && (
        <select
          class={`${
            field.key
              ? "hidden"
              : "input input-bordered w-full max-w-xs col-span-2"
          }`}
          {...props}
          value={fie.value}
          onChange$ = {(e) => {
            fie.value = e.target.value;
           // console.log("e.target.value", e.target.value);  
          }}

        >
          {field.options.map((option: selectOption) => {
             //console.log("option", option);
            // console.log("field.Options", field.options);

            return <option key={option.value}>{option.label}</option>;
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
              : "input input-bordered w-full max-w-xs col-span-2"
          }`}
          {...props}
          type={field.type}
          value={fie.value}
        />
      )}
    </>
  );
});