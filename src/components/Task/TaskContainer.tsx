import DraggableTask from "./DraggableTask";
import DropZone from "../Common/DropZone/DropZone";
import type { Task, DragData } from "@/types/types";

type PropsTypes = {
  tasks: Task[];
  listId: string;
  dragData: DragData | null;
  showDropzoneAtIndex: (index: number) => boolean;
  isDraggedTaskAtIndex: (index: number) => boolean;
  isTaskBeingDragged: (taskId: string) => boolean;
  showDropzoneAtEnd: () => boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
  onDragEnter: (listId: string, taskIndex: number) => void;
  onUpdate: (data: Task) => void;
};

const TasksContainer = (props: PropsTypes) => {
  const handleDragEnter = (task: Task, index: number) => {
    if (!props.dragData || task.id === props.dragData.id) return;
    props.onDragEnter(props.listId, index);
  };

  return (
    <>
      {props.tasks.map((task, index) => (
        <DraggableTask
          key={task.id}
          task={task}
          isDragging={props.isTaskBeingDragged(task.id)}
          showDropzone={props.showDropzoneAtIndex(index)}
          isHidden={props.isDraggedTaskAtIndex(index)}
          onDragStart={props.onDragStart}
          onDragEnter={() => handleDragEnter(task, index)}
          onUpdate={props.onUpdate}
        />
      ))}

      {props.showDropzoneAtEnd() && <DropZone.End />}
    </>
  );
};

export default TasksContainer;
