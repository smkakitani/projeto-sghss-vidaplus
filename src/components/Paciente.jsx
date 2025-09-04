import { useEffect, useState } from 'react';
import { MainGridDashboard, MenuTabList, ItemTab, MainContent, UserProfile } from './GeneralDashboard';
import { menuContentPaciente, menuIconPaciente, testUserData, brazilStates, inputDadosPessoais, inputInvalidMessage, prettifyString } from './LocalData';

// Custom hook de API ViaCep (free)
import { useCep } from "./Api";

import '../styles/Paciente.css';



// Component de input
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
  /* onInvalid */
 }) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleBlur(e) {
    const ele = e.target;
    // const inputValid = ele.reportValidity();
    
    if (ele.validity.valid) {
      setIsInvalid(false);
      setErrorMessage('');

      console.log(ele.name + ' válido');
      if (ele.name === 'cep') {
        console.log('cade meu ceeeeeeeeeeeeeep');
        handleCep(ele.value);
        // return
      }
      // handleCep(ele.value);
    } else if (!ele.validity.valid) {
      setIsInvalid(true);
      const inputMessageType = inputInvalidMessage[ele.name];

      if (ele.validity.patternMismatch && !ele.validity.tooShort) {
        setErrorMessage(inputMessageType.pattern);

        console.log('pattern errado');
      } else if (ele.validity.valueMissing) {
        setErrorMessage(inputMessageType.missing);

        console.log('campo vazio');
      } else if (ele.validity.tooShort) {
        setErrorMessage(inputMessageType.short);

        console.log('caracter faltando');
      }
    }
    // console.log(ele.name);
    // handleCEP(e);
  }
  // console.log(minLength);
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
        className={isInvalid ? 'invalid-input' : '' }
        readOnly={readOnly}
        autoComplete='off'
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
      <label /* htmlFor="estado-select" */><span>Estado:
      {showRequired &&  <strong><span aria-label="required">*</span></strong>}
      </span>
      <select 
        name="estado" 
        id="estado-select"
        value={value}
        disabled={true}
        onChange={onChange}
      >
        <option value="">Selecione seu Estado</option>
        {brazilStates.map((name, index) => <option key={index} value={name.uf/* .toLowerCase() */}>{name.nome}</option>
        )}
      </select>
      </label>
    </>
  );
}

function MeusDados() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(testUserData);
  const [inputValues, setInpuValues] = useState(userData);
  const [resetForm, setResetForm] = useState(0); // mudando a KEY de element para resetar FORM
  const [cepValue, setCepValue] = useState('38056673'); // input value separado para CEP para impedir de chamar o custom hook > useCep < toda vez que o input muda
  const [selectedState, setSelectedState] = useState(''); // sincroniza com o CEP 
  const { cep, error, loading } = useCep(cepValue);
  const [validCep, setValidCep] = useState(false);


  // Inputs divididos em sections: 1-dados pessoais | 2-endereço
  const arrAdress = [ 'cidade', 'bairro', 'logradouro', 'numPredial', 'complemento', /* 'cep' */ ];
  const inputSec1 = inputDadosPessoais.filter(item => !arrAdress.includes(item.name));
  const inputSec2 = inputDadosPessoais.filter(item => arrAdress.includes(item.name)); 
  

  useEffect(() => {
    // mudar o estado? 
    if (cep) {
      // sincronizar Estados com CEP
      setSelectedState(cep.state);

      // separar conteudo de CEP? para quando o CEP ter resultado, aparecer nos input cidade, etc.... ):

      setInpuValues(prevInputValues => {
        return {
          ...prevInputValues,
          uf: cep.state,
          cidade: cep.city,
          bairro: cep.neighborhood,
          logradouro: cep.street
        }}
      );
      // console.log(inputValues);
    }
  }, [cep]);

  function handleForm(e) {
    e.preventDefault();

    const form = e.target;
    const isFormValid = form.checkValidity();
    console.log('is form valid? ', isFormValid);

    if (isFormValid) {
      // salvar os dados de usuário
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());

      // usa input atual para editar os dados do usuário
      // console.log(inputValues.nomeCompleto);
      setUserData(inputValues);
      setIsEditing(false);
      console.log(formJson);
    } else {
      console.log('tem algo errado...');
    }


    // console.log(e.target.checkValidity());
    // console.log('inputs invalidos: ' + currentInputInvalid.length);
    console.log('submitting...?');
    console.log(inputValues);
  }

  /* function validateInput(e) {
    // verificar quais input estão inválidos
    const ele = e.target;

    console.log(`campo >${ele.name}< válido? ` + ele.validity.valid);
  } */

  function handleCep(userCep) {
    // para buscar o CEP
    setCepValue(userCep);
    setValidCep(!validCep);
    if (error) {
      setSelectedState('');
    }   
    // console.log(cep);
  }  

  function handleSelection(e) {
    setSelectedState(e.target.value);
  }

  // valores do input são armazenados em um obj próprio, para que somente seja salvo quando o usuário usar 'submit'
  function handleChange(e) {
    setInpuValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
    // console.log(inputValues);
  }

  function resetInputValue() {
    // inserir dados do usuário
    setInpuValues(userData);
    setSelectedState(userData.uf);
    setIsEditing(false);
    setResetForm(resetForm + 1); // reinicia a form usando key

    console.log('reseting', inputValues);
  }

  function handleEditData(e) {
    e.stopPropagation();
    e.preventDefault();
    setIsEditing(true);

    console.log('editando dados...');
    // console.log(inputValues);
  }

  // return (
  //   <div key={resetForm}>
  //     <p>Meus dados pessoais</p>
  //     {isEditing && <p>Campos obrigatórios possuem <strong><span aria-label="required">*</span></strong></p>}
  //     <form method="post" onSubmit={handleForm} className="form-dados-pessoais" noValidate>
  //       <label htmlFor="nomeCompleto">Nome completo:
  //         {isEditing ? (
  //           <><strong><span aria-label="required">*</span></strong>
  //           <InputDados 
  //             type='text'
  //             inputName='nomeCompleto'
  //             inputId='nomeCompleto'
  //             value={inputValues.nomeCompleto}
  //             handleChange={handleChange}
  //             // handleValidation={validateNameInput}
  //             handleValidation={validateInput}
  //             // handleClassName={isInvalid ? 'invalid-input' : ''}
  //             pattern='[a-zA-Z\s]{1,32}'
  //             maxLength={32}
  //             isRequired={true}
  //             // inputInvalid={}
  //             // errorMessage={}
  //           />
  //           </>
  //         ) : (
  //         <span>{userData.nomeCompleto}</span>
  //        )}
  //       </label>
  //       <label htmlFor="telefone">Telefone:
  //         {isEditing ? (
  //           <><strong><span aria-label="required">*</span></strong>
  //           <InputDados 
  //             type='tel'
  //             inputName='telefone'
  //             inputId='telefone'
  //             value={inputValues.telefone}
  //             handleChange={handleChange}
  //             handleValidation={validateInput}
  //             // handleClassName={isInvalid ? 'invalid-input' : ''}
  //             pattern='(?:([1-9]{2})?)(\d{4,5})(\d{4})'
  //             maxLength={11}
  //             isRequired={true}
  //             // inputInvalid={}
  //             // errorMessage={}
  //           />
  //           </>
  //         ) : (
  //           <span>{userData.telefone}</span>
  //         )}
  //       </label>
  //       {isEditing ? (
  //         <>
  //         <button type="submit">Salvar dados</button>
  //         <button type="button" onClick={resetInputValue}>Cancelar</button>
  //         </>
  //         ) : (
  //         <button type="button" onClick={handleEditButton}>Editar dados</button>
  //         )}
  //     </form>




  //   </div>
  // );
  // console.log(inputValues[inputDadosPessoais[0].name]);

  
  const section1 = inputSec1.map((item) =>
    <label key={item.name} htmlFor={item.name}>{isEditing ? <span>{item.title}<strong><span aria-label="required">*</span></strong></span> : <span>{item.title}</span>}      
      {isEditing ? (
        <>{/* <strong><span aria-label="required">*</span></strong> */}
        <InputDados 
          type={item.type}
          inputName={item.name}
          inputId={item.name}
          value={inputValues[item.name]}
          // value={(item.name === 'cidade' && loading) ? 'buscando cep' : inputValues[item.name]}
          handleChange={handleChange}
          handleCep={handleCep}
          pattern={item.pattern}
          maxLength={item.maxLength}
          minLength={item.minLength}
          isRequired={item.isRequired}
          maxValue={(typeof item.currentDate === 'function') ? item.currentDate() : undefined}
          inputMode={item.inputMode}
          readOnly={loading}
        /></>
      ) : ( <span>{prettifyString(userData[item.name], item.name)}</span> )}
    </label>
    // (typeof item.currentDate === 'function') ? console.log(item.name + ' tem funcao') : console.log(item.name + ' sem funcao')
    // console.log(item.currentDate )
  );

  const section2 = inputSec2.map((item) => 
    <label key={item.name} htmlFor={item.name}>{(isEditing && item.isRequired) ? <span>{item.title}<strong><span aria-label="required">*</span></strong></span> : <span>{item.title}</span>}
      {isEditing ? (
        <>
          {/* item.isRequired && <strong><span aria-label="required">*</span></strong> */}
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
            maxValue={(typeof item.currentDate === 'function') ? item.currentDate() : undefined}
            inputMode={item.inputMode}
            />
        </>
      ) : ( <span>{prettifyString(userData[item.name], item.name)}</span> )}
    </label>
  );

  return (
    <div key={resetForm}>
      <h1>Meus dados</h1>
      <p>{isEditing ? (<>Campos obrigatórios possuem <strong><span aria-label="required">*</span></strong></>) : ''}</p>
      <form method="post" onSubmit={handleForm} className="form-dados-pessoais" noValidate>
        <section>
          {section1}
        </section>
        
        {error && isEditing && <p>{error}</p>} {/* Mostra erro quando erro conter uma mensagem e também quando estiver editando */}   

        <section>
          {!loading && !error && /* isEditing && */ <SelectState 
          showRequired={isEditing}
          value={selectedState}
          onChange={handleSelection}/>}

          {!loading && !error && section2/* inputAdress.map((item) => 
          <label key={item.name} htmlFor={item.name}>{item.title}
            {isEditing ? (
              <><strong><span aria-label="required">*</span></strong>
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
                maxValue={(typeof item.currentDate === 'function') ? item.currentDate() : undefined}
                inputMode={item.inputMode}
              /></>
              ) : ( <span>{prettifyString(userData[item.name], item.name)}</span> )}
          </label>
        ) */}
        </section>        
        {isEditing ? (
          <>
          <button type="submit">Salvar dados</button>
          <button type="button" onClick={resetInputValue}>Cancelar</button>
          </>
          ) : ( <button type="button" onClick={handleEditData} className="edit-dados-pessoais">Editar dados</button> )
        }
        
      </form>
    </div>
  );
}

function Exames() {
  return (
    <p>examesss</p>
  );
}



// Painel principal
export default function AreaPaciente({ logOff, userName }) {
  /* const [activeIndex, setActiveIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState({
    index: 0,
    name: 'meus dados'
  }); */
  const [selectedId, setSelectedId] = useState(menuContentPaciente[0]);

  /* function handleMenuItem(event) {
    const currentId = event.target.parentNode.id;
    const currentName = menuContentPaciente.at(currentId);

    setCurrentTab({
      index: event.target.parentNode.id,
      name: currentName
    });
    setActiveIndex(currentId);
    
    console.log(event.target.parentNode.id, currentName);
    console.log('atual index tab: ' + typeof parseInt(currentId));
  } */


  // talvez precise "guardar" os components com hide para reter os dados de usuário em dev
  // return (
  //   <MainGridDashboard pageName={'pagina-paciente'}>
  //     <MenuTab 
  //       onClick={handleMenuItem} 
  //       menuNames={menuContentPaciente}
  //       setClassName={}/>
  //     <MainContent keyTab={currentTab.index} nameTab={currentTab.name.replace(" ", "-")}>
  //       {/* <MeusDados /> */}
  //       {/* arrumar class do div aparecendo com espaçamento... */}
  //       {currentTab.name === 'meus dados' && <MeusDados />}
  //       {/* {currentTab.name === 'exames' && <Exames />} */}
  //     </MainContent>
  //   </MainGridDashboard>
  // );
 /*  return (
    <MainGridDashboard 
      menuTabs={menuContentPaciente}
      pageName='pagina-paciente'
      handleMenuList={() => setSelectedId(tabName)} 
    >
      {<MeusDados />}
      <MainContent >
        <MeusDados />
      </MainContent>
    </MainGridDashboard>
  ); */
  return (
    <MainGridDashboard pageName={'pagina-paciente'}>
      <MenuTabList>
        {menuContentPaciente.map((tab) =>
          <ItemTab 
            key={tab}
            tabId={tab}
            tabIcon={menuIconPaciente[tab]}
            handleMenuTab={() => {
              
              setSelectedId(tab);
              if (tab === 'sair') {
                logOff();
              }
            }}
            classNameTab={(selectedId === tab) ? 'button-menu current-tab' : 'button-menu'}
          />
        )}
      </MenuTabList>
      <UserProfile userName={userName} />
      <MainContent
        tabId={selectedId}
        className={selectedId}
      >
        {(selectedId === 'meus-dados') ? <MeusDados /> : selectedId}

        {/* {(selectedId === 'sair') ?  } */}
      </MainContent>
    </MainGridDashboard>
  );
}