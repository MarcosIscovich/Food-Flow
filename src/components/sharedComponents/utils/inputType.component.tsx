import { component$ } from '@builder.io/qwik';
import type { selectOption } from '~/interfaces/iTableFieldConfiguratio';


export interface InputType {
  field: any,
  fie: any,
  propss: any,
  pass: any
}

export const InputType = component$<InputType>((props) => {
  const { field, fie, pass, propss } = props;

  return (
    <div class="">
      {/* <div class="grid grid-cols-12 gap-6 mt-7 "> */}
      <div class="flex flex-col justify-start align-text-bottom">
        <div class="col-span-4 flex justify-start align-text-bottom">
          {((field.type !== "checkbox" && field.type !== "password") ||
            (field.type === "password" && pass.value)) && (
            <label class="text-md text-colororange " for={field.fieldName}>
              {field.title}:
            </label>
          )}
        </div>
        {/* <div class="col-span-8 w-full flex justify-end"> */}
        <div class="col-span-8 w-full flex justify-start">
          {field.type === "textarea" && (
            <div class="flex flex-col">
              <textarea
              {...props}
              value={fie.value}
              rows={4}
              class="rounded-md w-5/6"
              onChange$={(e) => {
                fie.value = e.target.value;
              }}
            />
            { fie.error && (
              <div class="text-red-500 text-xs">{fie.error}</div>
            )}
            </div>
            
          )}
          {field.type === "select" && (
            <select
              class={`${
                field.key
                  ? "hidden"
                  : "input input-bordered input-primary w-5/6  "
              }`}
              {...props}
              value={fie.value}
              onChange$={(e) => {
                fie.value = e.target.value;
              }}
            >
              {field.options.map((option: selectOption) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          )}
          {field.type === "checkbox" && (
            <div class="flex flex-col">
              <div class="flex flex-row justify-center items-center">
                <input
                  class="form-checkbox input input-bordered input-primary w-auto mr-2"
                  type="checkbox"
                  id={field.fieldName}
                  checked={fie.value == "1" ? true : false}
                  onChange$={(e) => {
                    fie.value = e.target.checked ? "1" : "0";
                    pass.value = !pass.value;
                  }}
                />
                <label class="text-lg text-colororange ">{field.label}</label>
              </div>
              {fie.error && <div class="text-red-500 text-xs">{fie.error}</div>}
            </div>
          )}
          {(field.type === "text" ||
            field.type === "number" ||
            field.type === "time" ||
            field.type === "date" ||
            field.type === "email") && (
            //field.type === "password"
            <div class="flex flex-col">
              <input
                class={`${
                  field.key
                    ? "hidden"
                    : "input input-bordered input-primary w-5/6"
                }`}
                {...props}
                type={field.type}
                value={fie.value}
                aria-invalid={!!fie.error}
                aria-errormessage={`${field.fieldName}-error`}
                onChange$={(e) => {
                  fie.value = e.target.value;
                }}
              />
              {fie.error && <div class="text-red-500 text-xs">{fie.error}</div>}
            </div>
          )}
          {field.type === "password" && pass.value && (
            <div class="flex flex-col">
              {console.log("pass", pass.value)}
              <input
                class={`${
                  !pass.value
                    ? "hidden"
                    : "input input-bordered input-primary w-5/6"
                }`}
                {...props}
                type={field.type}
                value={fie.value}
                //aria-invalid={!!fie.error}
                //aria-errormessage={`${field.fieldName}-error`}
                onChange$={(e) => {
                  fie.value = e.target.value;
                }}
              />
              {fie.error && <div class="text-red-500 text-xs">{fie.error}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});