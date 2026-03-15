const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("bestScore");
const livesEl = document.getElementById("lives");
const levelEl = document.getElementById("level");
const remainingEl = document.getElementById("remaining");
const modeLabelEl = document.getElementById("modeLabel");
const pauseBtn = document.getElementById("pauseBtn");
const labelScoreEl = document.getElementById("labelScore");
const labelBestScoreEl = document.getElementById("labelBestScore");
const labelLivesEl = document.getElementById("labelLives");
const labelLevelEl = document.getElementById("labelLevel");
const labelRemainingEl = document.getElementById("labelRemaining");
const labelModeEl = document.getElementById("labelMode");

const screenOverlay = document.getElementById("screenOverlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const startBtn = document.getElementById("startBtn");
const openSettingsBtn = document.getElementById("openSettingsBtn");
const openLeaderboardBtn = document.getElementById("openLeaderboardBtn");
const backFromSettingsBtn = document.getElementById("backFromSettingsBtn");
const backFromLeaderboardBtn = document.getElementById("backFromLeaderboardBtn");
const playFromLeaderboardBtn = document.getElementById("playFromLeaderboardBtn");
const menuHomeView = document.getElementById("menuHomeView");
const menuSettingsView = document.getElementById("menuSettingsView");
const menuLeaderboardView = document.getElementById("menuLeaderboardView");
const menuLevelAdvanceView = document.getElementById("menuLevelAdvanceView");
const settingsTitleEl = document.getElementById("settingsTitle");
const difficultyTitleEl = document.getElementById("difficultyTitle");
const difficultyHintEl = document.getElementById("difficultyHint");
const psychedelicTitleEl = document.getElementById("psychedelicTitle");
const psychedelicToggleBtn = document.getElementById("psychedelicToggleBtn");
const settingsCreditEl = document.getElementById("settingsCredit");
const homeHintEl = document.getElementById("homeHint");
const leaderboardTitleEl = document.getElementById("leaderboardTitle");
const leaderboardHeadingEl = document.getElementById("leaderboardHeading");
const nameEntry = document.getElementById("nameEntry");
const nameEntryLabel = document.getElementById("nameEntryLabel");
const playerNameInput = document.getElementById("playerNameInput");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const leaderboardList = document.getElementById("leaderboardList");
const errorStatsHeadingEl = document.getElementById("errorStatsHeading");
const errorStatsList = document.getElementById("errorStatsList");
const nextLevelCountdownTextEl = document.getElementById("nextLevelCountdownText");
const difficultyButtons = Array.from(document.querySelectorAll(".difficulty-btn"));

const quizOverlay = document.getElementById("quizOverlay");
const quizTitleEl = document.getElementById("quizTitle");
const quizPrompt = document.getElementById("quizPrompt");
const quizTimerEl = document.getElementById("quizTimer");
const quizChoices = document.getElementById("quizChoices");
const quizFeedback = document.getElementById("quizFeedback");
const championOverlay = document.getElementById("championOverlay");
const championTitleEl = document.getElementById("championTitle");
const arenaWrap = document.querySelector(".arena-wrap");

const LANDSCAPE_WORLD = { width: 960, height: 540 };
const PORTRAIT_WORLD = { width: 600, height: 960 };
let WORLD_WIDTH = LANDSCAPE_WORLD.width;
let WORLD_HEIGHT = LANDSCAPE_WORLD.height;
const BONUS_BRICK_RATIO = 0.15;
const COMBO_SUPER_THRESHOLD = 40;
const SUPER_CHALLENGE_QUESTIONS = 3;
const SUPER_CANNON_DURATION = 5;
const SUPER_CANNON_SHOT_INTERVAL = 0.26;
const SUPER_CANNON_SPEED = 640;
const PSYCHEDELIC_WAVE_SPEED = 1.7;
const PSYCHEDELIC_WAVE_SPEED_VARIANCE = 0.35;
const PSYCHEDELIC_AMP_X_LANDSCAPE = 11;
const PSYCHEDELIC_AMP_X_PORTRAIT = 7;
const PSYCHEDELIC_AMP_Y_LANDSCAPE = 3.5;
const PSYCHEDELIC_AMP_Y_PORTRAIT = 2.6;
const PADDLE_BOTTOM_OFFSET_LANDSCAPE = 36;
const PADDLE_BOTTOM_OFFSET_PORTRAIT = 64;
const PADDLE_BOTTOM_OFFSET_IPHONE_PORTRAIT = 92;
const FINAL_LEVEL = 15;
const CHAMPION_RAIN_DURATION = 10;
const CHAMPION_RAIN_SPAWN_INTERVAL = 0.06;
const LEADERBOARD_KEY = "breakverb_leaderboard_v1";
const ERROR_STATS_KEY = "breakverb_error_stats_v1";
const SETTINGS_KEY = "breakverb_settings_v1";
const MAX_ERROR_STATS_ROWS = 15;
const MAX_ERROR_STATS_STORE = 120;
const CHAMPION_RAIN_EMOJIS = [
  "\u{1F642}",
  "\u{1F44D}",
  "\u{1F1EC}\u{1F1E7}",
  "\u{1F1FA}\u{1F1F8}",
  "\u{1F1E6}\u{1F1FA}",
  "\u{1F1E8}\u{1F1E6}",
  "\u{1F1EE}\u{1F1EA}",
  "\u{1F1F3}\u{1F1FF}",
];

const I18N = {
  fr: {
    document_title: "BreakVerb - Casse-brique des verbes irréguliers",
    canvas_aria: "Jeu casse-brique éducatif",
    game_title: "BreakVerb",
    menu_intro: "Un jeu où vos réflexes dépendent de votre maîtrise des verbes irréguliers !",
    menu_start: "Démarrer",
    menu_settings: "Réglages",
    menu_leaderboard: "Classement",
    menu_back: "Retour",
    settings_credit: "Un jeu créé par Gérôme BILLOIS",
    pause: "Pause",
    resume: "Reprendre",
    stats_score: "Score",
    stats_best: "Meilleur",
    stats_lives: "Vies",
    stats_level: "Niveau",
    stats_remaining: "Reste",
    stats_mode: "Mode",
    difficulty_title: "Difficulté du quiz",
    difficulty_hint: "Facile: illimité • Normal: 10s • Expert: 5s",
    difficulty_easy: "Facile",
    difficulty_normal: "Normal",
    difficulty_expert: "Expert",
    difficulty_easy_btn: "Facile (∞)",
    difficulty_normal_btn: "Normal (10s)",
    difficulty_expert_btn: "Expert (5s)",
    psychedelic_title: "Mode psychédélique",
    psychedelic_on: "Activé",
    psychedelic_off: "Désactivé",
    psychedelic_on_btn: "Psychédélique : activé",
    psychedelic_off_btn: "Psychédélique : désactivé",
    controls_hint:
      "Clavier: ← → ou A D • Espace pour lancer la balle\nMobile/Tablette: glisse le doigt dans la zone basse du jeu\nEspace pause/reprise • R relancer",
    leaderboard_title: "Classement",
    leaderboard_empty: "Aucun score pour le moment.",
    leaderboard_row: "{name} — {score} pts (Niv. {level})",
    error_stats_title: "15 erreurs les plus fréquentes",
    error_stats_empty: "Aucune erreur enregistrée.",
    error_stats_row: "{count}x — {prompt} | choisi {wrong} | attendu {correct}",
    name_entry_label: "Nouveau meilleur score. Entre ton pseudo :",
    save_score: "Enregistrer le score",
    quiz_title: "Question verbale",
    quiz_keyboard_hint: "Choix clavier: 1 2 3, ou flèches + Entrée.",
    quiz_time_unlimited: "Temps: illimité",
    quiz_time_left: "{seconds}s",
    quiz_feedback_bonus_ok: "Correct. Bonus gagné: {name}.",
    quiz_feedback_wrong: "Raté. Bonne réponse: {answer}.",
    quiz_feedback_super_done: "Défi validé: canons de feu débloqués.",
    quiz_feedback_super_step: "Correct ({solved}/{total}).",
    bonus_long_paddle: "Raquette XL",
    bonus_multiball: "Double balle",
    bonus_extra_life: "Vies bonus",
    bonus_slow_ball: "Balle lente",
    notice_pattern: "Motif {name}",
    notice_bonus_long_paddle: "Bonus actif : Raquette XL (10s)",
    notice_bonus_multiball: "Bonus actif : Double balle",
    notice_bonus_lives: "Bonus actif : +{count} vies",
    notice_bonus_slow_ball: "Bonus actif : Balle lente",
    notice_super_bonus: "SUPER BONUS : canons de feu actifs",
    notice_super_trigger_golden: "Brique dorée : super défi x3",
    notice_super_trigger_combo: "Combo {combo}+ : super défi x3",
    notice_life_lost: "Vie perdue",
    notice_cannons_end: "Canons de feu terminés",
    notice_paddle_end: "Raquette XL terminée",
    notice_pause: "Pause",
    notice_resume: "Reprise",
    notice_press_space: "Appuie sur Espace pour lancer la balle",
    game_over_title: "Partie terminée",
    game_over_text_qualifies: "Meilleur score potentiel. Entre ton pseudo et enregistre ton score.",
    game_over_text_regular: "Tu as perdu toutes tes vies. Relance une partie pour battre ton score.",
    game_over_replay: "Rejouer",
    level_complete_title: "Niveau {level} terminé",
    level_complete_text: "Prochain motif : {name}. Vitesse et difficulté augmentent.",
    level_next: "Niveau suivant",
    level_next_countdown: "Niveau suivant dans {seconds}...",
    champion_message: "Bravo, tu es le champion de VerbBreaker !",
    champion_name_prompt: "Entre ton nom pour le classement.",
    champion_name_label: "Champion ! Entre ton pseudo pour le classement :",
    pattern_prefix: "Motif : {name}",
    combo_label: "Combo x{combo}",
    super_status: "CANONS {seconds}s",
    brand_player: "JOUEUR",
    gold_label: "GOLD",
    super_points: "SUPER BONUS",
  },
  en: {
    document_title: "BreakVerb - Irregular Verbs Brick Breaker",
    canvas_aria: "Educational brick breaker game",
    game_title: "BreakVerb",
    menu_intro: "A game where your reflexes depend on your mastery of irregular verbs!",
    menu_start: "Start Game",
    menu_settings: "Settings",
    menu_leaderboard: "Leaderboard",
    menu_back: "Back",
    settings_credit: "A game made by Gérôme BILLOIS",
    pause: "Pause",
    resume: "Resume",
    stats_score: "Score",
    stats_best: "Best",
    stats_lives: "Lives",
    stats_level: "Level",
    stats_remaining: "Left",
    stats_mode: "Mode",
    difficulty_title: "Quiz difficulty",
    difficulty_hint: "Easy: unlimited • Normal: 10s • Expert: 5s",
    difficulty_easy: "Easy",
    difficulty_normal: "Normal",
    difficulty_expert: "Expert",
    difficulty_easy_btn: "Easy (∞)",
    difficulty_normal_btn: "Normal (10s)",
    difficulty_expert_btn: "Expert (5s)",
    psychedelic_title: "Psychedelic mode",
    psychedelic_on: "On",
    psychedelic_off: "Off",
    psychedelic_on_btn: "Psychedelic: ON",
    psychedelic_off_btn: "Psychedelic: OFF",
    controls_hint:
      "Keyboard: ← → or A D • Space to launch the ball\nMobile/Tablet: slide in the lower control area\nSpace pause/resume • R restart",
    leaderboard_title: "Leaderboard",
    leaderboard_empty: "No scores yet.",
    leaderboard_row: "{name} — {score} pts (Lvl {level})",
    error_stats_title: "15 Most Frequent Mistakes",
    error_stats_empty: "No mistakes recorded yet.",
    error_stats_row: "{count}x — {prompt} | picked {wrong} | expected {correct}",
    name_entry_label: "New high score. Enter your nickname:",
    save_score: "Save score",
    quiz_title: "Verb Question",
    quiz_keyboard_hint: "Keyboard choices: 1 2 3, or arrows + Enter.",
    quiz_time_unlimited: "Time: unlimited",
    quiz_time_left: "{seconds}s",
    quiz_feedback_bonus_ok: "Correct. Bonus won: {name}.",
    quiz_feedback_wrong: "Wrong. Correct answer: {answer}.",
    quiz_feedback_super_done: "Challenge cleared: fire cannons unlocked.",
    quiz_feedback_super_step: "Correct ({solved}/{total}).",
    bonus_long_paddle: "Long Paddle",
    bonus_multiball: "Double Ball",
    bonus_extra_life: "Extra Lives",
    bonus_slow_ball: "Slow Ball",
    notice_pattern: "Pattern {name}",
    notice_bonus_long_paddle: "Bonus active: Long Paddle (10s)",
    notice_bonus_multiball: "Bonus active: Double Ball",
    notice_bonus_lives: "Bonus active: +{count} lives",
    notice_bonus_slow_ball: "Bonus active: Slow Ball",
    notice_super_bonus: "SUPER BONUS: fire cannons active",
    notice_super_trigger_golden: "Golden brick: 3-question super challenge",
    notice_super_trigger_combo: "Combo {combo}+: 3-question super challenge",
    notice_life_lost: "Life lost",
    notice_cannons_end: "Fire cannons ended",
    notice_paddle_end: "Long paddle ended",
    notice_pause: "Pause",
    notice_resume: "Resume",
    notice_press_space: "Press Space to launch the ball",
    game_over_title: "Game Over",
    game_over_text_qualifies: "Potential high score. Enter your name and save.",
    game_over_text_regular: "You lost all lives. Start again to beat your score.",
    game_over_replay: "Play Again",
    level_complete_title: "Level {level} complete",
    level_complete_text: "Next pattern: {name}. Speed and difficulty increase.",
    level_next: "Next Level",
    level_next_countdown: "Next level in {seconds}...",
    champion_message: "Congrats, you are the VerbBreaker champion!",
    champion_name_prompt: "Enter your name for the leaderboard.",
    champion_name_label: "Champion! Enter your nickname for the leaderboard:",
    pattern_prefix: "Pattern: {name}",
    combo_label: "Combo x{combo}",
    super_status: "CANNONS {seconds}s",
    brand_player: "PLAYER",
    gold_label: "GOLD",
    super_points: "SUPER BONUS",
  },
};

const LEVEL_NAME_EN = {
  "UK - Croix de Saint George": "UK - St George Cross",
  "UK - Big Ben": "UK - Big Ben",
  "UK - Couronne Royale": "UK - Royal Crown",
  "UK - Union Jack": "UK - Union Jack",
  "USA - Aigle": "USA - Eagle",
  "USA - Statue de la Liberté": "USA - Statue of Liberty",
  "USA - Stars and Stripes": "USA - Stars and Stripes",
  "Australie - Koala": "Australia - Koala",
  "Australie - Boomerang": "Australia - Boomerang",
  "Australie - Opéra de Sydney": "Australia - Sydney Opera",
  "Irlande - Harpe celtique": "Ireland - Celtic Harp",
  "Canada - Feuille d'érable": "Canada - Maple Leaf",
  "Nouvelle-Zélande - Porte maorie": "New Zealand - Maori Gate",
  "Jamaïque - Soleil": "Jamaica - Sun",
  "Afrique du Sud - Montagne": "South Africa - Mountain",
};

const DIFFICULTY_MODES = {
  easy: { quizTime: null },
  normal: { quizTime: 10 },
  expert: { quizTime: 5 },
};

const BONUS_NAME_KEYS = {
  long_paddle: "bonus_long_paddle",
  multiball: "bonus_multiball",
  extra_life: "bonus_extra_life",
  slow_ball: "bonus_slow_ball",
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
    name: "UK - Croix de Saint George",
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
    name: "USA - Statue de la Liberté",
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
    name: "Australie - Opéra de Sydney",
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
    name: "Irlande - Harpe celtique",
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
    name: "Canada - Feuille d'érable",
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
    name: "Nouvelle-Zélande - Porte maorie",
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
    name: "Jamaïque - Soleil",
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
    name: "Afrique du Sud - Montagne",
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
  comboChallengeTriggered: false,
  remaining: 0,
  patternName: "",
  patternOrderIndices: [],
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
  pendingSuperChallenges: 0,
  superChallenge: null,
  fireShots: [],
  pendingQuestion: null,
  quizTimeLeft: 0,
  quizSelectedIndex: -1,
  locale: "fr",
  difficulty: "normal",
  psychedelicMode: false,
  brickMotionTime: 0,
  leaderboard: [],
  errorStats: [],
  pendingLeaderboardScore: null,
  effects: {
    paddleTimer: 0,
    superCannonTimer: 0,
    cannonShotTimer: 0,
  },
  touchControlActive: false,
  touchPointerId: null,
  touchTargetX: WORLD_WIDTH / 2,
  notice: "",
  noticeTimer: 0,
  isPortraitMode: false,
  levelAdvanceTimerId: null,
  champion: {
    active: false,
    timer: 0,
    spawnTimer: 0,
    drops: [],
    endTimerId: null,
  },
  returnToHomeAfterScoreSave: false,
};

state.locale = detectLocale();

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

function detectLocale() {
  const languages = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language || "fr"];
  for (let i = 0; i < languages.length; i += 1) {
    const code = `${languages[i] || ""}`.toLowerCase();
    if (code.startsWith("fr")) return "fr";
    if (code.startsWith("en")) return "en";
  }
  return "en";
}

function formatText(template, vars = {}) {
  return `${template}`.replace(/\{([a-z0-9_]+)\}/gi, (full, key) => {
    if (Object.prototype.hasOwnProperty.call(vars, key)) return `${vars[key]}`;
    return full;
  });
}

function t(key, vars = {}) {
  const locale = I18N[state.locale] ? state.locale : "en";
  const source = I18N[locale][key] ?? I18N.en[key] ?? key;
  return formatText(source, vars);
}

function localizePatternName(name) {
  if (state.locale === "en") return LEVEL_NAME_EN[name] || name;
  return name;
}

function difficultyLabel(mode) {
  if (mode === "easy") return t("difficulty_easy");
  if (mode === "expert") return t("difficulty_expert");
  return t("difficulty_normal");
}

function bonusName(typeId, fallback = "") {
  const key = BONUS_NAME_KEYS[typeId];
  if (!key) return fallback || `${typeId}`;
  return t(key);
}

function localizeBonusTypeNames() {
  for (let i = 0; i < BONUS_TYPES.length; i += 1) {
    const bonus = BONUS_TYPES[i];
    bonus.name = bonusName(bonus.id, bonus.name);
  }
}

function applyStaticTranslations() {
  document.documentElement.lang = state.locale;
  document.title = t("document_title");
  if (canvas) canvas.setAttribute("aria-label", t("canvas_aria"));

  if (labelScoreEl) labelScoreEl.textContent = t("stats_score");
  if (labelBestScoreEl) labelBestScoreEl.textContent = t("stats_best");
  if (labelLivesEl) labelLivesEl.textContent = t("stats_lives");
  if (labelLevelEl) labelLevelEl.textContent = t("stats_level");
  if (labelRemainingEl) labelRemainingEl.textContent = t("stats_remaining");
  if (labelModeEl) labelModeEl.textContent = t("stats_mode");

  if (overlayTitle) overlayTitle.textContent = t("game_title");
  if (overlayText) overlayText.textContent = t("menu_intro", { combo: COMBO_SUPER_THRESHOLD });
  if (startBtn) startBtn.textContent = t("menu_start");
  if (openSettingsBtn) openSettingsBtn.textContent = t("menu_settings");
  if (openLeaderboardBtn) openLeaderboardBtn.textContent = t("menu_leaderboard");
  if (backFromSettingsBtn) backFromSettingsBtn.textContent = t("menu_back");
  if (backFromLeaderboardBtn) backFromLeaderboardBtn.textContent = t("menu_back");
  if (playFromLeaderboardBtn) playFromLeaderboardBtn.textContent = t("menu_start");

  if (settingsTitleEl) settingsTitleEl.textContent = t("menu_settings");
  if (difficultyTitleEl) difficultyTitleEl.textContent = t("difficulty_title");
  if (psychedelicTitleEl) psychedelicTitleEl.textContent = t("psychedelic_title");
  if (settingsCreditEl) settingsCreditEl.textContent = t("settings_credit");

  if (homeHintEl) homeHintEl.innerHTML = t("controls_hint").split("\n").join("<br />");
  if (leaderboardTitleEl) leaderboardTitleEl.textContent = t("leaderboard_title");
  if (leaderboardHeadingEl) leaderboardHeadingEl.textContent = t("leaderboard_title");
  if (errorStatsHeadingEl) errorStatsHeadingEl.textContent = t("error_stats_title");
  if (nameEntryLabel) nameEntryLabel.textContent = t("name_entry_label");
  if (saveScoreBtn) saveScoreBtn.textContent = t("save_score");
  if (playerNameInput) playerNameInput.placeholder = t("brand_player");

  if (quizTitleEl) quizTitleEl.textContent = t("quiz_title");
  if (championTitleEl) championTitleEl.textContent = t("champion_message");
  difficultyButtons.forEach((btn) => {
    if (btn.dataset.difficulty === "easy") btn.textContent = t("difficulty_easy_btn");
    else if (btn.dataset.difficulty === "expert") btn.textContent = t("difficulty_expert_btn");
    else btn.textContent = t("difficulty_normal_btn");
  });
  renderPsychedelicButton();

  localizeBonusTypeNames();
  renderLeaderboard();
}

function renderDifficultyButtons() {
  const mode = DIFFICULTY_MODES[state.difficulty] ? state.difficulty : "normal";
  state.difficulty = mode;
  difficultyButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.difficulty === mode);
  });
  if (modeLabelEl) modeLabelEl.textContent = difficultyLabel(mode);
}

function renderPsychedelicButton() {
  if (!psychedelicToggleBtn) return;
  psychedelicToggleBtn.classList.toggle("active", state.psychedelicMode);
  psychedelicToggleBtn.textContent = state.psychedelicMode ? t("psychedelic_on_btn") : t("psychedelic_off_btn");
  psychedelicToggleBtn.setAttribute(
    "aria-label",
    state.psychedelicMode ? t("psychedelic_on") : t("psychedelic_off"),
  );
}

function persistSettings() {
  writeJsonStorage(SETTINGS_KEY, {
    difficulty: state.difficulty,
    psychedelicMode: state.psychedelicMode,
  });
}

function setDifficulty(mode, persist = true) {
  if (!DIFFICULTY_MODES[mode]) return;
  state.difficulty = mode;
  renderDifficultyButtons();
  if (persist) {
    persistSettings();
  }
}

function setPsychedelicMode(enabled, persist = true) {
  state.psychedelicMode = Boolean(enabled);
  if (!state.psychedelicMode) {
    state.brickMotionTime = 0;
    for (let i = 0; i < state.bricks.length; i += 1) {
      const brick = state.bricks[i];
      if (typeof brick.baseX !== "number" || typeof brick.baseY !== "number") continue;
      brick.x = brick.baseX;
      brick.y = brick.baseY;
    }
  }
  renderPsychedelicButton();
  if (persist) persistSettings();
}

function loadSettings() {
  const settings = readJsonStorage(SETTINGS_KEY, {});
  if (settings && DIFFICULTY_MODES[settings.difficulty]) {
    state.difficulty = settings.difficulty;
  } else {
    state.difficulty = "normal";
  }
  state.psychedelicMode = Boolean(settings?.psychedelicMode);
  renderDifficultyButtons();
  renderPsychedelicButton();
}

function normalizeLeaderboardRows(rows) {
  if (!Array.isArray(rows)) return [];
  const safeRows = [];
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    if (!row || typeof row !== "object") continue;
    const score = Number(row.score) || 0;
    const level = Math.max(1, Number(row.level) || 1);
    const name = `${row.name || t("brand_player")}`.slice(0, 16);
    if (score <= 0) continue;
    safeRows.push({ name, score, level, date: Number(row.date) || Date.now() });
  }
  safeRows.sort((a, b) => b.score - a.score || b.level - a.level || a.date - b.date);
  return safeRows.slice(0, 10);
}

function normalizeErrorToken(value, maxLength = 54) {
  const raw = `${value || ""}`.trim().replace(/\s+/g, " ");
  if (!raw) return "";
  return raw.length <= maxLength ? raw : `${raw.slice(0, maxLength - 1)}...`;
}

function normalizeTargetKey(value) {
  if (value === "base" || value === "past" || value === "pp") return value;
  return null;
}

function inferTargetKeyFromPrompt(prompt) {
  const slots = `${prompt || ""}`.split("/").map((slot) => slot.trim());
  for (let i = 0; i < slots.length; i += 1) {
    if (slots[i].includes("____")) {
      if (i === 0) return "base";
      if (i === 1) return "past";
      if (i === 2) return "pp";
      break;
    }
  }
  return null;
}

function inferVerbBaseFromPrompt(prompt, correct, targetKey = null) {
  const slots = `${prompt || ""}`.split("/").map((slot) => slot.trim());
  if (slots.length >= 3 && slots[0] && !slots[0].includes("____")) {
    return normalizeErrorToken(slots[0], 30).toLowerCase();
  }
  if (targetKey === "base" && correct) {
    return normalizeErrorToken(correct, 30).toLowerCase();
  }
  return "";
}

function buildErrorStatKey(prompt, wrong, correct) {
  const p = normalizeErrorToken(prompt).toUpperCase();
  const w = normalizeErrorToken(wrong, 40).toLowerCase();
  const c = normalizeErrorToken(correct, 40).toLowerCase();
  return `${p}__${w}__${c}`;
}

function normalizeErrorStats(rows) {
  if (!Array.isArray(rows)) return [];
  const map = new Map();

  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    if (!row || typeof row !== "object") continue;
    const prompt = normalizeErrorToken(row.prompt);
    const wrong = normalizeErrorToken(row.wrong, 40);
    const correct = normalizeErrorToken(row.correct, 40);
    if (!prompt || !wrong || !correct) continue;
    const targetKey = normalizeTargetKey(row.targetKey) || inferTargetKeyFromPrompt(prompt);
    const verbBase =
      normalizeErrorToken(row.verbBase, 30).toLowerCase() || inferVerbBaseFromPrompt(prompt, correct, targetKey);
    const count = Math.max(1, Math.floor(Number(row.count) || 0));
    const key = row.key ? `${row.key}` : buildErrorStatKey(prompt, wrong, correct);
    const lastAt = Number(row.lastAt) || Date.now();
    const existing = map.get(key);
    if (existing) {
      existing.count += count;
      existing.lastAt = Math.max(existing.lastAt, lastAt);
      if (!existing.verbBase && verbBase) existing.verbBase = verbBase;
      if (!existing.targetKey && targetKey) existing.targetKey = targetKey;
    } else {
      map.set(key, { key, prompt, wrong, correct, count, lastAt, verbBase, targetKey });
    }
  }

  const merged = Array.from(map.values());
  merged.sort((a, b) => b.count - a.count || b.lastAt - a.lastAt);
  return merged.slice(0, MAX_ERROR_STATS_STORE);
}

function saveErrorStats() {
  state.errorStats = normalizeErrorStats(state.errorStats);
  writeJsonStorage(ERROR_STATS_KEY, state.errorStats);
  renderErrorStats();
}

function loadErrorStats() {
  state.errorStats = normalizeErrorStats(readJsonStorage(ERROR_STATS_KEY, []));
  renderErrorStats();
}

function recordAnswerError(prompt, wrong, correct, meta = {}) {
  const safePrompt = normalizeErrorToken(prompt);
  const safeWrong = normalizeErrorToken(wrong, 40);
  const safeCorrect = normalizeErrorToken(correct, 40);
  if (!safePrompt || !safeWrong || !safeCorrect) return;
  const targetKey = normalizeTargetKey(meta.targetKey) || inferTargetKeyFromPrompt(safePrompt);
  const verbBase =
    normalizeErrorToken(meta.verbBase, 30).toLowerCase() || inferVerbBaseFromPrompt(safePrompt, safeCorrect, targetKey);
  const key = buildErrorStatKey(safePrompt, safeWrong, safeCorrect);
  const existing = state.errorStats.find((row) => row.key === key);
  if (existing) {
    existing.count += 1;
    existing.lastAt = Date.now();
    if (!existing.verbBase && verbBase) existing.verbBase = verbBase;
    if (!existing.targetKey && targetKey) existing.targetKey = targetKey;
  } else {
    state.errorStats.push({
      key,
      prompt: safePrompt.toUpperCase(),
      wrong: safeWrong.toUpperCase(),
      correct: safeCorrect.toUpperCase(),
      count: 1,
      lastAt: Date.now(),
      verbBase,
      targetKey,
    });
  }
  saveErrorStats();
}

function buildErrorBiasMaps() {
  const verbCounts = new Map();
  const targetCounts = new Map();
  for (let i = 0; i < state.errorStats.length; i += 1) {
    const row = state.errorStats[i];
    if (!row || typeof row !== "object") continue;
    const count = Math.max(0, Number(row.count) || 0);
    if (count <= 0) continue;
    const verbBase = normalizeErrorToken(row.verbBase, 30).toLowerCase();
    if (!verbBase) continue;

    verbCounts.set(verbBase, (verbCounts.get(verbBase) || 0) + count);
    const targetKey = normalizeTargetKey(row.targetKey);
    if (targetKey) {
      const targetIndex = `${verbBase}:${targetKey}`;
      targetCounts.set(targetIndex, (targetCounts.get(targetIndex) || 0) + count);
    }
  }
  return { verbCounts, targetCounts };
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
  const finalName = `${name || t("brand_player")}`.trim().slice(0, 16) || t("brand_player");
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
    li.textContent = t("leaderboard_empty");
    leaderboardList.appendChild(li);
  } else {
    state.leaderboard.forEach((row) => {
      const li = document.createElement("li");
      li.textContent = t("leaderboard_row", {
        name: row.name,
        score: row.score,
        level: row.level,
      });
      leaderboardList.appendChild(li);
    });
  }
  if (bestScoreEl) {
    bestScoreEl.textContent = `${Math.max(state.bestScore, state.score)}`;
  }
  renderErrorStats();
}

function renderErrorStats() {
  if (!errorStatsList) return;
  errorStatsList.innerHTML = "";
  const rows = normalizeErrorStats(state.errorStats).slice(0, MAX_ERROR_STATS_ROWS);
  if (rows.length === 0) {
    const li = document.createElement("li");
    li.textContent = t("error_stats_empty");
    errorStatsList.appendChild(li);
    return;
  }
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const li = document.createElement("li");
    li.textContent = t("error_stats_row", {
      count: row.count,
      prompt: row.prompt,
      wrong: row.wrong,
      correct: row.correct,
    });
    errorStatsList.appendChild(li);
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

function isIPhoneDevice() {
  return /iphone/i.test(navigator.userAgent || "");
}

function getPaddleRestY() {
  if (state.isPortraitMode && isIPhoneDevice()) {
    return WORLD_HEIGHT - PADDLE_BOTTOM_OFFSET_IPHONE_PORTRAIT;
  }
  if (state.isPortraitMode) {
    return WORLD_HEIGHT - PADDLE_BOTTOM_OFFSET_PORTRAIT;
  }
  return WORLD_HEIGHT - PADDLE_BOTTOM_OFFSET_LANDSCAPE;
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
    paddle.y = getPaddleRestY();
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
      if (typeof brick.baseX === "number") brick.baseX *= scaleX;
      if (typeof brick.baseY === "number") brick.baseY *= scaleY;
      brick.w *= scaleX;
      brick.h *= scaleY;
      if (typeof brick.motionAmpX === "number") brick.motionAmpX *= scaleX;
      if (typeof brick.motionAmpY === "number") brick.motionAmpY *= scaleY;
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

    for (let i = 0; i < state.fireShots.length; i += 1) {
      const shot = state.fireShots[i];
      shot.x *= scaleX;
      shot.y *= scaleY;
      shot.vx *= scaleX;
      shot.vy *= scaleY;
    }
  } else {
    paddle.y = getPaddleRestY();
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
  if (scoreEl) scoreEl.textContent = `${state.score}`;
  if (bestScoreEl) bestScoreEl.textContent = `${Math.max(state.bestScore, state.score)}`;
  if (livesEl) livesEl.textContent = `${state.lives}`;
  if (levelEl) levelEl.textContent = `${state.level}`;
  if (remainingEl) remainingEl.textContent = `${state.remaining}`;
  if (modeLabelEl) modeLabelEl.textContent = difficultyLabel(state.difficulty);
  if (pauseBtn) pauseBtn.textContent = state.paused ? t("resume") : t("pause");
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
  const targetCount = Math.max(0, Math.floor(count));
  if (targetCount <= 0) return [];

  const { verbCounts } = buildErrorBiasMaps();
  const weightedVerb = (verb) => {
    const mistakes = verbCounts.get(`${verb.base}`.toLowerCase()) || 0;
    const bonus = Math.min(8, Math.sqrt(mistakes) * 1.7);
    return 1 + bonus;
  };

  const picked = [];
  const uniquePool = [...IRREGULAR_VERBS];
  while (picked.length < targetCount && uniquePool.length > 0) {
    const weightedPool = uniquePool.map((verb) => ({ verb, weight: weightedVerb(verb) }));
    const chosen = randomWeightedItem(weightedPool, "weight").verb;
    picked.push(chosen);
    const idx = uniquePool.findIndex((verb) => verb.base === chosen.base);
    if (idx >= 0) uniquePool.splice(idx, 1);
  }

  while (picked.length < targetCount) {
    const weightedAll = IRREGULAR_VERBS.map((verb) => ({ verb, weight: weightedVerb(verb) }));
    picked.push(randomWeightedItem(weightedAll, "weight").verb);
  }
  return picked;
}

function buildPatternOrder() {
  return shuffleArray([...Array(LEVEL_PATTERNS.length).keys()]);
}

function ensurePatternOrderForLevel(level) {
  const safeLevel = Math.max(1, Number(level) || 1);
  const requiredLength = safeLevel;
  while (state.patternOrderIndices.length < requiredLength) {
    state.patternOrderIndices.push(...buildPatternOrder());
  }
}

function getPatternForLevel(level) {
  ensurePatternOrderForLevel(level);
  const patternIndex = state.patternOrderIndices[Math.max(1, level) - 1];
  return LEVEL_PATTERNS[patternIndex] || LEVEL_PATTERNS[0];
}

function createBricks(level) {
  const pattern = getPatternForLevel(level);
  state.patternName = pattern.name;
  const rows = pattern.grid.length;
  const cols = pattern.grid[0].length;
  const layout = getBrickLayout();

  let activeCount = 0;
  let minActiveCol = cols;
  let maxActiveCol = -1;
  let minActiveRow = rows;
  let maxActiveRow = -1;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (pattern.grid[r][c] !== ".") {
        activeCount += 1;
        if (c < minActiveCol) minActiveCol = c;
        if (c > maxActiveCol) maxActiveCol = c;
        if (r < minActiveRow) minActiveRow = r;
        if (r > maxActiveRow) maxActiveRow = r;
      }
    }
  }
  if (activeCount <= 0) return [];

  const goldenSlot = Math.floor(Math.random() * activeCount);
  const bonusCandidates = [];
  for (let i = 0; i < activeCount; i += 1) {
    if (i !== goldenSlot) bonusCandidates.push(i);
  }
  const rawBonusCount = Math.max(1, Math.round(activeCount * BONUS_BRICK_RATIO));
  const bonusCount = Math.min(rawBonusCount, bonusCandidates.length);
  const bonusSlots = new Set(shuffleArray(bonusCandidates).slice(0, bonusCount));
  const bonusVerbs = sampleVerbs(bonusCount);
  const usableWidth = WORLD_WIDTH - layout.sideMargin * 2 - layout.gap * (cols - 1);
  const brickWidth = usableWidth / cols;
  const brickHeight = clamp(
    (WORLD_HEIGHT * (state.isPortraitMode ? 0.34 : 0.42) - layout.gap * (rows - 1)) / rows,
    state.isPortraitMode ? 17 : 19,
    state.isPortraitMode ? 28 : 30,
  );
  const stepX = brickWidth + layout.gap;
  const stepY = brickHeight + layout.gap;
  const usedCols = maxActiveCol - minActiveCol + 1;
  const usedRows = maxActiveRow - minActiveRow + 1;
  const colOffset = (cols - usedCols) * 0.5 - minActiveCol;
  const rowOffset = (rows - usedRows) * 0.5 - minActiveRow;

  const bricks = [];
  const ampX = state.isPortraitMode ? PSYCHEDELIC_AMP_X_PORTRAIT : PSYCHEDELIC_AMP_X_LANDSCAPE;
  const ampY = state.isPortraitMode ? PSYCHEDELIC_AMP_Y_PORTRAIT : PSYCHEDELIC_AMP_Y_LANDSCAPE;
  let activeIdx = 0;
  let verbIdx = 0;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const code = pattern.grid[r][c];
      if (code === ".") continue;
      const x = layout.sideMargin + (c + colOffset) * stepX;
      const y = layout.top + (r + rowOffset) * stepY;
      const hasBonus = bonusSlots.has(activeIdx);
      const bonusType = hasBonus ? randomWeightedItem(BONUS_TYPES) : null;
      const isGolden = activeIdx === goldenSlot;
      bricks.push({
        x,
        y,
        baseX: x,
        baseY: y,
        w: brickWidth,
        h: brickHeight,
        code,
        isGolden,
        hasBonus,
        bonusType,
        verb: hasBonus ? bonusVerbs[verbIdx] : null,
        active: true,
        glow: 0,
        row: r,
        col: c,
        motionPhase: Math.random() * Math.PI * 2,
        motionSpeed: PSYCHEDELIC_WAVE_SPEED + (Math.random() - 0.5) * PSYCHEDELIC_WAVE_SPEED_VARIANCE,
        motionAmpX: ampX,
        motionAmpY: ampY,
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
    state.patternOrderIndices = [];
  }
  state.combo = 0;
  state.paused = false;
  state.countdownActive = false;
  state.roundCountdown = 0;
  state.level = level;
  state.effects.paddleTimer = 0;
  state.effects.superCannonTimer = 0;
  state.effects.cannonShotTimer = 0;
  state.pendingSuperChallenges = 0;
  state.superChallenge = null;
  state.fireShots = [];
  state.comboChallengeTriggered = false;
  const maxBase = clamp(WORLD_WIDTH * 0.25, 130, 190);
  state.basePaddleWidth = clamp(maxBase - (level - 1) * 3, 106, maxBase);
  paddle.width = state.basePaddleWidth;
  paddle.x = WORLD_WIDTH * 0.5 - paddle.width * 0.5;
  paddle.y = getPaddleRestY();
  state.bricks = createBricks(level);
  state.remaining = state.bricks.length;
  state.fallingBonuses = [];
  state.bonusQueue = [];
  state.pendingQuestion = null;
  state.awaitingAnswer = false;
  hideQuiz();
  setNameEntryVisible(false);
  resetBalls(true);
  showNotice(t("notice_pattern", { name: localizePatternName(state.patternName) }));
  state.countdownActive = true;
  state.roundCountdown = 3;
  fitCanvasToViewport();
  refreshHud();
}

function showMainOverlay(title, text, buttonLabel, onClick) {
  clearLevelAdvanceTimer();
  stopChampionCelebration();
  showMenuView("home");
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

function showMenuView(view) {
  if (!menuHomeView || !menuSettingsView || !menuLeaderboardView || !menuLevelAdvanceView) return;
  menuHomeView.classList.toggle("hidden", view !== "home");
  menuSettingsView.classList.toggle("hidden", view !== "settings");
  menuLeaderboardView.classList.toggle("hidden", view !== "leaderboard");
  menuLevelAdvanceView.classList.toggle("hidden", view !== "level-advance");
}

function showChampionOverlay() {
  if (!championOverlay) return;
  if (championTitleEl) championTitleEl.textContent = t("champion_message");
  championOverlay.classList.remove("hidden");
  championOverlay.classList.add("visible");
}

function hideChampionOverlay() {
  if (!championOverlay) return;
  championOverlay.classList.remove("visible");
  championOverlay.classList.add("hidden");
}

function clearLevelAdvanceTimer() {
  if (state.levelAdvanceTimerId == null) return;
  clearTimeout(state.levelAdvanceTimerId);
  state.levelAdvanceTimerId = null;
}

function clearChampionEndTimer() {
  if (state.champion.endTimerId == null) return;
  clearTimeout(state.champion.endTimerId);
  state.champion.endTimerId = null;
}

function stopChampionCelebration() {
  clearChampionEndTimer();
  state.champion.active = false;
  state.champion.timer = 0;
  state.champion.spawnTimer = 0;
  state.champion.drops = [];
  hideChampionOverlay();
}

function spawnChampionEmojiDrop() {
  state.champion.drops.push({
    x: 14 + Math.random() * (WORLD_WIDTH - 28),
    y: -26 - Math.random() * 22,
    vy: 120 + Math.random() * 170,
    vx: (Math.random() - 0.5) * 24,
    spin: (Math.random() - 0.5) * 1.6,
    angle: Math.random() * Math.PI * 2,
    size: 20 + Math.random() * 22,
    emoji: randomItem(CHAMPION_RAIN_EMOJIS),
  });
}

function promptChampionNameEntry() {
  state.pendingLeaderboardScore = { score: state.score, level: state.level };
  state.returnToHomeAfterScoreSave = true;
  showMainOverlay(t("leaderboard_title"), t("champion_name_prompt"), t("menu_start"), () => {
    startNewGame();
  });
  showMenuView("leaderboard");
  if (nameEntryLabel) nameEntryLabel.textContent = t("champion_name_label");
  setNameEntryVisible(true);
}

function endChampionCelebration() {
  stopChampionCelebration();
  promptChampionNameEntry();
}

function startChampionCelebration() {
  clearLevelAdvanceTimer();
  stopChampionCelebration();
  hideQuiz();
  state.awaitingAnswer = false;
  state.pendingQuestion = null;
  state.running = false;
  state.paused = false;
  state.countdownActive = false;
  state.roundCountdown = 0;
  state.ballLocked = true;
  state.returnToHomeAfterScoreSave = false;
  state.champion.active = true;
  state.champion.timer = CHAMPION_RAIN_DURATION;
  state.champion.spawnTimer = 0;
  state.champion.drops = [];
  showChampionOverlay();
  state.champion.endTimerId = setTimeout(() => {
    endChampionCelebration();
  }, CHAMPION_RAIN_DURATION * 1000);
}

function showLevelAdvanceOverlay(secondsLeft) {
  showMenuView("level-advance");
  if (nextLevelCountdownTextEl) {
    nextLevelCountdownTextEl.textContent = t("level_next_countdown", { seconds: secondsLeft });
  }
  screenOverlay.classList.remove("hidden");
  screenOverlay.classList.add("visible");
}

function startAutoNextLevelCountdown(seconds = 3) {
  clearLevelAdvanceTimer();
  let remaining = Math.max(1, Math.floor(seconds));
  showLevelAdvanceOverlay(remaining);

  const tick = () => {
    remaining -= 1;
    if (remaining <= 0) {
      clearLevelAdvanceTimer();
      hideMainOverlay();
      resetLevel(state.level + 1, true);
      state.running = true;
      state.countdownActive = false;
      state.roundCountdown = 0;
      launchBall();
      return;
    }
    showLevelAdvanceOverlay(remaining);
    state.levelAdvanceTimerId = setTimeout(tick, 1000);
  };

  state.levelAdvanceTimerId = setTimeout(tick, 1000);
}

function showQuiz(question) {
  state.keys.left = false;
  state.keys.right = false;
  quizPrompt.textContent = question.prompt;
  quizFeedback.textContent = t("quiz_keyboard_hint");
  quizFeedback.className = "feedback";
  quizChoices.innerHTML = "";
  const limit = DIFFICULTY_MODES[state.difficulty].quizTime;
  state.quizTimeLeft = limit == null ? Infinity : limit;
  state.quizSelectedIndex = -1;
  quizTimerEl.textContent =
    limit == null ? t("quiz_time_unlimited") : t("quiz_time_left", { seconds: limit.toFixed(1) });

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

function escapeHtml(text) {
  return `${text}`
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function revealPromptAnswer(prompt, answer, isCorrect) {
  const safePrompt = escapeHtml(prompt || "");
  const safeAnswer = escapeHtml(`${answer || ""}`.toUpperCase());
  const cls = isCorrect ? "prompt-answer correct" : "prompt-answer wrong";
  if (safePrompt.includes("____")) {
    quizPrompt.innerHTML = safePrompt.replace("____", `<span class="${cls}">${safeAnswer}</span>`);
    return;
  }
  quizPrompt.innerHTML = `${safePrompt} <span class="${cls}">${safeAnswer}</span>`;
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

function pickAdaptiveVerb() {
  const { verbCounts } = buildErrorBiasMaps();
  const weighted = IRREGULAR_VERBS.map((verb) => {
    const mistakes = verbCounts.get(`${verb.base}`.toLowerCase()) || 0;
    const bonus = Math.min(9, Math.sqrt(mistakes) * 1.9);
    return { verb, weight: 1 + bonus };
  });
  return randomWeightedItem(weighted, "weight").verb;
}

function pickAdaptiveTargetKey(verbBase) {
  const { targetCounts } = buildErrorBiasMaps();
  const base = `${verbBase || ""}`.toLowerCase();
  const candidates = [
    { key: "base", weight: 1.0 },
    { key: "past", weight: 2.0 },
    { key: "pp", weight: 2.0 },
  ];
  for (let i = 0; i < candidates.length; i += 1) {
    const candidate = candidates[i];
    const count = targetCounts.get(`${base}:${candidate.key}`) || 0;
    const bonus = Math.min(8, Math.sqrt(count) * 2.1);
    candidate.weight += bonus;
  }
  return randomWeightedItem(candidates, "weight").key;
}

function createVerbQuestion(target = pickAdaptiveVerb(), forcedTargetKey = null) {
  const verb = target && typeof target === "object" ? target : pickAdaptiveVerb();
  const targetKey = normalizeTargetKey(forcedTargetKey) || pickAdaptiveTargetKey(verb.base);
  const correct = verb[targetKey];
  const wrongOther = getOtherWrongForm(verb, targetKey, correct);
  const wrongWeird = getConjugatedWeirdForm(verb, [correct, wrongOther, verb.base, verb.past, verb.pp]);

  const rawChoices = [correct, wrongOther, wrongWeird];
  const uniqueChoices = [];
  for (let i = 0; i < rawChoices.length; i += 1) {
    if (!uniqueChoices.includes(rawChoices[i])) uniqueChoices.push(rawChoices[i]);
  }
  while (uniqueChoices.length < 3) {
    const extra = getConjugatedWeirdForm(verb, uniqueChoices);
    if (!uniqueChoices.includes(extra)) uniqueChoices.push(extra);
  }
  const choices = shuffleArray(uniqueChoices.slice(0, 3));

  return {
    correct,
    choices,
    prompt: buildPromptPattern(verb, targetKey),
    verbBase: `${verb.base}`,
    targetKey,
  };
}

function createBonusQuestion(bonus) {
  const target = bonus.verb || pickAdaptiveVerb();
  return createVerbQuestion(target);
}

function applyBonus(typeId) {
  const bonusDef = BONUS_TYPES.find((bonus) => bonus.id === typeId);
  if (typeId === "long_paddle") {
    state.effects.paddleTimer += 10;
    paddle.width = clamp(paddle.width + 34, state.basePaddleWidth, 240);
    paddle.x = clamp(paddle.x, 8, WORLD_WIDTH - paddle.width - 8);
    showNotice(t("notice_bonus_long_paddle"), 2.6);
  } else if (typeId === "multiball") {
    if (state.balls.length > 0 && state.balls.length < 4) {
      const source = randomItem(state.balls);
      const speed = clamp(Math.hypot(source.vx, source.vy), 280, 760);
      const angle = Math.atan2(source.vy, source.vx) + (Math.random() < 0.5 ? -0.5 : 0.5);
      state.balls.push(createBall(source.x, source.y, speed * Math.cos(angle), speed * Math.sin(angle)));
      state.ballLocked = false;
    }
    showNotice(t("notice_bonus_multiball"), 2.4);
  } else if (typeId === "extra_life") {
    const livesGain = Math.max(1, Number(bonusDef?.lives) || 1);
    state.lives += livesGain;
    showNotice(t("notice_bonus_lives", { count: livesGain }), 2.4);
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
    showNotice(t("notice_bonus_slow_ball"), 2.4);
  }
  refreshHud();
}

function activateSuperCannons() {
  state.effects.superCannonTimer = Math.max(state.effects.superCannonTimer, SUPER_CANNON_DURATION);
  state.effects.cannonShotTimer = 0;
  state.score += 320;
  showNotice(t("notice_super_bonus"), 2.6);
  refreshHud();
}

function queueSuperChallenge(trigger) {
  if (state.effects.superCannonTimer > 0) return false;
  if (state.pendingSuperChallenges > 0 || state.superChallenge) return false;
  state.pendingSuperChallenges = 1;
  if (trigger === "golden") {
    showNotice(t("notice_super_trigger_golden"), 2.2);
  } else {
    showNotice(t("notice_super_trigger_combo", { combo: COMBO_SUPER_THRESHOLD }), 2.2);
  }
  startNextQuestion();
  return true;
}

function beginSuperChallenge() {
  if (state.pendingSuperChallenges <= 0 || state.awaitingAnswer) return false;
  state.pendingSuperChallenges -= 1;
  state.superChallenge = {
    remaining: SUPER_CHALLENGE_QUESTIONS,
    solved: 0,
  };
  return true;
}

function startNextBonusQuestion() {
  if (state.awaitingAnswer || state.bonusQueue.length === 0 || state.superChallenge) return false;
  const bonus = state.bonusQueue.shift();
  const question = createBonusQuestion(bonus);
  state.pendingQuestion = {
    kind: "bonus",
    bonusType: bonus.typeId,
    bonusName: bonusName(bonus.typeId, bonus.name),
    correct: question.correct,
    prompt: question.prompt,
    verbBase: question.verbBase,
    targetKey: question.targetKey,
    resolved: false,
  };
  state.awaitingAnswer = true;
  showQuiz(question);
  return true;
}

function startNextQuestion() {
  if (state.effects.superCannonTimer > 0) return;
  if (state.awaitingAnswer) return;
  if (!state.superChallenge && state.pendingSuperChallenges > 0) {
    beginSuperChallenge();
  }

  if (state.superChallenge) {
    if (state.superChallenge.remaining <= 0) {
      state.superChallenge = null;
    } else {
      const question = createVerbQuestion();
      const step = SUPER_CHALLENGE_QUESTIONS - state.superChallenge.remaining + 1;
      state.pendingQuestion = {
        kind: "super",
        correct: question.correct,
        prompt: question.prompt,
        verbBase: question.verbBase,
        targetKey: question.targetKey,
        step,
        total: SUPER_CHALLENGE_QUESTIONS,
        resolved: false,
      };
      state.awaitingAnswer = true;
      showQuiz(question);
      return;
    }
  }

  startNextBonusQuestion();
}

function resolveAnswer(choice, reason = "answer") {
  if (!state.pendingQuestion) return;
  if (state.pendingQuestion.resolved) return;
  state.pendingQuestion.resolved = true;

  const { kind, bonusType, bonusName, correct, prompt, verbBase, targetKey } = state.pendingQuestion;
  const isCorrect = choice === correct;
  if (!isCorrect && reason !== "timeout" && choice != null) {
    recordAnswerError(prompt, choice, correct, { verbBase, targetKey });
  }
  const buttons = quizChoices.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.classList.remove("selected");
  });
  state.quizTimeLeft = 0;
  quizTimerEl.textContent = DIFFICULTY_MODES[state.difficulty].quizTime == null
    ? t("quiz_time_unlimited")
    : t("quiz_time_left", { seconds: "0.0" });
  let closeDelayMs = 620;

  if (kind === "bonus") {
    if (isCorrect) {
      revealPromptAnswer(prompt, correct, true);
      applyBonus(bonusType);
      quizFeedback.textContent = t("quiz_feedback_bonus_ok", { name: bonusName });
      quizFeedback.className = "feedback ok";
    } else if (reason === "timeout") {
      quizFeedback.textContent = "";
      quizFeedback.className = "feedback";
      closeDelayMs = 120;
    } else {
      revealPromptAnswer(prompt, correct, false);
      quizFeedback.textContent = t("quiz_feedback_wrong", { answer: correct });
      quizFeedback.className = "feedback bad";
      closeDelayMs = 3000;
    }
  } else if (kind === "super") {
    if (isCorrect && state.superChallenge) {
      revealPromptAnswer(prompt, correct, true);
      state.superChallenge.solved += 1;
      state.superChallenge.remaining -= 1;
      if (state.superChallenge.remaining <= 0) {
        state.superChallenge = null;
        activateSuperCannons();
        quizFeedback.textContent = t("quiz_feedback_super_done");
        quizFeedback.className = "feedback ok";
        closeDelayMs = 900;
      } else {
        quizFeedback.textContent = t("quiz_feedback_super_step", {
          solved: state.superChallenge.solved,
          total: SUPER_CHALLENGE_QUESTIONS,
        });
        quizFeedback.className = "feedback ok";
        closeDelayMs = 500;
      }
    } else if (reason === "timeout") {
      state.superChallenge = null;
      quizFeedback.textContent = "";
      quizFeedback.className = "feedback";
      closeDelayMs = 120;
    } else {
      state.superChallenge = null;
      revealPromptAnswer(prompt, correct, false);
      quizFeedback.textContent = t("quiz_feedback_wrong", { answer: correct });
      quizFeedback.className = "feedback bad";
      closeDelayMs = 3000;
    }
  }

  setTimeout(() => {
    hideQuiz();
    state.pendingQuestion = null;
    state.awaitingAnswer = false;
    startNextQuestion();
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
  const type = brick.bonusType;
  if (state.effects.superCannonTimer > 0) {
    applyBonus(type.id);
    return;
  }
  state.bonusQueue.push({
    typeId: type.id,
    name: bonusName(type.id, type.name),
    icon: type.icon,
    color: type.color,
    verb: brick.verb,
  });
  startNextQuestion();
}

function destroyBrick(brick, axis, ball, options = {}) {
  if (!brick.active) return;
  const fromProjectile = options.fromProjectile === true;
  brick.active = false;
  brick.glow = 1;
  state.remaining -= 1;
  const basePoints = brick.isGolden ? 220 : 70;
  state.score += basePoints + state.combo * 8;
  if (!fromProjectile) {
    state.combo += 1;
  }
  if (!fromProjectile && ball) {
    if (axis === "x") {
      ball.vx *= -1;
    } else {
      ball.vy *= -1;
    }
    stabilizeBall(ball);
  }
  spawnBurst(brick.x + brick.w * 0.5, brick.y + brick.h * 0.5, brick.isGolden ? "#ffd56a" : "#6bf8a2");
  maybeDropBonus(brick);
  if (brick.isGolden && state.effects.superCannonTimer <= 0) {
    queueSuperChallenge("golden");
  }
  if (!state.comboChallengeTriggered && state.combo >= COMBO_SUPER_THRESHOLD && state.effects.superCannonTimer <= 0) {
    state.comboChallengeTriggered = true;
    queueSuperChallenge("combo");
  }
  if (state.pendingSuperChallenges > 0 && !state.awaitingAnswer) {
    startNextQuestion();
  }
  refreshHud();
}

function persistPendingLeaderboardScore() {
  if (!state.pendingLeaderboardScore) return;
  const fallbackName = playerNameInput ? playerNameInput.value.trim() : "";
  addLeaderboardEntry(
    fallbackName || t("brand_player"),
    state.pendingLeaderboardScore.score,
    state.pendingLeaderboardScore.level,
  );
  state.pendingLeaderboardScore = null;
  setNameEntryVisible(false);
  if (state.returnToHomeAfterScoreSave) {
    state.returnToHomeAfterScoreSave = false;
    showMenuView("home");
    if (overlayTitle) overlayTitle.textContent = t("game_title");
    if (overlayText) overlayText.textContent = t("menu_intro", { combo: COMBO_SUPER_THRESHOLD });
    if (startBtn) {
      startBtn.textContent = t("menu_start");
      startBtn.onclick = () => {
        startNewGame();
      };
    }
    if (nameEntryLabel) nameEntryLabel.textContent = t("name_entry_label");
  }
  refreshHud();
}

function startNewGame() {
  clearLevelAdvanceTimer();
  stopChampionCelebration();
  state.returnToHomeAfterScoreSave = false;
  persistPendingLeaderboardScore();
  hideMainOverlay();
  resetLevel(1, false);
  state.running = true;
  state.startedOnce = true;
  startRoundCountdown(3);
}

function handleGameOver() {
  clearLevelAdvanceTimer();
  stopChampionCelebration();
  state.running = false;
  state.paused = false;
  state.returnToHomeAfterScoreSave = false;
  const qualifies = isLeaderboardScore(state.score);
  const gameOverText = qualifies
    ? t("game_over_text_qualifies")
    : t("game_over_text_regular");
  showMainOverlay(t("game_over_title"), gameOverText, t("game_over_replay"), () => {
    startNewGame();
  });
  if (qualifies) {
    state.pendingLeaderboardScore = { score: state.score, level: state.level };
    if (nameEntryLabel) nameEntryLabel.textContent = t("name_entry_label");
    setNameEntryVisible(true);
    showMenuView("leaderboard");
  } else {
    state.pendingLeaderboardScore = null;
  }
}

function loseLife() {
  state.lives -= 1;
  state.combo = 0;
  state.comboChallengeTriggered = false;
  state.fallingBonuses = [];
  state.bonusQueue = [];
  state.pendingSuperChallenges = 0;
  state.superChallenge = null;
  state.fireShots = [];
  state.effects.superCannonTimer = 0;
  state.effects.cannonShotTimer = 0;
  state.pendingQuestion = null;
  state.awaitingAnswer = false;
  hideQuiz();

  if (state.lives <= 0) {
    handleGameOver();
  } else {
    resetBalls(true);
    showNotice(t("notice_life_lost"), 1.8);
    startRoundCountdown(3);
  }
  refreshHud();
}

function nextLevel() {
  clearLevelAdvanceTimer();
  if (state.level >= FINAL_LEVEL) {
    startChampionCelebration();
    return;
  }
  state.running = false;
  state.paused = false;
  startAutoNextLevelCountdown(3);
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
      showNotice(t("notice_paddle_end"), 1.8);
    }
  }
  const hadCannons = state.effects.superCannonTimer > 0;
  updateSuperCannons(delta);
  if (hadCannons && state.effects.superCannonTimer <= 0) {
    state.fireShots = [];
    showNotice(t("notice_cannons_end"), 1.8);
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
  startNextQuestion();
}

function spawnCannonVolley() {
  if (state.fireShots.length > 40) return;
  const sideInset = Math.min(18, paddle.width * 0.18);
  const y = paddle.y - 10;
  const leftX = paddle.x + sideInset;
  const rightX = paddle.x + paddle.width - sideInset;
  state.fireShots.push(
    { x: leftX, y, vx: -30, vy: -SUPER_CANNON_SPEED, r: 5, life: 1.8 },
    { x: rightX, y, vx: 30, vy: -SUPER_CANNON_SPEED, r: 5, life: 1.8 },
  );
}

function updateSuperCannons(delta) {
  if (state.effects.superCannonTimer <= 0) return;
  if (!state.running || state.paused || state.awaitingAnswer || state.countdownActive || state.ballLocked) return;
  state.effects.superCannonTimer = Math.max(0, state.effects.superCannonTimer - delta);
  state.effects.cannonShotTimer -= delta;
  while (state.effects.cannonShotTimer <= 0 && state.effects.superCannonTimer > 0) {
    spawnCannonVolley();
    state.effects.cannonShotTimer += SUPER_CANNON_SHOT_INTERVAL;
  }
}

function projectileHitsBrick(shot, brick) {
  const closestX = clamp(shot.x, brick.x, brick.x + brick.w);
  const closestY = clamp(shot.y, brick.y, brick.y + brick.h);
  const dx = shot.x - closestX;
  const dy = shot.y - closestY;
  return dx * dx + dy * dy <= shot.r * shot.r;
}

function updateFireShots(delta) {
  if (state.fireShots.length === 0) return;
  if (state.paused || state.awaitingAnswer || state.countdownActive) return;

  for (let i = state.fireShots.length - 1; i >= 0; i -= 1) {
    const shot = state.fireShots[i];
    shot.x += shot.vx * delta;
    shot.y += shot.vy * delta;
    shot.life -= delta;
    if (shot.life <= 0 || shot.y + shot.r < 0 || shot.x + shot.r < 0 || shot.x - shot.r > WORLD_WIDTH) {
      state.fireShots.splice(i, 1);
      continue;
    }

    let hit = false;
    for (let b = 0; b < state.bricks.length; b += 1) {
      const brick = state.bricks[b];
      if (!brick.active) continue;
      if (!projectileHitsBrick(shot, brick)) continue;
      destroyBrick(brick, null, null, { fromProjectile: true });
      hit = true;
      break;
    }
    if (hit) {
      state.fireShots.splice(i, 1);
    }
  }
}

function updateQuizTimer(delta) {
  if (!state.awaitingAnswer || !state.pendingQuestion || state.pendingQuestion.resolved) return;
  if (state.paused) return;
  const timeLimit = DIFFICULTY_MODES[state.difficulty].quizTime;
  if (timeLimit == null) {
    quizTimerEl.textContent = t("quiz_time_unlimited");
    return;
  }
  state.quizTimeLeft = Math.max(0, state.quizTimeLeft - delta);
  quizTimerEl.textContent = t("quiz_time_left", { seconds: state.quizTimeLeft.toFixed(1) });
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

function updateBrickMotion(delta) {
  if (!state.psychedelicMode || state.bricks.length === 0) return;
  state.brickMotionTime += delta;
  const t = state.brickMotionTime;
  for (let i = 0; i < state.bricks.length; i += 1) {
    const brick = state.bricks[i];
    if (!brick.active) continue;
    if (typeof brick.baseX !== "number" || typeof brick.baseY !== "number") continue;

    const rowWave = Math.sin(t * brick.motionSpeed + brick.row * 0.54 + brick.motionPhase);
    const colWave = Math.cos(t * (brick.motionSpeed * 0.83) + brick.col * 0.46 + brick.motionPhase * 0.6);
    brick.x = brick.baseX + rowWave * brick.motionAmpX;
    brick.y = brick.baseY + colWave * brick.motionAmpY;
  }
}

function updateChampionCelebration(delta) {
  if (!state.champion.active) return;
  state.champion.timer = Math.max(0, state.champion.timer - delta);
  state.champion.spawnTimer -= delta;
  while (state.champion.spawnTimer <= 0) {
    spawnChampionEmojiDrop();
    state.champion.spawnTimer += CHAMPION_RAIN_SPAWN_INTERVAL;
  }

  for (let i = state.champion.drops.length - 1; i >= 0; i -= 1) {
    const drop = state.champion.drops[i];
    drop.x += drop.vx * delta;
    drop.y += drop.vy * delta;
    drop.angle += drop.spin * delta;
    if (drop.y > WORLD_HEIGHT + 42) {
      state.champion.drops.splice(i, 1);
    }
  }
}

function update(delta) {
  updateChampionCelebration(delta);

  if (!state.paused) {
    updatePaddle(delta);
    updateEffects(delta);
  }
  if (state.running && !state.paused) {
    if (!state.awaitingAnswer) {
      updateBrickMotion(delta);
    }
    updateRoundCountdown(delta);
    if (!state.countdownActive) {
      updateBalls(delta);
      updateFireShots(delta);
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
    if (brick.isGolden) {
      grad.addColorStop(0, `hsla(46, 95%, ${68 + glow * 18}%, 1)`);
      grad.addColorStop(1, "hsla(35, 88%, 47%, 1)");
    } else {
      grad.addColorStop(0, `hsla(${palette.h}, ${palette.s}%, ${palette.l + 10 + glow * 15}%, 1)`);
      grad.addColorStop(1, `hsla(${palette.h + 10}, ${Math.max(10, palette.s - 12)}%, ${palette.l - 8}%, 1)`);
    }
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = brick.isGolden ? "rgba(255,238,178,0.88)" : "rgba(255,255,255,0.3)";
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
    } else if (brick.isGolden) {
      ctx.font = `${brick.h < 23 ? 800 : 900} ${brick.h < 23 ? 10 : 11}px Nunito, Trebuchet MS, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(73,44,0,0.82)";
      ctx.fillText(t("gold_label"), brick.x + brick.w * 0.5 + 0.7, brick.y + brick.h * 0.5 + 0.7);
      ctx.fillStyle = "#fff7c8";
      ctx.fillText(t("gold_label"), brick.x + brick.w * 0.5, brick.y + brick.h * 0.5);

      ctx.textBaseline = "alphabetic";
      ctx.font = `${brick.h < 23 ? 700 : 800} ${brick.h < 23 ? 10 : 12}px Nunito, Trebuchet MS, sans-serif`;
      ctx.fillStyle = "rgba(255,246,184,0.92)";
      ctx.fillText("*", brick.x + brick.w - 8, brick.y + 11);
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

  if (state.effects.superCannonTimer > 0) {
    const cannonW = clamp(paddle.width * 0.15, 14, 20);
    const cannonH = 12;
    const leftX = paddle.x + Math.min(15, paddle.width * 0.16) - cannonW * 0.5;
    const rightX = paddle.x + paddle.width - Math.min(15, paddle.width * 0.16) - cannonW * 0.5;
    const cannonY = paddle.y - cannonH + 1;
    ctx.fillStyle = "#2d405f";
    roundRect(leftX, cannonY, cannonW, cannonH, 3);
    ctx.fill();
    roundRect(rightX, cannonY, cannonW, cannonH, 3);
    ctx.fill();
    ctx.fillStyle = "#ffb04f";
    ctx.fillRect(leftX + cannonW * 0.32, cannonY - 5, cannonW * 0.36, 5);
    ctx.fillRect(rightX + cannonW * 0.32, cannonY - 5, cannonW * 0.36, 5);
  }
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

function drawFireShots() {
  for (let i = 0; i < state.fireShots.length; i += 1) {
    const shot = state.fireShots[i];
    const tail = 14;
    ctx.strokeStyle = "rgba(255,130,70,0.7)";
    ctx.lineWidth = shot.r;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(shot.x, shot.y + tail);
    ctx.lineTo(shot.x, shot.y);
    ctx.stroke();

    const grad = ctx.createRadialGradient(shot.x, shot.y, 1, shot.x, shot.y, shot.r + 3);
    grad.addColorStop(0, "#fff9da");
    grad.addColorStop(1, "#ff7a39");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(shot.x, shot.y, shot.r, 0, Math.PI * 2);
    ctx.fill();
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
    text = t("notice_pause");
  } else if (state.running && state.countdownActive) {
    text = `${Math.ceil(state.roundCountdown)}`;
  } else if (state.running && state.ballLocked) {
    text = t("notice_press_space");
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
  const label = t("pattern_prefix", { name: localizePatternName(state.patternName) });
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
  ctx.fillText(t("combo_label", { combo: state.combo }), WORLD_WIDTH - 16, 12);
}

function drawSuperBonusStatus() {
  if (!state.running || state.effects.superCannonTimer <= 0) return;
  const text = t("super_status", { seconds: state.effects.superCannonTimer.toFixed(1) });
  ctx.font = "800 14px Nunito, Trebuchet MS, sans-serif";
  const boxW = ctx.measureText(text).width + 18;
  const x = WORLD_WIDTH - boxW - 10;
  const y = 42;
  ctx.fillStyle = "rgba(0,0,0,0.33)";
  roundRect(x, y, boxW, 24, 7);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,166,98,0.68)";
  ctx.stroke();
  ctx.fillStyle = "#ffd9a6";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + 9, y + 12);
}

function drawChampionCelebration() {
  if (!state.champion.active || state.champion.drops.length === 0) return;
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < state.champion.drops.length; i += 1) {
    const drop = state.champion.drops[i];
    ctx.save();
    ctx.translate(drop.x, drop.y);
    ctx.rotate(drop.angle);
    ctx.font = `${Math.round(drop.size)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
    ctx.fillText(drop.emoji, 0, 0);
    ctx.restore();
  }
  ctx.restore();
}

function draw() {
  drawBackground();
  drawBricks();
  drawPaddle();
  drawBalls();
  drawFireShots();
  drawBonuses();
  drawParticles();
  drawPatternTag();
  drawNotice();
  drawCombo();
  drawSuperBonusStatus();
  drawChampionCelebration();
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
    if (!automatic) showNotice(t("notice_pause"), 1.2);
  } else {
    state.countdownActive = true;
    state.roundCountdown = 3;
    showNotice(t("notice_resume"), 0.8);
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

if (openSettingsBtn) {
  openSettingsBtn.addEventListener("click", () => {
    showMenuView("settings");
  });
}

if (openLeaderboardBtn) {
  openLeaderboardBtn.addEventListener("click", () => {
    renderLeaderboard();
    showMenuView("leaderboard");
  });
}

if (backFromSettingsBtn) {
  backFromSettingsBtn.addEventListener("click", () => {
    showMenuView("home");
  });
}

if (backFromLeaderboardBtn) {
  backFromLeaderboardBtn.addEventListener("click", () => {
    showMenuView("home");
  });
}

if (playFromLeaderboardBtn) {
  playFromLeaderboardBtn.addEventListener("click", () => {
    startNewGame();
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

if (psychedelicToggleBtn) {
  psychedelicToggleBtn.addEventListener("click", () => {
    setPsychedelicMode(!state.psychedelicMode, true);
  });
}

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

applyStaticTranslations();
loadSettings();
loadLeaderboard();
loadErrorStats();
showMainOverlay(
  t("game_title"),
  t("menu_intro", { combo: COMBO_SUPER_THRESHOLD }),
  t("menu_start"),
  () => {
    startNewGame();
  },
);

refreshResponsiveLayout(false);
refreshHud();
requestAnimationFrame(loop);
