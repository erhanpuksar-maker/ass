# Tıp Fakültesi Tabu

Türkçe, tarayıcıda çalışan, tıp fakültesi temalı basit bir Tabu oyunudur. Kartlarda anatomi, klinik bilimler, hastane ve fakülte yaşamına ait kelimeler bulunur.

## Kullanım

1. Bu dizindeki `index.html` dosyasını modern bir tarayıcıda açın.
2. Takım adlarını ve tur süresini seçin.
3. **Oyunu başlat** düğmesine basın.
4. Anlatıcı ana kelimeyi yasaklı kelimeleri kullanmadan anlatır.
5. Doğru cevapta **Doğru (+1)**, yasak kelime kullanımında **Tabu (-1)**, kart geçmek için **Pas** düğmesini kullanın.
6. Süre bitince veya **Turu bitir** düğmesine basınca tur sonucu tabloya kaydedilir.

## Admin paneli

Sayfadaki **Admin paneli** bölümünden yeni kart ekleyebilir, mevcut kartları düzenleyebilir veya silebilirsiniz. Kartlar tarayıcının `localStorage` alanında saklanır; sayfayı yenileseniz bile aynı tarayıcıda kalır.

Yasak kelimeleri virgülle ayırarak girin:

```text
Doku, Mikroskop, Preparat, Boyama, Lam
```

Varsayılan 15 kartlık başlangıç destesine dönmek için **Kartları varsayılana döndür** düğmesini kullanın.

## Tur sonuçları

Her takımın tamamladığı tur ayrı satır olarak **Tur sonuçları** tablosunda görünür. İki takım da oynadıktan sonra oyun otomatik olarak bir sonraki tura geçer: `1. Tur`, `2. Tur` gibi.
