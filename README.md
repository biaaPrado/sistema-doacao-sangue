# 🩸 Sistema de Doação de Sangue
 
Este projeto é um sistema de gerenciamento de doações de sangue desenvolvido com foco em **Programação Orientada a Objetos (POO)** e aplicação dos princípios de **Clean Architecture**, separando claramente as responsabilidades entre as camadas do sistema.
 
O objetivo é simular um sistema real utilizado por hemocentros, permitindo o cadastro de doadores, registro de doações e gerenciamento de informações relacionadas ao processo de doação de sangue.
 
---
 
## 🌐 Acesso Online (Deploy)
 
> 🔗 **Aplicação no ar:** [https://sistema-doacao-sangue.vercel.app](https://sistema-doacao-sangue.vercel.app)

 
## 🎯 Objetivo do Projeto
 
O sistema tem como finalidade:
 
* Cadastrar doadores de sangue
* Registrar doações realizadas
* Gerenciar informações de doadores
* Simular regras de negócio de um hemocentro
* Aplicar boas práticas de engenharia de software
---
 
## 🧠 Arquitetura do Sistema
 
O projeto segue os princípios da **Clean Architecture**, separando a aplicação em camadas independentes:
 
```txt
backend/
├── domain/           # Entidades e regras de negócio (POO)
├── application/      # Casos de uso (regras da aplicação)
├── presentation/     # Controllers e rotas da API
```
 
Essa separação garante:
 
* Baixo acoplamento
* Alta manutenibilidade
* Testabilidade
* Organização clara do sistema
---
 
## 🛠️ Tecnologias Utilizadas
 
### Backend
 
* TypeScript
* Node.js
* Express
* CORS
* Dotenv
### Frontend
 
* React
* TypeScript
* Tailwind CSS
* Vite
 
## 🧩 Funcionalidades
 
* Cadastro de doadores
* Registro de doações
* Listagem de doadores
* Gerenciamento de dados de usuários
* Integração entre frontend e backend via API REST
---
 
## 🖥️ Como Executar o Projeto Localmente
 
### Backend
 
```bash
cd backend
npm install
npm run dev
```
---
 
### Frontend
 
```bash
cd frontend
npm install
npm run dev
```
  
---
 
## 📌 Principais Conceitos Aplicados
 
* Programação Orientada a Objetos (POO)
* SOLID (conceitos aplicados na arquitetura)
* Clean Architecture
* Separação de responsabilidades
* Consumo de API REST
* Integração frontend + backend
---
 
## 📁 Estrutura Geral
 
```txt
sistema-doacao-sangue/
├── backend/
├── frontend/
├── docs/
└── README.md
```
 
---
 
## 👨‍💻 Autor
 
Projeto desenvolvido para fins acadêmicos na disciplina de Programação Orientada a Objetos.
 
---
 
## 📄 Licença
 
Este projeto é de uso acadêmico.