# pac-man-services

Minimal event ingestion API + live dashboard for the Pac-Man demo.

This service is designed to consume real-time events from:

- https://github.com/NickAzureDevops/pac-man-game

## Run

1. Install dependencies: `npm install`
2. Start service: `npm start`
3. Open: `http://localhost:3001`

## API

- `POST /event` — ingest one JSON object event
- `GET /events` — retrieve all ingested events (newest first, in-memory)

Supported event types:

- `scoreUpdated`
- `achievementCandidate`

## Example event

```json
{
  "type": "scoreUpdated",
  "timestamp": "2026-06-30T12:00:00Z",
  "payload": {
    "score": 1200
  }
}
```
