import { useBoardActions, useOpen } from "@/hooks";
import ListCollapsed from "./ListCollapsed";
import ListExpand from "./ListExpand";
import type { DragAndDropTypes, List } from "@/types/types";

type PropsType = {
  list: List;
  listIndex: number;
  isListDragging: boolean;
  dndState: DragAndDropTypes;
  onListDragStart: (e: React.DragEvent) => void;
};

const ListContainer = (props: PropsType) => {
  const { isOpen, onToggle } = useOpen(props.list.collapse);
  const { toggleListCollapse } = useBoardActions();

  const customStyle = isOpen
    ? "w-10 h-44 bg-gray-100 border-2 border-solid"
    : "w-64 bg-gray-100";

  const handleToggle = () => {
    toggleListCollapse(props.list.id);
    onToggle();
  };

  return (
    <div
      style={{ borderColor: props.list?.color ?? "" }}
      className={`rounded-lg overflow-hidden transition-all duration-200 ${customStyle} shadow-md`}
    >
      {isOpen ? (
        <ListCollapsed
          values={props.list}
          onExpand={handleToggle}
          isCollapsed={isOpen}
        />
      ) : (
        <ListExpand
          list={props.list}
          isCollapsed={isOpen}
          isListDragging={props.isListDragging}
          onCollapse={handleToggle}
          onListDragStart={props.onListDragStart}
          dndState={props.dndState}
        />
      )}
    </div>
  );
};

export default ListContainer;
