// Componentes
import { MainGridDashboard } from "../components/GeneralDashboard";
// Dados
import { menuIconAdmin } from "../data/menuIcons";
// utils
import { useAuth } from "../utils/AuthContext";
// React Router
import { Outlet } from "react-router";
// Styles
import "../styles/Colaborador.css";

// ADMINISTRATIVO
export function AreaColaboradorAdmin() {
  const { user, onLogout } = useAuth();
  const menu = [
    "home",
    "pacientes",
    "leitos-e-internações",
    "relatórios",
    "gestão-de-profissionais",
    "financeiro",
    "registros",
    "sair",
  ];

  async function handleTabs(e) {
    if (e.currentTarget.value === "sair") {
      await onLogout();
    }
  }

  return (
    <MainGridDashboard
      pageName={"pagina-colab-admin"}
      tabs={menu}
      tabsIcon={menuIconAdmin}
      userName={user?.username}
      handleTabOnClick={handleTabs}
    >
      <Outlet />
    </MainGridDashboard>
  );
}
// Aba - Home
export function AbaHome() {
  return <h2>Home</h2>;
}

// Aba - Pacientes
export function AbaPacientesAdmin() {
  return <h2>Cadastrar Pacientes</h2>;
}

// Aba - Atendimentos
export function AbaRelatorios() {
  return <h2>Atendimentos</h2>;
}

// Aba - Profissionais de Saúde
export function AbaGestapProf() {
  return <h2>Gestão de Profissionais</h2>;
}

// Aba - Leitos e Internações
export function AbaLeitosInternacoes() {
  return <h2>Leitos e Internações</h2>;
}

// Aba - Financeiro
export function AbaFinanceiro() {
  return <h2>Financeiro</h2>;
}

// Aba - Registros
export function AbaRegistros() {
  return <h2>Registros</h2>;
}
