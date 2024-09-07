import { ReactNode, createContext, useContext, useState } from "react";

interface ConteudoDataProps {
  dataAtual: string | undefined;
  recebeData: (data: string) => void;
  navegaHome: (data: Date) => void;
  trocaData: Date;
}

interface ProviderProps {
  children: ReactNode;
}

const ConteudoContext = createContext({} as ConteudoDataProps);

function ConteudoProvider({ children }: ProviderProps) {
  const [dataAtual, setDataAtual] = useState<string | undefined>(undefined);
  const [trocaData, setTrocaData] = useState<Date>(new Date());

  function recebeData(data: string) {
    setDataAtual(data);
  }

  function navegaHome(data: Date) {
    setTrocaData(data);
  }

  return (
    <ConteudoContext.Provider
      value={{ dataAtual, recebeData, navegaHome, trocaData }}
    >
      {children}
    </ConteudoContext.Provider>
  );
}

export default ConteudoProvider;

// eslint-disable-next-line react-refresh/only-export-components
export function useContexto() {
  return useContext(ConteudoContext);
}
