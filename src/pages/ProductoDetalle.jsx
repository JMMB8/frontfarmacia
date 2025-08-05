import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button, Box, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { CarritoContext } from "../context/CarritoContext";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [zoomStyle, setZoomStyle] = useState({ transform: "scale(1)" });
  const [tipoPrecio, setTipoPrecio] = useState("caja");
  
  useEffect(() => {
    fetch(`http://localhost:3000/api/productos/${id}`)
      .then((response) => {
        if (!response.ok) {
          setError(
            `Error: No se pudo obtener el producto (${response.status})`
          );
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setProducto(data);
        }
      })
      .catch(() => setError("Error de conexión con el servidor"))
      .finally(() => setLoading(false));
  }, [id]);

  //Codigo para el zoom
  const handleMouseMove = (event) => {
    const { clientX, clientY, target } = event.nativeEvent;
    const { left, top, width, height } = target.getBoundingClientRect();
    const xPercent = ((clientX - left) / width) * 100;
    const yPercent = ((clientY - top) / height) * 100;
    setZoomStyle({
      transform: "scale(2)",
      transformOrigin: `${xPercent}% ${yPercent}%`,
    });
  };

  const resetZoom = () => {
    setZoomStyle({ transform: "scale(1)" });
  };
  

  const handleTipoPrecioChange = (e) => {
    setTipoPrecio(e.target.value);
  };


  if (loading || error || !producto) {
    return (
      <Typography align="center" color={error ? "error" : "textPrimary"}>
        {loading
          ? "⏳ Cargando producto..."
          : error || "❌ Producto no encontrado."}
      </Typography>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={3}
      gap={3}
      mt={5}
    >
      {/* Contenedor superior con Bloque 1 y Bloque 2 en fila */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "90%",
          maxWidth: 1100,
          gap: 3,
          boxSizing: "border-box",
          alignItems: "stretch",
        }}
      >
        {/* Bloque 1: Imagen */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow:
              "0px 1px 9px rgba(0, 0, 0, 0.12), 0px 1px 9px rgba(0, 0, 0, 0.12)",
            borderRadius: "8px",
            backgroundColor: "white",
            p: 3,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              maxWidth: 500,
              maxHeight: 400,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetZoom}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transition: "transform 0.3s ease-in-out",
                ...zoomStyle,
              }}
            />
          </Box>
        </Box>

        {/* Bloque 2: Información del producto */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
            boxSizing: "border-box",
            p: 3,
            boxShadow:
              "0px 1px 9px rgba(0, 0, 0, 0.12), 0px 1px 9px rgba(0, 0, 0, 0.12)",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <div>
            {" "}
            {/* Contenedor para los textos */}
            <Typography variant="h4" fontWeight="bold">
              {producto.nombre || "No disponible"}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              <strong>Principio activo:</strong>{" "}
              {producto.principio_activo || "No disponible"}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              <strong>Laboratorio:</strong>{" "}
              {producto.laboratorio || "No disponible"}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              <strong>Stock disponible:</strong>{" "}
              {producto.stock || "No especificado"}
            </Typography>
            
         
            <RadioGroup
             value={tipoPrecio}
             onChange={handleTipoPrecioChange}
             row
           >
             <FormControlLabel value="caja" control={<Radio />} label="Caja" />
        <FormControlLabel value="blister" control={<Radio />} label="Blister" />
            </RadioGroup>
             {/* Mostrar el precio según la selección */}
      <Typography variant="h5">
        <strong>Precio:</strong> $
        {tipoPrecio === "caja"
          ? Number(producto.precio_caja).toFixed(2)
          : Number(producto.precio_blister).toFixed(2)}
      </Typography>
            
          </div>
          {/* Botón para agregar al carrito */}
          <Button
            variant="contained"
            onClick={() =>
              agregarAlCarrito({
                ...producto,
                precio: tipoPrecio === "caja" ? producto.precio_caja : producto.precio_blister,
                tipoPrecio, // Guardar el tipo de precio seleccionado
              })
            }
            sx={{
              backgroundColor: "#FF0000",
              color: "white",
              padding: "12px 20px",
              fontSize: "1.2rem",
              borderRadius: "8px",
              fontWeight: "bold",
              textTransform: "none",
              width: "100%",
              alignSelf: "flex-end",
              "&:hover": { backgroundColor: "#CC0000" },
            }}
          >
            Agregar al carrito
          </Button>
        </Box>
      </Box>

      {/* Bloque 3: Descripción */}
      <Box
        sx={{
          width: "90%",
          maxWidth: 1100,
          backgroundColor: "#f9f9f9",
          boxSizing: "border-box",
          boxShadow:
            "0px 1px 9px rgba(0, 0, 0, 0.12), 0px 1px 9px rgba(0, 0, 0, 0.13)",
          borderRadius: "8px",
          p: 3,
        }}
      >
        <Typography variant="h5" color="text.primary">
          <strong>Descripción:</strong>{" "}
          {producto.descripcion || "Sin descripción disponible."}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductoDetalle;
