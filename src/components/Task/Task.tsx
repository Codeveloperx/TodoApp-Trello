import { useRef, useState } from "react";
import { FormWrapper } from "../Form/FormWrapper";
import fields from "../Form/fields.json";
import {
  CalendarDaysIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import {
  KEY_DESCRIPTION,
  KEY_ID,
  KEY_NO_PRIORITY,
  KEY_PRIORITY,
  KEY_TASK,
} from "../../constants/constant";
import type { Fields, FormHandle, Task } from "../../types/types";
import { getPriorityColor } from "../../utils/getPriorityColor";
import Modal from "../Modal/Modal";

type PropsType = {
  values: Task;
  onUpdate: (data: Task) => void;
};

const TaskCard = (props: PropsType) => {
  const [checked, setChecked] = useState(props.values.status);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formRef = useRef<FormHandle>(null);

  const priority = props.values.priority || KEY_NO_PRIORITY;
  const formValues: Record<string, unknown> = {
    [KEY_ID]: props.values.id,
    [KEY_TASK]: props.values.task,
    [KEY_DESCRIPTION]: props.values.description,
    [KEY_PRIORITY]: props.values.priority,
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleSave = () => {
    const form = formRef.current;
    const values = form?.get() as Task | null;

    if (!values) return;

    const updateTask: Task = {
      id: values.id,
      task: values.task,
      description: values.description,
      priority: values.priority,
    };

    props.onUpdate(updateTask);

    form?.clear();
    setIsModalOpen(false);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 mb-4 group">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={`transition-opacity ${
            checked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />
        <h3
          className={`text-sm font-semibold transition-all duration-300 break-words truncate ${
            checked ? "line-through text-gray-400" : ""
          } ${!checked ? "group-hover:ml-0 ml-[-20px]" : ""}`}
        >
          {props.values.task}
        </h3>
      </div>

      <h3 className="text-sm text-gray-400 mt-1 overflow-hidden text-ellipsis line-clamp-2">
        {props.values.description}
      </h3>

      {!checked && (
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="transition-opacity opacity-0 group-hover:opacity-100"
          >
            <PencilSquareIcon className="h-4 w-4 text-gray-500 hover:text-black" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
          <span className="text-xs text-gray-500 font-semibold">Sep 21</span>
        </div>
        <span
          className={`inline-block text-xs font-semibold px-2 py-1 rounded-md ${getPriorityColor(
            priority
          )}`}
        >
          {priority}
        </span>
      </div>

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
