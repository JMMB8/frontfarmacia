import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert
} from '@mui/material';
import { Check, Close, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminPagos = () => {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPago, setSelectedPago] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        setError(null);
        const response = await axios.get('/api/pagos/pendientes', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        // Validación robusta de la respuesta
        const data = Array.isArray(response?.data) ? response.data : [];
        setPagos(data);
        
        if (data.length === 0) {
          setError('No hay comprobantes pendientes de revisión');
        }
      } catch (error) {
        console.error('Error fetching pagos:', error);
        setError('Error al cargar los comprobantes. Por favor intenta nuevamente.');
        setPagos([]); // Aseguramos que pagos sea un array vacío
      } finally {
        setLoading(false);
      }
    };

    fetchPagos();
  }, []);

  const handleOpenDialog = (pago) => {
    setSelectedPago(pago);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPago(null);
  };

  const handleUpdateStatus = async (status) => {
    try {
      setProcessing(true);
      await axios.put(`/api/pagos/${selectedPago.id}/estado`, 
        { estado: status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      setPagos(pagos.filter(p => p.id !== selectedPago.id));
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Error al actualizar el estado del pago');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Comprobantes de Pago Pendientes
      </Typography>
      
      {error && (
        <Alert severity={pagos.length === 0 ? 'info' : 'error'} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Método</TableCell>
              <TableCell>Banco</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagos.length > 0 ? (
              pagos.map((pago) => (
                <TableRow key={pago.id}>
                  <TableCell>{pago.id}</TableCell>
                  <TableCell>{pago.usuario_nombre} ({pago.usuario_email})</TableCell>
                  <TableCell>S/{pago.monto?.toFixed(2) || '0.00'}</TableCell>
                  <TableCell>
                    <Chip 
                      label={pago.metodo_pago} 
                      color={
                        pago.metodo_pago === 'transferencia' ? 'primary' : 
                        pago.metodo_pago === 'qr' ? 'secondary' : 'default'
                      } 
                    />
                  </TableCell>
                  <TableCell>{pago.banco_destino || 'N/A'}</TableCell>
                  <TableCell>{pago.fecha ? new Date(pago.fecha).toLocaleString() : 'Fecha no disponible'}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      startIcon={<Visibility />}
                      onClick={() => handleOpenDialog(pago)}
                      disabled={!pago.comprobante_url}
                    >
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No hay comprobantes pendientes
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo para ver detalles y confirmar */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Detalles del Comprobante</DialogTitle>
        <DialogContent dividers>
          {selectedPago && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Información del Pago
              </Typography>
              <Typography><strong>ID:</strong> {selectedPago.id}</Typography>
              <Typography><strong>Usuario:</strong> {selectedPago.usuario_nombre} ({selectedPago.usuario_email})</Typography>
              <Typography><strong>Monto:</strong> S/{selectedPago.monto?.toFixed(2) || '0.00'}</Typography>
              <Typography><strong>Método:</strong> {selectedPago.metodo_pago}</Typography>
              {selectedPago.banco_destino && (
                <Typography><strong>Banco Destino:</strong> {selectedPago.banco_destino}</Typography>
              )}
              <Typography><strong>Fecha:</strong> {selectedPago.fecha ? new Date(selectedPago.fecha).toLocaleString() : 'Fecha no disponible'}</Typography>
              
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Comprobante
                </Typography>
                {selectedPago.comprobante_url ? (
                  selectedPago.comprobante_url.endsWith('.pdf') ? (
                    <iframe 
                      src={selectedPago.comprobante_url} 
                      width="100%" 
                      height="500px" 
                      style={{ border: 'none' }}
                      title="Comprobante de pago"
                    />
                  ) : (
                    <img 
                      src={selectedPago.comprobante_url} 
                      alt="Comprobante de pago" 
                      style={{ maxWidth: '100%', maxHeight: '500px', display: 'block', margin: '0 auto' }}
                    />
                  )
                ) : (
                  <Typography color="error">No se ha subido comprobante</Typography>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => handleUpdateStatus('rechazado')} 
            color="error"
            startIcon={<Close />}
            disabled={processing}
          >
            Rechazar
          </Button>
          <Button 
            onClick={() => handleUpdateStatus('confirmado')} 
            color="success"
            startIcon={<Check />}
            disabled={processing}
          >
            Confirmar Pago
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPagos;