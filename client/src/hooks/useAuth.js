import { use } from "react";
import { AuthContext } from "../context/Contexts";

export const useAuth = () => use(AuthContext);
