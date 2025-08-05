import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Divider,
  Avatar,
  IconButton
} from "@mui/material";
import { 
  LocalShipping as DeliveryIcon,
  Store as PickupIcon,
  CreditCard as CreditCardIcon,
  Money as CashIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  AccountBalance as BankIcon,
  QrCode as QrCodeIcon,
  AttachFile as AttachFileIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import IzipayPayment from "./IzipayPayment";

const Pagos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { productos = [], total = 0 } = location.state || {};
  
  const [metodoPago, setMetodoPago] = useState("tarjeta");
  const [tipoEntrega, setTipoEntrega] = useState("recoger");
  const [direccion, setDireccion] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [comprobanteFile, setComprobanteFile] = useState(null);
  const [comprobantePreview, setComprobantePreview] = useState(null);

  // Datos de la cuenta bancaria
  const bankAccounts = [
    {
      id: 1,
      bankName: "BCP",
      accountType: "Cuenta de Ahorros",
      accountNumber: "191-23456789-0-12",
      cci: "00219112345678901234",
      beneficiary: "TU EMPRESA S.A.C.",
      qrImage: "/images/qr-bcp.jpg"
    },
    {
      id: 2,
      bankName: "Interbank",
      accountType: "Cuenta Corriente",
      accountNumber: "003-1234567890",
      cci: "00300312345678901234",
      beneficiary: "TU EMPRESA S.A.C.",
      qrImage: "/images/qr-interbank.jpg"
    }
  ];

  const [selectedBankAccount, setSelectedBankAccount] = useState(bankAccounts[0]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const totalConDelivery = tipoEntrega === "delivery" ? Number(total) + 5 : Number(total);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setError('Por favor, sube una imagen (JPEG, PNG) o PDF');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo es demasiado grande (máximo 5MB)');
        return;
      }

      setComprobanteFile(file);
      
      if (file.type.includes('image')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setComprobantePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setComprobantePreview(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setComprobanteFile(null);
    setComprobantePreview(null);
  };

  const handleConfirmarPago = async () => {
    try {
      if (!mounted) return;
      
      setLoading(true);
      setError(null);

      if (tipoEntrega === "delivery" && (!direccion || direccion.trim().length < 10)) {
        throw new Error("La dirección debe tener al menos 10 caracteres");
      }

      if (!productos || !Array.isArray(productos) || productos.length === 0) {
        throw new Error("No hay productos válidos en el carrito");
      }

      if ((metodoPago === "transferencia" || metodoPago === "qr") && !comprobanteFile) {
        throw new Error("Debes adjuntar el comprobante de pago");
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No se encontró token de autenticación");
      }

      // Primero creamos el pedido
      const pedidoData = {
        productos: productos.map(p => ({
          producto_id: p.id,
          cantidad: Math.max(1, Number(p.cantidad)),
          precio: Number(p.precio)
        })),
        total: Number(totalConDelivery),
        metodo_pago: metodoPago,
        tipo_entrega: tipoEntrega,
        ...(tipoEntrega === 'delivery' && { 
          direccion: direccion.trim() 
        }),
        cliente_id: user?.id || null,
        usuario_nombre: user?.nombre || '',
        usuario_correo: user?.email || '',
        usuario_telefono: user?.telefono || '',
        ...((metodoPago === "transferencia" || metodoPago === "qr") && {
          banco_destino: selectedBankAccount.bankName,
          numero_cuenta: selectedBankAccount.accountNumber,
          comprobante_pago: "pendiente"
        })
      };

      // Crear el pedido
      const pedidoResponse = await fetch('http://localhost:3000/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pedidoData)
      });

      if (!pedidoResponse.ok) {
        const errorData = await pedidoResponse.json().catch(() => ({}));
        const errorMessage = errorData.errors ? errorData.errors.join(', ') : 
                          errorData.message || `Error HTTP: ${pedidoResponse.status}`;
        throw new Error(errorMessage);
      }

      const pedidoCreado = await pedidoResponse.json();

      // Subir comprobante si es necesario
      if ((metodoPago === "transferencia" || metodoPago === "qr") && comprobanteFile) {
        const formData = new FormData();
        formData.append('comprobante', comprobanteFile);
        formData.append('pedidoId', pedidoCreado.id);

        const uploadResponse = await fetch('http://localhost:3000/api/pagos/upload-comprobante', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json().catch(() => ({}));
          throw new Error(errorData.message || "Error al subir el comprobante de pago");
        }

        // Opcional: Obtener la respuesta del servidor con la URL del comprobante
        const uploadResult = await uploadResponse.json();
        console.log('Comprobante subido:', uploadResult);
      }

      if (mounted) {
        navigate('/confirmacion', { 
          state: { 
            pedidoId: pedidoCreado.id,
            metodoPago,
            tipoEntrega,
            direccion: tipoEntrega === "delivery" ? direccion : null,
            total: totalConDelivery
          }
        });
      }

    } catch (error) {
      console.error('Error al confirmar pago:', error);
      if (mounted) {
        setError(error.message || "Ocurrió un error al procesar el pedido");
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  };

  const handleTipoEntregaChange = (e) => {
    try {
      setTipoEntrega(e.target.value);
      if (e.target.value === "recoger") {
        setDireccion("");
      }
    } catch (error) {
      console.error("Error al cambiar tipo de entrega:", error);
      setError("Error al seleccionar el método de entrega");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!productos || productos.length === 0) {
    useEffect(() => {
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }, [navigate]);

    return (
      <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          No hay productos en el carrito. Serás redirigido a la página principal...
        </Alert>
      </Box>
    );
  }

  const BankAccountInfo = ({ account }) => (
    <Box sx={{ 
      p: 2, 
      mb: 2, 
      border: '1px solid', 
      borderColor: 'divider',
      borderRadius: 1,
      backgroundColor: 'background.paper'
    }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        {account.bankName} - {account.accountType}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong>N° de Cuenta:</strong> {account.accountNumber}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong>CCI:</strong> {account.cci}
      </Typography>
      <Typography variant="body2">
        <strong>Titular:</strong> {account.beneficiary}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Resumen de la Compra
      </Typography>

      <Card sx={{ mb: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ mr: 1 }} /> Información del Cliente
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PersonIcon color="primary" sx={{ mr: 1 }} />
                <Typography>
                  <strong>Nombre:</strong> {user?.nombre || 'No disponible'}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmailIcon color="primary" sx={{ mr: 1 }} />
                <Typography>
                  <strong>Email:</strong> {user?.email || 'No disponible'}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon color="primary" sx={{ mr: 1 }} />
                <Typography>
                  <strong>Teléfono:</strong> {user?.telefono || 'No disponible'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper} sx={{ mb: 3, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: "bold" }}>Producto</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Cantidad</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Precio Unitario</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={`${producto.id}-${producto.tipoPrecio}`}>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.cantidad}</TableCell>
                <TableCell>S/{Number(producto.precio).toFixed(2)}</TableCell>
                <TableCell>S/{(producto.precio * producto.cantidad).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ p: 3, mb: 3, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <DeliveryIcon sx={{ mr: 1 }} /> Método de Entrega
        </Typography>
        
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            value={tipoEntrega}
            onChange={handleTipoEntregaChange}
          >
            <FormControlLabel
              value="recoger"
              control={<Radio color="primary" />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PickupIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography>Recoger en tienda</Typography>
                </Box>
              }
              sx={{ mb: 1 }}
            />
            <FormControlLabel
              value="delivery"
              control={<Radio color="primary" />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <DeliveryIcon sx={{ mr: 1, color: "secondary.main" }} />
                  <Typography>Delivery a domicilio (+S/5.00)</Typography>
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>

        {tipoEntrega === "delivery" && (
          <TextField
            fullWidth
            label="Dirección de entrega"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            sx={{ mt: 2 }}
            required
            error={!!error && tipoEntrega === "delivery" && !direccion.trim()}
            helperText={tipoEntrega === "delivery" ? "Ingrese una dirección detallada con al menos 10 caracteres" : ""}
            placeholder="Ej: Av. Javier Prado 1234, Lima 15021"
          />
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 3, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <CreditCardIcon sx={{ mr: 1 }} /> Método de Pago
        </Typography>
        
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
           {/* <FormControlLabel
              value="tarjeta"
              control={<Radio color="primary" />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CreditCardIcon sx={{ mr: 1, color: "info.main" }} />
                  <Typography>Tarjeta de crédito/débito</Typography>
                </Box>
              }
              sx={{ mb: 1 }}
            />*/}
            <FormControlLabel
              value="efectivo"
              control={<Radio color="primary" />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CashIcon sx={{ mr: 1, color: "success.main" }} />
                  <Typography>Efectivo al recoger/entrega</Typography>
                </Box>
              }
              sx={{ mb: 1 }}
            />
            <FormControlLabel
              value="transferencia"
              control={<Radio color="primary" />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <BankIcon sx={{ mr: 1, color: "warning.main" }} />
                  <Typography>Transferencia bancaria</Typography>
                </Box>
              }
              sx={{ mb: 1 }}
            />
            <FormControlLabel
              value="qr"
              control={<Radio color="primary" />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <QrCodeIcon sx={{ mr: 1, color: "secondary.main" }} />
                  <Typography>Pago con QR</Typography>
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>

        {metodoPago === "tarjeta" && (
          <Box sx={{ mt: 2 }}>
            <IzipayPayment 
              key={`izipay-${totalConDelivery}-${tipoEntrega}`}
              total={totalConDelivery} 
              onSuccess={handleConfirmarPago}
              tipoEntrega={tipoEntrega}
            />
          </Box>
        )}

        {(metodoPago === "transferencia" || metodoPago === "qr") && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              {metodoPago === "qr" ? "Pago con QR" : "Transferencia Bancaria"}
            </Typography>

            {metodoPago === "transferencia" && (
              <>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Selecciona el banco para realizar la transferencia:
                </Typography>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <RadioGroup
                    value={selectedBankAccount.id}
                    onChange={(e) => {
                      const selected = bankAccounts.find(acc => acc.id === parseInt(e.target.value));
                      setSelectedBankAccount(selected);
                    }}
                  >
                    {bankAccounts.map((account) => (
                      <FormControlLabel
                        key={account.id}
                        value={account.id}
                        control={<Radio size="small" />}
                        label={`${account.bankName} - ${account.accountType}`}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </>
            )}

            <BankAccountInfo account={selectedBankAccount} />

            {metodoPago === "qr" && (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                mb: 3,
                p: 2,
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 1
              }}>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Escanea este código QR para realizar el pago
                </Typography>
                <img 
                  src={selectedBankAccount.qrImage} 
                  alt="Código QR para pago" 
                  style={{ 
                    width: '200px', 
                    height: '200px',
                    objectFit: 'contain',
                    border: '1px solid #e0e0e0'
                  }} 
                />
                <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
                  Usa la app de tu banco para escanear el código
                </Typography>
              </Box>
            )}

            <Box sx={{ 
              backgroundColor: '#f9f9f9', 
              p: 2, 
              borderRadius: 1,
              mb: 3
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Instrucciones para completar el pago:
              </Typography>
              <ol style={{ paddingLeft: '20px', margin: 0 }}>
                <li>Realiza la transferencia por el monto exacto de <strong>S/{totalConDelivery.toFixed(2)}</strong></li>
                <li>Guarda el comprobante de transferencia (captura de pantalla o PDF)</li>
                <li>Sube el comprobante en el siguiente campo</li>
                <li>Confirma tu pedido</li>
              </ol>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium' }}>
                Subir comprobante de pago:
              </Typography>
              
              {!comprobanteFile ? (
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AttachFileIcon />}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Seleccionar archivo
                  <input 
                    type="file" 
                    hidden 
                    accept="image/*,.pdf" 
                    onChange={handleFileChange} 
                  />
                </Button>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 2, 
                  border: '1px solid', 
                  borderColor: 'divider',
                  borderRadius: 1,
                  backgroundColor: 'background.paper'
                }}>
                  {comprobantePreview ? (
                    <Avatar 
                      src={comprobantePreview} 
                      variant="rounded" 
                      sx={{ width: 56, height: 56, mr: 2 }} 
                    />
                  ) : (
                    <Avatar variant="rounded" sx={{ width: 56, height: 56, mr: 2 }}>
                      <AttachFileIcon />
                    </Avatar>
                  )}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2">{comprobanteFile.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {(comprobanteFile.size / 1024).toFixed(1)} KB
                    </Typography>
                  </Box>
                  <IconButton onClick={handleRemoveFile}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
              
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Formatos aceptados: JPG, PNG, PDF (máximo 5MB)
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleConfirmarPago}
              disabled={loading || !comprobanteFile || (tipoEntrega === "delivery" && !direccion.trim())}
              sx={{ 
                py: 2,
                mt: 3,
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark'
                }
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />
                  Procesando...
                </>
              ) : 'Confirmar Pedido'}
            </Button>
          </Box>
        )}
      </Paper>

      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        mb: 3,
        p: 2,
        backgroundColor: '#f9f9f9',
        borderRadius: 1,
        borderLeft: '4px solid',
        borderColor: 'primary.main'
      }}>
        <Typography variant="h6">
          Total {tipoEntrega === "delivery" ? "(con delivery)" : ""}:
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: 'primary.main' }}>
          S/{totalConDelivery.toFixed(2)}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {metodoPago === "efectivo" && (
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleConfirmarPago}
          disabled={loading || (tipoEntrega === "delivery" && !direccion.trim())}
          sx={{ 
            py: 2,
            mt: 2,
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark'
            }
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />
              Procesando...
            </>
          ) : 'Confirmar Pedido'}
        </Button>
      )}
    </Box>
  );
};

export default Pagos;