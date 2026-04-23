// ============================================================
// CRICKET UNIVERSE — BACKEND SERVER (Node.js + Express)
// Run: npm install && node server.js
// Proxies CricAPI to avoid CORS issues in browser
// ============================================================

const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ API key loaded from environment variable (set in Render dashboard)
const API_KEY = process.env.CRICAPI_KEY || 'd955a8d3-0b6f-47ca-901e-e4dcd2a63b39';
const API_BASE = 'https://api.cricapi.com/v1';

// ---- Middleware ----
app.use(cors({ origin: '*' }));
app.use(express.json());

// Serve static frontend files with NO cache for images
app.use(express.static(path.join(__dirname, '..'), {
  setHeaders: (res, filePath) => {
    if (/\.(jpg|jpeg|png|gif|webp)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

// ---- Helper: fetch from CricAPI ----
function fetchCricAPI(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    const queryParams = new URLSearchParams({ apikey: API_KEY, ...params });
    const url = `${API_BASE}/${endpoint}?${queryParams}`;
    console.log('→ CricAPI:', url);
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(new Error('JSON parse failed: ' + e.message)); }
      });
    }).on('error', reject);
  });
}

// ---- ROUTES ----

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// PROXY: ICC Rankings
app.get('/api/rankings', async (req, res) => {
  try {
    const { type = 'batting', format = 'odi' } = req.query;
    const data = await fetchCricAPI('rankings', { type, format });
    console.log(`rankings [${format.toUpperCase()} ${type}]:`, data.status, '| count:', data.data?.length ?? 0);
    res.json(data);
  } catch (e) {
    console.error('Rankings error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

// PROXY: Live scores (cricScore)
app.get('/api/live', async (req, res) => {
  try {
    const data = await fetchCricAPI('cricScore');
    console.log('cricScore status:', data.status, '| count:', data.data?.length ?? 0);
    res.json(data);
  } catch (e) {
    console.error('Live scores error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

// PROXY: Match list (upcoming + recent)
app.get('/api/matches', async (req, res) => {
  try {
    const data = await fetchCricAPI('matches', { offset: req.query.offset || 0 });
    console.log('matches status:', data.status, '| count:', data.data?.length ?? 0);
    res.json(data);
  } catch (e) {
    console.error('Matches error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

// PROXY: Series list
app.get('/api/series', async (req, res) => {
  try {
    const data = await fetchCricAPI('series', { offset: 0 });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PROXY: Match scorecard
app.get('/api/match/:id', async (req, res) => {
  try {
    const data = await fetchCricAPI('match_scorecard', { id: req.params.id });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PROXY: Player search
app.get('/api/player/search', async (req, res) => {
  try {
    if (!req.query.name) return res.status(400).json({ error: 'name param required' });
    const data = await fetchCricAPI('players', { search: req.query.name, offset: 0 });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PROXY: Player info
app.get('/api/player/:id', async (req, res) => {
  try {
    const data = await fetchCricAPI('players_info', { id: req.params.id });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Catch-all — serve index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Cricket Universe Server running on port ${PORT}`);
});

module.exports = app;
