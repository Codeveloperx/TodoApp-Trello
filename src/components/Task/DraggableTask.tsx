import DropZone from "../Common/DropZone/DropZone";
import TaskCard from "./Task";
import type { Task } from "@/types/types";

type PropsTypes = {
  task: Task;
  isDragging: boolean;
  showDropzone: boolean;
  isHidden: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
  onDragEnter: (e: React.DragEvent) => void;
  onUpdate: (data: Task) => void;
};

const DraggableTask = (props: PropsTypes) => {
  const dragClasses = props.isDragging
    ? "opacity-40 scale-105 rotate-2"
    : "opacity-100 scale-100 rotate-0";

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    props.onDragStart(e, props.task);
  };
  return (
    <div className="flex flex-col" onDragEnter={props.onDragEnter}>
      {props.showDropzone && <DropZone.Start />}

      {!props.isHidden && (
        <div
          draggable
          onDragStart={handleDragStart}
          className={`
            cursor-grab
            active:cursor-grabbing
            transition-all
            duration-200
            ease-in-out
            ${dragClasses}
          `}
        >
          <TaskCard values={props.task} onUpdate={props.onUpdate} />
        </div>
      )}
    </div>
  );
};

export default DraggableTask;
