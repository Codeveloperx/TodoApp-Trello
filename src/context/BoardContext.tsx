import { createContext } from "react";
import { useLocalStorage } from "@/hooks";
import type { Action, List } from "@/types/types";

const initialState: List[] = [];

export const BoardContext = createContext<{
  state: List[];
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const { state, dispatch } = useLocalStorage();

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};
