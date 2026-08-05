// Main
import App from "../App";
import AcessoUsuario from "../pages/Login";
// Dashboard
import AreaPaciente, {
  AbaConsulta,
  AbaExames,
  AbaHistoricoClinico,
  AbaMeusDados,
} from "../pages/Paciente";
import {
  AbaMinhaAgenda,
  AbaPacientes,
  AbaReceitasDigitais,
  AreaColaboradorProfSaude,
} from "../pages/Colaborador";
import {
  AreaColaboradorAdmin,
  AbaHome,
  AbaPacientesAdmin,
  AbaLeitosInternacoes,
  AbaRelatorios,
  AbaGestapProf,
  AbaFinanceiro,
  AbaRegistros,
} from "../pages/Administrativo";

// Routes
const routes = [
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: AcessoUsuario },
      { path: "/login", Component: AcessoUsuario },
      {
        path: "dashboard/paciente",
        Component: AreaPaciente,
        children: [
          { index: true, Component: AbaMeusDados },
          { path: "meus-dados", Component: AbaMeusDados },
          { path: "consulta", Component: AbaConsulta },
          { path: "exames", Component: AbaExames },
          { path: "historico-clinico", Component: AbaHistoricoClinico },
        ],
      },
      {
        path: "dashboard/profissional",
        Component: AreaColaboradorProfSaude,
        children: [
          { index: true, Component: AbaMinhaAgenda },
          { path: "minha-agenda", Component: AbaMinhaAgenda },
          { path: "pacientes", Component: AbaPacientes },
          { path: "receitas-digitais", Component: AbaReceitasDigitais },
        ],
      },
      {
        path: "dashboard/administrativo",
        Component: AreaColaboradorAdmin,
        children: [
          { index: true, Component: AbaHome },
          { path: "home", Component: AbaHome },
          { path: "pacientes", Component: AbaPacientesAdmin },
          { path: "leitos-e-internacoes", Component: AbaLeitosInternacoes },
          { path: "relatorios", Component: AbaRelatorios },
          { path: "gestao-de-profissionais", Component: AbaGestapProf },
          { path: "financeiro", Component: AbaFinanceiro },
          { path: "registros", Component: AbaRegistros },
        ],
      },
    ],
  },
];

export default routes;
