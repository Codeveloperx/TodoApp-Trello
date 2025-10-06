import {
  ADD_LIST,
  ADD_TASK,
  DELETE_LIST,
  DELETE_TASK,
  MOVE_TASK,
  UPDATE_TASK,
} from "../constants/constant";
import type { List, ListType, Task, TaskType } from "../types/types";

//prettier-ignore
export type Action =
  | { type: "ADD_LIST"; payload: ListType }
  | { type: "DELETE_LIST"; payload: { idList: string } }
  | { type: "ADD_TASK"; payload: { idList: string; content: TaskType } }
  | { type: "UPDATE_TASK"; payload: { idList: string; data: Task } }
  | { type: "DELETE_TASK"; payload: { idList: string; idTask: string } }
  | { type: "MOVE_TASK"; payload: { fromList: string; toList: string; idTask: string; fromIndex: number; toIndex: number } };

export const boardReducer = (state: List[], action: Action): List[] => {
  switch (action.type) {
    case ADD_LIST:
      return [
        ...state,
        { id: crypto.randomUUID(), ...action.payload, tasks: [] },
      ];

    case DELETE_LIST:
      return state.filter((col) => col.id !== action.payload.idList);

    case ADD_TASK:
      return state.map((it) =>
        it.id === action.payload.idList
          ? {
              ...it,
              tasks: [
                ...it.tasks,
                {
                  id: crypto.randomUUID(),
                  ...action.payload.content,
                  position: it.tasks.length,
                },
              ],
            }
          : it
      );

    case UPDATE_TASK:
      return state.map((it) =>
        it.id === action.payload.idList
          ? {
              ...it,
              tasks: it.tasks.map((task) =>
                task.id === action.payload.data.id
                  ? { ...task, ...action.payload.data }
                  : task
              ),
            }
          : it
      );

    case DELETE_TASK:
      return state.map((it) =>
        it.id === action.payload.idList
          ? {
              ...it,
              tasks: it.tasks.filter((t) => t.id !== action.payload.idTask),
            }
          : it
      );

    case MOVE_TASK: {
      const { fromList, toList, fromIndex, toIndex } = action.payload;

      // Caso 1: mover dentro de la misma lista
      if (fromList === toList) {
        const col = state.find((it) => it.id === fromList);
        if (!col) return state;

        const newTasks = [...col.tasks];
        const [task] = newTasks.splice(fromIndex, 1);
        newTasks.splice(toIndex, 0, { ...task });

        // reasignar posiciones
        const reordered = newTasks.map((t, i) => ({ ...t, position: i }));

        return state.map((it) =>
          it.id === col.id ? { ...it, tasks: reordered } : it
        );
      }

      // Caso 2: mover entre listas
      const sourceCol = state.find((it) => it.id === fromList);
      const targetCol = state.find((it) => it.id === toList);
      if (!sourceCol || !targetCol) return state;

      const taskToMove = sourceCol.tasks[fromIndex];
      if (!taskToMove) return state;

      const newSourceTasks = [...sourceCol.tasks];
      newSourceTasks.splice(fromIndex, 1);

      const newTargetTasks = [...targetCol.tasks];
      newTargetTasks.splice(toIndex, 0, { ...taskToMove });

      // reasignar posiciones en ambas listas
      const reorderedSource = newSourceTasks.map((t, i) => ({
        ...t,
        position: i,
      }));
      const reorderedTarget = newTargetTasks.map((t, i) => ({
        ...t,
        position: i,
      }));

      return state.map((it) => {
        if (it.id === fromList) return { ...it, tasks: reorderedSource };
        if (it.id === toList) return { ...it, tasks: reorderedTarget };
        return it;
      });
    }

    default:
      return state;
  }
};
