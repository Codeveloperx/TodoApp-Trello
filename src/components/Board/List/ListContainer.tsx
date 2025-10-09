import { useState } from "react";
import ListCollapsed from "./ListCollapsed";
import ListExpand from "./ListExpand";
import type { DragAndDropTypes, List, Task, TaskType } from "@/types/types";
import type { DragTaskData } from "../Board";

// type PropsType = {
//   list: List;
//   onAddTask: (idList: string, data: TaskType) => void;
//   onUpdateTask: (idList: string, data: Task) => void;
//   //Event Drag and Drop
//   onDragStart: (data: TaskWithList, e: React.DragEvent) => void;
//   onDragEnter: (data: EnterDrag) => void;
//   onDragEnd: () => void;
//   dragData: DragData;
//   dragOverData: EnterDrag | null;
// };
//  & DragAndDropTypes;

type PropsType = {
  list: List;
  onAddTask: (idList: string, data: TaskType) => void;
  onUpdateTask: (idList: string, data: Task) => void;
  // Drag and Drop con tipos unificados
  onDragStart: (data: DragTaskData, e: React.DragEvent) => void;
  onDragEnter: (data: DragTaskData) => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent, drag: DragTaskData, over: DragTaskData) => void;
  dragData: DragTaskData | null;
  dragOver: DragTaskData | null;
};

const ListContainer = (props: PropsType) => {
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
          // onDragEnd={props.onDragEnd}
          dragData={props.dragData}
          dragOverData={props.dragOver}
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

export default ListContainer;
