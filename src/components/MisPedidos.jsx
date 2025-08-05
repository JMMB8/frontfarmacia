import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from "../context/AuthContext";
import { 
  Box, Typography, Paper, Divider, 
  Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow,
  Chip, CircularProgress, Alert, 
  Button, Stepper, Step, StepLabel,
  Card, CardContent, Grid, Avatar,
  List, ListItem, ListItemText, ListItemAvatar,
  Badge, Tabs, Tab, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField,
  Rating, Snackbar, IconButton
} from '@mui/material';
import { 
  ShoppingCart, LocalShipping, 
  CheckCircle, HourglassEmpty,
  Cancel, Info, Receipt,
  History, Sync, Error as ErrorIcon,
  Close, Notifications, Star,
  Chat, Delete
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import io from 'socket.io-client';

const estadosPedido = {
  pendiente: { 
    icon: <HourglassEmpty color="warning" />, 
    color: 'warning',
    steps: ['Pendiente', 'Confirmado', 'Preparando', 'Enviado', 'Entregado'],
    canCancel: true
  },
  confirmado: { 
    icon: <Sync color="info" />, 
    color: 'info',
    steps: ['Pendiente', 'Confirmado', 'Preparando', 'Enviado', 'Entregado'],
    canCancel: true
  },
  preparando: { 
    icon: <Sync color="info" />, 
    color: 'info',
    steps: ['Pendiente', 'Confirmado', 'Preparando', 'Enviado', 'Entregado'],
    canCancel: false
  },
  enviado: { 
    icon: <LocalShipping color="info" />, 
    color: 'info',
    steps: ['Pendiente', 'Confirmado', 'Preparando', 'Enviado', 'Entregado'],
    canCancel: false
  },
  entregado: { 
    icon: <CheckCircle color="success" />, 
    color: 'success',
    steps: ['Pendiente', 'Confirmado', 'Preparando', 'Enviado', 'Entregado'],
    canCancel: false,
    canRate: true
  },
  cancelado: { 
    icon: <Cancel color="error" />, 
    color: 'error',
    steps: ['Pendiente', 'Cancelado'],
    canCancel: false
  }
};

const SeguimientoPedidos = () => {
  const { user, getToken } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [pedidoToCancel, setPedidoToCancel] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [pedidoToRate, setPedidoToRate] = useState(null);
  const [rating, setRating] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  // Configurar WebSocket
  useEffect(() => {
    if (!user) return;

    const newSocket = io('http://localhost:3000', {
      auth: { token: getToken() }
    });

    newSocket.on('connect', () => {
      console.log('Conectado al servidor de sockets');
    });

    newSocket.on('estado_actualizado', (data) => {
      setPedidos(prev => prev.map(p => 
        p.id === data.pedido_id ? { ...p, estado: data.nuevo_estado } : p
      ));
      setNotifications(prev => [
        {
          id: Date.now(),
          message: `Pedido #${data.pedido_id} actualizado a ${data.nuevo_estado}`,
          date: new Date(),
          read: false
        },
        ...prev
      ]);
      setSnackbarMessage(`Pedido #${data.pedido_id} actualizado a ${data.nuevo_estado}`);
      setSnackbarOpen(true);
    });

    newSocket.on('notificacion', (notificacion) => {
      setNotifications(prev => [
        {
          id: Date.now(),
          message: notificacion.mensaje,
          date: new Date(),
          read: false
        },
        ...prev
      ]);
      setSnackbarMessage(notificacion.mensaje);
      setSnackbarOpen(true);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user, getToken]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchPedidos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = getToken();
      if (!token) throw new Error('No hay token de autenticación');
      
      const response = await fetch('http://localhost:3000/api/pedidos/mis-pedidos', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error ${response.status}`);
      }

      const resultado = await response.json();
      setPedidos(resultado.data);
      setError(null);
    } catch (err) {
      console.error('Error al obtener pedidos:', err);
      setError(err.message || 'Error al cargar tus pedidos');
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (user) {
      fetchPedidos();
      
      // Configurar polling cada 60 segundos como respaldo
      const interval = setInterval(fetchPedidos, 60000);
      return () => clearInterval(interval);
    }
  }, [user, fetchPedidos]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredPedidos = () => {
    switch(tabValue) {
      case 1: // En proceso
        return pedidos.filter(p => ['pendiente', 'confirmado', 'preparando', 'enviado'].includes(p.estado));
      case 2: // Completados
        return pedidos.filter(p => p.estado === 'entregado');
      case 3: // Cancelados
        return pedidos.filter(p => p.estado === 'cancelado');
      default: // Todos
        return pedidos;
    }
  };

  const handleOpenCancelDialog = (pedido) => {
    setPedidoToCancel(pedido);
    setCancelDialogOpen(true);
  };

  const handleCancelPedido = async () => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:3000/api/pedidos/${pedidoToCancel.id}/cancelar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ motivo: cancelReason })
      });

      if (!response.ok) {
        throw new Error('Error al cancelar el pedido');
      }

      await fetchPedidos();
      setCancelDialogOpen(false);
      setSnackbarMessage('Pedido cancelado exitosamente');
      setSnackbarOpen(true);
      
      // Actualizar el pedido seleccionado si es el mismo
      if (selectedPedido && selectedPedido.id === pedidoToCancel.id) {
        setSelectedPedido({
          ...selectedPedido,
          estado: 'cancelado'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage(error.message || 'Error al cancelar el pedido');
      setSnackbarOpen(true);
    }
  };

  const handleOpenRatingDialog = (pedido) => {
    setPedidoToRate(pedido);
    setRatingDialogOpen(true);
  };

  const handleRatePedido = async () => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:3000/api/pedidos/${pedidoToRate.id}/valorar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          calificacion: rating,
          comentario: ratingComment 
        })
      });

      if (!response.ok) {
        throw new Error('Error al enviar la valoración');
      }

      await fetchPedidos();
      setRatingDialogOpen(false);
      setSnackbarMessage('Valoración enviada exitosamente');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage(error.message || 'Error al enviar la valoración');
      setSnackbarOpen(true);
    }
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
          <Button onClick={fetchPedidos} sx={{ ml: 2 }} startIcon={<Sync />}>
            Reintentar
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShoppingCart /> Mis Pedidos
        </Typography>
        
        <IconButton 
          color="inherit" 
          onClick={() => setNotificationsOpen(true)}
          sx={{ position: 'relative' }}
        >
          <Badge 
            badgeContent={notifications.filter(n => !n.read).length} 
            color="error"
          >
            <Notifications />
          </Badge>
        </IconButton>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Todos" icon={<Receipt />} iconPosition="start" />
        <Tab label="En Proceso" icon={<Sync />} iconPosition="start" />
        <Tab label="Completados" icon={<CheckCircle />} iconPosition="start" />
        <Tab label="Cancelados" icon={<Cancel />} iconPosition="start" />
      </Tabs>

      {selectedPedido ? (
        <DetallePedido 
          pedido={selectedPedido} 
          onBack={() => setSelectedPedido(null)}
          onCancel={handleOpenCancelDialog}
          onRate={handleOpenRatingDialog}
        />
      ) : (
        <>
          {filteredPedidos().length === 0 ? (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary">
                {tabValue === 1 ? 'No tienes pedidos en proceso' : 
                 tabValue === 2 ? 'No tienes pedidos completados' : 
                 tabValue === 3 ? 'No tienes pedidos cancelados' : 
                 'No has realizado ningún pedido aún'}
              </Typography>
              <Button 
                variant="contained" 
                sx={{ mt: 2 }}
                onClick={() => navigate('/productos')}
                startIcon={<ShoppingCart />}
              >
                Ir a comprar
              </Button>
            </Paper>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>N° Pedido</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPedidos().map((pedido) => (
                    <TableRow key={pedido.id}>
                      <TableCell>#{pedido.id}</TableCell>
                      <TableCell>
                        {format(new Date(pedido.fecha_creacion), 'PPPp', { locale: es })}
                      </TableCell>
                      <TableCell>S/ {parseFloat(pedido.total).toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          icon={estadosPedido[pedido.estado]?.icon || <Info />}
                          label={pedido.estado.toUpperCase()}
                          color={estadosPedido[pedido.estado]?.color || 'default'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outlined" 
                          onClick={() => setSelectedPedido(pedido)}
                          startIcon={<Info />}
                          sx={{ mr: 1 }}
                        >
                          Detalles
                        </Button>
                        {estadosPedido[pedido.estado]?.canCancel && (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleOpenCancelDialog(pedido)}
                            startIcon={<Delete />}
                          >
                            Cancelar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      {/* Diálogo para cancelar pedido */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <Cancel color="error" /> Cancelar Pedido #{pedidoToCancel?.id}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            ¿Estás seguro que deseas cancelar este pedido?
          </Typography>
          <TextField
            label="Motivo de cancelación"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>Volver</Button>
          <Button 
            onClick={handleCancelPedido}
            color="error"
            variant="contained"
            disabled={!cancelReason.trim()}
          >
            Confirmar Cancelación
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para valorar pedido */}
      <Dialog open={ratingDialogOpen} onClose={() => setRatingDialogOpen(false)}>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <Star color="primary" /> Valorar Pedido #{pedidoToRate?.id}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Typography component="legend">Calificación</Typography>
            <Rating
              name="pedido-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              precision={0.5}
              size="large"
            />
            <TextField
              label="Comentario (opcional)"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRatingDialogOpen(false)}>Cancelar</Button>
          <Button 
            onClick={handleRatePedido}
            color="primary"
            variant="contained"
          >
            Enviar Valoración
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notificaciones */}
      <Dialog 
        open={notificationsOpen} 
        onClose={() => {
          markNotificationsAsRead();
          setNotificationsOpen(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <Notifications /> Notificaciones
          </Box>
        </DialogTitle>
        <DialogContent>
          {notifications.length === 0 ? (
            <Typography sx={{ p: 2, textAlign: 'center' }}>No hay notificaciones</Typography>
          ) : (
            <List>
              {notifications.map((notification) => (
                <ListItem 
                  key={notification.id} 
                  divider
                  sx={{ bgcolor: notification.read ? 'inherit' : 'action.hover' }}
                >
                  <ListItemText
                    primary={notification.message}
                    secondary={format(new Date(notification.date), 'PPPp', { locale: es })}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              markNotificationsAsRead();
              setNotificationsOpen(false);
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mensajes */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

const DetallePedido = ({ pedido, onBack, onCancel, onRate }) => {
  const estadoConfig = estadosPedido[pedido.estado] || estadosPedido.pendiente;
  
  // Función movida dentro del componente
  const getActiveStep = (estado) => {
    switch(estado) {
      case 'pendiente': return 0;
      case 'confirmado': return 1;
      case 'preparando': return 2;
      case 'enviado': return 3;
      case 'entregado': return 4;
      case 'cancelado': return 1;
      default: return 0;
    }
  };
  
  const activeStep = getActiveStep(pedido.estado);

  return (
    <Box>
      <Button 
        onClick={onBack}
        startIcon={<History />}
        sx={{ mb: 2 }}
      >
        Volver al historial
      </Button>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingCart /> Pedido #{pedido.id}
          </Typography>

          <Grid container spacing={3} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Fecha:</strong> {format(new Date(pedido.fecha_creacion), 'PPPp', { locale: es })}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Estado:</strong> 
                <Chip
                  icon={estadoConfig.icon}
                  label={pedido.estado.toUpperCase()}
                  color={estadoConfig.color}
                  variant="outlined"
                  sx={{ ml: 1 }}
                />
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Método de pago:</strong> {pedido.metodo_pago}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Tipo de entrega:</strong> {pedido.tipo_entrega}
              </Typography>
              {pedido.direccion && (
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Dirección:</strong> {pedido.direccion}
                </Typography>
              )}
              <Typography variant="subtitle1" gutterBottom>
                <strong>Total:</strong> S/ {parseFloat(pedido.total).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Progreso del pedido
          </Typography>
          
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
            {estadoConfig.steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {estadoConfig.canCancel && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => onCancel(pedido)}
                startIcon={<Delete />}
              >
                Cancelar Pedido
              </Button>
            )}
            
            {estadoConfig.canRate && !pedido.calificacion && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => onRate(pedido)}
                startIcon={<Star />}
              >
                Valorar Pedido
              </Button>
            )}

            {pedido.calificacion && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>Tu valoración:</Typography>
                <Rating value={pedido.calificacion} readOnly />
                {pedido.comentario && (
                  <Typography sx={{ fontStyle: 'italic' }}>
                    "{pedido.comentario}"
                  </Typography>
                )}
              </Box>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Productos ({pedido.productos?.length || 0})
          </Typography>
          
          <List>
            {pedido.productos?.map((producto, index) => (
              <ListItem key={index} divider>
                <ListItemAvatar>
                  <Avatar>
                    <ShoppingCart />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={producto.nombre || `Producto ${index + 1}`}
                  secondary={`Cantidad: ${producto.cantidad} - S/ ${parseFloat(producto.precio).toFixed(2)} c/u`}
                />
                <Typography variant="body1">
                  S/ {(producto.cantidad * producto.precio).toFixed(2)}
                </Typography>
              </ListItem>
            ))}
            <ListItem sx={{ bgcolor: 'action.hover' }}>
              <ListItemText primary="Total del pedido" />
              <Typography variant="h6">
                S/ {parseFloat(pedido.total).toFixed(2)}
              </Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SeguimientoPedidos;