import { useMemo } from "react";
import type { DragTaskAndList, List } from "@/types/types";

type UsePreviewListParams = {
  lists: List[];
  dragData: DragTaskAndList | null;
  dragOver: DragTaskAndList | null;
};

type UsePreviewListReturn = {
  previewLists: List[];
  isListBeingDragged: (listId: string) => boolean;
  getOriginalIndex: (listId: string) => number;
  showDropzoneBetween: (index: number) => boolean;
  isMovementTypeList: boolean;
};

export const usePreviewList = ({
  lists,
  dragData,
  dragOver,
}: UsePreviewListParams): UsePreviewListReturn => {
  const isMovementTypeList = useMemo((): boolean => {
    return dragData?.typeMovement === "List";
  }, [dragData]);

  const previewLists = useMemo(() => {
    if (!isMovementTypeList) return lists;
    if (!dragData || !dragOver) return lists;

    const from = dragData.index;
    const to = dragOver.index;

    if (from === to) return lists;

    const preview = [...lists];
    const [movedList] = preview.splice(from, 1);
    preview.splice(to, 0, movedList);

    return preview;
  }, [lists, dragData, dragOver, isMovementTypeList]);

  const isListBeingDragged = (listId: string): boolean => {
    if (!isMovementTypeList) return false;
    return dragData?.listId === listId;
  };

  const getOriginalIndex = (listId: string): number => {
    return lists.findIndex((l) => l.id === listId);
  };

  const showDropzoneBetween = (index: number): boolean => {
    if (!isMovementTypeList) return false;
    return !!dragData && dragOver?.index === index;
  };

  return {
    previewLists,
    isListBeingDragged,
    getOriginalIndex,
    showDropzoneBetween,
    isMovementTypeList,
  };
};
