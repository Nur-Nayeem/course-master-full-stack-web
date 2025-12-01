import React from "react";
import { Outlet } from "react-router";

const MainLayoute = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayoute;
