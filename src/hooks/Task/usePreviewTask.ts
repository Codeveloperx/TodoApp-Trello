import { useMemo } from "react";
import type { DragTaskAndList, List } from "@/types/types";

export const usePreviewTask = (
  list: List,
  dragData: DragTaskAndList | null,
  dragOverData?: DragTaskAndList | null
) => {
  const originalTasks = useMemo(
    () => [...list.tasks].sort((a, b) => a.position - b.position),
    [list.tasks]
  );

  const sameListDragging = useMemo(
    () =>
      !!(
        dragData &&
        dragOverData &&
        dragData.listId === list.id &&
        dragOverData.listId === list.id
      ),
    [dragData, dragOverData, list.id]
  );

  const isMovementTypeTask = (): boolean => {
    return dragData?.typeMovement === "Task";
  };

  const previewTasks = useMemo(() => {
    if (!isMovementTypeTask()) return originalTasks;
    if (!sameListDragging || !dragData || !dragOverData) return originalTasks;

    const from = dragData.index;
    const to = dragOverData.index;

    if (from === to) return originalTasks;

    const preview = [...originalTasks];
    const [moved] = preview.splice(from, 1);
    const insertAt = Math.min(Math.max(0, to), preview.length);
    preview.splice(insertAt, 0, moved);

    return preview;
  }, [
    sameListDragging,
    dragData,
    dragOverData,
    originalTasks,
    isMovementTypeTask,
  ]);

  const showDropzoneAtIndex = (index: number): boolean => {
    if (!isMovementTypeTask()) return false;
    return (
      !!dragData &&
      dragOverData?.listId === list.id &&
      dragOverData.index === index
    );
  };

  const isDraggedTaskAtIndex = (index: number): boolean => {
    if (!isMovementTypeTask()) return false;
    return (
      !!dragData &&
      previewTasks[index].id === dragData.taskId &&
      dragOverData?.listId === list.id
    );
  };

  const isTaskBeingDragged = (taskId: string): boolean => {
    if (!isMovementTypeTask()) return false;
    return dragData?.taskId === taskId;
  };

  const showDropzoneAtEnd = (): boolean => {
    if (!isMovementTypeTask()) return false;
    return (
      !!dragData &&
      dragOverData?.listId === list.id &&
      dragOverData.index === list.tasks.length
    );
  };

  return {
    previewTasks,
    showDropzoneAtIndex,
    isDraggedTaskAtIndex,
    isTaskBeingDragged,
    showDropzoneAtEnd,
  };
};
