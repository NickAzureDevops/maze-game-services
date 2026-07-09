# KQL Query Library

Use these queries when the Copilot quiz pipeline has Azure Monitor / Log Analytics telemetry wired in.

## Event rate by type

```kusto
traces
| where timestamp > ago(1h)
| where message has "POST /event"
| extend eventType = tostring(customDimensions.eventType)
| summarize eventCount = count() by eventType, bin(timestamp, 5m)
| order by timestamp desc
```

## p95 ingestion latency

```kusto
traces
| where timestamp > ago(1h)
| where message has "POST /event"
| extend latencyMs = todouble(customDimensions.latencyMs)
| summarize p95LatencyMs = percentile(latencyMs, 95) by bin(timestamp, 5m)
| order by timestamp desc
```

## /event failures

```kusto
requests
| where timestamp > ago(1h)
| where name == "POST /event"
| summarize failures = countif(success == false), total = count(), failureRate = 100.0 * countif(success == false) / count() by bin(timestamp, 5m)
| order by timestamp desc
```

## Helpful notes

- If your app emits custom telemetry names, update `customDimensions.eventType` and `customDimensions.latencyMs` to match.
- If the service is only using console logs, send the same fields into Application Insights first.
- Keep queries focused on the `copilot-quiz-service` endpoint and the game-to-service path.
