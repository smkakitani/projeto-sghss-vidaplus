// React
import { createContext, useCallback, useContext, useState } from "react";
// React Router
import { useNavigate } from "react-router";
// Dados
import { userRoles } from "../data/general";

// Context padrão
const AuthContext = createContext({
  user: {},
  onLogin: () => {},
  onLogout: () => {},
});

// Componente personalizado para autenticação
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  // Obtém dados para estabelecer o acesso de usuário
  // prettier-ignore
  const handleLogin = useCallback((userData) => {
    const userObj = {
      username: userData.nome,
      userId: userData.usuario,
      role: userData.perfil,
    };
    setUser(userObj);

    // Manter acesso de usuário mesmo atualizando a página
    localStorage.setItem("user", JSON.stringify(userObj));

    if (userObj.role === userRoles.paciente) {
      navigate(`/dashboard/paciente`);
    } else if (userObj.role === userRoles.admin) {
      navigate(`administrativo`);
    } else if (userObj.role === userRoles.prof) {
      navigate(`profissional`);
    }
  },[navigate]);

  const handleLogout = useCallback(() => {
    setUser(null);

    // Retira acesso do usuário
    localStorage.removeItem("user");

    navigate("/login", { replace: true,  });
  }, [navigate]);

  const value = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

// Custom hook para usar userContext com autenticação
const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used with AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
