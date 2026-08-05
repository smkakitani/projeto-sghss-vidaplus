// React
// Componentes
import { MainGridDashboard } from "../components/GeneralDashboard";
// Dados
import { menuIconProfSaude } from "../data/menuIcons";
// utils
import { useAuth } from "../utils/AuthContext";
// React Router
import { Outlet } from "react-router";
// Styles
import "../styles/Colaborador.css";

// PROFISSIONAL DA SAÚDE
export function AreaColaboradorProfSaude() {
  const { user, onLogout } = useAuth();
  const menu = ["minha-agenda", "pacientes", "receitas-digitais", "sair"];

  async function handleTabs(e) {
    if (e.currentTarget.value === "sair") {
      await onLogout();
    }
  }

  return (
    <MainGridDashboard
      pageName={"pagina-colab-admin"}
      tabs={menu}
      tabsIcon={menuIconProfSaude}
      userName={user?.username}
      handleTabOnClick={handleTabs}
    >
      <Outlet />
    </MainGridDashboard>
  );
}

// Aba - Agenda
export function AbaMinhaAgenda() {
  return <h2>Minha Agenda</h2>;
}

// Aba - Receitas Digitais
export function AbaReceitasDigitais() {
  return <h2>Receitas Digitais</h2>;
}

// Aba - Pacientes
export function AbaPacientes() {
  return <h2>Pacientes</h2>;
}
