import { useState, useEffect } from "react";


// export const useFetchCep = () => {
//   const [cepURL, setCepURL] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);




//   useEffect(() => {
//     setTimeout(() => {
//       fetch("https://brasilapi.com.br/api/cep/v2/87030000" /* + numCep */, { mode: "cors"})
//         .then((response) => {
//           if (response.status >= 400) {
//             throw new Error('server error');
//           }
//           return response.json();
//         })
//         .then((response) => setCepURL(response))
//         .catch((error) => setError(error))
//         .finally(() => setLoading(false));
//     }, 5000);
      

//   }, []);
  
//   return { cepURL, loading, error };
// };

export function useCep(numCep) {
  const [cep, setCep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  

  useEffect(() => {

    // CEP incompleto
    console.log('numCep: ' + numCep);
    /* if (numCep.length < 8) {
      console.log('numCep ta curto ' + numCep);
      return
    } */

    setLoading(true);
    // Cleanup function
    let ignore = false;
    setCep(null);
    setError(null);

    fetch("https://brasilapi.com.br/api/cep/v2/" + numCep, { mode: "cors"})
      .then((response) => {
        console.log('first response from API: ', response);
        // if (response.status >= 400) {
        //   throw new Error(`server error: ${response.status}`);
        // }
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

  // console.log(cep)
  return { cep, error, loading };
}