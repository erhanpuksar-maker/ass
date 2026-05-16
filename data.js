const DEFAULT_CARDS = [
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

const DEFAULT_SETTINGS = {
  correctPoints: 1,
  tabooPenalty: 1,
  passLimit: 3,
  roundSeconds: 60,
};

const STORAGE_KEYS = {
  cards: "tip-fakultesi-tabu-kartlari",
  settings: "tip-fakultesi-tabu-ayarlari",
};

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadStoredJson(key, fallback) {
  try {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) {
      return savedValue;
    }
  } catch (error) {
    console.warn("Kayıtlı veri okunamadı, varsayılan veri kullanılacak.", error);
  }

  return cloneData(fallback);
}

function saveStoredJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadCards() {
  const cards = loadStoredJson(STORAGE_KEYS.cards, DEFAULT_CARDS);
  return Array.isArray(cards) && cards.length > 0 ? cards : cloneData(DEFAULT_CARDS);
}

function saveCards(cards) {
  saveStoredJson(STORAGE_KEYS.cards, cards);
}

function loadSettings() {
  return {
    ...DEFAULT_SETTINGS,
    ...loadStoredJson(STORAGE_KEYS.settings, DEFAULT_SETTINGS),
  };
}

function saveSettings(settings) {
  saveStoredJson(STORAGE_KEYS.settings, settings);
}

window.TabuData = {
  DEFAULT_CARDS,
  DEFAULT_SETTINGS,
  STORAGE_KEYS,
  cloneData,
  loadCards,
  saveCards,
  loadSettings,
  saveSettings,
};
