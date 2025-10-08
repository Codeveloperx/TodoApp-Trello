import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

type PropsType = {
  children: React.ReactNode;
};

const Layout = (props: PropsType) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 bg-gray-50 overflow-x-auto overflow-y-auto p-6">
          <div className="min-w-max">{props.children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
