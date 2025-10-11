import TaskDraggable from "./TaskDraggable";
import DropZone from "@/components/Common/DropZone/DropZone";
import TaskCard from "./TaskCard";
import type { DragTaskData, Task } from "@/types/types";

type PropsTypes = {
  tasks: Task[];
  listId: string;
  dragData: DragTaskData | null;
  showDropzoneAtIndex: (index: number) => boolean;
  isDraggedTaskAtIndex: (index: number) => boolean;
  isTaskBeingDragged: (taskId: string) => boolean;
  showDropzoneAtEnd: () => boolean;
  onDragStart: (e: React.DragEvent, data: DragTaskData) => void;
  onTaskDragEnter: (taskId: string, index: number) => void;
  onUpdateTask: (listId: string, data: Task) => void;
};

export const TaskContainer = (props: PropsTypes) => {
  return (
    <>
      {props.tasks.map((task, index) => (
        <TaskDraggable
          key={task.id}
          task={task}
          listId={props.listId}
          isDragging={props.isTaskBeingDragged(task.id)}
          showDropzone={props.showDropzoneAtIndex(index)}
          isHidden={props.isDraggedTaskAtIndex(index)}
          onDragStart={props.onDragStart}
          onDragEnter={() => props.onTaskDragEnter(task.id, index)}
        >
          <TaskCard
            listId={props.listId}
            values={task}
            onUpdateTask={props.onUpdateTask}
          />
        </TaskDraggable>
      ))}

      {props.showDropzoneAtEnd() && <DropZone.End />}
    </>
  );
};
