// //prettier-ignore
// export type Action =
//   | { type: "CREATE_BOARD"; payload: { name: string } }
//   | { type: "ADD_LIST"; payload: ListType }
//   | { type: "DELETE_LIST"; payload: { idList: string } }
//   | { type: "UPDATE_LIST"; payload: { idList: string, data: Partial<List> } }
//   | { type: "ADD_TASK"; payload: { idList: string; content: TaskType } }
//   | { type: "TOGGLE_LIST_COLLAPSE"; payload: { idList: string } }
//   | { type: "UPDATE_TASK"; payload: { idList: string; data: Task } }
//   | { type: "DELETE_TASK"; payload: { idList: string; idTask: string } }
//   | { type: "MOVE_TASK"; payload: { fromList: string; toList: string; idTask: string; fromIndex: number; toIndex: number } }
//   | { type: "MOVE_LIST"; payload: { from: number; to: number } };

export type Priority = "Low" | "Medium" | "High" | undefined;

//NEW TYPES
// types/types.ts

// export interface Board {
//   id: string;
//   name: string;
//   createdAt: number;
//   lists: List[];
// }

// export interface AppState {
//   boards: Board[];
//   currentBoardId: string | null;
// }

export interface List {
  id: string;
  title: string;
  color?: string;
  position: number;
  collapse: boolean;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  createdAt: number;
  lists: List[];
}

export interface AppState {
  boards: Board[];
  currentBoardId: string | null;
}

export type Action =
  | { type: "CREATE_BOARD"; payload: { name: string } }
  | {
      type: "UPDATE_BOARD";
      payload: { boardId: string; data: { name: string } };
    }
  | { type: "DELETE_BOARD"; payload: { boardId: string } }
  | { type: "SWITCH_BOARD"; payload: { boardId: string } }
  | { type: "ADD_LIST"; payload: { boardId: string; data: ListType } }
  | { type: "DELETE_LIST"; payload: { boardId: string; idList: string } }
  | {
      type: "UPDATE_LIST";
      payload: { boardId: string; idList: string; data: Partial<List> };
    }
  | {
      type: "ADD_TASK";
      payload: { boardId: string; idList: string; content: TaskType };
    }
  | {
      type: "TOGGLE_LIST_COLLAPSE";
      payload: { boardId: string; idList: string };
    }
  | {
      type: "UPDATE_TASK";
      payload: { boardId: string; idList: string; data: Task };
    }
  | {
      type: "DELETE_TASK";
      payload: { boardId: string; idList: string; idTask: string };
    }
  | {
      type: "MOVE_TASK";
      payload: {
        boardId: string;
        fromList: string;
        toList: string;
        idTask: string;
        fromIndex: number;
        toIndex: number;
      };
    }
  | {
      type: "MOVE_LIST";
      payload: { boardId: string; from: number; to: number };
    };

export interface Task {
  id: string;
  task: string;
  description?: string;
  priority?: Priority;
  position: number;
  status: boolean;
}

// export interface List {
//   id: string;
//   title: string;
//   color?: string;
//   position: number;
//   collapse: boolean;
//   tasks: Task[];
// }

export type ListType = Omit<List, "id">;
export type TaskType = Omit<Task, "id">;

type FieldType = "text" | "number" | "select" | "textarea" | "color";

export interface Fields {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  hidden?: boolean;
  options?: string[];
  required?: boolean;
  errorMessage?: string;
}

export interface FormHandle {
  get: () => Record<string, unknown> | null;
  clear: () => void;
  focus: (field: string) => void;
}

export type DragTaskAndList = {
  listId: string;
  taskId?: string;
  index: number;
  typeMovement: "Task" | "List";
};

export type DragAndDropTypes = {
  dragData: DragTaskAndList | null;
  dragOver: DragTaskAndList | null;
  onDragStart: (e: React.DragEvent, data: DragTaskAndList) => void;
  onDragEnter: (data: DragTaskAndList) => void;
  onDragEnd: () => void;
  onDrop: (
    callback: (drag: DragTaskAndList, over: DragTaskAndList) => void
  ) => void;
};

export type Option = {
  id: string;
  name: string;
};
