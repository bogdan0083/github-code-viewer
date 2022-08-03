import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";

const defaultState = {
  isOpen: false,
};

const SideNavDispatchContext = createContext<Dispatch<any> | undefined>(
  undefined
);

const SidenavContext = createContext(defaultState);

export const SidenavContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useState(defaultState);

  return (
    <SideNavDispatchContext.Provider value={setState}>
      <SidenavContext.Provider value={state}>
        {children}
      </SidenavContext.Provider>
    </SideNavDispatchContext.Provider>
  );
};

export const useSidenavState = () => {
  const context = useContext(SidenavContext);
  if (context === undefined) {
    throw new Error(
      "useSidenavState must be used within a SidenavContextProvider"
    );
  }
  return context;
};

export const useSidenavDispatch = () => {
  const context = useContext(SideNavDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useSidenavDispatch must be used within a SidenavContextProvider"
    );
  }
  return context;
};
