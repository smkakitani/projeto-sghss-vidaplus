import { useState } from 'react';
import { MainGridDashboard, MenuTabList, ItemTab, MainContent, UserProfile } from './GeneralDashboard';
import { menuContentAdmin, menuContentProfSaude, removeAccentPTBR, menuIconProfSaude, menuIconAdmin } from './LocalData';

import '../styles/Colaborador.css';


// PROFISSIONAL DA SAÚDE
// Aba - Agenda
function AbaMinhaAgenda() {
  return (
    <h2>Minha Agenda</h2>
  );
}



// Aba - Receitas Digitais
function AbaReceitasDigitais() {
  return (
    <h2>Receitas Digitais</h2>
  );
}



// Aba - Pacientes
function AbaPacientes() {
  return  (
    <h2>Pacientes</h2>
  )
}



export function AreaColaboradorProfSaude({ logOff, userName }) {
  const [selectedId, setSelectedId] = useState(menuContentProfSaude[0]);
  console.log

  return (
    <MainGridDashboard pageName='pagina-colab-prof'>
      <MenuTabList>
        {menuContentProfSaude.map((tab) =>
          <ItemTab 
            key={tab}
            tabId={tab}
            tabIcon={menuIconProfSaude[tab]}
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
        className={removeAccentPTBR(selectedId)} 
      >
        {(selectedId === 'minha-agenda') && <AbaMinhaAgenda />}
        {(selectedId === 'prontuários') && <AbaProntuarios />}
        {(selectedId === 'receitas-digitais') && <AbaReceitasDigitais />}
        {(selectedId === 'pacientes') && <AbaPacientes />}        
      </MainContent>
    </MainGridDashboard>
  );
}



// ADMIN
// Aba - Home
function AbaHome() {
  return (
    <h2>Home</h2>
  );
}



// Aba - Pacientes
function AbaPacientesAdmin() {
  return (
    <h2>Cadastrar Pacientes</h2>
  );
}



// Aba - Atendimentos
function AbaRelatorios() {
  return (
    <h2>Atendimentos</h2>
  );
}



// Aba - Profissionais de Saúde
function AbaGestapProf() {
  return (
    <h2>Gestão de Profissionais</h2>
  );
}



// Aba - Leitos e Internações
function AbaLeitosInternacoes() {
  return (
    <h2>Leitos e Internações</h2>
  );
}



// Aba - Financeiro
function AbaFinanceiro() {
  return (
    <h2>Financeiro</h2>
  );
}



// Aba - Registros
function AbaRegistros() {
  return (
    <h2>Registros</h2>
  );
}




export function AreaColaboradorAdmin ({ logOff, userName }) {
  const [selectedId, setSelectedId] = useState(menuContentAdmin[0]);

  return (
    <MainGridDashboard pageName='pagina-colab-admin'>
      <MenuTabList>
        {menuContentAdmin.map((tab) =>
          <ItemTab 
            key={tab}
            tabId={tab}
            tabIcon={menuIconAdmin[tab]}
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
        className={removeAccentPTBR(selectedId)}
      >
        {(selectedId === 'home') && <AbaHome />}
        {(selectedId === 'pacientes') && <AbaPacientesAdmin />}
        {(selectedId === 'relatórios') && <AbaRelatorios />}
        {(selectedId === 'gestão-de-profissionais') && <AbaGestapProf />}
        {(selectedId === 'leitos-e-internações') && <AbaLeitosInternacoes />}
        {(selectedId === 'financeiro') && <AbaFinanceiro />}
        {(selectedId === 'registros') && <AbaRegistros />}
      </MainContent>
    </MainGridDashboard>
  );
}