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

type Propstype = {
  children: React.ReactNode;
};

export const BoardProvider = (props: Propstype) => {
  const { state, dispatch } = useLocalStorage("Board");

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {props.children}
    </BoardContext.Provider>
  );
};
