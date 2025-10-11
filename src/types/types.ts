//prettier-ignore
export type Action =
  | { type: "ADD_LIST"; payload: ListType }
  | { type: "DELETE_LIST"; payload: { idList: string } }
  | { type: "ADD_TASK"; payload: { idList: string; content: TaskType } }
  | { type: "UPDATE_TASK"; payload: { idList: string; data: Task } }
  | { type: "DELETE_TASK"; payload: { idList: string; idTask: string } }
  | { type: "MOVE_TASK"; payload: { fromList: string; toList: string; idTask: string; fromIndex: number; toIndex: number } };

export type Priority = "Low" | "Medium" | "High" | undefined;

export interface Task {
  id: string;
  task: string;
  description?: string;
  priority?: Priority;
  position: number;
  status: boolean;
}

export interface List {
  id: string;
  title: string;
  color?: string;
  tasks: Task[];
}

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

export interface TaskWithList extends Task {
  listId: string;
}

export type DragTaskData = {
  listId: string;
  taskId?: string;
  index: number;
};

export type DragAndDropTypes = {
  dragData: DragTaskData | null;
  dragOver: DragTaskData | null;
  onDragStart: (e: React.DragEvent, data: DragTaskData) => void;
  onDragEnter: (data: DragTaskData) => void;
  onDragEnd: () => void;
  onDrop: (callback: (drag: DragTaskData, over: DragTaskData) => void) => void;
};

export type ActionsTask = {
  onAddTask: (idList: string, data: TaskType) => void;
  onUpdateTask: (idList: string, data: Task) => void;
  onMoveTask: (
    fromList: string,
    toList: string,
    taskId: string,
    fromIndex: number,
    toIndex: number
  ) => void;
};
