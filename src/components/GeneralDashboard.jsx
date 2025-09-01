// import { useState } from 'react';
import { removeAccentPTBR } from './LocalData';

import '../styles/GeneralDashboard.css';

import vidaPlusLogo from '../assets/logo_vidaplus_.svg';


// Logo da instituição 97 x 121 px
export function LogoVidaPlus() {
    return (
      <div id='vp-logo'>
        <img className='logo' src={vidaPlusLogo} alt="logo de VidaPlus" />
        <p>VidaPlus</p>
      </div>
    )
}


// Painel de menu principal
export function ItemTab({ tabId, handleMenuTab, classNameTab}) {
  return (
    <li /* key={tabId} */ className={removeAccentPTBR(tabId)}>
      <button onClick={handleMenuTab} type='button' className={classNameTab}>
        {tabId.replaceAll("-", " ")}
      </button>
    </li>
  );
}

export function  MenuTabList({ /* listIds, onClick, tabName, classNameTab, */ children }) {
  
  // function changeTabColor() {

  // };

  // console.log(currentTabIndex + 'from child...');
 /*  const menuList = menuNames.map((name, index) => <li key={index} id={index}><button onClick={onClick} type='button' className={menuClass}>{name}</button></li>) */

/*   return (
    <nav>
      <LogoVidaPlus />
      <menu>
        {menuList}
      </menu>
    </nav>
  ); */
  // return (
  //   <li id={tabName}>
  //     <button onClick={onClick} type='button' className={classNameTab}>
  //       {tabName.replace("-", " ")}
  //     </button>
  //   </li>
  // );
  return (
    <nav>
      <LogoVidaPlus />
      <menu>
        {children}
        {/* listIds.map((listId) =>
          <li key={listId} className={listId}><button onClick={onClick} type='button' className={classNameTab}>{listId.replace("-", " ")}</button></li>
        ) */}
      </menu>
    </nav>
  );
}

export function MainContent({ tabId, className, children }) {
  // return (
  //   <div /* key={keyTab} className={nameTab} */>
  //     {children}
  //   </div>
  // );
  return (
    <main>
      <div key={tabId} className={className}>
        {children}
      </div>
    </main>
  );
}

// export function MenuSair() {
  
// }

// Página geral determinando o grid
export function MainGridDashboard({ 
  /* menuTabs, 
  handleMenuList, 
  selectedId,
  menuNameTab,
  classNameMenuTab, */
  pageName,
  children
 }) {
  // const [selectedId, setSelectedId] = useState(menuTabs[0]);

/*   return (
    <div id='main-grid' className={pageName}>
      <nav>
        <LogoVidaPlus />
        <menu>
          {{menuTabs.map((tabName) => 
            <MenuTabList 
              onClick={handleMenuList}
              key={tabName}
              // onClick={() => setSelectedId(tabName)}
              tabName={tabName}
              // classNameTab={classNameMenuTab}
              classNameTab={(selectedId === tabName) ? 'button-menu current-tab' : 'button-menu'}
            />
          )}}
          {menuTabs}
        </menu>
      </nav>
      <main>
        {<div key={selectedId} className={selectedId}>
          {children}
        </div>}
        {children}
      </main>
    </div>
  ); */

  return (
    <div id='main-grid' className={pageName}>
      {children}
    </div>
  );
}

