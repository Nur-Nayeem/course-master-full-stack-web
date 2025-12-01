import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const MainLayoute = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayoute;
