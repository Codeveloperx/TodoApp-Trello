import { useMemo } from "react";
import type { DragData, DragOverData, List } from "../types/types";

export const usePreviewTask = (
  list: List,
  dragData: DragData | null,
  dragOverData: DragOverData | null
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
        dragData.containerId === list.id &&
        dragOverData.containerId === list.id
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
      dragOverData?.containerId === list.id &&
      dragOverData.index === index
    );
  };

  const isDraggedTaskAtIndex = (index: number): boolean => {
    return (
      !!dragData &&
      previewTasks[index].id === dragData.id &&
      dragOverData?.containerId === list.id
    );
  };

  const isTaskBeingDragged = (taskId: string): boolean => {
    return dragData?.id === taskId;
  };

  const showDropzoneAtEnd = (): boolean => {
    return (
      !!dragData &&
      dragOverData?.containerId === list.id &&
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

// import { useMemo } from "react";
// import type { DragData, DragOverData, List } from "../types/types";

// export const usePreviewTask = (
//   list: List,
//   dragData: DragData | null,
//   dragOverData: DragOverData | null
// ) => {
//   const originalTasks = useMemo(
//     () => [...list.tasks].sort((a, b) => a.position - b.position),
//     [list.tasks]
//   );

//   // Verificar si estamos arrastrando dentro de la misma lista
//   const sameListDragging = useMemo(
//     () =>
//       !!(
//         dragData &&
//         dragOverData &&
//         dragData.containerId === list.id &&
//         dragOverData.containerId === list.id
//       ),
//     [dragData, dragOverData, list.id]
//   );

//   // Verificar si estamos arrastrando desde otra lista a esta
//   const draggingToThisList = useMemo(
//     () =>
//       !!(
//         dragData &&
//         dragOverData &&
//         dragData.containerId !== list.id &&
//         dragOverData.containerId === list.id
//       ),
//     [dragData, dragOverData, list.id]
//   );

//   // Verificar si estamos arrastrando desde esta lista a otra
//   const draggingFromThisList = useMemo(
//     () =>
//       !!(
//         dragData &&
//         dragOverData &&
//         dragData.containerId === list.id &&
//         dragOverData.containerId !== list.id
//       ),
//     [dragData, dragOverData, list.id]
//   );

//   const previewTasks = useMemo(() => {
//     // Caso 1: Arrastrando dentro de la misma lista
//     if (sameListDragging && dragData && dragOverData) {
//       const from = dragData.index;
//       const to = dragOverData.index;

//       if (from === to) return originalTasks;

//       const preview = [...originalTasks];
//       const [moved] = preview.splice(from, 1);
//       const insertAt = Math.min(Math.max(0, to), preview.length);
//       preview.splice(insertAt, 0, moved);

//       return preview;
//     }

//     // Caso 2: Arrastrando desde esta lista a otra (remover temporalmente)
//     if (draggingFromThisList && dragData) {
//       const preview = originalTasks.filter((_, i) => i !== dragData.index);
//       return preview;
//     }

//     // Caso 3: Arrastrando desde otra lista a esta (agregar placeholder)
//     if (draggingToThisList && dragData && dragOverData) {
//       const preview = [...originalTasks];
//       const draggedTask = originalTasks.find((t) => t.id === dragData.id);

//       // Si encontramos la tarea (por si acaso), crear un placeholder
//       const placeholder = draggedTask || {
//         id: dragData.id,
//         task: "...",
//         position: dragOverData.index,
//         listId: list.id,
//       };

//       const insertAt = Math.min(
//         Math.max(0, dragOverData.index),
//         preview.length
//       );
//       preview.splice(insertAt, 0, placeholder);

//       return preview;
//     }

//     // Caso por defecto: sin drag o drag no relacionado con esta lista
//     return originalTasks;
//   }, [
//     sameListDragging,
//     draggingFromThisList,
//     draggingToThisList,
//     dragData,
//     dragOverData,
//     originalTasks,
//     list.id,
//   ]);

//   // Mostrar dropzone en un índice específico
//   // const showDropzoneAtIndex = (index: number): boolean => {
//   //   if (!dragData || !dragOverData) return false;

//   //   return (
//   //     dragOverData.containerId === list.id &&
//   //     dragOverData.index === index &&
//   //     // No mostrar dropzone si es la misma posición en la misma lista
//   //     !(sameListDragging && dragData.index === index)
//   //   );
//   // };

//   // Verificar si la tarea en un índice es la que se está arrastrando
//   const isDraggedTaskAtIndex = (index: number): boolean => {
//     if (!dragData || !dragOverData) return false;
//     if (index >= previewTasks.length) return false; // Protección

//     return (
//       previewTasks[index].id === dragData.id &&
//       dragOverData.containerId === list.id
//     );
//   };

//   // Verificar si una tarea está siendo arrastrada (globalmente)
//   const isTaskBeingDragged = (taskId: string): boolean => {
//     return dragData?.id === taskId;
//   };

//   // Mostrar dropzone al final de la lista
//   // const showDropzoneAtEnd = (): boolean => {
//   //   if (!dragData || !dragOverData) return false;

//   //   return (
//   //     dragOverData.containerId === list.id &&
//   //     dragOverData.index >= previewTasks.length // Usar previewTasks para consistencia
//   //   );
//   // };

//   // Helper adicional: obtener el índice visual de una tarea
//   const getVisualIndex = (taskId: string): number => {
//     return previewTasks.findIndex((t) => t.id === taskId);
//   };

//    const showDropzoneAtIndex = (index: number): boolean => {
//     if (!dragData || !dragOverData) return false;
    
//     // No mostrar si el índice es inválido
//     if (index < 0 || index > list.tasks.length) return false;
    
//     return (
//       dragOverData.containerId === list.id &&
//       dragOverData.index === index &&
//       // No mostrar dropzone si es la misma posición en la misma lista
//       !(sameListDragging && dragData.index === index)
//     );
//   };

//   const showDropzoneAtEnd = (): boolean => {
//     if (!dragData || !dragOverData) return false;
    
//     return (
//       dragOverData.containerId === list.id &&
//       dragOverData.index >= previewTasks.length
//     );
//   };

//   return {
//     previewTasks,
//     showDropzoneAtIndex,
//     isDraggedTaskAtIndex,
//     isTaskBeingDragged,
//     showDropzoneAtEnd,
//     getVisualIndex,
//     // Exponer estos flags para uso externo si es necesario
//     sameListDragging,
//     draggingToThisList,
//     draggingFromThisList,
//   };
// };
