// Main
import App from "../App";
import AcessoUsuario from "../components/Login";
// Dashboard
import AreaPaciente from "../components/Paciente";
import {
  AreaColaboradorProfSaude,
  AreaColaboradorAdmin,
} from "../components/Colaborador";

// Routes
const routes = [
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: AcessoUsuario },
      { path: "dashboard/paciente", Component: AreaPaciente },
      { path: "dashboard/profissional", Component: AreaColaboradorProfSaude },
      { path: "dashboard/administrativo", Component: AreaColaboradorAdmin },
    ],
  },
];

export default routes;
