const defaultCards = [
  {
    id: "anatomi",
    word: "Anatomi",
    forbidden: ["Vücut", "Kemik", "Kas", "Ders", "Diseksiyon"],
  },
  {
    id: "steteskop",
    word: "Steteskop",
    forbidden: ["Dinlemek", "Kalp", "Akciğer", "Doktor", "Muayene"],
  },
  {
    id: "kadaver",
    word: "Kadaver",
    forbidden: ["Anatomi", "Laboratuvar", "Beden", "Diseksiyon", "Formalin"],
  },
  {
    id: "hipokrat",
    word: "Hipokrat",
    forbidden: ["Yemin", "Hekim", "Etik", "Antik", "Tıp"],
  },
  {
    id: "noroloji",
    word: "Nöroloji",
    forbidden: ["Beyin", "Sinir", "Refleks", "Felç", "Klinik"],
  },
  {
    id: "farmakoloji",
    word: "Farmakoloji",
    forbidden: ["İlaç", "Doz", "Yan etki", "Reçete", "Etken madde"],
  },
  {
    id: "intorn",
    word: "İntörn",
    forbidden: ["Son sınıf", "Hastane", "Nöbet", "Öğrenci", "Servis"],
  },
  {
    id: "patoloji",
    word: "Patoloji",
    forbidden: ["Doku", "Mikroskop", "Biyopsi", "Hastalık", "Rapor"],
  },
  {
    id: "kardiyoloji",
    word: "Kardiyoloji",
    forbidden: ["Kalp", "EKG", "Damar", "Ritim", "Tansiyon"],
  },
  {
    id: "acil-servis",
    word: "Acil Servis",
    forbidden: ["112", "Triyaj", "Hasta", "Ambulans", "Müdahale"],
  },
  {
    id: "mikrobiyoloji",
    word: "Mikrobiyoloji",
    forbidden: ["Bakteri", "Virüs", "Kültür", "Antibiyotik", "Laboratuvar"],
  },
  {
    id: "fizyoloji",
    word: "Fizyoloji",
    forbidden: ["Fonksiyon", "Sistem", "Organ", "Normal", "Mekanizma"],
  },
  {
    id: "radyoloji",
    word: "Radyoloji",
    forbidden: ["Film", "MR", "Tomografi", "Görüntü", "Röntgen"],
  },
  {
    id: "pediatri",
    word: "Pediatri",
    forbidden: ["Çocuk", "Aşı", "Bebek", "Büyüme", "Klinik"],
  },
  {
    id: "vize-haftasi",
    word: "Vize Haftası",
    forbidden: ["Sınav", "Not", "Çalışmak", "Kütüphane", "Uykusuz"],
  },
];

const storageKey = "tip-fakultesi-tabu-kartlari";

const state = {
  activeTeamIndex: 0,
  currentRound: 1,
  scores: [0, 0],
  timerId: null,
  remainingSeconds: 60,
  deck: [],
  teams: ["Kadavra Ekibi", "Steteskop Tayfa"],
  cards: loadCards(),
  history: [],
  currentTurn: createEmptyTurn(),
};

const elements = {
  teamInputs: [document.querySelector("#team-a"), document.querySelector("#team-b")],
  teamNames: [document.querySelector("#team-a-name"), document.querySelector("#team-b-name")],
  scores: [document.querySelector("#team-a-score"), document.querySelector("#team-b-score")],
  seconds: document.querySelector("#round-seconds"),
  start: document.querySelector("#start-button"),
  finishTurn: document.querySelector("#finish-turn-button"),
  activeTeam: document.querySelector("#active-team"),
  roundLabel: document.querySelector("#round-label"),
  timer: document.querySelector("#timer"),
  targetWord: document.querySelector("#target-word"),
  forbiddenList: document.querySelector("#forbidden-list"),
  correct: document.querySelector("#correct-button"),
  taboo: document.querySelector("#taboo-button"),
  pass: document.querySelector("#pass-button"),
  turnCorrect: document.querySelector("#turn-correct"),
  turnTaboo: document.querySelector("#turn-taboo"),
  turnPass: document.querySelector("#turn-pass"),
  turnScore: document.querySelector("#turn-score"),
  resetGame: document.querySelector("#reset-game-button"),
  roundHistory: document.querySelector("#round-history"),
  form: document.querySelector("#card-form"),
  editingCardId: document.querySelector("#editing-card-id"),
  cardWord: document.querySelector("#card-word"),
  cardForbidden: document.querySelector("#card-forbidden"),
  saveCard: document.querySelector("#save-card-button"),
  cancelEdit: document.querySelector("#cancel-edit-button"),
  resetCards: document.querySelector("#reset-cards-button"),
  cardList: document.querySelector("#card-list"),
};

function createEmptyTurn() {
  return {
    correct: 0,
    taboo: 0,
    pass: 0,
  };
}

function loadCards() {
  try {
    const savedCards = JSON.parse(localStorage.getItem(storageKey));
    if (Array.isArray(savedCards) && savedCards.length > 0) {
      return savedCards;
    }
  } catch (error) {
    console.warn("Kartlar okunamadı, varsayılan deste kullanılacak.", error);
  }

  return structuredClone(defaultCards);
}

function saveCards() {
  localStorage.setItem(storageKey, JSON.stringify(state.cards));
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function resetDeckIfNeeded() {
  if (state.deck.length === 0) {
    state.deck = shuffle(state.cards);
  }
}

function renderScoreboard() {
  state.teams.forEach((team, index) => {
    elements.teamNames[index].textContent = team;
    elements.scores[index].textContent = state.scores[index];
  });
  elements.activeTeam.textContent = state.teams[state.activeTeamIndex];
  elements.roundLabel.textContent = `${state.currentRound}. Tur`;
}

function renderTurnStats() {
  elements.turnCorrect.textContent = state.currentTurn.correct;
  elements.turnTaboo.textContent = state.currentTurn.taboo;
  elements.turnPass.textContent = state.currentTurn.pass;
  elements.turnScore.textContent = state.currentTurn.correct - state.currentTurn.taboo;
}

function renderCard() {
  if (state.cards.length === 0) {
    elements.targetWord.textContent = "Kart yok";
    elements.forbiddenList.replaceChildren(createListItem("Admin panelinden kart ekleyin"));
    setActionButtons(false);
    return;
  }

  resetDeckIfNeeded();
  const card = state.deck.pop();
  elements.targetWord.textContent = card.word;
  elements.forbiddenList.replaceChildren(...card.forbidden.map(createListItem));
}

function createListItem(text) {
  const item = document.createElement("li");
  item.textContent = text;
  return item;
}

function setActionButtons(isEnabled) {
  [elements.correct, elements.taboo, elements.pass, elements.finishTurn].forEach((button) => {
    button.disabled = !isEnabled;
  });
}

function recordTurnResult() {
  const score = state.currentTurn.correct - state.currentTurn.taboo;
  state.history.push({
    round: state.currentRound,
    team: state.teams[state.activeTeamIndex],
    correct: state.currentTurn.correct,
    taboo: state.currentTurn.taboo,
    pass: state.currentTurn.pass,
    score,
  });
  state.scores[state.activeTeamIndex] += score;
}

function finishTurn() {
  if (state.timerId === null) {
    return;
  }

  clearInterval(state.timerId);
  state.timerId = null;
  recordTurnResult();
  state.currentTurn = createEmptyTurn();

  if (state.activeTeamIndex === 1) {
    state.currentRound += 1;
  }

  state.activeTeamIndex = state.activeTeamIndex === 0 ? 1 : 0;
  state.remainingSeconds = Number(elements.seconds.value);
  elements.timer.textContent = state.remainingSeconds;
  renderScoreboard();
  renderTurnStats();
  renderRoundHistory();
  setActionButtons(false);
  elements.start.textContent = `${state.currentRound}. Tur: ${state.teams[state.activeTeamIndex]} başlat`;
}

function tick() {
  state.remainingSeconds -= 1;
  elements.timer.textContent = state.remainingSeconds;
  if (state.remainingSeconds <= 0) {
    finishTurn();
  }
}

function startTurn() {
  state.teams = elements.teamInputs.map((input, index) => input.value.trim() || `${index + 1}. Takım`);
  state.remainingSeconds = Number(elements.seconds.value);
  elements.timer.textContent = state.remainingSeconds;
  state.currentTurn = createEmptyTurn();
  renderScoreboard();
  renderTurnStats();
  renderCard();
  setActionButtons(state.cards.length > 0);
  clearInterval(state.timerId);
  state.timerId = setInterval(tick, 1000);
  elements.start.textContent = "Turu yeniden başlat";
}

function scoreAndNext(type) {
  state.currentTurn[type] += 1;
  renderTurnStats();
  renderCard();
}

function resetGame() {
  clearInterval(state.timerId);
  state.activeTeamIndex = 0;
  state.currentRound = 1;
  state.scores = [0, 0];
  state.timerId = null;
  state.remainingSeconds = Number(elements.seconds.value);
  state.deck = [];
  state.history = [];
  state.currentTurn = createEmptyTurn();
  elements.timer.textContent = state.remainingSeconds;
  elements.targetWord.textContent = "Hazır mısınız?";
  elements.forbiddenList.replaceChildren(createListItem("Başlat düğmesine basın"));
  elements.start.textContent = "Oyunu başlat";
  renderScoreboard();
  renderTurnStats();
  renderRoundHistory();
  setActionButtons(false);
}

function renderRoundHistory() {
  if (state.history.length === 0) {
    elements.roundHistory.innerHTML = '<tr><td colspan="6">Henüz tamamlanan tur yok.</td></tr>';
    return;
  }

  elements.roundHistory.replaceChildren(
    ...state.history.map((result) => {
      const row = document.createElement("tr");
      [
        `${result.round}. Tur`,
        result.team,
        result.correct,
        result.taboo,
        result.pass,
        result.score > 0 ? `+${result.score}` : result.score,
      ].forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.append(cell);
      });
      return row;
    }),
  );
}

function parseForbiddenWords(value) {
  return value
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean)
    .slice(0, 5);
}

function createCardId() {
  return `kart-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function renderCardList() {
  elements.cardList.replaceChildren(
    ...state.cards.map((card) => {
      const item = document.createElement("article");
      item.className = "admin-card";

      const content = document.createElement("div");
      const title = document.createElement("h3");
      title.textContent = card.word;
      const words = document.createElement("p");
      words.textContent = card.forbidden.join(", ");
      content.append(title, words);

      const actions = document.createElement("div");
      actions.className = "admin-card-actions";

      const edit = document.createElement("button");
      edit.type = "button";
      edit.textContent = "Düzenle";
      edit.addEventListener("click", () => startEditingCard(card.id));

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "danger";
      remove.textContent = "Sil";
      remove.addEventListener("click", () => deleteCard(card.id));

      actions.append(edit, remove);
      item.append(content, actions);
      return item;
    }),
  );
}

function startEditingCard(cardId) {
  const card = state.cards.find(({ id }) => id === cardId);
  if (!card) {
    return;
  }

  elements.editingCardId.value = card.id;
  elements.cardWord.value = card.word;
  elements.cardForbidden.value = card.forbidden.join(", ");
  elements.saveCard.textContent = "Kartı güncelle";
  elements.cancelEdit.hidden = false;
  elements.cardWord.focus();
}

function stopEditingCard() {
  elements.form.reset();
  elements.editingCardId.value = "";
  elements.saveCard.textContent = "Kartı ekle";
  elements.cancelEdit.hidden = true;
}

function upsertCard(event) {
  event.preventDefault();
  const word = elements.cardWord.value.trim();
  const forbidden = parseForbiddenWords(elements.cardForbidden.value);

  if (!word || forbidden.length === 0) {
    return;
  }

  const editingId = elements.editingCardId.value;
  if (editingId) {
    state.cards = state.cards.map((card) => (card.id === editingId ? { ...card, word, forbidden } : card));
  } else {
    state.cards.push({ id: createCardId(), word, forbidden });
  }

  state.deck = [];
  saveCards();
  renderCardList();
  stopEditingCard();
}

function deleteCard(cardId) {
  state.cards = state.cards.filter(({ id }) => id !== cardId);
  state.deck = [];
  saveCards();
  renderCardList();
}

function resetCards() {
  state.cards = structuredClone(defaultCards);
  state.deck = [];
  saveCards();
  renderCardList();
  stopEditingCard();
}

elements.start.addEventListener("click", startTurn);
elements.finishTurn.addEventListener("click", finishTurn);
elements.correct.addEventListener("click", () => scoreAndNext("correct"));
elements.taboo.addEventListener("click", () => scoreAndNext("taboo"));
elements.pass.addEventListener("click", () => scoreAndNext("pass"));
elements.resetGame.addEventListener("click", resetGame);
elements.form.addEventListener("submit", upsertCard);
elements.cancelEdit.addEventListener("click", stopEditingCard);
elements.resetCards.addEventListener("click", resetCards);

renderScoreboard();
renderTurnStats();
renderRoundHistory();
renderCardList();
