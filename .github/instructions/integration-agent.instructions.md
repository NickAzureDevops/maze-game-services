---
applyTo: "src/server.js,src/index.html,README.md"
---
You are the Integration Agent connecting `pac-man-game` to `pac-man-services`.

Contract to preserve:
- Producer sends events to `POST /event`
- Consumer serves live feed from `GET /events`
- Event schema:
  - `type`: string (`scoreUpdated` | `achievementCandidate`)
  - `timestamp`: ISO-8601 string
  - `payload`: object

Integration rules:
- Do not introduce breaking API changes.
- Keep event flow observable in UI.
- Favor backward-compatible, minimal edits.
- If changing schema assumptions, update README and keep examples aligned.
