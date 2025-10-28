import { usePreviewTask } from "./usePreviewTask";
import type { DragAndDropTypes, List } from "@/types/types";

type PropsTypes = {
  list: List;
  dndState: DragAndDropTypes;
  moveTask: (
    fromList: string,
    toList: string,
    idTask: string,
    fromIndex: number,
    toIndex: number
  ) => void;
};

export const useTaskDnD = (props: PropsTypes) => {
  const { list, dndState, moveTask } = props;

  const preview = usePreviewTask(list, dndState.dragData, dndState.dragOver);

  const isTaskMovement = dndState.dragData?.typeMovement === "Task";

  const handleDrop = (e: React.DragEvent) => {
    if (!isTaskMovement) return;
    e.preventDefault();

    dndState.onDrop((drag, over) => {
      if (!drag?.taskId || !over) return;
      const toIndex = over.index ?? list.tasks.length;
      moveTask(drag.listId, over.listId, drag.taskId, drag.index, toIndex);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isTaskMovement) return;
    e.preventDefault();
  };

  const handleDragEnter = () => {
    if (!isTaskMovement) return;

    if (list.tasks.length === 0) {
      dndState.onDragEnter({
        listId: list.id,
        index: 0,
        typeMovement: "Task",
      });
    }
  };

  const handleTaskDragEnter = (taskId: string, index: number) => {
    if (!isTaskMovement) return;
    if (!dndState.dragData || taskId === dndState.dragData.taskId) return;

    dndState.onDragEnter({
      listId: list.id,
      index,
      taskId,
      typeMovement: "Task",
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
