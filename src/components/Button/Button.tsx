type PropsType = {
  text: string;
  color?: string; //TODO: Para persolizar el color del botón a futuro.
  onClick: () => void;
};

const Button = (props: PropsType) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white px-3 py-1 rounded flex-1"
      >
        {props.text}
      </button>
    </>
  );
};

export default Button;
