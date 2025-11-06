import { handleKey, Keys } from "@/utils/keyBoard";
import { TextField } from "../Common/Form/Fields/TextField";
import { useBoardActions, useOpen } from "@/hooks";
import { useState, useRef, useEffect } from "react";
import Dropdown from "../Common/DropDown/DropDown";

export type Board = {
  id: string;
  name: string;
};

type BoardHeaderProps = {
  currentBoard: Board | null;
  boards: Board[];
  onSwitchBoard: (boardId: string) => void;
};

const BoardSelector = (props: BoardHeaderProps) => {
  const { isOpen, onOpen, onClose } = useOpen();
  const [editName, setEditName] = useState(props.currentBoard?.name || "");

  const inputRef = useRef<HTMLInputElement>(null);
  const { updateBoard } = useBoardActions();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setEditName(props.currentBoard?.name || "");
  }, [props.currentBoard?.name]);

  const handleSave = () => {
    const name = editName.trim();
    if (name && props.currentBoard && name !== props.currentBoard.name) {
      updateBoard(props.currentBoard.id, { name });
    }
    onClose();
  };

  const handleCancel = () => {
    setEditName(props.currentBoard?.name || "");
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    handleKey(e, {
      [Keys.Enter]: { callback: handleSave },
      [Keys.Escape]: { callback: handleCancel },
    });
  };

  const onChangeName = (value: string) => {
    setEditName(value);
  };

  const handleBlur = () => {
    handleCancel();
  };

  return (
    <div className="inline-flex items-center gap-1">
      {!props.currentBoard ? (
        <p className="text-gray-500 italic">
          Selecciona un tablero para comenzar
        </p>
      ) : isOpen ? (
        <TextField
          inputRef={(el) => (inputRef.current = el)}
          id="board-name"
          name="board-name"
          value={editName}
          onChange={onChangeName}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="text-lg font-semibold text-gray-800 border-b-2 border-indigo-500 bg-transparent focus:outline-none"
        />
      ) : (
        <h1
          onClick={onOpen}
          className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors"
        >
          {props.currentBoard.name}
        </h1>
      )}

      <Dropdown
        enabled={!isOpen}
        currentOption={props.currentBoard}
        options={props.boards}
        onSelect={props.onSwitchBoard}
      />
    </div>
  );
};

export default BoardSelector;
