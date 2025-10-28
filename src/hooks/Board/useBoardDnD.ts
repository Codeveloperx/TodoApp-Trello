import { useDragAndDrop } from "@/hooks";
import { useListDnD } from "../List/useListDnD";
import type { DragTaskAndList, List } from "@/types/types";

type PropsTypes = {
  lists: List[];
  moveList: (fromIndex: number, toIndex: number) => void;
};

export const useBoardDnD = ({ lists, moveList }: PropsTypes) => {
  const dndState = useDragAndDrop<DragTaskAndList>();
  const listDnD = useListDnD({ dndState, lists, moveList });

  return {
    dndState,
    ...listDnD,
  };
};
