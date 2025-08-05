import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Box,
  Paper,
  Menu,
  MenuItem,
  Avatar,
  Button,
} from "@mui/material";
import { Search, ShoppingCart, Person, Phone } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo_rojo.png";
import { styled } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const colors = {
  rojo: "#e53935",
  texto: "#333",
  fondoClaro: "#f9f9f9",
};

const Navbar = ({ onSelectCategoria }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [anchorElCategorias, setAnchorElCategorias] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [anchorElUsuario, setAnchorElUsuario] = useState(null);
  const openUsuario = Boolean(anchorElUsuario);

  useEffect(() => {
    fetch("http://localhost:3000/api/categorias")
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  const handleMenuCategoriasOpen = (event) => {
    setAnchorElCategorias(event.currentTarget);
  };

  const handleMenuCategoriasClose = () => {
    setAnchorElCategorias(null);
  };

  const handleSelectCategoria = (categoriaId) => {
    if (typeof onSelectCategoria === "function") {
      onSelectCategoria(categoriaId);
    }
    handleMenuCategoriasClose();
  };

  const handleMenuUsuarioOpen = (event) => {
    setAnchorElUsuario(event.currentTarget);
  };

  const handleMenuUsuarioClose = () => {
    setAnchorElUsuario(null);
  };

  const handleLogout = () => {
    signOut();
    handleMenuUsuarioClose();
    navigate("/");
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      try {
        const response = await fetch(
          `http://localhost:3000/api/productos/buscar?query=${searchTerm}`
        );

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          navigate(`/buscar?query=${encodeURIComponent(searchTerm)}`, {
            state: { results: data },
          });
        } else {
          navigate(`/buscar?query=${encodeURIComponent(searchTerm)}`, {
            state: { results: [] },
          });
        }
      } catch (error) {
        alert("Hubo un error al realizar la búsqueda. Inténtalo de nuevo.");
      } finally {
        setSearchTerm(""); // Limpiar el campo de búsqueda
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div>
      {/* Franja roja superior con animación */}
      <Box
        style={{
          backgroundColor: colors.rojo,
          height: "30px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            whiteSpace: "nowrap",
            animation: "moveText 10s linear infinite",
            position: "absolute",
          }}
        >
          <Phone style={{ color: "white" }} />
          <span style={{ color: "white" }}>Delivery: +1 234 567 890</span>
        </div>

        <style>
          {`
            @keyframes moveText {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>
      </Box>

      {/* Barra principal de la navbar */}
      <AppBar
        position="sticky"
        style={{
          backgroundColor: "#fff",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          zIndex: 1100,
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "75px",
          }}
        >
          {/* Logo con animación */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link to="/">
              <motion.img
                src={logo}
                alt="Logo Botica Virgen de Lourdes"
                style={{ height: "60px" }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
          </div>

          {/* Buscador con enfoque resaltado */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flex: 1,
              margin: "0 20px",
            }}
          >
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: "600px",
                borderRadius: "25px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease",
                "&:hover": { boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" },
              }}
              onSubmit={handleSubmit}
            >
              <InputBase
                placeholder="Busca tu producto"
                sx={{ ml: 2, flex: 1, fontSize: "1.1rem", padding: "10px 0" }}
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
              <IconButton
                type="submit"
                sx={{
                  p: "12px",
                  color: colors.rojo,
                  "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.1)" },
                }}
              >
                <Search style={{ fontSize: "1.5rem" }} />
              </IconButton>
            </Paper>
          </div>

          {/* Íconos de usuario y carrito */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Ícono de usuario */}
            <IconButton onClick={handleMenuUsuarioOpen}>
              {user ? (
                <Avatar
                  alt={user.nombre}
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <Person style={{ color: "black", fontSize: "1.5rem" }} />
              )}
            </IconButton>

            {/* Menú desplegable del usuario */}
            <Menu
              anchorEl={anchorElUsuario}
              open={openUsuario}
              onClose={handleMenuUsuarioClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {user ? (
                <>
                  <MenuItem
                    onClick={() => {
                      handleMenuUsuarioClose();
                      navigate("/perfil");
                    }}
                  >
                    Perfil
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      handleMenuUsuarioClose();
                      navigate("/login");
                    }}
                  >
                    Iniciar Sesión
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleMenuUsuarioClose();
                      navigate("/register");
                    }}
                  >
                    Registrarse
                  </MenuItem>
                </>
              )}
            </Menu>

            {/* Ícono de carrito */}
            <Link
              to="/carrito"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton>
                <ShoppingCart style={{ color: "black", fontSize: "1.5rem" }} />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      {/* Enlaces de navegación */}
      <Box
        style={{
          backgroundColor: "white",
          fontSize: "20px",
          padding: "0px 0px 10px 0px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          textAlign: "center",
          paddingBottom: "10px",
        }}
      >
        <StyledLink to="/">Somos</StyledLink>
        <StyledLink to="/productos">Productos</StyledLink>

        {/* Menú desplegable de categorías */}
        <Button
          color="inherit"
          onClick={handleMenuCategoriasOpen}
          style={{
            textTransform: "none",
            fontSize: "1rem",
            color: colors.rojo,
          }}
        >
          <strong>Categorías </strong>
        </Button>
        <Menu
          anchorEl={anchorElCategorias}
          open={Boolean(anchorElCategorias)}
          onClose={handleMenuCategoriasClose}
        >
          <MenuItem onClick={() => handleSelectCategoria(null)}>
            Todas las categorías
          </MenuItem>
          {categorias.map((categoria) => (
            <MenuItem
              key={categoria.id}
              onClick={() => handleSelectCategoria(categoria.id)}
            >
              {categoria.nombre}
            </MenuItem>
          ))}
        </Menu>

        {user && (
          <>
            <StyledLink to="/favoritos">Mis Favoritos</StyledLink>
            <StyledLink to="/mis-pedidos">Mis Pedidos</StyledLink>
          </>
        )}
        {user && user.rol === "superadministrador" && (
          <>
            <StyledLink to="/crear-producto">Crear Producto</StyledLink>
            <StyledLink to="/lista-productos">Modificar Producto</StyledLink>
            <StyledLink to="/CategoriaList">Crear categorias</StyledLink>
            <StyledLink to="/reportes">Reportes</StyledLink>
            <StyledLink to="/gestion-de-pedidos">Pedidos</StyledLink>
            <StyledLink to="/user-management">AdminManagement</StyledLink>
            <StyledLink to="/admin-pagos">AdminPagos</StyledLink>
          </>
        )}
        {user && user.rol === "administrador" && (
          <>
            <StyledLink to="/crear-producto">Crear Producto</StyledLink>
            <StyledLink to="/lista-productos">Modificar Producto</StyledLink>
            <StyledLink to="/CategoriaList">Crear categorias</StyledLink>
            <StyledLink to="/reportes">Reportes</StyledLink>
            <StyledLink to="/gestion-de-pedidos">Pedidos</StyledLink>
          </>
        )}
      </Box>
    </div>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  color: colors.rojo,
  textDecoration: "none",
  fontWeight: "bold",
  padding: "8px 12px",
  borderRadius: "5px",
  display: "inline-block",
  transition: "all 0.2s ease-in-out",

  "&:hover": { opacity: 0.7 },
  "&:active": { transform: "scale(0.95)" },

  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    padding: "5px 8px",
  },
}));

export default Navbar;
