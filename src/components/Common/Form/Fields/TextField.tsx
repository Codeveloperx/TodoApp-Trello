type TextFieldProps = {
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  inputRef?: (element: HTMLInputElement | null) => void;
};

export const TextField = (props: TextFieldProps) => {
  //prettier-ignore
  const { 
    value = "" 
  } = props;

  return (
    <input
      ref={props.inputRef}
      id={props.id}
      name={props.name}
      type="text"
      className="border p-2 rounded"
      placeholder={props.placeholder}
      value={value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};
