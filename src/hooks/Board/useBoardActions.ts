// import type { ListType, Task, TaskType, Action, List } from "@/types/types";
// import { useBoard } from "./useBoard";
// import {
//   ADD_LIST,
//   ADD_TASK,
//   CREATE_BOARD,
//   DELETE_LIST,
//   DELETE_TASK,
//   MOVE_LIST,
//   MOVE_TASK,
//   TOGGLE_LIST_COLLAPSE,
//   UPDATE_LIST,
//   UPDATE_TASK,
// } from "@/constants/constant";

// export const useBoardActions = () => {
//   const { dispatch } = useBoard();

//   const action = <T>(type: Action["type"], payload: T) => {
//     return dispatch({ type, payload } as Action);
//   };

//   return {
//     createBoard: (name: string) => action(CREATE_BOARD, { name }),
//     addList: (list: ListType) => action(ADD_LIST, list),
//     deleteList: (idList: string) => action(DELETE_LIST, { idList }),
//     moveList: (from: number, to: number) => action(MOVE_LIST, { from, to }),
//     updateList: (idList: string, data: Partial<List>) =>
//       action(UPDATE_LIST, { idList, data }),
//     toggleListCollapse: (idList: string) =>
//       action(TOGGLE_LIST_COLLAPSE, { idList }),
//     addTask: (idList: string, task: TaskType) =>
//       action(ADD_TASK, { idList, content: task }),
//     updateTask: (idList: string, data: Task) =>
//       action(UPDATE_TASK, { idList, data }),
//     deleteTask: (idList: string, idTask: string) =>
//       action(DELETE_TASK, { idList, idTask }),
//     moveTask: (
//       fromList: string,
//       toList: string,
//       idTask: string,
//       fromIndex: number,
//       toIndex: number
//     ) => action(MOVE_TASK, { fromList, toList, idTask, fromIndex, toIndex }),
//   };
// };

import type { ListType, Task, TaskType, Action, List } from "@/types/types";
import { useBoard } from "./useBoard";
import {
  ADD_LIST,
  ADD_TASK,
  CREATE_BOARD,
  DELETE_LIST,
  DELETE_TASK,
  MOVE_LIST,
  MOVE_TASK,
  SWITCH_BOARD,
  TOGGLE_LIST_COLLAPSE,
  UPDATE_LIST,
  UPDATE_TASK,
} from "@/constants/constant";

export const useBoardActions = () => {
  const { dispatch, currentBoard } = useBoard();
  const boardId = currentBoard?.id;

  const action = <T>(type: Action["type"], payload: T) => {
    return dispatch({ type, payload } as Action);
  };

  // Helper para validar que existe un board activo
  const withBoardId = <T extends (...args: any[]) => void>(fn: T): T => {
    return ((...args: any[]) => {
      if (!boardId) {
        console.warn("No board selected");
        return;
      }
      return fn(...args);
    }) as T;
  };

  return {
    createBoard: (name: string) => action(CREATE_BOARD, { name }),
     updateBoard: (boardId: string, data: { name: string }) => 
    action("UPDATE_BOARD", { boardId, data }),
    switchBoard: (boardId: string) => action(SWITCH_BOARD, { boardId }),
    addList: withBoardId((list: ListType) =>
      action(ADD_LIST, { boardId, data: list })
    ),

    deleteList: withBoardId((idList: string) =>
      action(DELETE_LIST, { boardId, idList })
    ),

    moveList: withBoardId((from: number, to: number) =>
      action(MOVE_LIST, { boardId, from, to })
    ),

    updateList: withBoardId((idList: string, data: Partial<List>) =>
      action(UPDATE_LIST, { boardId, idList, data })
    ),

    toggleListCollapse: withBoardId((idList: string) =>
      action(TOGGLE_LIST_COLLAPSE, { boardId, idList })
    ),

    addTask: withBoardId((idList: string, task: TaskType) =>
      action(ADD_TASK, { boardId, idList, content: task })
    ),

    updateTask: withBoardId((idList: string, data: Task) =>
      action(UPDATE_TASK, { boardId, idList, data })
    ),

    deleteTask: withBoardId((idList: string, idTask: string) =>
      action(DELETE_TASK, { boardId, idList, idTask })
    ),

    moveTask: withBoardId(
      (
        fromList: string,
        toList: string,
        idTask: string,
        fromIndex: number,
        toIndex: number
      ) =>
        action(MOVE_TASK, {
          boardId,
          fromList,
          toList,
          idTask,
          fromIndex,
          toIndex,
        })
    ),
  };
};
