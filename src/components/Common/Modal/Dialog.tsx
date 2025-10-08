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
    <div className="bg-white border rounded shadow-lg mt-2">
      {props.children}
      <div className="flex gap-2 py-2 px-4">
        <Button.Add text={props.confirmText} onClick={props.onConfirm} />
        <Button.Cancel text={props.cancelText} onClick={props.onCancel} />
      </div>
    </div>
  );
};

export default Dialog;
