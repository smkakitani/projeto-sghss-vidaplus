import { useState } from 'react';
import { MainGridDashboard, MenuTabList, ItemTab, MainContent, UserProfile } from './GeneralDashboard';
import { menuContentAdmin, menuContentProfSaude, removeAccentPTBR, menuIconProfSaude, menuIconAdmin } from './LocalData';
// import { usePersonData } from './Api';

// MUI
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from '@mui/x-date-pickers/locales';
import { DateTimePicker } from '@mui/x-date-pickers';
import { ptBR as ptB } from 'date-fns/locale';
// import DateRangeSharpIcon from '@mui/icons-material/DateRangeSharp';
//
import '../styles/Colaborador.css'








export function FirstComponent() {
  const [value, setValue] = useState('');
  // const [newValue, setNewValue] = useState(null);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} 
      localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
      adapterLocale={ptB}
    >
      {/* <DatePicker label="" /> */}
      <DateTimePicker 
        showDaysOutsideCurrentMonth={true}
        // label={'aaaa'}
        // closeOnSelect={false}
        // slotProps={{ actionBar: { actions: ['cancel', 'accept'] } }}
        // orientation='landscape'
        // displayStaticWrapperAs='desktop'
        value={value}
        onChange={(newValue) => {
          
          setValue(newValue)
          // console.log(newValue);
        }}
        onAccept={(value) => console.log(value)}
        // views={['year', 'month', 'day', 'hours', 'minutes']}
      />
    </LocalizationProvider>
  );
}

function Agenda() {
  // usePersonData();
  return (
    <>
      <h2>Agenda {/* <DateRangeSharpIcon /> */}{menuIconProfSaude.agenda}</h2>

      <FirstComponent />
    </>
    
  );
}







export function AreaColaboradorProfSaude({ logOff, userName }) {
  const [selectedId, setSelectedId] = useState(menuContentProfSaude[0]);

  return (
    <MainGridDashboard pageName='pagina-colab-prof'>
      <MenuTabList>
        {menuContentProfSaude.map((tab) =>
          <ItemTab 
            key={tab}
            tabId={tab}
            tabIcon={menuIconProfSaude[tab]}
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
      <UserProfile userName={userName} />
      <MainContent
        tabId={selectedId}
        className={removeAccentPTBR(selectedId)} 
      >
        {(selectedId === 'agenda') ? <Agenda /> : selectedId}
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
            tabIcon={menuIconAdmin[tab]}
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