export type Priority = "No priority" | "Low" | "Medium" | "High";

export interface Task {
  id: string;
  task: string;
  description?: string;
  priority?: Priority;
  position: number;
  status?: boolean;
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

//prettier-ignore
export interface DragOverData {
  containerId: string;
  index: number;
}

export interface DragData extends DragOverData {
  id: string;
}

export type DragAndDropTypes = {
  dragData: DragData | null;
  dragOverData: DragOverData | null;
  onDragEnd: () => void;
  onDragStart: (fromList: string, task: Task, e: React.DragEvent) => void;
  onDragEnter: (listId: string, taskIndex: number) => void;
  onDrop: (toList: string, toIndex: number) => void;
};
