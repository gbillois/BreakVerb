const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("bestScore");
const livesEl = document.getElementById("lives");
const levelEl = document.getElementById("level");
const remainingEl = document.getElementById("remaining");
const modeLabelEl = document.getElementById("modeLabel");
const pauseBtn = document.getElementById("pauseBtn");

const screenOverlay = document.getElementById("screenOverlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const startBtn = document.getElementById("startBtn");
const nameEntry = document.getElementById("nameEntry");
const playerNameInput = document.getElementById("playerNameInput");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const leaderboardList = document.getElementById("leaderboardList");
const difficultyButtons = Array.from(document.querySelectorAll(".difficulty-btn"));

const quizOverlay = document.getElementById("quizOverlay");
const quizPrompt = document.getElementById("quizPrompt");
const quizTimerEl = document.getElementById("quizTimer");
const quizChoices = document.getElementById("quizChoices");
const quizFeedback = document.getElementById("quizFeedback");
const arenaWrap = document.querySelector(".arena-wrap");

const LANDSCAPE_WORLD = { width: 960, height: 540 };
const PORTRAIT_WORLD = { width: 600, height: 960 };
let WORLD_WIDTH = LANDSCAPE_WORLD.width;
let WORLD_HEIGHT = LANDSCAPE_WORLD.height;
const BONUS_BRICK_RATIO = 0.15;
const LEADERBOARD_KEY = "breakverb_leaderboard_v1";
const SETTINGS_KEY = "breakverb_settings_v1";

const DIFFICULTY_MODES = {
  easy: { label: "Facile", quizTime: null },
  normal: { label: "Normal", quizTime: 10 },
  expert: { label: "Expert", quizTime: 5 },
};

canvas.width = WORLD_WIDTH;
canvas.height = WORLD_HEIGHT;

const IRREGULAR_VERBS = [
  { base: "be", past: "was/were", pp: "been" },
  { base: "begin", past: "began", pp: "begun" },
  { base: "break", past: "broke", pp: "broken" },
  { base: "bring", past: "brought", pp: "brought" },
  { base: "build", past: "built", pp: "built" },
  { base: "buy", past: "bought", pp: "bought" },
  { base: "catch", past: "caught", pp: "caught" },
  { base: "choose", past: "chose", pp: "chosen" },
  { base: "come", past: "came", pp: "come" },
  { base: "cost", past: "cost", pp: "cost" },
  { base: "cut", past: "cut", pp: "cut" },
  { base: "do", past: "did", pp: "done" },
  { base: "draw", past: "drew", pp: "drawn" },
  { base: "drink", past: "drank", pp: "drunk" },
  { base: "drive", past: "drove", pp: "driven" },
  { base: "eat", past: "ate", pp: "eaten" },
  { base: "fall", past: "fell", pp: "fallen" },
  { base: "feel", past: "felt", pp: "felt" },
  { base: "find", past: "found", pp: "found" },
  { base: "fly", past: "flew", pp: "flown" },
  { base: "forget", past: "forgot", pp: "forgotten" },
  { base: "get", past: "got", pp: "gotten" },
  { base: "give", past: "gave", pp: "given" },
  { base: "go", past: "went", pp: "gone" },
  { base: "grow", past: "grew", pp: "grown" },
  { base: "have", past: "had", pp: "had" },
  { base: "hear", past: "heard", pp: "heard" },
  { base: "hold", past: "held", pp: "held" },
  { base: "keep", past: "kept", pp: "kept" },
  { base: "know", past: "knew", pp: "known" },
  { base: "leave", past: "left", pp: "left" },
  { base: "lose", past: "lost", pp: "lost" },
  { base: "make", past: "made", pp: "made" },
  { base: "meet", past: "met", pp: "met" },
  { base: "pay", past: "paid", pp: "paid" },
  { base: "put", past: "put", pp: "put" },
  { base: "read", past: "read", pp: "read" },
  { base: "run", past: "ran", pp: "run" },
  { base: "say", past: "said", pp: "said" },
  { base: "see", past: "saw", pp: "seen" },
  { base: "sell", past: "sold", pp: "sold" },
  { base: "send", past: "sent", pp: "sent" },
  { base: "sing", past: "sang", pp: "sung" },
  { base: "sit", past: "sat", pp: "sat" },
  { base: "sleep", past: "slept", pp: "slept" },
  { base: "speak", past: "spoke", pp: "spoken" },
  { base: "spend", past: "spent", pp: "spent" },
  { base: "stand", past: "stood", pp: "stood" },
  { base: "swim", past: "swam", pp: "swum" },
  { base: "take", past: "took", pp: "taken" },
  { base: "teach", past: "taught", pp: "taught" },
  { base: "tell", past: "told", pp: "told" },
  { base: "think", past: "thought", pp: "thought" },
  { base: "understand", past: "understood", pp: "understood" },
  { base: "wear", past: "wore", pp: "worn" },
  { base: "win", past: "won", pp: "won" },
  { base: "write", past: "wrote", pp: "written" },
];

const LEVEL_PATTERNS = [
  {
    name: "UK - Croix de St George",
    grid: [
      "............",
      ".WWWWRRWWWW.",
      ".WWWWRRWWWW.",
      ".RRRRRRRRRR.",
      ".RRRRRRRRRR.",
      ".WWWWRRWWWW.",
      ".WWWWRRWWWW.",
      ".WWWWRRWWWW.",
      ".WWWWRRWWWW.",
      "............",
    ],
  },
  {
    name: "UK - Big Ben",
    grid: [
      ".....YY.....",
      "....YYYY....",
      "....YGGY....",
      "....YGGY....",
      "....YGGY....",
      "...YYGGYY...",
      "...YYGGYY...",
      "...YYGGYY...",
      "...YYYYYY...",
      "...YYYYYY...",
    ],
  },
  {
    name: "UK - Couronne Royale",
    grid: [
      "............",
      "..G......G..",
      ".GGG....GGG.",
      ".GGGGGGGGGG.",
      "..RRGGGGRR..",
      "...RRRRRR...",
      "..YYYYYYYY..",
      "..YY....YY..",
      "...YYYYYY...",
      "............",
    ],
  },
  {
    name: "UK - Union Jack",
    grid: [
      ".BWWRRWWWB..",
      "BBWWRRWWBB..",
      "WWWWRRWWWW..",
      "RRRRRRRRRR..",
      "RRRRRRRRRR..",
      "WWWWRRWWWW..",
      "BBWWRRWWBB..",
      ".BWWRRWWWB..",
      "............",
      "............",
    ],
  },
  {
    name: "USA - Aigle",
    grid: [
      "..B......B..",
      ".BBBWWWWBBB.",
      "BBBBWWWWBBBB",
      ".BBWWYYWWBB.",
      "..BWWYYWWB..",
      "...WWWWWW...",
      "..BBWWWWBB..",
      ".BBBB..BBBB.",
      "..BB....BB..",
      "............",
    ],
  },
  {
    name: "USA - Statue de la Liberte",
    grid: [
      ".....Y......",
      "....YYY.....",
      "....YYY.....",
      "....GGG.....",
      "...GGGGG....",
      "...GGGGG....",
      "...GGBBG....",
      "...GGBBG....",
      "..GGGGGG....",
      ".GGGGGGGG...",
    ],
  },
  {
    name: "USA - Stars and Stripes",
    grid: [
      "BBBBBBRRRRRR",
      "BWBWBBWWWWWW",
      "BBBBBBRRRRRR",
      "BWBWBBWWWWWW",
      "RRRRRRRRRRRR",
      "WWWWWWWWWWWW",
      "RRRRRRRRRRRR",
      "WWWWWWWWWWWW",
      "RRRRRRRRRRRR",
      "WWWWWWWWWWWW",
    ],
  },
  {
    name: "Australie - Koala",
    grid: [
      "...BB..BB...",
      "..BBBBBBBB..",
      ".BBBWWWWBBB.",
      ".BBWWWWWWBB.",
      ".BBWWGGWWBB.",
      "..BWWWWWWB..",
      "..BWWWWWWB..",
      "...BBWWBB...",
      "...B....B...",
      "............",
    ],
  },
  {
    name: "Australie - Boomerang",
    grid: [
      "............",
      "..YY........",
      "...YYYY.....",
      ".....YYYY...",
      ".......YYYY.",
      "......YYYY..",
      "....YYYY....",
      "..YYYY......",
      ".YYYY.......",
      "............",
    ],
  },
  {
    name: "Australie - Opera de Sydney",
    grid: [
      "............",
      "....WW......",
      "...WWWW.....",
      "..WWWWWW....",
      ".WWWWWWWW...",
      "..BBWWBB....",
      ".BBBBBBBB...",
      "BBBBBBBBBB..",
      "............",
      "............",
    ],
  },
  {
    name: "France - Tour Eiffel",
    grid: [
      ".....BB.....",
      "....BBBB....",
      "...BBBBBB...",
      "...BBBBBB...",
      "....BBBB....",
      "....BBBB....",
      "...BB..BB...",
      "..BBB..BBB..",
      ".BBBBBBBBBB.",
      ".....BB.....",
    ],
  },
  {
    name: "Canada - Feuille d Erable",
    grid: [
      ".....R......",
      "....RRR.....",
      "..RRRRRRR...",
      "...RRRRR....",
      ".RRRRRRRRR..",
      "..RRRRRRR...",
      "...RRRRR....",
      "...RR.RR....",
      "...RR.RR....",
      "............",
    ],
  },
  {
    name: "Japon - Torii",
    grid: [
      "............",
      ".RRRRRRRRRR.",
      "...RRRRRR...",
      "...RRRRRR...",
      "...RRRRRR...",
      "..RR....RR..",
      "..RR....RR..",
      "..RR....RR..",
      ".RRR....RRR.",
      "............",
    ],
  },
  {
    name: "Bresil - Ballon",
    grid: [
      "....YYYY....",
      "..YYYYYYYY..",
      ".YYGGGGGGYY.",
      ".YGGGBBGGGY.",
      ".YGGGBBGGGY.",
      ".YYGGGGGGYY.",
      "..YYYYYYYY..",
      "....YYYY....",
      "............",
      "............",
    ],
  },
  {
    name: "Egypte - Pyramide",
    grid: [
      ".....Y......",
      "....YYY.....",
      "...YYYYY....",
      "..YYYYYYY...",
      ".YYYYYYYYY..",
      "YYYYYYYYYYYY",
      "...Y....Y...",
      "..YY....YY..",
      ".YYY....YYY.",
      "............",
    ],
  },
];

const BRICK_COLORS = {
  R: { h: 2, s: 82, l: 54, text: "#fff1f1" },
  W: { h: 42, s: 28, l: 87, text: "#142136" },
  B: { h: 212, s: 72, l: 49, text: "#eef7ff" },
  Y: { h: 45, s: 90, l: 56, text: "#2a200a" },
  G: { h: 164, s: 30, l: 44, text: "#f3fff8" },
  D: { h: 24, s: 82, l: 53, text: "#fff9eb" },
};

const BONUS_TYPES = [
  { id: "long_paddle", name: "Raquette XL", icon: "P+", color: "#7ce8ff", weight: 1 },
  { id: "multiball", name: "Double Balle", icon: "2B", color: "#ffd36b", weight: 1 },
  { id: "extra_life", name: "Vies Bonus", icon: "+2", color: "#8dff91", weight: 2.4, lives: 2 },
  { id: "slow_ball", name: "Balle Lente", icon: "SL", color: "#ff9ed2", weight: 1 },
];

const paddle = {
  width: 148,
  height: 16,
  x: WORLD_WIDTH / 2 - 74,
  y: WORLD_HEIGHT - 36,
  speed: 680,
};

function createBall(x, y, vx = 260, vy = -320) {
  return {
    x,
    y,
    vx,
    vy,
    radius: 9,
    maxSpeed: state.isPortraitMode ? 900 : 860,
  };
}

const state = {
  running: false,
  paused: false,
  awaitingAnswer: false,
  ballLocked: true,
  countdownActive: false,
  roundCountdown: 0,
  startedOnce: false,
  score: 0,
  bestScore: 0,
  lives: 3,
  level: 1,
  combo: 0,
  remaining: 0,
  patternName: "",
  basePaddleWidth: 148,
  keys: {
    left: false,
    right: false,
  },
  balls: [],
  bricks: [],
  particles: [],
  fallingBonuses: [],
  bonusQueue: [],
  pendingQuestion: null,
  quizTimeLeft: 0,
  quizSelectedIndex: -1,
  difficulty: "normal",
  leaderboard: [],
  pendingLeaderboardScore: null,
  effects: {
    paddleTimer: 0,
  },
  touchControlActive: false,
  touchPointerId: null,
  touchTargetX: WORLD_WIDTH / 2,
  notice: "",
  noticeTimer: 0,
  isPortraitMode: false,
};

let previousTime = 0;

function shuffleArray(array) {
  const out = [...array];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomWeightedItem(list, weightKey = "weight") {
  let total = 0;
  for (let i = 0; i < list.length; i += 1) {
    total += Math.max(0, Number(list[i][weightKey]) || 0);
  }
  if (total <= 0) return randomItem(list);

  let roll = Math.random() * total;
  for (let i = 0; i < list.length; i += 1) {
    roll -= Math.max(0, Number(list[i][weightKey]) || 0);
    if (roll <= 0) return list[i];
  }
  return list[list.length - 1];
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function readJsonStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJsonStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    // Ignore storage errors (private mode, quota, etc.)
  }
}

function renderDifficultyButtons() {
  const mode = DIFFICULTY_MODES[state.difficulty] ? state.difficulty : "normal";
  state.difficulty = mode;
  difficultyButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.difficulty === mode);
  });
  if (modeLabelEl) modeLabelEl.textContent = DIFFICULTY_MODES[mode].label;
}

function setDifficulty(mode, persist = true) {
  if (!DIFFICULTY_MODES[mode]) return;
  state.difficulty = mode;
  renderDifficultyButtons();
  if (persist) {
    writeJsonStorage(SETTINGS_KEY, { difficulty: mode });
  }
}

function loadSettings() {
  const settings = readJsonStorage(SETTINGS_KEY, {});
  if (settings && DIFFICULTY_MODES[settings.difficulty]) {
    state.difficulty = settings.difficulty;
  } else {
    state.difficulty = "normal";
  }
  renderDifficultyButtons();
}

function normalizeLeaderboardRows(rows) {
  if (!Array.isArray(rows)) return [];
  const safeRows = [];
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    if (!row || typeof row !== "object") continue;
    const score = Number(row.score) || 0;
    const level = Math.max(1, Number(row.level) || 1);
    const name = `${row.name || "PLAYER"}`.slice(0, 16);
    if (score <= 0) continue;
    safeRows.push({ name, score, level, date: Number(row.date) || Date.now() });
  }
  safeRows.sort((a, b) => b.score - a.score || b.level - a.level || a.date - b.date);
  return safeRows.slice(0, 10);
}

function loadLeaderboard() {
  state.leaderboard = normalizeLeaderboardRows(readJsonStorage(LEADERBOARD_KEY, []));
  state.bestScore = state.leaderboard.length > 0 ? state.leaderboard[0].score : 0;
  renderLeaderboard();
}

function saveLeaderboard() {
  state.leaderboard = normalizeLeaderboardRows(state.leaderboard);
  writeJsonStorage(LEADERBOARD_KEY, state.leaderboard);
  state.bestScore = state.leaderboard.length > 0 ? state.leaderboard[0].score : 0;
  renderLeaderboard();
}

function isLeaderboardScore(score) {
  if (score <= 0) return false;
  if (state.leaderboard.length < 10) return true;
  return score > state.leaderboard[state.leaderboard.length - 1].score;
}

function addLeaderboardEntry(name, score, level) {
  if (score <= 0) return;
  const finalName = `${name || "PLAYER"}`.trim().slice(0, 16) || "PLAYER";
  state.leaderboard.push({
    name: finalName,
    score: Math.floor(score),
    level: Math.max(1, Math.floor(level)),
    date: Date.now(),
  });
  saveLeaderboard();
}

function renderLeaderboard() {
  if (!leaderboardList) return;
  leaderboardList.innerHTML = "";
  if (state.leaderboard.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Aucun score pour le moment.";
    leaderboardList.appendChild(li);
  } else {
    state.leaderboard.forEach((row) => {
      const li = document.createElement("li");
      li.textContent = `${row.name} — ${row.score} pts (Niv. ${row.level})`;
      leaderboardList.appendChild(li);
    });
  }
  if (bestScoreEl) {
    bestScoreEl.textContent = `${Math.max(state.bestScore, state.score)}`;
  }
}

function setNameEntryVisible(visible) {
  if (!nameEntry) return;
  nameEntry.classList.toggle("hidden", !visible);
  if (visible && playerNameInput) {
    playerNameInput.value = "";
    playerNameInput.focus();
  }
}

function getBrickLayout() {
  return {
    top: WORLD_HEIGHT * (state.isPortraitMode ? 0.075 : 0.115),
    sideMargin: WORLD_WIDTH * (state.isPortraitMode ? 0.02 : 0.015),
    gap: Math.max(3, WORLD_WIDTH * (state.isPortraitMode ? 0.006 : 0.0042)),
  };
}

function fitCanvasToViewport() {
  if (!arenaWrap) return;
  const rect = arenaWrap.getBoundingClientRect();
  if (rect.width < 8 || rect.height < 8) return;
  const scale = Math.min(rect.width / WORLD_WIDTH, rect.height / WORLD_HEIGHT);
  const cssWidth = Math.max(12, Math.floor(WORLD_WIDTH * scale));
  const cssHeight = Math.max(12, Math.floor(WORLD_HEIGHT * scale));
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
}

function updateWorldBounds(portraitMode, preserveObjects = true) {
  const target = portraitMode ? PORTRAIT_WORLD : LANDSCAPE_WORLD;
  if (target.width === WORLD_WIDTH && target.height === WORLD_HEIGHT) {
    fitCanvasToViewport();
    return;
  }

  const oldWidth = WORLD_WIDTH;
  const oldHeight = WORLD_HEIGHT;
  const scaleX = target.width / oldWidth;
  const scaleY = target.height / oldHeight;

  WORLD_WIDTH = target.width;
  WORLD_HEIGHT = target.height;
  state.isPortraitMode = portraitMode;
  document.body.classList.toggle("portrait-mode", portraitMode);
  canvas.width = WORLD_WIDTH;
  canvas.height = WORLD_HEIGHT;

  if (preserveObjects) {
    paddle.width = clamp(paddle.width * scaleX, 96, 240);
    paddle.x = clamp(paddle.x * scaleX, 8, WORLD_WIDTH - paddle.width - 8);
    paddle.y = WORLD_HEIGHT - 36;
    state.basePaddleWidth = clamp(state.basePaddleWidth * scaleX, 96, 220);
    state.touchTargetX *= scaleX;

    for (let i = 0; i < state.balls.length; i += 1) {
      const ball = state.balls[i];
      ball.x *= scaleX;
      ball.y *= scaleY;
      ball.vx *= scaleX;
      ball.vy *= scaleY;
      ball.maxSpeed = portraitMode ? 900 : 860;
      stabilizeBall(ball);
    }

    for (let i = 0; i < state.bricks.length; i += 1) {
      const brick = state.bricks[i];
      brick.x *= scaleX;
      brick.y *= scaleY;
      brick.w *= scaleX;
      brick.h *= scaleY;
    }

    for (let i = 0; i < state.fallingBonuses.length; i += 1) {
      const bonus = state.fallingBonuses[i];
      bonus.x *= scaleX;
      bonus.y *= scaleY;
      bonus.w *= scaleX;
      bonus.h *= scaleY;
      bonus.vy *= scaleY;
    }

    for (let i = 0; i < state.particles.length; i += 1) {
      state.particles[i].x *= scaleX;
      state.particles[i].y *= scaleY;
    }
  } else {
    paddle.y = WORLD_HEIGHT - 36;
    state.touchTargetX = WORLD_WIDTH * 0.5;
  }

  fitCanvasToViewport();
}

function stabilizeBall(ball) {
  let speed = Math.hypot(ball.vx, ball.vy);
  if (!Number.isFinite(speed) || speed < 1) {
    ball.vx = 220;
    ball.vy = -260;
    speed = Math.hypot(ball.vx, ball.vy);
  }

  if (speed > ball.maxSpeed) {
    const factor = ball.maxSpeed / speed;
    ball.vx *= factor;
    ball.vy *= factor;
    speed = ball.maxSpeed;
  }

  if (speed < 190) {
    const factor = 190 / speed;
    ball.vx *= factor;
    ball.vy *= factor;
    speed = 190;
  }

  const minVy = Math.max(110, speed * 0.24);
  if (Math.abs(ball.vy) < minVy) {
    const signY = ball.vy === 0 ? (Math.random() < 0.5 ? -1 : 1) : Math.sign(ball.vy);
    ball.vy = signY * minVy;
    const vxAbs = Math.sqrt(Math.max(120, speed * speed - ball.vy * ball.vy));
    const signX = ball.vx === 0 ? (Math.random() < 0.5 ? -1 : 1) : Math.sign(ball.vx);
    ball.vx = signX * vxAbs;
  }
}

function roundRect(x, y, w, h, r) {
  const radius = Math.min(r, w * 0.5, h * 0.5);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.arcTo(x + w, y, x + w, y + radius, radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
  ctx.lineTo(x + radius, y + h);
  ctx.arcTo(x, y + h, x, y + h - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

function refreshHud() {
  scoreEl.textContent = `${state.score}`;
  bestScoreEl.textContent = `${Math.max(state.bestScore, state.score)}`;
  livesEl.textContent = `${state.lives}`;
  levelEl.textContent = `${state.level}`;
  remainingEl.textContent = `${state.remaining}`;
  if (modeLabelEl) modeLabelEl.textContent = DIFFICULTY_MODES[state.difficulty].label;
  if (pauseBtn) pauseBtn.textContent = state.paused ? "Reprendre" : "Pause";
}

function showNotice(text, duration = 2.1) {
  state.notice = text;
  state.noticeTimer = duration;
}

function startRoundCountdown(seconds = 3) {
  if (!state.running) return;
  state.countdownActive = true;
  state.roundCountdown = Math.max(0.1, seconds);
  state.ballLocked = true;
  state.paused = false;
}

function resetBalls(lock = true) {
  state.ballLocked = lock;
  const ball = createBall(paddle.x + paddle.width * 0.5, paddle.y - 11, 260, -330);
  state.balls = [ball];
}

function launchBall() {
  if (!state.ballLocked || state.awaitingAnswer || state.balls.length === 0 || state.paused) return;
  if (state.countdownActive) return;
  state.ballLocked = false;
  const ball = state.balls[0];
  const side = Math.random() < 0.5 ? -1 : 1;
  ball.vx = side * (240 + state.level * 16);
  ball.vy = -(330 + state.level * 20);
  stabilizeBall(ball);
}

function sampleVerbs(count) {
  if (count <= IRREGULAR_VERBS.length) {
    return shuffleArray(IRREGULAR_VERBS).slice(0, count);
  }
  const picked = [];
  while (picked.length < count) {
    picked.push(...shuffleArray(IRREGULAR_VERBS));
  }
  return picked.slice(0, count);
}

function createBricks(level) {
  const pattern = LEVEL_PATTERNS[(level - 1) % LEVEL_PATTERNS.length];
  state.patternName = pattern.name;
  const rows = pattern.grid.length;
  const cols = pattern.grid[0].length;
  const layout = getBrickLayout();

  let activeCount = 0;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (pattern.grid[r][c] !== ".") activeCount += 1;
    }
  }

  const bonusCount = Math.max(1, Math.round(activeCount * BONUS_BRICK_RATIO));
  const bonusSlots = new Set(shuffleArray([...Array(activeCount).keys()]).slice(0, bonusCount));
  const bonusVerbs = sampleVerbs(bonusCount);
  const usableWidth = WORLD_WIDTH - layout.sideMargin * 2 - layout.gap * (cols - 1);
  const brickWidth = usableWidth / cols;
  const brickHeight = clamp(
    (WORLD_HEIGHT * (state.isPortraitMode ? 0.34 : 0.42) - layout.gap * (rows - 1)) / rows,
    state.isPortraitMode ? 17 : 19,
    state.isPortraitMode ? 28 : 30,
  );

  const bricks = [];
  let activeIdx = 0;
  let verbIdx = 0;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const code = pattern.grid[r][c];
      if (code === ".") continue;
      const x = layout.sideMargin + c * (brickWidth + layout.gap);
      const y = layout.top + r * (brickHeight + layout.gap);
      const hasBonus = bonusSlots.has(activeIdx);
      const bonusType = hasBonus ? randomWeightedItem(BONUS_TYPES) : null;
      bricks.push({
        x,
        y,
        w: brickWidth,
        h: brickHeight,
        code,
        hasBonus,
        bonusType,
        verb: hasBonus ? bonusVerbs[verbIdx] : null,
        active: true,
        glow: 0,
      });
      if (hasBonus) verbIdx += 1;
      activeIdx += 1;
    }
  }
  return bricks;
}

function resetLevel(level, keepStats = true) {
  if (!keepStats) {
    state.score = 0;
    state.lives = 3;
    state.combo = 0;
  }
  state.paused = false;
  state.countdownActive = false;
  state.roundCountdown = 0;
  state.level = level;
  state.effects.paddleTimer = 0;
  const maxBase = clamp(WORLD_WIDTH * 0.25, 130, 190);
  state.basePaddleWidth = clamp(maxBase - (level - 1) * 3, 106, maxBase);
  paddle.width = state.basePaddleWidth;
  paddle.x = WORLD_WIDTH * 0.5 - paddle.width * 0.5;
  paddle.y = WORLD_HEIGHT - 36;
  state.bricks = createBricks(level);
  state.remaining = state.bricks.length;
  state.fallingBonuses = [];
  state.bonusQueue = [];
  state.pendingQuestion = null;
  state.awaitingAnswer = false;
  hideQuiz();
  setNameEntryVisible(false);
  resetBalls(true);
  showNotice(`Motif ${state.patternName}`);
  state.countdownActive = true;
  state.roundCountdown = 3;
  fitCanvasToViewport();
  refreshHud();
}

function showMainOverlay(title, text, buttonLabel, onClick) {
  overlayTitle.textContent = title;
  overlayText.textContent = text;
  startBtn.textContent = buttonLabel;
  startBtn.onclick = onClick;
  setNameEntryVisible(false);
  renderLeaderboard();
  screenOverlay.classList.remove("hidden");
  screenOverlay.classList.add("visible");
}

function hideMainOverlay() {
  screenOverlay.classList.remove("visible");
  screenOverlay.classList.add("hidden");
}

function showQuiz(question) {
  state.keys.left = false;
  state.keys.right = false;
  quizPrompt.textContent = question.prompt;
  quizFeedback.textContent = "Choix clavier: 1 2 3, ou fleches + Entree.";
  quizFeedback.className = "feedback";
  quizChoices.innerHTML = "";
  const limit = DIFFICULTY_MODES[state.difficulty].quizTime;
  state.quizTimeLeft = limit == null ? Infinity : limit;
  state.quizSelectedIndex = -1;
  quizTimerEl.textContent = limit == null ? "Temps: illimité" : `${limit.toFixed(1)}s`;

  question.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => resolveAnswer(choice), { once: true });
    quizChoices.appendChild(btn);
  });

  quizOverlay.classList.remove("hidden");
  quizOverlay.classList.add("visible");
}

function hideQuiz() {
  quizOverlay.classList.remove("visible");
  quizOverlay.classList.add("hidden");
}

function wrapIndex(index, length) {
  if (length <= 0) return 0;
  const mod = index % length;
  return mod < 0 ? mod + length : mod;
}

function updateQuizSelection() {
  const buttons = quizChoices.querySelectorAll("button");
  buttons.forEach((btn, i) => {
    btn.classList.toggle("selected", state.quizSelectedIndex >= 0 && i === state.quizSelectedIndex);
  });
}

function setQuizSelectedIndex(index) {
  const buttons = quizChoices.querySelectorAll("button");
  if (buttons.length === 0) return;
  if (index < 0) {
    state.quizSelectedIndex = -1;
    updateQuizSelection();
    return;
  }
  state.quizSelectedIndex = wrapIndex(index, buttons.length);
  updateQuizSelection();
}

function getOtherWrongForm(verb, targetKey, correct) {
  const candidates = [verb.base, verb.past, verb.pp].filter((form) => form !== correct);
  if (candidates.length > 0) return randomItem(candidates);

  const fallback = [`${verb.base}s`, `${verb.base}ing`, `${verb.base}ed`];
  for (let i = 0; i < fallback.length; i += 1) {
    if (fallback[i] !== correct) return fallback[i];
  }
  return `${verb.base}ed`;
}

function getConjugatedWeirdForm(verb, avoid) {
  const base = verb.base;
  const rootIng = base.endsWith("e") ? `${base.slice(0, -1)}ing` : `${base}ing`;
  const thirdPerson = base.endsWith("y") ? `${base.slice(0, -1)}ies` : `${base}s`;
  const naivePast = base.endsWith("e") ? `${base}d` : `${base}ed`;
  const options = [
    rootIng,
    thirdPerson,
    naivePast,
    `to ${base}`,
    `is ${rootIng}`,
    `has ${verb.pp}`,
    `will ${base}`,
  ];
  const clean = options.filter((item) => !avoid.includes(item));
  if (clean.length > 0) return randomItem(clean);
  return `${base}ed`;
}

function buildPromptPattern(verb, targetKey) {
  const forms = {
    base: verb.base.toUpperCase(),
    past: verb.past.toUpperCase(),
    pp: verb.pp.toUpperCase(),
  };
  const slots = [forms.base, forms.past, forms.pp];
  const indexByKey = { base: 0, past: 1, pp: 2 };
  slots[indexByKey[targetKey]] = "____";
  return `${slots[0]} / ${slots[1]} / ${slots[2]}`;
}

function createBonusQuestion(bonus) {
  const target = bonus.verb || randomItem(IRREGULAR_VERBS);
  const targetKey = randomItem(["past", "pp", "past", "pp", "base"]);
  const correct = target[targetKey];
  const wrongOther = getOtherWrongForm(target, targetKey, correct);
  const wrongWeird = getConjugatedWeirdForm(target, [correct, wrongOther, target.base, target.past, target.pp]);

  const rawChoices = [correct, wrongOther, wrongWeird];
  const uniqueChoices = [];
  for (let i = 0; i < rawChoices.length; i += 1) {
    if (!uniqueChoices.includes(rawChoices[i])) uniqueChoices.push(rawChoices[i]);
  }
  while (uniqueChoices.length < 3) {
    const extra = getConjugatedWeirdForm(target, uniqueChoices);
    if (!uniqueChoices.includes(extra)) uniqueChoices.push(extra);
  }
  const choices = shuffleArray(uniqueChoices.slice(0, 3));

  return {
    correct,
    choices,
    prompt: buildPromptPattern(target, targetKey),
  };
}

function applyBonus(typeId) {
  const bonusDef = BONUS_TYPES.find((bonus) => bonus.id === typeId);
  if (typeId === "long_paddle") {
    state.effects.paddleTimer += 10;
    paddle.width = clamp(paddle.width + 34, state.basePaddleWidth, 240);
    paddle.x = clamp(paddle.x, 8, WORLD_WIDTH - paddle.width - 8);
    showNotice("Bonus actif: Raquette XL (10s)", 2.6);
  } else if (typeId === "multiball") {
    if (state.balls.length > 0 && state.balls.length < 4) {
      const source = randomItem(state.balls);
      const speed = clamp(Math.hypot(source.vx, source.vy), 280, 760);
      const angle = Math.atan2(source.vy, source.vx) + (Math.random() < 0.5 ? -0.5 : 0.5);
      state.balls.push(createBall(source.x, source.y, speed * Math.cos(angle), speed * Math.sin(angle)));
      state.ballLocked = false;
    }
    showNotice("Bonus actif: Double Balle", 2.4);
  } else if (typeId === "extra_life") {
    const livesGain = Math.max(1, Number(bonusDef?.lives) || 1);
    state.lives += livesGain;
    showNotice(`Bonus actif: +${livesGain} vies`, 2.4);
  } else if (typeId === "slow_ball") {
    for (let i = 0; i < state.balls.length; i += 1) {
      const ball = state.balls[i];
      ball.vx *= 0.76;
      ball.vy *= 0.76;
      const speed = Math.hypot(ball.vx, ball.vy);
      if (speed < 180) {
        const factor = 180 / speed;
        ball.vx *= factor;
        ball.vy *= factor;
      }
    }
    showNotice("Bonus actif: Balle Lente", 2.4);
  }
  refreshHud();
}

function startNextBonusQuestion() {
  if (state.awaitingAnswer || state.bonusQueue.length === 0) return;
  const bonus = state.bonusQueue.shift();
  const question = createBonusQuestion(bonus);
  state.pendingQuestion = {
    kind: "bonus",
    bonusType: bonus.typeId,
    bonusName: bonus.name,
    correct: question.correct,
    resolved: false,
  };
  state.awaitingAnswer = true;
  showQuiz(question);
}

function resolveAnswer(choice, reason = "answer") {
  if (!state.pendingQuestion) return;
  if (state.pendingQuestion.resolved) return;
  state.pendingQuestion.resolved = true;

  const { bonusType, bonusName, correct } = state.pendingQuestion;
  const isCorrect = choice === correct;
  const buttons = quizChoices.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.classList.remove("selected");
  });
  state.quizTimeLeft = 0;
  quizTimerEl.textContent =
    DIFFICULTY_MODES[state.difficulty].quizTime == null ? "Temps: illimité" : "0.0s";
  let closeDelayMs = 620;

  if (isCorrect) {
    applyBonus(bonusType);
    quizFeedback.textContent = `Correct. Bonus gagne: ${bonusName}.`;
    quizFeedback.className = "feedback ok";
  } else if (reason === "timeout") {
    quizFeedback.textContent = "";
    quizFeedback.className = "feedback";
    closeDelayMs = 120;
  } else {
    quizFeedback.textContent = `Rate. Bonne reponse: ${correct}.`;
    quizFeedback.className = "feedback bad";
    closeDelayMs = 3000;
  }

  setTimeout(() => {
    hideQuiz();
    state.pendingQuestion = null;
    state.awaitingAnswer = false;
    startNextBonusQuestion();
  }, closeDelayMs);
}

function spawnBurst(x, y, color) {
  for (let i = 0; i < 14; i += 1) {
    const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.35;
    const speed = 70 + Math.random() * 170;
    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.44 + Math.random() * 0.26,
      maxLife: 0.44 + Math.random() * 0.26,
      color,
      size: 2 + Math.random() * 3,
    });
  }
}

function maybeDropBonus(brick) {
  if (!brick.hasBonus || !brick.bonusType || !brick.verb) return;
  if (state.fallingBonuses.length >= 4) return;
  const type = brick.bonusType;
  state.fallingBonuses.push({
    x: brick.x + brick.w * 0.5,
    y: brick.y + brick.h * 0.5,
    vy: 120 + Math.random() * 55,
    w: 94,
    h: 34,
    typeId: type.id,
    name: type.name,
    icon: type.icon,
    color: type.color,
    verb: brick.verb,
  });
}

function destroyBrick(brick, axis, ball) {
  if (!brick.active) return;
  brick.active = false;
  brick.glow = 1;
  state.remaining -= 1;
  state.score += 70 + state.combo * 8;
  state.combo += 1;
  if (axis === "x") {
    ball.vx *= -1;
  } else {
    ball.vy *= -1;
  }
  stabilizeBall(ball);
  spawnBurst(brick.x + brick.w * 0.5, brick.y + brick.h * 0.5, "#6bf8a2");
  maybeDropBonus(brick);
  refreshHud();
}

function persistPendingLeaderboardScore() {
  if (!state.pendingLeaderboardScore) return;
  const fallbackName = playerNameInput ? playerNameInput.value.trim() : "";
  addLeaderboardEntry(
    fallbackName || "PLAYER",
    state.pendingLeaderboardScore.score,
    state.pendingLeaderboardScore.level,
  );
  state.pendingLeaderboardScore = null;
  setNameEntryVisible(false);
  refreshHud();
}

function startNewGame() {
  persistPendingLeaderboardScore();
  hideMainOverlay();
  resetLevel(1, false);
  state.running = true;
  state.startedOnce = true;
  startRoundCountdown(3);
}

function handleGameOver() {
  state.running = false;
  state.paused = false;
  const qualifies = isLeaderboardScore(state.score);
  const gameOverText = qualifies
    ? "Top score potentiel. Entre ton pseudo et enregistre ton score."
    : "Tu as perdu toutes tes vies. Relance une partie pour battre ton score.";
  showMainOverlay("Partie terminee", gameOverText, "Rejouer", () => {
    startNewGame();
  });
  if (qualifies) {
    state.pendingLeaderboardScore = { score: state.score, level: state.level };
    setNameEntryVisible(true);
  } else {
    state.pendingLeaderboardScore = null;
  }
}

function loseLife() {
  state.lives -= 1;
  state.combo = 0;
  state.fallingBonuses = [];
  state.bonusQueue = [];
  state.pendingQuestion = null;
  state.awaitingAnswer = false;
  hideQuiz();

  if (state.lives <= 0) {
    handleGameOver();
  } else {
    resetBalls(true);
    showNotice("Vie perdue", 1.8);
    startRoundCountdown(3);
  }
  refreshHud();
}

function nextLevel() {
  state.running = false;
  const nextPattern = LEVEL_PATTERNS[state.level % LEVEL_PATTERNS.length].name;
  showMainOverlay(
    `Niveau ${state.level} termine`,
    `Prochain motif: ${nextPattern}. Vitesse et challenge augmentent.`,
    "Niveau suivant",
    () => {
      hideMainOverlay();
      resetLevel(state.level + 1, true);
      state.running = true;
      startRoundCountdown(3);
    },
  );
}

function detectBallBrickCollision(ball, brick) {
  const closestX = clamp(ball.x, brick.x, brick.x + brick.w);
  const closestY = clamp(ball.y, brick.y, brick.y + brick.h);
  const dx = ball.x - closestX;
  const dy = ball.y - closestY;
  if (dx * dx + dy * dy > ball.radius * ball.radius) return null;

  const overlapLeft = Math.abs(ball.x + ball.radius - brick.x);
  const overlapRight = Math.abs(brick.x + brick.w - (ball.x - ball.radius));
  const overlapTop = Math.abs(ball.y + ball.radius - brick.y);
  const overlapBottom = Math.abs(brick.y + brick.h - (ball.y - ball.radius));
  const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

  if (minOverlap === overlapLeft) {
    ball.x = brick.x - ball.radius - 0.5;
    return "x";
  }
  if (minOverlap === overlapRight) {
    ball.x = brick.x + brick.w + ball.radius + 0.5;
    return "x";
  }
  if (minOverlap === overlapTop) {
    ball.y = brick.y - ball.radius - 0.5;
    return "y";
  }
  ball.y = brick.y + brick.h + ball.radius + 0.5;
  return "y";
}

function updatePaddle(delta) {
  const direction = (state.keys.right ? 1 : 0) - (state.keys.left ? 1 : 0);
  if (direction !== 0) {
    paddle.x += direction * paddle.speed * delta;
  }
  if (state.touchControlActive) {
    const target = state.touchTargetX - paddle.width * 0.5;
    paddle.x += (target - paddle.x) * 0.4;
  }
  paddle.x = clamp(paddle.x, 8, WORLD_WIDTH - paddle.width - 8);

  if (state.ballLocked && state.balls.length > 0) {
    const ball = state.balls[0];
    ball.x = paddle.x + paddle.width * 0.5;
    ball.y = paddle.y - ball.radius - 2;
  }
}

function updateEffects(delta) {
  if (state.effects.paddleTimer > 0) {
    state.effects.paddleTimer -= delta;
    if (state.effects.paddleTimer <= 0) {
      paddle.width = state.basePaddleWidth;
      paddle.x = clamp(paddle.x, 8, WORLD_WIDTH - paddle.width - 8);
      showNotice("Raquette XL terminee", 1.8);
    }
  }
  if (state.noticeTimer > 0) {
    state.noticeTimer -= delta;
    if (state.noticeTimer <= 0) state.notice = "";
  }
}

function updateBonuses(delta) {
  if (state.awaitingAnswer) return;
  for (let i = state.fallingBonuses.length - 1; i >= 0; i -= 1) {
    const bonus = state.fallingBonuses[i];
    bonus.y += bonus.vy * delta;
    if (bonus.y + bonus.h * 0.5 >= paddle.y - 8) {
      state.bonusQueue.push(bonus);
      state.fallingBonuses.splice(i, 1);
    }
  }
  startNextBonusQuestion();
}

function updateQuizTimer(delta) {
  if (!state.awaitingAnswer || !state.pendingQuestion || state.pendingQuestion.resolved) return;
  if (state.paused) return;
  const timeLimit = DIFFICULTY_MODES[state.difficulty].quizTime;
  if (timeLimit == null) {
    quizTimerEl.textContent = "Temps: illimité";
    return;
  }
  state.quizTimeLeft = Math.max(0, state.quizTimeLeft - delta);
  quizTimerEl.textContent = `${state.quizTimeLeft.toFixed(1)}s`;
  if (state.quizTimeLeft <= 0) {
    resolveAnswer(null, "timeout");
  }
}

function updateRoundCountdown(delta) {
  if (!state.running || state.paused || !state.countdownActive || state.awaitingAnswer) return;
  state.roundCountdown = Math.max(0, state.roundCountdown - delta);
  if (state.roundCountdown <= 0) {
    state.countdownActive = false;
    launchBall();
  }
}

function updateBalls(delta) {
  if (state.ballLocked || state.awaitingAnswer) return;

  for (let i = state.balls.length - 1; i >= 0; i -= 1) {
    const ball = state.balls[i];
    ball.x += ball.vx * delta;
    ball.y += ball.vy * delta;

    if (ball.x - ball.radius <= 0) {
      ball.x = ball.radius;
      ball.vx *= -1;
      ball.vy += (Math.random() - 0.5) * 24;
    } else if (ball.x + ball.radius >= WORLD_WIDTH) {
      ball.x = WORLD_WIDTH - ball.radius;
      ball.vx *= -1;
      ball.vy += (Math.random() - 0.5) * 24;
    }

    if (ball.y - ball.radius <= 0) {
      ball.y = ball.radius;
      ball.vy *= -1;
      ball.vx += (Math.random() - 0.5) * 16;
    }

    if (
      ball.y + ball.radius >= paddle.y &&
      ball.y - ball.radius <= paddle.y + paddle.height &&
      ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.width &&
      ball.vy > 0
    ) {
      const relative = (ball.x - (paddle.x + paddle.width * 0.5)) / (paddle.width * 0.5);
      const speed = Math.min(Math.hypot(ball.vx, ball.vy) * 1.03, ball.maxSpeed);
      const angle = relative * 1.08;
      ball.vx = speed * Math.sin(angle);
      ball.vy = -Math.abs(speed * Math.cos(angle));
      ball.y = paddle.y - ball.radius - 0.5;
      stabilizeBall(ball);
    }

    if (ball.y - ball.radius > WORLD_HEIGHT) {
      state.balls.splice(i, 1);
      continue;
    }

    for (let b = 0; b < state.bricks.length; b += 1) {
      const brick = state.bricks[b];
      if (!brick.active) continue;
      const axis = detectBallBrickCollision(ball, brick);
      if (!axis) continue;
      destroyBrick(brick, axis, ball);
      break;
    }

    stabilizeBall(ball);
  }

  if (!state.ballLocked && state.balls.length === 0) {
    loseLife();
  }
}

function updateParticles(delta) {
  for (let i = state.particles.length - 1; i >= 0; i -= 1) {
    const p = state.particles[i];
    p.life -= delta;
    if (p.life <= 0) {
      state.particles.splice(i, 1);
      continue;
    }
    p.x += p.vx * delta;
    p.y += p.vy * delta;
    p.vy += 220 * delta;
  }
}

function update(delta) {
  if (!state.paused) {
    updatePaddle(delta);
    updateEffects(delta);
  }
  if (state.running && !state.paused) {
    updateRoundCountdown(delta);
    if (!state.countdownActive) {
      updateBalls(delta);
      updateBonuses(delta);
    }
  }
  updateQuizTimer(delta);
  if (!state.paused) updateParticles(delta);

  if (state.running && !state.paused && state.remaining <= 0 && !state.awaitingAnswer) {
    nextLevel();
  }

  for (let i = 0; i < state.bricks.length; i += 1) {
    state.bricks[i].glow = Math.max(0, state.bricks[i].glow - delta * 2.1);
  }
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, WORLD_HEIGHT);
  gradient.addColorStop(0, "#0b243b");
  gradient.addColorStop(0.55, "#13415a");
  gradient.addColorStop(1, "#1a5c73");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  for (let i = 0; i < 22; i += 1) {
    const x = ((i * 43 + performance.now() * 0.02) % (WORLD_WIDTH + 80)) - 40;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x - 140, WORLD_HEIGHT);
    ctx.stroke();
  }
  ctx.restore();
}

function fitBrickLabel(text, maxWidth) {
  let out = text;
  while (ctx.measureText(out).width > maxWidth && out.length > 3) {
    out = `${out.slice(0, -2)}.`;
  }
  return out;
}

function drawBricks() {
  for (let i = 0; i < state.bricks.length; i += 1) {
    const brick = state.bricks[i];
    if (!brick.active) continue;
    const palette = BRICK_COLORS[brick.code] || BRICK_COLORS.D;
    const glow = brick.glow * 0.6;

    roundRect(brick.x, brick.y, brick.w, brick.h, 6);
    const grad = ctx.createLinearGradient(brick.x, brick.y, brick.x, brick.y + brick.h);
    grad.addColorStop(0, `hsla(${palette.h}, ${palette.s}%, ${palette.l + 10 + glow * 15}%, 1)`);
    grad.addColorStop(1, `hsla(${palette.h + 10}, ${Math.max(10, palette.s - 12)}%, ${palette.l - 8}%, 1)`);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();

    if (brick.verb) {
      ctx.font = `${brick.h < 23 ? 700 : 800} ${brick.h < 23 ? 10 : 11}px Nunito, Trebuchet MS, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const label = fitBrickLabel(brick.verb.base.toUpperCase(), brick.w - 8);
      ctx.fillStyle = "rgba(0,0,0,0.23)";
      ctx.fillText(label, brick.x + brick.w * 0.5 + 0.7, brick.y + brick.h * 0.5 + 0.7);
      ctx.fillStyle = palette.text;
      ctx.fillText(label, brick.x + brick.w * 0.5, brick.y + brick.h * 0.5);
    }
  }
}

function drawPaddle() {
  roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 9);
  const grad = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x, paddle.y + paddle.height);
  grad.addColorStop(0, "#7fe3ff");
  grad.addColorStop(1, "#24a6dd");
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.stroke();
}

function drawBalls() {
  for (let i = 0; i < state.balls.length; i += 1) {
    const ball = state.balls[i];
    const grad = ctx.createRadialGradient(
      ball.x - 3,
      ball.y - 3,
      2,
      ball.x,
      ball.y,
      ball.radius + 3,
    );
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(1, "#ffc46a");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#ffc46a";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius + 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawBonuses() {
  for (let i = 0; i < state.fallingBonuses.length; i += 1) {
    const bonus = state.fallingBonuses[i];
    roundRect(bonus.x - bonus.w * 0.5, bonus.y - bonus.h * 0.5, bonus.w, bonus.h, 8);
    const grad = ctx.createLinearGradient(
      bonus.x,
      bonus.y - bonus.h * 0.5,
      bonus.x,
      bonus.y + bonus.h * 0.5,
    );
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(1, bonus.color);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.stroke();

    ctx.fillStyle = "#102238";
    ctx.font = "800 10px Nunito, Trebuchet MS, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(bonus.icon, bonus.x - bonus.w * 0.5 + 6, bonus.y - bonus.h * 0.5 + 4);

    ctx.font = "900 12px Nunito, Trebuchet MS, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const verbText = bonus.verb ? bonus.verb.base.toUpperCase() : bonus.name.toUpperCase();
    ctx.fillText(verbText, bonus.x + 8, bonus.y + 2);
  }
}

function drawParticles() {
  for (let i = 0; i < state.particles.length; i += 1) {
    const p = state.particles[i];
    const alpha = p.life / p.maxLife;
    ctx.fillStyle = `${p.color}${Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0")}`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawNotice() {
  let text = "";
  if (state.running && state.paused) {
    text = "Pause";
  } else if (state.running && state.countdownActive) {
    text = `${Math.ceil(state.roundCountdown)}`;
  } else if (state.running && state.ballLocked) {
    text = "Appuie sur Espace pour lancer la balle";
  } else if (state.noticeTimer > 0) {
    text = state.notice;
  }
  if (!text) return;
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  roundRect(WORLD_WIDTH * 0.5 - 210, WORLD_HEIGHT * 0.62, 420, 36, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.33)";
  ctx.stroke();
  ctx.fillStyle = "#e9faff";
  if (state.running && state.countdownActive) {
    ctx.font = "700 40px Bangers, Nunito, Trebuchet MS, cursive";
  } else {
    ctx.font = "800 17px Nunito, Trebuchet MS, sans-serif";
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, WORLD_WIDTH * 0.5, WORLD_HEIGHT * 0.62 + 18);
}

function drawPatternTag() {
  if (!state.patternName || !state.running) return;
  const label = `Motif: ${state.patternName}`;
  ctx.font = "800 13px Nunito, Trebuchet MS, sans-serif";
  const tagWidth = clamp(ctx.measureText(label).width + 20, 170, WORLD_WIDTH * 0.64);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  roundRect(12, 10, tagWidth, 28, 7);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.stroke();
  ctx.fillStyle = "#f2f8ff";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 20, 24);
}

function drawCombo() {
  if (state.combo < 2) return;
  ctx.fillStyle = "rgba(255, 230, 145, 0.92)";
  ctx.font = "800 19px Nunito, Trebuchet MS, sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillText(`Combo x${state.combo}`, WORLD_WIDTH - 16, 12);
}

function draw() {
  drawBackground();
  drawBricks();
  drawPaddle();
  drawBalls();
  drawBonuses();
  drawParticles();
  drawPatternTag();
  drawNotice();
  drawCombo();
}

function loop(timestamp) {
  if (!previousTime) previousTime = timestamp;
  const delta = Math.min((timestamp - previousTime) / 1000, 0.033);
  previousTime = timestamp;
  update(delta);
  draw();
  requestAnimationFrame(loop);
}

function setTouchTarget(clientX) {
  const rect = canvas.getBoundingClientRect();
  const localX = ((clientX - rect.left) / rect.width) * WORLD_WIDTH;
  state.touchTargetX = clamp(localX, 0, WORLD_WIDTH);
}

function isLowControlZone(clientY) {
  const rect = canvas.getBoundingClientRect();
  const lowerActivation = rect.top + rect.height * (state.isPortraitMode ? 0.65 : 0.58);
  const iphoneSafeBottom = state.isPortraitMode ? 18 : 12;
  let safeLimit = rect.bottom - iphoneSafeBottom;
  if (safeLimit - lowerActivation < 36) {
    safeLimit = rect.bottom - 4;
  }
  return clientY >= lowerActivation && clientY <= safeLimit;
}

function refreshResponsiveLayout(preserveObjects = true) {
  const portraitMode = window.innerHeight > window.innerWidth;
  updateWorldBounds(portraitMode, preserveObjects);
}

function setPaused(nextPaused, automatic = false) {
  if (!state.running || screenOverlay.classList.contains("visible")) return;
  if (state.paused === nextPaused) return;
  state.paused = nextPaused;

  if (state.paused) {
    if (!automatic) showNotice("Pause", 1.2);
  } else {
    state.countdownActive = true;
    state.roundCountdown = 3;
    showNotice("Reprise", 0.8);
  }
  refreshHud();
}

function togglePause() {
  setPaused(!state.paused, false);
}

function autoPauseOnFocusLoss() {
  if (document.hidden || !document.hasFocus()) {
    setPaused(true, true);
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (state.awaitingAnswer && !quizOverlay.classList.contains("hidden")) {
    const buttons = quizChoices.querySelectorAll("button");
    if (buttons.length > 0) {
      if (key === "1" || key === "2" || key === "3") {
        const idx = Number(key) - 1;
        if (idx >= 0 && idx < buttons.length) {
          resolveAnswer(buttons[idx].textContent, "keyboard");
        }
        event.preventDefault();
        return;
      }
      if (key === "arrowleft" || key === "arrowup") {
        const nextIdx = state.quizSelectedIndex < 0 ? buttons.length - 1 : state.quizSelectedIndex - 1;
        setQuizSelectedIndex(nextIdx);
        event.preventDefault();
        return;
      }
      if (key === "arrowright" || key === "arrowdown") {
        const nextIdx = state.quizSelectedIndex < 0 ? 0 : state.quizSelectedIndex + 1;
        setQuizSelectedIndex(nextIdx);
        event.preventDefault();
        return;
      }
      if (event.code === "Enter" || event.code === "Space") {
        if (state.quizSelectedIndex >= 0) {
          const idx = wrapIndex(state.quizSelectedIndex, buttons.length);
          resolveAnswer(buttons[idx].textContent, "keyboard");
        }
        event.preventDefault();
        return;
      }
    }
  }

  if (key === "p") {
    togglePause();
    event.preventDefault();
    return;
  }

  if (key === "r" && state.startedOnce) {
    startNewGame();
    event.preventDefault();
    return;
  }

  if (key === "arrowleft" || key === "a" || key === "q") {
    state.keys.left = true;
    event.preventDefault();
  }
  if (key === "arrowright" || key === "d") {
    state.keys.right = true;
    event.preventDefault();
  }
  if (event.code === "Space") {
    if (state.running && !screenOverlay.classList.contains("visible")) {
      togglePause();
    } else if (!state.startedOnce && screenOverlay.classList.contains("visible")) {
      startBtn.click();
    }
    event.preventDefault();
  }
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (key === "arrowleft" || key === "a" || key === "q") state.keys.left = false;
  if (key === "arrowright" || key === "d") state.keys.right = false;
});

canvas.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "touch") {
    if (!isLowControlZone(event.clientY)) return;
    state.touchControlActive = true;
    state.touchPointerId = event.pointerId;
    setTouchTarget(event.clientX);
    if (state.running && state.ballLocked && !state.awaitingAnswer) launchBall();
    return;
  }
  setTouchTarget(event.clientX);
  if (state.running && state.ballLocked && !state.awaitingAnswer) launchBall();
});

canvas.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") {
    if (!state.touchControlActive || event.pointerId !== state.touchPointerId) return;
    setTouchTarget(event.clientX);
    return;
  }
  if (event.buttons === 1) setTouchTarget(event.clientX);
});

canvas.addEventListener("pointerup", (event) => {
  if (event.pointerType === "touch" && event.pointerId === state.touchPointerId) {
    state.touchControlActive = false;
    state.touchPointerId = null;
  }
});

canvas.addEventListener("pointercancel", () => {
  state.touchControlActive = false;
  state.touchPointerId = null;
});

if (pauseBtn) {
  pauseBtn.addEventListener("click", () => {
    togglePause();
  });
}

if (saveScoreBtn) {
  saveScoreBtn.addEventListener("click", () => {
    persistPendingLeaderboardScore();
  });
}

if (playerNameInput) {
  playerNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      persistPendingLeaderboardScore();
      event.preventDefault();
    }
  });
}

difficultyButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setDifficulty(btn.dataset.difficulty || "normal", true);
  });
});

window.addEventListener("resize", () => {
  refreshResponsiveLayout(true);
});

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    refreshResponsiveLayout(true);
  }, 90);
});

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => {
    fitCanvasToViewport();
  });
}

window.addEventListener("blur", () => {
  autoPauseOnFocusLoss();
});

document.addEventListener("visibilitychange", () => {
  autoPauseOnFocusLoss();
});

showMainOverlay(
  "BreakVerb",
  "Mode casse-brique classique: les briques cassent directement. Les questions arrivent sur les bonus qui tombent.",
  "Lancer la partie",
  () => {
    startNewGame();
  },
);

loadSettings();
loadLeaderboard();
refreshResponsiveLayout(false);
refreshHud();
requestAnimationFrame(loop);
