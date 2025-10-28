import type { ListType, Task, TaskType, Action, List } from "@/types/types";
import { useBoard } from "./useBoard";
import {
  ADD_LIST,
  ADD_TASK,
  DELETE_LIST,
  DELETE_TASK,
  MOVE_LIST,
  MOVE_TASK,
  TOGGLE_LIST_COLLAPSE,
  UPDATE_LIST,
  UPDATE_TASK,
} from "@/constants/constant";

export const useBoardActions = () => {
  const { dispatch } = useBoard();

  const action = <T>(type: Action["type"], payload: T) => {
    return dispatch({ type, payload } as Action);
  };

  return {
    addList: (list: ListType) => action(ADD_LIST, list),
    deleteList: (idList: string) => action(DELETE_LIST, { idList }),
    moveList: (from: number, to: number) => action(MOVE_LIST, { from, to }),
    updateList: (idList: string, data: Partial<List>) =>
      action(UPDATE_LIST, { idList, data }),
    toggleListCollapse: (idList: string) =>
      action(TOGGLE_LIST_COLLAPSE, { idList }),
    addTask: (idList: string, task: TaskType) =>
      action(ADD_TASK, { idList, content: task }),
    updateTask: (idList: string, data: Task) =>
      action(UPDATE_TASK, { idList, data }),
    deleteTask: (idList: string, idTask: string) =>
      action(DELETE_TASK, { idList, idTask }),
    moveTask: (
      fromList: string,
      toList: string,
      idTask: string,
      fromIndex: number,
      toIndex: number
    ) => action(MOVE_TASK, { fromList, toList, idTask, fromIndex, toIndex }),
  };
};
