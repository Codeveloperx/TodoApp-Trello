import { SquarePen } from "lucide-react";

type PropsType = {
  onEdit: () => void;
  visible: boolean;
};

export const TaskActions = ({ onEdit, visible }: PropsType) => {
  if (!visible) return null;
  return (
    <div className="absolute top-2 right-2 flex gap-2">
      <button
        type="button"
        onClick={onEdit}
        title="Editar tarea"
        className="transition-opacity opacity-0 group-hover:opacity-100"
      >
        <SquarePen className="h-4 w-4 text-gray-500 hover:text-black" />
      </button>
    </div>
  );
};
