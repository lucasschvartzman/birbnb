import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [idUsuario, setIdUsuario] = useState(null);

  const setAuthContext = (idUsuario) => {
    setIdUsuario(idUsuario);
  }

  const clearAuthContext = () => {
    setIdUsuario(null);
  }

  const estaAutenticado = idUsuario !== null;

  return (
    <AuthContext.Provider value={{ idUsuario, setAuthContext, clearAuthContext, estaAutenticado}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);