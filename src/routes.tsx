import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout";
import Register from "./pages/register";
import RouteProteject from "./context/RouteProteject";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: (
          <RouteProteject>
            <Register />
          </RouteProteject>
        ),
      },
    ],
  },
]);

export { router };
