const express = require('express');

const app = express();
const events = [];
const supportedEventTypes = new Set(['scoreUpdated', 'achievementCandidate']);

app.use(express.json());
app.use(express.static(__dirname));

app.post('/event', (req, res) => {
  const event = req.body;

  if (
    !event ||
    typeof event !== 'object' ||
    typeof event.type !== 'string' ||
    typeof event.timestamp !== 'string' ||
    typeof event.payload !== 'object' ||
    event.payload === null
  ) {
    return res.status(400).json({
      ok: false,
      error: 'Invalid event shape. Expected: { type, timestamp, payload }'
    });
  }

  if (!supportedEventTypes.has(event.type)) {
    return res.status(400).json({
      ok: false,
      error: 'Unsupported event type. Supported: scoreUpdated, achievementCandidate'
    });
  }

  events.push(event);
  return res.status(201).json({ ok: true });
});

app.get('/events', (_req, res) => {
  res.json([...events].reverse());
});

const port = 3001;

app.listen(port, () => {
  console.log(`pacman-services listening on http://localhost:${port}`);
});
