import { useTaskDnD } from "@/hooks";
import { TaskContainer, AddTask } from "../Task";
import ListHeader from "./ListHeader";
import type { ActionsTask, DragAndDropTypes, List } from "@/types/types";

type PropsType = {
  list: List;
  isCollapsed: boolean;
  dndState: DragAndDropTypes;
  onCollapse: () => void;
} & ActionsTask;

const ListExpand = (props: PropsType) => {
  const { list, dndState, onMoveTask } = props;
  const dnd = useTaskDnD({ list, dndState, onMoveTask });

  return (
    <>
      <ListHeader
        values={props.list}
        onCollapse={props.onCollapse}
        isCollapsed={props.isCollapsed}
      />
      <div
        className="p-4 flex flex-col gap-4"
        onDragOver={dnd.handleDragOver}
        onDrop={dnd.handleDrop}
        onDragEnter={dnd.handleDragEnter}
      >
        <TaskContainer
          listId={props.list.id}
          tasks={dnd.previewTasks}
          dragData={dnd.dragData}
          onUpdateTask={props.onUpdateTask}
          onDragStart={dnd.onDragStart}
          onTaskDragEnter={dnd.handleTaskDragEnter}
          showDropzoneAtIndex={dnd.showDropzoneAtIndex}
          isDraggedTaskAtIndex={dnd.isDraggedTaskAtIndex}
          isTaskBeingDragged={dnd.isTaskBeingDragged}
          showDropzoneAtEnd={dnd.showDropzoneAtEnd}
        />
        <AddTask idList={props.list.id} onAddTask={props.onAddTask} />
      </div>
    </>
  );
};

export default ListExpand;
