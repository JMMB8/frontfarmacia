import React, { useContext } from "react";
import CardCarritoList from "../components/CardCarritoList";
import { Box, Typography, Button } from "@mui/material";
import { CarritoContext } from "../context/CarritoContext";

const Carrito = () => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);

  return (
    <Box sx={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px", paddingTop: "20px" }}>
        🛒 Tu Carrito de Compras
      </Typography>
      
      {carrito.length > 0 && (
        <Button
          variant="outlined"
          color="error"
          onClick={vaciarCarrito}
          sx={{ mb: 3 }}
        >
          Vaciar Carrito
        </Button>
      )}
      
      <CardCarritoList />
    </Box>
  );
};

export default Carrito;