import { useState } from 'react';
import AcessoUsuario from './components/Login';
import { AreaColaboradorAdmin, AreaColaboradorProfSaude } from './components/Colaborador';
import AreaPaciente from './components/Paciente';
import { testUserAdmin, testUserProf, testUserData, testUserPaciente } from './components/LocalData';

import './App.css';



// Main
function App() {
  const [logIn, setLogIn] = useState({
    userType: '',
    userSubType: '',
    isLoggedIn: false,
  });
  const [testUser, setTestUser] = useState(testUserPaciente); // verificar o tipo de login, já que colaborador terá usuário admin e usuário profissional de saúde
  const [isInvalid, setIsInvalid] = useState(false);
  const userFullName = testUserData.nomeCompleto;

  function selectAreaUsuario(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    
    // Teste para identificar qual o tipo de colaborador o usuário apresenta | necessário validação no back-end 
    // Pois o sistema deverá identificar automaticamente se o e-mail de quem está acessando está registrado e se pertence a um colaborador do tipo Administrativo ou Profissional da Saúde
    let subType = '';
    if (logIn.userType === 'colaborador') {
      subType = testUser.loginType;
    } 

    if (formJson.usuario === 'miau_silva@emial.com.br' && formJson.senha === 'miaumiau' && logIn.userType === 'colaborador') {
      // retirar mensagem de campo inválido
      setIsInvalid(false);

      // prosseguir para o dashboard de acordo com o subtipo de usuário 
      setLogIn({
        ...logIn,
        userSubType: subType,
        isLoggedIn: true,
      });

    } else if (formJson.usuario === '12312312312' && formJson.senha === 'miaumiau' && logIn.userType === 'paciente') {
      // retirar mensagem de campo inválido
      setIsInvalid(false);

      // prosseguir para o dashboard de usuário Paciente
      setLogIn({
        ...logIn,
        isLoggedIn: true,
      });

    } else {
      // irá mostrar mensagem de campo inválido
      setIsInvalid(true);
    }        
  }

  // Painel de acesso depende do tipo de usuário, Paciente ou Colaborador
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

  function resetUser() {
    setLogIn({
      ...logIn,
      userType: '', 
      userSubType: '',
      isLoggedIn: false,
    })

    setIsInvalid(false);
    setTestUser('');
  }

  return (
    <>
      {!logIn.isLoggedIn && 
        <AcessoUsuario 
          testUser={testUser}
          isInvalid={isInvalid}
          logIn={logIn}
          handleUser={handleUser}
          handleLogin={handleLogin}
          backButton={() => resetUser()}
          onSubmit={selectAreaUsuario} 
        />
      }
      {logIn.isLoggedIn && (testUser.loginType === 'admin') && <AreaColaboradorAdmin userName={userFullName} logOff={() => resetUser()} />}
      {logIn.isLoggedIn && (testUser.loginType === 'profissional') && <AreaColaboradorProfSaude userName={userFullName} logOff={() => resetUser()} />}
      {logIn.isLoggedIn && (logIn.userType === 'paciente') && <AreaPaciente userName={userFullName} logOff={() => resetUser()} />}

      

      {/* TESTE PARA CADA PÁGINA */}
      {/* <AreaPaciente userName={userFullName} logOff={() => resetUser()} /> */}
      {/* <AreaColaboradorProfSaude userName={userFullName} logOff={() => resetUser()} /> */}
      {/* <AreaColaboradorAdmin userName={userFullName} logOff={() => resetUser()} /> */}
    </>    
  );
}

export default App;