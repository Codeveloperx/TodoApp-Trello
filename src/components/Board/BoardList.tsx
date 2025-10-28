import ListContainer from "./List/ListContainer";
import type { List, DragAndDropTypes } from "@/types/types";

interface BoardListProps {
  list: List;
  previewIndex: number;
  originalIndex: number;
  isDragging: boolean;
  onDragEnter: (listId: string, index: number) => (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onListDragStart: (
    listId: string,
    index: number
  ) => (e: React.DragEvent) => void;
  dndState: DragAndDropTypes;
}

export const BoardList = (props: BoardListProps) => {
  //prettier-ignore
  const { 
    list, 
    isDragging, 
    originalIndex,
    previewIndex,
    onListDragStart,
  } = props;

  const dragging = isDragging
    ? "opacity-50 scale-95 rotate-3"
    : "opacity-100 scale-100 rotate-0";

  return (
    <div
      onDragEnter={props.onDragEnter(list.id, previewIndex)}
      onDragOver={props.onDragOver}
      className={`transition-all duration-200 ease-out ${dragging}`}
    >
      <ListContainer
        list={props.list}
        listIndex={props.originalIndex}
        isListDragging={props.isDragging}
        onListDragStart={onListDragStart(list.id, originalIndex)}
        dndState={props.dndState}
      />
    </div>
  );
};
