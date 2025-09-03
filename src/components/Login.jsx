// import { useState } from 'react';
import { LogoVidaPlus } from './GeneralDashboard';

import '../styles/Login.css'



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
  testUser,
  isInvalid,
  userOption, 
  backButton, 
  handleChange, 
  onSubmit 
}) {
  return (
    <div id="painel">
      <LogoVidaPlus />
      <form action="#" onSubmit={onSubmit} className={userOption} noValidate >
        <fieldset>
          <legend>Acessando área como {userOption}</legend>
          <div>
            <label htmlFor='usuario'>Usuário{(userOption === 'paciente') ? '(digite seu CPF)' : '(digite seu e-mail)'}: </label>
            <input 
              className={isInvalid ? 'invalid-input' : ''}
              value={testUser.usuario}
              onChange={handleChange}
              type='text' id='usuario' name='usuario' maxLength={(userOption === 'paciente') ? '11' : '32'} required />
          </div>
          <div>
            <label htmlFor="senha">Senha: </label>
            <input 
              className={isInvalid ? 'invalid-input' : ''}
              value={testUser.senha}
              onChange={handleChange}
              type="password" id='senha' name='senha' minLength='8' required />
          </div>
          {isInvalid && <span className="invalid-message">&#10071; usuário ou senha inválidos</span>}
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
  testUser,
  isInvalid,
  logIn, 
  handleUser, 
  handleLogin,
  backButton, 
  onSubmit,
 }) {
  
  return (
    <>
      {logIn.userType ? 
        <PainelLogin 
          testUser={testUser}
          isInvalid={isInvalid}
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