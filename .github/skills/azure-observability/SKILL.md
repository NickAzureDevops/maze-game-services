---
name: azure-observability
description: Monitor and troubleshoot the Pac-Man live event pipeline end-to-end, including Azure Monitor/Log Analytics checks, Node.js ingestion API updates, dashboard UI updates, event contract validation, and deployment verification. Use this skill whenever the user asks to add or change event types, debug POST /event or GET /events behavior, validate CORS or in-memory storage, verify game-to-service integration, or confirm dashboard health and event latency, even if they do not explicitly mention "observability."
---

# Azure Observability for Pac-Man Event Pipeline

Use this skill to make surgical, reliable changes to the Pac-Man producer/consumer flow and verify that telemetry and live rendering still work.

## What this skill should produce

1. Exact code patches for targeted files (typically `src/server.js`, `src/index.html`, and producer event code in the game repo).
2. `curl` commands to validate:
   - `POST /event` accepts the intended contract.
   - `GET /events` returns newest-first and reflects new events.
3. A final verification summary that confirms end-to-end flow: game event emission -> service ingestion -> dashboard rendering.

## Core workflow

1. Identify scope and boundaries.
   - Confirm whether changes belong in consumer (`pac-man-services`), producer (`pac-man-game`), or both.
   - Preserve hard constraints: Node.js + Express backend, vanilla HTML/JS frontend, in-memory storage, port `3001`, CORS retained.

2. Validate contract before editing.
   - Event shape: `{ type, timestamp, payload }`.
   - Supported types and expected payload fields should remain explicit and consistent across producer and consumer.

3. Apply minimal, surgical edits.
   - Edit only files directly tied to the request.
   - Keep reverse-chronological event behavior and dashboard polling behavior intact unless explicitly asked to change.

4. Verify with direct API checks.
   - Provide concrete `curl` commands for valid and invalid payloads when relevant.
   - Confirm ingestion and retrieval behavior for each changed event type.

5. Confirm live dashboard behavior.
   - Ensure newest events appear first and payload JSON renders fully.
   - Surface any mismatch between emitted event schema and rendered fields.

6. Add Azure observability checks when requested.
   - For Azure Monitor / Log Analytics asks, provide practical KQL and monitoring steps tied to ingestion rate, latency, and dashboard/API health.
   - Keep recommendations actionable and mapped to this system's endpoints and event schema.

## Guardrails

- Do not introduce databases, auth/session layers, framework migrations, or unnecessary abstractions.
- Do not change service port from `3001`.
- Do not remove CORS behavior.
- Prefer explicit failures and clear validation errors over silent fallbacks.

## Output template

Use this structure for final responses:

1. **Code patches**: list file-level changes and why each change was needed.
2. **Validation commands**: ready-to-run `curl` commands for `POST /event` and `GET /events`.
3. **Verification summary**: concise confirmation of end-to-end event flow and any remaining risk or follow-up.

