# pac-man-services

Minimal **event consumer** service for the Pac-Man demo:
- ingests game events
- keeps them in memory
- shows a live dashboard

Producer repo: https://github.com/NickAzureDevops/pac-man-game

## Run

1. `npm install`
2. `npm start`
3. Open `http://localhost:3001`

## API contract

- `POST /event` accepts:
  ```json
  {
    "type": "scoreUpdated | achievementCandidate",
    "timestamp": "ISO-8601",
    "payload": {}
  }
  ```
- `GET /events` returns all events, newest first

## Scope

This repo is only the backend service + dashboard consumer side.

For the full multi-repo GitHub Copilot Apps story (repo roles, Canvas orchestration, and end-to-end flow), see [`docs/copilot-apps-demo-guide.md`](docs/copilot-apps-demo-guide.md).
