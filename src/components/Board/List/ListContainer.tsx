import { useOpen } from "@/hooks";
import ListCollapsed from "./ListCollapsed";
import ListExpand from "./ListExpand";
import type { ActionsTask, DragAndDropTypes, List } from "@/types/types";

type PropsType = {
  list: List;
  dndState: DragAndDropTypes;
} & ActionsTask;

const ListContainer = (props: PropsType) => {
  const { isOpen, onOpen, onClose } = useOpen();

  const customStyle = isOpen
    ? "w-10 h-44 bg-gray-100 border-2 border-solid"
    : "w-64 bg-gray-100";

  return (
    <div
      style={{ borderColor: props.list.color ?? "" }}
      className={`rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${customStyle}`}
      onDragEnd={props.dndState.onDragEnd}
    >
      {!isOpen ? (
        <ListExpand
          list={props.list}
          isCollapsed={isOpen}
          onCollapse={onOpen}
          onAddTask={props.onAddTask}
          onUpdateTask={props.onUpdateTask}
          onMoveTask={props.onMoveTask}
          dndState={props.dndState}
        />
      ) : (
        <ListCollapsed values={props.list} onExpand={onClose} />
      )}
    </div>
  );
};

export default ListContainer;
