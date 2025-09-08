import { useState } from 'react';
import { MainGridDashboard, MenuTabList, ItemTab, MainContent, UserProfile } from './GeneralDashboard';
import { menuContentAdmin, menuContentProfSaude, removeAccentPTBR, menuIconProfSaude, menuIconAdmin } from './LocalData';

import '../styles/Colaborador.css'


// PROFISSIONAL DA SAÚDE
// Aba - Agenda
function AbaAgenda() {
  return (
    <p>Agenda</p>
  );
}



// Aba - Prontuários
function AbaProntuarios() {
  return (
    <p>Prontuários</p>
  );
}



// Aba - Receitas Digitais
function AbaReceitasDigitais() {
  return (
    <p>Receitas Digitais</p>
  );
}



// Aba - Pacientes
function AbaPacientes() {
  return  (
    <p>Pacientes</p>
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
        {(selectedId === 'agenda') && <AbaAgenda />}
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
    <p>Home</p>
  );
}



// Aba - Pacientes
function AbaPacientesAdmin() {
  return (
    <p>Pacientes Admin</p>
  );
}



// Aba - Atendimentos
function AbaAtendimentos() {
  return (
    <p>Atendimentos</p>
  );
}



// Aba - Profissionais de Saúde
function AbaProfSaude() {
  return (
    <p>Profissionais de Saúde</p>
  );
}



// Aba - Leitos e Internações
function AbaLeitosInternacoes() {
  return (
    <p>Leitos e Internações</p>
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
        {(selectedId === 'atendimentos') && <AbaAtendimentos />}
        {(selectedId === 'profissionais-de-saúde') && <AbaProfSaude />}
        {(selectedId === 'leitos-e-internações') && <AbaLeitosInternacoes />}
      </MainContent>
    </MainGridDashboard>
  );
}