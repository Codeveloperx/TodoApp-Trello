import { useState } from "react";

const useOpen = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};

export default useOpen;
