import { useState } from 'react'

// Imagem
import vidaPlusLogo from '../assets/logo_vidaplus_.svg'


// Logo da empresa
function LogoVidaPlus () {
    return (
      <div id='vp-logo'>
        <img className='logo' src={vidaPlusLogo} alt="logo de VidaPlus" />
        <p>VidaPlus</p>
      </div>
    )
}

const fakeUser = {
  usuario: 'miaau',
  senha: '666'
};

function PainelSelecao ({ defineUsuario }) {
  return (
    <div id='painel'>
      <LogoVidaPlus />
      <div className='botao-usuario'>
        <p>Acessar área como:</p>
        <button type='button' className='usuario-paciente' onClick={defineUsuario}>Paciente</button>
        <button type='button' className='usuario-colaborador' onClick={defineUsuario}>Colaborador</button>
      </div>
    </div>
  );
}

function PainelLogin ({ 
  userOption, 
  backButton, 
  handleChange, 
  definirAcesso }) {
  return (
    <div id="painel">
      <LogoVidaPlus />
      <form action="#" onSubmit={definirAcesso} className={userOption}>
        <fieldset>
          <legend>Acessando área como {userOption}</legend>
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
          <button type='submit' /* onClick={definirAcesso} */>Entrar</button>
          <button type='button' onClick={backButton}>Voltar</button>
        </div>
      </form>
    </div>
  );
}



// Componente da área de acesso
export default function AcessoUsuario ({ definirAcesso }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(fakeUser);
  const [isSelected, setIsSelected] = useState(false);

  function defineUsuario (e) {
    if (e.target.className === 'usuario-paciente') {
      setCurrentUser('paciente');
      setIsSelected(true);
    } else if (e.target.className === 'usuario-colaborador') {
      setCurrentUser('colaborador');
      setIsSelected(true);
    } 
    console.log(e.target);
  }

  function handleChange (event) {
    // guardas dados digitados no input pelo usuário
    setUserData({
        ...userData,
        [event.target.id]: event.target.value
      });
      // console.log(userData);
  }

  function backSelection () {
    setCurrentUser(null);
    setIsSelected(false);
  }

  // function definirAcesso (event) {
  //   event.pre
  //   // let tipoUsuario = currentUser;
  //   console.log(event.target)

  //   // console.log(currentUser)
  // }


  /* if (currentUser === 'paciente' || currentUser === 'colaborador' ) {
    // console.log(currentUser)
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
            <button type='button' onClick={definirAcesso}>Entrar</button>
            <button type='button' onClick={backButton}>Voltar</button>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <div id='painel'>
        <LogoVidaPlus />
        <div className='botao-usuario'>
          <p>Acessar área como:</p>
          <button type='button' className='usuario-paciente' onClick={defineUsuario}>Paciente</button>
          <button type='button' className='usuario-colaborador' onClick={defineUsuario}>Colaborador</button>
        </div>
      </div>
    )
  } */

  return (
    <>
      {isSelected ? <PainelLogin 
      userOption={currentUser} 
      handleChange={handleChange}
      backButton={backSelection}
      definirAcesso={definirAcesso}/> : <PainelSelecao 
      defineUsuario={defineUsuario} 
      />}
    </>
  );
}