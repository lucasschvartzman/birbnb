import { Outlet } from "react-router";
import NavBar from "../../components/navbar/NavBar";

function Layout() {
  return (
    <>
      <NavBar/>
      <Outlet />
    </>
  )
}

export default Layout;