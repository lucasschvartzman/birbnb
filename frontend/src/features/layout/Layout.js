import { Outlet } from "react-router";
import ApplicationBar from "../../components/ApplicationBar";

function Layout() {
  return (
    <>
      <ApplicationBar/>
      <Outlet />
    </>
  )
}

export default Layout;