/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import "./Layout.scss";
import Header from "./Header";
import { useSelector } from "react-redux";

function Layout() {
  const authen = useSelector(state => state.authenReducer);
  
  return (
    <>
      <Header />
      <div className="main">
        <Outlet />
      </div>
      <footer className="footer">
        Copyright 2023 by 28Tech
      </footer>
    </>
  )
}

export default Layout;