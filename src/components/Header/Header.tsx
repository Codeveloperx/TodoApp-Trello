import { useBoard, useBoardActions } from "@/hooks";
import { Plus } from "lucide-react";
import BoardSelector from "../Board/BoardSelector";

const Header = () => {
  const { state, currentBoard } = useBoard();
  const { createBoard, switchBoard } = useBoardActions();

  return (
    <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <BoardSelector
        currentBoard={currentBoard}
        boards={state.boards}
        onSwitchBoard={switchBoard}
      />

      <div className="flex items-center gap-4">
        <button
          className="flex items-center space-x-1 cursor-pointer bg-indigo-600 text-white px-3 py-1 rounded shadow hover:bg-indigo-700"
          onClick={() => createBoard("New Board 2")}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">New Board</span>
        </button>
        <div className="w-8 h-8 bg-gray-300 rounded-full">
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
