// Menu icons para prof saude
import DateRangeSharpIcon from '@mui/icons-material/DateRangeSharp';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import ArticleSharpIcon from '@mui/icons-material/ArticleSharp';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';

// Menu icons para admin
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import MonitorHeartSharpIcon from '@mui/icons-material/MonitorHeartSharp';
import MedicalInformationSharpIcon from '@mui/icons-material/MedicalInformationSharp';
import LocalPhoneSharpIcon from '@mui/icons-material/LocalPhoneSharp';

// Menu icons para paciente
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import PlagiarismSharpIcon from '@mui/icons-material/PlagiarismSharp';
import PendingActionsSharpIcon from '@mui/icons-material/PendingActionsSharp';



/* Funções GERAIS */
// Funções de formatação
export function removeAccentPTBR(str) {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[çÇ]/g, 'c');
}

export function capitalize(str) {
  return str
    .trim() // retirar espaços que possam conter no início e/ou no fim
    .toLowerCase() // padrozinhar
    .split(" ") // separar em palavras
    .map( word => { 
      // excluir palavras que começam com 'd' e com 2 letras
      if (word.length === 2 && word.startsWith("d")) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function formatTel(str) {
  if (str.length === 10) {
    // Formato: (xx)xxxx-xxxx
    return `(${str.slice(0, 2)})${str.slice(2, 6)}-${str.slice(6)}`;
  } else if (str.length === 11) {
    // Formato: (xx)xxxxx-xxxx
    return `(${str.slice(0, 2)})${str.slice(2, 7)}-${str.slice(7)}`;
  } else {
    return str;
  }
}

function formatCpf(str) {
  const part1 = str.slice(0, 3);
  const part2 = str.slice(3, 6);
  const part3 = str.slice(6, 9);
  const part4 = str.slice(9);

  return `${part1}.${part2}.${part3}-${part4}`
}

function formatBirthDate(str) {
  // formata para o padrão brasileiro
  const date = str.split('-');
  const [year, month, day] = date;
  return `${day}/${month}/${year}`;
}

function formatCep(str) {
  const part1 = str.slice(0, 5);
  const part2 = str.slice(5);

  return `${part1}-${part2}`
}

export function prettifyString(text, inputName) {
  switch (inputName) {
    case 'cep':
      // console.log('formatando o telefone...');
      return formatCep(text);
    case 'telefone':
      // console.log('formatando o telefone...');
      return formatTel(text);
    case 'cpf':
      // console.log('formatando o cpf...');
      return formatCpf(text);
    case 'dataNascimento':
      // console.log('formatando a data de nascimento...');
      return formatBirthDate(text);
    case 'nomeCompleto':
      // console.log('formatando o nome completo...');
      return capitalize(text);
    case 'cidade':
      // console.log('formatando cidade...');
      return capitalize(text);
    case 'logradouro':
      // console.log('formatando cidade...');
      return capitalize(text);
    default:
      // console.log('wut...');
      return text;
  }
}


/* Dados para COLABORADORES */
export const testUserAdmin = {
  usuario: 'miau_silva@emial.com.br',
  senha: 'miaumiau',
  loginType: 'admin'
};

export const testUserProf = {
  usuario: 'miau_silva@emial.com.br',
  senha: 'miaumiau',
  loginType: 'profissional'
};

export const menuContentAdmin = [
  'home',
  'pacientes',
  'atendimentos',
  'profissionais-de-saúde',
  'leitos-e-internações',
  'sair',
];

export const menuIconAdmin = {
  'home': <HomeSharpIcon />,
  'pacientes': <GroupsSharpIcon />,
  'atendimentos': <LocalPhoneSharpIcon />,
  'profissionais-de-saúde': <MedicalInformationSharpIcon />,
  'leitos-e-internações': <MonitorHeartSharpIcon />,
  'sair': <LogoutSharpIcon />
};



export const menuContentProfSaude = [
  'agenda',
  'prontuários',
  'receitas-digitais',
  'pacientes',
  'sair'
];

export const menuIconProfSaude = {
  'agenda': <DateRangeSharpIcon />,
  'prontuários': <DescriptionSharpIcon />,
  'receitas-digitais': <ArticleSharpIcon />,
  'pacientes': <GroupsSharpIcon />,
  'sair': <LogoutSharpIcon />
};



/* Dados para PACIENTES */
export const testUserPaciente = {
  usuario: '12312312312',
  senha: 'miaumiau',
  loginType: ''
};

export const menuContentPaciente = [
  'meus-dados',
  'consulta',
  'exames',
  'histórico-clínico',
  'sair'
];

export const menuIconPaciente = {
  'meus-dados': <AccountBoxSharpIcon />,
  'consulta': <CalendarMonthSharpIcon />,
  'exames': <PlagiarismSharpIcon />,
  'histórico-clínico': <PendingActionsSharpIcon />,
  'sair': <LogoutSharpIcon />
};

export const testUserData = {
  nomeCompleto: 'Miau da Silva Sauro',
  telefone: '4192341234',
  email: 'meuemail@email.com',
  cpf: '12312312312',
  dataNascimento: '1947-07-29',
  cep: '38056673',
  uf: 'MG',
  bairro: '',
  cidade: '',
  logradouro: '',
  numPredial: '',
  complemento: '',
};

export const brazilStates = [ 
  { uf: 'AC', nome: 'Acre' },
  { uf: 'AL', nome: 'Alagoas' },
  { uf: 'AP', nome: 'Amapá' },
  { uf: 'AM', nome: 'Amazonas' },
  { uf: 'BA', nome: 'Bahia' },
  { uf: 'CE', nome: 'Ceará' },
  { uf: 'DF', nome: 'Distrito Federal' },
  { uf: 'ES', nome: 'Espirito Santo' },
  { uf: 'GO', nome: 'Goiás' },
  { uf: 'MA', nome: 'Maranhão' },
  { uf: 'MS', nome: 'Mato Grosso do Sul' },
  { uf: 'MT', nome: 'Mato Grosso' },
  { uf: 'MG', nome: 'Minas Gerais' },
  { uf: 'PA', nome: 'Pará' },
  { uf: 'PB', nome: 'Paraíba' },
  { uf: 'PR', nome: 'Paraná' },
  { uf: 'PE', nome: 'Pernambuco' },
  { uf: 'PI', nome: 'Piauí' },
  { uf: 'RJ', nome: 'Rio de Janeiro' },
  { uf: 'RN', nome: 'Rio Grande do Norte' },
  { uf: 'RS', nome: 'Rio Grande do Sul' },
  { uf: 'RO', nome: 'Rondônia' },
  { uf: 'RR', nome: 'Roraima' },
  { uf: 'SC', nome: 'Santa Catarina' },
  { uf: 'SP', nome: 'São Paulo' },
  { uf: 'SE', nome: 'Sergipe' },
  { uf: 'TO', nome: 'Tocantins' }
];

export const inputInvalidMessage = {
  nomeCompleto: {
    pattern: 'Utilizar apenas letras',
    missing: 'Insira seu nome completo',
    short: null
  },
  telefone: {
    pattern: 'Insira somente números',
    missing: 'Insira o número do seu telefone',
    short: 'Número incompleto, insira seu DDD'
  },
  cpf: {
    pattern: 'Somente números',
    missing: 'Insira o número do seu CPF',
    short: 'CPF incompleto'
  },
  cep: {
    pattern: 'Somente números',
    missing: 'Insira o número do seu CEP',
    short: 'CEP incompleto'
  },
  cidade: {
    pattern: 'Utilizar apenas letras',
    missing: 'Insira o nome de sua cidade',
    short: null
  },
  bairro: {
    pattern: 'Utilizar apenas letras e/ou números',
    missing: 'Insira o nome de seu bairro',
    short: null
  },
  logradouro: {
    pattern: 'Utilizar somente letras e/ou números',
    missing: 'Insira o endereço de sua residência',
    short: null
  },
  numPredial: {
    pattern: 'Utilizar somente números e/ou letras',
    missing: 'Insira o número de sua residência',
    short: null
  }
};

export const inputDadosPessoais = [
  { 
    id: 0,
    type: 'text',
    name: 'nomeCompleto',
    title: 'Nome completo:',
    value: '',
    pattern: '[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ\\s\\-]{2,32}',
    maxLength: 32,
    isRequired: true
  }, {
    id: 1,
    type: 'tel',
    name: 'telefone',
    title: 'Telefone:',
    value: '',
    pattern: '(?:([1-9]{2})?)(\\d{4,5})(\\d{4})',
    maxLength: 11,
    minLength: 10,
    isRequired: true
  }, {
    id: 2,
    type: 'email',
    name: 'email',
    title: 'E-mail:',
    value: '',
    pattern: null,
    maxLength: 32,
    isRequired: true
  }, {
    id: 3,
    type: 'text',
    name: 'cpf',
    title: 'CPF:',
    value: '',
    pattern: '\\d{11}',
    maxLength: 11,
    minLength: 11,
    isRequired: true,
    inputMode: 'numeric'
  }, {
    id: 4,
    type: 'date',
    name: 'dataNascimento',
    title: 'Data de nascimento:',
    value: '',
    pattern: null,
    maxLength: null,
    isRequired: true,
    currentDate: function() {
      const data = new Date();
      const year = data.getFullYear();
      const month = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
      const day = String(data.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }
  }, {
    id: 5,
    type: 'search',
    name: 'cep',
    title: 'CEP:',
    value: '',
    pattern: '\\d{8}',
    maxLength: 8,
    minLength: 8,
    isRequired: true,
    inputMode: 'numeric',
    isReadOnly: null,
  }, {
    id: 6,
    type: 'text',
    name: 'cidade',
    title: 'Cidade:',
    value: '',
    pattern: '[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ\\s\\-]{2,32}',
    maxLength: null,
    minLength: null,
    isRequired: true,
  }, {
    id: 7,
    type: 'text',
    name: 'bairro',
    title: 'Bairro:',
    value: '',
    pattern: '[0-9a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ\\s\\-]{2,32}',
    maxLength: null,
    minLength: null,
    isRequired: true,
  }, {
    id: 8,
    type: 'text',
    name: 'logradouro',
    title: 'Logradouro:',
    value: '',
    pattern: '[0-9a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ\\s\\-]{2,32}',
    maxLength: null,
    minLength: null,
    isRequired: true,
  }, {
    id: 9,
    type: 'text',
    name: 'numPredial',
    title: 'Número:',
    value: '',
    pattern: '[0-9a-zA-Z\\s\\-]{1,32}',
    maxLength: null,
    minLength: null,
    isRequired: true,
  }, {
    id: 10,
    type: 'text',
    name: 'complemento',
    title: 'Complemento:',
    value: '',
    pattern: '[0-9a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ\\s\\-]{2,32}',
    maxLength: null,
    minLength: null,
    isRequired: false,
  }
];

// const reg = new RegExp("[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ\s-]{1,32}");
// const reg2 = new RegExp("(?:([1-9]{2})?)(\d{4,5})(\d{4})");

// console.log(inputDadosPessoais[0].pattern);
// console.log(reg2);