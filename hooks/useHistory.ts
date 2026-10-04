import { useState } from 'react';

export const useHistory = (initialState: any) => {
  const [history, setHistory] = useState<any[]>([initialState]);
  const [pointer, setPointer] = useState(0);

  const push = (newState: any) => {
    if (JSON.stringify(newState) === JSON.stringify(history[pointer])) return;
    const newHistory = history.slice(0, pointer + 1);
    newHistory.push(newState);
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setPointer(newHistory.length - 1);
  };

  const undo = () => {
    if (pointer > 0) setPointer(pointer - 1);
  };

  const redo = () => {
    if (pointer < history.length - 1) setPointer(pointer + 1);
  };

  return { state: history[pointer], push, undo, redo, canUndo: pointer > 0, canRedo: pointer < history.length - 1 };
};