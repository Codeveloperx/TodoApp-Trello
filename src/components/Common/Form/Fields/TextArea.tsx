type TextAreaFieldProps = {
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  //prettier-ignore
  const { 
    value = "" 
  } = props;

  return (
    <textarea
      id={props.id}
      name={props.name}
      className="border p-2 rounded"
      placeholder={props.placeholder}
      value={value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};
