import Button from "../Button/Button";

type PropsType = {
  children?: React.ReactNode;
  accept: string;
  cancel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Dialog = (props: PropsType) => {
  return (
    <div className="bg-white border rounded shadow-lg mt-2">
      {props.children}
      <div className="flex gap-2 py-2 px-4">
        <Button.Add text={props.accept} onClick={props.onConfirm} />
        <Button.Cancel text={props.cancel} onClick={props.onCancel} />
      </div>
    </div>
  );
};

export default Dialog;
