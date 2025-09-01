import { useState } from 'react';
import { MainGridDashboard, MenuTabList, ItemTab, MainContent } from './GeneralDashboard';
import { menuContentAdmin, menuContentProfSaude, removeAccentPTBR } from './LocalData';

import '../styles/Colaborador.css'


// menu terá diferença entre funcionário admin e prof. da saúde




export function AreaColaboradorProfSaude({ logOff }) {
  const [selectedId, setSelectedId] = useState(menuContentProfSaude[0]);

  return (
    <MainGridDashboard pageName='pagina-colab-prof'>
      <MenuTabList>
        {menuContentProfSaude.map((tab) =>
          <ItemTab 
            key={tab}
            tabId={tab}
            handleMenuTab={() => {
              // console.log('saindo de colab???? >(');
              setSelectedId(tab);
              if (tab === 'sair') {
                logOff();
              }
            }}
            classNameTab={(selectedId === tab) ? 'button-menu current-tab' : 'button-menu'}
          />
        )}
      </MenuTabList>
      <MainContent
        tabId={selectedId}
        className={removeAccentPTBR(selectedId)} 
      >
        {(selectedId === 'home') ? 'home :D' : selectedId}
      </MainContent>
    </MainGridDashboard>
  );
}

// Painel principal
export function AreaColaboradorAdmin ({ logOff }) {
  // const [currentTab, setCurrentTab] = useState({
  //   index: 0,
  //   name: 'home'
  // });

  // function handleMenuItem (event) {
  //   const currentName = menuContentAdmin.at(event.target.parentNode.id);

  //   setCurrentTab({
  //     index: event.target.parentNode.id,
  //     name: currentName
  //   });

  //   console.log(event.target.parentNode.id, currentName);
  //   console.log(currentTab);
  // }


  // return (
  //   <MainGridDashboard 
  //     menuTabs={menuContentAdmin}
  //     pageName='pagina-colab'>
  //     {/* <MenuTab onClick={handleMenuItem} menuNames={menuContentAdmin}/> */}
  //     {/* <PainelPrincipal keyTab={currentTab.index} tabName={currentTab.name}/> */}
  //     {/* <MainContent keyTab={currentTab.index} nameTab={currentTab.name}/> */}


  //   </MainGridDashboard>
  // );

  const [selectedId, setSelectedId] = useState(menuContentAdmin[0]);

  return (
    <MainGridDashboard pageName='pagina-colab-admin'>
      <MenuTabList>
        {menuContentAdmin.map((tab) =>
          <ItemTab 
            key={tab}
            tabId={tab}
            handleMenuTab={() => {
              // console.log('saindo de colab???? >(');
              setSelectedId(tab);
              if (tab === 'sair') {
                logOff();
              }
            }}
            classNameTab={(selectedId === tab) ? 'button-menu current-tab' : 'button-menu'}
          />
        )}
      </MenuTabList>
      <MainContent
        tabId={selectedId}
        className={removeAccentPTBR(selectedId)} 
      >
        {(selectedId === 'home') ? 'home :D' : selectedId}
      </MainContent>
    </MainGridDashboard>
  );
}