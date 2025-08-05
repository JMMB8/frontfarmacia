import React, { useEffect, useState } from "react";
import ProductosCard from "./ProductosCard";
import { Box, Typography, CircularProgress } from "@mui/material";

const ProductosList = ({ categoriaSeleccionada }) => {
  const [productos, setProductos] = useState([]); // Estado para guardar la lista de productos
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de los productos
  const [favoritos, setFavoritos] = useState([]); // Estado para guardar la lista de favoritos
  const [error, setError] = useState(null); // Estado para manejar errores

  // Obtener los productos desde el backend al montar el componente o cuando cambia la categoría seleccionada
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/productos");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log("Productos recibidos:", data);

        // Filtrar productos por categoría si hay una categoría seleccionada
        if (categoriaSeleccionada) {
          const productosFiltrados = data.filter(
            (producto) => producto.categoria === categoriaSeleccionada
          );
          setProductos(productosFiltrados);
        } else {
          // Mostrar todos los productos si no hay categoría seleccionada
          setProductos(data);
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError(error.message);
      } finally {
        setLoading(false); // Finaliza la carga cuando la petición termina
      }
    };

    fetchProductos();

    // Obtener la lista de favoritos del usuario (solo si está logueado)
    const token = localStorage.getItem("token");
    if (token) {
      fetchFavoritos();
    }
  }, [categoriaSeleccionada]); // Dependencia: se ejecuta cuando cambia la categoría seleccionada

  // Función para obtener la lista de favoritos del usuario
  const fetchFavoritos = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // Obtén el ID del usuario
      if (!token || !userId) {
        throw new Error("Usuario no autenticado");
      }

      // Hacer la solicitud a la API
      const response = await fetch(`http://localhost:3000/api/favoritos?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        throw new Error(errorData.message || "Error al obtener los favoritos");
      }

      const data = await response.json();
      setFavoritos(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message); // Maneja el error
    }
  };

  // Función para agregar un producto a favoritos
  const handleAddFavorite = async (productoId) => {
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al agregar a favoritos");
      }

      // Actualizar la lista de favoritos
      fetchFavoritos();
    } catch (error) {
      console.error("Error:", error);
      setError(error.message); // Maneja el error
    }
  };

  // Función para eliminar un producto de favoritos
  const handleRemoveFavorite = async (productoId) => {
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar de favoritos");
      }

      // Actualizar la lista de favoritos
      fetchFavoritos();
    } catch (error) {
      console.error("Error:", error);
      setError(error.message); // Maneja el error
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
        justifyContent: "center",
        mt: 4,
        p: 2,
      }}
    >
      {/* Indicador de carga mientras se obtienen los productos */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      ) : productos.length === 0 ? (
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Typography variant="h6" color="textSecondary">
            No hay productos disponibles en esta categoría.
          </Typography>
        </Box>
      ) : (
        // Renderiza la lista de productos
        productos.map((producto) => {
          const isFavorite = favoritos.some(
            (favorito) => favorito.producto_id === producto.id
          );
          return (
            <Box key={producto.id} sx={{ display: "flex", justifyContent: "center" }}>
              <ProductosCard
                id={producto.id}
                nombre={producto.nombre}
                principio_activo={producto.principio_activo}
                precio_caja={producto.precio_caja}
                imagen_url={producto.imagen_url}
                onAddFavorite={handleAddFavorite} // Pasa la función para agregar a favoritos
                onRemoveFavorite={handleRemoveFavorite} // Pasa la función para eliminar de favoritos
                isFavorite={isFavorite} // Indica si el producto está en favoritos
              />
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default ProductosList;