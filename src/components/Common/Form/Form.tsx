import { useState } from "react";
import type { Fields } from "../../../types/types";
import { RenderField } from "./RenderField";

type PropsType = {
  inputRef: React.RefObject<Record<string, HTMLInputElement | null>>;
  fields: Fields[];
  values?: Record<string, unknown>;
  errors?: Record<string, string> | null;
  onChange?: (values: Record<string, unknown>) => void;
};

const Form = (props: PropsType) => {
  //prettier-ignore
  const { 
    values = {}, 
    errors = {} 
  } = props;

  const [formValues, setFormValues] = useState<Record<string, unknown>>(values);

  const fields = props.fields.map((field) => ({
    required: false,
    hidden: false,
    ...field,
  }));

  const handleChange = (name: string, value: unknown) => {
    const valuesField = { ...formValues, [name]: value };
    setFormValues(valuesField);
    props.onChange?.(valuesField);
  };

  const handleFocus = (
    ref: React.RefObject<Record<string, HTMLInputElement | null>>,
    name: string
  ) => {
    return (element: HTMLInputElement | null) => {
      ref.current[name] = element;
    };
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-4 p-4 rounded-lg"
    >
      {fields.map((field) => (
        <div
          key={field.name}
          className={`flex flex-col ${field.hidden ? "hidden" : ""}`}
        >
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {field.label}
          </label>

          <RenderField
            field={field}
            value={formValues[field.name] as string}
            onChange={handleChange}
            inputRef={handleFocus(props.inputRef, field.name)}
          />

          {errors?.[field.name] && (
            <span className="text-red-500 text-[12px] mt-1">
              {errors[field.name]}
            </span>
          )}
        </div>
      ))}
    </form>
  );
};

export default Form;
