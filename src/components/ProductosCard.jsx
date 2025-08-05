import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { useFavorito } from "../context/FavoritoContext"; // Importa el contexto de favoritos
import { useAuth } from "../context/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Button,
  Box,
  CardMedia,
  IconButton,
} from "@mui/material";

const ProductosCard = ({
  id,
  nombre,
  principio_activo,
  precio_caja,
  imagen_url,
}) => {
  const { user } = useAuth();
  const { favoritos, agregarFavorito, eliminarFavorito } = useFavorito(); // Usa el contexto de favoritos
  const navigate = useNavigate();

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }

    if (favoritos.includes(id)) {
      eliminarFavorito(id);
    } else {
      agregarFavorito(id);
    }
  };

  const { agregarAlCarrito, carrito } = useContext(CarritoContext);

  const irADetalle = () => {
    navigate(`/producto/${id}`);
  };

  const agregarAlCarro = (e) => {
    e.stopPropagation();
    agregarAlCarrito({
      id,
      nombre,
      principio_activo,
      precio: precio_caja,
      tipoPrecio: "caja",
      imagen_url,
    });
  };

  const productoEnCarrito = carrito.some((producto) => producto.id === id);

  return (
    <MuiCard
      onClick={irADetalle}
      sx={{
        width: "100%",
        maxWidth: 1000,
        margin: 2,
        boxShadow: 3,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "auto",
        borderRadius: "8px",
      }}
    >
      <CardMedia
        component="img"
        image={imagen_url || "https://via.placeholder.com/345x345"}
        alt={nombre}
        sx={{
          width: "100%",
          objectFit: "cover",
        }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <Box>
          <Typography variant="h5">{nombre}</Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Principio Activo:</strong> {principio_activo}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: "auto",
            textAlign: "center",
            pt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={handleFavorite}
            color={favoritos.includes(id) ? "error" : "default"}
            sx={{ mr: 2 }}
          >
            {favoritos.includes(id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          <Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Precio:</strong> S/
              {precio_caja ? Number(precio_caja).toFixed(2) : "N/A"}
            </Typography>

            {productoEnCarrito ? (
              <Typography variant="body2" color="text.secondary">
                Producto en el carrito
              </Typography>
            ) : (
              <Button
                variant="contained"
                onClick={agregarAlCarro}
                sx={{
                  backgroundColor: "#FF0000",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: "normal",
                  fontSize: "12px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#CC0000" },
                }}
              >
                🛒 Agregar al carro
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </MuiCard>
  );
};

export default ProductosCard;