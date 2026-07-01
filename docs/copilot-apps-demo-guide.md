# Pac-Man GitHub Copilot Apps Demo Guide

This guide explains the **end-to-end demo story** across repositories, the Canvas orchestration surface, and an optional MCP server layer.

## Repositories and roles

| Repo | Role in demo | What it demonstrates |
| --- | --- | --- |
| [`NickAzureDevops/pac-man-game`](https://github.com/NickAzureDevops/pac-man-game) | Event producer | Game emits gameplay events from browser code (`scoreUpdated`, `achievementCandidate`). |
| [`NickAzureDevops/maze-game-services`](https://github.com/NickAzureDevops/maze-game-services) | Event consumer + dashboard | Backend event ingestion (`POST /event`) and live visualization (`GET /events` + polling UI). |

## Canvas role in the main repo

`maze-game-services` also includes a custom Copilot Canvas extension at `.github/extensions/pac-man-canvas`.

It demonstrates **agent orchestration** by showing:
- a 3-agent execution plan (Game Agent, Platform Agent, Integration Agent)
- per-agent run status
- integration validation results
- a link to the live event stream in `maze-game-services`

## Optional MCP server for multi-repo coordination

If you want a stronger "control plane" story, add an MCP server that can work across both repos.

Suggested role:
- expose repo-aware tools for `pac-man-game` + `maze-game-services`
- run cross-repo checks (event schema compatibility, endpoint reachability, CORS expectations)
- provide a single interface for agent/tooling workflows that need both repositories

This keeps product code simple in each repo while enabling richer orchestration workflows.

## End-to-end flow

1. Start `maze-game-services` on `http://localhost:3001`.
2. Start `pac-man-game`.
3. While playing the game, events are posted to `POST /event`.
4. `maze-game-services` stores events in memory and serves them via `GET /events`.
5. Dashboard and Canvas reflect integration health and event flow.
6. (Optional) MCP server runs cross-repo validations and coordination tasks.

## Why docs are split this way

- Each repo README stays short and role-specific.
- This shared guide holds the full narrative for cross-repo understanding and demo walkthrough.
