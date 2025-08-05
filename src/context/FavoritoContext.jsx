import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext"; // Importa el contexto de autenticación

// Crear el contexto
const FavoritoContext = createContext();

// Crear el provider
const FavoritoProvider = ({ children }) => {
  const { user } = useAuth(); // Obtener el usuario actual
  const [favoritos, setFavoritos] = useState([]);

  // Obtener los favoritos del usuario al cargar el componente
  useEffect(() => {
    if (user) {
      const fetchFavoritos = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("http://localhost:3000/api/favoritos", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Error al obtener los favoritos");
          }

          const data = await response.json();
          setFavoritos(data);
        } catch (error) {
          console.error("Error al obtener los favoritos:", error);
        }
      };

      fetchFavoritos();
    } else {
      setFavoritos([]); // Si no hay usuario, vaciar la lista de favoritos
    }
  }, [user]);

  // Función para agregar un producto a favoritos
  const agregarFavorito = async (productoId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ producto_id: productoId }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar a favoritos");
      }

      setFavoritos((prev) => [...prev, productoId]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para eliminar un producto de favoritos
  const eliminarFavorito = async (productoId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/favoritos/${productoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar de favoritos");
      }

      setFavoritos((prev) => prev.filter((id) => id !== productoId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <FavoritoContext.Provider
      value={{
        favoritos,
        agregarFavorito,
        eliminarFavorito,
      }}
    >
      {children}
    </FavoritoContext.Provider>
  );
};

// Hook personalizado para usar el contexto
const useFavorito = () => {
  return useContext(FavoritoContext);
};

export { FavoritoProvider, useFavorito };