# CorreX Frontend

CorreX is a React interface for managing classes, students, writing submissions,
assessment criteria, corrections and review workflows. The main repository is the
API-connected candidate; the sibling `correx-frontend-demo` repository is a
separate presentation version backed by mocks and `localStorage`.

## Main frontend

- React 19 with Vite
- React Router
- Axios for the CorreX API
- Context API, hooks and responsive CSS
- ESLint

The main application targets `http://localhost:8080/api/v1` by default. To use a
different local API, copy `.env.example` to `.env` and set `VITE_API_BASE_URL`.
The frontend stores only the local authentication token and user session in
`localStorage`; it does not replace backend authentication.

## Implemented areas

- Mock login/session flow around the backend authentication contract.
- Dashboard and recent correction views.
- Classes, students and student essays.
- Essay upload, correction and manual review screens.
- Configurable assessment criteria.
- Light/dark theme and responsive layouts.

The actual API behavior depends on the separate `correx-api` project. A working
end-to-end flow requires both services, compatible CORS settings and local
configuration. The demo sibling intentionally presents the workflow without a
backend and must not be described as a live integration.

## Local verification

```bash
npm ci
npm run lint
npm run build
npm run dev
```

The repository currently has no automated browser test suite. Manual checks should
cover login, navigation, upload, correction, review, theme persistence and the API
error path before presenting the application to recruiters.

## Version choice and provenance

The main repository is the preferred portfolio candidate because it contains the
Axios services and backend contract. It currently has uncommitted local changes;
those changes must be reviewed and committed on an isolated branch before any
publication. The nested `correx-frontend-demo` repository and its ZIP archive are
not to be added to the parent repository automatically.

The project README and history should retain the collaborators and avoid claiming
that the complete CorreX system is an individual creation.