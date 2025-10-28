import { useReducer, useEffect } from "react";
import { boardReducer } from "@/context/boardReducer";
import type { List } from "@/types/types";

const initialState: List[] = [];

export const useLocalStorage = (nameRef: string) => {
  const [state, dispatch] = useReducer(boardReducer, initialState, (init) => {
    const saved = localStorage.getItem(nameRef);
    return saved ? (JSON.parse(saved) as List[]) : init;
  });

  useEffect(() => {
    localStorage.setItem(nameRef, JSON.stringify(state));
  }, [state]);

  return { state, dispatch };
};
