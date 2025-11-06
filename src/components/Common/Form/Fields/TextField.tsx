type TextFieldProps = {
  className?: string;
  id: string;
  inputRef?: (element: HTMLInputElement | null) => void;
  name: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onBlur?: () => void;
  placeholder?: string;
  value: string;
};

export const TextField = (props: TextFieldProps) => {
  //prettier-ignore
  const { 
    value = "" 
  } = props;

  const className = props.className || "border p-2 rounded";
  return (
    <input
      ref={props.inputRef}
      id={props.id}
      name={props.name}
      type="text"
      className={className}
      placeholder={props.placeholder}
      value={value}
      onKeyDown={props.onKeyDown}
      onChange={(e) => props.onChange(e.target.value)}
      onBlur={props.onBlur}
    />
  );
};
