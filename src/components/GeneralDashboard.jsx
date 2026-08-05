import { removeAccentPTBR } from "./LocalData";
import vidaPlusLogo from "../assets/logo_vidaplus_.svg";
// Styles
import "../styles/GeneralDashboard.css";
import styled, { keyframes } from "styled-components";
// MUI
import { Avatar } from "@mui/material";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import { NavLink } from "react-router";

// Página geral determinando o grid
const slideLeft = keyframes`
  0% {
    transform: translateX(-1400px);
    opacity: 0;
    filter: blur(30px);
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
    filter: blur(0);
  }
`;
const DivAnimation = styled.div`
  animation: ${slideLeft} 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
export function MainGridDashboard({
  pageName,
  children,
  tabs = [],
  tabsIcon = {},
  userName,
  handleTabOnClick,
}) {
  return (
    <DivAnimation id="main-grid" className={pageName}>
      <nav>
        <LogoVidaPlus />
        <menu>
          {tabs.map((name) => (
            <ItemTab
              key={name}
              tabId={name}
              tabIcon={tabsIcon[name]}
              path={name === "sair" ? "/" : name}
              classNameTab={"button-menu"}
              onTabClick={handleTabOnClick}
            />
          ))}
        </menu>
      </nav>
      <UserProfile userName={userName} />
      <main>{children}</main>
    </DivAnimation>
  );
}

// Logo da instituição 97px
const heartbeat = keyframes`
  0% {
    transform: scale( .75);
  }
  20% {
    transform: scale( 1);
  }
  40% {
    transform: scale( .75);
  }
  60% {
    transform: scale( 1);
  }
  80% {
    transform: scale( .75);
  }
  100% {
    transform: scale( .75);
  }
`;
const LogoAnimation = styled.img`
  animation: ${heartbeat} 1500ms cubic-bezier(0, 0.91, 0.58, 0.5) 1s both;
`;
export function LogoVidaPlus() {
  return (
    <div id="vp-logo">
      <LogoAnimation className="logo" src={vidaPlusLogo} alt="logo de VidaPlus" />
      <p>VidaPlus</p>
    </div>
  );
}

// Painel de menu principal
const ButtonAnimation = styled.button`
  && span {
    transition: transform 750ms ease-in-out;
  }
  &&:hover > span,
  &&.current-tab > span {
    transform: scale(1.1);
    transform-origin: center;
  }
`;
const StyleNavLink = styled(NavLink)`
  text-decoration: none;
`;
export function ItemTab({ tabId, onTabClick, classNameTab, tabIcon, path }) {
  return (
    <li className={removeAccentPTBR(tabId)}>
      <StyleNavLink to={removeAccentPTBR(path)}>
        <ButtonAnimation
          onClick={onTabClick}
          type="button"
          className={classNameTab}
          value={tabId}
        >
          <span>{tabIcon}</span>
          <span className="hidden-text">{tabId.replaceAll("-", " ")}</span>
        </ButtonAnimation>
      </StyleNavLink>
    </li>
  );
}

export function MenuTabList({ children }) {
  return (
    <nav>
      <LogoVidaPlus />
      <menu>{children}</menu>
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

export function UserProfile({ userName = "unkown" }) {
  function getLetter(str) {
    return str.charAt(0).toUpperCase();
  }
  return (
    <section id="user-profile">
      <NotificationsSharpIcon />
      <Avatar sx={{ width: 56, height: 56 }}>{getLetter(userName)}</Avatar>
      <p>
        Olá, <br /> {userName}
      </p>
    </section>
  );
}
