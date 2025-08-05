import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import { Favorite, Delete } from "@mui/icons-material";

function Favorito() {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Obtener la lista de favoritos al cargar el componente
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/favoritos", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los favoritos");
        }

        const data = await response.json();
        console.log("Datos recibidos:", data); // Verifica los datos recibidos
        setFavoritos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, []);

  // Eliminar un producto de favoritos
  const handleRemoveFavorite = async (producto_id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/favoritos/${producto_id}`,
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

      setFavoritos((prev) =>
        prev.filter((favorito) => favorito.producto_id !== producto_id)
      );
      setSuccess("Producto eliminado de favoritos");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Mis Favoritos
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {favoritos.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No tienes productos favoritos.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {favoritos.map((favorito) => (
              <Grid item key={favorito.producto_id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={favorito.imagen_url}
                    alt={favorito.nombre}
                  />
                  <CardContent>
                    <Typography variant="h6">{favorito.nombre}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {/* Mostrar el precio */}
                      Precio por caja: {favorito.precio_caja ? `S/${favorito.precio_caja}` : "No disponible"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveFavorite(favorito.producto_id)}
                    >
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default Favorito;