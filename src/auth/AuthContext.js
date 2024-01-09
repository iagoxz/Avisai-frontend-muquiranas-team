/*import React, { createContext, useContext, useState } from "react";

// Crie um contexto de autenticação
const AuthContext = createContext();

// Componente de provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Função de login
  const login = (email) => {
    if (email.includes("@")) {
      setUser({ email });
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};*/
