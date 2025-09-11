import { removeAccentPTBR } from './LocalData';
import vidaPlusLogo from '../assets/logo_vidaplus_.svg';

import '../styles/GeneralDashboard.css';


// MUI
import { Avatar } from '@mui/material';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';

// Logo da instituição 97px
export function LogoVidaPlus() {
    return (
      <div id='vp-logo'>
        <img className='logo' src={vidaPlusLogo} alt="logo de VidaPlus" />
        <p>VidaPlus</p>
      </div>
    )
}


// Painel de menu principal
export function ItemTab({ tabId, handleMenuTab, classNameTab, tabIcon }) {
  return (
    <li className={removeAccentPTBR(tabId)}>
      <button onClick={handleMenuTab} type='button' className={classNameTab}>
        <span>{tabIcon}</span>
        <span className="hidden-text">{tabId.replaceAll("-", " ")}</span>
      </button>
    </li>
  );
}

export function  MenuTabList({ children }) {
  return (
    <nav>
      <LogoVidaPlus />
      <menu>
        {children}
      </menu>
    </nav>
  );
}

export function MainContent({ tabId, className, children }) {
  return (
    <main>
      <div key={tabId} className={removeAccentPTBR(className)}>
        {children}
      </div>
    </main>
  );
}

export function UserProfile({ userName='Miau', }) {
  function getLetter(str) {
    return str.charAt(0).toUpperCase()
  }
  return (
    <section id='user-profile'>
      <NotificationsSharpIcon />
      <Avatar sx={{ width: 56, height: 56}}>
        {getLetter(userName)}
      </Avatar>
      <p>Olá, <br /> {userName}</p>
    </section>
  );  
}

// Página geral determinando o grid
export function MainGridDashboard({ pageName, children }) {
  return (
    <div id='main-grid' className={pageName}>
      {children}
    </div>
  );
}

