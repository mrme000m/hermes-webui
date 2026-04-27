/**
 * Trading Pro — Agentic Trading UX for Hermes WebUI
 * Market groups, trading styles, prompt presets, skill mapping
 * Version: 3.0.0 — Skills sidebar, preset editor, Cohere enhance
 */

/* ─────────────────────────  CONFIG  ───────────────────────── */

const TRADING_STYLES = {
  scalp: {
    label: 'Scalp',
    icon: '⚡',
    desc: '1–5m entries, tight risk',
    tf: '1m, 5m',
    bars: 200,
    skills: ['buying-selling-volume', 'delta-volume-intensity', 'ultra-sensitive-supertrend', 'precision-sniper'],
    presets: [
      { label: 'Quick scalp setup', prompt: 'Find a high-probability scalp on {symbol} using volume delta and supertrend. Entry, SL, TP within 5-15 pips.' },
      { label: 'Volume spike entry', prompt: 'Detect volume spike + price impulse on {symbol} 1m. Entry at retest, 2:1 RR.' },
      { label: 'Micro-structure flip', prompt: 'Identify micro CHoCH on {symbol} 5m. Confirm with volume. Quick in/out.' }
    ]
  },
  day: {
    label: 'Day Trade',
    icon: '📅',
    desc: '15m–1h sessions',
    tf: '15m, 1h',
    bars: 500,
    skills: ['smart-money-concepts', 'support-resistance-breaks', 'ema-atr-pro-engine', 'quantum-ribbon'],
    presets: [
      { label: 'SMC session plan', prompt: 'Map BOS/CHoCH + FVG on {symbol} 1h. Identify today\'s bias, key POIs, and optimal entry zones.' },
      { label: 'EMA trend ride', prompt: 'Check EMA alignment and ATR trail on {symbol} 15m. Enter with trend, trail SL.' },
      { label: 'S/R breakout play', prompt: 'Find S/R level confluence on {symbol}. Wait for breakout + volume confirmation. Target next structure.' }
    ]
  },
  swing: {
    label: 'Swing',
    icon: '🌊',
    desc: '4h–Daily holds',
    tf: '4h, 1D',
    bars: 800,
    skills: ['smart-money-concepts', 'ema-atr-pro-engine', 'anchored-clusters-vp', 'self-aware-trend-system'],
    presets: [
      { label: 'Swing structure', prompt: 'Analyze {symbol} daily structure. BOS/CHoCH, swing FVGs, order blocks. Plan swing entry + invalidation.' },
      { label: 'Volume profile value', prompt: 'Anchored Volume Profile on {symbol} 4h. POC, value area high/low. Trade rejection or acceptance.' },
      { label: 'Trend quality check', prompt: 'Run Self-Aware Trend System on {symbol} daily. Trend character, flip risk, optimal hold duration.' }
    ]
  },
  position: {
    label: 'Position',
    icon: '🏛️',
    desc: 'Weekly+ macro',
    tf: '1D, 1W',
    bars: 1200,
    skills: ['smart-money-concepts', 'anchored-clusters-vp', 'quantum-ribbon', 'shemar-smc-confidence'],
    presets: [
      { label: 'Macro structure', prompt: 'Map weekly structure on {symbol}. Major BOS/CHoCH, macro FVGs, institutional levels. Position sizing plan.' },
      { label: 'Monthly POC', prompt: 'Monthly Anchored VP on {symbol}. POC, volume nodes, cluster extremes. Key macro S/R.' },
      { label: 'Confluence scan', prompt: 'Multi-timeframe confluence on {symbol} (W/D/4h). HMA + Supertrend + ribbon alignment. Highest-confidence direction.' }
    ]
  }
};

const CRYPTO_GROUPS = {
  majors: { label: 'Majors', icon: '👑', symbols: ['BTCUSDT', 'ETHUSDT'] },
  altcoins: { label: 'Altcoins', icon: '💎', symbols: ['SOLUSDT', 'ADAUSDT', 'AVAXUSDT', 'DOTUSDT', 'LINKUSDT', 'NEARUSDT', 'ATOMUSDT'] },
  defi: { label: 'DeFi', icon: '🏦', symbols: ['UNIUSDT', 'AAVEUSDT', 'MKRUSDT', 'LDOUSDT', 'CRVUSDT', 'SNXUSDT', 'COMPUSDT'] },
  memes: { label: 'Memes', icon: '🐕', symbols: ['DOGEUSDT', 'SHIBUSDT', 'PEPEUSDT', 'FLOKIUSDT', 'BONKUSDT', 'WIFUSDT'] },
  layer1: { label: 'Layer 1', icon: '⛓️', symbols: ['FTMUSDT', 'ALGOUSDT', 'VETUSDT', 'ICPUSDT', 'TRXUSDT', 'XLMUSDT', 'XTZUSDT'] },
  layer2: { label: 'Layer 2', icon: '🔷', symbols: ['MATICUSDT', 'OPUSDT', 'ARBUSDT', 'STRKUSDT', 'IMXUSDT', 'MNTUSDT'] }
};

/*
 * TV-Pine scripts from /Volumes/ExMac/code/tradingview/js-experiment01-v3/.tv-scripts/
 * Only these scripts appear in the skills sidebar.
 */
const TV_PINE_SCRIPTS = [
  { id: 'buying-selling-volume',                file: '003--buying-selling-volume.pine',                                          icon: '📊', cat: 'Volume',     desc: 'Buy/sell pressure + MA crosses' },
  { id: 'delta-volume-intensity',               file: '014--delta-volume-intensity.pine',                                         icon: '⚡', cat: 'Volume',     desc: 'Volume delta trend + ROC' },
  { id: 'smart-money-concepts',                 file: '004--smart-money-concepts-luxalgo.pine',                                   icon: '🎯', cat: 'Structure',  desc: 'BOS/CHoCH + FVG + OBs' },
  { id: 'ict-auto-validated-smc',               file: '005--ict-validated-smc-v1.pine',                                           icon: '✅', cat: 'Validation', desc: 'ICT-validated SMC signals' },
  { id: 'ema-atr-pro-engine',                   file: '006--ema-atr-pro-ultimate-engine.pine',                                    icon: '📈', cat: 'Trend',      desc: 'EMA trail + ATR signals' },
  { id: 'quantum-ribbon',                       file: '007--quantum-ribbon-lite.pine',                                            icon: '🎀', cat: 'Trend',      desc: '5-layer EMA ribbon momentum' },
  { id: 'anchored-clusters-vp',                 file: '008--anchored-clusters-volume-profile-luxalgo.pine',                       icon: '📍', cat: 'Volume',     desc: 'Anchored Volume Profile POC' },
  { id: 'trend-volatility-momentum',            file: '009--trend-analysis-with-volatility-and-momentum.pine',                    icon: '🌪️', cat: 'Trend',      desc: 'Volatility + momentum analysis' },
  { id: 'xauusd-mtf-trend',                     file: '010--xauusd-multi-timeframe-trend-analyzer.pine',                          icon: '🥇', cat: 'Multi-TF',   desc: 'XAUUSD multi-timeframe' },
  { id: 'ultra-sensitive-supertrend',           file: '011--ultra-sensitive-supertrend-v6-heiken-2x-alert.pine',                  icon: '🔥', cat: 'Trend',      desc: 'Dual SuperTrend alignment' },
  { id: 'shemar-smc-confidence',                file: '012--shemar-hma-st-smc-confidence-filter.pine',                            icon: '💪', cat: 'Filter',     desc: 'HMA + Supertrend confidence' },
  { id: 'volume-gaps-imbalances',               file: '013--volume-gaps-imbalances-zeiierman.pine',                               icon: '💨', cat: 'Structure',  desc: 'Volume gaps & imbalances' },
  { id: 'self-aware-trend-system',              file: '001--self-aware-trend-system-willyalgotrader.pine',                        icon: '🧠', cat: 'Trend',      desc: 'Adaptive trend quality' },
  { id: 'precision-sniper',                     file: '002--precision-sniper-willyalgotrader.pine',                               icon: '🎯', cat: 'Entry',      desc: 'Precision sniper entries' },
];

/* Build SKILL_META from TV_PINE_SCRIPTS for backward compat */
const SKILL_META = Object.fromEntries(TV_PINE_SCRIPTS.map(s => [s.id, { icon: s.icon, cat: s.cat, desc: s.desc }]));

let _activeStyle = 'day';
let _activeSymbol = 'BTCUSDT';
let _activeGroup = 'majors';
let _tradingPanelOpen = false;
let _selectedTradingSkill = null;
let _selectedSkills = new Set(); // persisted to localStorage — only TV-Pine scripts
let _customPresets = [];        // persisted to localStorage
let _mcpServers = [];           // fetched from /api/mcp/servers
let _symbolFavorites = new Set(); // persisted to localStorage
let _symbolRecent = [];          // persisted to localStorage — last 8 symbols
let _symbolFilter = '';          // active search filter

/* ─────────────────────────  WORKSPACE SYMBOL SCOPE  ───────────────────────── */

// Symbol scopes are stored client-side per workspace path since the backend
// doesn't know about trading symbols. Format per workspace:
// { type: 'single'|'multi', symbols: ['BTCUSDT',...], category: 'crypto'|'fx'|'commodities'|'custom' }

const _WS_SYMBOL_PRESETS = {
  crypto: {
    label: 'Crypto',
    symbols: ['BTCUSDT','ETHUSDT','SOLUSDT','ADAUSDT','AVAXUSDT','DOTUSDT','LINKUSDT','DOGEUSDT','SHIBUSDT','UNIUSDT','AAVEUSDT','MATICUSDT','OPUSDT','ARBUSDT','FTMUSDT']
  },
  majors: {
    label: 'Crypto Majors',
    symbols: ['BTCUSDT','ETHUSDT']
  },
  altcoins: {
    label: 'Altcoins',
    symbols: ['SOLUSDT','ADAUSDT','AVAXUSDT','DOTUSDT','LINKUSDT','NEARUSDT','ATOMUSDT']
  },
  defi: {
    label: 'DeFi',
    symbols: ['UNIUSDT','AAVEUSDT','MKRUSDT','LDOUSDT','CRVUSDT','SNXUSDT','COMPUSDT']
  },
  memes: {
    label: 'Meme Coins',
    symbols: ['DOGEUSDT','SHIBUSDT','PEPEUSDT','FLOKIUSDT','BONKUSDT','WIFUSDT']
  },
  layer2: {
    label: 'Layer 2',
    symbols: ['MATICUSDT','OPUSDT','ARBUSDT','STRKUSDT','IMXUSDT','MNTUSDT']
  },
  fx: {
    label: 'Forex',
    symbols: ['EURUSD','GBPUSD','USDJPY','AUDUSD','USDCAD','USDCHF','NZDUSD','EURGBP','GBPJPY','XAUUSD']
  },
  commodities: {
    label: 'Commodities',
    symbols: ['XAUUSD','XAGUSD','USOIL','UKOIL','NATGAS','COPPER']
  },
  gold: {
    label: 'Gold',
    symbols: ['XAUUSD']
  },
  custom: {
    label: 'Custom',
    symbols: []
  }
};

function _getWsSymbolKey(path) {
  return 'hermes-ws-symbols:' + (path || 'default');
}

function getWorkspaceSymbolScope(path) {
  if (!path) path = _getCurrentWorkspacePath();
  try {
    const raw = localStorage.getItem(_getWsSymbolKey(path));
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  // Auto-detect from workspace name
  const scope = _inferSymbolScopeFromWorkspace(path);
  if (scope) {
    setWorkspaceSymbolScope(path, scope);
    return scope;
  }
  // Default to crypto
  return { type: 'multi', category: 'crypto', symbols: _WS_SYMBOL_PRESETS.crypto.symbols };
}

function setWorkspaceSymbolScope(path, scope) {
  if (!path) path = _getCurrentWorkspacePath();
  try {
    localStorage.setItem(_getWsSymbolKey(path), JSON.stringify(scope));
  } catch (e) {}
}

function _getCurrentWorkspacePath() {
  return (typeof S !== 'undefined' && S.session && S.session.workspace) || '';
}

function _inferSymbolScopeFromWorkspace(path) {
  const name = (path || '').toLowerCase();
  if (name.includes('gold') || name.includes('xau')) return { type: 'single', category: 'gold', symbols: _WS_SYMBOL_PRESETS.gold.symbols };
  if (name.includes('crypto')) return { type: 'multi', category: 'crypto', symbols: _WS_SYMBOL_PRESETS.crypto.symbols };
  if (name.includes('forex') || name.includes('fx') || name.includes('currency')) return { type: 'multi', category: 'fx', symbols: _WS_SYMBOL_PRESETS.fx.symbols };
  if (name.includes('commodit')) return { type: 'multi', category: 'commodities', symbols: _WS_SYMBOL_PRESETS.commodities.symbols };
  if (name.includes('alt')) return { type: 'multi', category: 'altcoins', symbols: _WS_SYMBOL_PRESETS.altcoins.symbols };
  if (name.includes('defi')) return { type: 'multi', category: 'defi', symbols: _WS_SYMBOL_PRESETS.defi.symbols };
  if (name.includes('meme')) return { type: 'multi', category: 'memes', symbols: _WS_SYMBOL_PRESETS.memes.symbols };
  return null;
}

function getWorkspaceSymbols() {
  const scope = getWorkspaceSymbolScope();
  return scope.symbols || [];
}

function getWorkspaceActiveSymbol() {
  const scope = getWorkspaceSymbolScope();
  const syms = scope.symbols || [];
  if (!syms.length) return 'BTCUSDT';
  // If _activeSymbol is in scope, use it; otherwise use first
  if (syms.includes(_activeSymbol)) return _activeSymbol;
  return syms[0];
}

function setWorkspaceActiveSymbol(symbol) {
  _activeSymbol = symbol;
  const scope = getWorkspaceSymbolScope();
  if (scope.symbols && scope.symbols.includes(symbol)) {
    _symbolRecent = [symbol, ..._symbolRecent.filter(s => s !== symbol)].slice(0, 8);
    _saveSymbolRecent();
  }
}

/* ─────────────────────────  COMPOSER BRIDGE  ───────────────────────── */

// Trading Pro actions (presets, quick actions, Cohere enhance) all write into
// the main chat composer. Keep this local helper as the single write path.
function setComposerValue(text) {
  const msgInput = document.getElementById('msg');
  if (!msgInput) return false;

  msgInput.value = String(text ?? '');
  // Trigger existing composer listeners in boot.js (autosize, send button state,
  // slash-command dropdown, etc.).
  msgInput.dispatchEvent(new Event('input', { bubbles: true }));
  if (typeof autoResize === 'function') autoResize();
  return true;
}

/* ─────────────────────────  INIT  ───────────────────────── */

let _tradingUXInitialized = false;

function initTradingUX() {
  if (_tradingUXInitialized) return;
  _tradingUXInitialized = true;
  console.log('[TradingUX] v3.0 — Trading Pro initializing');

  // Load persisted state
  _loadPersistedState();
  _buildTradingUI();

  const msgInput = document.getElementById('msg');
  if (msgInput) {
    if (typeof handleChatInput === 'function') msgInput.addEventListener('input', handleChatInput);
    if (typeof handleChatKeydown === 'function') msgInput.addEventListener('keydown', handleChatKeydown);
  }

  // Load TV-Pine skills and MCP servers
  _initTvPineSkills();
  _fetchMcpServers();
}

function _safeGetJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`[TradingUX] Corrupted data for key "${key}", using fallback:`, e);
    try { localStorage.removeItem(key); } catch (_) {}
    return fallback;
  }
}

function _loadPersistedState() {
  const savedSkills = _safeGetJson('trading-selected-skills', []);
  const validIds = new Set(TV_PINE_SCRIPTS.map(s => s.id));
  _selectedSkills = new Set(savedSkills.filter(id => validIds.has(id)));
  if (_selectedSkills.size !== savedSkills.length) _saveSelectedSkills();

  _customPresets = _safeGetJson('trading-custom-presets', []);
  _symbolFavorites = new Set(_safeGetJson('trading-symbol-favorites', []));
  _symbolRecent = _safeGetJson('trading-symbol-recent', []);
}

function _saveSelectedSkills() {
  localStorage.setItem('trading-selected-skills', JSON.stringify([..._selectedSkills]));
}

function _saveCustomPresets() {
  localStorage.setItem('trading-custom-presets', JSON.stringify(_customPresets));
}

function _saveSymbolFavorites() {
  localStorage.setItem('trading-symbol-favorites', JSON.stringify([..._symbolFavorites]));
}

function _saveSymbolRecent() {
  localStorage.setItem('trading-symbol-recent', JSON.stringify(_symbolRecent.slice(0, 8)));
}

/* ── helpers ── */
function _debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), ms); };
}

/* ─────────────────────────  BUILD UI  ───────────────────────── */

function _buildTradingUI() {
  _injectTradingCSS();
  _buildTradingPanel();
  _buildComposerOverlay();
  // Symbol bar removed — symbols now live in workspace scope
  _buildPresetEditorModal();
}

function _injectTradingCSS() {
  if (document.getElementById('trading-pro-css')) return;
  const style = document.createElement('style');
  style.id = 'trading-pro-css';
  style.textContent = `
    /* ── Trading Pro Panel ── */
    .trading-pro-panel {
      position: fixed; top: 60px; right: 16px; width: 320px; max-height: calc(100vh - 80px);
      background: var(--sidebar); border: 1px solid var(--border); border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4); z-index: 1000;
      display: flex; flex-direction: column; overflow: hidden;
      font-size: 13px; transition: transform 0.25s ease, opacity 0.2s ease;
    }
    .trading-pro-panel.collapsed { transform: translateX(120%); opacity: 0; pointer-events: none; }
    .trading-pro-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px; border-bottom: 1px solid var(--border); background: var(--surface);
    }
    .trading-pro-title { font-weight: 700; font-size: 15px; display: flex; align-items: center; gap: 8px; }
    .trading-pro-close { background: none; border: none; color: var(--muted); cursor: pointer; padding: 4px; border-radius: 6px; }
    .trading-pro-close:hover { background: var(--hover-bg); color: var(--text); }
    .trading-pro-body { flex: 1; overflow-y: auto; padding: 12px; position: relative; }

    /* ── Panel Tabs ── */
    .trading-pro-tabs {
      display: flex; gap: 0; border-bottom: 1px solid var(--border); background: var(--surface);
      padding: 0 12px;
    }
    .trading-pro-tab-btn {
      flex: 1; padding: 10px 4px; border: none; background: none;
      color: var(--muted); font-size: 12px; font-weight: 600; cursor: pointer;
      position: relative; transition: color .2s;
      border-bottom: 2px solid transparent; margin-bottom: -1px;
    }
    .trading-pro-tab-btn:hover { color: var(--text); }
    .trading-pro-tab-btn.active { color: var(--accent-text); border-bottom-color: var(--accent); }

    /* ── Tab Panes ── */
    .trading-pro-tab-pane { display: none; }
    .trading-pro-tab-pane.active { display: block; animation: paneFade .2s ease; }
    @keyframes paneFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

    /* ── Setup buttons ── */
    .trading-setup-btn {
      width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid var(--border2);
      background: var(--code-bg); color: var(--text); font-size: 12px; font-weight: 500;
      cursor: pointer; text-align: left; transition: all .15s; margin-bottom: 8px;
      display: flex; align-items: center; gap: 8px;
    }
    .trading-setup-btn:hover { background: var(--surface); border-color: var(--accent); }

    /* ── Style Tabs ── */
    .trading-style-tabs {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px;
      background: var(--code-bg); padding: 4px; border-radius: 10px; margin-bottom: 12px;
    }
    .trading-style-tab {
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      padding: 8px 4px; border-radius: 8px; border: none; background: none;
      color: var(--muted); cursor: pointer; font-size: 11px; transition: all 0.15s;
    }
    .trading-style-tab .tab-icon { font-size: 16px; }
    .trading-style-tab .tab-label { font-weight: 600; }
    .trading-style-tab .tab-desc { font-size: 9px; opacity: 0.7; }
    .trading-style-tab:hover { background: var(--hover-bg); color: var(--text); }
    .trading-style-tab.active { background: var(--accent-bg-strong); color: var(--accent-text); }

    /* ── Symbol Groups ── */
    .trading-group-row {
      display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 8px;
      scrollbar-width: none; -ms-overflow-style: none;
    }
    .trading-group-row::-webkit-scrollbar { display: none; }
    .trading-group-chip {
      display: flex; align-items: center; gap: 4px; white-space: nowrap;
      padding: 5px 10px; border-radius: 20px; border: 1px solid var(--border2);
      background: var(--code-bg); color: var(--muted); font-size: 11px; font-weight: 500;
      cursor: pointer; transition: all 0.15s; flex-shrink: 0;
    }
    .trading-group-chip:hover { border-color: var(--accent); color: var(--text); }
    .trading-group-chip.active { background: var(--accent-bg); border-color: var(--accent); color: var(--accent-text); }

    /* ── Symbol Horizontal Scroll ── */
    .trading-symbol-scroll {
      display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 12px;
      scrollbar-width: none;
    }
    .trading-symbol-scroll::-webkit-scrollbar { display: none; }
    .trading-symbol-btn {
      padding: 7px 12px; border-radius: 20px; border: 1px solid var(--border2);
      background: var(--code-bg); color: var(--text); font-size: 11px; font-weight: 600;
      cursor: pointer; transition: all 0.15s; text-align: center; white-space: nowrap; flex-shrink: 0;
    }
    .trading-symbol-btn:hover { border-color: var(--accent); background: var(--accent-bg); }
    .trading-symbol-btn.active { background: var(--accent-bg-strong); border-color: var(--accent); color: var(--accent-text); }

    /* ── Presets ── */
    .trading-preset-card {
      padding: 10px 12px; border-radius: 10px; border: 1px solid var(--border2);
      background: var(--code-bg); margin-bottom: 8px; cursor: pointer;
      transition: all 0.15s; position: relative; overflow: hidden;
    }
    .trading-preset-card:hover { border-color: var(--accent); background: var(--accent-bg); transform: translateX(4px); }
    .trading-preset-card::before {
      content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
      background: var(--accent); opacity: 0; transition: opacity 0.15s;
    }
    .trading-preset-card:hover::before { opacity: 1; }
    .trading-preset-label { font-weight: 600; font-size: 12px; margin-bottom: 4px; }
    .trading-preset-preview { font-size: 11px; color: var(--muted); line-height: 1.4; }

    /* ── Symbol Bar (under composer) ── */
    .trading-symbol-bar {
      display: flex; align-items: center; gap: 8px; padding: 6px 16px;
      border-top: 1px solid var(--border); background: var(--sidebar);
      overflow-x: auto; scrollbar-width: none;
    }
    .trading-symbol-bar::-webkit-scrollbar { display: none; }
    .trading-sym-pill {
      display: flex; align-items: center; gap: 4px;
      padding: 4px 10px; border-radius: 16px; border: 1px solid var(--border2);
      background: var(--code-bg); color: var(--muted); font-size: 11px; font-weight: 500;
      cursor: pointer; transition: all 0.15s; white-space: nowrap; flex-shrink: 0;
    }
    .trading-sym-pill:hover { border-color: var(--accent); color: var(--text); }
    .trading-sym-pill.active { background: var(--accent-bg); border-color: var(--accent); color: var(--accent-text); }
    .trading-sym-pill .sym-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success); }
    .trading-sym-pill .sym-group-icon { font-size: 10px; }

    /* ── Toggle Button ── */
    .trading-toggle-btn {
      position: fixed; bottom: 80px; right: 16px; z-index: 999;
      width: 48px; height: 48px; border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), var(--gold));
      border: none; color: #fff; font-size: 20px; cursor: pointer;
      box-shadow: 0 4px 16px rgba(245,197,66,0.4);
      transition: all 0.2s; display: flex; align-items: center; justify-content: center;
    }
    .trading-toggle-btn:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(245,197,66,0.5); }
    .trading-toggle-btn:active { transform: scale(0.95); }
    .trading-toggle-btn.pulse { animation: tradingPulse 2s infinite; }
    @keyframes tradingPulse {
      0%, 100% { box-shadow: 0 4px 16px rgba(245,197,66,0.4); }
      50% { box-shadow: 0 4px 24px rgba(245,197,66,0.7); }
    }

    /* ── Section Headers ── */
    .trading-section-title {
      font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
      color: var(--muted); margin: 16px 0 8px; display: flex; align-items: center; gap: 6px;
    }
    .trading-section-title::after {
      content: ''; flex: 1; height: 1px; background: var(--border2); margin-left: 4px;
    }

    /* ── Composer Overlay ── */
    .trading-composer-overlay {
      position: absolute; bottom: 100%; left: 0; right: 0;
      background: var(--sidebar); border: 1px solid var(--border);
      border-bottom: none; border-radius: 12px 12px 0 0;
      padding: 10px 14px; display: flex; gap: 8px; overflow-x: auto;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
      transition: transform 0.2s ease, opacity 0.2s ease;
    }
    .trading-composer-overlay.hidden { transform: translateY(10px); opacity: 0; pointer-events: none; }
    .trading-quick-btn {
      display: flex; align-items: center; gap: 5px;
      padding: 6px 12px; border-radius: 8px; border: 1px solid var(--border2);
      background: var(--code-bg); color: var(--text); font-size: 11px; font-weight: 500;
      cursor: pointer; transition: all 0.15s; white-space: nowrap; flex-shrink: 0;
    }
    .trading-quick-btn:hover { background: var(--accent-bg); border-color: var(--accent); color: var(--accent-text); }
    .trading-quick-btn.enhance { background: linear-gradient(135deg, #6B5B95, #4A3F6B); color: #fff; border: none; }
    .trading-quick-btn.enhance:hover { background: linear-gradient(135deg, #7B6BA5, #5A4F7B); }
    .trading-quick-btn.enhance:disabled { opacity: 0.5; cursor: not-allowed; }

    /* ── Skills List (minimal) ── */
    .trading-skills-list {
      display: flex; flex-direction: column; gap: 1px;
      max-height: 340px; overflow-y: auto;
    }
    .trading-skills-list::-webkit-scrollbar { width: 3px; }
    .trading-skills-list::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

    .trading-skill-row {
      display: flex; align-items: center; gap: 10px;
      padding: 7px 10px; border-radius: 6px; cursor: pointer;
      transition: background .12s;
      font-size: 12px;
    }
    .trading-skill-row:hover { background: var(--hover-bg); }
    .trading-skill-row.selected { background: var(--accent-bg); }
    .trading-skill-row input[type="checkbox"] {
      width: 14px; height: 14px; accent-color: var(--accent); cursor: pointer;
      flex-shrink: 0; margin: 0;
    }
    .trading-skill-row .skill-row-icon { font-size: 14px; flex-shrink: 0; }
    .trading-skill-row .skill-row-name {
      flex: 1; font-weight: 500; font-size: 12px;
      color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }

    /* ── Preset Editor Modal ── */
    .trading-modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 2000;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none; transition: opacity 0.2s;
    }
    .trading-modal-overlay.open { opacity: 1; pointer-events: auto; }
    .trading-modal {
      background: var(--sidebar); border: 1px solid var(--border); border-radius: 16px;
      width: 480px; max-width: 90vw; max-height: 80vh; overflow: hidden;
      display: flex; flex-direction: column;
      box-shadow: 0 24px 80px rgba(0,0,0,0.5);
      transform: translateY(20px) scale(0.96); transition: transform 0.25s ease;
    }
    .trading-modal-overlay.open .trading-modal { transform: translateY(0) scale(1); }
    .trading-modal-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 18px; border-bottom: 1px solid var(--border); background: var(--surface);
    }
    .trading-modal-title { font-weight: 700; font-size: 15px; }
    .trading-modal-close { background: none; border: none; color: var(--muted); cursor: pointer; font-size: 18px; padding: 2px; }
    .trading-modal-close:hover { color: var(--text); }
    .trading-modal-body {
      flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px;
    }
    .trading-modal-body label {
      font-size: 11px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em;
    }
    .trading-modal-body input,
    .trading-modal-body textarea {
      padding: 8px 10px; border-radius: 8px; border: 1px solid var(--border2);
      background: var(--code-bg); color: var(--text); font-size: 13px;
      font-family: inherit; resize: vertical;
    }
    .trading-modal-body input:focus,
    .trading-modal-body textarea:focus {
      outline: none; border-color: var(--accent); box-shadow: 0 0 0 2px var(--focus-ring);
    }
    .trading-modal-body textarea { min-height: 80px; }
    .trading-modal-footer {
      display: flex; gap: 8px; padding: 12px 16px; border-top: 1px solid var(--border);
      background: var(--surface);
    }
    .trading-modal-footer button {
      flex: 1; padding: 8px; border-radius: 8px; border: 1px solid var(--border2);
      background: var(--code-bg); color: var(--text); font-size: 12px; font-weight: 600;
      cursor: pointer; transition: all 0.15s;
    }
    .trading-modal-footer button.primary {
      background: var(--accent); color: #fff; border-color: var(--accent);
    }
    .trading-modal-footer button:hover { opacity: 0.9; }

    /* ── Custom Presets List in Modal ── */
    .trading-custom-preset-item {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 10px; border-radius: 8px; border: 1px solid var(--border2);
      background: var(--code-bg); margin-bottom: 6px;
    }
    .trading-custom-preset-item .preset-name { font-weight: 600; font-size: 12px; flex: 1; }
    .trading-custom-preset-item .preset-actions { display: flex; gap: 4px; }
    .trading-custom-preset-item .preset-actions button {
      padding: 3px 8px; border-radius: 4px; border: 1px solid var(--border2);
      background: none; color: var(--muted); font-size: 10px; cursor: pointer;
    }
    .trading-custom-preset-item .preset-actions button:hover { color: var(--text); border-color: var(--accent); }

    /* ── Toast ── */
    .trading-toast { background: var(--accent-bg-strong) !important; color: var(--accent-text) !important; border: 1px solid var(--accent) !important; }

    /* ── Selected Skills Count Badge ── */
    .trading-skills-count {
      font-size: 10px; padding: 1px 6px; border-radius: 10px;
      background: var(--accent); color: #fff; font-weight: 700; margin-left: auto;
    }
  `;
  document.head.appendChild(style);
}

/* ─────────────────────────  PANEL  ───────────────────────── */

let _tradingProTab = 'trade'; // 'trade' | 'skills' | 'setup'

function _switchTradingProTab(tab) {
  _tradingProTab = tab;
  document.querySelectorAll('.trading-pro-tab-btn').forEach(b => {
    const active = b.dataset.tab === tab;
    b.classList.toggle('active', active);
    b.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.trading-pro-tab-pane').forEach(p => {
    p.classList.toggle('active', p.dataset.tab === tab);
  });
  if (tab === 'trade') _renderTradeTab();
  if (tab === 'skills') _renderSkillsTab();
  if (tab === 'setup') _renderSetupTab();
}

function _buildTradingPanel() {
  const panel = document.createElement('div');
  panel.id = 'tradingProPanel';
  panel.className = 'trading-pro-panel collapsed';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Trading Pro');
  panel.setAttribute('aria-modal', 'true');
  panel.innerHTML = `
    <div class="trading-pro-header">
      <div class="trading-pro-title">💰 Trading Pro</div>
      <button class="trading-pro-close" onclick="toggleTradingPanel()" title="Close" aria-label="Close Trading Pro">✕</button>
    </div>
    <div class="trading-pro-tabs" role="tablist" aria-label="Trading Pro tabs">
      <button class="trading-pro-tab-btn active" data-tab="trade" onclick="_switchTradingProTab('trade')" role="tab" aria-selected="true" aria-controls="tabTrade" id="tab-btn-trade">Trade</button>
      <button class="trading-pro-tab-btn" data-tab="skills" onclick="_switchTradingProTab('skills')" role="tab" aria-selected="false" aria-controls="tabSkills" id="tab-btn-skills">Skills</button>
      <button class="trading-pro-tab-btn" data-tab="setup" onclick="_switchTradingProTab('setup')" role="tab" aria-selected="false" aria-controls="tabSetup" id="tab-btn-setup">Setup</button>
    </div>
    <div class="trading-pro-body" id="tradingProBody">
      <!-- Trade Tab -->
      <div class="trading-pro-tab-pane active" data-tab="trade" id="tabTrade" role="tabpanel" aria-labelledby="tab-btn-trade" tabindex="0"></div>
      <!-- Skills Tab -->
      <div class="trading-pro-tab-pane" data-tab="skills" id="tabSkills" role="tabpanel" aria-labelledby="tab-btn-skills" tabindex="0"></div>
      <!-- Setup Tab -->
      <div class="trading-pro-tab-pane" data-tab="setup" id="tabSetup" role="tabpanel" aria-labelledby="tab-btn-setup" tabindex="0"></div>
    </div>
  `;
  document.body.appendChild(panel);

  const toggle = document.createElement('button');
  toggle.id = 'tradingToggleBtn';
  toggle.className = 'trading-toggle-btn pulse';
  toggle.innerHTML = '📈';
  toggle.title = 'Open Trading Pro (Cmd+Shift+T)';
  toggle.setAttribute('aria-label', 'Open Trading Pro');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'tradingProPanel');
  toggle.onclick = toggleTradingPanel;
  document.body.appendChild(toggle);

  _renderTradeTab();
  _renderSkillsTab();
  _renderSetupTab();
  _updateSkillsCount();
}

function _renderTradeTab() {
  const pane = document.getElementById('tabTrade');
  if (!pane) return;
  pane.innerHTML = `
    <div class="trading-style-tabs" id="styleTabs"></div>
    <div class="trading-section-title">Symbol</div>
    <div class="trading-symbol-scroll" id="symbolScroll"></div>
    <div class="trading-section-title">Presets</div>
    <div id="presetList"></div>
  `;
  _renderStyleTabs();
  _renderSymbolScroll();
  _renderPresets();
}

function _renderSkillsTab() {
  const pane = document.getElementById('tabSkills');
  if (!pane) return;
  pane.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      <span style="font-size:11px;color:var(--muted)">Selected: <b id="skillsTabCount">0</b></span>
      <span style="flex:1"></span>
      <button onclick="selectAllSkills()" style="font-size:10px;padding:3px 8px;border-radius:6px;border:1px solid var(--border2);background:var(--code-bg);color:var(--muted);cursor:pointer">All</button>
      <button onclick="deselectAllSkills()" style="font-size:10px;padding:3px 8px;border-radius:6px;border:1px solid var(--border2);background:var(--code-bg);color:var(--muted);cursor:pointer">None</button>
    </div>
    <div class="trading-skills-list" id="skillsTabList"></div>
  `;
  _renderSkillsTabList();
  const count = document.getElementById('skillsTabCount');
  if (count) count.textContent = _selectedSkills.size;
}

function _renderSetupTab() {
  const pane = document.getElementById('tabSetup');
  if (!pane) return;
  const presetsClick = typeof switchPanel === 'function' ? "switchPanel('presets')" : "showToast('Preset Studio not available', 2000)";
  pane.innerHTML = `
    <div class="trading-section-title">Prompt Presets</div>
    <button class="trading-setup-btn" onclick="${presetsClick}">📝 Preset Studio</button>
    <div class="trading-section-title">Cohere Enhance</div>
    <div style="font-size:11px;color:var(--muted);line-height:1.5;margin-top:4px">
      Set <code>COHERE_API_KEY</code> as an environment variable (or in <code>~/.hermes/.env</code>) to enable the ✨ Enhance button.
    </div>
    <div class="trading-section-title">Data</div>
    <button class="trading-setup-btn" onclick="_resetTradingData()" style="color:var(--error)">🗑 Reset All Data</button>
  `;
}

function _resetTradingData() {
  if (!confirm('Reset all Trading Pro settings?')) return;
  _selectedSkills.clear();
  _customPresets = [];
  localStorage.removeItem('trading-selected-skills');
  localStorage.removeItem('trading-custom-presets');
  _renderTradeTab();
  _renderSkillsTab();
  showToast('Trading Pro data reset', 2000);
}

function toggleTradingPanel() {
  const panel = document.getElementById('tradingProPanel');
  const btn = document.getElementById('tradingToggleBtn');
  if (!panel) return;
  _tradingPanelOpen = !_tradingPanelOpen;
  panel.classList.toggle('collapsed', !_tradingPanelOpen);
  if (btn) {
    btn.classList.toggle('pulse', !_tradingPanelOpen);
    btn.innerHTML = _tradingPanelOpen ? '✕' : '📈';
    btn.setAttribute('aria-expanded', String(_tradingPanelOpen));
    btn.setAttribute('aria-label', _tradingPanelOpen ? 'Close Trading Pro' : 'Open Trading Pro');
  }
}

function closeTradingPanel() {
  if (!_tradingPanelOpen) return;
  const panel = document.getElementById('tradingProPanel');
  const btn = document.getElementById('tradingToggleBtn');
  if (!panel) return;
  _tradingPanelOpen = false;
  panel.classList.add('collapsed');
  if (btn) {
    btn.classList.add('pulse');
    btn.innerHTML = '📈';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open Trading Pro');
  }
}

function closeAllTradingPanels() {
  closeTradingPanel();
  if (typeof closeTradingIntelligence === 'function') closeTradingIntelligence();
}

/* ─────────────────────────  STYLE / GROUP / SYMBOL  ───────────────────────── */

function _renderStyleTabs() {
  const container = document.getElementById('styleTabs');
  if (!container) return;
  container.innerHTML = '';
  Object.entries(TRADING_STYLES).forEach(([key, style]) => {
    const btn = document.createElement('button');
    btn.className = 'trading-style-tab' + (key === _activeStyle ? ' active' : '');
    btn.innerHTML = `<span class="tab-icon">${style.icon}</span><span class="tab-label">${style.label}</span><span class="tab-desc">${style.desc}</span>`;
    btn.onclick = () => setTradingStyle(key);
    container.appendChild(btn);
  });
}

function setTradingStyle(styleKey) {
  _activeStyle = styleKey;
  _renderStyleTabs();
  _renderPresets();
  _renderSkills();
  showToast(`Switched to ${TRADING_STYLES[styleKey].label} mode`, 2000);
}

function _renderSymbolScroll() {
  const container = document.getElementById('symbolScroll');
  if (!container) return;
  container.innerHTML = '';

  // Build search input
  const searchWrap = document.createElement('div');
  searchWrap.className = 'symbol-search-wrap';
  searchWrap.innerHTML = `
    <svg class="symbol-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
    <input class="symbol-search-input" type="text" placeholder="Search symbols..." value="${_symbolFilter}" />
    ${_symbolFilter ? '<button class="symbol-search-clear">✕</button>' : ''}
  `;
  const searchInput = searchWrap.querySelector('.symbol-search-input');
  searchInput.oninput = _debounce((e) => { _symbolFilter = e.target.value.trim().toUpperCase(); _renderSymbolScroll(); }, 150);
  const clearBtn = searchWrap.querySelector('.symbol-search-clear');
  if (clearBtn) clearBtn.onclick = () => { _symbolFilter = ''; _renderSymbolScroll(); };
  container.appendChild(searchWrap);

  const filter = _symbolFilter;

  // Helper to render a group section
  const renderGroup = (title, icon, symbols, id) => {
    if (!symbols.length) return;
    const section = document.createElement('div');
    section.className = 'symbol-group';
    const header = document.createElement('div');
    header.className = 'symbol-group-header';
    header.innerHTML = `<span>${icon} ${title}</span><span class="symbol-group-count">${symbols.length}</span>`;
    section.appendChild(header);
    const grid = document.createElement('div');
    grid.className = 'trading-symbol-grid';
    symbols.forEach(sym => {
      const isActive = sym === _activeSymbol;
      const isFav = _symbolFavorites.has(sym);
      const btn = document.createElement('button');
      btn.className = 'trading-symbol-btn' + (isActive ? ' active' : '');
      const short = sym.replace('USDT', '');
      btn.innerHTML = `
        <span class="sym-fav-star" data-fav="${isFav ? '1' : '0'}" title="${isFav ? 'Unfavorite' : 'Favorite'}">${isFav ? '★' : '☆'}</span>
        <span class="sym-name">${short}</span>
      `;
      btn.onclick = (e) => {
        if (e.target.closest('.sym-fav-star')) {
          e.stopPropagation();
          toggleSymbolFavorite(sym);
          return;
        }
        setActiveSymbol(sym);
      };
      grid.appendChild(btn);
    });
    section.appendChild(grid);
    container.appendChild(section);
  };

  // ── Favorites (filtered to workspace scope) ──
  const wsSymbols = new Set(getWorkspaceSymbols());
  if (_symbolFavorites.size > 0 && !filter) {
    const favs = [..._symbolFavorites].filter(s => wsSymbols.has(s));
    if (favs.length) renderGroup('Favorites', '★', favs, 'fav');
  }

  // ── Recent (filtered to workspace scope) ──
  if (_symbolRecent.length > 0 && !filter) {
    const recent = _symbolRecent.filter(s => !_symbolFavorites.has(s) && wsSymbols.has(s));
    if (recent.length) renderGroup('Recent', '🕐', recent, 'recent');
  }

  // ── Workspace symbols ──
  const scope = getWorkspaceSymbolScope();
  let displaySyms = [...wsSymbols];
  if (filter) {
    displaySyms = displaySyms.filter(s => s.toUpperCase().includes(filter));
  } else {
    displaySyms = displaySyms.filter(s => !_symbolFavorites.has(s) && !_symbolRecent.includes(s));
  }
  if (displaySyms.length) {
    const preset = _WS_SYMBOL_PRESETS[scope.category];
    renderGroup(preset?.label || 'Symbols', preset?.label ? '◆' : '◈', displaySyms, 'workspace');
  }

  // Empty state for no matches
  if ((filter || !wsSymbols.size) && !container.querySelector('.trading-symbol-grid')) {
    const empty = document.createElement('div');
    empty.className = 'symbol-empty-state';
    empty.textContent = filter
      ? `No symbols match "${filter}"`
      : 'No symbols configured for this workspace. Set symbol scope in Spaces panel.';
    container.appendChild(empty);
  }
}

function setActiveSymbol(symbol) {
  setWorkspaceActiveSymbol(symbol);
  _renderSymbolScroll();
  _updateComposerWorkspaceLabel();
  // If panel is open, refresh the trade tab to show updated symbol
  if (_tradingPanelOpen) _renderTradeTab();
  showToast(`Symbol: ${symbol}`, 1500);
}

function _updateComposerWorkspaceLabel() {
  const label = getWorkspaceActiveSymbol();
  const wsLabel = document.getElementById('composerWorkspaceLabel');
  if (wsLabel) {
    const scope = getWorkspaceSymbolScope();
    const preset = _WS_SYMBOL_PRESETS[scope.category];
    const catIcon = preset?.label === 'Gold' ? '🥇' :
                    preset?.label === 'Forex' ? '💱' :
                    preset?.label === 'Commodities' ? '🛢️' :
                    scope.category === 'crypto' ? '◈' : '◆';
    wsLabel.textContent = `${catIcon} ${label.replace('USDT', '')}`;
  }
}

function toggleSymbolFavorite(symbol) {
  if (_symbolFavorites.has(symbol)) {
    _symbolFavorites.delete(symbol);
  } else {
    _symbolFavorites.add(symbol);
  }
  _saveSymbolFavorites();
  _renderSymbolScroll();
}

/* ─────────────────────────  PRESETS  ───────────────────────── */

function _getAllPresets() {
  const style = TRADING_STYLES[_activeStyle];
  const builtIn = style ? style.presets.map(p => ({ ...p, builtIn: true })) : [];
  const custom = _customPresets
    .filter(p => !p.style || p.style === _activeStyle)
    .map(p => ({ ...p, builtIn: false }));
  return [...builtIn, ...custom];
}

function _renderPresets() {
  const container = document.getElementById('presetList');
  if (!container) return;
  container.innerHTML = '';
  const presets = _getAllPresets();
  presets.forEach((preset) => {
    const card = document.createElement('div');
    card.className = 'trading-preset-card';
    const sym = getWorkspaceActiveSymbol();
    const prompt = preset.prompt.replace('{symbol}', sym);
    const safeLabel = typeof esc === 'function' ? esc(preset.label) : preset.label;
    const safePreview = typeof esc === 'function' ? esc(prompt.substring(0, 90)) : prompt.substring(0, 90);
    card.innerHTML = `
      <div class="trading-preset-label">${safeLabel} ${!preset.builtIn ? '<span style="font-size:9px;color:var(--accent)">custom</span>' : ''}</div>
      <div class="trading-preset-preview">${safePreview}${prompt.length > 90 ? '…' : ''}</div>
    `;
    card.onclick = () => applyPreset(preset.prompt.replace('{symbol}', sym), TRADING_STYLES[_activeStyle]);
    container.appendChild(card);
  });
}

function applyPreset(prompt, style) {
  const msgInput = document.getElementById('msg');
  if (!msgInput) return;
  const sym = getWorkspaceActiveSymbol();

  const validIds = new Set(TV_PINE_SCRIPTS.map(s => s.id));
  // Use the style's recommended skills — only relevant skills for this preset
  const skillsText = (style?.skills || [])
    .filter(s => validIds.has(s))
    .map(s => (SKILL_META[s]?.icon || '🔧') + ' ' + s)
    .join(', ');

  const context = [
    `[Trading Context: ${style?.label || 'Analysis'} | ${sym} | ${style?.tf || '1h'}]`,
    prompt,
    skillsText ? `Skills: ${skillsText}` : null,
    `Timeframe: ${style?.tf || '1h'} | Bars: ${style?.bars || 500}`
  ].filter(Boolean).join('\n\n');

  setComposerValue(context.trim());
  msgInput.focus();
  closeAllTradingPanels();
  showToast(`✅ Preset loaded for ${sym}`, 2500);
}

/* ─────────────────────────  SKILLS GRID (recommended)  ───────────────────────── */

function runSkill(skillKey) {
  const style = TRADING_STYLES[_activeStyle];
  const tf = style ? style.tf.split(',')[0].trim() : '1h';
  const bars = style ? style.bars : 500;
  const sym = getWorkspaceActiveSymbol();
  const prompt = `Run ${skillKey} on ${sym} --tf ${tf} --bars ${bars} --json. Summarize key signals and actionable setup.`;
  setComposerValue(prompt);
  const msgInput = document.getElementById('msg');
  if (msgInput) msgInput.focus();
  closeAllTradingPanels();
  showToast(`🚀 Running ${skillKey} on ${sym}`, 2000);
}

/* ─────────────────────────  TV-PINE SKILLS TAB  ───────────────────────── */

function _initTvPineSkills() {
  // Use only TV-Pine scripts from /Volumes/ExMac/code/tradingview/js-experiment01-v3/.tv-scripts/
  if (_selectedSkills.size === 0 && TV_PINE_SCRIPTS.length > 0) {
    TV_PINE_SCRIPTS.forEach(s => _selectedSkills.add(s.id));
    _saveSelectedSkills();
  }
}

function _renderSkillsTabList() {
  const list = document.getElementById('skillsTabList');
  if (!list) return;

  list.innerHTML = '';

  // Update count
  const countEl = document.getElementById('skillsTabCount');
  if (countEl) countEl.textContent = _selectedSkills.size;

  // Simple flat list — no categories, no descriptions, no actions
  TV_PINE_SCRIPTS.forEach(s => {
    const isSelected = _selectedSkills.has(s.id);
    const row = document.createElement('label');
    row.className = 'trading-skill-row' + (isSelected ? ' selected' : '');
    row.dataset.skillId = s.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isSelected;
    checkbox.addEventListener('change', () => toggleSkill(s.id));

    const icon = document.createElement('span');
    icon.className = 'skill-row-icon';
    icon.textContent = s.icon;

    const name = document.createElement('span');
    name.className = 'skill-row-name';
    name.textContent = s.id.replace(/-/g, ' ');

    row.appendChild(checkbox);
    row.appendChild(icon);
    row.appendChild(name);
    list.appendChild(row);
  });
}

function toggleSkill(skillName) {
  if (_selectedSkills.has(skillName)) {
    _selectedSkills.delete(skillName);
  } else {
    _selectedSkills.add(skillName);
  }
  _saveSelectedSkills();
  _updateSkillsCount();
  _renderSkillsTabList();
}

function selectAllSkills() {
  TV_PINE_SCRIPTS.forEach(s => _selectedSkills.add(s.id));
  _saveSelectedSkills();
  _renderSkillsTabList();
  _updateSkillsCount();
}

function deselectAllSkills() {
  _selectedSkills.clear();
  _saveSelectedSkills();
  _renderSkillsTabList();
  _updateSkillsCount();
}

function applySelectedSkills() {
  const count = _selectedSkills.size;
  showToast(`${count} skill${count !== 1 ? 's' : ''} selected`, 2000);
}

function _updateSkillsCount() {
  // No badge in new design — count shown in Skills tab header
  const countEl = document.getElementById('skillsTabCount');
  if (countEl) countEl.textContent = _selectedSkills.size;
}

/* ─────────────────────────  SYMBOL TAPE  ───────────────────────── */

function _buildSymbolBar() {
  const composer = document.getElementById('composerWrap');
  if (!composer) return;
  const bar = document.createElement('div');
  bar.id = 'tradingSymbolBar';
  bar.className = 'trading-symbol-tape';
  bar.innerHTML = `
    <div class="tape-track" id="symbolBarItems"></div>
    <div class="tape-fade tape-fade-left" aria-hidden="true"></div>
    <div class="tape-fade tape-fade-right" aria-hidden="true"></div>
  `;
  composer.insertBefore(bar, composer.firstChild);
  _updateSymbolBar();
}

function _updateSymbolBar() {
  const container = document.getElementById('symbolBarItems');
  if (!container) return;

  // Build from: favorites first, then recent, then curated watchlist
  const curated = [
    { sym: 'BTCUSDT', group: 'majors' },
    { sym: 'ETHUSDT', group: 'majors' },
    { sym: 'SOLUSDT', group: 'altcoins' },
    { sym: 'ADAUSDT', group: 'altcoins' },
    { sym: 'DOGEUSDT', group: 'memes' },
    { sym: 'SHIBUSDT', group: 'memes' },
    { sym: 'UNIUSDT', group: 'defi' },
    { sym: 'AAVEUSDT', group: 'defi' },
    { sym: 'MATICUSDT', group: 'layer2' },
    { sym: 'OPUSDT', group: 'layer2' },
    { sym: 'FTMUSDT', group: 'layer1' },
    { sym: 'AVAXUSDT', group: 'altcoins' }
  ];

  // Deduplicate and prioritize favorites + recent
  const seen = new Set();
  const ordered = [];
  const add = (item) => { if (!seen.has(item.sym)) { seen.add(item.sym); ordered.push(item); } };

  [..._symbolFavorites].forEach(sym => {
    const g = Object.entries(CRYPTO_GROUPS).find(([, grp]) => grp.symbols.includes(sym));
    if (g) add({ sym, group: g[0] });
  });
  _symbolRecent.forEach(sym => {
    const g = Object.entries(CRYPTO_GROUPS).find(([, grp]) => grp.symbols.includes(sym));
    if (g) add({ sym, group: g[0] });
  });
  curated.forEach(add);

  let lastGroup = null;
  const cells = ordered.map((item, idx) => {
    const groupMeta = CRYPTO_GROUPS[item.group];
    const isActive = item.sym === _activeSymbol;
    const isFav = _symbolFavorites.has(item.sym);
    const short = item.sym.replace('USDT', '');
    const divider = (lastGroup && lastGroup !== item.group && idx > 0)
      ? '<span class="tape-divider" aria-hidden="true"></span>'
      : '';
    lastGroup = item.group;

    return divider + `
      <button class="tape-cell${isActive ? ' active' : ''}${isFav ? ' fav' : ''}" onclick="setActiveSymbol('${item.sym}')" title="${groupMeta?.label || ''}">
        <span class="tape-ticker">${short}</span>
        <span class="tape-pip" aria-hidden="true"></span>
        ${isActive ? '<span class="tape-cursor" aria-hidden="true"></span>' : ''}
      </button>
    `;
  }).join('');

  container.innerHTML = cells;
}

/* ─────────────────────────  COMPOSER COMMAND DOCK  ───────────────────────── */

function _buildComposerOverlay() {
  const composerBox = document.getElementById('composerBox');
  if (!composerBox) return;

  const dock = document.createElement('div');
  dock.id = 'tradingComposerOverlay';
  dock.className = 'trading-command-dock hidden';
  dock.innerHTML = `
    <div class="dock-section">
      <span class="dock-label">Direction</span>
      <button class="dock-btn long" onclick="quickAction('long')" title="Long setup">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l5-5 5 5"/><path d="M12 12V3"/></svg>
        <span>Long</span>
        <kbd class="dock-kbd">⌘L</kbd>
      </button>
      <button class="dock-btn short" onclick="quickAction('short')" title="Short setup">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7l5 5 5-5"/><path d="M12 12v9"/></svg>
        <span>Short</span>
        <kbd class="dock-kbd">⌘S</kbd>
      </button>
    </div>
    <div class="dock-section">
      <span class="dock-label">Analysis</span>
      <button class="dock-btn" onclick="quickAction('analyze')" title="Full technical analysis">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
        <span>Analyze</span>
        <kbd class="dock-kbd">⌘A</kbd>
      </button>
      <button class="dock-btn" onclick="quickAction('validate')" title="Validate current setup">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        <span>Validate</span>
        <kbd class="dock-kbd">⌘V</kbd>
      </button>
    </div>
    <div class="dock-section">
      <span class="dock-label">Scope</span>
      <button class="dock-btn" onclick="quickAction('multi')" title="Multi-timeframe confluence">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        <span>Multi-TF</span>
        <kbd class="dock-kbd">⌘M</kbd>
      </button>
    </div>
    <div class="dock-section">
      <span class="dock-label">Tools</span>
      <button class="dock-btn enhance" id="btnEnhance" onclick="enhancePrompt()" title="Enhance with Cohere">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <span>Enhance</span>
        <kbd class="dock-kbd">⌘E</kbd>
      </button>
    </div>
  `;
  composerBox.style.position = 'relative';
  composerBox.appendChild(dock);

  // Show on composer focus/hover, hide on outside click or Escape
  const msgInput = document.getElementById('msg');
  const composerWrap = document.getElementById('composerWrap');

  function showDock() { dock.classList.remove('hidden'); }
  function hideDock() { dock.classList.add('hidden'); }

  if (msgInput) {
    msgInput.addEventListener('focus', showDock);
    msgInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { hideDock(); return; }
      // Dock keyboard shortcuts — only when composer is focused
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey) {
        const map = { l: 'long', s: 'short', a: 'analyze', v: 'validate', m: 'multi', e: 'enhance' };
        const action = map[e.key.toLowerCase()];
        if (action) {
          e.preventDefault();
          if (action === 'enhance') enhancePrompt();
          else quickAction(action);
        }
      }
    });
  }
  if (composerWrap) {
    composerWrap.addEventListener('mouseenter', showDock);
    composerWrap.addEventListener('mouseleave', (e) => {
      // Only hide if focus is not inside
      if (!composerWrap.contains(document.activeElement)) hideDock();
    });
  }
  // Click outside hides
  document.addEventListener('click', (e) => {
    if (!composerWrap?.contains(e.target)) hideDock();
  });
}

function quickAction(action) {
  const style = TRADING_STYLES[_activeStyle];
  const tf = style ? style.tf : '1h';
  const sym = getWorkspaceActiveSymbol();
  const prompts = {
    long: `Analyze ${sym} for a LONG setup. Check trend alignment, volume confirmation, and optimal entry. Timeframe: ${tf}.`,
    short: `Analyze ${sym} for a SHORT setup. Check trend reversal signals, volume confirmation, and optimal entry. Timeframe: ${tf}.`,
    analyze: `Full technical analysis of ${sym} on ${tf}. Structure, volume, trend, and key levels.`,
    validate: `Validate the current ${sym} setup. Confirm signal quality, check confluence, and assess risk/reward.`,
    multi: `Multi-timeframe analysis of ${sym}: weekly → daily → 4h → 1h alignment. Identify highest-confluence direction.`
  };
  setComposerValue(prompts[action] || '');
  const msgInput = document.getElementById('msg');
  if (msgInput) msgInput.focus();
  closeAllTradingPanels();
}

/* ─────────────────────────  COHERE AUTO-ENHANCE  ───────────────────────── */

// Shared Cohere enhance proxy — key lives server-side via COHERE_API_KEY env var.
async function callCohere(systemPrompt, userContent) {
  console.log('[TradingUX] callCohere: proxying via /api/trading/enhance…');
  const res = await fetch('/api/trading/enhance', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      system_prompt: systemPrompt,
      user_content: userContent
    })
  });

  console.log('[TradingUX] callCohere: response status', res.status);

  const data = await res.json();
  if (!res.ok) {
    const msg = data.error || `HTTP ${res.status}`;
    console.error('[TradingUX] callCohere: proxy error:', msg);
    throw new Error(msg);
  }

  const text = data.enhanced;
  console.log('[TradingUX] callCohere: enhanced length:', text?.length);
  if (!text || !text.trim()) {
    throw new Error('Empty response from Cohere');
  }
  return text.trim();
}

async function enhancePrompt() {
  const msgInput = document.getElementById('msg');
  const btn = document.getElementById('btnEnhance');
  console.log('[TradingUX] enhancePrompt clicked');

  if (!msgInput) {
    console.warn('[TradingUX] msg input not found');
    showToast('Composer not ready', 3000);
    return;
  }
  if (!msgInput.value.trim()) {
    console.log('[TradingUX] composer empty');
    showToast('Type a prompt first, then click Enhance', 3000);
    return;
  }

  if (btn) {
    btn.disabled = true;
    const label = btn.querySelector('span');
    if (label) label.textContent = 'Enhancing…';
  }

  try {
    const currentPrompt = msgInput.value.trim();
    const validIds = new Set(TV_PINE_SCRIPTS.map(s => s.id));
    const skillsContext = [..._selectedSkills]
      .filter(s => validIds.has(s))
      .map(s => {
        const meta = SKILL_META[s] || { cat: 'Other', desc: s };
        return `- ${s} (${meta.cat}): ${meta.desc}`;
      }).join('\n') || 'No TV-Pine skills selected.';

    const mcpContext = _mcpServers.map(s => {
      return `- ${s.name || s}: MCP server`;
    }).join('\n') || 'No MCP servers configured.';

    const systemPrompt = `You are a trading prompt enhancement specialist. Your job is to take a user's trading-related prompt and make it more specific, actionable, and effective by incorporating the available tools and skills.

Available TradingView Pine Script Skills:
${skillsContext}

Available MCP Server Tools:
${mcpContext}

Enhancement rules:
1. Add specific skill names and parameters where relevant
2. Include timeframe and symbol context
3. Request structured output (JSON, bullet points, or clear sections)
4. Add validation steps where appropriate
5. Keep the original intent — do not change the user's goal
6. Output ONLY the enhanced prompt text, no explanations

Original prompt to enhance:`;

    console.log('[TradingUX] calling Cohere…');
    const enhanced = await callCohere(systemPrompt, currentPrompt);
    console.log('[TradingUX] Cohere response length:', enhanced.length);
    setComposerValue(enhanced);
    showToast('✨ Prompt enhanced by Cohere', 3000);

  } catch (e) {
    console.error('[TradingUX] Enhance failed:', e);
    const msg = e?.message || String(e);
    showToast('Enhance failed: ' + msg, 4000);
  } finally {
    if (btn) {
      btn.disabled = false;
      const label = btn.querySelector('span');
      if (label) label.textContent = 'Enhance';
    }
  }
}

async function _fetchMcpServers() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch('/api/mcp/servers', { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    _mcpServers = data.servers || [];
  } catch (e) {
    if (e.name !== 'AbortError') {
      console.warn('[TradingUX] Failed to fetch MCP servers:', e.message);
    }
    _mcpServers = [];
  } finally {
    clearTimeout(timeout);
  }
}

/* ─────────────────────────  PRESET EDITOR MODAL  ───────────────────────── */

/* ═════════════════════════════════════════════════════════════════════════════
   PRESET STUDIO — Sidebar list + modal editor with Cohere enhance
   ═════════════════════════════════════════════════════════════════════════════ */

/* ── Modal focus trap + Escape ── */
let _modalFocusTrap = null;
let _modalEscapeHandler = null;

function _trapFocus(e) {
  if (e.key !== 'Tab') return;
  const focusable = [...this.querySelectorAll('button, input, textarea, select, [tabindex]:not([tabindex="-1"])')].filter(el => !el.disabled && el.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

function _openModal(modalEl, focusFirst) {
  if (!modalEl) return;
  modalEl.classList.add('open');
  // Focus first interactive element
  const focusable = [...modalEl.querySelectorAll('button, input, textarea, select, [tabindex]:not([tabindex="-1"])')].filter(el => !el.disabled && el.offsetParent !== null);
  const target = focusFirst || focusable[0];
  if (target) setTimeout(() => target.focus(), 0);
  // Trap focus
  _modalFocusTrap = (e) => _trapFocus.call(modalEl, e);
  modalEl.addEventListener('keydown', _modalFocusTrap);
  // Escape to close
  _modalEscapeHandler = (e) => { if (e.key === 'Escape') { e.stopPropagation(); _closeActiveModal(modalEl); } };
  document.addEventListener('keydown', _modalEscapeHandler);
}

function _closeActiveModal(modalEl) {
  if (_modalFocusTrap && modalEl) modalEl.removeEventListener('keydown', _modalFocusTrap);
  if (_modalEscapeHandler) document.removeEventListener('keydown', _modalEscapeHandler);
  _modalFocusTrap = null;
  _modalEscapeHandler = null;
}

let _presetStudioStyle = 'scalp';
let _presetStudioEditing = null; // { idx: number|null, builtIn: boolean, style: string }

function loadPresetsPanel() {
  renderPresetsPanel();
}

function renderPresetsPanel() {
  const container = document.getElementById('presetsPanel');
  if (!container) return;

  const styles = Object.entries(TRADING_STYLES).map(([key, s]) =>
    `<button class="trading-group-chip${_presetStudioStyle === key ? ' active' : ''}" onclick="_setPresetStudioStyle('${key}')" style="flex:1;justify-content:center">${s.icon} ${s.label}</button>`
  ).join('');

  const style = TRADING_STYLES[_presetStudioStyle];
  const builtIn = (style?.presets || []).map((p, i) => ({
    label: p.label,
    prompt: p.prompt,
    skills: style.skills,
    tf: style.tf,
    bars: style.bars,
    builtIn: true,
    style: _presetStudioStyle,
    idx: i
  }));
  const custom = _customPresets
    .filter(p => p.style === _presetStudioStyle)
    .map((p, i) => ({ ...p, builtIn: false, idx: i }));

  const all = [...builtIn, ...custom];

  const list = all.map(p => `
    <div class="session-item" onclick="_openPresetModal(${p.idx}, ${p.builtIn}, '${p.style}')" style="padding:8px;cursor:pointer">
      <div class="session-text">
        <div class="session-title-row">
          <span style="font-size:12px;font-weight:600;color:var(--text)">${esc(p.label)}</span>
          ${p.builtIn ? '<span style="font-size:9px;color:var(--muted);background:var(--code-bg);padding:1px 5px;border-radius:4px">built-in</span>' : '<span style="font-size:9px;color:var(--accent);background:var(--accent-bg);padding:1px 5px;border-radius:4px">custom</span>'}
        </div>
        <div style="font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(p.prompt.substring(0, 60))}\u2026</div>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="trading-group-row" style="padding:4px 0 8px">${styles}</div>
    ${list || '<div style="padding:16px;text-align:center;color:var(--muted);font-size:12px">No presets for this style.</div>'}
  `;
}

function _setPresetStudioStyle(style) {
  _presetStudioStyle = style;
  renderPresetsPanel();
}

function _openPresetModal(idx, builtIn, styleKey) {
  _presetStudioEditing = { idx, builtIn, style: styleKey };
  const style = TRADING_STYLES[styleKey];
  let preset;
  if (builtIn) {
    preset = { ...style.presets[idx], skills: style.skills, tf: style.tf, bars: style.bars };
  } else {
    const p = _customPresets[idx];
    preset = { ...p, tf: style?.tf || '1h', bars: style?.bars || 500 };
  }
  _buildPresetEditorModal();
  _renderPresetModalContent(preset, builtIn);
  const modal = document.getElementById('presetEditorModal');
  _openModal(modal);
}

function _buildPresetEditorModal() {
  if (document.getElementById('presetEditorModal')) return;
  const overlay = document.createElement('div');
  overlay.id = 'presetEditorModal';
  overlay.className = 'trading-modal-overlay';
  overlay.innerHTML = `
    <div class="trading-modal" style="width:520px;max-height:85vh;display:flex;flex-direction:column">
      <div class="trading-modal-header">
        <div class="trading-modal-title" id="presetModalTitle">📝 Preset Editor</div>
        <button class="trading-modal-close" onclick="_closePresetModal()">✕</button>
      </div>
      <div class="trading-modal-body" id="presetModalBody" style="overflow-y:auto;flex:1"></div>
      <div class="trading-modal-footer" id="presetModalFooter"></div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function _renderPresetModalContent(preset, isBuiltIn) {
  const body = document.getElementById('presetModalBody');
  const footer = document.getElementById('presetModalFooter');
  const title = document.getElementById('presetModalTitle');
  if (!body || !footer) return;

  if (title) title.textContent = isBuiltIn ? '📖 View Preset (read-only)' : '📝 Edit Preset';

  const skillChips = TV_PINE_SCRIPTS.map(s => {
    const active = (preset.skills || []).includes(s.id);
    const disabled = isBuiltIn ? 'disabled style="opacity:.5;cursor:not-allowed"' : 'onclick="_toggleModalSkill(this, \'${s.id}\')"';
    return `<button type="button" class="trading-group-chip${active ? ' active' : ''}" ${disabled} data-skill="${s.id}">${s.icon} ${s.id}</button>`;
  }).join('');

  const readOnly = isBuiltIn ? 'readonly' : '';
  const tf = preset.tf || '1h';
  const bars = preset.bars || 500;

  body.innerHTML = `
    <div style="margin-bottom:14px">
      <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">Preset Name</label>
      <input type="text" id="pmLabel" value="${esc(preset.label)}" ${readOnly} style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid var(--border2);background:var(--code-bg);color:var(--text);font-size:14px;font-family:inherit">
    </div>
    <div style="margin-bottom:14px">
      <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">Prompt Template</label>
      <textarea id="pmPrompt" rows="5" ${readOnly} style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border2);background:var(--code-bg);color:var(--text);font-size:13px;font-family:inherit;resize:vertical;line-height:1.5">${esc(preset.prompt)}</textarea>
      <div style="font-size:11px;color:var(--muted);margin-top:4px">Use <code>{symbol}</code> as placeholder for the active symbol.</div>
    </div>
    <div style="margin-bottom:14px">
      <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">Recommended Skills</label>
      <div class="trading-group-row" style="flex-wrap:wrap;padding-bottom:0">${skillChips}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
      <div>
        <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">Timeframe</label>
        <input type="text" id="pmTf" value="${esc(tf)}" ${readOnly} style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid var(--border2);background:var(--code-bg);color:var(--text);font-size:13px;font-family:inherit">
      </div>
      <div>
        <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">Bars</label>
        <input type="number" id="pmBars" value="${bars}" ${readOnly} style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid var(--border2);background:var(--code-bg);color:var(--text);font-size:13px;font-family:inherit">
      </div>
    </div>
    ${!isBuiltIn ? `
    <div style="margin-bottom:8px">
      <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">Cohere Assistant</label>
      <div style="background:var(--code-bg);border:1px solid var(--border2);border-radius:10px;padding:12px">
        <textarea id="pmCohereInstructions" rows="2" placeholder="Describe how you want to improve this preset (e.g., 'Make it more specific about entry criteria')" style="width:100%;padding:8px 12px;border-radius:6px;border:1px solid var(--border2);background:var(--surface);color:var(--text);font-size:12px;font-family:inherit;resize:vertical;margin-bottom:8px"></textarea>
        <button type="button" class="trading-setup-btn" onclick="_enhancePresetModalWithCohere()">✨ Enhance with Cohere</button>
      </div>
    </div>
    ` : ''}
  `;

  if (isBuiltIn) {
    footer.innerHTML = `
      <button onclick="_closePresetModal()">Close</button>
      <button class="primary" onclick="_duplicatePresetFromModal()">📋 Duplicate & Edit</button>
    `;
  } else {
    footer.innerHTML = `
      <button onclick="_closePresetModal()">Cancel</button>
      <button onclick="_deletePresetFromModal()" style="color:var(--error)">Delete</button>
      <button class="primary" onclick="_savePresetFromModal()">Save</button>
    `;
  }
}

function _toggleModalSkill(btn, skillId) {
  btn.classList.toggle('active');
}

function _closePresetModal() {
  const modal = document.getElementById('presetEditorModal');
  if (modal) {
    _closeActiveModal(modal);
    modal.classList.remove('open');
  }
  _presetStudioEditing = null;
}

/* ─────────────────────────  COHERE SETTINGS MODAL  ───────────────────────── */

function _duplicatePresetFromModal() {
  const labelEl = document.getElementById('pmLabel');
  const promptEl = document.getElementById('pmPrompt');
  const tfEl = document.getElementById('pmTf');
  const barsEl = document.getElementById('pmBars');
  const edit = _presetStudioEditing;
  if (!edit) return;

  const label = (labelEl?.value.trim() || 'Copy') + ' (copy)';
  const prompt = promptEl?.value.trim() || '';
  const skills = Array.from(document.querySelectorAll('#presetModalBody .trading-group-chip.active')).map(b => b.dataset.skill).filter(Boolean);
  const tf = tfEl?.value.trim() || '1h';
  const bars = parseInt(barsEl?.value, 10) || 500;

  _customPresets.push({ label, prompt, skills, style: edit.style, tf, bars });
  _saveCustomPresets();
  renderPresetsPanel();
  _closePresetModal();
  showToast('✅ Preset duplicated — now editable', 2500);
}

function _savePresetFromModal() {
  const labelEl = document.getElementById('pmLabel');
  const promptEl = document.getElementById('pmPrompt');
  const tfEl = document.getElementById('pmTf');
  const barsEl = document.getElementById('pmBars');
  if (!labelEl || !promptEl) return;

  const label = labelEl.value.trim();
  const prompt = promptEl.value.trim();
  if (!label || !prompt) {
    showToast('Name and prompt are required', 3000);
    return;
  }

  const skills = Array.from(document.querySelectorAll('#presetModalBody .trading-group-chip.active')).map(b => b.dataset.skill).filter(Boolean);
  const tf = tfEl?.value.trim() || '1h';
  const bars = parseInt(barsEl?.value, 10) || 500;

  const edit = _presetStudioEditing;
  if (edit && !edit.builtIn) {
    const idx = _customPresets.findIndex((p, i) => i === edit.idx && p.style === edit.style);
    if (idx >= 0) {
      _customPresets[idx] = { label, prompt, skills, style: edit.style, tf, bars };
    } else {
      _customPresets.push({ label, prompt, skills, style: edit.style, tf, bars });
    }
  } else {
    _customPresets.push({ label, prompt, skills, style: _presetStudioStyle, tf, bars });
  }

  _saveCustomPresets();
  renderPresetsPanel();
  _closePresetModal();
  showToast('✅ Preset saved', 2000);
}

function _deletePresetFromModal() {
  const edit = _presetStudioEditing;
  if (!edit || edit.builtIn) return;
  if (!confirm('Delete this custom preset?')) return;
  _customPresets.splice(edit.idx, 1);
  _saveCustomPresets();
  renderPresetsPanel();
  _closePresetModal();
  showToast('Preset deleted', 2000);
}

function createNewPreset() {
  _presetStudioEditing = null;
  const style = TRADING_STYLES[_presetStudioStyle];
  _buildPresetEditorModal();

  const body = document.getElementById('presetModalBody');
  const footer = document.getElementById('presetModalFooter');
  const title = document.getElementById('presetModalTitle');
  if (!body || !footer) return;
  if (title) title.textContent = '📝 New Preset';

  const skillChips = TV_PINE_SCRIPTS.map(s => {
    const active = (style?.skills || []).includes(s.id);
    return `<button type="button" class="trading-group-chip${active ? ' active' : ''}" onclick="_toggleModalSkill(this, '${s.id}')" data-skill="${s.id}">${s.icon} ${s.id}</button>`;
  }).join('');

  body.innerHTML = `
    <div style="margin-bottom:14px">
      <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">Preset Name</label>
      <input type="text" id="pmLabel" placeholder="e.g. London Breakout" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid var(--border2);background:var(--code-bg);color:var(--text);font-size:14px;font-family:inherit">
    </div>
    <div style="margin-bottom:14px">
      <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">Prompt Template</label>
      <textarea id="pmPrompt" rows="5" placeholder="Describe the analysis request. Use {symbol} as placeholder." style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border2);background:var(--code-bg);color:var(--text);font-size:13px;font-family:inherit;resize:vertical;line-height:1.5"></textarea>
    </div>
    <div style="margin-bottom:14px">
      <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">Recommended Skills</label>
      <div class="trading-group-row" style="flex-wrap:wrap;padding-bottom:0">${skillChips}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
      <div>
        <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">Timeframe</label>
        <input type="text" id="pmTf" value="${esc(style?.tf || '1h')}" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid var(--border2);background:var(--code-bg);color:var(--text);font-size:13px;font-family:inherit">
      </div>
      <div>
        <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">Bars</label>
        <input type="number" id="pmBars" value="${style?.bars || 500}" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid var(--border2);background:var(--code-bg);color:var(--text);font-size:13px;font-family:inherit">
      </div>
    </div>
    <div style="margin-bottom:8px">
      <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">Cohere Assistant</label>
      <div style="background:var(--code-bg);border:1px solid var(--border2);border-radius:10px;padding:12px">
        <textarea id="pmCohereInstructions" rows="2" placeholder="Describe how you want to improve this preset" style="width:100%;padding:8px 12px;border-radius:6px;border:1px solid var(--border2);background:var(--surface);color:var(--text);font-size:12px;font-family:inherit;resize:vertical;margin-bottom:8px"></textarea>
        <button type="button" class="trading-setup-btn" onclick="_enhancePresetModalWithCohere()">✨ Enhance with Cohere</button>
      </div>
    </div>
  `;

  footer.innerHTML = `
    <button onclick="_closePresetModal()">Cancel</button>
    <button class="primary" onclick="_savePresetFromModal()">Save</button>
  `;

  const modal = document.getElementById('presetEditorModal');
  _openModal(modal);
}

async function _enhancePresetModalWithCohere() {
  const promptEl = document.getElementById('pmPrompt');
  const instructionsEl = document.getElementById('pmCohereInstructions');
  if (!promptEl) return;

  const currentPrompt = promptEl.value.trim();
  if (!currentPrompt) {
    showToast('Write a prompt first, then click Enhance', 3000);
    return;
  }

  const instructions = instructionsEl?.value.trim() || 'Improve this trading prompt to be more specific, actionable, and effective.';
  const activeSkills = Array.from(document.querySelectorAll('#presetModalBody .trading-group-chip.active')).map(b => b.dataset.skill).filter(Boolean);
  const skillsContext = activeSkills.map(s => {
    const meta = SKILL_META[s] || { cat: 'Other', desc: s };
    return `- ${s} (${meta.cat}): ${meta.desc}`;
  }).join('\n') || 'No skills selected.';

  const btn = document.querySelector('#presetModalBody .trading-setup-btn');
  const originalText = btn?.textContent || '✨ Enhance with Cohere';
  if (btn) { btn.disabled = true; btn.textContent = '✨ Enhancing\u2026'; }

  try {
    const systemPrompt = `You are a trading prompt enhancement specialist. Your job is to improve trading-related prompt templates.\n\nAvailable TradingView Pine Script Skills:\n${skillsContext}\n\nEnhancement rules:\n1. Add specific skill names and parameters where relevant\n2. Include timeframe and symbol context (use {symbol} placeholder)\n3. Request structured output (JSON, bullet points, or clear sections)\n4. Add validation steps where appropriate\n5. Keep the original intent — do not change the user's goal\n6. Output ONLY the enhanced prompt text, no explanations\n\nUser instruction: ${instructions}\n\nOriginal prompt to enhance:`;

    const enhanced = await callCohere(systemPrompt, currentPrompt);
    promptEl.value = enhanced;
    showToast('✨ Preset enhanced by Cohere', 3000);

  } catch (e) {
    console.error('[PresetStudio] Enhance failed:', e.message);
    showToast('Enhance failed: ' + e.message, 4000);
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = originalText; }
  }
}

/* ─────────────────────────  BOOT  ───────────────────────── */

// Initialization is triggered by the main boot script (boot.js) after
// DOMContentLoaded. Do NOT call initTradingUX() here — it creates a race
// condition where _buildTradingUI may fire twice.
//
// boot.js calls: initTradingUX(); initSidebarInteractivity();

