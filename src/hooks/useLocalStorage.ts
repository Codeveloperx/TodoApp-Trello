import { useReducer, useEffect } from "react";
import { boardReducer } from "../context/boardReducer";
import type { List } from "../types/types";
import { KEY_BOARD } from "../constants/constant";

const initialState: List[] = [];

const useLocalStorage = () => {
  const [state, dispatch] = useReducer(boardReducer, initialState, (init) => {
    const saved = localStorage.getItem("board");
    return saved ? (JSON.parse(saved) as List[]) : init;
  });

  useEffect(() => {
    localStorage.setItem(KEY_BOARD, JSON.stringify(state));
  }, [state]);

  return { state, dispatch };
};

export default useLocalStorage;
