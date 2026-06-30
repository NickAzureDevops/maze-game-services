# Copilot instructions for pac-man-services

This repository is the **event ingestion + visualization platform** for the Pac-Man demo.

## Primary goal
Build and maintain a minimal, demo-stable service that consumes game events and displays them live.

## Hard constraints
- Backend: Node.js + Express only
- Frontend: vanilla HTML + JavaScript only (no frameworks)
- Storage: in-memory array only (no DB, no file persistence)
- Port: 3001
- Keep implementation intentionally simple and readable
- Avoid unnecessary abstractions or overengineering

## Required API contract
### POST `/event`
Accept event shape:
```json
{
  "type": "scoreUpdated",
  "timestamp": "ISO-8601",
  "payload": {}
}
```
Supported `type` values:
- `scoreUpdated`
- `achievementCandidate`

Behavior:
- validate basic shape (`type`, `timestamp`, `payload`)
- store event in memory

### GET `/events`
- return all events in reverse chronological order (newest first)

## UI behavior
- Poll `/events` every 1-2 seconds
- Show newest events at top
- Render event `type`, `timestamp`, and full `payload` JSON

## Integration context
Producer repo: https://github.com/NickAzureDevops/pac-man-game

Treat this repo as event consumer/visualizer only. Do not add gameplay logic here.
