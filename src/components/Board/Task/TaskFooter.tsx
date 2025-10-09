import { CalendarDays } from "lucide-react";
import { getPriorityColor } from "@/utils/getPriorityColor";
import { KEY_NO_PRIORITY } from "@/constants/constant";
import type { Priority } from "@/types/types";

type Props = {
  priority: Priority;
  date?: string;
};

export const TaskFooter = ({ priority, date = "Sep 21" }: Props) => (
  <div className="flex items-center justify-between mt-4">
    <div className="flex items-center gap-2">
      <CalendarDays className="w-5 h-5 text-gray-500" />
      <span className="text-xs text-gray-500 font-semibold">{date}</span>
    </div>
    <span
      className={`inline-block text-xs font-semibold px-2 py-1 rounded-md ${getPriorityColor(
        priority
      )}`}
    >
      {priority || KEY_NO_PRIORITY}
    </span>
  </div>
);
