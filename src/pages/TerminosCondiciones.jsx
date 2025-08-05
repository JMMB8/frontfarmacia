import React from "react";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";

const TerminosCondiciones = () => {
  return (
    <Box sx={{ p: 3, maxWidth: "1200px", margin: "0 auto" }}>
      {/* Título Principal */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#B20000",
          textAlign: "center",
          mb: 4,
        }}
      >
        Términos y Condiciones
      </Typography>

      {/* Sección ACTORES */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        ACTORES
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        El Cliente o usuario (en adelante, Usuario) que está visitando la
        plataforma web de https://www.boticasvirgendelourdes.pe, de titularidad
        de COPORACIÓN BOTICAS VIRGEN DE LOURDES S.A.C. (en adelante Boticas VDL)
        con RUC Nº20610745246 con domicilio en AV palmeras MZ K LOTE 25 URB
        VILLA DEL NORTE, distrito de los Olivos, provincia y departamento de
        Lima.
      </Typography>

      {/* Sección MARCO LEGAL */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        MARCO LEGAL
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Los presentes Términos y Condiciones se rigen por la ley peruana y
        cualquier disputa que se produzca con relación a la validez, aplicación
        o interpretación de los mismos, incluyendo la Política de Privacidad y
        Tratamiento de Datos Personales, será resuelta en los tribunales de la
        Cuidad de Lima.
      </Typography>

      {/* Sección ACCESO Y ACEPTACIÓN */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        ACCESO Y ACEPTACIÓN DEL CLIENTE
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Estos Términos y Condiciones regulan el acceso y utilización por parte
        del Cliente o Usuario de los servicios y facilidades que ofrece la
        Plataforma Web. La condición de "Cliente" o "Usuario" (en adelante,
        Usuario) es adquirida por la mera navegación y/o utilización de la
        plataforma web (en adelante, la plataforma web).
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        El Cliente puede acceder y navegar por la plataforma web libremente sin
        necesidad de registrarse. Sin embargo, en algunos casos se requerirá del
        registro para acceder a los servicios suministrados por Boticas Perú o
        por terceros, a través de la plataforma, los cuales pueden estar sujetos
        a condiciones específicas.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Asimismo, el acceso y navegación por la plataforma por parte del Usuario
        implica la aceptación sin reservas de todas las disposiciones incluidas
        en los presentes Términos y Condiciones. Para utilizar la plataforma, el
        Usuario deberá dar lectura íntegra de los siguientes términos y
        condiciones, comprometiéndose a cumplir completamente con las
        condiciones establecidas.
      </Typography>

      {/* Sección ACCESO Y ZONA DE COBERTURA */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        ACCESO Y ZONA COBERTURA DE SITIO WEB
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        La cobertura del sitio web de Corporación Boticas Virgen de Lourdes
        S.A.C., estará disponible exclusivamente en Lima Metropolitana, y para
        usuarios que declaren ser mayores de 18 años de edad, quienes están
        facultados para asumir las responsabilidades correspondientes al uso de
        la plataforma online. De ser un menor de edad quien utilice los
        servicios de nuestro sitio web, sus acciones serán responsabilidad de
        sus padres o tutores legales a cargo. Corporación Boticas Virgen de
        Lourdes S.A.C. no se responsabiliza por la certeza de los Datos
        Personales provistos por el usuario.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        El usuario se compromete al uso correcto de los servicios ofrecidos en
        el sitio web de Corporación Boticas Virgen de Lourdes S.A.C., a fin de
        no interferir con el buen funcionamiento de la plataforma online, de
        modo que otros usuarios obtengan una buena experiencia en su uso. No es
        responsabilidad de Corporación Boticas Virgen de Lourdes S.A.C. el uso
        ilícito de su sitio web.
      </Typography>

      <List sx={{ pl: 4 }}>
        <ListItem sx={{ display: "list-item", listStyleType: "disc" }}>
          <Typography>
            Corporación Boticas virgen de lourdes S.A.C. se reserva el derecho
            de tomar acciones dependiendo la gravedad de la infracción por
            suplantación de identidad y/o datos personales:
          </Typography>
        </ListItem>
        <List sx={{ pl: 4 }}>
          <ListItem sx={{ display: "list-item", listStyleType: "circle" }}>
            <Typography>
              Suspensión de la cuenta del usuario de manera temporal
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "list-item", listStyleType: "circle" }}>
            <Typography>
              Suspensión de la cuenta del usuario de manera definitiva
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "list-item", listStyleType: "circle" }}>
            <Typography>
              Tomar acciones de responsabilidad civil y penal
            </Typography>
          </ListItem>
        </List>
      </List>

      <Typography paragraph sx={{ textAlign: "justify", mt: 2 }}>
        Corporación Boticas virgen de lourdes S.A.C., no se responsabiliza por
        las fallas, intermitencias o interrupciones que se den dentro de la
        página web que vayan más allá del control razonable.
      </Typography>

      {/* Sección RESPONSABILIDAD */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        RESPONSABILIDAD
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Corporación Boticas virgen de lourdes S.A.C., se compromete a cumplir
        con las obligaciones que demanden las autoridades peruanas respecto a
        las garantías comerciales, al contenido publicitario y a cumplir con las
        normas aplicadas a la jurisdicción peruana.
      </Typography>

      {/* Sección PROCESO DE REGISTRO */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        PROCESO DE REGISTRO
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Para realizar el pago de la compra generada por el usuario, éste deberá
        realizar su registro ingresando sus datos personales actualizados,
        completos y fidedignos como nombres y apellidos, DNI, domicilio, correo
        electrónico, teléfono, entre otros datos que sean necesarios. El usuario
        se responsabiliza por la certeza de los Datos Personales provistos.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        El usuario tendrá la potestad de autorizar la utilización de sus datos
        para fines promocionales y otros.
      </Typography>

      {/* Sección ENLACES EXTERNOS */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        ENLACES EXTERNOS
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        De ser el caso que en el sitio web de Corporación Boticas Virgen de
        Lourdes S.A.C. aparecieran enlaces o hipervínculos que pertenezcan a un
        sitio web ajeno, no garantizamos la veracidad, fiabilidad, calidad o
        información contenida en ellos. Corporación Boticas Virgen de Lourdes
        S.A.C. deslinda toda su responsabilidad ante cualquier inconveniente que
        el usuario pueda incurrir en su uso.
      </Typography>

      {/* Sección MÍNIMO Y MÁXIMO DE COMPRAS */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        MÍNIMO Y MÁXIMO DE COMPRAS POR DÍA
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        El usuario del sitio web de Corporación Boticas Virgen de Lourdes S.A.C.
        podrá realizar sus órdenes de compra de acuerdo a los máximos permitidos
        por categoría y el volumen del producto.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Corporación Boticas Virgen de Lourdes S.A.C. se reserva el derecho en el
        despacho de productos de acuerdo al volumen de entrega permitido por
        motorizado, esto con el fin de proteger la integridad del personal
        motorizado a cargo. Corporación Boticas Virgen de Lourdes S.A.C. se
        comunicará previamente con el cliente, a fin de manifestarle la
        anulación y/o atención parcial de su pedido.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        En el supuesto de que el producto a entregar sufra algún daño, deterioro
        o presentemos insuficiencia de stock, Corporación Boticas Virgen de
        Lourdes S.A.C. se comunicará con el usuario para la reprogramación de la
        entrega.
      </Typography>

      {/* Sección PROCESO DE ENVÍO */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        PROCESO DE ENVÍO
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Los productos solicitados en el sitio web de Boticas Virgen de Lourdes
        S.A.C. se entregarán en el domicilio indicado por el cliente, en el
        plazo indicado previa coordinación con el área de entrega y sujeta a la
        cobertura de envío en Lima Metropolitana.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Los datos personales brindados para la compra y envío de los productos
        son de responsabilidad del cliente como parte de la declaración de
        veracidad sobre la información proporcionada.
      </Typography>

      <List sx={{ pl: 4 }}>
        <ListItem sx={{ display: "list-item", listStyleType: "disc" }}>
          <Typography>
            Los cambios de dirección deben ser notificados de manera inmediata
            al correo boticavdl@gmail.com teniendo en cuenta que todo cambio de
            dirección está sujeto a condiciones que serán coordinadas
            previamente con el cliente antes de ejercer la entrega de productos:
          </Typography>
        </ListItem>
        <List sx={{ pl: 4 }}>
          <ListItem sx={{ display: "list-item", listStyleType: "circle" }}>
            <Typography>Cobertura de envío.</Typography>
          </ListItem>
          <ListItem sx={{ display: "list-item", listStyleType: "circle" }}>
            <Typography>
              Posibles modificaciones en el nuevo horario de envío.
            </Typography>
          </ListItem>
        </List>
      </List>

      <Typography paragraph sx={{ textAlign: "justify", mt: 2 }}>
        Por la seguridad de nuestros clientes y el personal de reparto, los
        motorizados no ingresarán a los edificios ni casas para la entrega de
        los pedidos. Los clientes deberán acercarse a recepcionar su pedido en
        la puerta principal.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Es responsabilidad del cliente que una persona mayor de 18 años
        debidamente identificada con DNI se encuentre en la dirección dada
        durante la fecha y hora coordinada con el área de entrega. Nuestro
        motorizado le hará firmar un cargo de entrega al titular o no de la
        compra.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Si al momento de la entrega no se encuentra una persona para recibirlo,
        COPORACIÓN BOTICAS Virgen de Lourdes S.A.C. se contactará con el
        cliente, para reprogramar la entrega con un flete adicional (gastos
        operativos S/ 5.00 soles).
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        En el supuesto que el cliente no pudiera recibir el pedido por segunda
        vez, COPORACIÓN BOTICAS Virgen de Lourdes S.A.C. previo acuerdo con el
        cliente, se dejará el pedido en el local que indique el cliente.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Es responsabilidad del cliente revisar que toda su orden de compra se
        encuentre completa, puesto que al firmar el cargo da conformidad de la
        misma. Después el cliente no podrá realizar reclamo por lo mismo
        (cantidad productos o número de producto).
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Con respecto al tipo de producto a entregar:
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        De ser productos de libre consumo, la entrega se podrá realizar a
        terceros (familiares, asesora del hogar, conserjes, etc.) y este dé su
        conformidad en la entrega del producto, entenderemos que el producto fue
        recibido satisfactoriamente, bajo responsabilidad del Cliente.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        De ser productos regulados con receta médica, se reprogramará la entrega
        de los productos en caso el titular de la compra no pueda recibirlo.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Los productos que requieran receta médica:
      </Typography>
      <List sx={{ pl: 4 }}>
        <ListItem sx={{ display: "list-item", listStyleType: "disc" }}>
          <Typography>
            El cliente deberá presentar su DNI para corroborar que los datos
            concuerden con la receta médica.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "list-item", listStyleType: "disc" }}>
          <Typography>
            El cliente deberá presentar la receta médica en físico o virtual al
            motorizado el cual compartirá una toma fotográfica a la central de
            ventas donde el químico farmacéutico validará la receta.
          </Typography>
        </ListItem>
      </List>

      <Typography paragraph sx={{ textAlign: "justify", mt: 2 }}>
        De existir algún inconveniente con los productos entregados, el cliente
        deberá comunicarlo al correo botticavdl@gmail.com, adjuntando la boleta
        de compra y foto del producto a reclamo, teniendo 24 horas una vez
        recibida su orden; habiendo concluido el plazo anterior no se aceptarán
        cambios ni devoluciones.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Finalmente, se procederá con la entrega de los productos.
      </Typography>

      {/* Sección MEDIOS DE PAGO */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        MEDIOS DE PAGO
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Los usuarios tienen tres opciones para realizar el pago de sus pedidos:
      </Typography>

      <List sx={{ pl: 4 }}>
        <ListItem sx={{ display: "list-item", listStyleType: "disc" }}>
          <Typography>Pago en línea vía web</Typography>
        </ListItem>
        <ListItem sx={{ display: "list-item", listStyleType: "disc" }}>
          <Typography>Pago en efectivo contra-entrega</Typography>
        </ListItem>
        <ListItem sx={{ display: "list-item", listStyleType: "disc" }}>
          <Typography>Pago con POS contra-entrega</Typography>
        </ListItem>
      </List>

      <Typography paragraph sx={{ textAlign: "justify", mt: 2 }}>
        Aceptamos tarjetas de créditos o débito emitidas por bancos del Perú
        como:
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
        <Typography sx={{ px: 2, py: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}>
          Visa
        </Typography>
        <Typography sx={{ px: 2, py: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}>
          MasterCard
        </Typography>
        <Typography sx={{ px: 2, py: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}>
          American Express
        </Typography>
        <Typography sx={{ px: 2, py: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}>
          Diners Club
        </Typography>
      </Box>

      <Typography paragraph sx={{ textAlign: "justify" }}>
        Corporación Boticas Virgen de Lourdes S.A.C. no validará la transacción
        cuando se evidencie o notifique algún tipo de fraude, cuando se produzca
        un error sistémico que distorsione el precio de las ofertas o cuando
        concurra alguna otra causa justificada, y procederá con la anulación de
        la transacción y la cancelación del despacho de la compra. El usuario
        deberá gestionar con su banco la devolución del importe comprometido y/o
        aclaración de cualquier duda.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Corporación Boticas Virgen de Lourdes S.A.C., deslinda toda
        responsabilidad por aspectos relacionados a los medios de pago, como
        cobros de comisiones, intereses por compras en cuotas, bloqueos,
        caducidad, fecha de emisión, entre otras, siendo estos contratos
        suscritos exclusivamente entre el banco emisor y el usuario o dueño de
        la tarjeta.
      </Typography>

      {/* Sección EMISIÓN DE COMPROBANTE */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        EMISIÓN DE COMPROBANTE DE PAGO
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        El usuario deberá seleccionar correctamente el tipo de documento
        electrónico que solicitará como comprobante de pago de su compra, ya que
        de acuerdo con el Reglamento de Comprobantes de Pago aprobado por
        Resolución de Superintendencia N° 007-99/SUNAT (RCP) y al Texto Único
        Ordenado de la Ley del Impuesto General a las Ventas e Impuesto
        Selectivo al Consumo, aprobado mediante Decreto Supremo N° 055-99-EF y
        legislación vigentes. Al aceptar estos términos y condiciones, el
        cliente puede acceder a su comprobante electrónico a través de nuestro
        sitio web, completando los datos solicitados.
      </Typography>

      {/* Sección PLAZO DE VALIDEZ */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        PLAZO DE VALIDEZ DE LA OFERTA Y PRECIO
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Todos los productos ofertados en la plataforma web, se atenderán hasta
        su agotamiento y los precios se respetarán siempre y cuando el cliente
        haya completado su compra. En caso de productos promocionales, hasta
        agotar stock y/o vigencia de la promoción.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Una vez emitido el comprobante de pago, el precio del producto se
        mantiene y no podrá ser cambiado por el motorizado y/o call center, ni
        existirá un pago adicional que no esté contemplado dentro del
        comprobante de pago.
      </Typography>

      {/* Sección PROMOCIONES */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        PROMOCIONES
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        La vigencia de las promociones y/o ofertas estarán sujetas a la fecha
        indicada en los banners promocionales o hasta agotar stock del producto,
        tomando en consideración el menor de estos plazos.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Las promociones ofrecidas en el sitio web de Corporación Boticas Virgen
        de Lourdes S.A.C., pueden tener variación en cuanto a su precio,
        promoción, etc., dado los costos adicionales que pudieran existir.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Las promociones ofrecidas en el sitio web de Corporación Boticas Perú
        S.A.C., no necesariamente estarán disponibles en otros canales de
        atención pertenecientes a Corporación Boticas Perú S.A.C., a menos que
        se señale expresamente en la publicidad compartida en el sitio web.
      </Typography>

      {/* Sección CAMBIOS Y DEVOLUCIONES */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        CAMBIOS Y DEVOLUCIONES
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Corporación Boticas Virgen de Lourdes S.A.C. sólo aceptará cambios y/o
        devoluciones de productos en buen estado (no dañados, ni manipulados
        indebidamente). Las solicitudes de devolución o cambio de productos
        deben reportarse a nuestro correo electrónico dirigido a
        boticavdl@gmail.com adjuntando el comprobante electrónico, y en un plazo
        no mayor a 24 horas desde la recepción del producto, de otro modo no se
        procederá con el cambio y/o devolución del producto.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Los cambios y/o devoluciones se podrán realizar en cualquiera de
        nuestros establecimientos en el horario de 8:00 a 20:00 horas, siempre
        que el establecimiento cuente con stock para realizar el cambio, de ser
        el caso.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Corporación Boticas Virgen de Lourdes S.A.C. se reserva el derecho de
        evaluar las condiciones y características del producto devuelto. Se
        verificará lo siguiente:
      </Typography>

      <List sx={{ pl: 4 }}>
        <ListItem sx={{ display: "list-item", listStyleType: "disc" }}>
          <Typography>El código de lote</Typography>
        </ListItem>
        <ListItem sx={{ display: "list-item", listStyleType: "disc" }}>
          <Typography>
            Si el producto ha sufrido algún daño por manipulación
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "list-item", listStyleType: "disc" }}>
          <Typography>
            Si el producto es devuelto sucio, manchado o deteriorado
          </Typography>
        </ListItem>
      </List>

      {/* Sección CANCELACIONES */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        CANCELACIONES
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        En caso el Usuario cometa un error en la solicitud de compra (error en
        dirección de entrega, datos personales, cantidad de productos, entre
        otros), deberá anular la compra inmediatamente y proceder con una nueva
        solicitud.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        El Usuario tiene la opción de cancelar su pedido vía:
      </Typography>

      <List sx={{ pl: 4 }}>
        <ListItem sx={{ display: "list-item", listStyleType: "disc" }}>
          <Typography>
            Correo electrónico a boticavdl@gmail.com (adjuntando su # orden,
            nombres completos y documentos de indentidad).
          </Typography>
        </ListItem>
      </List>

      {/* Sección DEVOLUCIÓN DE DINERO */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        DEVOLUCIÓN DE SU DINERO
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        En caso el Usuario solicite la devolución de su dinero podrá elegir
        entre:
      </Typography>

      <List sx={{ pl: 4 }}>
        <ListItem sx={{ display: "list-item", listStyleType: "disc" }}>
          <Typography>Una nota de crédito por el valor del producto</Typography>
        </ListItem>
        <ListItem sx={{ display: "list-item", listStyleType: "disc" }}>
          <Typography>
            Un reembolso a través del medio de pago que utilizó para comprar.
          </Typography>
        </ListItem>
      </List>

      <Typography paragraph sx={{ textAlign: "justify", mt: 2 }}>
        En el caso de pagos con tarjeta, el tiempo de devolución dependerá de la
        entidad bancaria del Usuario.
      </Typography>

      {/* Sección PROPIEDAD INTELECTUAL */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        PROPIEDAD INTELECTUAL
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        La marca Boticas Virgen de Lourdes, su logo, el diseño y funcionamiento
        de esta plataforma web son propiedad de Corporación Boticas Virgen de
        Lourdes S.A.C. y están debidamente registradas en INDECOPI.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Los demás nombres comerciales, marcas y sus logos son propiedad de sus
        respectivos dueños.
      </Typography>

      {/* Sección USO DE LA PLATAFORMA */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        USO DE LA PLATAFORMA WEB
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        El Usuario declara que ante el mal uso de la plataforma web, Boticas
        Virgen de Lourdes podrá bloquearlo de su lista de Usuarios o clientes
        permitidos para utilizar la plataforma web sin aviso alguno, por lo
        tanto, un mal uso de la aplicación, aprovechamiento indebido del mismo o
        actos que desnaturalicen o generen una situación de aprovechamiento y/o
        ventaja indebida por parte del Usuario que perjudique la plataforma web
        de Boticas Perú, se encuentra expresamente prohibido y será considerado
        como un acto de piratería de software que infringe las leyes de la
        propiedad intelectual e industrial, de tal forma que boticas Perú podrá
        exigir responsabilidad por el incumplimiento de esta condición, según la
        normativa vigente.
      </Typography>

      {/* Sección INEXISTENCIA DE RELACIÓN LABORAL */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        INEXISTENCIA DE RELACIÓN LABORAL
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        La participación del Usuario en el la plataforma web no constituye ni
        crea contrato de sociedad, de representación, de mandato, como así
        tampoco relación laboral alguna entre dicho Usuario y la plataforma web.
      </Typography>

      {/* Sección AUTORIZACIÓN PARA GRABAR */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        AUTORIZACIÓN PARA GRABAR
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        El Cliente acepta que la información necesaria para su identificación,
        se grabarán en la plataforma web.
      </Typography>

      {/* Sección REGISTRO Y RESPONSABILIDAD */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        REGISTRO Y RESPONSABILIDAD POR CONTRASEÑAS/ PRODUCTOS / SERVICIOS.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        El Usuario asume plena responsabilidad por el resguardo diligente de su
        correo electrónico, celular u cualquier otro dato personal, así como
        clave secreta (personal e intransferible) que aloje en su ordenador, PC,
        Tablet, teléfono inteligente (Smartphone) u otro de similar naturaleza,
        así como de la pérdida o sustracción de los mismos. Boticas Perú no
        asumirá responsabilidad alguna por las operaciones realizadas por el
        Usuario en la plataforma web. Boticas Perú recomienda al Usuario que no
        comparta con terceros ningún tipo de información, contraseña u otro dato
        de carácter personal, siendo responsable por el mal uso de dicha
        información y asumiendo la responsabilidad que pueda derivar de dicha
        falta de diligencia. Boticas Perú no garantiza que el Sitio sea siempre
        seguro o esté libre de errores, ni que funcione siempre sin
        interrupciones, retrasos o imperfecciones. Boticas Perú no se hace
        responsable de los posibles daños o perjuicios en la plataforma web que
        se puedan derivar de interferencias, omisiones, interrupciones, virus
        informáticos, averías o desconexiones en el funcionamiento operativo del
        sistema electrónico, de retrasos o bloqueos en el uso de este sistema
        electrónico causados por deficiencias o sobrecargas en el sistema de
        Internet o en otros sistemas electrónicos, así como también de daños que
        puedan ser causados por terceras personas mediante intromisiones
        ilegítimas fuera del control de Boticas Perú.
      </Typography>

      {/* Sección LIBRO DE RECLAMACIONES */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        LIBRO DE RECLAMACIONES
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Conforme a lo establecido en el Código de Protección y Defensa del
        Consumidor, Ley N° 29571, Corporación Boticas Virgen de Lourdes S.A.C.,
        pone a disposición del usuario un Libro de Reclamaciones virtual a fin
        de que éste pueda registrar sus quejas o reclamos formales sobre los
        servicios brindados. El Libro de Reclamaciones virtual puede ser
        encontrado en el siguiente enlace:{" "}
        <a
          href="https://boticasperu.pe/libro-de-reclamaciones"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#B20000", textDecoration: "underline" }}
        >
          https://boticasperu.pe/libro-de-reclamaciones
        </a>
      </Typography>

      {/* Sección COMUNICACIÓN CON EL USUARIO */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        COMUNICACIÓN CON EL USUARIO
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        El usuario acepta que el número telefónico y dirección de correo
        electrónico ingresados en el formulario de registro, serán utilizados
        como medio oficial de contacto entre el usuario y Corporación Boticas
        Perú S.A.C., siendo responsabilidad exclusivamente del usuario verificar
        que, en el momento de compra, sus datos personales se encuentren
        debidamente actualizados.
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        Ante cualquier consulta o reclamo, el usuario deberá dirigirse a nuestro
        canal de atención vía correo electrónico dirigido a:{" "}
        <a
          href="mailto:ecommerce@boticasperu.pe"
          style={{ color: "#B20000", textDecoration: "underline" }}
        >
          ecommerce@boticasperu.pe
        </a>{" "}
        adjuntando el comprobante electrónico de la compra.
      </Typography>

      {/* Sección DECLARACIÓN */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        DECLARACIÓN
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify" }}>
        El Usuario declara que para navegar, usar, instalar o marcar como
        favorito o acceso directo a el la plataforma web en cualquier canal
        electrónico, tales como: Un ordenador, PC, Tablet, teléfono inteligente
        (Smartphone) u otro de similar naturaleza que posea el Usuario es
        necesario la aceptación de los términos y condiciones comprendidos en el
        presente documento que podrá realizar a través de un clic, SMS, el
        ingreso de la clave secreta, clave dinámica y/o cualquier otro medio de
        autenticación que complemente y/o reemplace dichas claves, así como
        cualquier mecanismo de seguridad necesario para validar correctamente la
        identidad del Usuario y que impliquen la manifestación de voluntad de
        aceptación del Usuario. El Usuario entiende que el proceso y/o los
        mecanismos de aceptación establecidos por Boticas Perú en la plataforma
        web, han sido claros y le han permitido manifestar su aceptación
        voluntaria, libre y expresa, habiendo podido despejar las dudas que
        hubiera podido tener.
      </Typography>

      {/* Sección MODIFICACIÓN DE TÉRMINOS */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, fontWeight: "bold", color: "#B20000" }}
      >
        MODIFICACIÓN DE LOS TÉRMINOS Y CONDICIONES
      </Typography>
      <Typography paragraph sx={{ textAlign: "justify", mb: 6 }}>
        Corporación Boticas Virgen de Lourdes S.A.C., se reserva el derecho a
        modificar, actualizar o ampliar en cualquier momento los presentes
        Términos y Condiciones. Estos serán debidamente publicados en el sitio
        web, siendo el usuario responsable de la revisión del mismo al momento
        de realizar una nueva transacción. En el supuesto caso de que el usuario
        no se encuentre de acuerdo con la modificación y actualización, el
        usuario está en toda la potestad de no hacer uso de los servicios de
        Corporación Boticas Virgen de Lourdes S.A.C.
      </Typography>
    </Box>
  );
};

export default TerminosCondiciones;
