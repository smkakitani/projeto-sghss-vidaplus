// Formatação
export function removeAccentPTBR(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[çÇ]/g, "c");
}

export function capitalize(str) {
  return str
    .trim() // retirar espaços que possam conter no início e/ou no fim
    .toLowerCase() // padrozinhar
    .split(" ") // separar em palavras
    .map((word) => {
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

  return `${part1}.${part2}.${part3}-${part4}`;
}

function formatBirthDate(str) {
  // formata para o padrão brasileiro
  const date = str.split("-");
  const [year, month, day] = date;
  return `${day}/${month}/${year}`;
}

function formatCep(str) {
  const part1 = str.slice(0, 5);
  const part2 = str.slice(5);

  return `${part1}-${part2}`;
}

export function prettifyString(text, inputName) {
  switch (inputName) {
    case "cep":
      // console.log('formatando o telefone...');
      return formatCep(text);
    case "telefone":
      // console.log('formatando o telefone...');
      return formatTel(text);
    case "cpf":
      // console.log('formatando o cpf...');
      return formatCpf(text);
    case "dataNascimento":
      // console.log('formatando a data de nascimento...');
      return formatBirthDate(text);
    case "nomeCompleto":
      // console.log('formatando o nome completo...');
      return capitalize(text);
    case "cidade":
      // console.log('formatando cidade...');
      return capitalize(text);
    case "logradouro":
      // console.log('formatando cidade...');
      return capitalize(text);
    default:
      // console.log('wut...');
      return text;
  }
}
