import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";

export const useBoard = () => useContext(BoardContext);
