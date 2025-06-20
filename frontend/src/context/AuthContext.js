import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [idUsuario, setIdUsuario] = useState(null);

  const login = (idUsuario) => {
    setIdUsuario(idUsuario);
  }

  const logout = () => {
    setIdUsuario(null);
  }

  const estaAutenticado = idUsuario !== null;

  return (
    <AuthContext.Provider value={{ idUsuario, login, logout, estaAutenticado}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);