import React, { useState } from "react";
import { AdminContext } from "./Contexts";

const AdminContextProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const adminContextData = {
    collapsed,
    setCollapsed,
  };
  return <AdminContext value={adminContextData}>{children}</AdminContext>;
};

export default AdminContextProvider;
