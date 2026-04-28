# TP 6 - PROG4

## Estructura

- `backend/` API Node.js + Express + PostgreSQL
- `frontend/` React + TypeScript + React Router

## Base de datos

Crear una base con:

- Nombre: `practico6`
- Usuario: `postgres`
- Password: `postgres` (o el que configures)

Si tus credenciales son distintas, copiar `backend/.env.example` a `backend/.env` y ajustar.

## Backend

```bash
cd backend
npm install
npm run dev
```

Backend local: `http://localhost:8080`

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend local: `http://localhost:5173`

## Rutas TP6 (frontend)

- `/` listado de participantes
- `/nuevo` alta de participante
- `/editar/:id` edicion de participante
