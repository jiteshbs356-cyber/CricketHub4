# 🏏 Cricket Universe — Live Scores & Stats Hub 2026

A complete, combined Cricket website featuring:
- **Live Scores** powered by CricAPI
- **IPL 2026** — all 10 teams, squads, points table, schedule
- **40+ Players** with real photos, detailed statistics
- **Statistics Dashboard** with 8 interactive Chart.js graphs
- **Player Comparison** tool
- **Add Player** functionality
- **Node.js Backend** for API proxying

---

## 🚀 Quick Start

### Option 1: Open directly in browser (no server needed)
1. Unzip the project
2. Open `index.html` in any modern browser
3. All features work! Live scores require internet

### Option 2: Run with Node.js backend
```bash
cd cricket-universe
npm install
npm start
# Open http://localhost:3000
```

---

## 📋 Features

### 🔴 Live Scores Section
- Real-time match scores via CricAPI
- Ball-by-ball animated scorecard
- Particle background animation
- Live ticker with latest updates
- ICC Rankings — Batting, Bowling, All-rounders

### 🏆 IPL 2026 Section
- All 10 team squads with player lists
- Points table with qualifier markers and form guide
- Full match schedule (March–May 2026)
- Top performer charts — runs, wickets, strike rates, economy

### 👤 Players Section
- **40 real players** with Wikipedia/ESPN player photos
- Filter by: role, country, IPL team
- Search by name/country/team
- Click any player for full stats + career trend chart
- Add custom players (saved to localStorage)

### 📊 Statistics Section
- Overview cards (top scorers, wicket takers, IPL kings)
- 8 interactive Chart.js graphs:
  - Top 10 ODI Run Scorers (Bar)
  - Player Role Distribution (Doughnut)
  - Top Wicket Takers (Bar)
  - Country Distribution (Bar)
  - Batting Average Leaders (Bar)
  - IPL Career Runs Top 10 (Bar)
  - Centuries by Country (Bar)
- Complete sortable stats table

### ⚖️ Compare Section
- Select any 2 players from database
- Side-by-side stat comparison (winner highlighted)
- Dual-line yearly performance chart

---

## 🔑 API Configuration
- **API**: CricAPI (https://www.cricapi.com)
- **Key**: `d955a8d3-0b6f-47ca-901e-e4dcd2a63b39`
- Falls back gracefully to curated static data if API unavailable

---

## 👥 Players Included (40+)

**India**: Virat Kohli, Rohit Sharma, Jasprit Bumrah, Ravindra Jadeja, MS Dhoni, KL Rahul, Shubman Gill, Hardik Pandya, Rishabh Pant, Mohammed Shami, Suryakumar Yadav, Sanju Samson, Yuzvendra Chahal, Ruturaj Gaikwad, Yashasvi Jaiswal, Shreyas Iyer, Mohammed Siraj

**Australia**: Steve Smith, Pat Cummins, David Warner, Mitchell Starc, Glenn Maxwell

**England**: Joe Root, Ben Stokes, Jos Buttler, Jofra Archer

**Pakistan**: Babar Azam, Shaheen Afridi

**South Africa**: Kagiso Rabada, Quinton de Kock

**New Zealand**: Trent Boult, Kane Williamson

**West Indies**: Kieron Pollard, Nicholas Pooran, Andre Russell, Sunil Narine

**Bangladesh**: Shakib Al Hasan

**Afghanistan**: Rashid Khan

**Sri Lanka**: Wanindu Hasaranga

---

## 🛠️ Tech Stack
- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js 4.4
- **Fonts**: Google Fonts (Oswald, Barlow, Barlow Condensed, Space Mono)
- **Backend**: Node.js + Express
- **API**: CricAPI
- **Storage**: localStorage (for custom players)

© 2026 Cricket Universe
