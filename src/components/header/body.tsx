import { Plus, Bell } from "lucide-react";

const Body = () => {
  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold text-gray-700">Todo App</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 bg-indigo-600 text-white px-3 py-1 rounded shadow hover:bg-indigo-700">
          <Plus className="w-4 h-4" />
          <span className="text-sm">New Board</span>
        </button>
        <button className="relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </header>
  );
};

export default Body;
