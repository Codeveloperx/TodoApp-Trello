import { useRef, useState } from "react";
import { FormWrapper } from "../Common/Form/FormWrapper";
import { TaskActions } from "./TaskActions";
import { TaskHeader } from "./TaskHeader";
import { TaskFooter } from "./TaskFooter";
import fields from "@/config/forms/updateTask.json";
import Modal from "../Common/Modal/Modal";
import {
  KEY_DESCRIPTION,
  KEY_ID,
  KEY_PRIORITY,
  KEY_TASK,
} from "@/constants/constant";
import type { Fields, FormHandle, Task } from "@/types/types";

type PropsType = {
  values: Task;
  onUpdate: (data: Task) => void;
};

const TaskCard = (props: PropsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formRef = useRef<FormHandle>(null);

  const formValues: Record<string, unknown> = {
    [KEY_ID]: props.values.id,
    [KEY_TASK]: props.values.task,
    [KEY_DESCRIPTION]: props.values.description,
    [KEY_PRIORITY]: props.values.priority,
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    const form = formRef.current;
    const formValues = form?.get() as Task | null;

    if (!formValues) return;

    props.onUpdate({ ...props.values, ...formValues });

    form?.clear();
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (isChecked: boolean) => {
    props.onUpdate({
      ...props.values,
      status: isChecked,
    });
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 group">
      <TaskHeader
        task={props.values.task}
        checked={props.values.status}
        onToggle={handleCheckboxChange}
      />

      <h3 className="text-sm text-gray-400 mt-1 overflow-hidden text-ellipsis line-clamp-2">
        {props.values.description}
      </h3>

      {!props.values.status && (
        <TaskActions
          visible={!props.values.status}
          onEdit={() => setIsModalOpen(true)}
        />
      )}

      <TaskFooter priority={props.values.priority} />

      {isModalOpen && (
        <Modal onClose={handleCancel} onConfirm={handleSave}>
          <FormWrapper
            ref={formRef}
            fields={fields as Fields[]}
            data={formValues}
          />
        </Modal>
      )}
    </div>
  );
};

export default TaskCard;
