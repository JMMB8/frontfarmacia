import React from 'react';
import {
  Box, Grid, Paper, Typography, Divider, CircularProgress,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
  ShoppingCart, MonetizationOn, LocalShipping,
  CheckCircle, Cancel, HourglassEmpty
} from '@mui/icons-material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Tab, Tabs } from '@mui/material';
import PedidosDashboard from './PedidosDashboard';

// Registra componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const PedidosDashboard = ({ pedidos, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Procesamiento de datos para gráficos
  const calcularEstadisticas = () => {
    const stats = {
      totalPedidos: pedidos.length,
      totalVentas: pedidos.reduce((sum, pedido) => sum + parseFloat(pedido.total), 0),
      porEstado: {
        completado: 0,
        cancelado: 0,
        pendiente: 0,
        preparando: 0
      },
      porMetodoPago: {},
      ventasMensuales: Array(12).fill(0)
    };

    pedidos.forEach(pedido => {
      // Conteo por estado
      if (pedido.estado && stats.porEstado[pedido.estado] !== undefined) {
        stats.porEstado[pedido.estado]++;
      }

      // Conteo por método de pago
      const metodo = pedido.metodo_pago || 'Desconocido';
      stats.porMetodoPago[metodo] = (stats.porMetodoPago[metodo] || 0) + 1;

      // Ventas por mes
      const fecha = new Date(pedido.fecha_creacion);
      const mes = fecha.getMonth();
      if (!isNaN(mes)) {
        stats.ventasMensuales[mes] += parseFloat(pedido.total);
      }
    });

    return stats;
  };

  const stats = calcularEstadisticas();

  // Datos para gráficos
  const dataEstado = {
    labels: ['Completados', 'Cancelados', 'Pendientes', 'Preparando'],
    datasets: [
      {
        data: [
          stats.porEstado.completado,
          stats.porEstado.cancelado,
          stats.porEstado.pendiente,
          stats.porEstado.preparando
        ],
        backgroundColor: [
          '#4CAF50', // Verde
          '#F44336', // Rojo
          '#FFC107', // Amarillo
          '#2196F3'  // Azul
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
      {/* Tarjetas de métricas */}
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
            title="Completados"
            value={stats.porEstado.completado}
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

      {/* Gráficos */}
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

// Componente auxiliar para tarjetas de métricas
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

// Componente auxiliar para contenedor de gráficos
const ChartCard = ({ title, children }) => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Typography variant="h6" gutterBottom>{title}</Typography>
    <Divider sx={{ mb: 2 }} />
    <Box sx={{ height: '300px' }}>
      {children}
    </Box>
  </Paper>
);

export default PedidosDashboard;