---
mode: 'agent'
model: GPT-5.5
description: 'Create the Node.js logic tier for the Octofit multi-tier application'
---
Fix the CORS error between the React/Vite frontend and the Node/Express API.

Context:
- Frontend runs on Vite port 5173.
- Backend API runs on port 8000.
- Frontend currently calls http://localhost:8000/api/users/ when VITE_CODESPACE_NAME is unset.
- Frontend currently calls http://localhost:8000/api/activities/ when VITE_CODESPACE_NAME is unset.
- Frontend currently calls http://localhost:8000/api/leaderboard/ when VITE_CODESPACE_NAME is unset.
- Frontend currently calls http://localhost:8000/api/workouts/ when VITE_CODESPACE_NAME is unset.
- In Codespaces, frontend origin should be https://${CODESPACE_NAME}-5173.app.github.dev and backend API should be https://${CODESPACE_NAME}-8000.app.github.dev.
- Browser shows a CORS error for Request URL: http://localhost:8000/api/users/.

Tasks:
1. Add CORS support to the Express backend.
2. Install any needed backend dependency, such as cors and @types/cors.
3. Configure allowed origins for:
   - http://localhost:5173
   - http://127.0.0.1:5173
   - https://${process.env.CODESPACE_NAME}-5173.app.github.dev when CODESPACE_NAME is set
4. Apply CORS middleware before the API routes in backend src/index.ts.
5. Keep the backend on port 8000.
6. Verify the API still works with:
   - curl http://localhost:8000/api/users/
   - curl http://localhost:8000/api/activities/
7. Verify CORS headers with an Origin header, for example:
   - curl -i -H "Origin: http://localhost:5173" http://localhost:8000/api/users/
   - curl -i -H "Origin: http://localhost:5173" http://localhost:8000/api/teams/
   - curl -i -H "Origin: http://localhost:5173" http://localhost:8000/api/activities/
   - curl -i -H "Origin: http://localhost:5173" http://localhost:8000/api/leaderboard/
   - curl -i -H "Origin: http://localhost:5173" http://localhost:8000/api/workouts/
8. Start the frontend and confirm the Users page can load API data without a browser CORS error.
9. Do not change unrelated files.