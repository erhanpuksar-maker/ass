const { DEFAULT_CARDS, DEFAULT_SETTINGS, cloneData, loadCards, saveCards, loadSettings, saveSettings } = window.TabuData;

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";
const ADMIN_SESSION_KEY = "tip-fakultesi-tabu-admin-giris";

const state = {
  cards: loadCards(),
  settings: loadSettings(),
};

const elements = {
  loginPanel: document.querySelector("#login-panel"),
  loginForm: document.querySelector("#login-form"),
  adminContent: document.querySelector("#admin-content"),
  username: document.querySelector("#admin-username"),
  password: document.querySelector("#admin-password"),
  loginMessage: document.querySelector("#login-message"),
  logout: document.querySelector("#logout-button"),
  settingsForm: document.querySelector("#settings-form"),
  roundSeconds: document.querySelector("#round-seconds"),
  correctPoints: document.querySelector("#correct-points"),
  tabooPenalty: document.querySelector("#taboo-penalty"),
  passLimit: document.querySelector("#pass-limit"),
  settingsMessage: document.querySelector("#settings-message"),
  resetSettings: document.querySelector("#reset-settings-button"),
  form: document.querySelector("#card-form"),
  editingCardId: document.querySelector("#editing-card-id"),
  cardWord: document.querySelector("#card-word"),
  cardForbidden: document.querySelector("#card-forbidden"),
  saveCard: document.querySelector("#save-card-button"),
  cancelEdit: document.querySelector("#cancel-edit-button"),
  resetCards: document.querySelector("#reset-cards-button"),
  cardList: document.querySelector("#card-list"),
};

function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function renderAuthState() {
  const isLoggedIn = isAdminLoggedIn();
  elements.loginPanel.hidden = isLoggedIn;
  elements.adminContent.hidden = !isLoggedIn;
  if (isLoggedIn) {
    renderSettings();
    renderCardList();
  }
}

function handleLogin(event) {
  event.preventDefault();
  const username = elements.username.value.trim();
  const password = elements.password.value;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    elements.loginForm.reset();
    elements.loginMessage.textContent = "Giriş başarılı.";
    renderAuthState();
    return;
  }

  elements.loginMessage.textContent = "Kullanıcı adı veya şifre hatalı. Kullanıcı adı: admin · Şifre: admin";
}

function handleLogout() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  renderAuthState();
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

function renderSettings() {
  elements.roundSeconds.value = state.settings.roundSeconds;
  elements.correctPoints.value = state.settings.correctPoints;
  elements.tabooPenalty.value = state.settings.tabooPenalty;
  elements.passLimit.value = state.settings.passLimit;
}

function collectSettings() {
  return {
    roundSeconds: Number(elements.roundSeconds.value),
    correctPoints: Number(elements.correctPoints.value),
    tabooPenalty: Number(elements.tabooPenalty.value),
    passLimit: Number(elements.passLimit.value),
  };
}

function showSettingsMessage(text) {
  elements.settingsMessage.textContent = text;
  window.setTimeout(() => {
    elements.settingsMessage.textContent = "";
  }, 2400);
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

  saveCards(state.cards);
  renderCardList();
  stopEditingCard();
}

function deleteCard(cardId) {
  state.cards = state.cards.filter(({ id }) => id !== cardId);
  saveCards(state.cards);
  renderCardList();
}

function resetCards() {
  state.cards = cloneData(DEFAULT_CARDS);
  saveCards(state.cards);
  renderCardList();
  stopEditingCard();
}

function saveAdminSettings(event) {
  event.preventDefault();
  state.settings = collectSettings();
  saveSettings(state.settings);
  renderSettings();
  showSettingsMessage("Ayarlar kaydedildi. Oyuna döndüğünüzde yeni kurallar kullanılacak.");
}

function resetSettings() {
  state.settings = cloneData(DEFAULT_SETTINGS);
  saveSettings(state.settings);
  renderSettings();
  showSettingsMessage("Varsayılan ayarlar yüklendi.");
}

elements.loginForm.addEventListener("submit", handleLogin);
elements.logout.addEventListener("click", handleLogout);
elements.settingsForm.addEventListener("submit", saveAdminSettings);
elements.resetSettings.addEventListener("click", resetSettings);
elements.form.addEventListener("submit", upsertCard);
elements.cancelEdit.addEventListener("click", stopEditingCard);
elements.resetCards.addEventListener("click", resetCards);

renderAuthState();
