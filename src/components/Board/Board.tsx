import { useBoard, useBoardActions, useDragAndDrop } from "@/hooks";
import AddList from "./List/AddList";
import ListContainer from "./List/ListContainer";
import type { DragTaskData } from "@/types/types";

const Board = () => {
  const { state } = useBoard();
  const dndState = useDragAndDrop<DragTaskData>();
  const { addList, addTask, updateTask, moveTask } = useBoardActions();

  return (
    <div className="flex gap-4 overflow-x-auto">
      {state.map((it) => (
        <div key={it.id}>
          <ListContainer
            list={it}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            onMoveTask={moveTask}
            dndState={dndState}
          />
        </div>
      ))}
      <AddList ListSize={state.length} onAddList={addList} />
    </div>
  );
};

export default Board;
