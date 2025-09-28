import { Header } from "../../components/Header/index";
import { Sidebar } from "../../components/SideBar/index";

type PropsType = {
  children: React.ReactNode;
};

const Body = (props: PropsType) => {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-x-auto p-4">{props.children}</main>
      </div>
    </div>
  );
};

export default Body;
