import { Shrink, Maximize2, Ellipsis } from "lucide-react";

type PropsType = {
  onAddList?: () => void;
  onCollapsed?: () => void;
  isCollapsed: boolean;
};

const Options = (props: PropsType) => {
  const style =
    "text-gray-500 hover:text-black focus:outline-none cursor-pointer hover:bg-gray-200 p-1 rounded-lg";

  return (
    <div className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-600">
      <button
        className={style}
        onClick={props.onCollapsed}
        title="Contraer columnas"
      >
        {!props.isCollapsed ? (
          <Shrink className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
      </button>

      {!props.isCollapsed && (
        <button className={style} title="more">
          <Ellipsis className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Options;
