import { KEY_HIGH, KEY_LOW, KEY_MEDIUM } from "../constants/constant";
import type { Priority } from "../types/types";

export const colors: Record<string, string> = {
  [KEY_LOW]: "bg-green-200 text-green-800",
  [KEY_MEDIUM]: "bg-yellow-200 text-yellow-800",
  [KEY_HIGH]: "bg-red-200 text-red-800",
};

export const getPriorityColor = (priority: Priority): string => {
  return priority ? colors[priority] : "bg-gray-200 text-gray-800";
};
