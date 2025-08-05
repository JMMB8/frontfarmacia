import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext"; // Importa el AuthContext

// 📌 Creacion del contexto del carrito
const CarritoContext = createContext();

const CarritoProvider = ({ children }) => {
  const { user } = useAuth(); // Obtén el usuario actual
  const [carrito, setCarrito] = useState([]);

  // 📌 Cargar el carrito del usuario al iniciar sesión
  useEffect(() => {
    if (user) {
      const carritoGuardado = localStorage.getItem(`carrito_${user.id}`);
      if (carritoGuardado) {
        setCarrito(JSON.parse(carritoGuardado));
      } else {
        setCarrito([]);
      }
    } else {
      setCarrito([]); // Vacía el carrito si no hay usuario
    }
  }, [user]);

  // 📌 Guardar el carrito en localStorage cada vez que se actualiza
  useEffect(() => {
    if (user) {
      localStorage.setItem(`carrito_${user.id}`, JSON.stringify(carrito));
    }
  }, [carrito, user]);

  // 📌 Función vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // 📌 Función para calculo total del carrito
  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  // 📌 Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (item) => item.id === producto.id
      );
      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  // 📌 Función para incrementar la cantidad de un producto en el carrito
  const incrementarCantidad = (id, tipoPrecio) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((p) =>
        p.id === id && p.tipoPrecio === tipoPrecio
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      )
    );
  };

  // 📌 Función para disminuir la cantidad de un producto en el carrito
  const disminuirCantidad = (id, tipoPrecio) => {
    setCarrito(
      (prevCarrito) =>
        prevCarrito
          .map((p) =>
            p.id === id && p.tipoPrecio === tipoPrecio
              ? { ...p, cantidad: p.cantidad - 1 }
              : p
          )
          .filter((p) => p.cantidad > 0) // Elimina el producto si la cantidad llega a 0
    );
  };

  // 📌 Función para eliminar un producto del carrito
  const eliminarDelCarrito = (id, tipoPrecio) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((p) => !(p.id === id && p.tipoPrecio === tipoPrecio))
    );
  };
  return (
    <CarritoContext.Provider
      value={{
        carrito,
        vaciarCarrito,
        agregarAlCarrito,
        incrementarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,

        calcularTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export { CarritoContext, CarritoProvider };
