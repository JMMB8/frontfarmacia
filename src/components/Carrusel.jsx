import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { 
  Box, 
  Button, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField,
  Tooltip,
  Alert,
  CircularProgress,
  Typography
} from "@mui/material";
import { 
  AddPhotoAlternate, 
  Delete, 
  Edit,
  CloudUpload,
  Close
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const CarouselProductos = () => {
  const { user } = useAuth();
  const [productos, setProductos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState({ url: "", alt: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(4, productos.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, productos.length),
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  // Cargar imágenes iniciales
  useEffect(() => {
    const loadInitialImages = () => {
      try {
        setLoading(true);
        // Datos iniciales (puedes reemplazar con una llamada a tu API)
        const initialImages = [
          {
            url: "https://res.cloudinary.com/ddlbn5fnx/image/upload/v1738716036/vitaminas_yyrhqr.jpg",
            alt: "Publicidad de colageno y calcio con vitamina D",
          },
          {
            url: "https://res.cloudinary.com/ddlbn5fnx/image/upload/v1738716036/La_roche_antihelios_ehidph.jpg",
            alt: "Publicidad de protector solar Anthelios La Roche",
          },
          {
            url: "https://res.cloudinary.com/ddlbn5fnx/image/upload/v1738716036/abrilar_lq5g9o.jpg",
            alt: "Publicidad de jarabe para la tos ABRILAR",
          },
          {
            url: "https://farmaciaslider.pe/my-assets/image/product/d53343fae79d45f5e67ca0f3822c65a9.jpg",
            alt: "Publicidad de proteina WHEY gold standard",
          }
        ];
        setProductos(initialImages);
      } catch (err) {
        setError("Error al cargar las imágenes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialImages();
  }, []);

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      setCurrentImage({ ...productos[index] });
      setEditIndex(index);
    } else {
      setCurrentImage({ url: "", alt: "" });
      setEditIndex(null);
    }
    setImagePreview(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validaciones básicas
      if (!file.type.match('image.*')) {
        setError("Por favor, selecciona un archivo de imagen válido");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setError("La imagen es demasiado grande (máximo 5MB)");
        return;
      }

      setError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setCurrentImage(prev => ({ ...prev, url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentImage(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!currentImage.url) {
      setError("Debes subir una imagen o proporcionar una URL");
      return;
    }

    if (!currentImage.alt) {
      setError("La descripción de la imagen es obligatoria");
      return;
    }

    if (editIndex !== null) {
      // Editar imagen existente
      const updatedProductos = [...productos];
      updatedProductos[editIndex] = currentImage;
      setProductos(updatedProductos);
    } else {
      // Agregar nueva imagen
      setProductos([...productos, currentImage]);
    }
    handleCloseDialog();
  };

  const handleDelete = (index) => {
    const updatedProductos = productos.filter((_, i) => i !== index);
    setProductos(updatedProductos);
  };

  return (
    <Box sx={{ 
      mt: 3, 
      width: "100%", 
      maxWidth: "100vw", 
      overflow: "hidden",
      position: "relative"
    }}>
      {/* Panel de administración (solo para usuarios con permisos) */}
      {(user?.rol === "administrador" || user?.rol === "superadministrador") && (
        <Box sx={{ 
          position: "absolute", 
          top: 0, 
          right: 0, 
          zIndex: 2,
          m: 1
        }}>
          <Tooltip title="Agregar imagen">
            <IconButton
              color="primary"
              onClick={() => handleOpenDialog()}
              sx={{ 
                backgroundColor: "background.paper",
                boxShadow: 1,
                '&:hover': {
                  backgroundColor: "primary.main",
                  color: "primary.contrastText"
                }
              }}
            >
              <AddPhotoAlternate />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "200px"
        }}>
          <CircularProgress />
        </Box>
      ) : productos.length > 0 ? (
        <Box sx={{ 
          mt: 3,
          width: "100%",
          maxWidth: "100vw",
          overflow: "hidden",
          boxSizing: "border-box",
        }}>
          <Slider {...settings}>
            {productos.map((producto, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px",
                  position: "relative",
                  outline: "none" // Elimina el borde al hacer focus
                }}
              >
                {/* Controles de edición para administradores */}
                {(user?.rol === "administrador" || user?.rol === "superadministrador") && (
                  <Box sx={{ 
                    position: "absolute", 
                    top: 16, 
                    right: 16, 
                    zIndex: 2,
                    display: "flex",
                    gap: 1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderRadius: "4px",
                    p: 0.5
                  }}>
                    <Tooltip title="Editar">
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog(index)}
                        sx={{ color: "white" }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(index)}
                        sx={{ color: "white" }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
                
                {/* Imagen del carrusel */}
                <Box
                  component="img"
                  src={producto.url}
                  alt={producto.alt}
                  sx={{
                    width: "clamp(140px, 100%, 410px)",
                    height: "clamp(100px, 100%, 210px)",
                    objectFit: "cover",
                    borderRadius: "8px",
                    maxWidth: "95%",
                    boxShadow: 2,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.02)"
                    }
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "200px",
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: "8px",
          flexDirection: "column",
          gap: 2
        }}>
          <Typography variant="h6" color="text.secondary">
            No hay imágenes para mostrar
          </Typography>
          {(user?.rol === "administrador" || user?.rol === "superadministrador") && (
            <Button
              variant="contained"
              startIcon={<AddPhotoAlternate />}
              onClick={() => handleOpenDialog()}
            >
              Agregar Imagen
            </Button>
          )}
        </Box>
      )}

      {/* Diálogo para agregar/editar imágenes */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editIndex !== null ? "Editar Imagen" : "Agregar Nueva Imagen"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center",
              border: "1px dashed",
              borderColor: "divider",
              borderRadius: "8px",
              p: 3,
              mb: 2
            }}>
              {imagePreview || currentImage.url ? (
                <>
                  <Box
                    component="img"
                    src={imagePreview || currentImage.url}
                    alt="Preview"
                    sx={{ 
                      maxWidth: "100%", 
                      maxHeight: "200px",
                      mb: 2,
                      borderRadius: "4px"
                    }}
                  />
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUpload />}
                  >
                    Cambiar Imagen
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                </>
              ) : (
                <>
                  <AddPhotoAlternate sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUpload />}
                  >
                    Subir Imagen
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                </>
              )}
            </Box>
            
            <TextField
              fullWidth
              label="URL de la imagen (opcional)"
              name="url"
              value={currentImage.url}
              onChange={handleInputChange}
              margin="normal"
              disabled={!!imagePreview}
              helperText="Complete solo si no subió una imagen"
            />
            
            <TextField
              fullWidth
              label="Descripción de la imagen*"
              name="alt"
              value={currentImage.alt}
              onChange={handleInputChange}
              margin="normal"
              required
              helperText="Texto alternativo para accesibilidad"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<Close />}>Cancelar</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={!currentImage.url || !currentImage.alt}
            startIcon={editIndex !== null ? <Edit /> : <AddPhotoAlternate />}
          >
            {editIndex !== null ? "Guardar Cambios" : "Agregar Imagen"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarouselProductos;