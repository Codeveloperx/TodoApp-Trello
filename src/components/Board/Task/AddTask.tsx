import { AddItem } from "@/components/Common/Item/AddItem";
import formAddTask from "@/config/forms/addTask.json";
import type { Fields, TaskType } from "@/types/types";

type PropsType = {
  idList: string;
  label?: string;
  onAddTask: (idList: string, task: TaskType) => void;
};

const AddTask = (props: PropsType) => {
  const handleAddTask = (values: Record<string, unknown>) => {
    if (!values) return;

    const data = { ...values, status: false } as TaskType;
    props.onAddTask(props.idList, data);
  };

  return (
    <div className="mt-2">
      <AddItem
        name="task"
        form={formAddTask as Fields[]}
        label={props.label || "Add Task"}
        onAddItem={handleAddTask}
        accept="Add Task"
        cancel="Cancel"
      />
    </div>
  );
};

export default AddTask;
