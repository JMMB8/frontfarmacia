import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Card as MuiCard, Typography, Button, Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const CarritoCard = ({
  id,
  nombre,
  principio_activo,
  precio,
  cantidad,
  imagen_url,
  tipoPrecio,
}) => {
  const { incrementarCantidad, disminuirCantidad, eliminarDelCarrito } =
    useContext(CarritoContext);

  return (
    <MuiCard
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        width: "100%",
        maxWidth: "800px",
        padding: 2,
        marginBottom: 2,
        boxShadow: 3,
        gap: 2
      }}
    >
      {/* Imagen del Producto */}
      <Box sx={{ flex: 1 }}>
        <img
          src={imagen_url || "/placeholder-product.png"}
          alt={nombre}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </Box>

      {/* Información del Producto */}
      <Box sx={{ flex: 3, textAlign: { xs: "center", sm: "left" } }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{nombre}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          {principio_activo}
        </Typography>
        <Typography variant="body1">
          <strong>Precio:</strong> S/{Number(precio).toFixed(2)} ({tipoPrecio})
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Subtotal:</strong> S/{(precio * cantidad).toFixed(2)}
        </Typography>
      </Box>

      {/* Controles de Cantidad */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => disminuirCantidad(id, tipoPrecio)}
            sx={{
              color: "red",
              "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.1)" },
            }}
          >
            −
          </IconButton>
          
          <Typography variant="h6" sx={{ minWidth: '30px', textAlign: 'center' }}>
            {cantidad}
          </Typography>
          
          <IconButton
            onClick={() => incrementarCantidad(id, tipoPrecio)}
            sx={{
              color: "red",
              "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.1)" },
            }}
          >
            +
          </IconButton>
        </Box>

        <IconButton
          onClick={() => eliminarDelCarrito(id, tipoPrecio)}
          sx={{ color: "red" }}
        >
          <DeleteIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>Eliminar</Typography>
        </IconButton>
      </Box>
    </MuiCard>
  );
};

export default CarritoCard;