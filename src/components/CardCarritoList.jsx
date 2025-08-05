import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CarritoCard from "./CarritoCard";
import { Box, Typography, Button, Divider } from "@mui/material";

const CardCarritoList = () => {
  const { carrito, calcularTotal } = useContext(CarritoContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePagar = () => {
    if (!user) {
      alert("Debes iniciar sesión para continuar con la compra.");
      navigate("/login", { 
        state: { 
          from: "/carrito",
          message: "Por favor inicia sesión para completar tu compra"
        } 
      });
    } else {
      navigate("/pagos", {
        state: {
          productos: [...carrito], // Usa una copia del array
          total: calcularTotal().toFixed(2),
        },
        replace: true // Evita que el usuario vuelva atrás a la página vacía
      });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      width="100%"
    >
      {carrito.length === 0 ? (
        <Typography variant="h6" sx={{ my: 4 }}>
          Tu carrito está vacío
        </Typography>
      ) : (
        <>
          {carrito.map((producto) => (
            <React.Fragment key={`${producto.id}-${producto.tipoPrecio}`}>
              <CarritoCard
                id={producto.id}
                imagen_url={producto.imagen_url}
                nombre={producto.nombre}
                principio_activo={producto.principio_activo}
                precio={producto.precio}
                cantidad={producto.cantidad}
                tipoPrecio={producto.tipoPrecio}
              />
              <Divider sx={{ width: '80%', my: 1 }} />
            </React.Fragment>
          ))}

          <Typography variant="h5" sx={{ mt: 3, fontWeight: 'bold' }}>
            Total: S/{calcularTotal().toFixed(2)}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#FF0000",
                "&:hover": { backgroundColor: "#CC0000" },
                fontWeight: "bold",
                textTransform: "none",
                fontSize: 18,
                px: 4,
                py: 1
              }}
              onClick={handlePagar}
            >
              Proceder al Pago
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: "#FF0000",
                color: "#FF0000",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: 18,
                px: 4,
                py: 1,
                "&:hover": { borderColor: "#CC0000" }
              }}
              onClick={() => navigate("/productos")}
            >
              Seguir Comprando
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CardCarritoList;