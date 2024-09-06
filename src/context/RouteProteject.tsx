import { ReactNode, useEffect } from "react";
import { useContexto } from "./ContextRegister";
import { useNavigate } from "react-router-dom";

interface ProviderProps {
  children: ReactNode;
}

export default function RouteProteject({ children }: ProviderProps) {
  const { dataAtual } = useContexto();
  const navigate = useNavigate();

  useEffect(() => {
    if (!dataAtual) {
      navigate("/", { replace: true });
    }
  }, [dataAtual, navigate]);

  
  return dataAtual ? <>{children}</> : null;
}
