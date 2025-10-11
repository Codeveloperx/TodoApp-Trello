import { usePreviewTask } from "./usePreviewTask";
import type { DragAndDropTypes, List } from "@/types/types";

type PropsTypes = {
  list: List;
  dndState: DragAndDropTypes;
  onMoveTask: (
    fromList: string,
    toList: string,
    taskId: string,
    fromIndex: number,
    toIndex: number
  ) => void;
};

export const useTaskDnD = (props: PropsTypes) => {
  //prettier-ignore
  const {
    list, 
    dndState, 
    onMoveTask
  } = props;

  const preview = usePreviewTask(list, dndState.dragData, dndState.dragOver);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dndState.onDrop((drag, over) => {
      if (!drag?.taskId || !over) return;

      const toIndex = over.index ?? list.tasks.length;
      onMoveTask(drag.listId, over.listId, drag.taskId, drag.index, toIndex);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    if (list.tasks.length === 0) {
      dndState.onDragEnter({ listId: list.id, index: 0 });
    }
  };

  const handleTaskDragEnter = (taskId: string, index: number) => {
    if (!dndState.dragData || taskId === dndState.dragData.taskId) return;
    dndState.onDragEnter({
      listId: list.id,
      index,
      taskId,
    });
  };

  return {
    dragData: dndState.dragData,
    dragOver: dndState.dragOver,
    ...preview,
    onDragStart: dndState.onDragStart,
    onDragEnd: dndState.onDragEnd,
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleTaskDragEnter,
  };
};
