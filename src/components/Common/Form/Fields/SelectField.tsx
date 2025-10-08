type SelectFieldProps = {
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  options?: string[];
  onChange: (value: string) => void;
};

export const SelectField = (props: SelectFieldProps) => {
  // prettier-ignore
  const { 
    value = "",
    options = [] 
  } = props;

  return (
    <select
      id={props.id}
      name={props.name}
      className="border p-2 rounded"
      value={value}
      onChange={(e) => props.onChange(e.target.value)}
    >
      <option value="" disabled hidden>
        {props.placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};
