<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
=======
# SaishTask App

SaishTask is a full-stack task management application built with Spring Boot and React.  
It helps users create task lists, add tasks, track progress, and manage daily work efficiently.

---

## Tech Stack

### Backend
- Java 21
- Spring Boot
- JPA Hibernate
- PostgreSQL / Docker
- Maven

### Frontend
- React (Vite + TypeScript)
- Axios
- Tailwind CSS
- NextUI Components

---

## Project Structure

saish-task-app/
   ├── backend/
   │     └── tasks  (Spring Boot backend)
   ├── frontend/
         └── tasks-fe  (React frontend)

---

## 📸 Screenshots

### Homepage UI
![Homepage](frontend/screenshots/homepageSaishTask.png)

### ➕ Create Task List Modal
![Create Task List](frontend/screenshots/create-tasklist.png)

---

## 🔧 Setup Instructions

### Backend
cd backend/tasks
mvn clean install
docker-compose up -d

### Frontend
cd frontend/tasks-fe
npm install
npm run dev

---

## 👨‍💻 Developed By
### Saish Sanas
>>>>>>> cd7229dcc2d4d5ac996c541e315bc68160b0af1b
