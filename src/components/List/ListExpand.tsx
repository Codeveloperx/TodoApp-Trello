import { usePreviewTask } from "@/hooks/usePreviewTask";
import TasksContainer from "../Task/TaskContainer";
import Footer from "./Footer";
import Header from "./Header";
import type { DragAndDropTypes, List, Task, TaskType } from "@/types/types";

type PropsType = {
  list: List;
  isCollapsed: boolean;
  onAddTask: (idList: string, data: TaskType) => void;
  onUpdateTask: (idList: string, data: Task) => void;
  onCollapse: () => void;
} & DragAndDropTypes;

const ListExpand = (props: PropsType) => {
  const {
    previewTasks,
    showDropzoneAtIndex,
    isDraggedTaskAtIndex,
    isTaskBeingDragged,
    showDropzoneAtEnd,
  } = usePreviewTask(props.list, props.dragData, props.dragOverData);

  const onUpdateTask = (data: Task) => props.onUpdateTask(props.list.id, data);
  const onAddTask = (data: TaskType) => props.onAddTask(props.list.id, data);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    props.onDragStart(props.list.id, task, e);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!e) return;
    e.preventDefault();
    if (props.dragOverData) {
      props.onDrop(props.list.id, props.dragOverData.index);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!e) return;
    e.preventDefault();
  };

  const handleDragEnter = () => {
    if (props.list.tasks.length === 0) {
      props.onDragEnter(props.list.id, 0);
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
        onDragEnter={handleDragEnter}
      >
        <TasksContainer
          tasks={previewTasks}
          listId={props.list.id}
          dragData={props.dragData}
          showDropzoneAtIndex={showDropzoneAtIndex}
          isDraggedTaskAtIndex={isDraggedTaskAtIndex}
          isTaskBeingDragged={isTaskBeingDragged}
          showDropzoneAtEnd={showDropzoneAtEnd}
          onDragStart={onDragStart}
          onDragEnter={props.onDragEnter}
          onUpdate={onUpdateTask}
        />

        <Footer onAddTask={onAddTask} />
      </div>
    </>
  );
};

export default ListExpand;
