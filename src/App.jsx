import { useState, /* useContext, createContext */ } from 'react'
import './App.css'
import AcessoUsuario from './components/Login'
import AreaColaborador from './components/Colaborador'
import AreaPaciente from './components/Paciente'


import vidaPlusLogo from './assets/logo_vidaplus_.svg'


function LogoVidaPlus () {
  return (
    <div id='vp-logo'>
      <img className='logo' src={vidaPlusLogo} alt="logo de VidaPlus" />
      <p>VidaPlus</p>
    </div>
  )
}

// Context para decidir o tipo de usuário, paciente ou colaborador
// export const UserContext = createContext(null);


// Main
function App() {
  const [userType, setUserType] = useState(''); // renderizar página paciente ou colaborador
  const [userLoggedIn, setUserLoggedIn] = useState(false);


  function selecionaAreaUsuario (event) {
    event.preventDefault(); // previne de o navegador de dar load na página e voltar

    setUserType(event.target.className);
    setUserLoggedIn(true);

    console.log(event.target.className); // classe com o tipo de usuário
  }

  if (userType === 'colaborador') {
    console.log('usuário é COLABORADOR');
    return <AreaColaborador />
  } else if (userType === 'paciente') {
    console.log('usuário é PACIENTE');
    return <AreaPaciente />
  }

  return (
    <>
      {!userLoggedIn && <AcessoUsuario definirAcesso={selecionaAreaUsuario} />}
    </>    
  );
}

export default App