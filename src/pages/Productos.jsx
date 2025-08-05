import React, { useEffect, useState } from "react";
import ProductosCard from "../components/ProductosCard";
import Carrusel from "../components/Carrusel";
import { Box, Typography, CircularProgress } from "@mui/material";
import { CarritoContext } from "../context/CarritoContext";

const Productos = ({ categoriaSeleccionada }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/productos");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log("Productos recibidos:", data);

        if (categoriaSeleccionada) {
          const productosFiltrados = data.filter(
            (producto) => producto.categoria_id === categoriaSeleccionada
          );
          setProductos(productosFiltrados);
        } else {
          setProductos(data);
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoriaSeleccionada]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categorias");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const productosPorCategoria = productos.reduce((acc, producto) => {
    const categoriaId = producto.categoria_id;
    if (!acc[categoriaId]) {
      acc[categoriaId] = [];
    }
    acc[categoriaId].push(producto);
    return acc;
  }, {});

  const handleAddFavorite = async (productoId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        throw new Error("Error al eliminar de favoritos");
      }

      setFavoritos((prev) => prev.filter((id) => id !== productoId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box>
      <Carrusel />

      {Object.entries(productosPorCategoria).map(
        ([categoriaId, productosCategoria]) => {
          const nombreCategoria =
            categorias.find((cat) => cat.id === parseInt(categoriaId))
              ?.nombre || `Categoría ${categoriaId}`;

          return (
            <Box key={categoriaId} sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
                {nombreCategoria}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "16px",
                  justifyContent: "center",
                  p: 2,
                }}
              >
                {productosCategoria.slice(0, 8).map((producto) => (
                  <Box
                    key={producto.id}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <ProductosCard
                      id={producto.id}
                      nombre={producto.nombre}
                      principio_activo={producto.principio_activo}
                      precio_caja={producto.precio_caja}
                      imagen_url={producto.imagen_url}
                      onAddFavorite={handleAddFavorite}
                      onRemoveFavorite={handleRemoveFavorite}
                      isFavorite={favoritos.includes(producto.id)}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          );
        }
      )}

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
            No hay productos disponibles.
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default Productos;