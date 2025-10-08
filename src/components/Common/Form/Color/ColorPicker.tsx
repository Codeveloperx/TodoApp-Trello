import { useEffect, useRef } from "react";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
};

const DEFAULT_COLOR = "#459fe8";

export function ColorPicker(props: Props) {
  //prettier-ignore
  const {
    name,
    value = DEFAULT_COLOR
  } = props;

  // Usar el valor por defecto si viene vacío
  const currentValue = value || DEFAULT_COLOR;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    props.onChange(name, DEFAULT_COLOR);
  }, []);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className="flex items-center gap-2 px-2 py-1 border border-gray-500 rounded-sm cursor-pointer bg-white"
      onClick={handleClick}
    >
      <input
        id={name}
        ref={inputRef}
        type="color"
        value={currentValue}
        onChange={(e) => props.onChange(name, e.target.value)}
        className="h-8 w-8 cursor-pointer"
      />
      <span className="text-gray-500">{value}</span>
    </div>
  );
}
