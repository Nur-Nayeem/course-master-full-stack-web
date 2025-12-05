import { useState } from "react";
import { QueryContext } from "./Contexts";

const QueryProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const queryObject = {
    search,
    setSearch,
    category,
    setCategory,
  };
  return <QueryContext value={queryObject}>{children}</QueryContext>;
};

export default QueryProvider;
