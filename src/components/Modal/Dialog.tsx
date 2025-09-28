import Button from "../Button/Button";

type PropsType = {
  children?: React.ReactNode;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Dialog = (props: PropsType) => {
  return (
    <div className="absolute bg-white border rounded shadow-lg p-3 w-60">
      {props.children}
      <div className="flex gap-2 mt-2">
        <Button text={props.confirmText} onClick={props.onConfirm} />
        <Button text={props.cancelText} onClick={props.onCancel} />
      </div>
    </div>
  );
};

export default Dialog;
