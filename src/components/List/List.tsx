import { useState } from "react";
import TaskCard from "../Task/Task";
import Footer from "./Footer";
import Header from "./Header";
import type { List, Task, TaskType } from "../../types/types";
import ListCollapsed from "./ListCollapsed";

type PropsType = {
  list: List;
  onAddTask: (idList: number, data: TaskType) => void;
  onUpdateTask: (idList: number, data: Task) => void;
  onMoveTask: (fromList: number, toList: number, idTask: string) => void;
};

const ListBoard = (props: PropsType) => {
  const [collapsed, setCollapsed] = useState(false);

  const borderColor = collapsed ? props.list.color : "";
  const customStyle = collapsed
    ? "w-10 h-44 bg-gray-100 border-2 border-solid"
    : "w-64 bg-gray-100";

  const onUpdateTask = (data: Task) => {
    props.onUpdateTask(props.list.id, data);
  };

  const onAddTask = (data: TaskType) => {
    props.onAddTask(props.list.id, data);
  };

  return (
    <div
      style={{ borderColor: borderColor }}
      className={`rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${customStyle}`}
    >
      {!collapsed ? (
        <>
          <Header
            values={props.list}
            onCollapse={() => setCollapsed(true)}
            isCollapsed={collapsed}
          />
          <div className="p-4">
            {props.list.tasks.map((task) => (
              <TaskCard key={task.id} values={task} onUpdate={onUpdateTask} />
            ))}
            <Footer onAddTask={onAddTask} />
          </div>
        </>
      ) : (
        <ListCollapsed
          values={props.list}
          onExpand={() => setCollapsed(false)}
        />
      )}
    </div>
  );
};

export default ListBoard;
