import TaskCard from "../Task/Task";
import Footer from "./Footer";
import Header from "./Header";
import type { List, Task, TaskType } from "../../types/types";

type PropsType = {
  list: List;
  onAddTask: (idList: number, data: TaskType) => void;
  onUpdateTask: (idList: number, data: Task) => void;
  onMoveTask: (fromList: number, toList: number, idTask: string) => void;
  onAddColumn: () => void;
};

const ListBoard = (props: PropsType) => {
  const onUpdateTask = (data: Task) => {
    props.onUpdateTask(props.list.id, data);
  };

  const onAddTask = (data: TaskType) => {
    props.onAddTask(props.list.id, data);
  };

  return (
    <div>
      <Header
        values={props.list}
        onAddList={props.onAddColumn}
      />
      <div className="bg-gray-100 rounded-lg w-64 flex-shrink-0">
        <div className="p-4">
          {props.list.tasks.map((task) => (
            <TaskCard
              key={task.id}
              values={task}
              onUpdate={onUpdateTask}
            />
          ))}
          <Footer onAddTask={onAddTask} />
        </div>
      </div>
    </div>
  );
};

export default ListBoard;
