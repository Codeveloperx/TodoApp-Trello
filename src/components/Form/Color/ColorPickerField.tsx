import { useEffect, useRef } from "react";

type Props = {
  label: string;
  name: string;
  value?: string;
  onChange: (name: string, value: string) => void;
};

export function ColorPickerField(props: Props) {
  //prettier-ignore
  const {
    name,
    value = "#4299E1"
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    props.onChange(name, value);
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
        value={value}
        onChange={(e) => props.onChange(name, e.target.value)}
        className="h-8 w-8 cursor-pointer"
      />
      <span className="text-gray-500">{value}</span>
    </div>
  );
}
