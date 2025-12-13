import React, { useState } from "react";
import { DashBoardContext } from "./Contexts";

const DashBoardContextProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const adminContextData = {
    collapsed,
    setCollapsed,
  };
  return (
    <DashBoardContext value={adminContextData}>{children}</DashBoardContext>
  );
};

export default DashBoardContextProvider;
