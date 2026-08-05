// React
import React, { useEffect, useState } from "react";
// Componentes
import { MainGridDashboard } from "../components/GeneralDashboard";
// Dados
import {
  menuIconPaciente,
  testUserData,
  brazilStates,
  inputDadosPessoais,
  inputInvalidMessage,
  prettifyString,
} from "../components/LocalData";
// Styles
import "../styles/Paciente.css";
// Custom hook de API para buscar CEP
import { useCep } from "../components/Api";
// MUI
import AlarmIcon from "@mui/icons-material/Alarm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "@mui/x-date-pickers/locales";
import { DateTimePicker } from "@mui/x-date-pickers";
import { ptBR as ptB } from "date-fns/locale";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import styled, { keyframes } from "styled-components";
// React Router
import { Outlet } from "react-router";
import { useAuth } from "../utils/AuthContext";

// Painel principal
export default function AreaPaciente() {
  const { user, onLogout } = useAuth();
  const menu = ["meus-dados", "consulta", "exames", "histórico-clínico", "sair"];

  async function handleTabs(e) {
    if (e.currentTarget.value === "sair") {
      await onLogout();
    }
  }

  return (
    <MainGridDashboard
      pageName={"pagina-paciente"}
      tabs={menu}
      tabsIcon={menuIconPaciente}
      userName={user?.username}
      handleTabOnClick={handleTabs}
    >
      <Outlet />
    </MainGridDashboard>
  );
}

// Aba - Meus Dados
function InputDados({
  type,
  inputName,
  inputId,
  value,
  handleChange,
  handleCep,
  pattern,
  maxLength,
  minLength,
  isRequired,
  maxValue,
  inputMode,
  readOnly,
}) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleBlur(e) {
    const ele = e.target;

    if (ele.validity.valid) {
      setIsInvalid(false);
      setErrorMessage("");

      // console.log(ele.name + ' válido');
      if (ele.name === "cep") {
        handleCep(ele.value);
      }
    } else if (!ele.validity.valid) {
      setIsInvalid(true);
      const inputMessageType = inputInvalidMessage[ele.name];

      if (ele.validity.patternMismatch && !ele.validity.tooShort) {
        setErrorMessage(inputMessageType.pattern);

        // console.log('pattern errado');
      } else if (ele.validity.valueMissing) {
        setErrorMessage(inputMessageType.missing);

        // console.log('campo vazio');
      } else if (ele.validity.tooShort) {
        setErrorMessage(inputMessageType.short);

        // console.log('caractere faltando');
      }
    }
  }

  return (
    <>
      <input
        type={type}
        name={inputName}
        id={inputId}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        pattern={pattern}
        maxLength={maxLength}
        minLength={minLength}
        required={isRequired}
        max={maxValue}
        inputMode={inputMode}
        className={isInvalid ? "invalid-input" : ""}
        readOnly={readOnly}
        autoComplete="off"
        onInvalid={handleBlur}
      />
      {isInvalid && <span className="invalid-message">&#10071; {errorMessage}</span>}
    </>
  );
}

// Component que irá ser renderizado após o CEP ser buscado
function SelectState({ value, onChange, showRequired }) {
  return (
    <>
      <LabelStyle>
        <span>
          Estado:
          {showRequired && (
            <strong>
              <span aria-label="required">*</span>
            </strong>
          )}
        </span>
        <select
          name="estado"
          id="estado-select"
          value={value}
          disabled={true}
          onChange={onChange}
        >
          <option value="">Selecione seu Estado</option>
          {brazilStates.map((name, index) => (
            <option key={index} value={name.uf}>
              {name.nome}
            </option>
          ))}
        </select>
      </LabelStyle>
    </>
  );
}

const scaleLeft = keyframes`
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  100% {
    transform: scaleX(1);
    transform-origin: left;
  }
`;
const LabelStyle = styled.label`
  && span:first-of-type {
    color: #121b63;
    font-weight: bold;
  }
  && span:nth-of-type(2),
  input {
    animation: ${scaleLeft} 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 500ms both;
  }
`;
export function AbaMeusDados() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(testUserData);
  const [inputValues, setInputValues] = useState(userData);
  const [resetForm, setResetForm] = useState(0); // mudando a KEY de element para resetar form
  const [cepValue, setCepValue] = useState("38056673"); // input value separado para CEP para impedir de chamar o custom hook > useCep < toda vez que o input muda
  const [selectedState, setSelectedState] = useState(""); // sincroniza com o CEP
  const { cep, error, loading } = useCep(cepValue);
  const [validCep, setValidCep] = useState(false);

  // Inputs divididos em sections: 1-dados pessoais | 2-endereço
  const arrAddress = ["cidade", "bairro", "logradouro", "numPredial", "complemento"];
  const inputSec1 = inputDadosPessoais.filter((item) => !arrAddress.includes(item.name));
  const inputSec2 = inputDadosPessoais.filter((item) => arrAddress.includes(item.name));

  useEffect(() => {
    if (cep) {
      // sincronizar Estados com CEP
      setSelectedState(cep.state);

      setInputValues((prevInputValues) => {
        return {
          ...prevInputValues,
          uf: cep.state,
          cidade: cep.city,
          bairro: cep.neighborhood,
          logradouro: cep.street,
          numPredial: "",
          complemento: "",
        };
      });
    }
  }, [cep]);

  function handleForm(e) {
    e.preventDefault();

    const form = e.target;
    const isFormValid = form.checkValidity();

    if (isFormValid) {
      // salvar os dados de usuário
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());

      // usa input atual para editar os dados do usuário
      setUserData(formJson);
      setIsEditing(false);
      // console.log(formJson);
    } else {
      // Caso haja algo inválido, o usuário será notificado dos campos inválidos
    }
  }

  function handleCep(userCep) {
    // para buscar o CEP
    setCepValue(userCep);
    setValidCep(!validCep);
    if (error) {
      setSelectedState("");
    }
  }

  function handleSelection(e) {
    setSelectedState(e.target.value);
  }

  // valores do input são armazenados em um obj próprio, para que somente seja salvo quando o usuário usar 'submit'
  function handleChange(e) {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  }

  function resetInputValue() {
    // inserir dados do usuário
    setInputValues(userData);
    setSelectedState(userData.uf);
    setIsEditing(false);
    setResetForm(resetForm + 1); // reinicia a form usando key
  }

  function handleEditData(e) {
    e.stopPropagation();
    e.preventDefault();
    setIsEditing(true);
  }

  // Variáveis usadas para renderizar os inputs
  const section1 = inputSec1.map((item) => (
    <LabelStyle key={item.name} htmlFor={item.name}>
      {isEditing ? (
        <span>
          {item.title}
          <strong>
            <span aria-label="required">*</span>
          </strong>
        </span>
      ) : (
        <span>{item.title}</span>
      )}
      {isEditing ? (
        <InputDados
          type={item.type}
          inputName={item.name}
          inputId={item.name}
          value={inputValues[item.name]}
          handleChange={handleChange}
          handleCep={handleCep}
          pattern={item.pattern}
          maxLength={item.maxLength}
          minLength={item.minLength}
          isRequired={item.isRequired}
          maxValue={
            typeof item.currentDate === "function" ? item.currentDate() : undefined
          }
          inputMode={item.inputMode}
          readOnly={item.isReadOnly}
        />
      ) : (
        <span>{prettifyString(userData[item.name], item.name)}</span>
      )}
    </LabelStyle>
  ));

  const section2 = inputSec2.map((item) => (
    <LabelStyle key={item.name} htmlFor={item.name}>
      {isEditing && item.isRequired ? (
        <span>
          {item.title}
          <strong>
            <span aria-label="required">*</span>
          </strong>
        </span>
      ) : (
        <span>{item.title}</span>
      )}
      {isEditing ? (
        <InputDados
          type={item.type}
          inputName={item.name}
          inputId={item.name}
          value={inputValues[item.name]}
          handleChange={handleChange}
          pattern={item.pattern}
          maxLength={item.maxLength}
          minLength={item.minLength}
          isRequired={item.isRequired}
          maxValue={
            typeof item.currentDate === "function" ? item.currentDate() : undefined
          }
          inputMode={item.inputMode}
        />
      ) : (
        <span>{prettifyString(userData[item.name], item.name)}</span>
      )}
    </LabelStyle>
  ));

  return (
    <div key={resetForm}>
      <div className="tab-header">
        <h2>Meus dados</h2>
      </div>
      <hr />
      <p>
        {isEditing ? (
          <>
            Campos obrigatórios possuem{" "}
            <strong>
              <span aria-label="required">*</span>
            </strong>
          </>
        ) : (
          ""
        )}
      </p>
      <form
        method="post"
        onSubmit={handleForm}
        className="form-dados-pessoais"
        noValidate
      >
        <section>{section1}</section>
        {/* Mostra erro quando erro conter uma mensagem e também quando estiver editando */}
        {error && isEditing && <p>{error}</p>}
        <section>
          {!loading && !error && (
            <SelectState
              showRequired={isEditing}
              value={selectedState}
              onChange={handleSelection}
            />
          )}

          {!loading && !error && section2}
        </section>
        {isEditing ? (
          <>
            <button type="submit">Salvar dados</button>
            <button type="button" onClick={resetInputValue}>
              Cancelar
            </button>
          </>
        ) : (
          <button type="button" onClick={handleEditData} className="edit-dados-pessoais">
            Editar dados
          </button>
        )}
      </form>
    </div>
  );
}

// Aba - Consulta
function DateTimePanel({ handleAccept }) {
  // Para ter acesso ao DOM
  const inputRef = React.createRef();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
      adapterLocale={ptB}
    >
      <DateTimePicker
        inputRef={inputRef}
        showDaysOutsideCurrentMonth={true}
        onAccept={() => handleAccept(inputRef)}
        label="Data/hora"
        name="dataHora"
        slotProps={{ textField: { size: "small" } }}
        disablePast={true}
      ></DateTimePicker>
    </LocalizationProvider>
  );
}

function CardConsulta() {
  const cardTest = {
    dataHora: "13/10/2025 09:00h",
    profissional: "Dr. Miado",
    especialidade: "Gastroenterologista",
    modalidade: "presencial",
  };

  return (
    <div className="card-consulta">
      <p>
        <AlarmIcon />
        Próxima consulta
      </p>
      <span>
        <hr />
      </span>
      <p>{cardTest.dataHora}</p>
      <p>
        {cardTest.profissional} | {cardTest.especialidade}
      </p>
      <p>Modalidade {cardTest.modalidade}</p>
      <div>
        <button disabled={true}>Teleconsulta</button>
        <button>Cancelar</button>
      </div>
    </div>
  );
}

function AgendarConsulta({ appointmentValues, handleValues, handleAgendar, isEspec }) {
  function handleChange(e) {
    const hasCurrent = Object.hasOwn(e, "current");

    if (hasCurrent) {
      handleValues(e.current);
    } else {
      handleValues(e.currentTarget);
    }
  }

  return (
    <div className="nova-consulta">
      <h3>Agendar nova consulta</h3>
      <hr />
      <div>
        <label>
          <span>Especialidade:</span>
          <select
            name="especialidade"
            id="especialidade-select"
            value={appointmentValues.especialidade}
            onChange={handleChange}
          >
            <option value="">--Selecione a especialidade--</option>
            <option value="gastroenterologista">Gastroenterologista</option>
          </select>
        </label>
        {/* Lista de médicos será preenchida de acordo com a especialidade selecionada */}
        <label className={isEspec ? "show-element" : ""}>
          <span>Médico:</span>
          <select
            name="profissional"
            id="medico-select"
            value={appointmentValues.medicoGastro}
            onChange={handleChange}
          >
            <option value="">--Selecione o(a) médico(a)--</option>
            <option value="dr. miado">Dr. Miado</option>
          </select>
        </label>
      </div>
      <div>
        <p>Selecione uma data e um horário:</p>
        <DateTimePanel handleAccept={handleChange} />
      </div>
      <div>
        <FormControl>
          <FormLabel id="modalidade">Modalidade da consulta</FormLabel>
          <RadioGroup
            row
            name="modConsulta"
            value={appointmentValues.modConsulta}
            onChange={handleChange}
          >
            <FormControlLabel value="presencial" control={<Radio />} label="Presencial" />
            <FormControlLabel
              value="teleconsulta"
              control={<Radio />}
              label="Teleconsulta"
              color="red"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <button value="confirmar" onClick={handleAgendar}>
        Confirmar novo agendamento
      </button>
    </div>
  );
}

export function AbaConsulta() {
  const [isActive, setIsActive] = useState(false);
  const [isEspec, setIsEspec] = useState(false);
  const [appointmentValues, setAppointmentValues] = useState({
    especialidade: "",
    profissional: "",
    dataHora: "",
    modConsulta: "",
  });

  function handleValues(e) {
    // lista de médicos depende da especialidade
    if (e.name === "especialidade") {
      if (e.value) {
        setIsEspec(true);
      } else {
        setIsEspec(false);
      }
    }

    setAppointmentValues({
      ...appointmentValues,
      [e.name]: e.value,
    });
  }

  function handleAgendar() {
    // Armazenar dados de agendamento no back-end
    setIsActive(false);
  }

  return (
    <>
      <div className="tab-header">
        <h2>Minhas consultas</h2>
      </div>
      <hr />
      <div>
        <div>
          <CardConsulta />
        </div>
        <div>
          <button
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            Nova consulta
          </button>
          {isActive && (
            <AgendarConsulta
              appointmentValues={appointmentValues}
              handleValues={handleValues}
              handleAgendar={handleAgendar}
              isEspec={isEspec}
            />
          )}
        </div>
      </div>
    </>
  );
}

// Aba - Exames
export function AbaExames() {
  return (
    <>
      <div className="tab-header">
        <h2>Exames</h2>
      </div>
      <hr />
    </>
  );
}

// Aba - Histórico Clínico
export function AbaHistoricoClinico() {
  return (
    <>
      <div className="tab-header">
        <h2>Histórico Clínico</h2>
      </div>
      <hr />
    </>
  );
}
