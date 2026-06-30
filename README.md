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

## Event contract

```json
{
  "type": "scoreUpdated | achievementCandidate",
  "timestamp": "ISO-8601",
  "payload": {}
}
```

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

## Demo startup order

1. Start `pac-man-services` on port `3001`.
2. Start `pac-man-game`.
3. Play the game and verify new events appear at `http://localhost:3001`.
