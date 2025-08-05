import React from "react";
import { Box, Typography } from "@mui/material";

const AtencionFarmaceutica = () => {
  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      {/* Título Principal */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#B20000', textAlign: 'center', mb: 4 }}>
        Atención Farmacéutica
      </Typography>

      {/* Sección Descripción */}
      <Typography paragraph sx={{ textAlign: 'justify', mb: 2 }}>
        En Boticas Virgen de Lourdes le ofrecemos un servicio personalizado en todos nuestros puntos de venta. Nuestro personal farmacéutico está a su servicio para poder resolver todas sus dudas, y poder guiarlo y ayudarlo con sus dudas sobre los diferentes productos que necesite.
      </Typography>

      <Typography paragraph sx={{ textAlign: 'justify', mb: 2 }}>
        Nuestros químicos farmacéuticos estarán siempre prestos en sus consultas sobre las diferentes indicaciones de los medicamentos y productos que busque: posología, presentaciones, indicaciones, contraindicaciones, venta cruzada, entre otros.
      </Typography>

      <Typography paragraph sx={{ textAlign: 'justify', mb: 2 }}>
        Además, tiene a su disposición nuestra línea de central delivery (Telf. <strong>206-7000</strong>) que con mucho gusto podrá ayudarlo con sus consultas en el caso no pueda acercarse a uno de nuestros locales.
      </Typography>

      <Typography paragraph sx={{ textAlign: 'justify', mb: 6 }}>
        Junto con esto, también puede realizar consultas a través de nuestra área de consultas llenando un simple formulario a través de nuestra página de <a href="https://www.facebook.com/boticasperu" target="_blank" rel="noopener noreferrer" style={{ color: '#B20000', textDecoration: 'underline' }}>Facebook</a>.
      </Typography>
    </Box>
  );
};

export default AtencionFarmaceutica;
