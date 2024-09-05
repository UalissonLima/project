import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className="p-10 bg-bgContainer h-screen w-screen">{children}</div>;
}

export default Container;
