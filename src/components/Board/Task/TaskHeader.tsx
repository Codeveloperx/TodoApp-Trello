import { Checkbox } from "@/components/Common/Form/Fields/Checkbox";

type Props = {
  task: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
};

export const TaskHeader = ({ task, checked, onToggle }: Props) => (
  <div className="flex items-center gap-2">
    <Checkbox
      id={task}
      value={checked}
      onChange={onToggle}
      className={`transition-opacity cursor-pointer ${
        checked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    />
    <h3
      className={`text-sm font-semibold transition-all duration-300 break-words truncate ${
        checked ? "line-through text-gray-400" : ""
      } ${!checked ? "group-hover:ml-0 ml-[-20px]" : ""}`}
    >
      {task}
    </h3>
  </div>
);
