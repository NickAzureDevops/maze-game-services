---
name: orchestration
description: "Master demo plan for Copilot Apps + MCP + Canvas + Agents (Pac-Man). USE WHEN: starting the demo, showing the architecture, explaining agents and MCP, orchestrating the full flow."
argument-hint: "[step] e.g. 'show architecture' or 'run full demo'"
---

# Demo: GitHub Copilot Apps × Pac-Man

## Goal
Demonstrate GitHub Copilot Apps evolving a legacy application into a multi-repo, event-driven
system using agents, Canvas, MCP tools, and automation.

## Architecture
```
              Canvas (Runtime)
             Plan + Agents + UX
                    │
    ┌───────────────┼───────────────┐
    │               │               │
    ▼               ▼               ▼
pac-man-game   pac-man-services   MCP Layer
(legacy)       (AI-built)         (tool bridge)
    │               │
    ▼               ▼
event emission  event ingestion
    └───────────────┘
             ▼
     live event stream UI
```

## Repositories
| Repo | Role | URL |
|------|------|-----|
| pac-man-game | Legacy system (event producer) | https://github.com/NickAzureDevops/pac-man-game |
| pac-man-services | AI-built platform (event consumer) | https://github.com/NickAzureDevops/pac-man-services |

## 3 Agents

### 🎮 Game Agent
- **Skill:** `/game-agent` (pac-man-game repo)
- **Task:** Add `emitEvent()` — emit `scoreUpdated` and `achievementCandidate`
- **Constraint:** Zero gameplay changes

### 🌐 Platform Agent
- **Skill:** `/platform-agent`
- **Task:** Maintain Express API (`POST /event`, `GET /events`), in-memory store, dashboard
- **Constraint:** No DB, no frameworks, port 3001 only

### 🔗 Integration Agent
- **Skill:** `/integration-agent`
- **Task:** Connect game → platform, validate schema consistency
- **Constraint:** No breaking API changes

## Event Schema
```json
{
  "type": "scoreUpdated" | "achievementCandidate",
  "timestamp": "<ISO-8601>",
  "payload": { "score": 150, "achievement": "Reached 100" }
}
```

## MCP Tool Map
| Action | MCP Tool |
|--------|----------|
| Read repo files | `get_file_contents` |
| Edit game files | `push_files` / `create_or_update_file` |
| Validate API | HTTP tool → POST `http://localhost:3001/event` |
| Inspect state | `get_file_contents` + runtime tool |

## Live Demo Flow
1. Show Pac-Man game running in browser
2. Show Canvas plan → agent assignments
3. Invoke `/game-agent` → instruments `src/main.js`
4. Show commit in pac-man-game repo
5. Invoke `/platform-agent` → verifies API + dashboard
6. Invoke `/integration-agent` → validates event flow end-to-end
7. Play Pac-Man → events stream live in dashboard at `http://localhost:3001`

## What This Proves
- Copilot Chat reasoning over legacy code structure
- Multi-repo orchestration via MCP
- Role-separated, autonomous agent execution
- Trigger → plan → execute → live system
