import { useState, useEffect } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Email, Lock, Person, Phone, Badge, AdminPanelSettings } from "@mui/icons-material";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    correo_electronico: "",
    contrasena: "",
    rol: "usuario",
  });
  
  const [error, setError] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const navigate = useNavigate();
  const { signUp, user } = useAuth();

  // Efecto para verificar el rol del usuario actual
  useEffect(() => {
    if (user) {
      setCurrentUserRole(user.rol);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de todos los campos
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.dni ||
      !formData.telefono ||
      !formData.correo_electronico ||
      !formData.contrasena
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // Validar formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo_electronico)) {
      setError("El correo electrónico no es válido");
      return;
    }

    // Validar longitud de la contraseña
    if (formData.contrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      // Si el usuario actual no es superadmin, forzar el rol "usuario"
      const finalFormData = currentUserRole === "superadministrador" 
        ? formData 
        : { ...formData, rol: "usuario" };
      
      await signUp(finalFormData);
      navigate("/login"); // Redirigir al login después del registro exitoso
    } catch (error) {
      setError(error.message);
    }
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
          Registro de Usuario
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Nombre"
            variant="outlined"
            margin="normal"
            required
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Apellido"
            variant="outlined"
            margin="normal"
            required
            value={formData.apellido}
            onChange={(e) =>
              setFormData({ ...formData, apellido: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="DNI O CE"
            variant="outlined"
            margin="normal"
            required
            value={formData.dni}
            onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Teléfono"
            type="tel"
            variant="outlined"
            margin="normal"
            required
            value={formData.telefono}
            onChange={(e) =>
              setFormData({ ...formData, telefono: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
            }}
          />

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
          
          {/* Selector de rol solo para superadministrador */}
          {currentUserRole === "superadministrador" && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="rol-label">Rol</InputLabel>
              <Select
                labelId="rol-label"
                value={formData.rol}
                label="Rol"
                onChange={(e) => 
                  setFormData({ ...formData, rol: e.target.value })
                }
                startAdornment={
                  <InputAdornment position="start">
                    <AdminPanelSettings color="action" />
                  </InputAdornment>
                }
              >
                <MenuItem value="usuario">Usuario</MenuItem>
                <MenuItem value="administrador">Administrador</MenuItem>
                <MenuItem value="superadministrador">Superadministrador</MenuItem>
              </Select>
            </FormControl>
          )}

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
            Registrarse
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;