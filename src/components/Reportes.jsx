import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipoReporte, setTipoReporte] = useState("usuarios"); // Tipo de reporte por defecto
  const { user } = useAuth();

  // Cargar los reportes
  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Solicitando reportes de tipo:", tipoReporte);
        const response = await fetch(`http://localhost:3000/api/reportes/${tipoReporte}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        setReportes(data);
      } catch (error) {
        console.error("Error al obtener reportes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReportes();
    }
  }, [tipoReporte, user]);

  // Exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Título del reporte
    doc.text(`Reporte de ${tipoReporte}`, 10, 10);

    // Encabezados de la tabla
    const headers = getTableHeaders(tipoReporte);

    // Datos de la tabla
    const data = reportes.map((reporte) => getTableCells(reporte, tipoReporte));

    // Generar la tabla en el PDF
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 20, // Posición inicial de la tabla
    });

    // Guardar el PDF
    doc.save(`reporte_${tipoReporte}.pdf`);
  };

  // Exportar a Excel
  const exportToExcel = () => {
    // Encabezados de la tabla
    const headers = getTableHeaders(tipoReporte);

    // Datos de la tabla
    const data = reportes.map((reporte) => getTableCells(reporte, tipoReporte));

    // Crear una hoja de trabajo
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);

    // Crear un libro de trabajo y agregar la hoja
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte");

    // Guardar el archivo Excel
    XLSX.writeFile(wb, `reporte_${tipoReporte}.xlsx`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Reportes
      </Typography>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
  <Select
    value={tipoReporte}
    onChange={(e) => setTipoReporte(e.target.value)}
    sx={{ minWidth: 200 }} // Asegura que el Select tenga un ancho mínimo
  >
    <MenuItem value="usuarios">Usuarios</MenuItem>
    <MenuItem value="ventas">Ventas</MenuItem>
    <MenuItem value="productos-mas-vendidos">Productos Más Vendidos</MenuItem>
    <MenuItem value="actividad-usuarios">Actividad de Usuarios</MenuItem>
    <MenuItem value="ingresos-mensuales">Ingresos Mensuales</MenuItem>
  </Select>

  <Box sx={{ p: 3 }}>
  <Button variant="contained" color="primary" onClick={exportToPDF}>
    Exportar a PDF
  </Button>
  <Button variant="contained" color="success" onClick={exportToExcel} sx={{ ml: 2 }}>
    Exportar a Excel
  </Button>
</Box>
</Box>

      {reportes.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No hay reportes disponibles.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {getTableHeaders(tipoReporte).map((header, index) => (
                  <TableCell key={index} sx={{ fontWeight: "bold" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {reportes.map((reporte) => (
                <TableRow key={reporte.id || reporte.venta_id || reporte.mes}>
                  {getTableCells(reporte, tipoReporte).map((cell, index) => (
                    <TableCell key={index}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

// Función para generar los encabezados de la tabla según el tipo de reporte
const getTableHeaders = (tipoReporte) => {
  switch (tipoReporte) {
    case "usuarios":
      return ["ID", "Nombre", "Correo", "Fecha de Registro", "Sesiones", "Compras"];
    case "ventas":
      return ["ID Venta", "Usuario", "Fecha", "Monto", "Estado"];
    case "productos-mas-vendidos":
      return ["Producto", "Cantidad Vendida", "Monto Total"];
    case "actividad-usuarios":
      return ["Usuario", "Última Sesión", "Sesiones (Último Mes)", "Compras (Último Mes)"];
    case "ingresos-mensuales":
      return ["Mes", "Ventas", "Ingresos"];
    default:
      return ["ID", "Fecha"];
  }
};

// Función para generar las celdas de la tabla según el tipo de reporte
const getTableCells = (reporte, tipoReporte) => {
  switch (tipoReporte) {
    case "usuarios":
      return [
        reporte.id,
        reporte.nombre,
        reporte.correo_electronico,
        new Date(reporte.fecha_registro).toLocaleDateString(),
        reporte.total_sesiones,
        reporte.total_compras,
      ];
    case "ventas":
      return [
        reporte.venta_id,
        reporte.usuario,
        new Date(reporte.fecha_compra).toLocaleDateString(),
        `$${reporte.monto_total}`,
        reporte.estado,
      ];
    case "productos-mas-vendidos":
      return [
        reporte.producto,
        reporte.cantidad_vendida,
        `$${reporte.monto_total}`,
      ];
    case "actividad-usuarios":
      return [
        reporte.usuario,
        new Date(reporte.ultima_sesion).toLocaleDateString(),
        reporte.sesiones_ultimo_mes,
        reporte.compras_ultimo_mes,
      ];
    case "ingresos-mensuales":
      return [
        reporte.mes,
        reporte.total_ventas,
        `$${reporte.ingresos}`,
      ];
    default:
      return [reporte.id, new Date(reporte.fecha).toLocaleDateString()];
  }
};

export default Reportes;