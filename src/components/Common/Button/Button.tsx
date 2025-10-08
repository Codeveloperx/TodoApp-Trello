type BaseProps = {
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick: () => void;
};

const BaseButton = (props: BaseProps) => (
  <button
    type="button"
    onClick={props.onClick}
    className={`text-white flex-1 px-3 py-1 rounded cursor-pointer ${props.className}`}
  >
    {props.icon}
    {props.text}
  </button>
);

const Button = {
  Add: (props: BaseProps) => (
    <BaseButton {...props} className="bg-blue-500 hover:bg-blue-700" />
  ),
  Cancel: (props: BaseProps) => (
    <BaseButton {...props} className="bg-gray-500 hover:bg-gray-700" />
  ),
  Delete: (props: BaseProps) => (
    <BaseButton {...props} className="bg-red-500 hover:bg-red-700" />
  ),
  Edit: (props: BaseProps) => (
    <BaseButton
      className="transition-opacity opacity-0 group-hover:opacity-100"
      {...props}
    />
  ),
};

export default Button;
