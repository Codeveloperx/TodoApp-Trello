// import { useReducer, useEffect } from "react";
// import { boardReducer } from "@/context/boardReducer";
// import type { List } from "@/types/types";

// const initialState: List[] = [];

// export const useLocalStorage = (nameRef: string) => {
//   const [state, dispatch] = useReducer(boardReducer, initialState, (init) => {
//     const saved = localStorage.getItem(nameRef);
//     return saved ? (JSON.parse(saved) as List[]) : init;
//   });

//   useEffect(() => {
//     localStorage.setItem(nameRef, JSON.stringify(state));
//   }, [state]);

//   return { state, dispatch };
// };

// hooks/useLocalStorage.ts
// import { useReducer, useEffect } from "react";
// import { boardReducer } from "@/context/boardReducer";
// import type { AppState } from "@/types/types";

// const initialState: AppState = {
//   boards: [],
//   currentBoardId: null,
// };

// export const useLocalStorage = (nameRef: string) => {
//   const [state, dispatch] = useReducer(boardReducer, initialState, (init) => {
//     const saved = localStorage.getItem(nameRef);
//     return saved ? (JSON.parse(saved) as AppState) : init;
//   });

//   useEffect(() => {
//     localStorage.setItem(nameRef, JSON.stringify(state));
//   }, [state, nameRef]);

//   const currentBoard = state.boards.find(
//     (board) => board.id === state.currentBoardId
//   );

//   return { state, dispatch, currentBoard };
// };

// hooks/useLocalStorage.ts
import { useReducer, useEffect } from "react";
import { boardReducer } from "@/context/boardReducer";
import type { AppState } from "@/types/types";

const initialState: AppState = {
  boards: [],
  currentBoardId: null,
};

// Función para crear el tablero por defecto
const createDefaultBoard = (): AppState => {
  const defaultBoardId = crypto.randomUUID();

  return {
    boards: [
      {
        id: defaultBoardId,
        name: "Mi tablero",
        createdAt: Date.now(),
        lists: [], // Sin listas inicialmente
      },
    ],
    currentBoardId: defaultBoardId,
  };
};

export const useLocalStorage = (nameRef: string) => {
  const [state, dispatch] = useReducer(boardReducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem(nameRef);

      if (!saved) {
        // No existe en localStorage, crear tablero por defecto
        const defaultState = createDefaultBoard();
        localStorage.setItem(nameRef, JSON.stringify(defaultState));
        return defaultState;
      }

      const parsed = JSON.parse(saved) as AppState;

      // Si no hay tableros, crear uno por defecto
      if (!parsed.boards || parsed.boards.length === 0) {
        const defaultState = createDefaultBoard();
        localStorage.setItem(nameRef, JSON.stringify(defaultState));
        return defaultState;
      }

      return parsed || init;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      const defaultState = createDefaultBoard();
      localStorage.setItem(nameRef, JSON.stringify(defaultState));
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(nameRef, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [state, nameRef]);

  // Helper para obtener el tablero actual
  const currentBoard =
    state.boards?.find((board) => board.id === state.currentBoardId) ?? null;

  return { state, dispatch, currentBoard };
};
