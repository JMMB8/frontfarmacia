import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

function Login() {
  const [formData, setFormData] = useState({
    correo_electronico: "",
    contrasena: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    
    // Validación básica antes de enviar
    if (!formData.correo_electronico || !formData.contrasena) {
      setError("Por favor ingresa tu correo y contraseña");
      return;
    }

    try {
      await signIn({
        correo_electronico: formData.correo_electronico,
        contrasena: formData.contrasena,
      });
      navigate("/Productos");
    } catch (error) {
      // Manejo específico de errores
      if (error.response) {
        // Si el backend devuelve un código de estado
        switch (error.response.status) {
          case 401:
            setError("Clave incorrecta. Por favor intenta nuevamente.");
            break;
          case 404:
            setError("Usuario no encontrado. Verifica tu correo electrónico.");
            break;
          default:
            setError("Error al iniciar sesión. Por favor intenta más tarde.");
        }
      } else if (error.message.includes("Network Error")) {
        setError("Problema de conexión. Verifica tu internet.");
      } else {
        setError("Error al iniciar sesión. Por favor verifica tus datos.");
      }
    }
  };

  const irARecuperarContraseña = () => {
    navigate("/recuperar-contrasena");
  };

  const irARegistro = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "white",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="black" gutterBottom>
          Iniciar Sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            variant="outlined"
            margin="normal"
            required
            value={formData.correo_electronico}
            onChange={(e) =>
              setFormData({ ...formData, correo_electronico: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            required
            value={formData.contrasena}
            onChange={(e) =>
              setFormData({ ...formData, contrasena: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.5,
              bgcolor: "#FF0000",
              "&:hover": { bgcolor: "#B20000" },
            }}
          >
            Iniciar Sesión
          </Button>

          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", cursor: "pointer" }}
            onClick={irARecuperarContraseña}
          >
            ¿Olvidaste tu contraseña?{" "}
            <Typography
              component="span"
              sx={{ color: "#FF0000", fontWeight: "bold" }}
            >
              Recupérala aquí
            </Typography>
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", cursor: "pointer" }}
            onClick={irARegistro}
          >
            ¿Aún no tienes cuenta?{" "}
            <Typography
              component="span"
              sx={{ color: "#FF0000", fontWeight: "bold" }}
            >
              Regístrate
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;