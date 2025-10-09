import { usePreviewTask } from "@/hooks/usePreviewTask";
import AddTask from "../Task/AddTask";
import Header from "./Header";
import TasksContainer from "../Task/TaskContainer";
import type {
  DragAndDropTypes,
  EnterDrag,
  List,
  Task,
  TaskType,
  TaskWithList,
} from "@/types/types";
import type React from "react";
import type { DragTaskData } from "../Board";

type PropsType = {
  list: List;
  isCollapsed: boolean;
  onAddTask: (idList: string, data: TaskType) => void;
  onUpdateTask: (idList: string, data: Task) => void;
  onCollapse: () => void;
  //Props Drag and Drop
  onDragStart: (data: DragTaskData, e: React.DragEvent) => void;
  onDragEnter: (data: DragTaskData) => void;
  dragData: DragTaskData | null;
  dragOverData: DragTaskData | null;
  onDrop: (e: React.DragEvent, drag: DragTaskData, over: DragTaskData) => void;
};
// & DragAndDropTypes;

const ListExpand = (props: PropsType) => {
  const {
    previewTasks,
    showDropzoneAtIndex,
    isDraggedTaskAtIndex,
    isTaskBeingDragged,
    showDropzoneAtEnd,
  } = usePreviewTask(props.list, props.dragData, props.dragOverData);

  const handleDrop = (e: React.DragEvent) => {
    if (!e) return;
    e.preventDefault();
    if (props.dragOverData && props.dragData) {
      props.onDrop(e, props.dragData, props.dragOverData);
      // props.onDrop(props.list.id, props.dragOverData.index);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!e) return;
    e.preventDefault();
  };

  const handleDragEnter = () => {
    if (props.list.tasks.length === 0) {
      props.onDragEnter({ listId: props.list.id, index: 0 });
    }
  };

  return (
    <>
      <Header
        values={props.list}
        onCollapse={props.onCollapse}
        isCollapsed={props.isCollapsed}
      />
      <div
        className="p-4 flex flex-col gap-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={() => props.onDragEnter}
      >
        <TasksContainer
          tasks={previewTasks}
          listId={props.list.id}
          dragData={props.dragData}
          showDropzoneAtIndex={showDropzoneAtIndex}
          isDraggedTaskAtIndex={isDraggedTaskAtIndex}
          isTaskBeingDragged={isTaskBeingDragged}
          showDropzoneAtEnd={showDropzoneAtEnd}
          onDragStart={props.onDragStart}
          onDragEnter={handleDragEnter}
          onUpdateTask={props.onUpdateTask}
        />

        <AddTask idList={props.list.id} onAddTask={props.onAddTask} />
      </div>
    </>
  );
};

export default ListExpand;
