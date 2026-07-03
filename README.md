# maze-game-services (Copilot Apps Quiz Services)

Minimal **event consumer** service for the Copilot Apps quiz demo:
- ingests quiz interaction events
- keeps them in memory
- shows a live dashboard

Producer repo (legacy name): https://github.com/NickAzureDevops/maze-game

## Run

1. `npm install`
2. `npm start`
3. Open `http://localhost:3001`

## API contract

- `POST /event` accepts:
  ```json
  {
    "type": "quizScoreUpdated | streakMilestoneCandidate",
    "timestamp": "ISO-8601",
    "payload": {}
  }
  ```
- legacy producer types are still accepted and normalized:
  - `scoreUpdated` → `quizScoreUpdated`
  - `achievementCandidate` → `streakMilestoneCandidate`
- `GET /events` returns all events, newest first

## Scope

This repo is only the backend service + dashboard consumer side.

## Demo architecture (summary)

- `maze-game` (legacy-named frontend) produces quiz events.
- `maze-game-services` consumes events and visualizes them live.
- `maze-game-canvas` in this repo demonstrates quiz agent orchestration for the integration flow.
- optional MCP server can coordinate cross-repo checks across both repos.

For the full multi-repo GitHub Copilot Apps story (repo roles, Canvas orchestration, and end-to-end flow), see [`docs/copilot-apps-demo-guide.md`](docs/copilot-apps-demo-guide.md).
