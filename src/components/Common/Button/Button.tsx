type BaseProps = {
  text: string;
  className?: string;
  onClick: () => void;
};

const BaseButton = (props: BaseProps) => (
  <button
    type="button"
    onClick={props.onClick}
    className={`text-white flex-1 px-3 py-1 rounded cursor-pointer ${props.className}`}
  >
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
};

export default Button;
