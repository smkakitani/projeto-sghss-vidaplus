import { useState } from 'react'
import { LogoVidaPlus } from './GeneralDashboard'

import '../styles/Login.css'


// const fakeUser = {
//   usuario: 'miaau',
//   senha: '666'
// };

function PainelSelecao ({ onClick }) {
  return (
    <div id='painel'>
      <LogoVidaPlus />
      <div className='botao-usuario'>
        <p>Acessar área como:</p>
        <button value='paciente' className='usuario-paciente' onClick={onClick}>Paciente</button>
        <button value='colaborador' className='usuario-colaborador' onClick={onClick}>Colaborador</button>
      </div>
    </div>
  );
}

function PainelLogin ({ 
  userOption, 
  backButton, 
  handleChange, 
  onSubmit 
}) {
  return (
    <div id="painel">
      <LogoVidaPlus />
      <form action="#" onSubmit={onSubmit} className={userOption}>
        <fieldset>
          <legend>Acessando área como {userOption}</legend>
          <div>
            <label htmlFor='usuario'>Usuário: </label>
            <input 
              onChange={handleChange}
              type='text' id='usuario' name='login' maxLength='32' />
          </div>
          <div>
            <label htmlFor="senha">Senha: </label>
            <input 
              onChange={handleChange}
              type="password" id='senha' name='senha-usuario' minLength='8'/>
          </div>
        </fieldset>
        <div>
          <button type='submit' >Entrar</button>
          <button type='button' onClick={backButton}>Voltar</button>
        </div>
      </form>
    </div>
  );
}

// Componente da área de acesso
export default function AcessoUsuario ({ 
  /* definirAcesso,  */
  logIn, 
  handleUser, 
  handleLogin,
  backButton, 
  onSubmit,
 }) {
  // const [currentUser, setCurrentUser] = useState('');
  // const [isSelected, setIsSelected] = useState(false);
  // const [userData, setUserData] = useState(fakeUser);


  // Definir o tipo de usuário - Paciente ou Colaborador
  // function handleUser(e) {
  //   // if (e.target.className === 'usuario-paciente') {
  //   //   setCurrentUser('paciente');
  //   //   setIsSelected(true);
  //   // } else if (e.target.className === 'usuario-colaborador') {
  //   //   setCurrentUser('colaborador');
  //   //   setIsSelected(true);
  //   // } 
    
  //   setCurrentUser(e.target.value);
  //   setIsSelected(true);
  //   console.log(e.target.value);
  // }

  // Acessando...
  // function handleChange (event) {
  //   // dados digitados no input pelo usuário para passar pela validação que será feita pelo backend
  //   setUserData({
  //       ...userData,
  //       [event.target.id]: event.target.value
  //     });
  // }

  // function resetUser () {
  //   setCurrentUser('');
  //   setIsSelected(false);
  // }

  return (
    <>
      {/* {isSelected ? <PainelLogin userOption={currentUser} handleChange={handleChange} backButton={resetUser} onSubmit={definirAcesso}/> : <PainelSelecao onClick={handleUser} />} */}
      {logIn.userType ? 
        <PainelLogin 
          userOption={logIn.userType} 
          handleChange={handleLogin} 
          backButton={backButton} 
          onSubmit={onSubmit}
        /> : <PainelSelecao 
          onClick={handleUser} 
        />
      }

    </>
  );
}