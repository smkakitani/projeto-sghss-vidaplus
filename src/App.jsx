import { useState, /* useContext, createContext */ } from 'react';
import './App.css';
import AcessoUsuario from './components/Login';
import { AreaColaboradorAdmin, AreaColaboradorProfSaude } from './components/Colaborador';
import AreaPaciente from './components/Paciente';
import { testUserAdmin, testUserProf } from './components/LocalData';

import vidaPlusLogo from './assets/logo_vidaplus_.svg';


function LogoVidaPlus () {
  return (
    <div id='vp-logo'>
      <img className='logo' src={vidaPlusLogo} alt="logo de VidaPlus" />
      <p>VidaPlus</p>
    </div>
  )
}


// Main
function App() {
  // const [userType, setUserType] = useState(''); // renderizar página paciente ou colaborador
  // const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [logIn, setLogIn] = useState({
    userType: '',
    userSubType: '',
    isLoggedIn: false,
  });
  const [testUser, setTestUser] = useState(testUserProf); // verificar o tipo de login, já que colaborador terá usuário admin e usuário profissional de saúde


  function selectAreaUsuario(event) {
    // Após validar usuário e senha no Back-end
    event.preventDefault();
    // setUserType(event.target.className);
    // setUserLoggedIn(true);
    // console.log(event.target); // classe com o tipo de usuário
    
    let subType = '';
    if (logIn.userType === 'colaborador') {
      subType = testUser.loginType;
    }

    setLogIn({
      ...logIn,
      userSubType: subType,
      isLoggedIn: true,
    });
    console.log(subType);    
  }

  function handleUser(e) {
    setLogIn({
      ...logIn,
      userType: e.target.value,
    });
  }

  function handleLogin(e) {
    setTestUser({
      ...testUser,
      [e.target.id]: e.target.value
    });
  }

  /* if (userType === 'colaborador') {
    console.log('usuário é COLABORADOR');
    return <AreaColaborador />
  } else if (userType === 'paciente') {
    console.log('usuário é PACIENTE');
    return <AreaPaciente />
  } */

  function resetUser() {
    setLogIn({
      ...logIn,
      userType: '', 
      userSubType: '',
      isLoggedIn: false,
    })
  }

  return (
    <>
      {/* {userLoggedIn && (userType === 'colaborador') && <AreaColaboradorAdmin logOff={() => setUserLoggedIn(false)} />} */}
      {/* {userLoggedIn && (userType === 'paciente') && <AreaPaciente logOff={() => setUserLoggedIn(false)} />} */}
      {/* <AreaColaborador /> */}
      {/* <AreaPaciente /> */}
      {/* {!userLoggedIn && <AcessoUsuario definirAcesso={selecionaAreaUsuario} />} */}
      {!logIn.isLoggedIn && 
        <AcessoUsuario 
          logIn={logIn}
          handleUser={handleUser}
          handleLogin={handleLogin}
          backButton={() => resetUser()}
          onSubmit={selectAreaUsuario} 
        />
      }
      {logIn.isLoggedIn && (testUser.loginType === 'admin') && <AreaColaboradorAdmin logOff={() => resetUser()} />}
      {logIn.isLoggedIn && (testUser.loginType === 'profissional') && <AreaColaboradorProfSaude logOff={() => resetUser()} />}
      {logIn.isLoggedIn && (logIn.userType === 'paciente') && <AreaPaciente logOff={() => resetUser()} />}
    </>    
  );
}

export default App