import {
  ArrowsPointingInIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

type PropsType = {
  onAddList?: () => void;
  isCollapsed?: () => void;
};

const Options = (props: PropsType) => {
  const style =
    "text-gray-500 hover:text-black focus:outline-none cursor-pointer";

  return (
    <div className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-600">
      <button
        className={style}
        onClick={props.isCollapsed}
        title="Contraer columnas"
      >
        <ArrowsPointingInIcon className="h-4 w-4" />
      </button>

      <button className={style} title="more">
        <EllipsisHorizontalIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Options;
