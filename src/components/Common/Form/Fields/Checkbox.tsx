type TaskCheckboxProps = {
  id: string;
  value: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
};

export const Checkbox = (props: TaskCheckboxProps) => {
  //prettier-ignore
  const { 
    value = false, 
    onChange ,
  } = props;

  return (
    <input
      id={props.id}
      type="checkbox"
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
      className={props.className}
    />
  );
};
