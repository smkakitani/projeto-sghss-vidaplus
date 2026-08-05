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
import { AreaColaboradorProfSaude, AreaColaboradorAdmin } from "../pages/Colaborador";

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
      { path: "dashboard/profissional", Component: AreaColaboradorProfSaude },
      { path: "dashboard/administrativo", Component: AreaColaboradorAdmin },
    ],
  },
];

export default routes;
