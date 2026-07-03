const express = require('express');

const app = express();
const events = [];
const canonicalEventTypes = new Set(['quizScoreUpdated', 'streakMilestoneCandidate']);
const legacyToQuizEventType = {
  scoreUpdated: 'quizScoreUpdated',
  achievementCandidate: 'streakMilestoneCandidate'
};
const supportedEventTypes = new Set([
  ...canonicalEventTypes,
  ...Object.keys(legacyToQuizEventType)
]);

app.use(express.json());

// CORS — allow the Vite dev server (port 5173) and any local origin to POST events
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

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
      error:
        'Unsupported event type. Supported: quizScoreUpdated, streakMilestoneCandidate, scoreUpdated, achievementCandidate'
    });
  }

  const normalizedType = legacyToQuizEventType[event.type] || event.type;
  events.push({
    ...event,
    type: normalizedType
  });
  return res.status(201).json({ ok: true });
});

app.get('/events', (_req, res) => {
  res.json([...events].reverse());
});

const port = 3001;

app.listen(port, () => {
  console.log(`quiz services listening on http://localhost:${port}`);
});
