(() => {
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
  {
    id: "ates",
    word: "Ateş",
    forbidden: ["Derece", "Termometre", "Sıcak", "Enfeksiyon", "Titreme"],
  },
  {
    id: "nabiz",
    word: "Nabız",
    forbidden: ["Kalp", "Atım", "Bilek", "Ritim", "Dakika"],
  },
  {
    id: "tansiyon",
    word: "Tansiyon",
    forbidden: ["Basınç", "Sistolik", "Diyastolik", "Alet", "Hipertansiyon"],
  },
  {
    id: "enjeksiyon",
    word: "Enjeksiyon",
    forbidden: ["İğne", "Kas", "Damar", "Aşı", "Şırınga"],
  },
  {
    id: "serum",
    word: "Serum",
    forbidden: ["Damar", "Sıvı", "Tuzlu", "Set", "Hastane"],
  },
  {
    id: "recete",
    word: "Reçete",
    forbidden: ["İlaç", "Doktor", "Eczane", "Doz", "Yazmak"],
  },
  {
    id: "anamnez",
    word: "Anamnez",
    forbidden: ["Öykü", "Hasta", "Soru", "Şikayet", "Hikaye"],
  },
  {
    id: "muayene",
    word: "Muayene",
    forbidden: ["Doktor", "Hasta", "Kontrol", "Fizik", "Bakmak"],
  },
  {
    id: "tani",
    word: "Tanı",
    forbidden: ["Teşhis", "Hastalık", "Bulgu", "Doktor", "Koymak"],
  },
  {
    id: "tedavi",
    word: "Tedavi",
    forbidden: ["İlaç", "Hastalık", "İyileşmek", "Plan", "Doktor"],
  },
  {
    id: "ameliyat",
    word: "Ameliyat",
    forbidden: ["Cerrahi", "Bıçak", "Anestezi", "Masa", "Operasyon"],
  },
  {
    id: "anestezi",
    word: "Anestezi",
    forbidden: ["Uyutmak", "Ağrı", "Ameliyat", "Narkoz", "Lokal"],
  },
  {
    id: "yogun-bakim",
    word: "Yoğun Bakım",
    forbidden: ["Kritik", "Monitör", "Ventilatör", "Hasta", "Ünite"],
  },
  {
    id: "ventilator",
    word: "Ventilatör",
    forbidden: ["Solunum", "Makine", "Oksijen", "Entübasyon", "Yoğun bakım"],
  },
  {
    id: "entubasyon",
    word: "Entübasyon",
    forbidden: ["Tüp", "Nefes", "Ağız", "Trakea", "Anestezi"],
  },
  {
    id: "oksijen",
    word: "Oksijen",
    forbidden: ["Nefes", "Maske", "Tüp", "Saturasyon", "Akciğer"],
  },
  {
    id: "saturasyon",
    word: "Saturasyon",
    forbidden: ["Oksijen", "Parmak", "Pulse", "Yüzde", "Monitör"],
  },
  {
    id: "ekg",
    word: "EKG",
    forbidden: ["Kalp", "Ritim", "Elektrot", "Grafi", "Kardiyoloji"],
  },
  {
    id: "ultrason",
    word: "Ultrason",
    forbidden: ["Ses", "Görüntü", "Gebelik", "Prob", "Radyoloji"],
  },
  {
    id: "mr",
    word: "MR",
    forbidden: ["Manyetik", "Görüntü", "Cihaz", "Radyoloji", "Tomografi"],
  },
  {
    id: "tomografi",
    word: "Tomografi",
    forbidden: ["BT", "Kesit", "Radyoloji", "Görüntü", "Bilgisayar"],
  },
  {
    id: "rontgen",
    word: "Röntgen",
    forbidden: ["Film", "Işın", "Kemik", "Akciğer", "Radyoloji"],
  },
  {
    id: "biyopsi",
    word: "Biyopsi",
    forbidden: ["Doku", "Parça", "Patoloji", "İğne", "Tanı"],
  },
  {
    id: "hemogram",
    word: "Hemogram",
    forbidden: ["Kan", "Tahlil", "Alyuvar", "Lökosit", "Trombosit"],
  },
  {
    id: "lokosit",
    word: "Lökosit",
    forbidden: ["Beyaz", "Kan", "Enfeksiyon", "Hücre", "Bağışıklık"],
  },
  {
    id: "eritrosit",
    word: "Eritrosit",
    forbidden: ["Kırmızı", "Kan", "Oksijen", "Hemoglobin", "Hücre"],
  },
  {
    id: "trombosit",
    word: "Trombosit",
    forbidden: ["Pıhtı", "Kan", "Platelet", "Kanama", "Hücre"],
  },
  {
    id: "hemoglobin",
    word: "Hemoglobin",
    forbidden: ["Kan", "Oksijen", "Demir", "Anemi", "Kırmızı"],
  },
  {
    id: "anemi",
    word: "Anemi",
    forbidden: ["Kansızlık", "Demir", "Hemoglobin", "Soluk", "Yorgun"],
  },
  {
    id: "diyabet",
    word: "Diyabet",
    forbidden: ["Şeker", "İnsülin", "Kan", "Pankreas", "Glukoz"],
  },
  {
    id: "i̇nsulin",
    word: "İnsülin",
    forbidden: ["Şeker", "Pankreas", "Hormon", "Diyabet", "İğne"],
  },
  {
    id: "hipertansiyon",
    word: "Hipertansiyon",
    forbidden: ["Tansiyon", "Yüksek", "Basınç", "Damar", "Kalp"],
  },
  {
    id: "astim",
    word: "Astım",
    forbidden: ["Nefes", "Hırıltı", "Bronş", "İnhaler", "Akciğer"],
  },
  {
    id: "koah",
    word: "KOAH",
    forbidden: ["Akciğer", "Sigara", "Nefes", "Kronik", "Bronş"],
  },
  {
    id: "pnomoni",
    word: "Pnömoni",
    forbidden: ["Zatürre", "Akciğer", "Enfeksiyon", "Öksürük", "Ateş"],
  },
  {
    id: "apandisit",
    word: "Apandisit",
    forbidden: ["Karın", "Ağrı", "Cerrahi", "Sağ", "Bağırsak"],
  },
  {
    id: "gastrit",
    word: "Gastrit",
    forbidden: ["Mide", "Yanma", "Asit", "Ağrı", "Endoskopi"],
  },
  {
    id: "ulser",
    word: "Ülser",
    forbidden: ["Mide", "Yara", "Asit", "Ağrı", "Kanama"],
  },
  {
    id: "endoskopi",
    word: "Endoskopi",
    forbidden: ["Kamera", "Mide", "Hortum", "Gastro", "İç"],
  },
  {
    id: "kolonoskopi",
    word: "Kolonoskopi",
    forbidden: ["Kalın bağırsak", "Kamera", "Polip", "Endoskopi", "Hazırlık"],
  },
  {
    id: "bobrek",
    word: "Böbrek",
    forbidden: ["İdrar", "Nefron", "Üre", "Taş", "Organ"],
  },
  {
    id: "karaciger",
    word: "Karaciğer",
    forbidden: ["Safra", "Hepatit", "Enzim", "Organ", "Alkol"],
  },
  {
    id: "dalak",
    word: "Dalak",
    forbidden: ["Kan", "Organ", "Bağışıklık", "Sol", "Karın"],
  },
  {
    id: "pankreas",
    word: "Pankreas",
    forbidden: ["İnsülin", "Şeker", "Enzim", "Organ", "Diyabet"],
  },
  {
    id: "tiroid",
    word: "Tiroid",
    forbidden: ["Hormon", "Boyun", "Guatr", "T3", "T4"],
  },
  {
    id: "hipofiz",
    word: "Hipofiz",
    forbidden: ["Beyin", "Hormon", "Bez", "Ana", "Endokrin"],
  },
  {
    id: "adrenalin",
    word: "Adrenalin",
    forbidden: ["Stres", "Hormon", "Böbreküstü", "Kalp", "Heyecan"],
  },
  {
    id: "kortizol",
    word: "Kortizol",
    forbidden: ["Stres", "Hormon", "Steroid", "Böbreküstü", "Sabah"],
  },
  {
    id: "antibiyotik",
    word: "Antibiyotik",
    forbidden: ["Bakteri", "İlaç", "Enfeksiyon", "Direnç", "Reçete"],
  },
  {
    id: "analjezik",
    word: "Analjezik",
    forbidden: ["Ağrı", "Kesici", "İlaç", "Parasetamol", "NSAİİ"],
  },
  {
    id: "antipiretik",
    word: "Antipiretik",
    forbidden: ["Ateş", "Düşürücü", "İlaç", "Parasetamol", "Sıcaklık"],
  },
  {
    id: "asi",
    word: "Aşı",
    forbidden: ["Bağışıklık", "İğne", "Çocuk", "Koruma", "Antikor"],
  },
  {
    id: "antikor",
    word: "Antikor",
    forbidden: ["Bağışıklık", "Protein", "Aşı", "Antijen", "Savunma"],
  },
  {
    id: "antijen",
    word: "Antijen",
    forbidden: ["Bağışıklık", "Yabancı", "Antikor", "Mikrop", "Protein"],
  },
  {
    id: "virus",
    word: "Virüs",
    forbidden: ["Mikrop", "Hücre", "Grip", "RNA", "DNA"],
  },
  {
    id: "bakteri",
    word: "Bakteri",
    forbidden: ["Mikrop", "Antibiyotik", "Kültür", "Gram", "Enfeksiyon"],
  },
  {
    id: "mantar",
    word: "Mantar",
    forbidden: ["Fungus", "Enfeksiyon", "Cilt", "Spor", "Antifungal"],
  },
  {
    id: "parazit",
    word: "Parazit",
    forbidden: ["Kurt", "Bağırsak", "Mikrop", "Konak", "Tedavi"],
  },
  {
    id: "sterilizasyon",
    word: "Sterilizasyon",
    forbidden: ["Mikrop", "Temiz", "Otoklav", "Cerrahi", "Alet"],
  },
  {
    id: "dezenfeksiyon",
    word: "Dezenfeksiyon",
    forbidden: ["Temizlik", "Mikrop", "Alkol", "Yüzey", "Solüsyon"],
  },
  {
    id: "eldiven",
    word: "Eldiven",
    forbidden: ["El", "Lateks", "Muayene", "Steril", "Koruma"],
  },
  {
    id: "maske",
    word: "Maske",
    forbidden: ["Yüz", "Nefes", "Cerrahi", "Koruma", "Takmak"],
  },
  {
    id: "onluk",
    word: "Önlük",
    forbidden: ["Beyaz", "Doktor", "Laboratuvar", "Giyinmek", "Cep"],
  },
  {
    id: "nobet",
    word: "Nöbet",
    forbidden: ["Gece", "Hastane", "Uykusuz", "İntörn", "Vardiya"],
  },
  {
    id: "vizit",
    word: "Vizit",
    forbidden: ["Servis", "Hasta", "Hoca", "Sabah", "Dolaşmak"],
  },
  {
    id: "konsultasyon",
    word: "Konsültasyon",
    forbidden: ["Danışmak", "Bölüm", "Doktor", "Görüş", "Hasta"],
  },
  {
    id: "epikriz",
    word: "Epikriz",
    forbidden: ["Taburcu", "Rapor", "Özet", "Hasta", "Servis"],
  },
  {
    id: "taburcu",
    word: "Taburcu",
    forbidden: ["Çıkış", "Hastane", "Ev", "İyileşmek", "Epikriz"],
  },
  {
    id: "sevk",
    word: "Sevk",
    forbidden: ["Göndermek", "Hastane", "Bölüm", "Ambulans", "Hasta"],
  },
  {
    id: "triyaj",
    word: "Triyaj",
    forbidden: ["Acil", "Renk", "Öncelik", "Hasta", "Sıra"],
  },
  {
    id: "defibrilator",
    word: "Defibrilatör",
    forbidden: ["Şok", "Kalp", "Ritim", "Elektrot", "Acil"],
  },
  {
    id: "cpr",
    word: "CPR",
    forbidden: ["Kalp", "Masaj", "Solunum", "Canlandırma", "Acil"],
  },
  {
    id: "kanama",
    word: "Kanama",
    forbidden: ["Kan", "Durdurmak", "Pıhtı", "Yara", "Basınç"],
  },
  {
    id: "kirik",
    word: "Kırık",
    forbidden: ["Kemik", "Alçı", "Travma", "Ağrı", "Ortopedi"],
  },
  {
    id: "burkulma",
    word: "Burkulma",
    forbidden: ["Ayak", "Bağ", "Şişlik", "Buz", "Travma"],
  },
  {
    id: "dikis",
    word: "Dikiş",
    forbidden: ["Yara", "İp", "Cerrahi", "Kesik", "Atmak"],
  },
  {
    id: "yanik",
    word: "Yanık",
    forbidden: ["Sıcak", "Deri", "Su", "Derece", "Ağrı"],
  },
  {
    id: "odem",
    word: "Ödem",
    forbidden: ["Şişlik", "Sıvı", "Bacak", "Doku", "Basmak"],
  },
  {
    id: "enflamasyon",
    word: "Enflamasyon",
    forbidden: ["İltihap", "Kızarıklık", "Şişlik", "Ağrı", "Sıcaklık"],
  },
  {
    id: "alerji",
    word: "Alerji",
    forbidden: ["Kaşıntı", "Histamin", "Döküntü", "Antijen", "Anafilaksi"],
  },
  {
    id: "anafilaksi",
    word: "Anafilaksi",
    forbidden: ["Alerji", "Şok", "Adrenalin", "Nefes", "Acil"],
  },
  {
    id: "sok",
    word: "Şok",
    forbidden: ["Tansiyon", "Dolaşım", "Acil", "Hipotansiyon", "Organ"],
  },
  {
    id: "sepsis",
    word: "Sepsis",
    forbidden: ["Enfeksiyon", "Kan", "Ateş", "Şok", "Yoğun bakım"],
  },
  {
    id: "travma",
    word: "Travma",
    forbidden: ["Kaza", "Yaralanma", "Acil", "Kırık", "Kanama"],
  },
  {
    id: "histoloji",
    word: "Histoloji",
    forbidden: ["Doku", "Mikroskop", "Preparat", "Lam", "Boyama"],
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
  const savedCards = loadStoredJson(STORAGE_KEYS.cards, DEFAULT_CARDS);
  if (!Array.isArray(savedCards) || savedCards.length === 0) {
    return cloneData(DEFAULT_CARDS);
  }

  const savedIds = new Set(savedCards.map((card) => card.id).filter(Boolean));
  const missingDefaultCards = DEFAULT_CARDS.filter((card) => !savedIds.has(card.id));
  return [...savedCards, ...cloneData(missingDefaultCards)];
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

})();
