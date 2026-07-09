---
name: azure-observability
description: "Monitor and troubleshoot the Copilot quiz live event pipeline end-to-end, including Azure Monitor/Log Analytics checks, Node.js ingestion API updates, dashboard UI updates, event contract validation, and deployment verification. Use this skill whenever the user asks to add or change event types, debug POST /event or GET /events behavior, validate CORS or in-memory storage, verify game-to-service integration, or confirm dashboard health and event latency, even if they do not explicitly mention \"observability.\""
license: MIT
metadata:
  author: GitHub Copilot
  version: "1.0.0"
---

# Azure Observability for Copilot Quiz

> **AUTHORITATIVE GUIDANCE — MANDATORY COMPLIANCE**
>
> This skill is the primary guide for diagnosing and improving the Copilot quiz event pipeline. Keep changes minimal, preserve the demo contract, and verify end-to-end behavior before finishing.

## Triggers

Activate this skill when the user wants to:
- Add or change quiz event types
- Diagnose `POST /event` or `GET /events` behavior
- Investigate CORS, payload validation, or in-memory storage issues
- Verify integration-to-visualizer flow
- Confirm dashboard polling, ordering, or rendering
- Add Azure Monitor / Log Analytics visibility for event rate, latency, or API failures

## Rules

1. Start with the smallest possible fix.
2. Keep the backend in Node.js + Express only.
3. Keep the frontend vanilla HTML + JavaScript only.
4. Keep storage in memory only.
5. Keep the service on port `3001`.
6. Do not remove CORS behavior.
7. Preserve the event contract: `{ type, timestamp, payload }`.
8. Validate with direct API checks before claiming success.

## Quick Diagnosis Flow

1. **Identify symptoms** - What is failing, and where?
2. **Check contract** - Does the emitted event still match the service contract?
3. **Review the service** - Is `POST /event` accepting and storing the event?
4. **Review retrieval** - Does `GET /events` return newest-first data?
5. **Check dashboard rendering** - Does the UI show the latest events and payload JSON?
6. **Add observability** - If requested, use KQL to track rate, latency, and failures.

## Troubleshooting Guidance

### Service issues
- Validate request shape early and return explicit `400` errors.
- Keep accepted event types explicit and aligned with the integration source.
- Avoid adding persistence, auth, sessions, or abstractions that the demo does not need.

### Dashboard issues
- Ensure polling continues every 1-2 seconds.
- Render newest events at the top.
- Show type, timestamp, and full payload JSON for every event.

### Azure observability
- For Azure Monitor / Log Analytics asks, use the queries in [references/kql-queries.md](references/kql-queries.md).
- Focus on event rate by type, p95 ingestion latency, and `/event` failures.

## Output expectations

When responding, provide:
1. The exact files to change and why.
2. The commands or checks used to verify the fix.
3. A short end-to-end summary from game → service → dashboard.

## References

- [KQL Query Library](references/kql-queries.md)
