// Assets
import { LogoVidaPlus } from "./GeneralDashboard";
// Styles
import "../styles/Login.css";
import styled, { keyframes } from "styled-components";

// Componentes
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity:1;
  }
`;
const PainelAnimation = styled.div`
  animation: ${fadeIn} 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;
function PainelSelecao({ onClick }) {
  return (
    <PainelAnimation id="painel">
      <LogoVidaPlus />
      <div className="botao-usuario">
        <p>Acessar área como:</p>
        <button value="paciente" className="usuario-paciente" onClick={onClick}>
          Paciente
        </button>
        <button
          value="colaborador"
          className="usuario-colaborador"
          onClick={onClick}
        >
          Colaborador
        </button>
      </div>
    </PainelAnimation>
  );
}

const FormAnimation = styled.form`
  animation: ${fadeIn} 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;
function PainelLogin({
  testUser,
  isInvalid,
  userOption,
  backButton,
  handleChange,
  onSubmit,
}) {
  return (
    <div id="painel">
      <LogoVidaPlus />
      <FormAnimation
        action="#"
        onSubmit={onSubmit}
        className={userOption}
        noValidate
      >
        <fieldset>
          <legend>Acessando área como {userOption}</legend>
          <div>
            <label htmlFor="usuario">
              Usuário
              {userOption === "paciente"
                ? "(digite seu CPF)"
                : "(digite seu e-mail)"}
              :{" "}
            </label>
            <input
              className={isInvalid ? "invalid-input" : ""}
              value={testUser.usuario}
              onChange={handleChange}
              type={userOption === "paciente" ? "text" : "email"}
              id="usuario"
              name="usuario"
              maxLength={userOption === "paciente" ? "11" : "32"}
              required
            />
          </div>
          <div>
            <label htmlFor="senha">Senha: </label>
            <input
              className={isInvalid ? "invalid-input" : ""}
              value={testUser.senha}
              onChange={handleChange}
              type="password"
              id="senha"
              name="senha"
              minLength="8"
              required
            />
          </div>
          {isInvalid && (
            <span className="invalid-message">
              &#10071; usuário ou senha inválidos
            </span>
          )}
        </fieldset>
        <div>
          <button type="submit">Entrar</button>
          <button type="button" onClick={backButton}>
            Voltar
          </button>
        </div>
      </FormAnimation>
    </div>
  );
}

// Componente da área de acesso
export default function AcessoUsuario({
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
      {logIn.userType ? (
        <PainelLogin
          testUser={testUser}
          isInvalid={isInvalid}
          userOption={logIn.userType}
          handleChange={handleLogin}
          backButton={backButton}
          onSubmit={onSubmit}
        />
      ) : (
        <PainelSelecao onClick={handleUser} />
      )}
    </>
  );
}
