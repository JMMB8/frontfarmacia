import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import visaLogo from "../img/visa.png";
import mastercardLogo from "../img/masterCard.png";
import amexLogo from "../img/amex.png";
import { Link } from "react-router-dom";
import logo from "../img/logo_rojo.png";

const Footer = () => {
  return (
    <>
      {/* Primera parte roja con logos de tarjetas */}
      <Box
        component="footer"
        style={{
          backgroundColor: "#B20000",
          color: "white",
          padding: "20px 0",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        {/* Contenedor para los logos de las tarjetas */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px", // Espacio entre los logos
          }}
        >
          <div style={{ marginBottom: "10px", fontSize: "1.2rem" }}>
            Aceptamos todas las tarjetas
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img
              src={visaLogo}
              alt="Visa"
              style={{ width: "50px", height: "40px" }}
            />
            <img
              src={mastercardLogo}
              alt="Mastercard"
              style={{ width: "50px", height: "40px" }}
            />
            <img
              src={amexLogo}
              alt="American Express"
              style={{ width: "50px", height: "40px" }}
            />
          </div>
        </div>
      </Box>

      {/* Parte blanca con 4 columnas */}
      <Box
        component="footer"
        style={{
          backgroundColor: "#fff",
          color: "#B20000",
          padding: "40px 20px",
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {/* Columna 1: Logo y redes sociales */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo Botica Virgen de Lourdes"
                  style={{ height: "80px", marginBottom: "20px" }}
                />
              </Link>

              <Box display="flex" gap={2} justifyContent="center">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                    alt="Facebook"
                    style={{ width: "30px", height: "30px" }}
                  />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                    alt="Instagram"
                    style={{ width: "30px", height: "30px" }}
                  />
                </a>
              </Box>
            </Box>
          </Grid>

          {/* Columna 2: Información */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              INFORMACIÓN
            </Typography>
            <Box component="ul" style={{ listStyle: "none", paddingLeft: 0 }}>
              <li>
                <Link
                  to="/productos"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/terminos-y-condiciones"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-de-privacidad"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/locales"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Locales
                </Link>
              </li>
              <li>
                <Link
                  to="/trabaja-con-nosotros"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Trabaja con Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  to="/documentos"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Ver documentos electrónicos
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogo"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Catálogo Digital
                </Link>
              </li>
            </Box>
          </Grid>

          {/* Columna 3: Nuestros Servicios */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              NUESTROS SERVICIOS
            </Typography>
            <Box component="ul" style={{ listStyle: "none", paddingLeft: 0 }}>
              <li>
                <Link
                  to="/delivery"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/venta-corporativa"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Venta Corporativa
                </Link>
              </li>
              <li>
                <Link
                  to="/atencion-farmaceutica"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Atención Farmaceutica
                </Link>
              </li>
              <li>
                <Link
                  to="/promociones"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Promociones
                </Link>
              </li>
            </Box>
          </Grid>

          {/* Columna 4: Usuarios */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              USUARIOS
            </Typography>
            <Box component="ul" style={{ listStyle: "none", paddingLeft: 0 }}>
              <li>
                <Link
                  to="/perfil"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Mi cuenta
                </Link>
              </li>
              <li>
                <Link
                  to="/carrito"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Mi carrito
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Entrar/Registrar
                </Link>
              </li>
              <li>
                <Link
                  to="/preguntas-frecuentes"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  to="/reclamaciones"
                  style={{ color: "#B20000", textDecoration: "none" }}
                >
                  Libro de Reclamaciones
                </Link>
              </li>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Parte final roja con copyright */}
      <Box
        component="footer"
        style={{
          backgroundColor: "#B20000",
          color: "white",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Botica Virgen de Lourdes. Todos los
          derechos reservados.
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
