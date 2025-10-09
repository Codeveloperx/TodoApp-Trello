import DropZone from "@/components/Common/DropZone/DropZone";
import type { Task, TaskWithList } from "@/types/types";
import type { DragTaskData } from "../Board";

type PropsTypes = {
  children?: React.ReactNode;
  listId: string;
  task: Task;
  isDragging: boolean;
  showDropzone: boolean;
  isHidden: boolean;
  onDragStart: (data: DragTaskData, e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: () => void;
};

const DraggableTask = (props: PropsTypes) => {
  //prettier-ignore
  const {
    listId,
    task,
  } = props;

  const dragClasses = props.isDragging
    ? "opacity-40 scale-105 rotate-2"
    : "opacity-100 scale-100 rotate-0";

  return (
    <div className="flex flex-col" onDragEnter={props.onDragEnter}>
      {props.showDropzone && <DropZone.Start />}

      {!props.isHidden && (
        <div
          draggable
          onDragStart={(e) =>
            props.onDragStart(
              {
                taskId: task.id,
                index: task.position,
                listId: listId,
                // id: task.id,
                // listId: listId,
                // index: task.position,
                // type: "task",
              },
              // { ...task, listId }
              e
            )
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

export default DraggableTask;
