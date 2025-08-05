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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
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

function CrearProducto() {
  const { user } = useAuth();
  const navigate = useNavigate();

    // 📌 Estado para manejar los datos del formulario

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
    categoria_id: "",
  });
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  

 
    // Obtener las categorías al montar el componente
    useEffect(() => {
      const fetchCategorias = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch("http://localhost:3000/api/categorias", {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error("Error al obtener las categorías");
          }
  
          const data = await response.json();
          setCategorias(data); // Almacenar las categorías en el estado
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchCategorias();
    }, []);





  // 📌 Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
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
      !formData.categoria_id
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      // Mostrar los datos que se enviarán al servidor
    console.log("Datos enviados:", {
      nombre: formData.nombre,
      principio_activo: formData.principio_activo,
      dosis: formData.dosis,
      descripcion: formData.descripcion,
      precio_caja: parseFloat(formData.precio_caja),
      precio_blister: parseFloat(formData.precio_blister),
      imagen_url: formData.imagen_url,
      stock: parseInt(formData.stock),
      laboratorio: formData.laboratorio,
      categoria_id: parseInt(formData.categoria_id),
    });
      const response = await fetch("http://localhost:3000/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
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
          categoria_id: parseInt(formData.categoria_id),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        throw new Error(errorData.message || "Error al crear el producto");
      }

      // 📌 Mostrar mensaje de éxito
      setSuccess(true);
      setError("");

      // 📌 Limpiar el formulario tras creación correcta
      setFormData({
        nombre: "",
        principio_activo: "",
        dosis: "",
        descripcion: "",
        precio_caja: "",
        precio_blister: "",
        imagen_url: "",
        stock: "",
        laboratorio: "",
        categoria_id: "",
      });

      // 📌 Redirigir nuevamente para seguir creando
      setTimeout(() => {
        setSuccess(false); // Ocultar tras unos segundos
        navigate("/productos");
      }, 3000); // ⏰ 3 segundos de tiempo de espera
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
          Crear Nuevo Producto
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            Producto creado con éxito 🎉
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {/* 📌 Nombre */}
          <TextField
            fullWidth
            label="Nombre"
            variant="outlined"
            margin="normal"
            required
            value={formData.nombre}
            onChange={(e) => {
              if (e.target.value.length <= 255) {
                setFormData({ ...formData, nombre: e.target.value });
              } else {
                setError("El nombre no puede exceder los 255 caracteres");
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Inventory color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* 📌 Principio Activo */}
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

          {/* 📌 Dosis */}
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

          {/* 📌 Descripción */}
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

          {/* 📌 Precio caja */}
          <TextField
            fullWidth
            label="Precio  caja"
            variant="outlined"
            margin="normal"
            required
            type="number"
            value={formData.precio_caja}
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
          {/* 📌 Precio Blister */}
<TextField
  fullWidth
  label="Precio Blister"
  variant="outlined"
  margin="normal"
  required
  type="number"
  value={formData.precio_blister}
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

          {/* 📌 URL de la imagen */}
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

          {/* 📌 Stock */}
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
          

          {/* 📌 Laboratorio */}
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
            {/* Campo de selección de categoría */}
            <FormControl fullWidth margin="normal" required>
            <InputLabel id="categoria-label">Categoría</InputLabel>
            <Select
              labelId="categoria-label"
              label="Categoría"
              value={formData.categoria_id}
              onChange={(e) =>
                setFormData({ ...formData, categoria_id: e.target.value })
              }
            >
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </MenuItem>
                
              ))}
            </Select>
          </FormControl>

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
            Publicar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CrearProducto;
