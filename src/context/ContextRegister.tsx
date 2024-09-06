import { ReactNode, createContext } from "react";

interface ProviderProps {
  children: ReactNode;
}

interface ConteudoDataProps {
    titulo: string;
    data: string;

}

const ConteudoContext = createContext({}) as ConteudoDataProps;

function ConteudoProvider({ children }: ProviderProps) {
  return
  ( <ConteudoContext.Provider value={}>

    {children}
  </ConteudoContext.Provider>)
}

export default ConteudoProvider
