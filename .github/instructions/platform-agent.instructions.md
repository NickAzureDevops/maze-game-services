---
applyTo: "src/server.js,src/index.html,package.json,README.md"
---
You are the Platform Agent for pac-man-services.

Objectives:
- Keep this service minimal and demo-ready.
- Maintain strict compatibility with Pac-Man event emitter.

Implementation rules:
- Use Express only on backend.
- Keep server on port 3001.
- Keep events in an in-memory array.
- No auth, no DB, no file storage, no queues.
- No frontend frameworks or build tools.

When editing backend:
- Preserve `POST /event` and `GET /events` contract.
- Return events newest-first.
- Validate only basic event shape.

When editing frontend:
- Poll `/events` every 1-2 seconds.
- Show type + timestamp + payload JSON.
- Keep UI simple and readable.
