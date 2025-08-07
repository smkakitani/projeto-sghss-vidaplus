import { useState } from 'react'
import './App.css'
import AreaColaborador from './components/Colaborador';

import vidaPlusLogo from './assets/logo_vidaplus_.svg'

const fakeUser = {
  usuario: 'miaau',
  senha: '666'
};

function LogoVidaPlus () {
    return (
      <div id='vp-logo'>
        <img className='logo' src={vidaPlusLogo} alt="logo de VidaPlus" />
        <p>VidaPlus</p>
      </div>
    )
  }

function App() {
  const [userActive, setUserActive] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(fakeUser);


  function handleClick (e) {
    setUserActive(true);
    
    if (e.target.className === 'usuario-paciente') {
      setCurrentUser('paciente');
    } else if (e.target.className === 'usuario-colaborador') {
      setCurrentUser('colaborador');
    } else {
      setCurrentUser(null);
    }
    // console.log(e.target.className);
  }

  function backButton () {
    setUserActive(false);
    setCurrentUser(null);
  }

  function logInUser () {
    // console.log(currentUser);
    console.log(userData, currentUser, userActive);
  }

  function handleChange (event) {
    setUserData({
        ...userData,
        [event.target.id]: event.target.value
      });

      // console.log(userData);
  }

  if (userActive) {
    return (
      <div id="painel">
        <LogoVidaPlus />
        <form action="#">
          <fieldset>
            <legend>Acessando área como {currentUser}</legend>
            <div>
              <label htmlFor='usuario'>Usuário: </label>
              <input 
              onChange={handleChange}
              type='text' id='usuario' name='login' maxLength='32' placeholder=' ' />
            </div>
            <div>
              <label htmlFor="senha">Senha: </label>
              <input 
              onChange={handleChange}
              type="password" id='senha' name='senha-usuario' minLength='8'/>
            </div>
          </fieldset>
          <div>
            <button type='button' onClick={logInUser}>Entrar</button>
            <button type='button' onClick={backButton}>Voltar</button>
          </div>
        </form>
      </div>
    )
  } else if (userActive && currentUser === 'colaborador') {
    console.log('colab funf');
  } else {
    return (
      <div id='painel'>
        {/* <img className='logo' src={vidaPlusLogo} alt="logo de VidaPlus" /> */}
        <LogoVidaPlus />
        <div className='botao-usuario'>
          <p>Acessar área como:</p>
          <button type='button' className='usuario-paciente' onClick={handleClick}>Paciente</button>
          <button type='button' className='usuario-colaborador' onClick={handleClick}>Colaborador</button>
        </div>
      </div>
    )
  }
}

export default App
