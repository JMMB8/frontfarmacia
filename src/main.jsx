import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import { FavoritoProvider } from "./context/FavoritoContext"; // Importa el FavoritoProvider


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <FavoritoProvider>
        <App />
        </FavoritoProvider>
      </CarritoProvider>
    </AuthProvider>
  </StrictMode>
);
