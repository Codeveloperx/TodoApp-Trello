import { useState } from "react";

export const useDragAndDrop = <T = unknown>() => {
  const [dragData, setDragData] = useState<T | null>(null);
  const [dragOver, setDragOverData] = useState<T | null>(null);

  const onDragStart = (e: React.DragEvent, data: T) => {
    setDragData(data);
    e.dataTransfer.effectAllowed = "move";
    const parsed = JSON.stringify(data);
    e.dataTransfer.setData("text/plain", parsed);
  };

  const onDragEnter = (data: T) => {
    setDragOverData(data);
  };

  const onDrop = (callback: (drag: T, over: T) => void) => {
    if (!dragData || !dragOver) {
      setDragData(null);
      setDragOverData(null);
      return;
    }

    callback(dragData, dragOver);
    setDragData(null);
    setDragOverData(null);
  };

  const onDragEnd = () => {
    setDragData(null);
    setDragOverData(null);
  };

  return {
    dragData,
    dragOver,
    onDragStart,
    onDragEnter,
    onDragEnd,
    onDrop,
  };
};
