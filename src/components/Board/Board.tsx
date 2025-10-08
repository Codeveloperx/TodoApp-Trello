import { useEffect, useRef, useState } from "react";
import { useBoard } from "@/hooks/useBoard";
import { useBoardActions } from "@/hooks/useBoardActions";
import { useDragAndDrop } from "@/hooks/useDragAndDrops";
import { FormWrapper } from "../Common/Form/FormWrapper";
import formFiels from "@/config/forms/addList.json";
import Dialog from "../Common/Modal/Dialog";
import ListWrapper from "../List/ListWrapper";
import { KEY_CANCEL, KEY_SAVE, KEY_TITLE } from "@/constants/constant";
import type {
  Fields,
  FormHandle,
  ListType,
  Task,
  TaskType,
} from "@/types/types";

const Board = () => {
  const { state } = useBoard();
  const [showModal, setShowModal] = useState(false);
  const { addList, addTask, updateTask, moveTask } = useBoardActions();
  const {
    onDragStart,
    onDragEnter,
    onDragEnd,
    onDrop,
    dragData,
    dragOverData,
  } = useDragAndDrop();

  const formRef = useRef<FormHandle>(null);

  const handleOnDrop = () => {
    if (!dragData) return;

    onDrop((drag, over) => {
      if (!drag || !over) return;
      moveTask(
        drag.containerId,
        over.containerId,
        drag.id,
        drag.index,
        over.index ??
          state.find((l) => l.id === over.containerId)?.tasks.length ??
          0
      );
    });
  };

  useEffect(() => {
    if (showModal) {
      requestAnimationFrame(() => {
        formRef.current?.focus(KEY_TITLE);
      });
    }
  }, [showModal]);

  const onCloseModal = () => setShowModal(false);
  const onOpenModal = () => setShowModal(true);

  const handleAddList = () => {
    const form = formRef.current;
    const values = form?.get();
    if (!values) return;

    addList(values as ListType);
    form?.clear();
    setShowModal(false);
  };

  const handleAddTask = (idList: string, content: TaskType) => {
    addTask(idList, content);
  };

  const handleUpdateTask = (idList: string, data: Task) => {
    updateTask(idList, data);
  };

  return (
    <div className="flex gap-4 overflow-x-auto">
      {state.map((it) => (
        <div key={it.id}>
          <ListWrapper
            list={it}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            dragData={dragData}
            dragOverData={dragOverData}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDrop={handleOnDrop}
          />
        </div>
      ))}

      <div className="w-64 flex-none">
        {showModal ? (
          <Dialog
            onConfirm={handleAddList}
            onCancel={onCloseModal}
            confirmText={KEY_SAVE}
            cancelText={KEY_CANCEL}
          >
            <FormWrapper ref={formRef} fields={formFiels as Fields[]} />
          </Dialog>
        ) : (
          <div
            onClick={onOpenModal}
            className="w-full border-2 border-dashed rounded mt-2 p-2 flex items-center justify-center text-gray-400 cursor-pointer hover:border-blue-400 hover:text-blue-500"
          >
            {state.length === 0 ? "Crea una lista" : "Añade otra lista"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
