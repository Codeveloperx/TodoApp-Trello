import { createContext } from "react";
import { useLocalStorage } from "@/hooks";
import type { Action, AppState, Board } from "@/types/types";

const initialState: AppState = {
  boards: [],
  currentBoardId: null,
};

export const BoardContext = createContext<{
  state: AppState;
  currentBoard: Board | null;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  currentBoard: null,
  dispatch: () => null,
});

type PropsType = {
  children: React.ReactNode;
};

export const BoardProvider = (props: PropsType) => {
  const { state, dispatch, currentBoard } = useLocalStorage("Board");

  return (
    <BoardContext.Provider
      value={{ state, dispatch, currentBoard: currentBoard ?? null }}
    >
      {props.children}
    </BoardContext.Provider>
  );
};
