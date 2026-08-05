// React
import { useState } from "react";
// Dados
import { userPaciente } from "../data/dadosPaciente";
import { userAdminstrativo } from "../data/dadosAdministrativo";
import { userProfissional } from "../data/dadosProfissional";

// Simulando busca de API para integração com o back-end
export default function useFetch() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const delay = 1000;
  const fetchUser = async (data) => {
    setLoading(true);

    setTimeout(() => {
      try {
        if (!data) throw "There is no data";

        // Usuário paciente
        if (data.usuario === userPaciente.usuario && data.senha === userPaciente.senha) {
          setResult({
            nome: "Miau da Silva Sauro",
            usuario: data.usuario,
            perfil: userPaciente.perfil,
          });
          return;
          // Usuário colaborador - profissional da saúde
        } else if (
          data.usuario === userProfissional.usuario &&
          data.senha === userProfissional.senha
        ) {
          setResult({
            nome: "Meowster Doc",
            usuario: data.usuario,
            perfil: userProfissional.perfil,
          });
          // Usuário colaborador - administrativo
        } else if (
          data.usuario === userAdminstrativo.usuario &&
          data.senha === userAdminstrativo.senha
        ) {
          setResult({
            nome: "Administrativo Meow",
            usuario: data.usuario,
            perfil: userAdminstrativo.perfil,
          });
        } else {
          throw "huh-oh... login errado x_x";
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, delay);
  };

  return {
    error,
    loading,
    result,
    fetchUser,
  };
}
