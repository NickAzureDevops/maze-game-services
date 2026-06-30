# AGENTS.md — pac-man-services

Event ingestion API and live dashboard for the Pac-Man Copilot Apps demo.

## Setup

```bash
npm install
node src/server.js   # starts on http://localhost:3001
```

## Project structure

```
src/
  server.js     # Express API — the only backend file
  index.html    # vanilla JS dashboard — the only frontend file
```

## API contract (do not break)

```
POST /event
  Content-Type: application/json
  Body: { "type": string, "timestamp": ISO-8601, "payload": object }
  Accepted types: scoreUpdated | achievementCandidate
  Returns: 201 { ok: true } | 400 { ok: false, error: string }

GET /events
  Returns: array of all stored events, newest first
```

## Test commands

```bash
# Verify server starts
node src/server.js

# Post a valid event
curl -s -X POST http://localhost:3001/event \
  -H "Content-Type: application/json" \
  -d '{"type":"scoreUpdated","timestamp":"2026-01-01T00:00:00.000Z","payload":{"score":10}}'
# Expected: {"ok":true}

# Fetch events
curl -s http://localhost:3001/events
```

## Code style

- Backend: Node.js + Express only — no other frameworks
- Frontend: vanilla HTML + JavaScript — no frameworks, no bundler
- Storage: in-memory array only — no DB, no file persistence
- Port: always 3001
- Keep code intentionally simple and readable

## Hard constraints

- Do NOT add authentication, sessions, or middleware beyond what exists
- Do NOT add a database or file-based persistence
- Do NOT change the port
- Do NOT introduce a frontend build step or framework
- Do NOT remove CORS headers — the game runs on a different port

## Event schema

```json
{
  "type": "scoreUpdated",
  "timestamp": "2026-01-01T00:00:00.000Z",
  "payload": { "score": 100, "delta": 10, "level": 1 }
}
```

```json
{
  "type": "achievementCandidate",
  "timestamp": "2026-01-01T00:00:00.000Z",
  "payload": { "score": 500, "achievement": "Reached 500 points!", "level": 2 }
}
```

## Integration context

Producer repo: https://github.com/NickAzureDevops/pac-man-game

The game POSTs events from the browser to `http://localhost:3001/event`.
This service consumes them and displays them live at `http://localhost:3001`.
