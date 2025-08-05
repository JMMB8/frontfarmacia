import { useState } from 'react';
import { Box, TextField, Button, Typography } from "@mui/material";
const IzipayPayment = ({ total, onSuccess,tipoEntrega }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVC, setCardCVC] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
  
    // Asegúrate de que total sea un número
    const totalNumber = Number(total) || 0;
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
  
      // Validar los datos de la tarjeta
      if (!cardNumber || !cardExpiry || !cardCVC) {
        setError("Por favor, completa todos los campos.");
        setLoading(false);
        return;
      }
  
      try {
        // Enviar los datos al backend para procesar el pago
        const response = await fetch("http://localhost:3000/api/pagos/izipay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardNumber,
            cardExpiry,
            cardCVC,
            amount: totalNumber, // Usar totalNumber en lugar de total
          }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          onSuccess(); // Llamar a la función de éxito (vaciar carrito, redirigir, etc.)
        } else {
          setError(data.error || "El pago falló. Por favor, intenta de nuevo.");
        }
      } catch (err) {
        setError("Hubo un error al procesar el pago.");
      }
  
      setLoading(false);
    };
  
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
        <TextField
          label="Número de Tarjeta"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Fecha de Expiración (MM/YY)"
          value={cardExpiry}
          onChange={(e) => setCardExpiry(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="CVC"
          value={cardCVC}
          onChange={(e) => setCardCVC(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Procesando..." : `Pagar S/${totalNumber.toFixed(2)}`}
        </Button>
      </Box>
    );
  };
  
  export default IzipayPayment;