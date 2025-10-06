import TaskCard from "../Task/Task";
import type { Task } from "../../types/types";
import type { DragData } from "../../hooks/useDragAndDrop";
import DropZone from "./DropZone";

type TaskWrapperProps = {
  task: Task;
  index: number;
  listId: string;
  isDragOver: boolean;
  dragData: DragData;
  onDragEnter: (listId: string, taskIndex: number) => void;
  onDragStart: (
    fromList: string,
    fromIndex: number,
    idTask: string,
    e: React.DragEvent
  ) => void;
  onUpdateTask: (task: Task) => void;
};

const TaskWrapper = (props: TaskWrapperProps) => {
  const handleDragEnter = () => {
    if (props.dragData) props.onDragEnter(props.listId, props.index);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    props.onDragStart(props.listId, props.index, props.task.id, e);
  };

  return (
    <div className="flex flex-col" onDragEnter={handleDragEnter}>
      {props.isDragOver && <DropZone />}
      <div draggable onDragStart={handleDragStart}>
        <TaskCard values={props.task} onUpdate={props.onUpdateTask} />
      </div>
    </div>
  );
};

export default TaskWrapper;
