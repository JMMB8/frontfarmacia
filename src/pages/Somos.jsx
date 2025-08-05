import React from "react";
import Hero from "../components/Hero";
import { Container, Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Carrusel from "../components/Carrusel";
import { motion } from "framer-motion"; // Para animaciones
import FavoriteIcon from "@mui/icons-material/Favorite"; // Ícono de corazón
import HandshakeIcon from "@mui/icons-material/Handshake"; // Ícono de manos
import SecurityIcon from "@mui/icons-material/Security"; // Ícono de escudo

const Somos = () => {
  // Animaciones
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const scaleUp = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div>
      {/* 📌 Carrusel de productos */}
      <Carrusel />

      {/* 📌 Sección HERO */}
      <Hero />

      {/* 📌 Contenido de la página */}
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        {/* Título principal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            color="#B20000"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Cuidando de tu bienestar con compromiso y experiencia
          </Typography>
        </motion.div>

        {/* Tarjetas interactivas */}
        <Grid container spacing={4} sx={{ mt: 3 }}>
          {/* Tarjeta 1: Nuestra Historia */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={scaleUp}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: "20px", // Bordes redondeados
                  boxShadow: 3,
                  height: "300px", // Tamaño fijo
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "#E3F2FD", // Color de fondo suave (azul claro)
                }}
              >
                <CardContent>
                  <FavoriteIcon sx={{ fontSize: 40, color: "#B20000", mb: 2 }} />
                  <Typography variant="h6" color="#B20000" gutterBottom>
                    Nuestra Historia
                  </Typography>
                  <Typography variant="body2">
                    Con más de 20 años de experiencia, nos dedicamos a ofrecer
                    productos farmacéuticos y de bienestar con un compromiso
                    inquebrantable hacia la salud de nuestra comunidad.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Tarjeta 2: Nuestra Misión */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={scaleUp}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: "20px", // Bordes redondeados
                  boxShadow: 3,
                  height: "300px", // Tamaño fijo
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "#FBE9E7", // Color de fondo suave (rojo claro)
                }}
              >
                <CardContent>
                  <HandshakeIcon sx={{ fontSize: 40, color: "#B20000", mb: 2 }} />
                  <Typography variant="h6" color="#B20000" gutterBottom>
                    Nuestra Misión
                  </Typography>
                  <Typography variant="body2">
                    Garantizar el acceso a medicamentos de calidad y productos de
                    bienestar, siempre con un enfoque humano y ético.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Tarjeta 3: Nuestros Valores */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={scaleUp}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: "20px", // Bordes redondeados
                  boxShadow: 3,
                  height: "300px", // Tamaño fijo
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "#E8F5E9", // Color de fondo suave (verde claro)
                }}
              >
                <CardContent>
                  <SecurityIcon sx={{ fontSize: 40, color: "#B20000", mb: 2 }} />
                  <Typography variant="h6" color="#B20000" gutterBottom>
                    Nuestros Valores
                  </Typography>
                  <Typography variant="body2">
                    Honestidad, transparencia y compromiso con la salud y el
                    bienestar de nuestros clientes.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Sección de proceso (compacta) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          style={{ marginTop: 40 }}
        >
          <Box
            sx={{
              textAlign: "center",
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: "white",
            }}
          >
            <Typography variant="h6" color="#B20000" gutterBottom>
              Nuestro Proceso
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Typography variant="body1" fontWeight="bold">
                  1. Recepción
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" fontWeight="bold">
                  2. Asesoría
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" fontWeight="bold">
                  3. Entrega
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </div>
  );
};

export default Somos;