import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
import { X } from "lucide-react";

type PropsType = {
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
};

const Modal = (props: PropsType) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-96 p-4 relative">
        <button
          onClick={props.onClose}
          className="absolute cursor-pointer top-2 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>
        {props.children}
        <div className="flex items-center justify-end gap-2 px-4 py-2">
          <Button.Add onClick={props.onConfirm} text="Guardar" />
          <Button.Cancel onClick={props.onClose} text="Cancelar" />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
