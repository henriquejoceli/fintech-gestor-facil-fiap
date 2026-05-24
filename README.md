# Velofy — Gestor Financeiro Inteligente (FIAP Fintech)

O Velofy é uma aplicação completa de gerenciamento financeiro desenvolvida como projeto integrador para a FIAP. A plataforma permite o controle inteligente de fluxos de caixa, cadastro inclusivo de usuários, gestão de contas multifuncionais, simulação/auditoria de investimentos e um histórico de transações automatizado. No escopo atual, toda a inserção de dados e vínculos financeiros é realizada de forma manual pelo usuário através da interface; a integração com APIs bancárias automatizadas (como Open Finance) e sincronização externa automática já constam no backlog do projeto para serem introduzidas em atualizações futuras.

---

## Arquitetura do projeto

O ecossistema é estruturado de forma modular seguindo o padrão de mercado em duas camadas principais:

* **Front-end (`velofy-frontend`):** Interface SPA moderna e responsiva construída em **React**, utilizando **Vite** para compilação em alta performance, **Axios** para consumo centralizado de APIs, **Lucide-React** para iconografia e o pacote oficial `@dicebear/core` para geração e renderização programática local de avatares SVG.
* **Back-end (`velofy-backend`):** API REST robusta desenvolvida em **Java 21** com **Spring Boot 3**, utilizando **Spring Data JPA** para persistência relacional com tratamento automático de relacionamentos, **Spring Security Crypto (BCrypt)** para hashing seguro de senhas e arquitetura limpa orientada a serviços (`Controller` -> `Service` -> `Repository`).

---

## Configuração de banco de dados e portabilidade

Para atender aos requisitos e garantir a portabilidade em qualquer ambiente de avaliação, o back-end está preparado para funcionar em dois cenários através do arquivo `application.properties`:

1.  **Cenário em produção (Instância Oracle FIAP):** Totalmente mapeado e integrado às tabelas físicas do banco Oracle, atendendo à obrigatoriedade do projeto.
2.  **Cenário de desenvolvimento (Banco H2 em Memória):** Configurado para subir de forma autossuficiente através do script mestre `data.sql` (que limpa e recria as tabelas de domínio automaticamente). **Ideal para execução imediata no GitHub Codespaces**, onde firewalls externos podem bloquear conexões de saída.

---

## Funcionalidades implementadas

* **Nome Social opcional & UX inclusiva:** O cadastro permite o preenchimento opcional do Nome Social. Caso esteja presente, o sistema substitui dinamicamente o nome de registro nas mensagens do Dashboard e Perfil, preservando a identidade civil sob o escopo relacional interno.
* **Upload e persistência de avatares em CLOB:** Sistema duplo de foto de perfil. O usuário pode escolher um avatar programático gerado localmente via pacote npm do DiceBear ou fazer upload de uma foto real (limitada a 2MB). Ambas as abordagens convertem a imagem em strings de texto estruturado guardadas de forma transparente em colunas do tipo `CLOB`.
* **Catálogos dinâmicos de fluxo:** O formulário de transações e aportes consome endpoints específicos de domínio. O front-end filtra em tempo real as categorias dependendo da ação do usuário (Receita exibe apenas categorias de Crédito; Despesa exibe apenas categorias de Débito), eliminando dados engessados em hardcode.
* **Soft-Delete (LGPD):** O encerramento de conta segue as diretrizes legais, inativando o registro no banco (`status = 'I'`) de forma lógica em vez de deletar fisicamente o histórico de auditoria.

---

## Como executar

> ### Credenciais e regras de Autenticação para testes
> 
> **IMPORTANTE SOBRE O COMPORTAMENTO DOS BANCOS DE DADOS:**
> * **Se estiver rodando na Nuvem (Opção A - H2):** Como o banco H2 opera totalmente em memória RAM, **os dados são voláteis**. Toda vez que o servidor Spring Boot for reiniciado (novo boot do container), o banco resetará para o estado inicial. Portanto, se você optar por rodar assuim, seu usuário precisará ser recriado a cada novo boot do ecossistema.
> * **Se estiver rodando localmente (Opção B - Oracle):** O banco Oracle da FIAP é físico e persistente. Se você criar um usuário novo através da tela de cadastro da interface, as informações ficarão gravadas permanentemente no banco da faculdade, sendo necessário apenas realizar o cadastro **uma única vez**.

---

### Opção A: Executando no GitHub Codespaces (ambiente em Nuvem)

O projeto está configurado para rodar de forma 100% automatizada na nuvem utilizando o banco de dados em memória **H2**. Devido às restrições de Firewall da rede da faculdade, conexões externas vindas do Codespaces para o banco Oracle físico são bloqueadas por padrão, fazendo do H2 a escolha ideal e autossuficiente para este ambiente.

1. **Inicializar o Back-end (Java/Spring Boot):**
   * Abra um terminal dedicado no Codespaces.
   * Certifique-se de que o arquivo `application.properties` esteja com o bloco do H2 ativo (padrão do repositório).
   * Execute os comandos para navegar até a pasta e subir a API:
     ```bash
     cd velofy-backend
     mvn spring-boot:run
     ```
   * Aguarde o terminal exibir a mensagem de que o Tomcat foi iniciado na porta `8080`.

2. **Liberar a Porta do Back-end (etapa obrigatória):**
   * No painel inferior ou lateral do VS Code no Codespaces, clique na aba **Ports** (Portas).
   * Localize a linha correspondente à porta `8080`.
   * Clique com o botão direito sobre o termo **Private** (na coluna *Port Visibility*) ou use o menu de contexto para alterar para **Public** (Pública).
   * *Aviso:* Se você esquecer de tornar a porta `8080` pública, o navegador bloqueará as requisições do React por segurança (erro de CORS), impedindo o funcionamento do sistema.

3. **Inicializar o Front-end (React/Vite):**
   * Abra um **segundo terminal** totalmente separado no Codespaces.
   * Navegue até a pasta do front-end, instale as dependências e inicie o servidor de desenvolvimento:
     ```bash
     cd velofy-frontend
     npm install
     npm run dev
     ```
   * O Vite gerará um link correspondente à porta `5173`. Clique nele (ou segure `Ctrl` e clique) para abrir a interface do Velofy no seu navegador.

---

### Opção B: Executando localmente (na sua máquina)

**Pré-requisitos:** Certifique-se de ter instalado localmente o Java 21 (ou superior), o Node.js (versão LTS) e o gerenciador de pacotes npm.

1. **Configurar e Executar o Back-end:**
   * Se o seu objetivo for testar a persistência direta e obrigatória na instância física do **Oracle DB da FIAP**, abra o arquivo `velofy-backend/src/main/resources/application.properties`.
   * Comente todas as linhas do bloco do banco H2 adicionando o caractere `#` no início de cada uma.
   * Remova os comentários `#` do bloco do Oracle.
   * Abra o terminal na pasta raiz do back-end e execute o Maven Wrapper para iniciar o servidor:
     ```bash
     cd velofy-backend
     ./mvnw spring-boot:run
     ```
   * O servidor local da API estará ativo e respondendo no endereço: `http://localhost:8080`

2. **Configurar e Executar o Front-end:**
   * Abra um novo terminal na pasta raiz do front-end.
   * Execute os comandos para instalar os pacotes do `package.json` e iniciar o servidor do Vite:
     ```bash
     cd velofy-frontend
     npm install
     npm run dev
     ```
   * O navegador abrirá a aplicação automaticamente. Caso não abra, acesse manualmente pelo endereço: `http://localhost:5173`

---

## 🛠️ Tecnologias Utilizadas

* **Java 21 & Spring Boot 3.2.5** (Desenvolvimento da API REST & Regras de Negócio)
* **Spring Data JPA & Hibernate** (Abstração Relacional e Persistência)
* **Oracle Database** (Banco de Dados de Produção) / **H2 Database** (Memória local)
* **Spring Security Crypto (BCrypt)** (Algoritmo de Hashing de Senhas)
* **ReactJS & Vite** (Framework Front-end SPA de Alta Performance)
* **Axios HTTP Client** (Consumo Assíncrono de Endpoints)
* **Lucide-React** (Iconografia de Interface)
* **@dicebear/core** (Biblioteca para Geração de Avatares Inclusivos)
