// menu terá diferença entre funcionário admin e prof. da saúde

const menuContentAdmin = [
  'home',
  'pacientes',
  'atendimentos',
  'profissionais de saúde',
  'leitos e internações',
];

function MenuColab () {
  const menuList = menuContentAdmin.map((name, index) => (<li key={index}>{name}</li>))

  return (
    <nav>
      <menu>{menuList}</menu>
    </nav>
  );
}

export default function AreaColaborador () {
  return (
    <div>
      <MenuColab />
    </div>
  )
}