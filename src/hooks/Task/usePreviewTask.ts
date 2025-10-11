import { useMemo } from "react";
import type { DragTaskData, List } from "../types/types";

export const usePreviewTask = (
  list: List,
  dragData: DragTaskData | null,
  dragOverData?: DragTaskData | null
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

  const previewTasks = useMemo(() => {
    if (!sameListDragging || !dragData || !dragOverData) return originalTasks;

    const from = dragData.index;
    const to = dragOverData.index;

    if (from === to) return originalTasks;

    const preview = [...originalTasks];

    const [moved] = preview.splice(from, 1);

    const insertAt = Math.min(Math.max(0, to), preview.length);

    preview.splice(insertAt, 0, moved);

    return preview;
  }, [sameListDragging, dragData, dragOverData, originalTasks]);

  const showDropzoneAtIndex = (index: number): boolean => {
    return (
      !!dragData &&
      dragOverData?.listId === list.id &&
      dragOverData.index === index
    );
  };

  const isDraggedTaskAtIndex = (index: number): boolean => {
    return (
      !!dragData &&
      previewTasks[index].id === dragData.taskId &&
      dragOverData?.listId === list.id
    );
  };

  const isTaskBeingDragged = (taskId: string): boolean => {
    return dragData?.taskId === taskId;
  };

  const showDropzoneAtEnd = (): boolean => {
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
