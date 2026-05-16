# Tıp Fakültesi Tabu

Türkçe, tarayıcıda çalışan, tıp fakültesi temalı Tabu oyunudur. Mobilde tek ekrana sığacak şekilde önce takım girişi, sonra oyun ekranı gösterilir.

## Oyun ekranı

1. `index.html` dosyasını modern bir tarayıcıda açın.
2. Varsayılan olarak 1 takım gelir; **+ Takım ekle** ile istediğiniz kadar takım ekleyin.
3. **Oyuna başla** düğmesine basınca kısa oyun ekranı açılır.
4. Her sırada **Turu başlat** düğmesine basarak kartı ve süreyi başlatın.
5. Doğru cevap, tabu cezası ve pas hakkı admin panelindeki kurallara göre hesaplanır.
6. Sıra tüm takımlardan geçince oyun otomatik olarak sonraki tura geçer: `1. Tur`, `2. Tur` gibi.

## Admin paneli

Admin paneline `/admin` yolundan ulaşılır. Yerelde test ederken `admin/index.html` dosyasını açabilir veya statik sunucuda `http://localhost:4173/admin/` adresine gidebilirsiniz.

Admin panelinde şunları yönetebilirsiniz:

- Ana kelime ve yasak kelimelerden oluşan Tabu kartları.
- Doğru cevabın kaç puan yazacağı.
- Tabu yapmanın kaç ceza puanı yazacağı.
- Her turdaki pas hakkı.
- Tur süresi.

Kartlar ve ayarlar tarayıcının `localStorage` alanında saklanır. Aynı tarayıcıda sayfayı yenilediğinizde kaybolmaz.
