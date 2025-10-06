import type { List, Task } from "../../types/types";
import type { DragData, DragOver } from "../../hooks/useDragAndDrop";
import TaskWrapper from "./TaskWrapper";
import DropZone from "./DropZone";

type TaskListProps = {
  list: List;
  dragData: DragData;
  dragOver: DragOver;
  onDragEnter: (listId: string, taskIndex: number) => void;
  onDragStart: (
    fromList: string,
    fromIndex: number,
    idTask: string,
    e: React.DragEvent
  ) => void;
  onDrop: (toList: string, toIndex: number) => void;
  onUpdateTask: (data: Task) => void;
};

const TaskList = ({
  list,
  dragData,
  dragOver,
  onDragEnter,
  onDragStart,
  onDrop,
  onUpdateTask,
}: TaskListProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnterList = () => {
    if (list.tasks.length === 0) onDragEnter(list.id, 0);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (list.tasks.length === 0) onDrop(list.id, 0);
  };

  return (
    <div
      className="p-4 flex flex-col bg-amber-300"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnterList}
      onDrop={handleDrop}
    >
      {list.tasks
        .sort((a, b) => a.position - b.position)
        .map((task, index) => {
          const validate =
            dragOver?.listId === list.id && dragOver.taskIndex === index;
          const isDragOver = dragData !== null && validate;

          return (
            <TaskWrapper
              key={task.id}
              task={task}
              index={index}
              listId={list.id}
              isDragOver={isDragOver}
              dragData={dragData}
              onDragEnter={onDragEnter}
              onDragStart={onDragStart}
              onUpdateTask={onUpdateTask}
            />
          );
        })}

      {dragData &&
        dragOver?.listId === list.id &&
        dragOver.taskIndex === list.tasks.length && <DropZone position="end" />}
    </div>
  );
};

export default TaskList;
