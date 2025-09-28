import { useEffect, useRef, useState } from "react";
import { useBoard } from "../../context/BoardContext";
import ListBoard from "../List/List";
import formFiels from "../Form/addList.json";
import { FormWrapper } from "../Form/FormWrapper";
import type {
  Fields,
  FormHandle,
  ListType,
  Task,
  TaskType,
} from "../../types/types";
import {
  ADD_COLUMN,
  ADD_TASK,
  KEY_CANCEL,
  KEY_SAVE,
  KEY_TITLE,
  MOVE_TASK,
  UPDATE_TASK,
} from "../../constants/constant";
import Dialog from "../Modal/DIalog";

const BoardBody = () => {
  const { state, dispatch } = useBoard();
  const [showModal, setShowModal] = useState(false);

  const formRef = useRef<FormHandle>(null);

  useEffect(() => {
    if (showModal) {
      requestAnimationFrame(() => {
        formRef.current?.focus(KEY_TITLE);
      });
    }
  }, [showModal]);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onOpenModal = () => {
    setShowModal(true);
  };

  const handleAddList = () => {
    const form = formRef.current;
    const values = form?.get();

    if (!values) return;
    dispatch({ type: ADD_COLUMN, payload: values as ListType });

    form?.clear();
    setShowModal(false);
  };

  const handleAddTask = (idList: number, content: TaskType) => {
    dispatch({ type: ADD_TASK, payload: { idList, content } });
  };

  const handleUpdateTask = (idList: number, data: Task) => {
    dispatch({ type: UPDATE_TASK, payload: { idList, data } });
  };

  //FIXME: Validar esta funcionalidad.
  const handleMoveTask = (fromList: number, toList: number, idTask: string) => {
    const fromCol = state.find((l) => l.id === fromList);
    if (!fromCol) return;

    const fromIndex = fromCol.tasks.findIndex((t) => t.id === idTask);

    dispatch({
      type: MOVE_TASK,
      payload: { fromList, toList, idTask, fromIndex, toIndex: 0 },
    });
  };

  return (
    <div className="flex gap-4 overflow-x-auto items-start">
      {state.map((it) => (
        <div key={it.id} className="w-64 flex-none">
          <ListBoard
            list={it}
            onAddTask={handleAddTask}
            onAddColumn={() => setShowModal(true)}
            onUpdateTask={handleUpdateTask}
            onMoveTask={handleMoveTask}
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

export default BoardBody;
