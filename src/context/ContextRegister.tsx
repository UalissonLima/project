import { ReactNode, createContext, useContext, useState } from "react";

interface ConteudoDataProps {
  dataAtual: string | undefined;
  recebeData: (data: string) => void; // Adicione o tipo para o parâmetro
}

interface ProviderProps {
  children: ReactNode;
}

const ConteudoContext = createContext({} as ConteudoDataProps);

function ConteudoProvider({ children }: ProviderProps) {
  const [dataAtual, setDataAtual] = useState<string | undefined>(undefined); // Inicialize como undefined

  function recebeData(data: string) {
    setDataAtual(data);
  }

  return (
    <ConteudoContext.Provider value={{ dataAtual, recebeData }}>
      {children}
    </ConteudoContext.Provider>
  );
}

export default ConteudoProvider;

export function useContexto() {
  return useContext(ConteudoContext);
}
