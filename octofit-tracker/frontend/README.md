# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

The frontend uses Vite environment variables through `import.meta.env`.

For GitHub Codespaces, define `VITE_CODESPACE_NAME` in `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is defined, API requests use:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is unset, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

## Scripts

```bash
npm --prefix octofit-tracker/frontend run dev
npm --prefix octofit-tracker/frontend run build
```
