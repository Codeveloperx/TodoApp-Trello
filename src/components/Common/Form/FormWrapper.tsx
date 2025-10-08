import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import Form from "./Form";
import type { Fields, FormHandle } from "../../../types/types";

type PropsType = {
  data?: Record<string, unknown>;
  fields: Fields[];
};

export const FormWrapper = forwardRef<FormHandle, PropsType>((props, ref) => {
  //prettier-ignore
  const {
    data = {}
  } = props;

  const [values, setValues] = useState<Record<string, unknown>>(data || {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputRef = useRef<Record<string, HTMLInputElement | null>>({});

  const onHandleChange = (values: Record<string, unknown>) => {
    setValues(values);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    (props.fields as Fields[]).forEach((field) => {
      const rawValue = values[field.name];

      const isEmpty =
        rawValue === undefined ||
        rawValue === null ||
        (typeof rawValue === "string" && rawValue.trim() === "");

      if (field.required && isEmpty) {
        newErrors[field.name] =
          field.errorMessage || `${field.label} es obligatorio`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  useImperativeHandle(ref, () => ({
    get: () => (validate() ? values : null),
    clear: () => {
      setValues(data);
      setErrors({});
    },
    focus: (name: string) => {
      inputRef.current[name]?.focus();
    },
  }));

  return (
    <Form
      inputRef={inputRef}
      fields={props.fields as Fields[]}
      values={data}
      onChange={onHandleChange}
      errors={errors}
    />
  );
});
