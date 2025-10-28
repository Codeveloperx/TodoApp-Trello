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
import type { Action, List } from "@/types/types";

export const boardReducer = (state: List[], action: Action): List[] => {
  switch (action.type) {
    case ADD_LIST:
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          ...action.payload,
          collapse: false,
          tasks: [],
        },
      ];

    case DELETE_LIST:
      return state.filter((col) => col.id !== action.payload.idList);

    case UPDATE_LIST: {
      return state.map((list) =>
        list.id === action.payload.idList
          ? { ...list, ...action.payload.data }
          : list
      );
    }

    case TOGGLE_LIST_COLLAPSE: {
      return state.map((list) =>
        list.id === action.payload.idList
          ? { ...list, collapse: !list.collapse }
          : list
      );
    }
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

    case MOVE_LIST: {
      const { from, to } = action.payload;

      const newState = [...state];
      const [movedList] = newState.splice(from, 1);
      newState.splice(to, 0, movedList);

      return newState.map((list, index) => ({
        ...list,
        position: index,
      }));
    }

    default:
      return state;
  }
};
