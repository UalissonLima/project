import { Outlet } from "react-router-dom";
import Header from "../header";
import Container from "../container";

function Layout() {
  return (
    <>
      <Container>
        <Header />
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
