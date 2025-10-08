type BaseProps = {
  text?: string;
  className?: string;
};

const BaseDropZone = (props: BaseProps) => {
  //prettier-ignore
  const {
    text = "Drop Here",
    className = ""
  } = props;

  return (
    <div
      className={`flex items-center justify-center rounded h-20 w-full animate-pulse
      ${className} bg-blue-200 border-2 border-dashed border-blue-500`}
    >
      <span className="text-blue-600 font-semibold text-sm">{text}</span>
    </div>
  );
};

const DropZone = {
  Start: (props: BaseProps) => <BaseDropZone {...props} className="mb-2" />,
  End: (props: BaseProps) => <BaseDropZone {...props} className="mt-2" />,
};

export default DropZone;
