import { useState, useEffect } from "react";



// Custom hook
export function useCep(numCep) {
  const [cep, setCep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  

  useEffect(() => {
    console.log('numCep: ' + numCep);   

    setLoading(true);
    // Cleanup function
    let ignore = false;
    setCep(null);
    setError(null);

    fetch("https://brasilapi.com.br/api/cep/v2/" + numCep, { mode: "cors"})
      .then((response) => {
        console.log('first response from API: ', response);
        if (!response.ok) {
          throw new Error(response.status);
        }
        // console.log('fetching data... '+ response.json());
        return response.json();
      })
      .then((response) => {
        if (!ignore) {
          setCep(response);
          // console.log(response);
        }
      })
      .catch((error) => {
        if (error.message === '404') {
          console.log('error é um string');
          setError('CEP não encontrado. Verifique o número digitado.')
        } else {
          setError('Tente novamente.');
        }
        // setError(error);
        // console.log('error no catch:', error.message);
        // console.error(error.name);
        console.error(error.message);
      })
      .finally(() => setLoading(false));

    return () => ignore = true;
  }, [numCep]);

  return { cep, error, loading };
}