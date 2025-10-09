import DraggableTask from "./DraggableTask";
import DropZone from "@/components/Common/DropZone/DropZone";
import TaskCard from "./Task";
import type { Task, DragData, TaskWithList, EnterDrag } from "@/types/types";
import type { DragTaskData } from "../Board";

type PropsTypes = {
  tasks: Task[];
  listId: string;
  dragData: DragTaskData | null;
  showDropzoneAtIndex: (index: number) => boolean;
  isDraggedTaskAtIndex: (index: number) => boolean;
  isTaskBeingDragged: (taskId: string) => boolean;
  showDropzoneAtEnd: () => boolean;
  onDragStart: (data: DragTaskData, e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (data: DragTaskData) => void;
  onUpdateTask: (listId: string, data: Task) => void;
};

const TasksContainer = (props: PropsTypes) => {
  const handleDragEnter = (task: Task) => {
    if (!props.dragData || task.id === props.dragData.taskId) return;
    props.onDragEnter(
      {
        taskId: task.id,
        index: task.position,
        listId: props.listId,
        // id: task.id,
        // index: task.position,
        // listId: props.listId,
        // type: "task",
      }
      // { listId: props.listId, index }
    );
  };

  return (
    <>
      {props.tasks.map((task, index) => (
        <DraggableTask
          key={task.id}
          task={task}
          listId={props.listId}
          isDragging={props.isTaskBeingDragged(task.id)}
          showDropzone={props.showDropzoneAtIndex(index)}
          isHidden={props.isDraggedTaskAtIndex(index)}
          onDragStart={props.onDragStart}
          onDragEnter={() => handleDragEnter(task)}
        >
          <TaskCard
            listId={props.listId}
            values={task}
            onUpdateTask={props.onUpdateTask}
          />
        </DraggableTask>
      ))}

      {props.showDropzoneAtEnd() && <DropZone.End />}
    </>
  );
};

export default TasksContainer;
