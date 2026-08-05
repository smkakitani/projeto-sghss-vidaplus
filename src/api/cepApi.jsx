import { useState, useEffect } from "react";

// Custom hook
export function useCep(numCep) {
  const [cep, setCep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    // Cleanup function
    let ignore = false;
    setCep(null);
    setError(null);

    fetch("https://brasilapi.com.br/api/cep/v2/" + numCep, { mode: "cors" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((response) => {
        if (!ignore) {
          setCep(response);
        }
      })
      .catch((error) => {
        if (error.message === "404") {
          setError("CEP não encontrado. Verifique o número digitado.");
        } else if (error.message === "400") {
          setError("CEP inválido.");
        } else if (error.message === "500") {
          setError("Erro interno.");
        } else {
          setError("Tente novamente mais tarde.");
        }
      })
      .finally(() => setLoading(false));

    return () => (ignore = true);
  }, [numCep]);

  return { cep, error, loading };
}
