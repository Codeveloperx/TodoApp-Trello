import type { List } from "../../types/types";
import Options from "./Options";

type PropsType = {
  values: List;
  onAddList?: () => void;
  onCollapse?: () => void;
  isCollapsed: boolean;
};

const Header = (props: PropsType) => {
  return (
    <>
      <div className="flex items-center justify-between px-4 pt-4">
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
            <Options
              isCollapsed={props.isCollapsed}
              onAddList={props.onAddList}
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

export default Header;
