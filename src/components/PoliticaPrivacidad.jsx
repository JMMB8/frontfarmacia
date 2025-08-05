import React from "react";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";

const PoliticaPrivacidad = () => {
  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      {/* Título Principal */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#B20000', textAlign: 'center', mb: 4 }}>
        Política de Privacidad y Tratamiento de Datos Personales
      </Typography>

      {/* Sección ACTORES */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#B20000' }}>
        ACTORES
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        El Cliente o usuario (en adelante, Usuario) que está visitando la plataforma web https://www.boticasvirgendelourdes.pe, de titularidad de COPORACIÓN BOTICAS PERÚ S.A.C. (en adelante Boticas Perú) con RUC Nº20515346113 con domicilio en Jr. Baltazar Grados Nº974, Distrito de San Juan de Miraflores, provincia y departamento de Lima. Además, el Usuario es el titular de los datos personales, mientras que Boticas Perú es el titular de la Base de Datos.
      </Typography>

      {/* Sección MARCO LEGAL */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#B20000' }}>
        MARCO LEGAL
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        Este documento se ha redactado de acuerdo con la Ley de Protección de Datos Personales (Ley Nº29733), su Reglamento (Decreto Supremo Nº 003-2013-JUS) y demás disposiciones complementarias.
      </Typography>

      {/* Sección CONSENTIMIENTO */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#B20000' }}>
        CONSENTIMIENTO
      </Typography>
      <List sx={{ pl: 4 }}>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>El Usuario declara dar su consentimiento libre, previo, expreso, inequívoco e informado a Boticas Virgen de Lourdes S.A.C.</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>El consentimiento del Usuario del uso de su información personal, y/o sensible de ser el caso, servirá para las finalidades que el tratamiento de datos requiera.</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>La información que el Usuario brinde será almacenada en el Banco de Datos de Boticas Virgen de Lourdes.</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>Los Datos Personales pueden ser tratados por un tercero. De ser este el caso, se especificará más adelante al responsable en el ANEXO I.</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>El Usuario se somete a las consecuencias de proporcionar sus datos personales y podrá revocarlo cuando este desee siempre y cuando se comunique con <a href="mailto:remover@boticasperu.com.pe" style={{ color: '#B20000', textDecoration: 'underline' }}>remover@boticasperu.com.pe</a> manifestando su intensión.</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>De ser el caso, la revocación del consentimiento se hará efectiva en un plazo no mayor a 5 días hábiles.</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>El Usuario da su consentimiento a Boticas Virgen de Lourdes sobre el almacenamiento y modificación de las cookies necesarias para la navegación en su plataforma web, así como otras cookies que Boticas Perú crea conveniente.</Typography>
        </ListItem>
      </List>

      {/* Sección DATOS PERSONALES */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#B20000' }}>
        DATOS PERSONALES
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        De acuerdo con la ley, se define el término Datos Personales como "aquella información numérica, alfabética, gráfica, fotográfica, acústica, sobre hábitos personales, o de cualquier otro tipo concerniente a las personas naturales que las identifica o las hace identificables a través de medios que puedan ser razonablemente utilizados." Boticas Perú considera como datos personales, a toda aquella información que el usuario ingrese voluntariamente a través de cualquiera de los formularios en nuestros sitios web o la que se envía por correo electrónico y cualquier otro medio electrónico y/o físico.
      </Typography>

      {/* Sección FINALIDADES */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#B20000' }}>
        FINALIDADES
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        Con la conformidad y aceptación del Usuario al momento de registrarse y/o hacer uso de la plataforma web, este autoriza a Boticas Perú a recopilar, acceder, registrar, organizar, almacenar, conservar, elaborar, modificar, extraer, consultar, utilizar, bloquear, entregar para tratamiento por encargo transferir a nivel nacional e internacional, comunicar, modificar, suprimir y, en general, tratar los datos personales del Usuario para suministrar de manera eficiente los Servicios proporcionados a través de esta plataforma web.
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        En esa línea, Boticas Virgen de Lourdes podrá utilizar los datos personales de los Usuarios para las siguientes finalidades necesarias:
      </Typography>
      
      <List sx={{ pl: 4 }}>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>Verificar y validar la identidad de los Usuarios.</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>Formalizar y gestionar los pedidos de los productos y/o servicios que se contraten a través de la plataforma.</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>Notificar y comunicar, por los medios puestos a disposición de la plataforma web, el proceso de entrega y el estado de los pedidos de los productos y/o servicios contratados.</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>Para prevenir o detectar fraudes o actividades delictivas o para gestionar y resolver cualquier pérdida real o potencial en relación con un delito o fraude.</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>Atender y gestionar los reclamos, quejas, consultas y solicitudes que realice a través de los canales autorizados por Boticas Perú.</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>Compartir con sus proveedores de servicios o las empresas de "outsourcing" o con las empresas con quienes se tenga una relación de colaboración o alianza, que contribuyan a mejorar o facilitar las operaciones a través de la plataforma web.</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>Para cumplir con las obligaciones generadas por los vínculos contractuales y no contractuales generados con el Usuario.</Typography>
        </ListItem>
      </List>
      
      <Typography paragraph sx={{ textAlign: 'justify', mt: 2 }}>
        De manera opcional, los datos personales de los Usuarios podrán ser utilizados por Boticas Virgen de Lourdes con la finalidad de gestionar la suscripción al boletín informativo y envío de publicidad y promociones:
      </Typography>
      
      <List sx={{ pl: 4 }}>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>Publicidad y promociones de Boticas Virgen de Lourdes</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
          <Typography>Enviar al cliente información comercial, promocional y/o publicidad con relación a los productos y/o servicios ofrecidos en la plataforma web vía medio electrónico o telefónico, así como realizar estudios de mercado y perfiles de compra.</Typography>
        </ListItem>
      </List>
      
      <Typography paragraph sx={{ textAlign: 'justify', mt: 2 }}>
        Le informamos que, para las finalidades opcionales de sus datos personales, Boticas Virgen de Lourdes podrá compartir su información con socios comerciales. La relación actualizada de empresas que comprenden sus socios comerciales se encuentra detallada en el ANEXO I adjunto, denominado "Lista de socios comerciales". En caso sea necesario, esta lista será actualizada de manera oportuna por Boticas Perú por esta vía.
      </Typography>

      {/* Sección HERRAMIENTAS DE RECOPILACIÓN */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#B20000' }}>
        HERRAMIENTAS DE RECOPILACIÓN DE INFORMACIÓN
      </Typography>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
        Dirección IP:
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        Su dirección IP es usada para recopilar información demográfica. Se recopila la dirección IP para administrar y proveer información agregada a los anunciantes sobre el volumen de uso de la plataforma web. Esta información normalmente no identifica o vincula a la persona, por lo que usted puede iniciar su sesión en nuestra página, pero al mismo tiempo permanecer de forma anónima. Se usará la dirección IP para identificar a un usuario cuando se considere necesario para hacer cumplir los términos y condiciones o para proteger nuestros servicios, la plataforma web, a nuestros visitantes u otros.
      </Typography>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
        Cookies:
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        Las cookies son archivos de texto que se almacenan en su computadora. Se usan las cookies para distintas finalidades, que incluyen entender y guardar las preferencias del usuario para futuras visitas, llevar un control de los anuncios, actualizar nuestro sitio basados en información como el número de visitantes y las páginas vistas, así como el correcto funcionamiento de la plataforma web.
      </Typography>

      {/* Sección TRATAMIENTO DE DATOS */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#B20000' }}>
        TRATAMIENTO DE DATOS PERSONALES
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        Boticas Virgen de  Lourdes garantiza al usuario que el tratamiento de sus datos personales se limite a las finalidades antes mencionadas, que se mantenga confidencial y se implementen las medidas de seguridad necesarias. Los datos personales pueden ser tratados por terceros responsables.
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        Los terceros encargados podrán tener acceso a los datos personales del usuario. El usuario acepta conocer que se encuentran detallados en este documento. Se le comunicará al usuario que cualquier variación de los encargados de los datos personales será notificada al correo electrónico del usuario. Cualquier variación de los encargados de datos personales será modificada y consignada en el Anexo I en la sección "Lista de Proveedores".
      </Typography>

      {/* Sección DERECHOS ARCO */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#B20000' }}>
        DERECHOS ARCO
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        De conformidad con la Ley, el usuario podrá solicitar, en cualquier momento, sus derechos de acceso, actualización, rectificación, inclusión, oposición y supresión o cancelación de datos personales escribiendo un correo con el asunto "Derechos ARCO" y enviándolo a la dirección de correo electrónico <a href="mailto:ecommerce@boticasperu.pe" style={{ color: '#B20000', textDecoration: 'underline' }}>ecommerce@boticasperu.pe</a>, debiendo adjuntar en ambos casos una copia de su DNI.
      </Typography>

      {/* Sección SEGURIDAD Y CONFIDENCIALIDAD */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#B20000' }}>
        SEGURIDAD Y CONFIDENCIALIDAD DE LOS DATOS
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        Boticas Virgen de Lourdes se compromete a cumplir con los estándares de seguridad y confidencialidad necesarios para asegurar la confiabilidad, integridad y disponibilidad de la información recopilada de los usuarios. El Usuario es el único responsable de suministrar sus datos personales a Boticas Virgen de Lourdes.
      </Typography>

      {/* Sección PRIVACIDAD */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#B20000' }}>
        PRIVACIDAD
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        Boticas Virgen de Lourdes no recopila datos personales sobre el usuario, excepto cuando el mismo brinde información voluntariamente al registrarse en alguno de los sitios web o cuando envíe un correo electrónico u otra comunicación dirigida a la Boticas Virgen de Lourdes.
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        Boticas Virge de Lourdes se compromete a mantener confidencial la información proporcionada por el usuario.
      </Typography>

      {/* Sección PLAZO DE ALMACENAMIENTO */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#B20000' }}>
        PLAZO DE ALMACENAMIENTO
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        Boticas Virgen de Lourdes podrá dar tratamiento de los datos personales por tiempo indefinido, salvo que el Usuario ejerza su derecho de cancelación.
      </Typography>

      {/* Sección ACEPTACIÓN */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#B20000' }}>
        ACEPTACIÓN DE LA POLÍTICA DE PRIVACIDAD Y TRATAMIENTO DE DATOS PERSONALES
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify' }}>
        Esta Política de Privacidad y Tratamiento de los Datos Personales es documento constituye un acuerdo válido entre el Usuario y Boticas Virgen de Lourdes, que confirma el conocimiento, entendimiento y aceptación por parte del Usuario de lo expuesto con los fines expresados. En caso no estar de acuerdo, el usuario no deberá proporcionar ninguna información personal, ni utilizar el servicio o cualquier información relacionada con los sitios web de Boticas Virgen de Lourdes.
      </Typography>

      {/* Sección ACTUALIZACIÓN */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#B20000' }}>
        ACTUALIZACIÓN DE LA POLÍTICA DE PRIVACIDAD Y TRATAMIENTO DE DATOS PERSONALES
      </Typography>
      <Typography paragraph sx={{ textAlign: 'justify', mb: 6 }}>
        Boticas Virgen  de Lourdes se reserva el derecho de actualizar, ampliar y/o modificar la Política de Privacidad y Tratamiento de Datos Personales (este documento) en cualquier momento, sin previo aviso.
      </Typography>
    </Box>
  );
};

export default PoliticaPrivacidad;