import type { DragAndDropTypes, List } from "@/types/types";
import { usePreviewList } from "./usePreviewList";

type PropsTypes = {
  dndState: DragAndDropTypes;
  lists: List[];
  moveList: (fromIndex: number, toIndex: number) => void;
};

export const useListDnD = ({ dndState, lists, moveList }: PropsTypes) => {
  const listPreview = usePreviewList({
    lists,
    dragData: dndState.dragData,
    dragOver: dndState.dragOver,
  });

  const handleListDrop = () => {
    if (!dndState.dragData || !dndState.dragOver) return;
    if (dndState.dragData.typeMovement !== "List") return;

    const fromIndex = dndState.dragData.index;
    const toIndex = dndState.dragOver.index;

    if (fromIndex !== toIndex) {
      moveList(fromIndex, toIndex);
    }
  };

  const handleListDragStart =
    (listId: string, index: number) => (e: React.DragEvent) => {
      dndState.onDragStart(e, {
        listId,
        index,
        typeMovement: "List",
      });
    };

  const handleListDragEnter =
    (listId: string, index: number) => (e: React.DragEvent) => {
      e.preventDefault();
      if (dndState.dragData?.typeMovement === "List") {
        dndState.onDragEnter({
          listId,
          index,
          typeMovement: "List",
        });
      }
    };

  const handleListDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    handleListDrop();
    dndState.onDragEnd();
  };

  const handleEndAreaDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    if (dndState.dragData?.typeMovement === "List") {
      dndState.onDragEnter({
        listId: "end",
        index: lists.length,
        typeMovement: "List",
      });
    }
  };

  return {
    ...listPreview,
    handleListDragStart,
    handleListDragEnter,
    handleListDragOver,
    handleDragEnd,
    handleEndAreaDragEnter,
  };
};
