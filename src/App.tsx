import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import ConteudoProvider from "./context/ContextRegister";

function App() {
  return (
    <ConteudoProvider>
      <RouterProvider router={router} />;
    </ConteudoProvider>
  );
}

export default App;
