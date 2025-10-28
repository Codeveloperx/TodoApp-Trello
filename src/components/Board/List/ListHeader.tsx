import type { List } from "@/types/types";
import ListOptions from "./ListOptions";
import { GripVertical } from "lucide-react";

type PropsType = {
  values: List;
  onCollapse: () => void;
  isCollapsed: boolean;
  onListDragStart: (e: React.DragEvent) => void;
  isListDragging?: boolean;
};

const ListHeader = (props: PropsType) => {
  return (
    <>
      <div className="flex items-center gap-1 justify-between px-4 pt-4">
        {props.onListDragStart && (
          <div
            draggable
            onDragStart={(e) => {
              props.onListDragStart(e);
            }}
            className={`
            cursor-grab active:cursor-grabbing
            text-gray-400 hover:text-gray-600
            transition-colors
            ${props.isListDragging ? "opacity-50" : "opacity-100"}
          `}
          >
            <GripVertical size={20} />
          </div>
        )}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <h2
              className="text-sm font-semibold text-gray-700 uppercase break-words truncate min-w-0"
              title={props.values.title}
            >
              {props.values.title}
            </h2>
            <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
              {props.values.tasks.length}
            </span>
          </div>

          <div className="ml-4 flex-shrink-0">
            <ListOptions
              isCollapsed={props.isCollapsed}
              onCollapsed={props.onCollapse}
            />
          </div>
        </div>
      </div>

      <div
        style={{ borderColor: props.values.color }}
        className="border-b-2 mx-4 mt-2 mb-4"
      ></div>
    </>
  );
};

export default ListHeader;
