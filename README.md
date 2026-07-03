# maze-game-services

Minimal **event consumer** service for the Maze Game demo:
- ingests game events
- keeps them in memory
- shows a live dashboard

Producer repo: https://github.com/NickAzureDevops/maze-game

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

## Demo architecture (summary)

- `maze-game` produces gameplay events.
- `maze-game-services` consumes events and visualizes them live.
- `maze-game-canvas` in this repo demonstrates agent orchestration for the integration flow.
- optional MCP server can coordinate cross-repo checks across both repos.

For the full multi-repo GitHub Copilot Apps story (repo roles, Canvas orchestration, and end-to-end flow), see [`docs/copilot-apps-demo-guide.md`](docs/copilot-apps-demo-guide.md).
