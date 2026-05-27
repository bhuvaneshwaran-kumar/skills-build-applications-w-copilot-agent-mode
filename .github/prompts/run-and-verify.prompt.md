---
mode: agent
model: GPT-5.5
description: 'Run and verify the OctoFit Tracker full stack application'
---

Run and verify the OctoFit Tracker full stack application.

Context:
- Backend API runs on port 8000.
- Frontend Vite app runs on port 5173.
- MongoDB should be running for API data.
- Do not change directories in terminal commands. Use `npm --prefix` with explicit paths.

Tasks:
1. Check whether MongoDB is running.
2. Start the backend API server from `octofit-tracker/backend`.
3. Start the frontend Vite server from `octofit-tracker/frontend`.
4. Verify the backend API endpoints with curl:
   - `http://localhost:8000/api/users/`
   - `http://localhost:8000/api/teams/`
   - `http://localhost:8000/api/activities/`
   - `http://localhost:8000/api/leaderboard/`
   - `http://localhost:8000/api/workouts/`
5. Verify CORS headers from the frontend origin:
   - `curl -i -H "Origin: http://localhost:5173" http://localhost:8000/api/users/`
6. Open the frontend at:
   - `http://localhost:5173/users`
7. Confirm the Users page loads API data without browser console errors.
8. Run builds if needed:
   - `npm --prefix octofit-tracker/backend run build`
   - `npm --prefix octofit-tracker/frontend run build`
9. Summarize:
   - Which endpoints passed.
   - Whether CORS headers are present.
   - Whether frontend data loaded correctly.
   - Any errors or warnings.
   - Whether any dev servers were left running.

Do not modify unrelated files.