type NumberFieldProps = {
  id: string;
  name: string;
  placeholder?: string;
  value: number | string;
  onChange: (value: number | string) => void;
};

export const NumberField = (props: NumberFieldProps) => {
  return (
    <input
      id={props.id}
      name={props.name}
      type="number"
      placeholder={props.placeholder}
      className="border p-2 rounded"
      value={props.value}
      onChange={(e) =>
        props.onChange(e.target.value ? Number(e.target.value) : "")
      }
    />
  );
};
