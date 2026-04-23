// ============================================================
// IPL CRICKET PORTAL — APP.JS
// Players · Statistics · Compare (unchanged sections)
// ============================================================

const API_KEY = 'd955a8d3-0b6f-47ca-901e-e4dcd2a63b39';
const API_BASE = 'https://api.cricapi.com/v1';
const IS_LOCAL_SERVER = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const PROXY_BASE = IS_LOCAL_SERVER ? `${window.location.origin}/api` : null;
const chartRegistry = {};

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderPlayersGrid(getAllPlayers());
  renderStatsSection();
  renderCompareDropdowns();
  renderStatOverview();
  checkUserSession();
});

// Show logged-in user in navbar pill
function checkUserSession() {
  let user = null;
  try { user = JSON.parse(sessionStorage.getItem('ipl_current_user') || localStorage.getItem('ipl_current_user_remember') || 'null'); } catch(e){}
  const pill = document.getElementById('user-nav-pill');
  if (user && pill) {
    pill.style.display = 'flex';
    const initials = ((user.fname||'?')[0] + (user.lname||'?')[0]).toUpperCase();
    document.getElementById('unp-name').textContent   = user.fname;
    document.getElementById('unp-avatar').textContent = initials;
  }
}

// Logout
function doLogout() {
  sessionStorage.removeItem('ipl_current_user');
  localStorage.removeItem('ipl_current_user_remember');
  window.location.replace('auth.html');
}

// ============================================================
// NAVIGATION
// ============================================================
function switchSection(name, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
  document.getElementById('sec-' + name)?.classList.add('active');
  if (btn) btn.classList.add('active');
  else {
    const tab = document.querySelector(`[data-section="${name}"]`);
    if (tab) tab.classList.add('active');
  }
  if (name === 'stats')     setTimeout(renderAllCharts, 100);
  if (name === 'tickets')   renderTicketMatches(IPL_MATCHES);
  if (name === 'jerseys')   { buildJerseyTeamTabs(); filterJerseys(); }
  if (name === 'merch')     renderMerchGrid();
  if (name === 'users')     loadUsersSection();
  if (name === 'myaccount') renderMyAccount();
}

// ============================================================
// MY ACCOUNT SECTION
// ============================================================
function renderMyAccount() {
  const el = document.getElementById('myaccount-inner');
  if (!el) return;
  let user = null;
  try { user = JSON.parse(sessionStorage.getItem('ipl_current_user') || localStorage.getItem('ipl_current_user_remember') || 'null'); } catch(e){}
  if (!user) { el.innerHTML = '<p style="color:var(--text-muted);padding:2rem">Not logged in.</p>'; return; }

  const initials = ((user.fname||'?')[0] + (user.lname||'?')[0]).toUpperCase();
  const teamShort = (user.team||'').match(/\(([^)]+)\)/);
  const totalSpent = (user.totalSpent||0) + (user.tickets||[]).reduce((s,t)=>s+(t.amount||0),0);
  const orders  = [...(user.orders||[])].reverse();
  const tickets = [...(user.tickets||[])].reverse();

  const statusColor = s => s==='Confirmed'||s==='Delivered'?'var(--accent-green)':s==='Processing'?'var(--accent-gold)':'var(--text-muted)';
  const statusBg    = s => s==='Confirmed'||s==='Delivered'?'rgba(0,217,126,0.08)':s==='Processing'?'rgba(240,165,0,0.08)':'rgba(100,150,220,0.06)';

  const renderOrderRow = (o) => `
    <div style="background:#060f1f;border:1px solid var(--border);border-radius:10px;padding:1.1rem 1.25rem;margin-bottom:10px;display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap">
      <span style="font-size:2rem;flex-shrink:0">${o.emoji||'📦'}</span>
      <div style="flex:1;min-width:200px">
        <div style="font-weight:700;font-size:0.9rem;margin-bottom:3px">${o.name}</div>
        <div style="font-size:0.72rem;color:var(--text-muted);display:flex;gap:12px;flex-wrap:wrap;margin-bottom:4px">
          ${o.category?`<span>📂 ${o.category}</span>`:''}
          ${o.orderId?`<span>🆔 ${o.orderId}</span>`:''}
          ${o.qty?`<span>📦 Qty: ${o.qty}</span>`:''}
          ${o.size&&o.size!=='—'?`<span>📏 Size: ${o.size}</span>`:''}
          ${o.team&&o.team!=='—'?`<span>🏏 ${o.team}</span>`:''}
        </div>
        ${o.stand?`<div style="font-size:0.72rem;color:var(--text-muted)">🎟️ Stand: ${o.stand} · ${o.matchNo||''} · ${o.date||''} · ${o.time||''}</div>`:''}
        ${o.venue?`<div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px">📍 ${o.venue}</div>`:''}
        <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px">📅 ${o.date||o.bookedOn||'—'}</div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-family:Space Mono,monospace;font-size:1rem;font-weight:700;color:var(--accent-gold)">₹${(o.amount||0).toLocaleString()}</div>
        <span style="display:inline-block;margin-top:5px;font-size:0.65rem;font-weight:700;padding:3px 10px;border-radius:20px;background:${statusBg(o.status)};color:${statusColor(o.status)};font-family:Space Mono,monospace">${o.status||'Processing'}</span>
      </div>
    </div>`;

  el.innerHTML = `
    <!-- PROFILE HEADER -->
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:2rem;margin-bottom:2rem;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--accent-gold),var(--accent-green))"></div>
      <div style="display:flex;align-items:flex-start;gap:1.5rem;flex-wrap:wrap">
        <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--accent-gold),#e85d04);display:flex;align-items:center;justify-content:center;font-family:Oswald,sans-serif;font-weight:700;font-size:1.6rem;color:#000;flex-shrink:0">${initials}</div>
        <div style="flex:1">
          <div style="font-family:Oswald,sans-serif;font-size:1.6rem;font-weight:700;letter-spacing:1px">${user.fname} ${user.lname}</div>
          <div style="color:var(--text-muted);font-size:0.82rem;margin-top:2px">📧 ${user.email}</div>
          ${user.phone?`<div style="color:var(--text-muted);font-size:0.82rem;margin-top:2px">📞 ${user.phone}</div>`:''}
          <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
            ${teamShort?`<span style="background:rgba(240,165,0,0.1);color:var(--accent-gold);border:1px solid rgba(240,165,0,0.25);font-size:0.7rem;padding:3px 10px;border-radius:20px;font-family:Space Mono,monospace">🏏 ${teamShort[1]} FAN</span>`:''}
            <span style="background:rgba(0,217,126,0.08);color:var(--accent-green);border:1px solid rgba(0,217,126,0.2);font-size:0.7rem;padding:3px 10px;border-radius:20px;font-family:Space Mono,monospace">⭐ MEMBER</span>
          </div>
        </div>
        <button onclick="doLogout()" style="background:rgba(255,31,61,0.1);border:1px solid rgba(255,31,61,0.25);color:#ff6b80;padding:8px 16px;border-radius:7px;font-family:Barlow Condensed,sans-serif;font-size:0.85rem;font-weight:700;letter-spacing:1px;cursor:pointer;transition:all 0.2s" onmouseover="this.style.background='rgba(255,31,61,0.2)'" onmouseout="this.style.background='rgba(255,31,61,0.1)'">🚪 SIGN OUT</button>
      </div>

      <!-- STAT BOXES -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;margin-top:1.5rem">
        ${[
          {num:orders.length,  label:'Orders',  icon:'📦', c:'var(--accent-gold)'},
          {num:tickets.length, label:'Tickets',  icon:'🎟️', c:'var(--accent-green)'},
          {num:'₹'+(totalSpent||0).toLocaleString(), label:'Total Spent', icon:'💰', c:'var(--accent-blue)'},
          {num:teamShort?teamShort[1]:'—', label:'Fav Team', icon:'🏏', c:'var(--accent-purple)'},
        ].map(s=>`<div style="background:#060f1f;border:1px solid var(--border);border-radius:8px;padding:0.9rem;text-align:center">
          <div style="font-size:1.2rem;margin-bottom:4px">${s.icon}</div>
          <div style="font-family:Oswald,sans-serif;font-size:1.2rem;font-weight:700;color:${s.c}">${s.num}</div>
          <div style="font-size:0.62rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-top:2px">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>

    <!-- QUICK ACTIONS -->
    <div style="display:flex;gap:10px;margin-bottom:2rem;flex-wrap:wrap">
      <button onclick="switchSection('tickets',document.querySelector('[data-section=tickets]'))" style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-secondary);padding:10px 18px;border-radius:7px;font-family:Barlow Condensed,sans-serif;font-size:0.85rem;font-weight:700;letter-spacing:1px;cursor:pointer;transition:all 0.2s" onmouseover="this.style.borderColor='var(--accent-gold)';this.style.color='var(--accent-gold)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-secondary)'">🎟️ Book Tickets</button>
      <button onclick="switchSection('jerseys',document.querySelector('[data-section=jerseys]'))" style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-secondary);padding:10px 18px;border-radius:7px;font-family:Barlow Condensed,sans-serif;font-size:0.85rem;font-weight:700;letter-spacing:1px;cursor:pointer;transition:all 0.2s" onmouseover="this.style.borderColor='var(--accent-gold)';this.style.color='var(--accent-gold)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-secondary)'">👕 Shop Jerseys</button>
      <button onclick="switchSection('merch',document.querySelector('[data-section=merch]'))"   style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-secondary);padding:10px 18px;border-radius:7px;font-family:Barlow Condensed,sans-serif;font-size:0.85rem;font-weight:700;letter-spacing:1px;cursor:pointer;transition:all 0.2s" onmouseover="this.style.borderColor='var(--accent-gold)';this.style.color='var(--accent-gold)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-secondary)'">🛍️ Merchandise</button>
    </div>

    <!-- TICKETS BOOKED -->
    <div class="section-title-row" style="margin-bottom:1rem">
      <h2 class="section-title" style="font-size:1.2rem">🎟️ MY TICKETS (${tickets.length})</h2>
    </div>
    ${tickets.length ? tickets.map(renderOrderRow).join('') : `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:2.5rem;text-align:center;margin-bottom:2rem;color:var(--text-muted)">
        <div style="font-size:2.5rem;margin-bottom:0.75rem">🎟️</div>
        <div>No tickets booked yet</div>
        <button onclick="switchSection('tickets',document.querySelector('[data-section=tickets]'))" style="margin-top:1rem;background:var(--accent-gold);color:#000;border:none;padding:8px 20px;border-radius:6px;font-family:Barlow Condensed,sans-serif;font-weight:700;font-size:0.85rem;cursor:pointer;letter-spacing:1px">BOOK NOW →</button>
      </div>`}

    <!-- ORDERS -->
    <div class="section-title-row" style="margin-bottom:1rem;margin-top:1.5rem">
      <h2 class="section-title" style="font-size:1.2rem">📦 MY ORDERS (${orders.length})</h2>
    </div>
    ${orders.length ? orders.map(renderOrderRow).join('') : `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:2.5rem;text-align:center;color:var(--text-muted)">
        <div style="font-size:2.5rem;margin-bottom:0.75rem">🛍️</div>
        <div>No orders placed yet</div>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:1rem;flex-wrap:wrap">
          <button onclick="switchSection('jerseys',document.querySelector('[data-section=jerseys]'))" style="background:var(--accent-gold);color:#000;border:none;padding:8px 20px;border-radius:6px;font-family:Barlow Condensed,sans-serif;font-weight:700;font-size:0.85rem;cursor:pointer;letter-spacing:1px">BUY JERSEYS →</button>
          <button onclick="switchSection('merch',document.querySelector('[data-section=merch]'))"   style="background:transparent;color:var(--accent-gold);border:1px solid rgba(240,165,0,0.4);padding:8px 20px;border-radius:6px;font-family:Barlow Condensed,sans-serif;font-weight:700;font-size:0.85rem;cursor:pointer;letter-spacing:1px">SHOP MERCH →</button>
        </div>
      </div>`}
  `;
}

function loadUsersSection() {
  try { allUsersData = JSON.parse(localStorage.getItem('ipl_users_db') || '[]'); } catch(e) { allUsersData = []; }
  renderUsersStats();
  renderUsersTable(allUsersData);
}

function renderUsersStats() {
  const el = document.getElementById('users-stats-row');
  if (!el) return;

  // Get login log
  let loginLog = [];
  try { loginLog = JSON.parse(localStorage.getItem('ipl_login_log') || '[]'); } catch(e){}

  const teamCounts = {};
  allUsersData.forEach(u => {
    const m = (u.team||'').match(/\(([^)]+)\)/);
    if (m) teamCounts[m[1]] = (teamCounts[m[1]]||0) + 1;
  });
  const topTeam = Object.entries(teamCounts).sort((a,b)=>b[1]-a[1])[0];
  const totalRevenue = allUsersData.reduce((s,u) => {
    return s + (u.totalSpent||0) + (u.tickets||[]).reduce((t,tk)=>t+(tk.amount||0),0);
  }, 0);
  const today = new Date().toDateString();
  const todayLogins = loginLog.filter(l => new Date(l.time).toDateString() === today).length;

  const cards = [
    { num: allUsersData.length,                                                       label:'Total Accounts', color:'var(--accent-gold)',   icon:'👥' },
    { num: loginLog.filter(l=>l.type==='login').length,                               label:'Total Logins',   color:'var(--accent-blue)',   icon:'🔐' },
    { num: loginLog.filter(l=>l.type==='register').length,                            label:'Registrations',  color:'var(--accent-green)',  icon:'✅' },
    { num: todayLogins,                                                               label:"Today's Logins", color:'var(--accent-purple)', icon:'📅' },
    { num: allUsersData.reduce((s,u)=>(u.orders||[]).length+s,0),                    label:'Total Orders',   color:'var(--accent-green)',  icon:'📦' },
    { num: allUsersData.reduce((s,u)=>(u.tickets||[]).length+s,0),                   label:'Total Tickets',  color:'var(--accent-blue)',   icon:'🎟️' },
    { num: '₹'+totalRevenue.toLocaleString(),                                         label:'Total Revenue',  color:'var(--accent-gold)',   icon:'💰' },
    { num: topTeam?topTeam[0]:'—',                                                    label:'Top Fan Team',   color:'var(--accent-purple)', icon:'🏏' },
  ];
  el.innerHTML = cards.map(c => `
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:1rem;text-align:center">
      <div style="font-size:1.4rem;margin-bottom:4px">${c.icon}</div>
      <div style="font-family:Oswald,sans-serif;font-size:1.5rem;font-weight:700;color:${c.color}">${c.num}</div>
      <div style="font-size:0.62rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-top:3px">${c.label}</div>
    </div>`).join('');
}

function showDbTab(tab, btn) {
  document.querySelectorAll('#db-tabs .mct-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById('db-tab-accounts').style.display = tab === 'accounts' ? 'block' : 'none';
  document.getElementById('db-tab-logins').style.display   = tab === 'logins'   ? 'block' : 'none';
  if (tab === 'logins') renderLoginLog();
}

function renderLoginLog() {
  const tbody = document.getElementById('login-log-tbody');
  if (!tbody) return;
  let log = [];
  try { log = JSON.parse(localStorage.getItem('ipl_login_log') || '[]'); } catch(e){}
  if (!log.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted)">No login activity recorded yet.</td></tr>';
    return;
  }
  const reversed = [...log].reverse().slice(0, 200);
  tbody.innerHTML = reversed.map((l, i) => {
    const dt = new Date(l.time);
    const dateStr = dt.toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'numeric'});
    const timeStr = dt.toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'});
    const isReg = l.type === 'register';
    return `<tr>
      <td style="font-family:Space Mono,monospace;color:var(--text-muted);font-size:0.78rem">${i+1}</td>
      <td style="font-weight:600;font-size:0.88rem">${l.name||'—'}</td>
      <td style="font-family:Space Mono,monospace;font-size:0.72rem;color:var(--text-muted)">${l.email||'—'}</td>
      <td>
        <span style="background:${isReg?'rgba(0,217,126,0.08)':'rgba(14,165,233,0.08)'};color:${isReg?'var(--accent-green)':'var(--accent-blue)'};border:1px solid ${isReg?'rgba(0,217,126,0.2)':'rgba(14,165,233,0.2)'};font-size:0.65rem;padding:3px 9px;border-radius:3px;font-family:Space Mono,monospace">
          ${isReg?'✅ REGISTER':'🔐 LOGIN'}
        </span>
      </td>
      <td style="font-family:Space Mono,monospace;font-size:0.72rem">${dateStr} ${timeStr}</td>
    </tr>`;
  }).join('');
}

function renderUsersTable(users) {
  const tbody = document.getElementById('users-tbody');
  if (!tbody) return;
  if (!users.length) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:3rem;color:var(--text-muted)">
      <div style="font-size:2.5rem;margin-bottom:0.75rem">👤</div>
      <div>No registered users yet.</div>
      <div style="font-size:0.78rem;margin-top:0.5rem"><a href="auth.html" style="color:var(--accent-gold)">Create an account first →</a></div>
    </td></tr>`;
    return;
  }
  tbody.innerHTML = users.map((u, i) => {
    const initials = ((u.fname||'?')[0]+(u.lname||'?')[0]).toUpperCase();
    const team = (u.team||'').match(/\(([^)]+)\)/);
    const joined   = u.createdAt   ? new Date(u.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '—';
    const lastLogin = u.lastLogin  ? new Date(u.lastLogin).toLocaleDateString('en-IN',{day:'numeric',month:'short'}) + ' ' + new Date(u.lastLogin).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}) : '—';
    const totalSpent = (u.totalSpent||0) + (u.tickets||[]).reduce((s,t)=>s+(t.amount||0),0);
    return `<tr style="cursor:pointer" onclick="viewUserAccount('${u.id}')" title="Click to view account">
      <td style="font-family:Space Mono,monospace;color:var(--text-muted);font-size:0.8rem">${i+1}</td>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--accent-gold),#e85d04);display:flex;align-items:center;justify-content:center;font-family:Oswald,sans-serif;font-weight:700;font-size:0.78rem;color:#000;flex-shrink:0">${initials}</div>
          <div>
            <div style="font-weight:600;font-size:0.88rem">${u.fname} ${u.lname}</div>
            <div style="font-size:0.7rem;color:var(--text-muted)">${u.email}</div>
          </div>
        </div>
      </td>
      <td style="font-family:Space Mono,monospace;font-size:0.75rem">${u.phone||'—'}</td>
      <td>${team?`<span style="background:rgba(240,165,0,0.08);color:var(--accent-gold);border:1px solid rgba(240,165,0,0.2);font-size:0.65rem;padding:2px 8px;border-radius:3px;font-family:Space Mono,monospace">${team[1]}</span>`:'—'}</td>
      <td style="text-align:center;font-family:Space Mono,monospace;font-size:0.8rem">${(u.orders||[]).length}</td>
      <td style="text-align:center;font-family:Space Mono,monospace;font-size:0.8rem">${(u.tickets||[]).length}</td>
      <td style="font-family:Space Mono,monospace;font-size:0.75rem;color:var(--accent-gold)">₹${totalSpent.toLocaleString()}</td>
      <td style="text-align:center;font-family:Space Mono,monospace;font-size:0.8rem;color:var(--accent-blue)">${u.loginCount||1}</td>
      <td style="font-family:Space Mono,monospace;font-size:0.7rem;color:var(--text-muted)">${lastLogin}</td>
      <td style="font-family:Space Mono,monospace;font-size:0.72rem">${joined}</td>
      <td onclick="event.stopPropagation()">
        <button onclick="deleteUser('${u.id}')" style="background:rgba(255,31,61,0.1);border:1px solid rgba(255,31,61,0.2);color:#ff6b80;padding:4px 10px;border-radius:4px;font-size:0.7rem;cursor:pointer">🗑️</button>
      </td>
    </tr>`;
  }).join('');
}

// View a specific user's account details inline
function viewUserAccount(uid) {
  try {
    const db = JSON.parse(localStorage.getItem('ipl_users_db')||'[]');
    const u = db.find(x=>x.id===uid);
    if (!u) return;
    // Temporarily set as current user for renderMyAccount
    const prevUser = sessionStorage.getItem('ipl_current_user');
    sessionStorage.setItem('ipl_current_user', JSON.stringify(u));
    switchSection('myaccount', null);
    // Restore actual logged-in user after render
    if (prevUser) sessionStorage.setItem('ipl_current_user', prevUser);
  } catch(e) {}
}

function filterUsersSection() {
  const q = (document.getElementById('user-search')?.value||'').toLowerCase();
  const filtered = q ? allUsersData.filter(u =>
    `${u.fname} ${u.lname} ${u.email} ${u.phone||''} ${u.team||''}`.toLowerCase().includes(q)
  ) : allUsersData;
  renderUsersTable(filtered);
}

function deleteUser(id) {
  if (!confirm('Delete this user? This cannot be undone.')) return;
  allUsersData = allUsersData.filter(u => u.id !== id);
  localStorage.setItem('ipl_users_db', JSON.stringify(allUsersData));
  loadUsersSection();
  showToast('User deleted.', 'info');
}

function clearAllUsers() {
  if (!confirm('Delete ALL users and login history? This cannot be undone.')) return;
  localStorage.removeItem('ipl_users_db');
  localStorage.removeItem('ipl_login_log');
  allUsersData = [];
  loadUsersSection();
  showToast('All users and login data cleared.', 'info');
}

function exportUsersCSV() {
  if (!allUsersData.length) { alert('No users to export.'); return; }
  const headers = ['#','First Name','Last Name','Email','Phone','Team','Orders','Tickets','Joined'];
  const rows = allUsersData.map((u,i) => [
    i+1, u.fname, u.lname, u.email, u.phone||'',
    (u.team||'').replace(/,/g,''), (u.orders||[]).length, (u.tickets||[]).length,
    u.createdAt ? new Date(u.createdAt).toLocaleDateString() : ''
  ]);
  const csv = [headers,...rows].map(r=>r.map(v=>`"${v}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,'+encodeURIComponent(csv);
  a.download = 'ipl_users_'+new Date().toISOString().slice(0,10)+'.csv';
  a.click();
}

// Also expose showToast for app.js context
function showToast(msg, type='info') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg; t.className = `toast show ${type}`;
  setTimeout(() => { t.className = 'toast'; }, 3000);
}

// ============================================================
// NAVIGATION — defined earlier in this file
// ============================================================

function toggleMenu() {
  const center = document.querySelector('.nav-center');
  if (!center) return;
  const isVisible = center.style.display === 'flex';
  center.style.cssText = isVisible
    ? ''
    : 'display:flex;flex-direction:column;position:fixed;top:60px;left:0;right:0;background:rgba(3,7,13,0.98);padding:1rem;z-index:999;gap:4px';
}

// ============================================================
// PARTICLES
// ============================================================
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  particles = Array.from({length: 60}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    a: Math.random() * 0.5 + 0.1
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100, 160, 240, ${p.a})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ============================================================
// PLAYERS GRID
// ============================================================
function roleClass(role) {
  return { 'Batsman':'role-bat','Bowler':'role-bowl','All-rounder':'role-ar','Wicket-keeper':'role-wk' }[role] || 'role-ar';
}

function renderPlayersGrid(players) {
  const grid = document.getElementById('players-grid');
  const count = document.getElementById('players-count');
  if (!grid) return;
  if (count) count.textContent = `Showing ${players.length} player${players.length!==1?'s':''}`;

  if (players.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text-muted)">No players found matching your filters.</div>`;
    return;
  }

  grid.innerHTML = players.map(p => {
    const stat1 = p.role === 'Bowler' ? { l:'WICKETS', v: p.bowling?.wickets || 0 } : { l:'ODI RUNS', v: (p.batting?.runs || 0).toLocaleString() };
    const stat2 = p.role === 'Bowler' ? { l:'ECONOMY', v: p.bowling?.economy || '—' } : { l:'AVG', v: p.batting?.avg || '—' };
    const stat3 = p.role === 'Bowler' ? { l:'BEST', v: p.bowling?.best || '—' } : { l:'100s', v: p.batting?.centuries || 0 };
    return `
      <div class="player-card" onclick="openPlayerModal(${p.id})">
        <div class="pc-top">
          <div class="pc-avatar">
            <img src="${p.img || ''}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <div class="pc-avatar-fallback" style="display:none;background:linear-gradient(135deg,#0d1e35,#1c3a5a)">${p.initials || p.name.split(' ').map(w=>w[0]).join('')}</div>
          </div>
          <div class="pc-info">
            <div class="pc-name">${p.name}</div>
            <div class="pc-meta">${p.flag} ${p.country}${p.age ? ' · ' + p.age + 'y' : ''}</div>
            ${p.iplTeam ? `<div class="pc-ipl-badge">🏆 ${p.iplTeam}</div>` : ''}
          </div>
        </div>
        <div style="margin-bottom:0.5rem"><span class="pc-role-badge ${roleClass(p.role)}">${p.role}</span></div>
        <div class="pc-stats">
          <div class="pc-stat">
            <div class="pc-stat-label">${stat1.l}</div>
            <div class="pc-stat-val">${stat1.v}</div>
          </div>
          <div class="pc-stat">
            <div class="pc-stat-label">${stat2.l}</div>
            <div class="pc-stat-val">${stat2.v}</div>
          </div>
          <div class="pc-stat">
            <div class="pc-stat-label">${stat3.l}</div>
            <div class="pc-stat-val">${stat3.v}</div>
          </div>
        </div>
      </div>`;
  }).join('');
}

function filterPlayers() {
  const search = document.getElementById('player-search')?.value.toLowerCase() || '';
  const role = document.getElementById('role-filter')?.value || '';
  const country = document.getElementById('country-filter')?.value || '';
  const team = document.getElementById('team-filter')?.value || '';

  const filtered = getAllPlayers().filter(p => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search) ||
      p.country.toLowerCase().includes(search) ||
      (p.iplTeam || '').toLowerCase().includes(search);
    const matchRole = !role || p.role === role;
    const matchCountry = !country || p.country === country;
    const matchTeam = !team || p.iplTeam === team;
    return matchSearch && matchRole && matchCountry && matchTeam;
  });
  renderPlayersGrid(filtered);
}

function openPlayerByName(name) {
  const p = getAllPlayers().find(x => x.name === name);
  if (p) openPlayerModal(p.id);
}

// ============================================================
// PLAYER DETAIL MODAL — Full player history & career stats
// ============================================================
function openPlayerModal(id) {
  const p = getAllPlayers().find(x => x.id === id);
  if (!p) return;
  const modal = document.getElementById('player-modal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  const isBowler = p.role === 'Bowler';
  const isAR     = p.role === 'All-rounder';
  const hasWkts  = (p.bowling?.wickets||0) > 0;
  const tc = {MI:'#005DAB',CSK:'#FDB913',RCB:'#EC1C24',KKR:'#3A225D',DC:'#17479E',PBKS:'#ED1B24',RR:'#254AA5',SRH:'#F7A721',GT:'#1C1C74',LSG:'#A72B2A'};
  const teamColor = tc[p.iplTeam] || '#f0a500';

  // Build yearly stats timeline
  const years = p.years || [2017,2018,2019,2020,2021,2022,2023,2024];
  const yearlyRuns = p.yearlyRuns || Array(years.length).fill(0);
  const yearlyWkts = p.yearlyWkts || Array(years.length).fill(0);
  const bestYearRunIdx = yearlyRuns.indexOf(Math.max(...yearlyRuns));
  const bestYearWktIdx = yearlyWkts.indexOf(Math.max(...yearlyWkts));

  // Career highlights
  const highlights = [];
  if ((p.batting?.centuries||0) >= 10) highlights.push(`🏆 ${p.batting.centuries} International Centuries`);
  if ((p.batting?.runs||0) >= 10000)   highlights.push(`⭐ ${(p.batting.runs/1000).toFixed(1)}K ODI Runs`);
  if ((p.bowling?.wickets||0) >= 100)  highlights.push(`🎯 ${p.bowling.wickets} ODI Wickets`);
  if ((p.ipl?.runs||0) >= 4000)        highlights.push(`🏏 ${(p.ipl.runs/1000).toFixed(1)}K IPL Runs`);
  if ((p.ipl?.wickets||0) >= 100)      highlights.push(`💫 ${p.ipl.wickets} IPL Wickets`);
  if (p.bio?.includes('Captain'))       highlights.push(`🎖️ National Team Captain`);
  if (p.bio?.includes('World Cup'))     highlights.push(`🌍 World Cup Winner`);
  if (p.bio?.includes('No.1'))          highlights.push(`🥇 ICC World No.1`);

  const modalInner = document.getElementById('modal-inner');
  if (!modalInner) return;

  modalInner.innerHTML = `
    <!-- ── HERO HEADER ── -->
    <div style="background:linear-gradient(135deg,${teamColor}18,${teamColor}06);border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;border:1px solid ${teamColor}30;position:relative;overflow:hidden">
      <div style="position:absolute;right:-10px;top:-10px;font-size:8rem;opacity:0.05;pointer-events:none">${p.emoji||'🏏'}</div>
      <div style="display:flex;gap:1.5rem;align-items:flex-start;flex-wrap:wrap;position:relative;z-index:1">
        <!-- PHOTO -->
        <div style="position:relative;flex-shrink:0">
          <div style="width:90px;height:90px;border-radius:50%;overflow:hidden;border:3px solid ${teamColor};box-shadow:0 4px 16px ${teamColor}40">
            <img src="${p.img||''}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover"
              onerror="this.parentElement.style.background='linear-gradient(135deg,#0d1e35,#1c3a5a)';this.parentElement.innerHTML='<span style=\\'font-family:Oswald,sans-serif;font-weight:700;font-size:1.6rem;color:${teamColor};display:flex;align-items:center;justify-content:center;height:100%\\'>${p.initials||p.name[0]}</span>'">
          </div>
          ${p.iplTeam?`<div style="position:absolute;bottom:-2px;right:-2px;width:28px;height:28px;border-radius:50%;background:${teamColor};border:2px solid #0a1628;display:flex;align-items:center;justify-content:center;font-family:Oswald,sans-serif;font-weight:700;font-size:0.55rem;color:${['CSK','SRH'].includes(p.iplTeam)?'#000':'#fff'}">${p.iplTeam}</div>`:''}
        </div>
        <!-- INFO -->
        <div style="flex:1;min-width:200px">
          <div style="font-family:Oswald,sans-serif;font-size:1.9rem;font-weight:700;letter-spacing:1px;line-height:1">${p.name}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;align-items:center">
            <span style="font-size:1rem">${p.flag}</span>
            <span style="color:var(--text-secondary);font-size:0.85rem">${p.country}</span>
            <span style="color:var(--text-muted)">·</span>
            <span class="pc-role-badge ${roleClass(p.role)}" style="font-size:0.72rem">${p.role}</span>
            ${p.age?`<span style="color:var(--text-muted);font-size:0.78rem">Age ${p.age}</span>`:''}
          </div>
          ${p.bio?`<p style="font-size:0.82rem;color:var(--text-secondary);margin-top:10px;line-height:1.65;max-width:460px">${p.bio}</p>`:''}
          <!-- HIGHLIGHTS -->
          ${highlights.length?`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px">${highlights.slice(0,4).map(h=>`<span style="background:rgba(240,165,0,0.08);color:var(--accent-gold);border:1px solid rgba(240,165,0,0.2);font-size:0.65rem;padding:3px 9px;border-radius:20px">${h}</span>`).join('')}</div>`:''}
        </div>
      </div>
    </div>

    <!-- ── TABS ── -->
    <div style="display:flex;gap:6px;margin-bottom:1.25rem;flex-wrap:wrap;border-bottom:1px solid var(--border);padding-bottom:10px" id="pm-tabs">
      <button class="pm-tab-btn active" onclick="pmTab('overview',this)">📋 Overview</button>
      <button class="pm-tab-btn" onclick="pmTab('batting',this)">🏏 Batting</button>
      ${hasWkts?`<button class="pm-tab-btn" onclick="pmTab('bowling',this)">🎯 Bowling</button>`:''}
      <button class="pm-tab-btn" onclick="pmTab('ipl',this)">🏆 IPL Career</button>
      <button class="pm-tab-btn" onclick="pmTab('history',this)">📈 Year-by-Year</button>
    </div>

    <!-- ── OVERVIEW TAB ── -->
    <div id="pm-overview">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem">
        <!-- BATTING QUICK -->
        <div style="background:var(--bg-deep);border:1px solid var(--border);border-radius:10px;padding:1rem">
          <div style="font-family:Barlow Condensed,sans-serif;font-size:0.72rem;font-weight:700;letter-spacing:2px;color:var(--text-muted);margin-bottom:0.75rem">🏏 BATTING CAREER</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            ${[['ODI Runs',(p.batting?.runs||0).toLocaleString(),'var(--accent-gold)'],['Average',p.batting?.avg||'—','var(--accent-green)'],['Strike Rate',p.batting?.sr||'—','var(--text-primary)'],['Centuries',p.batting?.centuries||0,'var(--accent-gold)'],['Fifties',p.batting?.fifties||0,'var(--text-primary)'],['High Score',p.batting?.hs||'—','var(--accent-blue)']].map(([l,v,c])=>`
              <div style="text-align:center;background:#060f1f;border-radius:6px;padding:8px 4px">
                <div style="font-size:0.55rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">${l}</div>
                <div style="font-family:Space Mono,monospace;font-weight:700;font-size:0.88rem;color:${c}">${v}</div>
              </div>`).join('')}
          </div>
        </div>
        <!-- BOWLING QUICK -->
        <div style="background:var(--bg-deep);border:1px solid var(--border);border-radius:10px;padding:1rem">
          <div style="font-family:Barlow Condensed,sans-serif;font-size:0.72rem;font-weight:700;letter-spacing:2px;color:var(--text-muted);margin-bottom:0.75rem">🎯 BOWLING / IPL</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            ${hasWkts?[['ODI Wickets',p.bowling?.wickets||0,'var(--accent-orange)'],['Economy',p.bowling?.economy||'—','var(--accent-green)'],['Average',p.bowling?.avg||'—','var(--text-primary)'],['Best',p.bowling?.best||'—','var(--accent-gold)']].map(([l,v,c])=>`
              <div style="text-align:center;background:#060f1f;border-radius:6px;padding:8px 4px">
                <div style="font-size:0.55rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">${l}</div>
                <div style="font-family:Space Mono,monospace;font-weight:700;font-size:0.88rem;color:${c}">${v}</div>
              </div>`).join(''):`
              <div style="text-align:center;background:#060f1f;border-radius:6px;padding:8px 4px">
                <div style="font-size:0.55rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">IPL Runs</div>
                <div style="font-family:Space Mono,monospace;font-weight:700;font-size:0.88rem;color:var(--accent-gold)">${(p.ipl?.runs||0).toLocaleString()}</div>
              </div>
              <div style="text-align:center;background:#060f1f;border-radius:6px;padding:8px 4px">
                <div style="font-size:0.55rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">IPL Avg</div>
                <div style="font-family:Space Mono,monospace;font-weight:700;font-size:0.88rem;color:var(--accent-green)">${p.ipl?.avg||'—'}</div>
              </div>
              <div style="text-align:center;background:#060f1f;border-radius:6px;padding:8px 4px">
                <div style="font-size:0.55rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">IPL SR</div>
                <div style="font-family:Space Mono,monospace;font-weight:700;font-size:0.88rem;color:var(--text-primary)">${p.ipl?.sr||'—'}</div>
              </div>
              <div style="text-align:center;background:#060f1f;border-radius:6px;padding:8px 4px">
                <div style="font-size:0.55rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">IPL 100s</div>
                <div style="font-family:Space Mono,monospace;font-weight:700;font-size:0.88rem;color:var(--accent-gold)">${p.ipl?.hundreds||0}</div>
              </div>`}
          </div>
        </div>
      </div>
      <!-- CAREER TREND MINI -->
      <div style="background:var(--bg-deep);border:1px solid var(--border);border-radius:10px;padding:1rem">
        <div style="font-family:Barlow Condensed,sans-serif;font-size:0.72rem;font-weight:700;letter-spacing:2px;color:var(--text-muted);margin-bottom:0.75rem">📈 CAREER TREND (${years[0]}–${years[years.length-1]})</div>
        <div style="height:130px"><canvas id="pm-overview-chart"></canvas></div>
      </div>
    </div>

    <!-- ── BATTING TAB ── -->
    <div id="pm-batting" style="display:none">
      <div class="pm-section-title">🏏 BATTING — ODI CAREER STATISTICS</div>
      <div class="pm-stat-grid">
        <div class="pm-stat"><div class="pm-stat-label">Matches</div><div class="pm-stat-val">${p.batting?.matches||0}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">Innings</div><div class="pm-stat-val">${p.batting?.innings||0}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">Runs</div><div class="pm-stat-val" style="color:var(--accent-gold)">${(p.batting?.runs||0).toLocaleString()}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">Average</div><div class="pm-stat-val" style="color:var(--accent-green)">${p.batting?.avg||'—'}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">Strike Rate</div><div class="pm-stat-val">${p.batting?.sr||'—'}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">High Score</div><div class="pm-stat-val" style="color:var(--accent-blue)">${p.batting?.hs||'—'}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">100s</div><div class="pm-stat-val" style="color:var(--accent-gold)">${p.batting?.centuries||0}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">50s</div><div class="pm-stat-val">${p.batting?.fifties||0}</div></div>
      </div>
      <div class="pm-section-title" style="margin-top:1.25rem">CAREER RUNS vs MILESTONES</div>
      <div class="pm-chart-box" style="height:150px"><canvas id="pm-bat-bar"></canvas></div>
    </div>

    <!-- ── BOWLING TAB ── -->
    <div id="pm-bowling" style="display:none">
      <div class="pm-section-title">🎯 BOWLING — ODI CAREER STATISTICS</div>
      <div class="pm-stat-grid">
        <div class="pm-stat"><div class="pm-stat-label">Wickets</div><div class="pm-stat-val" style="color:var(--accent-orange)">${p.bowling?.wickets||0}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">Average</div><div class="pm-stat-val">${p.bowling?.avg||'—'}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">Economy</div><div class="pm-stat-val" style="color:var(--accent-green)">${p.bowling?.economy||'—'}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">Best Figures</div><div class="pm-stat-val" style="color:var(--accent-gold)">${p.bowling?.best||'—'}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">Matches</div><div class="pm-stat-val">${p.batting?.matches||0}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">5-Wicket Hauls</div><div class="pm-stat-val" style="color:var(--accent-purple)">${p.bowling?.fiveWickets||'0'}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">Innings</div><div class="pm-stat-val">${p.batting?.innings||0}</div></div>
        <div class="pm-stat"><div class="pm-stat-label">Country</div><div class="pm-stat-val">${p.flag}</div></div>
      </div>
      <div class="pm-section-title" style="margin-top:1.25rem">YEARLY WICKETS TREND</div>
      <div class="pm-chart-box" style="height:150px"><canvas id="pm-bowl-chart"></canvas></div>
    </div>

    <!-- ── IPL TAB ── -->
    <div id="pm-ipl" style="display:none">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:1rem">
        ${p.iplTeam?`<div style="width:44px;height:44px;border-radius:50%;background:${teamColor};display:flex;align-items:center;justify-content:center;font-family:Oswald,sans-serif;font-weight:700;font-size:0.8rem;color:${['CSK','SRH'].includes(p.iplTeam)?'#000':'#fff'}">${p.iplTeam}</div>`:''}
        <div>
          <div class="pm-section-title" style="margin:0">IPL CAREER — ${p.iplTeam||'MULTIPLE TEAMS'}</div>
          <div style="font-size:0.72rem;color:var(--text-muted)">${p.ipl?.matches||0} matches played</div>
        </div>
      </div>
      <div class="pm-stat-grid">
        <div class="pm-stat"><div class="pm-stat-label">Matches</div><div class="pm-stat-val">${p.ipl?.matches||0}</div></div>
        ${(p.ipl?.runs||0)>0?`<div class="pm-stat"><div class="pm-stat-label">IPL Runs</div><div class="pm-stat-val" style="color:var(--accent-gold)">${(p.ipl.runs).toLocaleString()}</div></div>`:''}
        ${p.ipl?.avg?`<div class="pm-stat"><div class="pm-stat-label">Average</div><div class="pm-stat-val" style="color:var(--accent-green)">${p.ipl.avg}</div></div>`:''}
        ${p.ipl?.sr?`<div class="pm-stat"><div class="pm-stat-label">Strike Rate</div><div class="pm-stat-val">${p.ipl.sr}</div></div>`:''}
        ${p.ipl?.hundreds?`<div class="pm-stat"><div class="pm-stat-label">100s</div><div class="pm-stat-val" style="color:var(--accent-gold)">${p.ipl.hundreds}</div></div>`:''}
        ${p.ipl?.fifties?`<div class="pm-stat"><div class="pm-stat-label">50s</div><div class="pm-stat-val">${p.ipl.fifties}</div></div>`:''}
        ${p.ipl?.wickets?`<div class="pm-stat"><div class="pm-stat-label">IPL Wickets</div><div class="pm-stat-val" style="color:var(--accent-orange)">${p.ipl.wickets}</div></div>`:''}
        ${p.ipl?.economy?`<div class="pm-stat"><div class="pm-stat-label">Economy</div><div class="pm-stat-val">${p.ipl.economy}</div></div>`:''}
      </div>
      <div class="pm-section-title" style="margin-top:1.25rem">IPL vs ODI COMPARISON</div>
      <div class="pm-chart-box" style="height:150px"><canvas id="pm-ipl-compare"></canvas></div>
    </div>

    <!-- ── YEAR-BY-YEAR HISTORY TAB ── -->
    <div id="pm-history" style="display:none">
      <div class="pm-section-title">📈 YEAR-BY-YEAR CAREER PERFORMANCE (${years[0]}–${years[years.length-1]})</div>
      <div class="pm-chart-box"><canvas id="modal-trend-chart"></canvas></div>
      <!-- YEARLY TABLE -->
      <div style="margin-top:1.25rem;overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:0.78rem">
          <thead>
            <tr style="background:#060f1f">
              <th style="padding:8px 12px;text-align:left;color:var(--text-muted);font-family:Space Mono,monospace;font-size:0.65rem;letter-spacing:1px;white-space:nowrap">YEAR</th>
              ${!isBowler?`<th style="padding:8px 12px;text-align:center;color:var(--text-muted);font-family:Space Mono,monospace;font-size:0.65rem">RUNS</th>`:''}
              ${hasWkts||isBowler?`<th style="padding:8px 12px;text-align:center;color:var(--text-muted);font-family:Space Mono,monospace;font-size:0.65rem">WICKETS</th>`:''}
              <th style="padding:8px 12px;text-align:center;color:var(--text-muted);font-family:Space Mono,monospace;font-size:0.65rem">FORM</th>
            </tr>
          </thead>
          <tbody>
            ${years.map((yr,i) => {
              const runs = yearlyRuns[i]||0;
              const wkts = yearlyWkts[i]||0;
              const isBestRun = i === bestYearRunIdx && runs > 0;
              const isBestWkt = i === bestYearWktIdx && wkts > 0;
              const form = runs > 1000 || wkts > 25 ? '🔥 Peak' : runs > 600 || wkts > 15 ? '✅ Good' : runs > 200 || wkts > 8 ? '➡️ Avg' : '⬇️ Low';
              return `<tr style="border-bottom:1px solid rgba(100,150,220,0.05);transition:background 0.15s" onmouseover="this.style.background='rgba(240,165,0,0.04)'" onmouseout="this.style.background=''">
                <td style="padding:8px 12px;font-family:Space Mono,monospace;color:${isBestRun||isBestWkt?'var(--accent-gold)':'var(--text-secondary)'}"><b>${yr}</b>${isBestRun||isBestWkt?' ★':''}</td>
                ${!isBowler?`<td style="padding:8px 12px;text-align:center;font-family:Space Mono,monospace;font-weight:700;color:${isBestRun?'var(--accent-gold)':runs>800?'var(--accent-green)':'var(--text-primary)'}">${runs.toLocaleString()}</td>`:''}
                ${hasWkts||isBowler?`<td style="padding:8px 12px;text-align:center;font-family:Space Mono,monospace;font-weight:700;color:${isBestWkt?'var(--accent-orange)':wkts>20?'var(--accent-green)':'var(--text-primary)'}">${wkts}</td>`:''}
                <td style="padding:8px 12px;text-align:center;font-size:0.75rem">${form}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Style tab buttons
  function styleTabBtns() {
    document.querySelectorAll('.pm-tab-btn').forEach(b => {
      b.style.cssText = b.classList.contains('active')
        ? 'background:rgba(240,165,0,0.12);color:var(--accent-gold);border:1px solid rgba(240,165,0,0.3);padding:7px 16px;border-radius:6px;font-family:Barlow Condensed,sans-serif;font-size:0.82rem;font-weight:700;letter-spacing:1px;cursor:pointer;transition:all 0.2s'
        : 'background:var(--bg-card3);color:var(--text-muted);border:1px solid var(--border);padding:7px 16px;border-radius:6px;font-family:Barlow Condensed,sans-serif;font-size:0.82rem;font-weight:700;letter-spacing:1px;cursor:pointer;transition:all 0.2s';
    });
  }
  styleTabBtns();

  window.pmTab = function(tab, btn) {
    ['overview','batting','bowling','ipl','history'].forEach(t => {
      const el = document.getElementById('pm-'+t);
      if (el) el.style.display = t===tab ? 'block' : 'none';
    });
    document.querySelectorAll('.pm-tab-btn').forEach(b => {
      b.classList.remove('active');
      b.style.background='var(--bg-card3)'; b.style.color='var(--text-muted)'; b.style.borderColor='var(--border)';
    });
    if (btn) { btn.classList.add('active'); btn.style.background='rgba(240,165,0,0.12)'; btn.style.color='var(--accent-gold)'; btn.style.borderColor='rgba(240,165,0,0.3)'; }
    setTimeout(() => {
      if (tab === 'history')  renderTrendChart(p);
      if (tab === 'batting')  renderBatBar(p);
      if (tab === 'bowling')  renderBowlChart(p);
      if (tab === 'ipl')      renderIplCompare(p);
    }, 80);
  };

  // Auto-render overview chart
  setTimeout(() => renderOverviewChart(p), 120);
}

function renderOverviewChart(p) {
  const ctx = document.getElementById('pm-overview-chart');
  if (!ctx) return;
  if (ctx._ci) ctx._ci.destroy();
  const labels = p.years || [2017,2018,2019,2020,2021,2022,2023,2024];
  const data   = p.role==='Bowler' ? (p.yearlyWkts||Array(labels.length).fill(0)) : (p.yearlyRuns||Array(labels.length).fill(0));
  ctx._ci = new Chart(ctx, {
    type:'line',
    data:{ labels, datasets:[{ label:p.role==='Bowler'?'Wickets':'Runs', data, borderColor:'#f0a500',
      backgroundColor:'rgba(240,165,0,0.07)', fill:true, tension:0.4, pointRadius:3, pointBackgroundColor:'#f0a500' }] },
    options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
      scales:{ x:{ticks:{color:'#4a6584',font:{size:9}},grid:{display:false}}, y:{ticks:{color:'#4a6584',font:{size:9}},grid:{color:'rgba(100,150,220,0.05)'}} } }
  });
}

function renderBatBar(p) {
  const ctx = document.getElementById('pm-bat-bar');
  if (!ctx) return;
  if (ctx._ci) ctx._ci.destroy();
  const labels = ['Matches','Innings','100s','50s'];
  const vals   = [p.batting?.matches||0, p.batting?.innings||0, p.batting?.centuries||0, p.batting?.fifties||0];
  ctx._ci = new Chart(ctx, {
    type:'bar',
    data:{ labels, datasets:[{ data:vals, backgroundColor:['rgba(240,165,0,0.6)','rgba(14,165,233,0.6)','rgba(0,217,126,0.6)','rgba(168,85,247,0.6)'],
      borderColor:['#f0a500','#0ea5e9','#00d97e','#a855f7'], borderWidth:2, borderRadius:5 }] },
    options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
      scales:{ x:{ticks:{color:'#8ba3c7',font:{size:10}},grid:{display:false}}, y:{ticks:{color:'#4a6584',font:{size:9}},grid:{color:'rgba(100,150,220,0.06)'}} } }
  });
}

function renderBowlChart(p) {
  const ctx = document.getElementById('pm-bowl-chart');
  if (!ctx) return;
  if (ctx._ci) ctx._ci.destroy();
  const labels = p.years||[2017,2018,2019,2020,2021,2022,2023,2024];
  const data   = p.yearlyWkts||Array(labels.length).fill(0);
  ctx._ci = new Chart(ctx, {
    type:'bar',
    data:{ labels, datasets:[{ label:'Wickets', data, backgroundColor:'rgba(232,93,4,0.7)', borderColor:'#e85d04', borderWidth:1, borderRadius:4 }] },
    options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
      scales:{ x:{ticks:{color:'#8ba3c7',font:{size:9}},grid:{display:false}}, y:{ticks:{color:'#4a6584',font:{size:9}},grid:{color:'rgba(100,150,220,0.06)'}} } }
  });
}

function renderIplCompare(p) {
  const ctx = document.getElementById('pm-ipl-compare');
  if (!ctx) return;
  if (ctx._ci) ctx._ci.destroy();
  const isBowler = p.role==='Bowler';
  if (isBowler) {
    ctx._ci = new Chart(ctx, { type:'bar',
      data:{ labels:['ODI Wickets','IPL Wickets'], datasets:[{ data:[p.bowling?.wickets||0, p.ipl?.wickets||0],
        backgroundColor:['rgba(232,93,4,0.7)','rgba(240,165,0,0.7)'], borderRadius:5 }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
        scales:{ x:{ticks:{color:'#8ba3c7',font:{size:10}},grid:{display:false}}, y:{ticks:{color:'#4a6584',font:{size:9}},grid:{color:'rgba(100,150,220,0.06)'}} } }
    });
  } else {
    ctx._ci = new Chart(ctx, { type:'bar',
      data:{ labels:['ODI Runs','IPL Runs','ODI 100s','IPL 100s','ODI 50s','IPL 50s'],
        datasets:[{ data:[p.batting?.runs||0, p.ipl?.runs||0, p.batting?.centuries||0, p.ipl?.hundreds||0, p.batting?.fifties||0, p.ipl?.fifties||0],
          backgroundColor:['rgba(240,165,0,0.7)','rgba(14,165,233,0.7)','rgba(0,217,126,0.7)','rgba(0,217,126,0.4)','rgba(168,85,247,0.7)','rgba(168,85,247,0.4)'],
          borderRadius:4 }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
        scales:{ x:{ticks:{color:'#8ba3c7',font:{size:9},maxRotation:30},grid:{display:false}}, y:{ticks:{color:'#4a6584',font:{size:9}},grid:{color:'rgba(100,150,220,0.06)'}} } }
    });
  }
}

function renderTrendChart(p) {
  const ctx = document.getElementById('modal-trend-chart');
  if (!ctx) return;
  if (ctx._ci) ctx._ci.destroy();
  const labels = p.years || [2017,2018,2019,2020,2021,2022,2023,2024];
  const d1 = p.yearlyRuns || Array(labels.length).fill(0);
  const d2 = p.yearlyWkts && p.yearlyWkts.some(v=>v>0) ? p.yearlyWkts : null;
  ctx._ci = new Chart(ctx, {
    type:'line',
    data:{ labels, datasets:[
      { label: p.role==='Bowler'?'Wickets':'Runs', data: p.role==='Bowler'?(p.yearlyWkts||d1):d1,
        borderColor:'#f0a500', backgroundColor:'rgba(240,165,0,0.07)', fill:true, tension:0.4,
        pointBackgroundColor:'#f0a500', pointRadius:5, pointHoverRadius:8 },
      ...(d2 && p.role!=='Bowler'?[{ label:'Wickets', data:d2, borderColor:'#e85d04',
        backgroundColor:'rgba(232,93,4,0.06)', fill:true, tension:0.4, pointBackgroundColor:'#e85d04', pointRadius:4 }]:[])
    ]},
    options:{ responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ labels:{ color:'#8ba3c7', font:{family:'Space Mono',size:11} } } },
      scales:{
        x:{ ticks:{color:'#4a6584',font:{family:'Space Mono',size:10}}, grid:{color:'rgba(100,150,220,0.05)'} },
        y:{ ticks:{color:'#4a6584',font:{family:'Space Mono',size:10}}, grid:{color:'rgba(100,150,220,0.05)'} }
      }
    }
  });
}

function closePlayerModal(e) {
  if (e?.target === document.getElementById('player-modal')) closePlayerModalDirect();
}
function closePlayerModalDirect() {
  document.getElementById('player-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function closeAddModal(e) {
  if (e?.target === document.getElementById('add-modal')) closeAddModalDirect();
}
function closeAddModalDirect() {
  document.getElementById('add-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function openAddModal() {
  document.getElementById('add-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ============================================================
// ADD PLAYER
// ============================================================
function handleAddPlayer(e) {
  e.preventDefault();
  const name = document.getElementById('f-name').value.trim();
  const country = document.getElementById('f-country').value.trim();
  const role = document.getElementById('f-role').value;
  const age = parseInt(document.getElementById('f-age').value) || 0;
  const runs = parseInt(document.getElementById('f-runs').value) || 0;
  const avg = parseFloat(document.getElementById('f-avg').value) || 0;
  const sr = parseFloat(document.getElementById('f-sr').value) || 0;
  const cents = parseInt(document.getElementById('f-100s').value) || 0;
  const wkts = parseInt(document.getElementById('f-wkts').value) || 0;
  const iplTeam = document.getElementById('f-ipl').value || null;
  const iplRuns = parseInt(document.getElementById('f-ipl-runs').value) || 0;
  const emoji = document.getElementById('f-emoji').value || '🏏';
  const initials = name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,3);

  const newPlayer = {
    id: Date.now(),
    name, country, age, role, iplTeam, initials, emoji,
    flag: '🏏', img: '',
    batting: { matches:0, innings:0, runs, avg, sr, hs:0, centuries:cents, fifties:0 },
    bowling: { wickets:wkts, avg:0, economy:0, best:'—' },
    ipl: { matches:0, runs:iplRuns, avg:0, sr:0, hundreds:0, fifties:0 },
    yearlyRuns: Array(8).fill(0), yearlyWkts: Array(8).fill(0),
    years: [2017,2018,2019,2020,2021,2022,2023,2024],
    bio: `Custom added player from ${country}.`
  };

  saveCustomPlayer(newPlayer);
  closeAddModalDirect();
  document.getElementById('add-form').reset();
  filterPlayers();
  renderStatsSection();
  renderCompareDropdowns();

  // Show confirmation
  const btn = document.querySelector('.submit-btn');
  if (btn) { btn.textContent = '✓ PLAYER ADDED!'; setTimeout(() => btn.textContent='ADD PLAYER TO DATABASE', 2000); }
}

// ============================================================
// STATISTICS — REAL IPL DATA
// ============================================================

// ── REAL IPL DATA ──────────────────────────────────────────

// IPL All-time records
const IPL_REAL = {
  // Titles won per team (2008–2024, 17 seasons)
  titles: { MI:5, CSK:5, KKR:3, SRH:1, RR:1, RCB:0, DC:0, PBKS:0, GT:2, LSG:0 },

  // Total matches played all-time (approx)
  totalMatches: { MI:245, CSK:240, KKR:232, RCB:238, DC:210, PBKS:218, RR:216, SRH:168, GT:52, LSG:42 },

  // Wins all-time
  wins: { MI:138, CSK:137, KKR:125, RCB:114, DC:106, PBKS:108, RR:110, SRH:95, GT:33, LSG:24 },

  // IPL 2026 Points Table (after ~10 matches each)
  pts2026: { RR:16, MI:14, CSK:14, GT:12, DC:12, KKR:10, SRH:10, LSG:8, RCB:6, PBKS:6 },
  nrr2026: { RR:0.981, MI:0.644, CSK:0.321, GT:0.412, DC:0.188, KKR:0.054, SRH:-0.112, LSG:-0.298, RCB:-0.486, PBKS:-0.612 },

  // Matches per season (2008–2024)
  seasonMatches: [58,74,60,64,74,76,76,60,56,60,60,60,60,60,74,74,70],
  seasons: ['2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'],

  // Total runs per season (approx, thousands)
  seasonRuns: [11800,15200,12400,13100,15800,16200,15900,12400,11800,12900,13100,12800,11600,12200,15800,16400,15200],

  // Venues — matches hosted
  venues: { 'Wankhede, Mumbai':108, 'Chepauk, Chennai':96, 'Eden Gardens, Kolkata':92, 'Chinnaswamy, Bengaluru':88, 'Feroz Shah Kotla, Delhi':82, 'Narendra Modi, Ahmedabad':44, 'Sawai Mansingh, Jaipur':52, 'Rajiv Gandhi, Hyderabad':68, 'Ekana, Lucknow':28, 'SCA, Ahmedabad':32 },

  // IPL 2026 auction records (₹ crore)
  auctionRecords: { 'Rishabh Pant':27, 'Shreyas Iyer':26.75, 'Arshdeep Singh':18, 'KL Rahul':14, 'Mitchell Starc':11.5, 'Pat Cummins':18, 'Sam Curran':18.5, 'Ben Stokes':16.25 },

  // All-time IPL run scorers
  iplRunScorers: { 'Virat Kohli':8004, 'Suresh Raina':5528, 'Rohit Sharma':6672, 'David Warner':6397, 'Shikhar Dhawan':6769, 'AB de Villiers':5162, 'MS Dhoni':5243, 'Gautam Gambhir':4217, 'KL Rahul':4954, 'Chris Gayle':4965 },

  // IPL all-time wicket takers
  iplWktTakers: { 'Lasith Malinga':170, 'Dwayne Bravo':183, 'Amit Mishra':172, 'Piyush Chawla':157, 'Harbhajan Singh':150, 'Jasprit Bumrah':180, 'Yuzvendra Chahal':163, 'Ravindra Jadeja':162, 'Bhuvneshwar Kumar':148, 'R Ashwin':157 },

  // Economy rates (IPL, min 50 wkts)
  economy: { 'Rashid Khan':6.33, 'Sunil Narine':6.67, 'Jasprit Bumrah':6.85, 'Bhuvneshwar Kumar':7.28, 'Lasith Malinga':7.14, 'Amit Mishra':7.35, 'Yuzvendra Chahal':7.59, 'Ravindra Jadeja':7.62 },

  // Strike rates (IPL, min 1000 runs)
  strikeRates: { 'Andre Russell':178.2, 'Suryakumar Yadav':159.2, 'Hardik Pandya':147.3, 'AB de Villiers':151.7, 'Kieron Pollard':147.8, 'Chris Gayle':148.5, 'Glenn Maxwell':153.6, 'Travis Head':177.4 },

  // Highest scores in IPL
  highestScores: { 'Chris Gayle (175*)':175, 'Brendon McCullum (158*)':158, 'AB de Villiers (133*)':133, 'Paul Valthaty (120*)':120, 'Yashasvi Jaiswal (124)':124, 'Sanju Samson (119)':119, 'KL Rahul (132*)':132, 'Quinton de Kock (140*)':140 },

  // Team runs scored in IPL 2026 (approx after 10 matches each)
  teamRuns2026: { MI:1842, CSK:1798, RR:1924, KKR:1756, GT:1812, DC:1690, SRH:1834, LSG:1698, RCB:1645, PBKS:1620 },

  // Home ground capacity
  groundCapacity: { 'Narendra Modi\n(Ahmedabad)':132000, 'Eden Gardens\n(Kolkata)':68000, 'Chepauk\n(Chennai)':50000, 'Wankhede\n(Mumbai)':33108, 'Sawai Mansingh\n(Jaipur)':30000, 'Chinnaswamy\n(Bengaluru)':35000, 'Rajiv Gandhi\n(Hyderabad)':55000, 'Feroz Shah Kotla\n(Delhi)':41820 },

  // Salary cap usage IPL 2026 (₹ crore)
  salary2026: { MI:92.5, CSK:89.8, RCB:88.2, KKR:87.4, DC:85.9, PBKS:82.3, RR:91.1, SRH:88.7, GT:86.5, LSG:83.9 },

  // IPL bowling types
  bowlTypes: { 'Right-arm Fast':38, 'Left-arm Fast':14, 'Off-spin':18, 'Leg-spin':22, 'Left-arm Spin':12, 'Medium Pace':16 },

  // Fastest deliveries (km/h) IPL
  speedGuns: { 'Umran Malik':157, 'Shoaib Akhtar (era)':153, 'Mitchell Johnson':152, 'Jofra Archer':150, 'Dale Steyn':149, 'Mitchell Starc':148, 'Lockie Ferguson':148, 'Pat Cummins':147 },

  // Win % by team
  winPct: { MI:56.3, CSK:57.1, KKR:53.9, RCB:47.9, DC:50.5, PBKS:49.5, RR:51.0, SRH:56.5, GT:63.5, LSG:57.1 },
};

// ── TEAM COLORS ──────────────────────────────────────────────
const TEAM_BG = {
  MI:'rgba(0,93,171,0.75)',   CSK:'rgba(253,185,19,0.75)',  RCB:'rgba(236,28,36,0.75)',
  KKR:'rgba(58,34,93,0.75)',  DC:'rgba(23,71,158,0.75)',    PBKS:'rgba(237,27,36,0.75)',
  RR:'rgba(37,74,165,0.75)',  SRH:'rgba(247,167,33,0.75)',  GT:'rgba(28,28,116,0.75)',  LSG:'rgba(167,43,42,0.75)'
};
const TEAM_BORDER = {
  MI:'#005DAB', CSK:'#FDB913', RCB:'#EC1C24', KKR:'#3A225D',
  DC:'#17479E', PBKS:'#ED1B24', RR:'#254AA5', SRH:'#F7A721',
  GT:'#1C1C74', LSG:'#A72B2A'
};

function teamBgs(teams)  { return teams.map(t => TEAM_BG[t]    || 'rgba(240,165,0,0.6)'); }
function teamBrds(teams) { return teams.map(t => TEAM_BORDER[t] || '#f0a500'); }

// ── CHART DEFAULTS ──────────────────────────────────────────
const CD = { color:'#8ba3c7', grid:'rgba(100,150,220,0.06)', mono:'Space Mono' };

function makeChart(id, type, labels, datasets, opts={}) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  if (chartRegistry[id]) chartRegistry[id].destroy();
  const noScales = type==='doughnut'||type==='pie'||type==='polarArea'||type==='radar';
  chartRegistry[id] = new Chart(ctx, {
    type,
    data: { labels, datasets },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins: {
        legend: { display:opts.legend||false, labels:{ color:CD.color, font:{family:CD.mono,size:11}, padding:14 } },
        tooltip: { backgroundColor:'#0a1628', titleColor:'#f0f4ff', bodyColor:'#8ba3c7', borderColor:'rgba(100,150,220,0.2)', borderWidth:1 },
      },
      scales: noScales ? {} : {
        x:{ ticks:{color:CD.color,font:{family:CD.mono,size:9},maxRotation:45}, grid:{color:CD.grid} },
        y:{ ticks:{color:CD.color,font:{family:CD.mono,size:9}}, grid:{color:CD.grid}, ...(opts.yMin!==undefined?{min:opts.yMin}:{}) }
      },
      indexAxis: opts.horizontal ? 'y' : 'x',
      ...( opts.extra||{} )
    }
  });
}

// ── KPI STRIP ────────────────────────────────────────────────
function renderStatOverview() {
  const players = getAllPlayers();
  const el = document.getElementById('stat-overview');
  if (!el) return;
  const kpis = [
    { icon:'🏆', label:'IPL Seasons', val:'18', sub:'2008 – 2026', c:'var(--accent-gold)' },
    { icon:'🏟️', label:'Total Matches', val:'1100+', sub:'All IPL seasons', c:'var(--accent-blue)' },
    { icon:'🏏', label:'All-Time Runs', val:'2,84,000+', sub:'Combined all seasons', c:'var(--accent-green)' },
    { icon:'🎯', label:'All-Time Wickets', val:'14,200+', sub:'Combined all seasons', c:'var(--accent-orange)' },
    { icon:'👥', label:'Teams 2026', val:'10', sub:'Tata IPL Season 19', c:'var(--accent-purple)' },
    { icon:'💰', label:'Total Prize Pool', val:'₹550 CR', sub:'IPL 2026 season', c:'var(--accent-gold)' },
    { icon:'🌍', label:'Nations', val:'8+', sub:'Countries represented', c:'var(--accent-blue)' },
    { icon:'⚡', label:'Highest Score', val:'175*', sub:'Chris Gayle, 2013', c:'var(--accent-red)' },
  ];
  el.innerHTML = kpis.map(k=>`
    <div class="stat-ov-card" style="border-color:${k.c}22">
      <div class="stat-ov-icon">${k.icon}</div>
      <div class="stat-ov-label">${k.label}</div>
      <div class="stat-ov-val" style="color:${k.c};font-size:1.3rem">${k.val}</div>
      <div class="stat-ov-sub">${k.sub}</div>
    </div>`).join('');
}

// ── STATS TAB SWITCHER ───────────────────────────────────────
let activeStatsTab = 'ipl';
function statsTab(tab, btn) {
  ['ipl','batting','bowling','teams','players'].forEach(t => {
    const el = document.getElementById('tab-'+t);
    if (el) el.style.display = t===tab ? 'block' : 'none';
  });
  document.querySelectorAll('#stats-tabs .mct-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  activeStatsTab = tab;
  setTimeout(() => renderTabCharts(tab), 80);
}

function renderStatsSection() {
  renderStatOverview();
  renderFullStatsTable();
  setTimeout(() => renderTabCharts('ipl'), 200);
}

function renderAllCharts() { renderTabCharts(activeStatsTab); }

function renderTabCharts(tab) {
  if (tab === 'ipl')     renderIPLCharts();
  if (tab === 'batting') renderBattingCharts();
  if (tab === 'bowling') renderBowlingCharts();
  if (tab === 'teams')   renderTeamCharts();
  if (tab === 'players') renderPlayersCharts();
}

// ── IPL SEASON CHARTS ────────────────────────────────────────
function renderIPLCharts() {
  const teams = Object.keys(IPL_REAL.titles);
  const titles = Object.values(IPL_REAL.titles);

  // Titles bar
  makeChart('chart-titles','bar', teams, [{
    label:'IPL Titles', data:titles,
    backgroundColor: teamBgs(teams), borderColor: teamBrds(teams),
    borderWidth:2, borderRadius:6
  }], { extra:{ plugins:{ legend:{display:false} }, scales:{ y:{ ticks:{stepSize:1,color:CD.color,font:{family:CD.mono,size:9}}, grid:{color:CD.grid} } } } });

  // Matches per season line
  makeChart('chart-seasons','line', IPL_REAL.seasons, [{
    label:'Matches', data:IPL_REAL.seasonMatches,
    borderColor:'#f0a500', backgroundColor:'rgba(240,165,0,0.08)',
    fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:'#f0a500'
  }], { extra:{ plugins:{ legend:{display:false} } } });

  // Points table 2026
  const pts = Object.entries(IPL_REAL.pts2026).sort((a,b)=>b[1]-a[1]);
  makeChart('chart-points','bar', pts.map(x=>x[0]), [{
    label:'Points', data:pts.map(x=>x[1]),
    backgroundColor: teamBgs(pts.map(x=>x[0])), borderColor: teamBrds(pts.map(x=>x[0])),
    borderWidth:2, borderRadius:6
  }], { horizontal:true, extra:{ indexAxis:'y', plugins:{ legend:{display:false} } } });

  // Venues
  const vens = Object.entries(IPL_REAL.venues).sort((a,b)=>b[1]-a[1]).slice(0,8);
  makeChart('chart-venues','bar', vens.map(x=>x[0].split(',')[0]), [{
    label:'Matches Hosted', data:vens.map(x=>x[1]),
    backgroundColor:'rgba(14,165,233,0.7)', borderColor:'#0ea5e9', borderWidth:1, borderRadius:4
  }], {});

  // Auction records
  const auctions = Object.entries(IPL_REAL.auctionRecords).sort((a,b)=>b[1]-a[1]);
  makeChart('chart-auction','bar', auctions.map(x=>x[0].split(' ').pop()), [{
    label:'₹ Crore', data:auctions.map(x=>x[1]),
    backgroundColor: auctions.map((_,i)=>`hsla(${40+i*18},85%,55%,0.8)`),
    borderColor: auctions.map((_,i)=>`hsl(${40+i*18},85%,62%)`),
    borderWidth:1, borderRadius:5
  }], {});

  // Season runs line
  makeChart('chart-season-runs','line', IPL_REAL.seasons, [{
    label:'Total Runs', data:IPL_REAL.seasonRuns,
    borderColor:'#00d97e', backgroundColor:'rgba(0,217,126,0.07)',
    fill:true, tension:0.4, pointRadius:5, pointBackgroundColor:'#00d97e'
  }], { extra:{ plugins:{ legend:{display:false} } } });

  // Orange Cap (most runs per season, winner)
  const orangeCapData = {
    seasons: ['2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'],
    players: ['SE Marsh','Brown','Tendulkar','Kohli','Gayle','Warner','Warner','Warner','Kohli','Warner','Williamson','Bairstow','Padikkal','du Plessis','Buttler','Shubman Gill','Virat Kohli'],
    runs:    [616,572,618,557,733,562,529,562,973,641,735,692,473,633,863,890,741]
  };
  makeChart('chart-orange-cap','bar', orangeCapData.seasons, [{
    label:'Runs', data:orangeCapData.runs,
    backgroundColor: orangeCapData.runs.map((_,i)=>`hsla(${28+i*3},90%,52%,0.8)`),
    borderColor:'#f0a500', borderWidth:1, borderRadius:4
  }], { extra:{ plugins:{ legend:{display:false}, tooltip:{ callbacks:{ title:(i)=>orangeCapData.seasons[i[0].dataIndex], label:(i)=>`${orangeCapData.players[i.dataIndex]}: ${i.raw} runs` } } } } });

  // Purple Cap (most wickets per season)
  const purpleCapData = {
    seasons: ['2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'],
    players: ['Sohail Tanvir','RP Singh','Praveen Kumar','Malinga','Morne Morkel','Dwayne Bravo','Mohit Sharma','Dwayne Bravo','Bhuvneshwar','Bhuvneshwar','Andrew Tye','Imran Tahir','Kagiso Rabada','Harshal Patel','Yuzvendra Chahal','Mohammed Shami','Harshal Patel'],
    wkts: [22,23,21,28,25,32,23,26,23,26,24,26,30,32,27,28,24]
  };
  makeChart('chart-purple-cap','bar', purpleCapData.seasons, [{
    label:'Wickets', data:purpleCapData.wkts,
    backgroundColor: purpleCapData.wkts.map((_,i)=>`hsla(${270+i*3},75%,55%,0.8)`),
    borderColor:'#a855f7', borderWidth:1, borderRadius:4
  }], { extra:{ plugins:{ legend:{display:false}, tooltip:{ callbacks:{ title:(i)=>purpleCapData.seasons[i[0].dataIndex], label:(i)=>`${purpleCapData.players[i.dataIndex]}: ${i.raw} wickets` } } } } });

  // Average run rate per over by season
  const runRates = [7.8,8.2,7.9,8.4,8.6,8.3,8.7,8.5,8.8,8.3,8.4,8.7,8.1,8.6,9.2,9.4,9.1];
  makeChart('chart-run-rate','line', IPL_REAL.seasons, [{
    label:'Runs/Over', data:runRates,
    borderColor:'#00d97e', backgroundColor:'rgba(0,217,126,0.06)',
    fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:'#00d97e',
    pointHoverRadius:7
  }], { yMin:7, extra:{ plugins:{ legend:{display:false} } } });
  // Win % polar area
  const wpTeams = Object.keys(IPL_REAL.winPct);
  makeChart('chart-win-pct','polarArea', wpTeams, [{
    data:Object.values(IPL_REAL.winPct),
    backgroundColor: teamBgs(wpTeams), borderColor: teamBrds(wpTeams), borderWidth:1
  }], { legend:true, extra:{ plugins:{ legend:{ display:true, labels:{ color:CD.color, font:{size:10,family:CD.mono}, padding:10 } } } } });
}

// ── BATTING CHARTS ────────────────────────────────────────────
function renderBattingCharts() {
  const players = getAllPlayers();

  // IPL run scorers (real data)
  const iplRunners = Object.entries(IPL_REAL.iplRunScorers).sort((a,b)=>b[1]-a[1]);
  makeChart('chart-ipl-runs','bar', iplRunners.map(x=>x[0].split(' ').pop()), [{
    label:'IPL Runs', data:iplRunners.map(x=>x[1]),
    backgroundColor: iplRunners.map((_,i)=>`hsla(${35+i*14},90%,55%,0.8)`),
    borderColor: iplRunners.map((_,i)=>`hsl(${35+i*14},90%,62%)`),
    borderWidth:1, borderRadius:5
  }], {});

  // Batting average leaders
  const avgL = [...players].filter(p=>(p.batting?.avg||0)>30&&(p.batting?.matches||0)>20)
    .sort((a,b)=>b.batting.avg-a.batting.avg).slice(0,8);
  makeChart('chart-avg','bar', avgL.map(p=>p.name.split(' ').pop()), [{
    label:'Average', data:avgL.map(p=>p.batting.avg),
    backgroundColor:'rgba(0,217,126,0.75)', borderColor:'#00d97e', borderWidth:1, borderRadius:5
  }], {});

  // Strike rates
  const srTeams = Object.entries(IPL_REAL.strikeRates).sort((a,b)=>b[1]-a[1]);
  makeChart('chart-sr','bar', srTeams.map(x=>x[0].split(' ').pop()), [{
    label:'Strike Rate', data:srTeams.map(x=>x[1]),
    backgroundColor:'rgba(168,85,247,0.75)', borderColor:'#a855f7', borderWidth:1, borderRadius:5
  }], { yMin:100 });

  // IPL 100s
  const ipl100s = [...players].filter(p=>(p.ipl?.hundreds||0)>0).sort((a,b)=>(b.ipl?.hundreds||0)-(a.ipl?.hundreds||0)).slice(0,8);
  makeChart('chart-ipl-100s','bar', ipl100s.map(p=>p.name.split(' ').pop()), [{
    label:'100s', data:ipl100s.map(p=>p.ipl?.hundreds||0),
    backgroundColor:'rgba(240,165,0,0.8)', borderColor:'#f0a500', borderWidth:1, borderRadius:5
  }], {});

  // Highest scores doughnut
  const hs = Object.entries(IPL_REAL.highestScores).slice(0,6);
  makeChart('chart-hs','doughnut', hs.map(x=>x[0].split('(')[0].trim()), [{
    data:hs.map(x=>x[1]),
    backgroundColor:['rgba(240,165,0,0.8)','rgba(0,217,126,0.8)','rgba(14,165,233,0.8)','rgba(232,93,4,0.8)','rgba(168,85,247,0.8)','rgba(255,31,61,0.8)'],
    borderColor:'#0a1628', borderWidth:2
  }], { legend:true });

  // ODI run scorers
  const odiBat = [...players].sort((a,b)=>(b.batting?.runs||0)-(a.batting?.runs||0)).slice(0,10);
  makeChart('chart-runs','bar', odiBat.map(p=>p.name.split(' ').pop()), [{
    label:'ODI Runs', data:odiBat.map(p=>p.batting?.runs||0),
    backgroundColor: odiBat.map((_,i)=>`hsla(${40+i*14},85%,55%,0.8)`),
    borderColor: odiBat.map((_,i)=>`hsl(${40+i*14},85%,62%)`),
    borderWidth:1, borderRadius:5
  }], {});

  // Centuries by country
  const cbc = {}; players.forEach(p=>{ if((p.batting?.centuries||0)>0) cbc[p.country]=(cbc[p.country]||0)+(p.batting.centuries||0); });
  const sortedCents = Object.entries(cbc).sort((a,b)=>b[1]-a[1]);
  makeChart('chart-centuries','bar', sortedCents.map(c=>c[0]), [{
    label:'Centuries', data:sortedCents.map(c=>c[1]),
    backgroundColor:'rgba(240,165,0,0.75)', borderColor:'#f0a500', borderWidth:1, borderRadius:5
  }], {});
}

// ── BOWLING CHARTS ────────────────────────────────────────────
function renderBowlingCharts() {
  const players = getAllPlayers();

  // IPL wicket takers horizontal bar
  const iplWkts = Object.entries(IPL_REAL.iplWktTakers).sort((a,b)=>b[1]-a[1]);
  makeChart('chart-ipl-wkts','bar', iplWkts.map(x=>x[0].split(' ').pop()), [{
    label:'IPL Wickets', data:iplWkts.map(x=>x[1]),
    backgroundColor:'rgba(232,93,4,0.8)', borderColor:'#e85d04', borderWidth:1, borderRadius:5
  }], { horizontal:true, extra:{ indexAxis:'y', plugins:{ legend:{display:false} } } });

  // Economy pie
  const eco = Object.entries(IPL_REAL.economy).sort((a,b)=>a[1]-b[1]);
  makeChart('chart-economy','bar', eco.map(x=>x[0].split(' ').pop()), [{
    label:'Economy', data:eco.map(x=>x[1]),
    backgroundColor: eco.map((_,i)=>`hsla(${160+i*18},70%,48%,0.8)`),
    borderColor: eco.map((_,i)=>`hsl(${160+i*18},70%,56%)`),
    borderWidth:1, borderRadius:5
  }], { yMin:5 });

  // ODI wickets
  const odiWkts = [...players].filter(p=>p.bowling?.wickets>0).sort((a,b)=>b.bowling.wickets-a.bowling.wickets).slice(0,8);
  makeChart('chart-wickets','bar', odiWkts.map(p=>p.name.split(' ').pop()), [{
    label:'ODI Wickets', data:odiWkts.map(p=>p.bowling.wickets),
    backgroundColor:'rgba(255,31,61,0.7)', borderColor:'#ff1f3d', borderWidth:1, borderRadius:5
  }], {});

  // Bowling types pie
  const bt = Object.entries(IPL_REAL.bowlTypes);
  makeChart('chart-bowl-types','pie', bt.map(x=>x[0]), [{
    data:bt.map(x=>x[1]),
    backgroundColor:['rgba(14,165,233,0.8)','rgba(0,217,126,0.8)','rgba(240,165,0,0.8)','rgba(232,93,4,0.8)','rgba(168,85,247,0.8)','rgba(255,31,61,0.8)'],
    borderColor:'#0a1628', borderWidth:2
  }], { legend:true });

  // Speed guns bar
  const speeds = Object.entries(IPL_REAL.speedGuns).sort((a,b)=>b[1]-a[1]);
  makeChart('chart-speed','bar', speeds.map(x=>x[0].split(' ')[0]), [{
    label:'Speed (km/h)', data:speeds.map(x=>x[1]),
    backgroundColor: speeds.map((_,i)=>`hsla(${0+i*20},80%,55%,0.8)`),
    borderColor: speeds.map((_,i)=>`hsl(${0+i*20},80%,62%)`),
    borderWidth:1, borderRadius:5
  }], { yMin:140 });
}

// ── TEAM CHARTS ───────────────────────────────────────────────
function renderTeamCharts() {
  const teams = Object.keys(IPL_REAL.totalMatches);

  // Total matches bar
  makeChart('chart-team-matches','bar', teams, [{
    label:'Matches Played', data:Object.values(IPL_REAL.totalMatches),
    backgroundColor: teamBgs(teams), borderColor: teamBrds(teams), borderWidth:2, borderRadius:6
  }], {});

  // Trophies pie
  const trophyTeams = Object.entries(IPL_REAL.titles).filter(x=>x[1]>0);
  makeChart('chart-trophies-pie','doughnut', trophyTeams.map(x=>x[0]), [{
    data:trophyTeams.map(x=>x[1]),
    backgroundColor: teamBgs(trophyTeams.map(x=>x[0])),
    borderColor: teamBrds(trophyTeams.map(x=>x[0])), borderWidth:2
  }], { legend:true });

  // Wins vs Losses grouped bar
  const wlTeams = Object.keys(IPL_REAL.wins);
  const losses = wlTeams.map(t => (IPL_REAL.totalMatches[t]||0) - (IPL_REAL.wins[t]||0));
  makeChart('chart-wl','bar', wlTeams, [
    { label:'Wins', data:Object.values(IPL_REAL.wins), backgroundColor:'rgba(0,217,126,0.7)', borderColor:'#00d97e', borderWidth:1, borderRadius:4 },
    { label:'Losses', data:losses, backgroundColor:'rgba(255,31,61,0.6)', borderColor:'#ff1f3d', borderWidth:1, borderRadius:4 }
  ], { extra:{ plugins:{ legend:{ display:true, labels:{ color:CD.color, font:{size:10,family:CD.mono} } } } } });

  // Salary cap
  const sal = Object.entries(IPL_REAL.salary2026).sort((a,b)=>b[1]-a[1]);
  makeChart('chart-salary','bar', sal.map(x=>x[0]), [{
    label:'₹ Crore', data:sal.map(x=>x[1]),
    backgroundColor: teamBgs(sal.map(x=>x[0])), borderColor: teamBrds(sal.map(x=>x[0])),
    borderWidth:2, borderRadius:5
  }], { yMin:75 });

  // Ground capacity
  const cap = Object.entries(IPL_REAL.groundCapacity).sort((a,b)=>b[1]-a[1]);
  makeChart('chart-capacity','bar', cap.map(x=>x[0].split('\n')[0]), [{
    label:'Capacity', data:cap.map(x=>x[1]),
    backgroundColor: cap.map((_,i)=>`hsla(${210+i*20},65%,50%,0.75)`),
    borderColor: cap.map((_,i)=>`hsl(${210+i*20},65%,58%)`),
    borderWidth:1, borderRadius:5
  }], {});

  // Team runs 2026
  const tr = Object.entries(IPL_REAL.teamRuns2026).sort((a,b)=>b[1]-a[1]);
  makeChart('chart-team-runs-2026','bar', tr.map(x=>x[0]), [{
    label:'Runs Scored', data:tr.map(x=>x[1]),
    backgroundColor: teamBgs(tr.map(x=>x[0])), borderColor: teamBrds(tr.map(x=>x[0])),
    borderWidth:2, borderRadius:6
  }], {});

  // NRR
  const nrr = Object.entries(IPL_REAL.nrr2026).sort((a,b)=>b[1]-a[1]);
  makeChart('chart-nrr','bar', nrr.map(x=>x[0]), [{
    label:'NRR', data:nrr.map(x=>x[1]),
    backgroundColor: nrr.map(x=>x[1]>=0?'rgba(0,217,126,0.75)':'rgba(255,31,61,0.65)'),
    borderColor: nrr.map(x=>x[1]>=0?'#00d97e':'#ff1f3d'),
    borderWidth:1, borderRadius:5
  }], {});
}

// ── PLAYERS DB CHARTS ─────────────────────────────────────────
function renderPlayersCharts() {
  const players = getAllPlayers();

  // Nationality
  const nations = {}; players.forEach(p => nations[p.country]=(nations[p.country]||0)+1);
  const sortedN = Object.entries(nations).sort((a,b)=>b[1]-a[1]);
  makeChart('chart-nations','bar', sortedN.map(n=>n[0]), [{
    label:'Players', data:sortedN.map(n=>n[1]),
    backgroundColor: sortedN.map((_,i)=>`hsla(${200+i*22},65%,52%,0.8)`),
    borderColor: sortedN.map((_,i)=>`hsl(${200+i*22},65%,60%)`),
    borderWidth:1, borderRadius:5
  }], {});

  // Roles doughnut
  const roles = {}; players.forEach(p => roles[p.role]=(roles[p.role]||0)+1);
  makeChart('chart-roles','doughnut', Object.keys(roles), [{
    data:Object.values(roles),
    backgroundColor:['rgba(14,165,233,0.85)','rgba(232,93,4,0.85)','rgba(0,217,126,0.85)','rgba(168,85,247,0.85)'],
    borderColor:'#0a1628', borderWidth:2
  }], { legend:true });

  renderFullStatsTable();
}

// ── FULL STATS TABLE ─────────────────────────────────────────
function renderFullStatsTable() {
  const tbody = document.getElementById('stats-table-body');
  if (!tbody) return;
  const sorted = [...getAllPlayers()].sort((a,b)=>(b.batting?.runs||0)-(a.batting?.runs||0));
  tbody.innerHTML = sorted.map((p, i) => `
    <tr onclick="openPlayerModal(${p.id})" style="cursor:pointer">
      <td style="font-family:Space Mono,monospace;color:var(--text-muted);font-size:0.8rem">${i+1}</td>
      <td><div style="display:flex;align-items:center;gap:8px"><img src="${p.img||''}" style="width:28px;height:28px;border-radius:50%;object-fit:cover" onerror="this.style.display='none'"><span style="font-weight:600">${p.name}</span></div></td>
      <td>${p.flag} ${p.country}</td>
      <td><span class="pc-role-badge ${roleClass(p.role)}">${p.role.slice(0,4)}</span></td>
      <td class="mono-val">${p.batting?.matches||0}</td>
      <td class="mono-val highlight-val">${(p.batting?.runs||0).toLocaleString()}</td>
      <td class="mono-val">${p.batting?.avg||'—'}</td>
      <td class="mono-val">${p.batting?.sr||'—'}</td>
      <td class="mono-val">${p.batting?.hs||'—'}</td>
      <td class="mono-val" style="color:var(--accent-green)">${p.batting?.centuries||0}</td>
      <td class="mono-val">${p.batting?.fifties||0}</td>
      <td class="mono-val" style="color:var(--accent-gold)">${(p.ipl?.runs||0).toLocaleString()}</td>
      <td>${p.iplTeam?`<span style="font-family:Space Mono,monospace;font-size:0.72rem;color:var(--accent-gold)">${p.iplTeam}</span>`:'—'}</td>
    </tr>`).join('');
}

// ============================================================
// COMPARE
// ============================================================
function renderCompareDropdowns() {
  const players = getAllPlayers();
  const opts = players.map(p => `<option value="${p.id}">${p.name} (${p.country})</option>`).join('');
  const el1 = document.getElementById('compare-p1');
  const el2 = document.getElementById('compare-p2');
  if (el1) el1.innerHTML = `<option value="">— Select Player —</option>${opts}`;
  if (el2) el2.innerHTML = `<option value="">— Select Player —</option>${opts}`;
}

function updateCompare() {
  const id1 = parseInt(document.getElementById('compare-p1')?.value);
  const id2 = parseInt(document.getElementById('compare-p2')?.value);
  const result = document.getElementById('compare-result');
  if (!result) return;
  if (!id1 || !id2) { result.innerHTML = ''; return; }

  const p1 = getAllPlayers().find(x => x.id === id1);
  const p2 = getAllPlayers().find(x => x.id === id2);
  if (!p1 || !p2) return;

  const fields = [
    { label:'ODI Runs', key:p=>(p.batting?.runs||0) },
    { label:'Average', key:p=>(p.batting?.avg||0) },
    { label:'Centuries', key:p=>(p.batting?.centuries||0) },
    { label:'Fifties', key:p=>(p.batting?.fifties||0) },
    { label:'Wickets', key:p=>(p.bowling?.wickets||0) },
    { label:'IPL Runs', key:p=>(p.ipl?.runs||0) },
    { label:'IPL 100s', key:p=>(p.ipl?.hundreds||0) },
    { label:'Strike Rate', key:p=>(p.batting?.sr||0) },
  ];

  const statsHTML = (p, other) => fields.map(f => {
    const v = f.key(p), ov = f.key(other);
    const win = v > ov;
    return `<div class="cp-stat"><div class="cp-stat-label">${f.label}</div><div class="cp-stat-val ${win?'winner':''}">${typeof v==='number'?v.toLocaleString():v}</div></div>`;
  }).join('');

  result.innerHTML = `
    <div class="compare-panels">
      <div class="compare-panel">
        <div class="cp-header">
          <div class="cp-avatar">
            <img src="${p1.img||''}" style="width:64px;height:64px;border-radius:50%;object-fit:cover" onerror="this.outerHTML='<div style=\\'width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#0d1e35,#1c3a5a);display:flex;align-items:center;justify-content:center;font-family:Oswald;font-weight:700\\'>${p1.initials}</div>'">
          </div>
          <div>
            <div class="cp-name">${p1.name}</div>
            <div class="cp-meta">${p1.flag} ${p1.country} · ${p1.role}</div>
          </div>
        </div>
        <div class="cp-stats-grid">${statsHTML(p1, p2)}</div>
      </div>
      <div class="compare-panel">
        <div class="cp-header">
          <div class="cp-avatar">
            <img src="${p2.img||''}" style="width:64px;height:64px;border-radius:50%;object-fit:cover" onerror="this.outerHTML='<div style=\\'width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#1c3a5a,#0d1e35);display:flex;align-items:center;justify-content:center;font-family:Oswald;font-weight:700\\'>${p2.initials}</div>'">
          </div>
          <div>
            <div class="cp-name">${p2.name}</div>
            <div class="cp-meta">${p2.flag} ${p2.country} · ${p2.role}</div>
          </div>
        </div>
        <div class="cp-stats-grid">${statsHTML(p2, p1)}</div>
      </div>
    </div>
    <div class="compare-chart-card">
      <div class="compare-chart-title">📈 HEAD-TO-HEAD: YEARLY RUNS COMPARISON</div>
      <div class="compare-chart-box"><canvas id="compare-chart"></canvas></div>
    </div>
  `;

  setTimeout(() => {
    const ctx = document.getElementById('compare-chart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: p1.years || [2017,2018,2019,2020,2021,2022,2023,2024],
        datasets: [
          {
            label: p1.name,
            data: p1.yearlyRuns || Array(8).fill(0),
            borderColor: '#f0a500',
            backgroundColor: 'rgba(240,165,0,0.06)',
            fill: true, tension: 0.4,
            pointBackgroundColor: '#f0a500', pointRadius: 5
          },
          {
            label: p2.name,
            data: p2.yearlyRuns || Array(8).fill(0),
            borderColor: '#0ea5e9',
            backgroundColor: 'rgba(14,165,233,0.06)',
            fill: true, tension: 0.4,
            pointBackgroundColor: '#0ea5e9', pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: true, labels: { color:'#8ba3c7', font:{family:'Space Mono',size:11} } } },
        scales: {
          x: { ticks:{color:'#4a6584',font:{family:'Space Mono',size:10}}, grid:{color:'rgba(100,150,220,0.05)'} },
          y: { ticks:{color:'#4a6584',font:{family:'Space Mono',size:10}}, grid:{color:'rgba(100,150,220,0.05)'} }
        }
      }
    });
  }, 100);
}

// keyboard shortcut to close modals
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closePlayerModalDirect();
    closeAddModalDirect();
  }
});
