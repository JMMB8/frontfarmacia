// Confirmacion.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Confirmacion = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        ¡Pago Completado Exitosamente!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Gracias por tu compra. Hemos recibido tu pago y estamos procesando tu pedido.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Volver al Inicio
      </Button>
    </Box>
  );
};

export default Confirmacion;