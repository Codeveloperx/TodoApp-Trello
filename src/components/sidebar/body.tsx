import { Home, List, BarChart3, Settings } from "lucide-react";

const Body = () => {
  return (
    <aside className="bg-white shadow-md h-screen w-16 flex flex-col items-center py-4 space-y-6">
      <button className="p-2 rounded hover:bg-gray-100">
        <Home className="w-6 h-6 text-gray-600" />
      </button>
      <button className="p-2 rounded hover:bg-gray-100">
        <List className="w-6 h-6 text-gray-600" />
      </button>
      <button className="p-2 rounded hover:bg-gray-100">
        <BarChart3 className="w-6 h-6 text-gray-600" />
      </button>
      <button className="p-2 rounded hover:bg-gray-100 mt-auto">
        <Settings className="w-6 h-6 text-gray-600" />
      </button>
    </aside>
  );
};

export default Body;
