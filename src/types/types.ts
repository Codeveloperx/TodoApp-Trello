export type Priority = "No priority" | "Low" | "Medium" | "High";

export interface Task {
  id: string;
  task: string;
  description?: string;
  priority?: Priority;
  status?: boolean;
}

export interface List {
  id: number;
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
