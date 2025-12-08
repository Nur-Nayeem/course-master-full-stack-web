import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

const AuthLAyout = () => {
  return (
    <div>
      <header className="sticky top-0 z-50 w-full">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLAyout;
