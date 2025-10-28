import { useBoardActions, useTaskDnD } from "@/hooks";
import { TaskContainer, AddTask } from "../Task";
import ListHeader from "./ListHeader";
import type { DragAndDropTypes, List } from "@/types/types";

type PropsType = {
  list: List;
  isCollapsed: boolean;
  isListDragging: boolean;
  dndState: DragAndDropTypes;
  onCollapse: () => void;
  onListDragStart: (e: React.DragEvent) => void;
};

const ListExpand = (props: PropsType) => {
  const { list, dndState } = props;
  const { addTask, moveTask, updateTask } = useBoardActions();

  const dnd = useTaskDnD({ list, dndState, moveTask });

  return (
    <>
      <ListHeader
        values={props.list}
        onCollapse={props.onCollapse}
        isCollapsed={props.isCollapsed}
        onListDragStart={props.onListDragStart}
        isListDragging={props.isListDragging}
      />
      <div
        className="p-4 flex flex-col gap-4"
        onDragOver={(e) => dnd.handleDragOver(e)}
        onDrop={(e) => dnd.handleDrop(e)}
        onDragEnter={() => dnd.handleDragEnter()}
      >
        <TaskContainer
          listId={props.list.id}
          tasks={dnd.previewTasks}
          dragData={dnd.dragData}
          onUpdateTask={updateTask}
          onDragStart={dnd.onDragStart}
          onTaskDragEnter={dnd.handleTaskDragEnter}
          showDropzoneAtIndex={dnd.showDropzoneAtIndex}
          isDraggedTaskAtIndex={dnd.isDraggedTaskAtIndex}
          isTaskBeingDragged={dnd.isTaskBeingDragged}
          showDropzoneAtEnd={dnd.showDropzoneAtEnd}
        />
        <AddTask idList={props.list.id} onAddTask={addTask} />
      </div>
    </>
  );
};

export default ListExpand;
