import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className="p-10 h-screen w-screen sm:px-36 py-10" id="containerPadrao">{children}</div>;
}

export default Container;
