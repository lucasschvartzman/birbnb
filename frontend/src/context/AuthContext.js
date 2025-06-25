import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const setAuthContext = (usuario) => {
    setUsuario(usuario);
  };

  const clearAuthContext = () => {
    setUsuario(null);
  };

  const estaAutenticado = usuario !== null;

  return (
    <AuthContext.Provider
      value={{ usuario, estaAutenticado, setAuthContext, clearAuthContext}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
