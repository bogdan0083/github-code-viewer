import * as React from "react";

type Action = { type: "increment" } | { type: "decrement" };
type Dispatch = (action: Action) => void;
type State = { count: number };
type PaletteModeProviderProps = { children: React.ReactNode };

const PaletteModeStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function countReducer(state: State, action: Action) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function PaletteModeProvider({ children }: PaletteModeProviderProps) {
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <PaletteModeStateContext.Provider value={value}>
      {children}
    </PaletteModeStateContext.Provider>
  );
}

function usePaletteMode() {
  const context = React.useContext(PaletteModeStateContext);
  if (context === undefined) {
    throw new Error("usePaletteMode must be used within a PaletteModeProvider");
  }
  return context;
}

export { PaletteModeProvider, usePaletteMode };
