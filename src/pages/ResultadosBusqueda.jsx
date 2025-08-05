import React from "react";
import { useLocation } from "react-router-dom";
import ProductosCard from "../components/ProductosCard";
import { Box, Typography } from "@mui/material";

const ResultadosBusqueda = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const resultados = location.state?.results || [];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Resultados de búsqueda para: "{query}"
      </Typography>

      {resultados.length === 0 ? (
        <Typography>No se encontraron productos.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {resultados.map((producto) => (
            <ProductosCard
              key={producto.id}
              id={producto.id}
              nombre={producto.nombre}
              principio_activo={producto.principio_activo}
              precio_caja={producto.precio_caja}
              imagen_url={producto.imagen_url}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ResultadosBusqueda;