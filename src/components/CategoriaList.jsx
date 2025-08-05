import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCategoria, setCurrentCategoria] = useState({ id: null, nombre: "", descripcion: "" });

  // Obtener las categorías desde el backend al montar el componente
  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/categorias");
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (categoria = { id: null, nombre: "", descripcion: "" }) => {
    setCurrentCategoria(categoria);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategoria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = currentCategoria.id
      ? `http://localhost:3000/api/categorias/${currentCategoria.id}`
      : "http://localhost:3000/api/categorias";
    const method = currentCategoria.id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentCategoria),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      if (currentCategoria.id) {
        setCategorias((prev) =>
          prev.map((cat) => (cat.id === currentCategoria.id ? data : cat))
        );
      } else {
        setCategorias((prev) => [...prev, data]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/categorias/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      setCategorias((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Categorías
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Crear Nueva Categoría
      </Button>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : categorias.length === 0 ? (
        <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
          No hay categorías disponibles
        </Typography>
      ) : (
        <Box sx={{ mt: 2 }}>
          {categorias.map((categoria) => (
            <Box key={categoria.id} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: "4px" }}>
              <Typography variant="h6">{categoria.nombre}</Typography>
              <Typography variant="body1">{categoria.descripcion}</Typography>
              <Button variant="outlined" color="primary" onClick={() => handleOpenDialog(categoria)}>
                Editar
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleDelete(categoria.id)} sx={{ ml: 2 }}>
                Eliminar
              </Button>
            </Box>
          ))}
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentCategoria.id ? "Editar Categoría" : "Crear Nueva Categoría"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre"
            type="text"
            fullWidth
            value={currentCategoria.nombre}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="descripcion"
            label="Descripción"
            type="text"
            fullWidth
            value={currentCategoria.descripcion}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriaList;