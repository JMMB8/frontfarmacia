import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener el token
  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/api/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (data?.usuario) {
          setUser({
            id: data.usuario.id,
            nombre: data.usuario.nombre,
            email: data.usuario.correo_electronico || data.usuario.email,
            telefono: data.usuario.telefono,
            rol: data.usuario.rol
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.message.includes("400")) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setUser(null);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const signUp = async (formData) => {
    try {
      console.log("Datos enviados al servidor:", formData);
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el registro");
      }
    } catch (error) {
      console.error("❌ Error en el registro:", error);
      setError(error.message);
      throw error;
    }
  };

  const signIn = async ({ correo_electronico, contrasena }) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo_electronico, contrasena }),
      });
      
      const data = await response.json();
      console.log("✅ Datos recibidos en signIn:", data);

      if (!response.ok) {
        throw new Error(data.message || "Error en el inicio de sesión");
      }
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.usuario.id);
      
      setUser({
        id: data.usuario.id,
        nombre: data.usuario.nombre,
        email: data.usuario.correo_electronico || data.usuario.email,
        telefono: data.usuario.telefono,
        rol: data.usuario.rol
      });
    } catch (error) {
      console.error("❌ Error en el inicio de sesión:", error);
      setError(error.message);
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
  };

  const getUsers = async () => {
    try {
      const token = getToken();
      const response = await fetch("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      // Modificado para manejar tanto data.users como data directamente
      return Array.isArray(data) ? data : (data.users || []);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setError(error.message || "Error al cargar usuarios");
      throw error;
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:3000/api/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el rol");
      }
      
      const updatedUser = await response.json();
      
      // Si estamos actualizando nuestro propio rol, actualizamos el estado del usuario
      if (user && user.id === userId) {
        setUser(prevUser => ({
          ...prevUser,
          rol: newRole
        }));
      }
      
      return updatedUser;
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
      setError(error.message || "Error al actualizar el rol");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        signUp,
        signIn,
        signOut,
        getToken,
        getUsers,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};