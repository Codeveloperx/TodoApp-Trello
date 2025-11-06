// import {
//   ADD_LIST,
//   ADD_TASK,
//   DELETE_LIST,
//   DELETE_TASK,
//   MOVE_LIST,
//   MOVE_TASK,
//   TOGGLE_LIST_COLLAPSE,
//   UPDATE_LIST,
//   UPDATE_TASK,
// } from "@/constants/constant";
// import type { Action, List } from "@/types/types";

// export const boardReducer = (state: List[], action: Action): List[] => {
//   switch (action.type) {
//     case ADD_LIST:
//       return [
//         ...state,
//         {
//           id: crypto.randomUUID(),
//           ...action.payload,
//           collapse: false,
//           tasks: [],
//         },
//       ];

//     case DELETE_LIST:
//       return state.filter((col) => col.id !== action.payload.idList);

//     case UPDATE_LIST: {
//       return state.map((list) =>
//         list.id === action.payload.idList
//           ? { ...list, ...action.payload.data }
//           : list
//       );
//     }

//     case TOGGLE_LIST_COLLAPSE: {
//       return state.map((list) =>
//         list.id === action.payload.idList
//           ? { ...list, collapse: !list.collapse }
//           : list
//       );
//     }
//     case ADD_TASK:
//       return state.map((it) =>
//         it.id === action.payload.idList
//           ? {
//               ...it,
//               tasks: [
//                 ...it.tasks,
//                 {
//                   id: crypto.randomUUID(),
//                   ...action.payload.content,
//                   position: it.tasks.length,
//                 },
//               ],
//             }
//           : it
//       );

//     case UPDATE_TASK:
//       return state.map((it) =>
//         it.id === action.payload.idList
//           ? {
//               ...it,
//               tasks: it.tasks.map((task) =>
//                 task.id === action.payload.data.id
//                   ? { ...task, ...action.payload.data }
//                   : task
//               ),
//             }
//           : it
//       );

//     case DELETE_TASK:
//       return state.map((it) =>
//         it.id === action.payload.idList
//           ? {
//               ...it,
//               tasks: it.tasks.filter((t) => t.id !== action.payload.idTask),
//             }
//           : it
//       );

//     case MOVE_TASK: {
//       const { fromList, toList, fromIndex, toIndex } = action.payload;

//       // Caso 1: mover dentro de la misma lista
//       if (fromList === toList) {
//         const col = state.find((it) => it.id === fromList);
//         if (!col) return state;

//         const newTasks = [...col.tasks];
//         const [task] = newTasks.splice(fromIndex, 1);
//         newTasks.splice(toIndex, 0, { ...task });

//         // reasignar posiciones
//         const reordered = newTasks.map((t, i) => ({ ...t, position: i }));

//         return state.map((it) =>
//           it.id === col.id ? { ...it, tasks: reordered } : it
//         );
//       }

//       // Caso 2: mover entre listas
//       const sourceCol = state.find((it) => it.id === fromList);
//       const targetCol = state.find((it) => it.id === toList);
//       if (!sourceCol || !targetCol) return state;

//       const taskToMove = sourceCol.tasks[fromIndex];
//       if (!taskToMove) return state;

//       const newSourceTasks = [...sourceCol.tasks];
//       newSourceTasks.splice(fromIndex, 1);

//       const newTargetTasks = [...targetCol.tasks];
//       newTargetTasks.splice(toIndex, 0, { ...taskToMove });

//       // reasignar posiciones en ambas listas
//       const reorderedSource = newSourceTasks.map((t, i) => ({
//         ...t,
//         position: i,
//       }));
//       const reorderedTarget = newTargetTasks.map((t, i) => ({
//         ...t,
//         position: i,
//       }));

//       return state.map((it) => {
//         if (it.id === fromList) return { ...it, tasks: reorderedSource };
//         if (it.id === toList) return { ...it, tasks: reorderedTarget };
//         return it;
//       });
//     }

//     case MOVE_LIST: {
//       const { from, to } = action.payload;

//       const newState = [...state];
//       const [movedList] = newState.splice(from, 1);
//       newState.splice(to, 0, movedList);

//       return newState.map((list, index) => ({
//         ...list,
//         position: index,
//       }));
//     }

//     default:
//       return state;
//   }
// };

// context/boardReducer.ts
import {
  CREATE_BOARD,
  // DELETE_BOARD,
  // SWITCH_BOARD,
  ADD_LIST,
  DELETE_LIST,
  UPDATE_LIST,
  ADD_TASK,
  TOGGLE_LIST_COLLAPSE,
  UPDATE_TASK,
  DELETE_TASK,
  MOVE_TASK,
  MOVE_LIST,
  SWITCH_BOARD,
} from "@/constants/constant";
import type { Action, AppState, List } from "@/types/types";

const createInitialLists = (): List[] => [
  {
    id: crypto.randomUUID(),
    title: "All",
    color: "#3b82f6",
    position: 0,
    collapse: false,
    tasks: [],
  },
  {
    id: crypto.randomUUID(),
    title: "Pending",
    color: "#f59e0b",
    position: 1,
    collapse: false,
    tasks: [],
  },
  {
    id: crypto.randomUUID(),
    title: "Done",
    color: "#10b981",
    position: 2,
    collapse: false,
    tasks: [],
  },
];

export const boardReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case CREATE_BOARD: {
      const newBoard = {
        id: crypto.randomUUID(),
        name: action.payload.name,
        createdAt: Date.now(),
        lists: createInitialLists(),
      };

      return {
        boards: [...state.boards, newBoard],
        currentBoardId: newBoard.id,
      };
    }
    case SWITCH_BOARD: {
      return {
        ...state,
        currentBoardId: action.payload.boardId,
      };
    }
    case "UPDATE_BOARD": {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? { ...board, ...action.payload.data }
            : board
        ),
      };
    }

    case "DELETE_BOARD": {
      const filteredBoards = state.boards.filter(
        (board) => board.id !== action.payload.boardId
      );

      return {
        boards: filteredBoards,
        currentBoardId:
          state.currentBoardId === action.payload.boardId
            ? filteredBoards[0]?.id || null
            : state.currentBoardId,
      };
    }

    case SWITCH_BOARD: {
      return {
        ...state,
        currentBoardId: action.payload.boardId,
      };
    }

    case ADD_LIST: {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: [
                  ...board.lists,
                  {
                    id: crypto.randomUUID(),
                    ...action.payload.data,
                    position: board.lists.length,
                    collapse: false,
                    tasks: [],
                  },
                ],
              }
            : board
        ),
      };
    }

    case DELETE_LIST: {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.filter(
                  (list) => list.id !== action.payload.idList
                ),
              }
            : board
        ),
      };
    }

    case UPDATE_LIST: {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map((list) =>
                  list.id === action.payload.idList
                    ? { ...list, ...action.payload.data }
                    : list
                ),
              }
            : board
        ),
      };
    }

    case TOGGLE_LIST_COLLAPSE: {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map((list) =>
                  list.id === action.payload.idList
                    ? { ...list, collapse: !list.collapse }
                    : list
                ),
              }
            : board
        ),
      };
    }

    case ADD_TASK: {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map((list) =>
                  list.id === action.payload.idList
                    ? {
                        ...list,
                        tasks: [
                          ...list.tasks,
                          {
                            id: crypto.randomUUID(),
                            ...action.payload.content,
                            position: list.tasks.length,
                          },
                        ],
                      }
                    : list
                ),
              }
            : board
        ),
      };
    }

    case UPDATE_TASK: {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map((list) =>
                  list.id === action.payload.idList
                    ? {
                        ...list,
                        tasks: list.tasks.map((task) =>
                          task.id === action.payload.data.id
                            ? { ...task, ...action.payload.data }
                            : task
                        ),
                      }
                    : list
                ),
              }
            : board
        ),
      };
    }

    case DELETE_TASK: {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map((list) =>
                  list.id === action.payload.idList
                    ? {
                        ...list,
                        tasks: list.tasks.filter(
                          (task) => task.id !== action.payload.idTask
                        ),
                      }
                    : list
                ),
              }
            : board
        ),
      };
    }

    case MOVE_TASK: {
      const { boardId, fromList, toList, fromIndex, toIndex } = action.payload;

      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id !== boardId) return board;

          // Mismo caso: dentro de la misma lista
          if (fromList === toList) {
            const list = board.lists.find((l) => l.id === fromList);
            if (!list) return board;

            const newTasks = [...list.tasks];
            const [task] = newTasks.splice(fromIndex, 1);
            newTasks.splice(toIndex, 0, task);

            const reordered = newTasks.map((t, i) => ({ ...t, position: i }));

            return {
              ...board,
              lists: board.lists.map((l) =>
                l.id === list.id ? { ...l, tasks: reordered } : l
              ),
            };
          }

          // Entre listas
          const sourceList = board.lists.find((l) => l.id === fromList);
          const targetList = board.lists.find((l) => l.id === toList);
          if (!sourceList || !targetList) return board;

          const taskToMove = sourceList.tasks[fromIndex];
          if (!taskToMove) return board;

          const newSourceTasks = [...sourceList.tasks];
          newSourceTasks.splice(fromIndex, 1);

          const newTargetTasks = [...targetList.tasks];
          newTargetTasks.splice(toIndex, 0, taskToMove);

          const reorderedSource = newSourceTasks.map((t, i) => ({
            ...t,
            position: i,
          }));
          const reorderedTarget = newTargetTasks.map((t, i) => ({
            ...t,
            position: i,
          }));

          return {
            ...board,
            lists: board.lists.map((l) => {
              if (l.id === fromList) return { ...l, tasks: reorderedSource };
              if (l.id === toList) return { ...l, tasks: reorderedTarget };
              return l;
            }),
          };
        }),
      };
    }

    case MOVE_LIST: {
      const { boardId, from, to } = action.payload;

      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id !== boardId) return board;

          const newLists = [...board.lists];
          const [movedList] = newLists.splice(from, 1);
          newLists.splice(to, 0, movedList);

          return {
            ...board,
            lists: newLists.map((list, index) => ({
              ...list,
              position: index,
            })),
          };
        }),
      };
    }

    default:
      return state;
  }
};
