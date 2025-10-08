import type { List } from "../../types/types";
import Options from "./Options";

type PropsTypes = {
  values: List;
  onExpand: () => void;
};

const ListCollapsed = (props: PropsTypes) => {
  return (
    <div className="flex flex-col justify-around items-center h-full pb-8">
      <Options isCollapsed onCollapsed={props.onExpand} />
      <div className="flex items-center justify-center gap-2 rotate-90">
        <span
          title={props.values.title}
          className="uppercase truncate max-w-[80px] block font-medium text-xs ml-2"
        >
          {props.values.title}
        </span>
        <span className="bg-gray-200 text-gray-600 font-medium text-xs px-2 py-1 rounded-full flex-shrink-0">
          {props.values.tasks.length}
        </span>
      </div>
    </div>
  );
};

export default ListCollapsed;
