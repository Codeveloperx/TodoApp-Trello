import { useState } from "react";

const useDragAndDrop = <T = unknown>() => {
  const [dragData, setDragData] = useState<T | null>(null);
  const [dragOver, setDragOver] = useState<T | null>(null);

  const dragStart = (data: T, e: React.DragEvent) => {
    e.stopPropagation();

    setDragData(data);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  };

  const dragEnter = (data: T) => {
    console.log(data, 'DATA ENTER')
    setDragOver(data);
  };

  const onDrop = (e: React.DragEvent, callback: (drag: T, over: T) => void) => {
    e.preventDefault();
    e.stopPropagation();

    if (!dragData || !dragOver) return;
    callback(dragData, dragOver);

    setDragData(null);
    setDragOver(null);
  };

  const dragEnd = () => {
    setDragData(null);
    setDragOver(null);
  };

  return {
    dragData,
    dragOver,
    dragStart,
    dragEnter,
    dragEnd,
    onDrop,
  };
};

export default useDragAndDrop;
