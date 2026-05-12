# Projeto teórico de Sistema de Gestão Hospitalar e de Serviços de Saúde (SGHSS) - VidaPlus

Sistema teórico desenvolvido com base em um __Estudo de Caso__ de uma instituição hipotética que administra hospitais, clínicas de bairros, laboratórios, etc, e necessita de um sistema de gestão para centralizar diversos procedimentos, como cadastro e atendimento de pacientes, administração hospitalar, segurança e compliance.
O objetivo foi atender aos requisitos da atividade para a conclusão de curso, seguindo os princípios do desenvolvimento de software e da aplicação da engenharia de software.

O projeto teve como objetivo em um primeiro momento, o desenvolvimento da 
interface de usuário de um sistema web responsivo e intuitivo que centralize e facilite 
os processos de atendimento médico, gestão administrativa, gestão de profissionais 
e comunicação entre os diferentes setores da instituição. O sistema será voltado 
para a modernização do fluxo de serviços de saúde, promovendo eficiência, 
segurança e melhoria na experiência de seus usuários.

Na primeira fase do projeto foram implementados os acessos de usuários com seus respectivos menus:

#### Usuário paciente
- Meus Dados
- Consulta
- Exames
- Histórico Clínico
- Sair

#### Usuário profissional da saúde
- Minha Agenda
- Pacientes
- Receitas Digitais
- Sair

#### Usuário administrador
- Home
- Pacientes
- Leitos e Internações
- Relatórios
- Gestão de Profissionais
- Financeiro
- Registros
- Sair

Também foi implantado a possibilidade de o próprio usuário paciente alterar seus dados, como telefone, e-mail, CEP, etc, contendo as devidas 
validações de front-end, como retorno de mensagem sobre o erro em que algum 
campo fica invalidado, auxiliando o usuário em como preencher o respectivo campo 
corretamente. Também houve a integração de uma API (brasilapi.com.br) que 
preenche automaticamente — Estado, Cidade, Bairro e Logradouro — de acordo 
com o CEP válido inserido.

## Modelagem e arquitetura

Para este projeto foi utilizado React, os principais fatores foram: a possibilidade de reúso de componentes, uma vasta 
comunidade tornando-o amplamente suportado e desenvolvido, não obriga a atender 
algum Design Pattern específico ou estrutura de projeto, sendo assim oferece aos 
desenvolvedores mais controle sobre seus códigos. Também foi utilizado a biblioteca 
de componentes Material UI para auxiliar na criação de alguns componentes mais 
complexos.

## :hammer_and_wrench: Tecnologias :hammer_and_wrench:

- React + Vite
- Material UI