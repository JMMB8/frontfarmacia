import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Grid,
  Divider,
} from "@mui/material";

function ListaProductos() {
  const [productos, setProductos] = useState([]);

  // 📌 Cargar productos al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/productos"
        );
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        fontWeight="bold"
        color="black"
        gutterBottom
        align="center"
        sx={{ mt: 5, mb: 4 }}
      >
        Lista de Productos
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginBottom={5}
      >
        {productos.map((producto) => (
          <Card
            key={producto.id}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: "10px",
              justifyContent: "space-between",
              p: 2,
              mb: 2,
              boxShadow: 3,
            }}
          >
            {/* Imagen del producto */}
            <CardMedia
              component="img"
              image={producto.imagen_url}
              alt={producto.nombre}
              sx={{
                width: 120,
                height: 120,
                objectFit: "cover",
                borderRadius: 1,
                mr: 2,
              }}
            />

            {/* Información del producto */}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" fontWeight="bold">
                {producto.nombre}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {producto.descripcion}
              </Typography>
              <Typography variant="h6" color="text.primary">
                Precio: ${producto.precio}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock: {producto.stock} unidades
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Laboratorio: {producto.laboratorio}
              </Typography>
            </CardContent>

            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

            {/* Botón de Modificar */}
            <CardActions>
              <Button
                component={Link}
                to={`/modificarproducto/${producto.id}`}
                variant="contained"
                sx={{
                  bgcolor: "#FF0000",
                  "&:hover": { bgcolor: "#B20000" },
                }}
              >
                Modificar
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default ListaProductos;