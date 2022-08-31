import * as React from "react";

export enum PaletteMode {
  System,
  Light,
  Dark
}

type Action = { type: "set_palette_mode", value: PaletteMode };
type Dispatch = (action: Action) => void;
type State = { paletteMode: PaletteMode };
type PaletteModeProviderProps = { children: React.ReactNode };

const PaletteModeStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function paletteModeReducer(state: State, action: Action) {
  switch (action.type) {
    case "set_palette_mode": {
      return { paletteMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function PaletteModeProvider({ children }: PaletteModeProviderProps) {
  const [state, dispatch] = React.useReducer(paletteModeReducer, { paletteMode: PaletteMode.System });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <PaletteModeStateContext.Provider value={value}>
      {children}
    </PaletteModeStateContext.Provider>
  );
}

function usePaletteMode(): [PaletteMode, Dispatch] {
  const context = React.useContext(PaletteModeStateContext);
  if (context === undefined) {
    throw new Error("usePaletteMode must be used within a PaletteModeProvider");
  }
  return [context.state.paletteMode, context.dispatch];
}

export { PaletteModeProvider, usePaletteMode };
