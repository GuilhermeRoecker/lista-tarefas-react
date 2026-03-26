# 📝 Lista de Tarefas (Fullstack)

Aplicação de lista de tarefas desenvolvida com frontend em React e backend em Node.js, com persistência em banco de dados PostgreSQL.

A aplicação foi estruturada para simular um cenário real de consumo de API e deploy.

---

## 🚀 Funcionalidades

* ✅ Listar tarefas (via API)
* ➕ Adicionar nova tarefa
* ✏️ Editar tarefa
* ✔️ Marcar como concluída
* ❌ Remover tarefa
* 🔄 Atualização em tempo real após operações

---

## 🧠 Tecnologias utilizadas

### Frontend

* React (com Vite)
* JavaScript (ES6+)
* CSS

### Backend

* Node.js
* Express
* PostgreSQL

### Infraestrutura

* Nginx (proxy reverso)
* Deploy local com exposição externa via IP

---

## 📂 Estrutura do projeto

```
lista-tarefas/
├── src/                # Frontend (React)
├── dist/               # Build do frontend
├── server.js           # Backend (API)
├── package.json
```

---

## ⚙️ Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

---

### 2. Rodar backend

```bash
node server.js
```

A API estará disponível em:

```txt
http://localhost:3001/tasks
```

---

### 3. Rodar frontend (modo desenvolvimento)

```bash
npm run dev
```

---

### 4. Build para produção

```bash
npm run build
```

---

### 5. Servir com Nginx

O Nginx deve estar configurado para:

* Servir o frontend a partir da pasta `dist`
* Redirecionar `/api` para o backend (porta 3001)

---

## 🌐 Acesso à aplicação

```txt
http://todolist.roecker.com.br:8080
```

> A aplicação está exposta na porta 8080 devido a restrições do provedor em portas padrão (80/443).

---

## 📌 Conceitos aplicados

* Arquitetura cliente-servidor
* Criação de API REST
* Integração frontend-backend
* Manipulação de estado no React
* Hooks customizados
* Proxy reverso com Nginx
* Deploy em ambiente real

---

## 🎯 Objetivo do projeto

Demonstrar a construção de uma aplicação fullstack simples, incluindo:

* Desenvolvimento de API
* Consumo de dados no frontend
* Organização de código
* Deploy e disponibilização externa

---

## 📈 Possíveis melhorias futuras

* Autenticação de usuários
* Validações mais robustas
* Paginação de tarefas
* Testes automatizados
* Containerização com Docker

---

## 👨‍💻 Autor

Desenvolvido por Guilherme
