import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from "../context/AuthContext";
import { 
  Table, Button, Chip, Typography, Box,
  MenuItem, FormControl, InputLabel, Select,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Paper, TableContainer, TableHead, TableRow, TableCell,
  TableBody, Alert, CircularProgress, Snackbar, Divider,
  TablePagination, IconButton, Tooltip as MuiTooltip, Stack, TextField,
  Tab, Tabs, Grid
} from '@mui/material';
import { 
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Sync as SyncIcon,
  ShoppingCart,
  Person,
  Phone,
  Email,
  Close as CloseIcon,
  PictureAsPdf as PdfIcon,
  GridOn as ExcelIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  MonetizationOn,
  LocalShipping,
  CheckCircle,
  Cancel,
  HourglassEmpty
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, BarElement);

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10
  },
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    flexDirection: "row"
  },
  tableColHeader: {
    width: "100%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    backgroundColor: '#f5f5f5'
  },
  tableCol: {
    width: "100%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5
  },
  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: 10
  },
  tableCell: {
    fontSize: 9
  }
});

const PedidosPDF = ({ pedidos }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Reporte de Pedidos</Text>
        <Text>Generado el: {new Date().toLocaleDateString()}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableColHeader, { width: '10%' }]}>
            <Text style={styles.tableCellHeader}>ID</Text>
          </View>
          <View style={[styles.tableColHeader, { width: '20%' }]}>
            <Text style={styles.tableCellHeader}>Fecha</Text>
          </View>
          <View style={[styles.tableColHeader, { width: '20%' }]}>
            <Text style={styles.tableCellHeader}>Cliente</Text>
          </View>
          <View style={[styles.tableColHeader, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>Total</Text>
          </View>
          <View style={[styles.tableColHeader, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>Estado</Text>
          </View>
          <View style={[styles.tableColHeader, { width: '20%' }]}>
            <Text style={styles.tableCellHeader}>Método Pago</Text>
          </View>
        </View>
        {pedidos.map((pedido) => (
          <View style={styles.tableRow} key={pedido.id}>
            <View style={[styles.tableCol, { width: '10%' }]}>
              <Text style={styles.tableCell}>{pedido.id}</Text>
            </View>
            <View style={[styles.tableCol, { width: '20%' }]}>
              <Text style={styles.tableCell}>{new Date(pedido.fecha_creacion).toLocaleString()}</Text>
            </View>
            <View style={[styles.tableCol, { width: '20%' }]}>
              <Text style={styles.tableCell}>{pedido.usuario_nombre}</Text>
            </View>
            <View style={[styles.tableCol, { width: '15%' }]}>
              <Text style={styles.tableCell}>S/ {parseFloat(pedido.total).toFixed(2)}</Text>
            </View>
            <View style={[styles.tableCol, { width: '15%' }]}>
              <Text style={styles.tableCell}>{pedido.estado.toUpperCase()}</Text>
            </View>
            <View style={[styles.tableCol, { width: '20%' }]}>
              <Text style={styles.tableCell}>{pedido.metodo_pago}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const MetricCard = ({ icon, title, value, color }) => (
  <Paper sx={{ p: 3, height: '100%', borderLeft: `4px solid ${color}` }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ color }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
      </Box>
    </Box>
  </Paper>
);

const ChartCard = ({ title, children }) => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Typography variant="h6" gutterBottom>{title}</Typography>
    <Divider sx={{ mb: 2 }} />
    <Box sx={{ height: '300px' }}>
      {children}
    </Box>
  </Paper>
);

const PedidosDashboard = ({ pedidos, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const calcularEstadisticas = () => {
    const stats = {
      totalPedidos: pedidos.length,
      totalVentas: pedidos.reduce((sum, pedido) => sum + parseFloat(pedido.total), 0),
      porEstado: {
        pendiente: 0,
        confirmado: 0,
        preparando: 0,
        enviado: 0,
        entregado: 0,
        cancelado: 0
      },
      porMetodoPago: {},
      ventasMensuales: Array(12).fill(0)
    };

    pedidos.forEach(pedido => {
      if (pedido.estado && stats.porEstado[pedido.estado] !== undefined) {
        stats.porEstado[pedido.estado]++;
      }

      const metodo = pedido.metodo_pago || 'Desconocido';
      stats.porMetodoPago[metodo] = (stats.porMetodoPago[metodo] || 0) + 1;

      const fecha = new Date(pedido.fecha_creacion);
      const mes = fecha.getMonth();
      if (!isNaN(mes)) {
        stats.ventasMensuales[mes] += parseFloat(pedido.total);
      }
    });

    return stats;
  };

  const stats = calcularEstadisticas();

  const dataEstado = {
    labels: ['Pendientes', 'Confirmados', 'Preparando', 'Enviados', 'Entregados', 'Cancelados'],
    datasets: [
      {
        data: [
          stats.porEstado.pendiente,
          stats.porEstado.confirmado,
          stats.porEstado.preparando,
          stats.porEstado.enviado,
          stats.porEstado.entregado,
          stats.porEstado.cancelado
        ],
        backgroundColor: [
          '#FFC107', // Amarillo para pendiente
          '#2196F3', // Azul para confirmado
          '#FF9800', // Naranja para preparando
          '#9C27B0', // Morado para enviado
          '#4CAF50', // Verde para entregado
          '#F44336'  // Rojo para cancelado
        ],
        borderWidth: 1
      }
    ]
  };

  const dataMetodoPago = {
    labels: Object.keys(stats.porMetodoPago),
    datasets: [
      {
        label: 'Métodos de Pago',
        data: Object.values(stats.porMetodoPago),
        backgroundColor: '#3F51B5',
        borderWidth: 1
      }
    ]
  };

  const dataVentasMensuales = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Ventas por Mes (S/)',
        data: stats.ventasMensuales,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<ShoppingCart fontSize="large" />}
            title="Total Pedidos"
            value={stats.totalPedidos}
            color="#3F51B5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<MonetizationOn fontSize="large" />}
            title="Ventas Totales"
            value={`S/ ${stats.totalVentas.toFixed(2)}`}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<CheckCircle fontSize="large" />}
            title="Entregados"
            value={stats.porEstado.entregado}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<Cancel fontSize="large" />}
            title="Cancelados"
            value={stats.porEstado.cancelado}
            color="#F44336"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartCard title="Distribución por Estado">
            <Pie data={dataEstado} />
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard title="Métodos de Pago">
            <Bar data={dataMetodoPago} />
          </ChartCard>
        </Grid>
        <Grid item xs={12}>
          <ChartCard title="Ventas Mensuales">
            <Bar 
              data={dataVentasMensuales} 
              options={{ 
                scales: { y: { beginAtZero: true } },
                responsive: true,
                plugins: { legend: { position: 'top' } }
              }} 
            />
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};

const GestionPedidosAdmin = () => {
  const { user, getToken } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [selectedPedidoId, setSelectedPedidoId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [tabValue, setTabValue] = useState('lista');
  const navigate = useNavigate();
  const tableRef = useRef();

  // Estados válidos según el backend
  const estadosValidos = ["pendiente", "confirmado", "preparando", "enviado", "entregado", "cancelado"];

  useEffect(() => {
    if (user && !['admin', 'superadministrador'].includes(user.rol)) {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchPedidos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = getToken();
      if (!token) throw new Error('No hay token de autenticación');
      
      const response = await fetch('http://localhost:3000/api/pedidos', {
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
      const pedidos = resultado.data;
      
      if (!Array.isArray(pedidos)) {
        throw new Error('Formato de datos incorrecto: no se recibió un array de pedidos');
      }

      setPedidos(pedidos);
      setFilteredPedidos(pedidos);
      setError(null);
    } catch (err) {
      console.error('Error al obtener pedidos:', err);
      setError(err.message || 'Error al cargar pedidos');
      setPedidos([]);
      setFilteredPedidos([]);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && ['admin', 'superadministrador'].includes(user.rol)) {
      fetchPedidos();
    }
  }, [user]);

  useEffect(() => {
    let result = pedidos;
    
    if (filterEstado !== 'todos') {
      result = result.filter(pedido => pedido.estado === filterEstado);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(pedido => 
        pedido.id.toString().includes(term) ||
        (pedido.usuario_nombre && pedido.usuario_nombre.toLowerCase().includes(term)) ||
        (pedido.usuario_correo && pedido.usuario_correo.toLowerCase().includes(term)) ||
        (pedido.metodo_pago && pedido.metodo_pago.toLowerCase().includes(term)) ||
        (pedido.estado && pedido.estado.toLowerCase().includes(term))
      );
    }
    
    setFilteredPedidos(result);
    setPage(0);
  }, [pedidos, filterEstado, searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportToExcel = () => {
    const data = filteredPedidos.map(pedido => ({
      ID: pedido.id,
      Fecha: new Date(pedido.fecha_creacion).toLocaleString(),
      Cliente: pedido.usuario_nombre || 'No especificado',
      Email: pedido.usuario_correo || 'No especificado',
      Teléfono: pedido.usuario_telefono || 'No especificado',
      Total: `S/ ${parseFloat(pedido.total).toFixed(2)}`,
      Estado: pedido.estado ? pedido.estado.toUpperCase() : 'NO ESPECIFICADO',
      'Método Pago': pedido.metodo_pago || 'No especificado',
      'Tipo Entrega': pedido.tipo_entrega || 'No especificado',
      Dirección: pedido.direccion || 'No especificado'
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");
    XLSX.writeFile(workbook, `Pedidos_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  const verDetalle = (pedido) => {
    setSelectedPedido(pedido);
    setModalOpen(true);
  };

  const actualizarEstado = async () => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:3000/api/pedidos/${selectedPedidoId}/estado`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: selectedEstado })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar estado');
      }
  
      setConfirmOpen(false);
      fetchPedidos();
      setSnackbarOpen(true);
      setError(`Estado actualizado a ${selectedEstado} correctamente`);
      
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      
      let errorMessage = error.message;
      
      // Manejo específico de errores conocidos
      if (error.message.includes('pedidos_estado_check')) {
        errorMessage = 'El estado seleccionado no es válido según las reglas del sistema';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Error de conexión con el servidor';
      }
  
      setError(errorMessage);
      setSnackbarOpen(true);
    }
  };

  const showConfirm = (pedidoId, nuevoEstado) => {
    setSelectedPedidoId(pedidoId);
    setSelectedEstado(nuevoEstado);
    setConfirmOpen(true);
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'pendiente': return <HourglassEmpty color="warning" />;
      case 'confirmado': return <CheckCircleIcon color="info" />;
      case 'preparando': return <SyncIcon color="info" />;
      case 'enviado': return <LocalShipping color="info" />;
      case 'entregado': return <CheckCircle color="success" />;
      case 'cancelado': return <Cancel color="error" />;
      default: return <InfoIcon color="info" />;
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'entregado': return 'success';
      case 'cancelado': return 'error';
      case 'confirmado':
      case 'preparando':
      case 'enviado': return 'info';
      default: return 'warning';
    }
  };

  const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { 
      id: 'fecha_creacion', 
      label: 'Fecha', 
      minWidth: 120,
      format: (value) => new Date(value).toLocaleString() 
    },
    { id: 'usuario_nombre', label: 'Cliente', minWidth: 150 },
    { 
      id: 'total', 
      label: 'Total', 
      minWidth: 90,
      format: (value) => `S/ ${parseFloat(value).toFixed(2)}` 
    },
    { 
      id: 'estado', 
      label: 'Estado', 
      minWidth: 130,
      render: (value) => (
        <Chip
          icon={getEstadoIcon(value)}
          label={value ? value.toUpperCase() : 'NO ESPECIFICADO'}
          color={getEstadoColor(value)}
          variant="outlined"
        />
      )
    },
    {
      id: 'acciones',
      label: 'Acciones',
      minWidth: 180,
      render: (_, row) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => verDetalle(row)}
            startIcon={<InfoIcon />}
          >
            Detalle
          </Button>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={row.estado || ''}
              label="Estado"
              onChange={(e) => showConfirm(row.id, e.target.value)}
            >
              {estadosValidos.map(estado => (
                <MenuItem key={estado} value={estado}>
                  {estado.charAt(0).toUpperCase() + estado.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )
    }
  ];

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando pedidos...</Typography>
      </Box>
    );
  }

  if (user && !['admin', 'superadministrador'].includes(user.rol)) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          No tienes permisos para acceder a esta página
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          aria-label="Secciones de pedidos"
        >
          <Tab label="Lista de Pedidos" value="lista" />
          <Tab label="Dashboard" value="dashboard" />
        </Tabs>
      </Box>

      {tabValue === 'lista' ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShoppingCart />
              Gestión de Pedidos
            </Typography>
            
            <Stack direction="row" spacing={1}>
              <MuiTooltip title="Exportar a PDF">
                <PDFDownloadLink 
                  document={<PedidosPDF pedidos={filteredPedidos} />} 
                  fileName={`Pedidos_${new Date().toISOString().slice(0,10)}.pdf`}
                >
                  {({ loading }) => (
                    <Button 
                      variant="outlined" 
                      startIcon={<PdfIcon />}
                      disabled={loading || filteredPedidos.length === 0}
                    >
                      {loading ? 'Generando...' : 'PDF'}
                    </Button>
                  )}
                </PDFDownloadLink>
              </MuiTooltip>
              
              <MuiTooltip title="Exportar a Excel">
                <Button 
                  variant="outlined" 
                  startIcon={<ExcelIcon />}
                  onClick={exportToExcel}
                  disabled={filteredPedidos.length === 0}
                >
                  Excel
                </Button>
              </MuiTooltip>
              
              <MuiTooltip title="Refrescar">
                <IconButton onClick={fetchPedidos}>
                  <RefreshIcon />
                </IconButton>
              </MuiTooltip>
            </Stack>
          </Box>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                size="small"
                placeholder="Buscar pedidos..."
                InputProps={{
                  startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel><FilterIcon sx={{ fontSize: 18, mr: 0.5 }} /> Estado</InputLabel>
                <Select
                  value={filterEstado}
                  label="Estado"
                  onChange={(e) => setFilterEstado(e.target.value)}
                >
                  <MenuItem value="todos">Todos los estados</MenuItem>
                  {estadosValidos.map(estado => (
                    <MenuItem key={estado} value={estado}>
                      {estado.charAt(0).toUpperCase() + estado.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            message={error || 'Operación realizada con éxito'}
            action={
              <Button color="inherit" size="small" onClick={() => setSnackbarOpen(false)}>
                <CloseIcon />
              </Button>
            }
          />

          <Paper sx={{ width: '100%', overflow: 'hidden', mb: 2 }} ref={tableRef}>
            <TableContainer>
              <Table stickyHeader aria-label="tabla de pedidos">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align || 'left'}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPedidos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="textSecondary">
                          {error ? `Error: ${error}` : 'No se encontraron pedidos'}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          sx={{ mt: 2 }}
                          onClick={fetchPedidos}
                          startIcon={<SyncIcon />}
                        >
                          Reintentar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPedidos
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((pedido) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={pedido.id}>
                          {columns.map((column) => {
                            const value = pedido[column.id];
                            return (
                              <TableCell key={column.id} align={column.align || 'left'}>
                                {column.render 
                                  ? column.render(value, pedido) 
                                  : column.format 
                                    ? column.format(value) 
                                    : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={filteredPedidos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Pedidos por página:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
          </Paper>
          
          <Dialog
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle>
              <Box display="flex" alignItems="center" gap={1}>
                <InfoIcon color="warning" />
                Confirmar cambio de estado
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography>
                ¿Estás seguro de cambiar el estado del pedido #{selectedPedidoId} a 
                <Chip 
                  label={selectedEstado?.toUpperCase()} 
                  color={getEstadoColor(selectedEstado)} 
                  sx={{ mx: 1 }} 
                />?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
              <Button 
                onClick={actualizarEstado}
                variant="contained"
                color="primary"
                startIcon={<CheckCircleIcon />}
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
          
          <Dialog
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            maxWidth="md"
            fullWidth
          >
            {selectedPedido && (
              <>
                <DialogTitle>
                  <Box display="flex" alignItems="center" gap={1}>
                    <ShoppingCart />
                    Detalle del Pedido #{selectedPedido.id}
                  </Box>
                </DialogTitle>
                <DialogContent dividers>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person /> Información del Cliente
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                      <Typography>
                        <strong>Nombre:</strong> {selectedPedido.usuario_nombre || 'No especificado'}
                      </Typography>
                      <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <strong><Email fontSize="small" /> Email:</strong> 
                        {selectedPedido.usuario_correo ? (
                          <a href={`mailto:${selectedPedido.usuario_correo}`}>{selectedPedido.usuario_correo}</a>
                        ) : 'No especificado'}
                      </Typography>
                      <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <strong><Phone fontSize="small" /> Teléfono:</strong> 
                        {selectedPedido.usuario_telefono ? (
                          <a href={`tel:${selectedPedido.usuario_telefono}`}>{selectedPedido.usuario_telefono}</a>
                        ) : 'No especificado'}
                      </Typography>
                      <Typography>
                        <strong>Fecha:</strong> {new Date(selectedPedido.fecha_creacion).toLocaleString()}
                      </Typography>
                      <Typography>
                        <strong>Método de Pago:</strong> {selectedPedido.metodo_pago || 'No especificado'}
                      </Typography>
                      <Typography>
                        <strong>Tipo de Entrega:</strong> {selectedPedido.tipo_entrega || 'No especificado'}
                      </Typography>
                      <Typography>
                        <strong>Estado:</strong> 
                        <Chip
                          icon={getEstadoIcon(selectedPedido.estado)}
                          label={selectedPedido.estado ? selectedPedido.estado.toUpperCase() : 'NO ESPECIFICADO'}
                          color={getEstadoColor(selectedPedido.estado)}
                          variant="outlined"
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                      <Typography>
                        <strong>Total:</strong> S/ {parseFloat(selectedPedido.total).toFixed(2)}
                      </Typography>
                    </Box>
                    {selectedPedido.direccion && (
                      <Typography sx={{ mt: 2 }}>
                        <strong>Dirección de entrega:</strong> {selectedPedido.direccion}
                      </Typography>
                    )}
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ShoppingCart fontSize="small" /> Productos ({selectedPedido.productos?.length || 0})
                  </Typography>
                  
                  <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Producto</strong></TableCell>
                          <TableCell align="center"><strong>Cantidad</strong></TableCell>
                          <TableCell align="right"><strong>P. Unitario</strong></TableCell>
                          <TableCell align="right"><strong>Subtotal</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(selectedPedido.productos || []).map((producto, index) => (
                          <TableRow key={`${producto.id}-${index}`}>
                            <TableCell>{producto.nombre || `Producto ${index + 1}`}</TableCell>
                            <TableCell align="center">{producto.cantidad}</TableCell>
                            <TableCell align="right">S/ {parseFloat(producto.precio).toFixed(2)}</TableCell>
                            <TableCell align="right">S/ {(producto.cantidad * producto.precio).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} align="right"><strong>TOTAL</strong></TableCell>
                          <TableCell align="right"><strong>S/ {parseFloat(selectedPedido.total).toFixed(2)}</strong></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </DialogContent>
                <DialogActions>
                  <Button 
                    onClick={() => setModalOpen(false)}
                    variant="outlined"
                  >
                    Cerrar
                  </Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        </>
      ) : (
        <PedidosDashboard pedidos={pedidos} loading={loading} />
      )}
    </Box>
  );
};

export default GestionPedidosAdmin;