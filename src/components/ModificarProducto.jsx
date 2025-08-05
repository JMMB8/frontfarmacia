import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import {
  Inventory,
  Medication,
  Numbers,
  Description,
  AttachMoney,
  Image,
  Store,
  Layers,
} from "@mui/icons-material";

function ModificarProducto() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nombre: "",
    principio_activo: "",
    dosis: "",
    descripcion: "",
    precio_caja: "",
    precio_blister: "",
    imagen_url: "",
    stock: "",
    laboratorio: "",
    categoria_id: "", // Nuevo campo para la categoría
  });

  const [categorias, setCategorias] = useState([]); // Estado para las categorías
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Obtener las categorías desde el backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categorias");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Cargar datos del producto al cargar el componente
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/productos/${id}`);
        const data = await response.json();
        if (response.ok) {
          setFormData({
            ...data,
            precio_caja: parseFloat(data.precio_caja),
            precio_blister: parseFloat(data.precio_blister),
            categoria_id: data.categoria_id, // Incluir la categoría del producto
          });
        } else {
          setError(data.message || "Error al cargar el producto");
        }
      } catch (error) {
        setError("Error de conexión al cargar el producto");
      }
    };
    if (user) {
      fetchProducto();
    }
  }, [id, user]);

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Debes iniciar sesión para modificar un producto");
      return;
    }

    // Validar campos
    if (
      !formData.nombre ||
      !formData.principio_activo ||
      !formData.dosis ||
      !formData.descripcion ||
      !formData.precio_caja ||
      !formData.precio_blister ||
      !formData.imagen_url ||
      !formData.stock ||
      !formData.laboratorio ||
      !formData.categoria_id // Validar que se haya seleccionado una categoría
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/productos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          principio_activo: formData.principio_activo,
          dosis: formData.dosis,
          descripcion: formData.descripcion,
          precio_caja: parseFloat(formData.precio_caja),
          precio_blister: parseFloat(formData.precio_blister),
          imagen_url: formData.imagen_url,
          stock: parseInt(formData.stock),
          laboratorio: formData.laboratorio,
          categoria_id: parseInt(formData.categoria_id), // Incluir la categoría
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el producto");
      }

      // Mostrar mensaje de éxito
      setSuccess(true);
      setError("");

      // Redirigir a la galería de productos
      setTimeout(() => {
        setSuccess(false);
        navigate("/productos");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!user) {
      setError("Debes iniciar sesión para eliminar un producto");
      return;
    }
    if (
      window.confirm(
        "¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer."
      )
    ) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/productos/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText.message || "Error al eliminar el producto");
        }
        if (response.status === 204) {
          alert("Producto eliminado exitosamente");
          navigate("/productos");
        } else {
          const data = await response.json();
          alert("Producto eliminado exitosamente:", data.message);
          navigate("/productos");
        }
      } catch (error) {
        setError(error.message);
      }
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
          Modificar Producto
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            Producto actualizado con éxito 🎉
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {/* Campos del formulario */}
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
                  <Inventory color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Principio Activo"
            variant="outlined"
            margin="normal"
            required
            value={formData.principio_activo}
            onChange={(e) =>
              setFormData({ ...formData, principio_activo: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Medication color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Dosis"
            variant="outlined"
            margin="normal"
            required
            value={formData.dosis}
            onChange={(e) =>
              setFormData({ ...formData, dosis: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Numbers color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Descripción"
            variant="outlined"
            margin="normal"
            required
            multiline
            rows={4}
            value={formData.descripcion}
            onChange={(e) =>
              setFormData({ ...formData, descripcion: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Precio Caja"
            variant="outlined"
            margin="normal"
            required
            type="number"
            value={formData.precio_caja || ""}
            onChange={(e) =>
              setFormData({ ...formData, precio_caja: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Precio Blister"
            variant="outlined"
            margin="normal"
            required
            type="number"
            value={formData.precio_blister || ""}
            onChange={(e) =>
              setFormData({ ...formData, precio_blister: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="URL de la imagen"
            variant="outlined"
            margin="normal"
            required
            type="url"
            value={formData.imagen_url}
            onChange={(e) =>
              setFormData({ ...formData, imagen_url: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Stock"
            variant="outlined"
            margin="normal"
            required
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Layers color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Laboratorio"
            variant="outlined"
            margin="normal"
            required
            value={formData.laboratorio}
            onChange={(e) =>
              setFormData({ ...formData, laboratorio: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Store color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Campo para seleccionar la categoría */}
          <TextField
            fullWidth
            label="Categoría"
            variant="outlined"
            margin="normal"
            required
            select
            value={formData.categoria_id}
            onChange={(e) =>
              setFormData({ ...formData, categoria_id: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Store color="action" />
                </InputAdornment>
              ),
            }}
          >
            {categorias.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 6,
              py: 1.5,
              bgcolor: "#FF0000",
              "&:hover": { bgcolor: "#B20000" },
            }}
          >
            Guardar Cambios
          </Button>

          <Button
            onClick={handleDelete}
            fullWidth
            variant="contained"
            color="error"
            sx={{
              mt: 2,
              mb: 3,
              py: 1.5,
              bgcolor: "#B20000",
              "&:hover": { bgcolor: "#800000" },
            }}
          >
            Eliminar Producto
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ModificarProducto;