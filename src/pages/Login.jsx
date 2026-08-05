// React
import { useEffect, useState } from "react";
// React Router
import { useNavigate } from "react-router";
// Assets
import { LogoVidaPlus } from "../components/GeneralDashboard";
// Styles
import "../styles/Login.css";
import styled, { keyframes } from "styled-components";
// Hooks/utils
import useFetch from "../api/mockBackEnd";
import { useAuth } from "../utils/AuthContext";
// lib
import { mockPaciente } from "../utils/lib";

// Login
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
const spin = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;
const Loader = styled.div`
  margin: auto;
  width: 60px;
  --b: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 1px;
  background: conic-gradient(#0000 10%, #5d6ad0) content-box;
  mask:
    repeating-conic-gradient(#0000 0deg, #000 1deg 20deg, #0000 21deg 36deg),
    radial-gradient(
      farthest-side,
      #0000 calc(100% - var(--b) - 1px),
      #000 calc(100% - var(--b))
    );
  mask-composite: intersect;
  animation: ${spin} 1500ms infinite steps(10);
`;
export default function AcessoUsuario() {
  const [userType, setUserType] = useState("");
  const { loading, error, result, fetchUser } = useFetch();
  const { user, onLogin } = useAuth();
  const navigate = useNavigate();
  const [userTest, setUserTest] = useState({
    usuario: mockPaciente.usuario,
    senha: mockPaciente.senha,
  });

  useEffect(() => {
    if (user) {
      // console.log(user);
      navigate(`/dashboard/${user.role}`, { replace: true });
    }
  });

  function handleUserType(event) {
    setUserType(event.currentTarget.value);
  }

  function handleChange(event) {
    setUserTest({
      ...userTest,
      [event.target.id]: event.target.value,
    });
  }

  function handleBackButton() {
    setUserType("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    await fetchUser(formJson);
  }

  useEffect(() => {
    if (result) {
      console.log(result, "usuário acessando deashboard...");
      onLogin(result);
    }
  }, [result, onLogin]);

  return (
    <PainelAnimation id="painel">
      <LogoVidaPlus />
      {userType && loading ? (
        <Loader></Loader>
      ) : userType ? (
        <PainelLogin
          testUser={userTest}
          isInvalid={error}
          userRole={userType}
          handleChange={handleChange}
          backButton={handleBackButton}
          onSubmit={handleSubmit}
        />
      ) : (
        <PainelSelecao onClick={handleUserType} />
      )}
    </PainelAnimation>
  );
}

function PainelSelecao({ onClick }) {
  return (
    <div className="botao-usuario">
      <p>Acessar área como:</p>
      <button value="paciente" className="usuario-paciente" onClick={onClick}>
        Paciente
      </button>
      <button value="colaborador" className="usuario-colaborador" onClick={onClick}>
        Colaborador
      </button>
    </div>
  );
}

const FormAnimation = styled.form`
  animation: ${fadeIn} 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;
function PainelLogin({
  testUser,
  isInvalid,
  userRole,
  backButton,
  handleChange,
  onSubmit,
}) {
  return (
    <>
      <FormAnimation onSubmit={onSubmit} className={userRole} noValidate>
        <fieldset>
          <legend>Acessando área como {userRole}</legend>
          <div>
            <label htmlFor="usuario">
              Usuário
              {userRole === "paciente" ? "(digite seu CPF)" : "(digite seu e-mail)"}:{" "}
            </label>
            <input
              className={isInvalid ? "invalid-input" : ""}
              value={testUser.usuario}
              onChange={handleChange}
              type={userRole === "paciente" ? "text" : "email"}
              id="usuario"
              name="usuario"
              maxLength={userRole === "paciente" ? "11" : "32"}
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
            <span className="invalid-message">&#10071; usuário ou senha inválidos</span>
          )}
        </fieldset>
        <div>
          <button type="submit">Entrar</button>
          <button type="button" onClick={backButton}>
            Voltar
          </button>
        </div>
      </FormAnimation>
    </>
  );
}
