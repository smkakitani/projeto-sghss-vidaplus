// Falso dados de usuário do tipo paciente
export const testUserData = {
  nomeCompleto: "Miau da Silva Sauro",
  telefone: "4192341234",
  email: "meuemail@email.com",
  cpf: "12312312312",
  dataNascimento: "1947-07-29",
  cep: "38056673", // CEP aleatório para demonstrar API funcionando
  uf: "MG",
  bairro: "Alfredo Freire II",
  cidade: "Uberaba",
  logradouro: "Rua Doutor Leo Derenusson",
  numPredial: "111",
  complemento: "Ap 01",
};

export const userPaciente = {
  usuario: "12312312312",
  senha: "miaumiau",
  perfil: "paciente",
};

export const mockPaciente = {
  usuario: "12312312312",
  senha: "miaumiau",
};

// Como poderia ser a tabela de usuário paciente no banco de dados
// {
//   "id": "12312312312", // CPF funcionaria como ID do usuário
//   "senha": "!F#$Y$%^!#$!@YH&Î%^*I!@$YHTJ^&", // Senha criptografada
//   "nomeCompleto": "Miau da Silva Sauro",
//   "telefone": "4192341234",
//   "email": "meuemail@email.com",
//   "dataNascimento": "1947-07-29", // Formato ISO(?)
//   "endereco": [
//     "cep": "38056673",
//     "uf": "MG",
//     "bairro": "Alfredo Freire II",
//     "cidade": 'Uberaba',
//     "logradouro": 'Rua Doutor Leo Derenusson',
//     "numPredial": '111',
//     "complemento": 'Ap 01',
//   ],
// }
