import React, { useState } from "react";
import { ColorPickerField } from "./Color/ColorPickerField";
import type { Fields } from "../../types/types";
import {
  FIELD_COLOR,
  FIELD_NUMBER,
  FIELD_SELECT,
  FIELD_TEXT,
  FIELD_TEXTAREA,
} from "../../constants/constant";

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

          {field.type === FIELD_TEXT && (
            <input
              ref={handleFocus(props.inputRef, field.name)}
              id={field.name}
              name={field.name}
              type="text"
              className="border p-2 rounded"
              placeholder={field.placeholder}
              value={(formValues[field.name] as string) ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}

          {field.type === FIELD_NUMBER && (
            <input
              id={field.name}
              name={field.name}
              type="number"
              placeholder={field.placeholder}
              className="border p-2 rounded"
              value={(formValues[field.name] as number) ?? ""}
              onChange={(e) =>
                handleChange(
                  field.name,
                  e.target.value ? Number(e.target.value) : ""
                )
              }
            />
          )}

          {field.type === FIELD_TEXTAREA && (
            <textarea
              id={field.name}
              name={field.name}
              className="border p-2 rounded"
              placeholder={field.placeholder}
              value={(formValues[field.name] as string) ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}

          {field.type === FIELD_SELECT && (
            <select
              id={field.name}
              name={field.name}
              className="border p-2 rounded"
              value={(formValues[field.name] as string) ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              <option value="" disabled hidden>
                {field.placeholder}
              </option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {field.type === FIELD_COLOR && (
            <ColorPickerField
              label={field.label}
              name={field.name}
              value={formValues[field.name] as string}
              onChange={handleChange}
            />
          )}

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
