import React, { Suspense, useEffect, useRef } from "react";
import { FormWrapper } from "../Form/FormWrapper";
const Dialog = React.lazy(() => import("../Modal/Dialog"));
import { useOpen } from "@/hooks";
import type { Fields, FormHandle } from "@/types/types";

type PropsType = {
  name: string;
  form: Fields[];
  label: string;
  cancel: string;
  accept: string;
  className?: string;
  onAddItem: (values: Record<string, unknown>) => void;
};

export const AddItem = (props: PropsType) => {
  //prettier-ignore
  const { 
        onOpen, 
        onClose, 
        isOpen 
      } = useOpen();

  const formRef = useRef<FormHandle>(null);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        formRef.current?.focus(props.name);
      });
    }
  }, [isOpen]);

  const handleAddList = () => {
    const form = formRef.current;
    const values = form?.get();

    if (!values) return;
    props.onAddItem({ ...values });

    form?.clear();
    onClose();
  };

  return (
    <div>
      {isOpen ? (
        <Suspense fallback={<div>Cargando...</div>}>
          <Dialog
            onConfirm={handleAddList}
            onCancel={onClose}
            accept={props.accept}
            cancel={props.cancel}
          >
            <FormWrapper ref={formRef} fields={props.form} />
          </Dialog>
        </Suspense>
      ) : (
        <div
          onClick={onOpen}
          className={`
            flex items-center justify-center ${props.className} border-2 border-dashed
            p-2 border-gray-300 transition-colors rounded-lg text-gray-500 cursor-pointer
            hover:border-blue-400 hover:text-blue-500
            `}
        >
          <span className="text-sm font-medium">{props.label}</span>
        </div>
      )}
    </div>
  );
};
