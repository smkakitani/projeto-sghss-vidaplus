import { useState, useContext, createContext } from 'react'
import './App.css'
import AreaColaborador from './components/Colaborador'
import AcessoUsuario from './components/Login'


import vidaPlusLogo from './assets/logo_vidaplus_.svg'



function LogoVidaPlus () {
  return (
    <div id='vp-logo'>
      <img className='logo' src={vidaPlusLogo} alt="logo de VidaPlus" />
      <p>VidaPlus</p>
    </div>
  )
}

// Context para decidir o tipo de usuário, paciente ou colaborador
// export const UserContext = createContext(null);


// Main
function App() {
  const [userType, setUserType] = useState(''); // renderizar página paciente ou colaborador


  function selecionaAreaUsuario (event) {
    event.preventDefault();

    console.log(event.target.className) // classe com o tipo de usuário
  }

  return (
    <>
    {/* página paciente ou colab
    isPaciente && pagPaciente */}
      <AcessoUsuario 
        definirAcesso={selecionaAreaUsuario}/>
    </>    
  )
}

export default App