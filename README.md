# Velofy — Gestor Financeiro Inteligente (FIAP Fintech)

O **Velofy** é uma aplicação completa de gerenciamento financeiro desenvolvida como projeto para a FIAP. A plataforma permite o cadastro de usuários com criptografia de ponta, gerenciamento de contas bancárias, simulação e acompanhamento de investimentos, além de um histórico inteligente de transações (débito/crédito) com categorização automática.

---

## 🏗️ Arquitetura do Projeto

O ecossistema é dividido de forma modular em duas camadas principais:

* **Front-end (`velofy-frontend`):** Interface moderna e responsiva construída em **React**, utilizando **Vite** para compilação rápida, **Axios** para consumo de APIs e ícones dinâmicos com **Lucide-React**.
* **Back-end (`velofy-backend`):** API REST robusta desenvolvida em **Java 21** com **Spring Boot 3**, utilizando **Spring Data JPA** para persistência, **Spring Security Crypto** para hashing de senhas e **Lombok** para código limpo.

---

## 🎛️ Estratégia Híbrida de Banco de Dados

Para garantir que o projeto seja avaliado sem barreiras ou problemas de conexão externa, o back-end está configurado para rodar de forma híbrida:

1.  **Modo Padrão (Autossuficiente):** Utiliza o banco de dados **H2 em memória**. Ao iniciar, o Hibernate gera as tabelas automaticamente e o Spring popula as tabelas auxiliares (gêneros, categorias e tipos de conta) via script `data.sql`. Perfeito para rodar no **GitHub Codespaces** ou localmente sem configurações adicionais.
2.  **Modo Produção (Oracle FIAP):** Contém o mapeamento pronto para o banco **Oracle** da faculdade. Devido a restrições de Firewall que bloqueiam datacenters externos (como o Codespaces), este perfil vem comentado por padrão.

---

## 🚀 Como Executar o Projeto

### Opção A: Rodando no GitHub Codespaces (Recomendado)

O projeto está totalmente preparado para a nuvem. O Front-end detecta automaticamente o proxy do Codespaces e redireciona os requests para a porta do Java de forma transparente.

1.  **Subir o Back-end (Java):**
    Abra um terminal, navegue até a pasta do backend e inicie o Spring Boot:
    ```bash
    cd velofy-backend
    mvn spring-boot:run
    ```
2.  **Tornar a Porta Pública:**
    Na aba **Ports** do Codespaces, localize a porta **8080**, clique com o botão direito em *Port Visibility* e altere de **Private** para **Public** (essencial para o navegador permitir as requisições do front).
3.  **Subir o Front-end (React):**
    Abra um segundo terminal e inicie o servidor de desenvolvimento do Vite:
    ```bash
    cd velofy-frontend
    npm install
    npm run dev
    ```
    Clique no link gerado na porta `5173` para abrir a aplicação no navegador.

---

### Opção B: Rodando Localmente (Na sua Máquina)

**Pré-requisitos:** Java 21+ instalado, Node.js instalado e Maven (opcional, usa-se o wrapper integrado).

1.  **Executar o Back-end:**
    ```bash
    cd velofy-backend
    ./mvnw spring-boot:run
    ```
    *O servidor subirá em `http://localhost:8080`.*
2.  **Executar o Front-end:**
    ```bash
    cd velofy-frontend
    npm install
    npm run dev
    ```
    *A aplicação abrirá automaticamente em `http://localhost:5173`.*

> 💡 **Nota sobre o Banco Oracle:** Se desejar testar a persistência direta no banco de dados Oracle da FIAP, abra o arquivo `velofy-backend/src/main/resources/application.properties`, comente o bloco do H2 e remova os comentários (`#`) do bloco do Oracle, inserindo suas credenciais de RM.

---

## 🧪 Dados para Teste Rápido

Como o banco de dados H2 inicia limpo na memória a cada execução, siga este fluxo para testar as funcionalidades:

1.  Acesse a tela inicial e clique em **Criar Conta**.
2.  Preencha os dados no formulário de cadastro (o sistema possui validação em tempo real e impede o envio se as senhas não coincidirem).
3.  Após a mensagem de sucesso, faça o login com o e-mail e senha cadastrados.
4.  Dentro do dashboard, você poderá cadastrar contas, simular aportes em investimentos e gerenciar receitas ou despesas.

---

## 🛠️ Tecnologias Utilizadas

* **Java 21 & Spring Boot 3.2.5**
* **Spring Data JPA & Hibernate**
* **Banco de Dados H2 (Em memória) / Oracle DB**
* **Spring Security Crypto (BCrypt)**
* **React (JavaScript)**
* **Vite & Axios**
* **Lucide-React (Iconografia)**