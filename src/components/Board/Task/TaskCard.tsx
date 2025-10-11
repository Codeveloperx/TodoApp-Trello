import { FormWrapper } from "@/components/Common/Form/FormWrapper";
import { TaskAction, TaskFooter, TaskHeader } from ".";
import { useOpen } from "@/hooks";
import { useRef } from "react";
import fields from "@/config/forms/updateTask.json";
import Modal from "@/components/Common/Modal/Modal";
import {
  KEY_DESCRIPTION,
  KEY_ID,
  KEY_PRIORITY,
  KEY_TASK,
} from "@/constants/constant";
import type { Fields, FormHandle, Task } from "@/types/types";

type PropsType = {
  listId: string;
  values: Task;
  onUpdateTask: (listId: string, data: Task) => void;
};

const TaskCard = (props: PropsType) => {
  const { isOpen, onOpen, onClose } = useOpen();

  const formRef = useRef<FormHandle>(null);

  const formValues: Record<string, unknown> = {
    [KEY_ID]: props.values.id,
    [KEY_TASK]: props.values.task,
    [KEY_DESCRIPTION]: props.values.description,
    [KEY_PRIORITY]: props.values.priority,
  };

  const handleUpdate = () => {
    const form = formRef.current;
    const formValues = form?.get() as Task | null;

    if (!formValues) return;

    props.onUpdateTask(props.listId, { ...props.values, ...formValues });

    form?.clear();
    onClose();
  };

  const handleCheckboxChange = (isChecked: boolean) => {
    props.onUpdateTask(props.listId, {
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
        <TaskAction visible={!props.values.status} onEdit={onOpen} />
      )}

      <TaskFooter priority={props.values.priority} />

      {isOpen && (
        <Modal onClose={onClose} onConfirm={handleUpdate}>
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
