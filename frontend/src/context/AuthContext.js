import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [idUsuario, setIdUsuario] = useState(null);
  const [email, setEmail] = useState(null); // nuevo estado

  const setAuthContext = (id, emailUsuario) => {
    setIdUsuario(id);
    setEmail(emailUsuario); // guardo el email para la inicial
  };

  const clearAuthContext = () => {
    setIdUsuario(null);
    setEmail(null);
  };

  const estaAutenticado = idUsuario !== null;

  return (
    <AuthContext.Provider
      value={{ idUsuario, email, setAuthContext, clearAuthContext, estaAutenticado }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
