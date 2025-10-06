import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";

type PropsType = {
  children: React.ReactNode;
};

const Body = (props: PropsType) => {
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

export default Body;
