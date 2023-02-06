import { createContext, useState } from "react";

export const PlayStateContext = createContext();

export function PlayStateProvider({ children }) {
  const [playState, setPlayState] = useState(false);

  return (
    <PlayStateContext.Provider value={{ playState, setPlayState }}>
      {children}
    </PlayStateContext.Provider>
  );
}
