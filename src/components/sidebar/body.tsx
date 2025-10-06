import { BarChart3, Home, List, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="flex flex-col items-center w-16 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Logo</h2>
      <nav className="flex flex-col flex-1 justify-between items-center py-4 space-y-6">
        <div className="flex flex-col gap-6">
          <button className="p-2 rounded hover:bg-gray-100">
            <Home className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 rounded hover:bg-gray-100">
            <List className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 rounded hover:bg-gray-100">
            <BarChart3 className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div>
          <button className="p-2 rounded hover:bg-gray-100 mt-auto">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </nav>
    </aside>
  );
}
