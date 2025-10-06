import { useState } from "react";
import ListCollapsed from "./ListCollapsed";
import ListExpand from "./ListExpand";
import type { DragAndDropTypes, List, Task, TaskType } from "../../types/types";

type PropsType = {
  list: List;
  onAddTask: (idList: string, data: TaskType) => void;
  onUpdateTask: (idList: string, data: Task) => void;
} & DragAndDropTypes;

const ListWrapper = (props: PropsType) => {
  const [collapsed, setCollapsed] = useState(false);

  const borderColor = collapsed ? props.list.color : "";
  const customStyle = collapsed
    ? "w-10 h-44 bg-gray-100 border-2 border-solid"
    : "w-64 bg-gray-100";

  return (
    <div
      style={{ borderColor }}
      className={`rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${customStyle}`}
      onDragEnd={props.onDragEnd}
    >
      {!collapsed ? (
        <ListExpand
          list={props.list}
          isCollapsed={collapsed}
          onCollapse={() => setCollapsed(true)}
          onAddTask={props.onAddTask}
          onUpdateTask={props.onUpdateTask}
          onDragStart={props.onDragStart}
          onDragEnter={props.onDragEnter}
          onDragEnd={props.onDragEnd}
          dragData={props.dragData}
          dragOverData={props.dragOverData}
          onDrop={props.onDrop}
        />
      ) : (
        <ListCollapsed
          values={props.list}
          onExpand={() => setCollapsed(false)}
        />
      )}
    </div>
  );
};

export default ListWrapper;
