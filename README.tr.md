# AISloop

**Yapay zekâ kodlama ajanları için tasarım kural kitabı: yapay zekâ kokan değil, Apple yazılımı hissi veren arayüzler.**

[English](README.md)

> **Durum: araştırma aşamasında.** Kurallar henüz yazılmadı, kullanıma hazır değil.

Kuralların asıl hâli İngilizcedir, çünkü onları okuyacak olan ajanlardır. Bu sayfa yalnızca Türkçe tanıtımdır.

## Nedir

Bir yapay zekâ ajanı yol gösterilmeden ekran tasarladığında çoğu zaman aynı görünüme düşer: mor-mavi gradyanlar, her yerde cam efekti, parıltı ikonları, birbirinin aynı yuvarlak kartlar. Buna "AI slop" deniyor.

AISloop, ajanın tasarlamadan önce okuduğu kurallardan, tasarım değişkenlerinden (token) ve örneklerden oluşur. Hepsi düz Markdown. Amaç, AISloop ile kurulan arayüzün iyi Apple yazılımları gibi sakin, anlaşılır ve özenli görünmesi.

## Nasıl kullanılacak

Hiçbir şey kurulmaz. Projendeki ajana repoyu verirsin:

> AISloop'u (github.com/Asilturkmen/AISloop) kullanarak ayarlar sayfasını tasarla.

Ajan `AGENTS.md` dosyasından başlar, yalnızca işin gerektirdiği dosyaları okur ve sen aksini söylemedikçe onlara uyar. AISloop'u bütün projede kullanmasını istersen projeye bir `DESIGN.md`, bir token dosyası ve tek satırlık bir not ekler. AISloop'tan söz edilmeyen projeler etkilenmez.

## Nasıl hazırlanıyor

Kurallar Apple yönergelerinin özeti değildir. Her konu aynı döngüden geçer:

1. Gerçek Apple ekranları, aynı hissi yakalamış web ürünleri ve kötü örnekler araştırılır.
2. Seçenekler yan yana konur ve gözle seçilir.
3. Seçilen yön, somut değerleri olan bir kurala dönüştürülür.
4. Kural, ondan kurulan canlı bir örnek sayfayla sınanır.

Her kararın gerekçesi [`decisions.md`](decisions.md) dosyasında, arkalarındaki zevk [`preferences.md`](preferences.md) dosyasında durur.

## Uyarı

AISloop, Apple'ın tasarım dilinden esinlenmiştir; Apple Inc. ile bağlantısı yoktur ve Apple tarafından onaylanmamıştır. Repoda Apple'a ait hiçbir dosya yoktur: logo, ikon, yazı tipi (ör. SF Pro) ya da ekran görüntüsü bulunmaz.

## Lisans

[MIT](LICENSE)
