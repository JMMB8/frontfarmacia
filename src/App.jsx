import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Somos from "./pages/Somos";
import Login from "./pages/Login";
import Registrar from "./pages/Register";
import Carrito from "./pages/Carrito";
import Productos from "./pages/Productos";
import ResultadosBusqueda from "./pages/ResultadosBusqueda"; // Importa el componente de resultados
import CategoriaList from "./components/CategoriaList";
import Favorito from "./components/Favorito";
import Perfil from "./pages/Perfil";
import ProductoDetalle from "./pages/ProductoDetalle";
import CrearProductos from "./pages/CrearProductos";
import ModificarProducto from "./components/ModificarProducto";
import ListaProductos from "./pages/ListaProductos";
import { CarritoProvider } from "./context/CarritoContext";
import RecuperarContrasena from "./pages/RecuperarContrasena";
import Reportes from "./components/Reportes";
import Pagos from "./components/Pagos";
import IzipayPayment from "./components/IzipayPayment";
import Confirmacion from "./components/Confirmacion";
import MisPedidos from "./components/MisPedidos";
import TerminosCondiciones from "./pages/TerminosCondiciones.jsx";
import PoliticaPrivacidad from "./components/PoliticaPrivacidad";
import AtencionFarmaceutica from "./pages/AtencionFarmaceutica";
import GestionDePedidos from "./components/GestionDePedidos";
import ResetPassword from "./pages/ResetPassword";
import UserManagement from "./components/UserManagement";
import PreguntasFrecuentes from "./components/PreguntasFrecuentes";
import AdminPagos from "./components/AdminPagos";

import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  return (
    <div style={styles.app}>
      <CarritoProvider>
        <Router>
          {/* Pasa la función setCategoriaSeleccionada al Navbar */}
          <Navbar onSelectCategoria={setCategoriaSeleccionada} />
          {/* 🔹 Contenedor principal. (Este contenedor empuja el footer hacia abajo) */}
          <div style={styles.content}>
            <Routes>
              <Route path="/" element={<Somos />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/recuperar-contrasena"
                element={<RecuperarContrasena />}
              />
              <Route path="/register" element={<Registrar />} />
              <Route path="/carrito" element={<Carrito />} />
              {/* Pasa la categoría seleccionada al componente Productos */}
              <Route
                path="/productos"
                element={
                  <Productos categoriaSeleccionada={categoriaSeleccionada} />
                }
              />
              <Route path="/buscar" element={<ResultadosBusqueda />} />{" "}
              {/* Nueva ruta */}
              <Route path="/categoriaList" element={<CategoriaList />} />
              <Route path="/favoritos" element={<Favorito />} />
              <Route path="/lista-productos" element={<ListaProductos />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/producto/:id" element={<ProductoDetalle />} />
              <Route path="/Crear-Producto" element={<CrearProductos />} />
              <Route
                path="/modificarproducto/:id"
                element={<ModificarProducto />}
              />
              <Route path="/reportes" element={<Reportes />} />
              <Route path="/pagos" element={<Pagos />} />
              <Route path="/izipay" element={<IzipayPayment />} />
              <Route path="/confirmacion" element={<Confirmacion />} />
              <Route path="/mis-pedidos" element={<MisPedidos />} />
              <Route
                path="/gestion-de-pedidos"
                element={<GestionDePedidos />}
              />
              <Route
                path="/restablecer-contrasena"
                element={<ResetPassword />}
              />
              <Route
                path="/terminos-y-condiciones"
                element={<TerminosCondiciones />}
              />
              <Route
                path="/politica-de-privacidad"
                element={<PoliticaPrivacidad />}
              />
              <Route
                path="/atencion-farmaceutica"
                element={<AtencionFarmaceutica />}
              />
              <Route path="/user-management" element={<UserManagement />} />
              <Route
                path="/preguntas-frecuentes"
                element={<PreguntasFrecuentes />}
              />
              <Route path="/admin-pagos" element={<AdminPagos />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </CarritoProvider>
    </div>
  );
};

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // Asegura que la app ocupe toda la altura de la pantalla
  },
  content: {
    flex: 1, // Hace que el contenido empuje el footer hacia abajo
  },
};

export default App;
