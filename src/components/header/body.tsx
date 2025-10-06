import { Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-800">Todo App</h1>
      <div className="flex items-center gap-4">
        <button className="flex items-center space-x-1 cursor-pointer bg-indigo-600 text-white px-3 py-1 rounded shadow hover:bg-indigo-700">
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
}
