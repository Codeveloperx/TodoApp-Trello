import { Checkbox } from "./Fields/Checkbox";
import { ColorPicker } from "./Color/ColorPicker";
import { NumberField } from "./Fields/NumberField";
import { SelectField } from "./Fields/SelectField";
import { TextAreaField } from "./Fields/TextArea";
import { TextField } from "./Fields/TextField";
import type { Fields } from "../../../types/types";
import {
  FIELD_CHECKBOX,
  FIELD_COLOR,
  FIELD_NUMBER,
  FIELD_SELECT,
  FIELD_TEXT,
  FIELD_TEXTAREA,
} from "../../../constants/constant";

type RenderFieldProps = {
  field: Fields;
  value: string;
  onChange: (name: string, value: unknown) => void;
  inputRef?: (element: HTMLInputElement | null) => void;
};

export const RenderField = (props: RenderFieldProps) => {
  const renderer = fieldRenderers[props.field.type];

  if (!renderer) {
    console.warn(`Campo de tipo "${props.field.type}" no reconocido`);
    return null;
  }

  return <>{renderer(props)}</>;
};

//prettier-ignore
const fieldRenderers: Record<string, (props: RenderFieldProps) => React.ReactNode> = {
  [FIELD_TEXT]: ({ field, value, onChange, inputRef }) => (
    <TextField
      id={field.name}
      name={field.name}
      placeholder={field.placeholder}
      value={value}
      onChange={(val) => onChange(field.name, val)}
      inputRef={inputRef}
    />
  ),

  [FIELD_NUMBER]: ({ field, value, onChange }) => (
    <NumberField
      id={field.name}
      name={field.name}
      placeholder={field.placeholder}
      value={toNumber(value)}
      onChange={(val) => onChange(field.name, val)}
    />
  ),

  [FIELD_TEXTAREA]: ({ field, value, onChange }) => (
    <TextAreaField
      id={field.name}
      name={field.name}
      placeholder={field.placeholder}
      value={value}
      onChange={(val) => onChange(field.name, val)}
    />
  ),

  [FIELD_SELECT]: ({ field, value, onChange }) => (
    <SelectField
      id={field.name}
      name={field.name}
      placeholder={field.placeholder}
      value={value}
      options={field.options}
      onChange={(val) => onChange(field.name, val)}
    />
  ),

  [FIELD_COLOR]: ({ field, value, onChange }) => (
    <ColorPicker
      label={field.label}
      name={field.name}
      value={value}
      onChange={onChange}
    />
  ),

  [FIELD_CHECKBOX]: ({ field, value, onChange }) => (
    <Checkbox
    id={field.name}
    value={Boolean(value)}
    onChange={(val) => onChange(field.name, val)}
    />
  )
};

const toNumber = (value: string): number | string => {
  if (value === null || value === undefined || value === "") return "";
  const num = Number(value);
  return isNaN(num) ? "" : num;
};
