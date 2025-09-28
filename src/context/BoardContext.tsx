import React, { createContext, useContext, useReducer } from "react";
import type { List, ListType, Task, TaskType } from "../types/types";

type Action =
  | { type: "ADD_COLUMN"; payload: ListType }
  | {
      type: "ADD_TASK";
      payload: { idList: number; content: TaskType };
    }
  | {
      type: "UPDATE_TASK";
      payload: { idList: number; data: Task };
    }
  | {
      type: "MOVE_TASK";
      payload: {
        fromList: number;
        toList: number;
        idTask: string;
        fromIndex: number;
        toIndex: number;
      };
    };

const initialState: List[] = [];

const BoardContext = createContext<{
  state: List[];
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const boardReducer = (state: List[], action: Action): List[] => {
  switch (action.type) {
    case "ADD_COLUMN":
      return [...state, { id: Date.now(), ...action.payload, tasks: [] }];

    case "ADD_TASK":
      return state.map((it) =>
        it.id === action.payload.idList
          ? {
              ...it,
              tasks: [
                ...it.tasks,
                {
                  id: Date.now().toString(),
                  ...action.payload.content,
                },
              ],
            }
          : it
      );

    case "UPDATE_TASK":
      return state.map((it) =>
        it.id === action.payload.idList
          ? {
              ...it,
              tasks: it.tasks.map((task) =>
                task.id === action.payload.data.id
                  ? {
                      ...task,
                      ...action.payload.data,
                    }
                  : { ...task }
              ),
            }
          : it
      );

    case "MOVE_TASK": {
      const { fromList, toList, fromIndex, toIndex } = action.payload;

      // Caso 1: Mover dentro de la misma columna
      if (fromList === toList) {
        const col = state.find((it) => it.id === fromList);
        if (!col) return state;

        const newTasks = [...col.tasks];
        const [task] = newTasks.splice(fromIndex, 1); // eliminar
        newTasks.splice(toIndex, 0, task); // insertar

        return state.map((it) =>
          it.id === col.id ? { ...it, tasks: newTasks } : it
        );
      }

      // Caso 2: Mover entre columnas
      const sourceCol = state.find((it) => it.id === fromList);
      const targetCol = state.find((it) => it.id === toList);
      if (!sourceCol || !targetCol) return state;

      const taskToMove = sourceCol.tasks[fromIndex];
      if (!taskToMove) return state;

      const newSourceTasks = [...sourceCol.tasks];
      newSourceTasks.splice(fromIndex, 1);

      const newTargetTasks = [...targetCol.tasks];
      newTargetTasks.splice(toIndex, 0, taskToMove);

      return state.map((it) => {
        if (it.id === fromList) return { ...it, tasks: newSourceTasks };
        if (it.id === toList) return { ...it, tasks: newTargetTasks };
        return it;
      });
    }

    default:
      return state;
  }
};

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => useContext(BoardContext);
