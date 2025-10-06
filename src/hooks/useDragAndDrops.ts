import { useState } from "react";
import type { DragData, DragOverData, Task } from "../types/types";

export const useDragAndDrop = () => {
  const [dragData, setDragData] = useState<DragData | null>(null);
  const [dragOverData, setDragOverData] = useState<DragOverData | null>(null);

  const onDragStart = (fromList: string, task: Task, e: React.DragEvent) => {
    const data: DragData = {
      containerId: fromList,
      index: task.position,
      id: task.id,
    };

    setDragData(data);
    e.dataTransfer.effectAllowed = "move";
    const parsed = JSON.stringify(data);
    e.dataTransfer.setData("text/plain", parsed);
  };

  const onDragEnter = (listId: string, taskIndex: number) => {
    const data: DragOverData = {
      containerId: listId,
      index: taskIndex,
    };

    setDragOverData(data);
  };

  const onDrop = (callback: (drag: DragData, over: DragOverData) => void) => {
    if (!dragData || !dragOverData) return;
    callback(dragData, dragOverData);

    setDragData(null);
    setDragOverData(null);
  };

  const onDragEnd = () => {
    setDragData(null);
    setDragOverData(null);
  };

  return {
    dragData,
    dragOverData,
    onDragStart,
    onDragEnter,
    onDragEnd,
    onDrop,
  };
};
