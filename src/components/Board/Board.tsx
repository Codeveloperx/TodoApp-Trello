import { BoardList } from "./BoardList";
import { useBoard, useBoardActions } from "@/hooks";
import { useBoardDnD } from "@/hooks/Board/useBoardDnD";
import AddList from "../Board/List/AddList";

const Board = () => {
  const { currentBoard } = useBoard();
  const lists = currentBoard?.lists || [];

  const { addList, moveList } = useBoardActions();
  const boardDnD = useBoardDnD({ lists, moveList });

  return (
    <div
      className="flex gap-4 overflow-x-auto p-4"
      onDragEnd={boardDnD.handleDragEnd}
    >
      {boardDnD.previewLists.map((list, index) => (
        <BoardList
          key={list.id}
          list={list}
          previewIndex={index}
          originalIndex={boardDnD.getOriginalIndex(list.id)}
          isDragging={boardDnD.isListBeingDragged(list.id)}
          onDragEnter={boardDnD.handleListDragEnter}
          onDragOver={boardDnD.handleListDragOver}
          onListDragStart={boardDnD.handleListDragStart}
          dndState={boardDnD.dndState}
        />
      ))}

      <div
        onDragEnter={boardDnD.handleEndAreaDragEnter}
        onDragOver={boardDnD.handleListDragOver}
      >
        <AddList ListSize={lists.length} onAddList={addList} />
      </div>
    </div>
  );
};

export default Board;
