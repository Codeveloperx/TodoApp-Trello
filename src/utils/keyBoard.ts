import { KEY_ENTER, KEY_ESC } from "@/constants/constant";

export const Keys = {
  Enter: KEY_ENTER,
  Escape: KEY_ESC,
} as const;

export type Keys = (typeof Keys)[keyof typeof Keys];

type KeyAction = {
  callback: () => void;
  preventDefault?: boolean;
};

type KeyMap = Partial<Record<Keys, KeyAction>>;

export const handleKey = (e: React.KeyboardEvent, keyMap: KeyMap) => {
  const action = keyMap[e.key as Keys];
  if (!action) return;

  if (action.preventDefault) e.preventDefault();
  action.callback();
};
