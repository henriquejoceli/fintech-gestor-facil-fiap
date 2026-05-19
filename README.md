# Velofy — Gestor Financeiro Inteligente (FIAP Fintech)

O **Velofy** é uma aplicação completa de gerenciamento financeiro desenvolvida como projeto integrador para a FIAP. A plataforma permite o controle inteligente de fluxos de caixa, cadastro inclusivo de usuários, gestão de contas multifuncionais, simulação/auditoria de investimentos e um histórico de transações automatizado com sincronização em tempo real entre o banco de dados e a interface.

---

## 🏗️ Arquitetura do Projeto

O ecossistema é estruturado de forma modular seguindo o padrão de mercado em duas camadas principais:

* **Front-end (`velofy-frontend`)**: Interface SPA moderna e responsiva construída em **React**, utilizando **Vite** para compilação em alta performance, **Axios** para consumo centralizado de APIs, **Lucide-React** para iconografia e o pacote oficial **@dicebear/core** para geração e renderização programática local de avatares SVG.
* **Back-end (`velofy-backend`)**: API REST robusta desenvolvida em **Java 21** com **Spring Boot 3**, utilizando **Spring Data JPA** para persistência relacional com tratamento automático de relacionamentos (`FetchType.EAGER` / `TransientPropertyValueException`), **Spring Security Crypto (BCrypt)** para hashing seguro de senhas e arquitetura limpa orientada a serviços (`Controller-Service-Repository`).

---

## 🎛️ Estratégia Híbrida de Banco de Dados & Idempotência

Para garantir que o projeto seja avaliado sem barreiras ou problemas de infraestrutura externa, o back-end está configurado para operar de forma híbrida:

* **Modo Padrão (Autossuficiente)**: Utiliza o banco de dados **H2** em memória. Ao iniciar, as configurações do `application.properties` desativam o DDL automático do Hibernate e passam o controle total para o script mestre unificado `data.sql`. Esse script limpa o banco de forma idempotente (`DROP TABLE IF EXISTS CASCADE`) e recria toda a estrutura relacional e cargas de domínio (gêneros, categorias e tipos de ativos) em segundos. Perfeito para rodar no GitHub Codespaces.
* **Modo Produção (Oracle FIAP)**: Contém o mapeamento pronto e testado para a tabela física do banco **Oracle** da faculdade. Devido a restrições de Firewall corporativo que bloqueiam datacenters externos em nuvem (como o Codespaces), este perfil vem desativado por padrão.

---

## ✨ Funcionalidades Avançadas Implementadas

* **Nome Social Opcional & UX Inclusiva**: O cadastro permite o preenchimento opcional do Nome Social. Caso esteja presente, o sistema substitui dinamicamente o nome de registro nas mensagens do Dashboard e Perfil, preservando a identidade civil sob o escopo relacional interno.
* **Upload e Persistência de Avatares em CLOB**: Sistema duplo de foto de perfil. O usuário pode escolher um avatar programático gerado localmente via pacote npm do DiceBear (`croodles`) ou fazer upload de uma foto real (com trava de segurança JavaScript limitando a **2MB**). Ambas as abordagens convertem a imagem em strings de texto estruturado guardadas de forma persistente em colunas do tipo **CLOB** no banco de dados.
* **Catálogos Dinâmicos de Fluxo**: O formulário de transações e aportes consome endpoints específicos (`/api/categorias`, `/api/tipos-investimento`). O front-end filtra em tempo real as categorias dependendo da ação do usuário (Receita exibe apenas categorias 'C' como Salário e Dividendos; Despesa exibe apenas 'D' como Alimentação e Boletos), eliminando dados em *hardcode*.
* **Soft-Delete (LGPD)**: O encerramento de conta segue as diretrizes legais, inativando o registro no banco (`status = 'I'`) de forma lógica em vez de deletar fisicamente o histórico de auditoria.

---

## 🚀 Como Executar o Projeto

### Opção A: Rodando no GitHub Codespaces (Recomendado)

O projeto está totalmente preparado para a nuvem. O Front-end detecta automaticamente o proxy do Codespaces e redireciona os requests de forma transparente.

1. **Subir o Back-end (Java)**: Abra um terminal, navegue até a pasta do backend e inicie o Spring Boot:
   ```bash
   cd velofy-backend
   mvn spring-boot:run
Tornar a Porta Pública: Na aba Ports do Codespaces, localize a porta 8080, clique com o botão direito em Port Visibility e altere de Private para Public (essencial para o navegador permitir as requisições do front-end).

Subir o Front-end (React): Abra um segundo terminal e inicie o servidor de desenvolvimento do Vite:

Bash
cd velofy-frontend
npm install
npm run dev
Clique no link gerado na porta 5173 para abrir a aplicação no navegador.

Opção B: Rodando Localmente (Na sua Máquina)
Pré-requisitos: Java 21+, Node.js (LTS) e gerenciador npm instalados.

Executar o Back-end:

Bash
cd velofy-backend
./mvnw spring-boot:run
O servidor subirá localmente em http://localhost:8080.

Executar o Front-end:

Bash
cd velofy-frontend
npm install
npm run dev
A aplicação abrirá automaticamente em http://localhost:5173.

💡 Nota sobre o Banco Oracle: Se desejar testar a persistência direta no banco de dados Oracle da FIAP, acesse velofy-backend/src/main/resources/application.properties, comente o bloco do H2, ajuste o parâmetro spring.jpa.hibernate.ddl-auto=none se necessário, remova os comentários (#) do bloco do Oracle e insira suas credenciais de RM.

🛠️ Tecnologias Utilizadas
Java 21 & Spring Boot 3.2.5 (Core API & REST)

Spring Data JPA & Hibernate (ORM & Camada de Persistência)

Banco de Dados H2 (Em memória para testes) / Oracle DB (Produção)

Spring Security Crypto (BCrypt) (Algoritmo de Hashing de Senhas)

React JavaScript & Vite (Framework Front-end & Compilação)

Axios HTTP Client (Consumo Assíncrono de Endpoints)

@dicebear/core & @dicebear/collection (Geração de Avatares Dinâmicos)

Lucide-React (Iconografia de Interface)
