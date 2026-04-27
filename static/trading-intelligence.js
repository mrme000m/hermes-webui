/**
 * Trading Intelligence — MCP-powered Market Intelligence Panel
 * Dedicated UI for the trading-intelligence MCP server tools
 * Version: 1.0.0
 */

/* ─────────────────────────  CONFIG  ───────────────────────── */

const TI_PRESETS = {
  intel: [
    { label: 'Daily Briefing', icon: '📰', desc: 'Market briefing for symbol', prompt: 'Use the trading-intelligence MCP server to run daily_briefing for {symbol}. Focus on key levels, macro drivers, and session outlook. Mode: {mode}.' },
    { label: 'Deep Research', icon: '🔬', desc: 'Thematic deep-dive research', prompt: 'Use the trading-intelligence MCP server to run deep_research for {symbol}. Investigate the current macro narrative, institutional positioning, and structural bias. Mode: {mode}.' },
    { label: 'Get Context', icon: '📚', desc: 'Accumulated knowledge base', prompt: 'Use the trading-intelligence MCP server to run get_context for {symbol}. Summarize stored analyses, briefings, and validations. Mode: {mode}.' },
    { label: 'Finance Quote', icon: '💵', desc: 'Real-time quote + OHLCV', prompt: 'Use the trading-intelligence MCP server to run finance_quote for {symbol}.' },
  ],
  signal: [
    { label: 'Validate Signal', icon: '✅', desc: 'Confirm / reject / caution', prompt: 'Use the trading-intelligence MCP server to run validate_signal for {symbol} with direction {direction}{prices}. Evaluate confluence, risk/reward, and timing. Mode: {mode}.' },
    { label: 'Validate & Prepare Order', icon: '📋', desc: 'Validation + cTrader payload', prompt: 'Use the trading-intelligence MCP server to run validate_and_prepare_order for {symbol} with direction {direction}{prices}. Return the execution-ready verdict and cTrader order payload. Mode: {mode}.' },
    { label: 'Validate from Snapshot', icon: '📸', desc: 'Validate with live snapshot', prompt: 'Use the trading-intelligence MCP server to run validate_and_prepare_order_from_snapshot for {symbol} with direction {direction}{prices}. Use the current market snapshot for freshness. Mode: {mode}.' },
  ],
  kb: [
    { label: 'List Spaces', icon: '🗂️', desc: 'All instrument Spaces', prompt: 'Use the trading-intelligence MCP server to run list_spaces. Show all managed instrument Spaces and their status.' },
    { label: 'Space Status', icon: '📊', desc: 'Files, threads, health', prompt: 'Use the trading-intelligence MCP server to run space_status for {symbol}.' },
    { label: 'List Threads', icon: '🧵', desc: 'Research threads in Space', prompt: 'Use the trading-intelligence MCP server to run list_threads for {symbol}.' },
    { label: 'List Files', icon: '📁', desc: 'Files in instrument Space', prompt: 'Use the trading-intelligence MCP server to run list_files for {symbol}.' },
    { label: 'Health Check', icon: '💓', desc: 'Server + Perplexity status', prompt: 'Use the trading-intelligence MCP server to run health. Report server health and Perplexity connectivity.' },
  ]
};

let _tiSymbol = 'XAUUSD';
let _tiDirection = 'buy';
let _tiEntry = '';
let _tiStop = '';
let _tiTarget = '';
let _tiMode = 'auto';
let _tiBackendUuid = '';
let _tiPanelOpen = false;
let _tiActiveTab = 'intel';

/* ─────────────────────────  COMPOSER BRIDGE  ───────────────────────── */

function _tiSetComposer(text) {
  const msgInput = document.getElementById('msg');
  if (!msgInput) return false;
  msgInput.value = String(text ?? '');
  msgInput.dispatchEvent(new Event('input', { bubbles: true }));
  if (typeof autoResize === 'function') autoResize();
  msgInput.focus();
  return true;
}

/* ─────────────────────────  INIT  ───────────────────────── */

function initTradingIntelligence() {
  console.log('[TradingIntelligence] v1.0 — initializing');
  _tiLoadState();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _tiBuildUI);
  } else {
    _tiBuildUI();
  }
}

function _tiLoadState() {
  try {
    const s = localStorage.getItem('ti-state');
    if (s) {
      const st = JSON.parse(s);
      if (st.symbol) _tiSymbol = st.symbol;
      if (st.direction) _tiDirection = st.direction;
      if (st.entry != null) _tiEntry = st.entry;
      if (st.stop != null) _tiStop = st.stop;
      if (st.target != null) _tiTarget = st.target;
      if (st.mode) _tiMode = st.mode;
      if (st.backendUuid != null) _tiBackendUuid = st.backendUuid;
    }
  } catch (e) { /* ignore */ }
  // Sync with workspace active symbol if available
  if (typeof getWorkspaceActiveSymbol === 'function') {
    const wsSym = getWorkspaceActiveSymbol();
    if (wsSym) _tiSymbol = wsSym;
  }
}

function _tiSaveState() {
  try {
    localStorage.setItem('ti-state', JSON.stringify({
      symbol: _tiSymbol, direction: _tiDirection, entry: _tiEntry,
      stop: _tiStop, target: _tiTarget, mode: _tiMode, backendUuid: _tiBackendUuid
    }));
  } catch (e) { /* ignore */ }
}

/* ─────────────────────────  BUILD UI  ───────────────────────── */

function _tiBuildUI() {
  _tiBuildPanel();
  _tiBuildToggle();
}

function _tiBuildPanel() {
  if (document.getElementById('tiPanel')) return;
  const panel = document.createElement('div');
  panel.id = 'tiPanel';
  panel.className = 'ti-panel collapsed';
  panel.innerHTML = `
    <div class="ti-header">
      <div class="ti-title">🧠 Trading Intelligence</div>
      <button class="ti-close" onclick="toggleTradingIntelligence()" title="Close">✕</button>
    </div>
    <div class="ti-body" id="tiBody">
      <!-- Symbol + Direction -->
      <div class="ti-row" style="margin-bottom:10px">
        <div class="ti-field" style="margin-bottom:0">
          <label>Symbol</label>
          <input type="text" id="tiSymbol" value="${_tiSymbol}" placeholder="XAUUSD" oninput="_tiOnChange()">
        </div>
        <div class="ti-field" style="margin-bottom:0">
          <label>Direction</label>
          <div class="ti-dir-toggle">
            <button class="ti-dir-btn buy ${_tiDirection === 'buy' ? 'active' : ''}" onclick="_tiSetDir('buy')">BUY</button>
            <button class="ti-dir-btn sell ${_tiDirection === 'sell' ? 'active' : ''}" onclick="_tiSetDir('sell')">SELL</button>
          </div>
        </div>
      </div>
      <!-- Prices -->
      <div class="ti-row" style="margin-bottom:10px">
        <div class="ti-field" style="margin-bottom:0">
          <label>Entry</label>
          <input type="number" step="any" id="tiEntry" value="${_tiEntry}" placeholder="0.00" oninput="_tiOnChange()">
        </div>
        <div class="ti-field" style="margin-bottom:0">
          <label>Stop Loss</label>
          <input type="number" step="any" id="tiStop" value="${_tiStop}" placeholder="0.00" oninput="_tiOnChange()">
        </div>
      </div>
      <div class="ti-row" style="margin-bottom:10px">
        <div class="ti-field" style="margin-bottom:0">
          <label>Take Profit</label>
          <input type="number" step="any" id="tiTarget" value="${_tiTarget}" placeholder="0.00" oninput="_tiOnChange()">
        </div>
        <div class="ti-field" style="margin-bottom:0">
          <label>Mode</label>
          <select id="tiMode" onchange="_tiOnChange()">
            <option value="auto" ${_tiMode === 'auto' ? 'selected' : ''}>auto (fast)</option>
            <option value="pro" ${_tiMode === 'pro' ? 'selected' : ''}>pro (deep)</option>
            <option value="reasoning" ${_tiMode === 'reasoning' ? 'selected' : ''}>reasoning</option>
          </select>
        </div>
      </div>
      <!-- Follow-up -->
      <div class="ti-followup">
        <div class="ti-field" style="margin-bottom:0">
          <label>Follow-up UUID (optional)</label>
          <input type="text" id="tiBackendUuid" value="${_tiBackendUuid}" placeholder="Paste backend_uuid to continue a thread" oninput="_tiOnChange()">
        </div>
      </div>
      <!-- Tabs -->
      <div class="ti-tabs" style="margin-top:12px">
        <button class="ti-tab ${_tiActiveTab === 'intel' ? 'active' : ''}" onclick="_tiSwitchTab('intel')">📰 Intel</button>
        <button class="ti-tab ${_tiActiveTab === 'signal' ? 'active' : ''}" onclick="_tiSwitchTab('signal')">📡 Signal</button>
        <button class="ti-tab ${_tiActiveTab === 'kb' ? 'active' : ''}" onclick="_tiSwitchTab('kb')">🗂️ KB</button>
      </div>
      <!-- Panes -->
      <div class="ti-pane ${_tiActiveTab === 'intel' ? 'active' : ''}" data-tab="intel" id="tiPaneIntel"></div>
      <div class="ti-pane ${_tiActiveTab === 'signal' ? 'active' : ''}" data-tab="signal" id="tiPaneSignal"></div>
      <div class="ti-pane ${_tiActiveTab === 'kb' ? 'active' : ''}" data-tab="kb" id="tiPaneKb"></div>
    </div>
  `;
  document.body.appendChild(panel);
  _tiRenderPanes();
}

function _tiBuildToggle() {
  if (document.getElementById('tiToggleBtn')) return;
  const btn = document.createElement('button');
  btn.id = 'tiToggleBtn';
  btn.className = 'ti-toggle-btn pulse';
  btn.title = 'Trading Intelligence';
  btn.innerHTML = '🧠';
  btn.onclick = toggleTradingIntelligence;
  document.body.appendChild(btn);
}

/* ─────────────────────────  RENDER  ───────────────────────── */

function _tiRenderPanes() {
  _tiRenderPane('intel', TI_PRESETS.intel);
  _tiRenderPane('signal', TI_PRESETS.signal);
  _tiRenderPane('kb', TI_PRESETS.kb);
}

function _tiRenderPane(tab, presets) {
  const pane = document.getElementById('tiPane' + tab[0].toUpperCase() + tab.slice(1));
  if (!pane) return;
  pane.innerHTML = presets.map(p => `
    <div class="ti-preset-card" onclick="_tiRunPreset('${tab}', '${esc(p.label)}')">
      <div class="ti-preset-label">${p.icon} ${esc(p.label)}</div>
      <div class="ti-preset-desc">${esc(p.desc)}</div>
    </div>
  `).join('');
}

/* ─────────────────────────  INTERACTION  ───────────────────────── */

function _tiOnChange() {
  const symEl = document.getElementById('tiSymbol');
  const entryEl = document.getElementById('tiEntry');
  const stopEl = document.getElementById('tiStop');
  const targetEl = document.getElementById('tiTarget');
  const modeEl = document.getElementById('tiMode');
  const uuidEl = document.getElementById('tiBackendUuid');
  if (symEl) {
    const val = symEl.value.trim().toUpperCase();
    // If workspace has a single-symbol scope, force that symbol
    const scope = (typeof getWorkspaceSymbolScope === 'function') ? getWorkspaceSymbolScope() : null;
    if (scope && scope.type === 'single' && scope.symbols && scope.symbols.length === 1) {
      _tiSymbol = scope.symbols[0];
      symEl.value = _tiSymbol;
    } else {
      _tiSymbol = val || 'XAUUSD';
    }
  }
  if (entryEl) _tiEntry = entryEl.value;
  if (stopEl) _tiStop = stopEl.value;
  if (targetEl) _tiTarget = targetEl.value;
  if (modeEl) _tiMode = modeEl.value;
  if (uuidEl) _tiBackendUuid = uuidEl.value.trim();
  _tiSaveState();
}

function _tiSetDir(dir) {
  _tiDirection = dir;
  document.querySelectorAll('.ti-dir-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector('.ti-dir-btn.' + dir);
  if (btn) btn.classList.add('active');
  _tiSaveState();
}

function _tiSwitchTab(tab) {
  _tiActiveTab = tab;
  document.querySelectorAll('.ti-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.ti-pane').forEach(p => p.classList.remove('active'));
  const tabs = ['intel', 'signal', 'kb'];
  const idx = tabs.indexOf(tab);
  const allTabs = document.querySelectorAll('.ti-tab');
  if (allTabs[idx]) allTabs[idx].classList.add('active');
  const pane = document.getElementById('tiPane' + tab[0].toUpperCase() + tab.slice(1));
  if (pane) pane.classList.add('active');
}

function toggleTradingIntelligence() {
  _tiPanelOpen = !_tiPanelOpen;
  const panel = document.getElementById('tiPanel');
  const btn = document.getElementById('tiToggleBtn');
  if (panel) panel.classList.toggle('collapsed', !_tiPanelOpen);
  if (btn) {
    btn.classList.toggle('pulse', !_tiPanelOpen);
    btn.innerHTML = _tiPanelOpen ? '✕' : '🧠';
  }
}

function closeTradingIntelligence() {
  if (!_tiPanelOpen) return;
  const panel = document.getElementById('tiPanel');
  const btn = document.getElementById('tiToggleBtn');
  if (panel) panel.classList.add('collapsed');
  if (btn) {
    btn.classList.add('pulse');
    btn.innerHTML = '🧠';
  }
  _tiPanelOpen = false;
}

/* ─────────────────────────  PRESET RUNNER  ───────────────────────── */

function _tiRunPreset(tab, label) {
  const presets = TI_PRESETS[tab];
  const preset = presets.find(p => p.label === label);
  if (!preset) return;

  // Sync symbol with workspace scope before running
  const wsSym = (typeof getWorkspaceActiveSymbol === 'function') ? getWorkspaceActiveSymbol() : null;
  const sym = wsSym || _tiSymbol;

  let prices = '';
  if (_tiEntry) prices += `, entry_price: ${_tiEntry}`;
  if (_tiStop) prices += `, stop_loss: ${_tiStop}`;
  if (_tiTarget) prices += `, take_profit: ${_tiTarget}`;

  let prompt = preset.prompt
    .replace(/\{symbol\}/g, sym)
    .replace(/\{direction\}/g, _tiDirection)
    .replace(/\{prices\}/g, prices)
    .replace(/\{mode\}/g, _tiMode);

  if (_tiBackendUuid && (tab === 'intel' || tab === 'signal')) {
    prompt += `\n\nUse follow_up with backend_uuid: ${_tiBackendUuid} to continue the previous research thread.`;
  }

  _tiSetComposer(prompt.trim());
  closeTradingIntelligence();
  if (typeof closeTradingPanel === 'function') closeTradingPanel();
  showToast(`🧠 ${preset.label} preset loaded`, 2000);
}

/* ─────────────────────────  BOOT  ───────────────────────── */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTradingIntelligence);
} else {
  initTradingIntelligence();
}
