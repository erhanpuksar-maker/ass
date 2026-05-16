const { loadCards, loadSettings } = window.TabuData;

const state = {
  setupTeams: ["Kadavra Ekibi"],
  teams: [],
  scores: [],
  activeTeamIndex: 0,
  currentRound: 1,
  timerId: null,
  remainingSeconds: 60,
  cards: loadCards(),
  settings: loadSettings(),
  deck: [],
  history: [],
  currentTurn: createEmptyTurn(),
};

const elements = {
  setupScreen: document.querySelector("#setup-screen"),
  gameScreen: document.querySelector("#game-screen"),
  teamList: document.querySelector("#team-list"),
  addTeam: document.querySelector("#add-team-button"),
  startGame: document.querySelector("#start-game-button"),
  settingsSummary: document.querySelector("#settings-summary"),
  scoreboard: document.querySelector("#scoreboard"),
  resetGame: document.querySelector("#reset-game-button"),
  startTurn: document.querySelector("#start-turn-button"),
  finishTurn: document.querySelector("#finish-turn-button"),
  activeTeam: document.querySelector("#active-team"),
  roundLabel: document.querySelector("#round-label"),
  timer: document.querySelector("#timer"),
  targetWord: document.querySelector("#target-word"),
  forbiddenList: document.querySelector("#forbidden-list"),
  correct: document.querySelector("#correct-button"),
  taboo: document.querySelector("#taboo-button"),
  pass: document.querySelector("#pass-button"),
  passLimit: document.querySelector("#pass-limit"),
  turnCorrect: document.querySelector("#turn-correct"),
  turnTaboo: document.querySelector("#turn-taboo"),
  turnPass: document.querySelector("#turn-pass"),
  turnScore: document.querySelector("#turn-score"),
  roundHistory: document.querySelector("#round-history"),
};

function createEmptyTurn() {
  return {
    correct: 0,
    taboo: 0,
    pass: 0,
  };
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getTurnScore() {
  return state.currentTurn.correct * state.settings.correctPoints - state.currentTurn.taboo * state.settings.tabooPenalty;
}

function resetDeckIfNeeded() {
  if (state.deck.length === 0) {
    state.deck = shuffle(state.cards);
  }
}

function renderSetupTeams() {
  elements.teamList.replaceChildren(
    ...state.setupTeams.map((team, index) => {
      const row = document.createElement("div");
      row.className = "team-row";

      const label = document.createElement("label");
      label.htmlFor = `team-${index}`;
      label.textContent = `${index + 1}. takım`;

      const input = document.createElement("input");
      input.id = `team-${index}`;
      input.value = team;
      input.maxLength = 24;
      input.placeholder = `${index + 1}. Takım`;
      input.addEventListener("input", () => {
        state.setupTeams[index] = input.value;
      });

      const remove = document.createElement("button");
      remove.className = "icon-button";
      remove.type = "button";
      remove.textContent = "×";
      remove.ariaLabel = `${index + 1}. takımı sil`;
      remove.disabled = state.setupTeams.length === 1;
      remove.addEventListener("click", () => {
        state.setupTeams.splice(index, 1);
        renderSetupTeams();
      });

      row.append(label, input, remove);
      return row;
    }),
  );
}

function renderSettingsSummary() {
  elements.settingsSummary.textContent = `${state.settings.roundSeconds} sn · Tabu -${state.settings.tabooPenalty} · ${state.settings.passLimit} pas`;
}

function renderScoreboard() {
  elements.scoreboard.replaceChildren(
    ...state.teams.map((team, index) => {
      const card = document.createElement("article");
      card.className = index === state.activeTeamIndex ? "score-card active" : "score-card";

      const name = document.createElement("span");
      name.textContent = team;

      const score = document.createElement("strong");
      score.textContent = state.scores[index];

      card.append(name, score);
      return card;
    }),
  );

  elements.activeTeam.textContent = state.teams[state.activeTeamIndex] ?? "Takım";
  elements.roundLabel.textContent = `${state.currentRound}. Tur`;
}

function renderTurnStats() {
  elements.turnCorrect.textContent = state.currentTurn.correct;
  elements.turnTaboo.textContent = state.currentTurn.taboo;
  elements.turnPass.textContent = state.currentTurn.pass;
  elements.passLimit.textContent = state.settings.passLimit;
  elements.turnScore.textContent = getTurnScore();
  elements.pass.disabled = state.currentTurn.pass >= state.settings.passLimit;
}

function createListItem(text) {
  const item = document.createElement("li");
  item.textContent = text;
  return item;
}

function renderCard() {
  if (state.cards.length === 0) {
    elements.targetWord.textContent = "Kart yok";
    elements.forbiddenList.replaceChildren(createListItem("/admin sayfasından kart ekleyin"));
    setActionButtons(false);
    return;
  }

  resetDeckIfNeeded();
  const card = state.deck.pop();
  elements.targetWord.textContent = card.word;
  elements.forbiddenList.replaceChildren(...card.forbidden.map(createListItem));
}

function renderHistory() {
  if (state.history.length === 0) {
    elements.roundHistory.innerHTML = '<p class="empty-state">Henüz tamamlanan tur yok.</p>';
    return;
  }

  elements.roundHistory.replaceChildren(
    ...state.history.slice(-6).reverse().map((result) => {
      const item = document.createElement("article");
      item.className = "history-item";

      const titleWrap = document.createElement("div");
      const round = document.createElement("strong");
      round.textContent = `${result.round}. Tur`;
      const team = document.createElement("span");
      team.textContent = result.team;
      titleWrap.append(round, team);

      const score = document.createElement("div");
      score.className = "history-score";
      score.textContent = `${result.score > 0 ? "+" : ""}${result.score}`;

      const detail = document.createElement("small");
      detail.textContent = `Doğru ${result.correct} · Tabu ${result.taboo} · Pas ${result.pass}`;

      item.append(titleWrap, score, detail);
      return item;
    }),
  );
}

function setActionButtons(isEnabled) {
  [elements.correct, elements.taboo, elements.finishTurn].forEach((button) => {
    button.disabled = !isEnabled;
  });
  elements.pass.disabled = !isEnabled || state.currentTurn.pass >= state.settings.passLimit;
  elements.startTurn.disabled = isEnabled || state.cards.length === 0;
}

function setGameStarted() {
  elements.setupScreen.hidden = true;
  elements.gameScreen.hidden = false;
}

function collectTeams() {
  return state.setupTeams.map((team, index) => team.trim() || `${index + 1}. Takım`);
}

function startGame() {
  state.cards = loadCards();
  state.settings = loadSettings();
  state.teams = collectTeams();
  state.scores = state.teams.map(() => 0);
  state.activeTeamIndex = 0;
  state.currentRound = 1;
  state.history = [];
  state.deck = [];
  setGameStarted();
  prepareTurn();
}

function prepareTurn() {
  clearInterval(state.timerId);
  state.timerId = null;
  state.remainingSeconds = state.settings.roundSeconds;
  state.currentTurn = createEmptyTurn();
  elements.timer.textContent = state.remainingSeconds;
  elements.targetWord.textContent = "Tur hazır";
  elements.forbiddenList.replaceChildren(createListItem("Başlatınca süre ve kart açılır"));
  renderScoreboard();
  renderTurnStats();
  renderHistory();
  setActionButtons(false);
  elements.startTurn.textContent = `${state.currentRound}. Tur: ${state.teams[state.activeTeamIndex]} başlat`;
}

function startTurn() {
  state.remainingSeconds = state.settings.roundSeconds;
  state.currentTurn = createEmptyTurn();
  elements.timer.textContent = state.remainingSeconds;
  renderScoreboard();
  renderTurnStats();
  renderHistory();
  renderCard();
  setActionButtons(state.cards.length > 0);
  state.timerId = setInterval(tick, 1000);
}

function tick() {
  state.remainingSeconds -= 1;
  elements.timer.textContent = state.remainingSeconds;
  if (state.remainingSeconds <= 0) {
    finishTurn();
  }
}

function finishTurn() {
  if (state.timerId === null) {
    return;
  }

  clearInterval(state.timerId);
  state.timerId = null;

  const score = getTurnScore();
  state.scores[state.activeTeamIndex] += score;
  state.history.push({
    round: state.currentRound,
    team: state.teams[state.activeTeamIndex],
    correct: state.currentTurn.correct,
    taboo: state.currentTurn.taboo,
    pass: state.currentTurn.pass,
    score,
  });

  state.activeTeamIndex += 1;
  if (state.activeTeamIndex >= state.teams.length) {
    state.activeTeamIndex = 0;
    state.currentRound += 1;
  }

  prepareTurn();
}

function scoreAndNext(type) {
  state.currentTurn[type] += 1;
  renderTurnStats();
  renderCard();
}

function resetToSetup() {
  clearInterval(state.timerId);
  state.timerId = null;
  state.currentTurn = createEmptyTurn();
  state.history = [];
  elements.gameScreen.hidden = true;
  elements.setupScreen.hidden = false;
  renderSetupTeams();
}

elements.addTeam.addEventListener("click", () => {
  state.setupTeams.push(`${state.setupTeams.length + 1}. Takım`);
  renderSetupTeams();
});
elements.startGame.addEventListener("click", startGame);
elements.startTurn.addEventListener("click", startTurn);
elements.finishTurn.addEventListener("click", finishTurn);
elements.correct.addEventListener("click", () => scoreAndNext("correct"));
elements.taboo.addEventListener("click", () => scoreAndNext("taboo"));
elements.pass.addEventListener("click", () => scoreAndNext("pass"));
elements.resetGame.addEventListener("click", resetToSetup);

renderSetupTeams();
renderSettingsSummary();
