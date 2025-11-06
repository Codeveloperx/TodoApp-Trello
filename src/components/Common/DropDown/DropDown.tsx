import { ChevronDown } from "lucide-react";
import { useDropdown } from "@/hooks/useDropdown";
import { useOpen } from "@/hooks";
import type { Option } from "@/types/types";

type DropdownProps = {
  currentOption?: Option | null;
  options: Option[];
  width?: string;
  align?: "left" | "right";
  enabled?: boolean;
  onSelect: (id: string) => void;
};

const Dropdown = (props: DropdownProps) => {
  const {
    currentOption,
    options = [],
    align = "left",
    width = "w-48",
    enabled = true,
    onSelect,
  } = props;

  const { isOpen, onToggle, onClose } = useOpen();
  const dropdownRef = useDropdown(onClose, isOpen);

  const handleSelect = (id: string) => {
    onSelect(id);
    onClose();
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {enabled && (
        <button
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Open menú"
          onClick={onToggle}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <ChevronDown
            className={`w-5 h-5 text-gray-700 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      )}

      {isOpen && (
        <div
          className={`absolute z-10 mt-2 ${width} ${
            align === "right" ? "right-0" : "left-0"
          } bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden`}
        >
          <ul role="listbox">
            {options.map((option) => (
              <li key={option.id}>
                <button
                  onClick={() => handleSelect(option.id)}
                  className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 ${
                    option.id === currentOption?.id
                      ? "bg-indigo-100 text-indigo-700 font-semibold"
                      : ""
                  }`}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
