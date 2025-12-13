import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import AuthProvider from "./context/AuthContext.jsx";
import router from "./Routes/Route.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "./context/QueryContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import DashBoardContextProvider from "./context/DashBoardContextProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <QueryProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <DashBoardContextProvider>
              <RouterProvider router={router} />
            </DashBoardContextProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </QueryProvider>
    </QueryClientProvider>
  </StrictMode>
);
