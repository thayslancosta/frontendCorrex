# CorreX — Frontend

**A React interface for an AI-assisted essay review platform.**

CorreX is an academic team project designed to help teachers manage classes, students, writing submissions, assessment criteria, and essay revision workflows.

This repository contains the **API-oriented frontend**. It is separate from the [public mock-data prototype](https://github.com/thayslancosta/correx-frontend), which demonstrates the interface using `localStorage`.

## What the interface covers

- Teacher dashboard and correction history
- Class and student management screens
- Essay submission and review flows
- Assessment criteria management
- Responsive layout with light/dark themes
- Axios services prepared to communicate with the CorreX backend

**Current scope:** this is a portfolio-stage application, not a hosted production service. End-to-end operation depends on the separate backend and its configuration. Automated browser tests and final API integration verification remain pending.

## Stack

- React 19, Vite, React Router
- JavaScript and CSS
- Axios, Context API and React hooks

## Running locally

```bash
npm ci
cp .env.example .env
npm run dev
```

The development API URL defaults to `http://localhost:8080/api/v1`. Edit `VITE_API_BASE_URL` in your local `.env` if required. Do not commit secrets or local environment files.

To check the application:

```bash
npm run build
npm run lint
```

The build has passed in the latest reported local check; lint currently has pre-existing issues that are tracked for later cleanup.

## Documentation

The backend is available in [CorreX API](https://github.com/thayslancosta/correx-api). The application stores a local session token in `localStorage`; actual authentication and authorization remain the backend's responsibility.

For a backend-free interface demonstration, see the separate [CorreX prototype](https://github.com/thayslancosta/correx-frontend).

## Collaboration and attribution

CorreX was developed as a **collaborative academic project**. The repository history and project documents should be consulted for individual contributions. This frontend is not represented as an entirely solo implementation.

---

*Academic software development project — UNIFACISA.*
