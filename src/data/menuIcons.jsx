// Menu icons para prof saude
import DateRangeSharpIcon from "@mui/icons-material/DateRangeSharp";
import ArticleSharpIcon from "@mui/icons-material/ArticleSharp";
import GroupsSharpIcon from "@mui/icons-material/GroupsSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
// Menu icons para admin
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import MonitorHeartSharpIcon from "@mui/icons-material/MonitorHeartSharp";
import MedicalInformationSharpIcon from "@mui/icons-material/MedicalInformationSharp";
import AssessmentSharpIcon from "@mui/icons-material/AssessmentSharp";
import AdminPanelSettingsSharpIcon from "@mui/icons-material/AdminPanelSettingsSharp";
import SavingsSharpIcon from "@mui/icons-material/SavingsSharp";
// Menu icons para paciente
import AccountBoxSharpIcon from "@mui/icons-material/AccountBoxSharp";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import PlagiarismSharpIcon from "@mui/icons-material/PlagiarismSharp";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";

export const menuIconProfSaude = {
  "minha-agenda": <DateRangeSharpIcon />,
  "receitas-digitais": <ArticleSharpIcon />,
  "pacientes": <GroupsSharpIcon />,
  "sair": <LogoutSharpIcon />,
};

export const menuIconAdmin = {
  "home": <HomeSharpIcon />,
  "pacientes": <GroupsSharpIcon />,
  "relatórios": <AssessmentSharpIcon />,
  "gestão-de-profissionais": <MedicalInformationSharpIcon />,
  "leitos-e-internações": <MonitorHeartSharpIcon />,
  "registros": <AdminPanelSettingsSharpIcon />,
  "financeiro": <SavingsSharpIcon />,
  "sair": <LogoutSharpIcon />,
};
export const menuIconPaciente = {
  "meus-dados": <AccountBoxSharpIcon />,
  "consulta": <CalendarMonthSharpIcon />,
  "exames": <PlagiarismSharpIcon />,
  "histórico-clínico": <PendingActionsSharpIcon />,
  "sair": <LogoutSharpIcon />,
};
