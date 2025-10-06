import { useEffect, useRef, useState } from "react";
import { FormWrapper } from "../Form/FormWrapper";
import Dialog from "../Modal/Dialog";
import formFields from "../Form/task.json";
import type { Fields, FormHandle, Task } from "../../types/types";

type PropsTypes = {
  onAddTask: (task: Task) => void;
};

const Footer = (props: PropsTypes) => {
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef<FormHandle>(null);

  const handleAddNewTask = () => {
    const form = formRef.current;

    const values = form?.get() as Task | null;
    if (!values) return;

    const newTask: Task = {
      id: Date.now().toString(),
      task: values.task,
      position: values.position,
    };

    props.onAddTask(newTask);
    form?.clear();
    setShowForm(false);
  };

  useEffect(() => {
    if (showForm) {
      requestAnimationFrame(() => {
        formRef.current?.focus("task");
      });
    }
  }, [showForm]);

  return (
    <div className="mt-2">
      {showForm ? (
        <Dialog
          cancelText="Cancel"
          confirmText="Add Task"
          onConfirm={handleAddNewTask}
          onCancel={() => setShowForm(false)}
        >
          <FormWrapper ref={formRef} fields={formFields as Fields[]} />
        </Dialog>
      ) : (
        <div
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-2 text-gray-500 cursor-pointer hover:border-blue-400 hover:text-blue-500 transition-colors"
        >
          <span className="text-sm font-medium">+ Add Card</span>
        </div>
      )}
    </div>
  );
};

export default Footer;
