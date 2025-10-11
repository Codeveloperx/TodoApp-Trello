import DropZone from "@/components/Common/DropZone/DropZone";
import type { DragTaskData, Task } from "@/types/types";

type PropsTypes = {
  children?: React.ReactNode;
  listId: string;
  task: Task;
  isDragging: boolean;
  showDropzone: boolean;
  isHidden: boolean;
  onDragStart: (e: React.DragEvent, data: DragTaskData) => void;
  onDragEnter: () => void;
};

const TaskDraggable = (props: PropsTypes) => {
  const { listId, task } = props;

  const dragClasses = props.isDragging
    ? "opacity-80 scale-105 rotate-2"
    : "opacity-100 scale-100 rotate-0";

  return (
    <div className="flex flex-col" onDragEnter={props.onDragEnter}>
      {props.showDropzone && <DropZone.Start />}

      {!props.isHidden && (
        <div
          draggable
          onDragStart={(e) =>
            props.onDragStart(e, {
              taskId: task.id,
              index: task.position,
              listId: listId,
            })
          }
          className={`
            cursor-grab
            active:cursor-grabbing
            transition-all
            duration-200
            ease-in-out
            ${dragClasses}
          `}
        >
          {props.children}
        </div>
      )}
    </div>
  );
};

export default TaskDraggable;
