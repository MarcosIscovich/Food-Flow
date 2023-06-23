import { component$, useSignal } from '@builder.io/qwik';
//import { Field } from '@modular-forms/qwik';

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
      {field.type === "textarea" && (
        <textarea
          {...props}
          value={fie.value}
          rows="4"
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
        >
          {field.options.map((option, index) => {
            console.log("option", option);
            console.log("Options", field.options);

            return <option key={index}>{option}</option>;
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