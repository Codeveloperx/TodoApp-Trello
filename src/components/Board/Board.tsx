import { useBoard, useBoardActions, useDnD } from "@/hooks";
import AddList from "./List/AddList";
import ListContainer from "./List/ListContainer";

export type DragTaskData = {
  listId: string;
  taskId?: string; // ✅ Opcional (solo en drag)
  index: number;
};

const Board = () => {
  const { state } = useBoard();
  const { addList, addTask, updateTask, moveTask } = useBoardActions();
  const { dragStart, dragEnter, dragEnd, onDrop, dragData, dragOver } =
    useDnD<DragTaskData>();

  // const handleOnDrop = () => {
  //   if (!dragData) return;

  //   onDrop((drag, over) => {
  //     if (!drag || !over) return;
  //     moveTask(
  //       drag.containerId,
  //       over.containerId,
  //       drag.id,
  //       drag.index,
  //       over.index ??
  //         state.find((l) => l.id === over.containerId)?.tasks.length ??
  //         0
  //     );
  //   });
  // };

  const handleDrop = (e: React.DragEvent) => {
    // if (drag.type === "task" && over.type === "task") {
    onDrop(e, (drag, over) => {
      if (drag.taskId) {
        moveTask(
          drag.listId,
          over.listId,
          drag.taskId,
          drag.index,
          over.index ??
            state.find((l) => l.id === over.listId)?.tasks.length ??
            0
        );
      }
    });
  };

  return (
    <div className="flex gap-4 overflow-x-auto">
      {state.map((it) => (
        <div key={it.id}>
          <ListContainer
            list={it}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            dragData={dragData}
            dragOver={dragOver}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            onDragEnter={dragEnter}
            onDrop={handleDrop}
          />
        </div>
      ))}

      <AddList ListSize={state.length} onAddList={addList} />
    </div>
  );
};

export default Board;
