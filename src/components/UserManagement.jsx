import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
  TextField,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { AdminPanelSettings, Edit, Save, Cancel } from "@mui/icons-material";

function UserManagement() {
  const { user, getUsers, updateUserRole } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [tempRole, setTempRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (user?.rol === "superadministrador") {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersList = await getUsers();
      setUsers(usersList);
    } catch (err) {
      setError("Error al cargar usuarios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (userId, currentRole) => {
    setEditingId(userId);
    setTempRole(currentRole);
  };

  const handleSaveClick = (userId) => {
    setSelectedUser(users.find(u => u.id === userId));
    setOpenDialog(true);
  };

  const confirmRoleChange = async () => {
    try {
      await updateUserRole(selectedUser.id, tempRole);
      setUsers(users.map(u => u.id === selectedUser.id ? {...u, rol: tempRole} : u));
      setEditingId(null);
      setOpenDialog(false);
    } catch (err) {
      setError("Error al actualizar el rol");
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const filteredUsers = users.filter(user => 
    `${user.nombre} ${user.apellido || ""}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.correo_electronico || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (user?.rol !== "superadministrador") {
    return (
      <Container maxWidth="md">
        <Box my={4} textAlign="center">
          <Typography variant="h5" color="error">
            No tienes permisos para acceder a esta sección
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Gestión de Usuarios
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          label="Buscar usuarios"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Rol Actual</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{`${user.nombre} ${user.apellido || ""}`}</TableCell>
                      <TableCell>{user.correo_electronico || user.email}</TableCell>
                      <TableCell>
                        {editingId === user.id ? (
                          <FormControl size="small" fullWidth>
                            <InputLabel>Rol</InputLabel>
                            <Select
                              value={tempRole}
                              label="Rol"
                              onChange={(e) => setTempRole(e.target.value)}
                            >
                              <MenuItem value="usuario">Usuario</MenuItem>
                              <MenuItem value="administrador">Administrador</MenuItem>
                              <MenuItem value="superadministrador">Superadministrador</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          user.rol
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === user.id ? (
                          <>
                            <Button
                              startIcon={<Save />}
                              color="primary"
                              onClick={() => handleSaveClick(user.id)}
                              size="small"
                              sx={{ mr: 1 }}
                            >
                              Guardar
                            </Button>
                            <Button
                              startIcon={<Cancel />}
                              color="secondary"
                              onClick={handleCancel}
                              size="small"
                            >
                              Cancelar
                            </Button>
                          </>
                        ) : (
                          <Button
                            startIcon={<Edit />}
                            onClick={() => handleEdit(user.id, user.rol)}
                            size="small"
                          >
                            Editar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirmar cambio de rol</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de cambiar el rol de {selectedUser?.nombre} de {selectedUser?.rol} a {tempRole}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button onClick={confirmRoleChange} color="primary">Confirmar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default UserManagement;