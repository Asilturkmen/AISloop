# AISloop

![Çapraz bir cam ışık bandıyla ikiye ayrılmış bir giriş sayfası. Bandın gerisinde tipik yapay zekâ girişi: neon aurora, parıltılar, parlayan butonlar, birbirinin aynı kartlar. Bandın geçtiği yerde aynı sayfa rafine edilmiş: şafakta sisli dağlar, büyük beyaz AISloop yazısı, tek buton ve tek mavi anahtarlı sakin bir ayarlar kartı.](assets/banner.png)

**Yapay zekâ kodlama ajanlarının daha tek piksel çizmeden okuduğu bir tasarım kural kitabı. Böylece yaptıkları şey yapay zekânın değil, Apple'ın elinden çıkmış gibi görünür.**

[English](README.md)

> **Durum: araştırma aşaması.** Temeller araştırıldı ve ölçüldü; ajanın uyacağı kurallar şimdi yazılıyor. Bkz. [Yol haritası](#yol-haritası).
>
> Kuralların asıl hâli İngilizcedir, çünkü onları okuyacak olan ajanlardır. Bu sayfa Türkçe tanıtımdır.

---

## Sorun

Bir yapay zekâ ajanından arayüz isteyin, çoğu zaman belli olur. Aynı mor-mavi gradyan. Her yerde cam efekti. "Akıllı" olan her şeyin yanında bir parıltı ikonu. Her ürünü satabilecek bir başlığın altında birbirinin aynı altı yuvarlak kart. Buna **AI slop** deniyor.

Çözüm daha uzun bir prompt değil. Ajanın ihtiyacı, iyi bir ekibe yeni katılan tasarımcıya ilk gün verilen şey: gerekçeleri ve gerçek sayıları olan bir kural kitabı.

## AISloop nedir

Ajanın tasarlamadan önce okuduğu düz Markdown kurallar, tasarım değişkenleri (token) ve canlı örnekler. Kurulum yok, çalışan bir program yok, bir çatıya bağımlılık yok.

```
Sen:    "AISloop'u (github.com/Asilturkmen/AISloop) kullanarak ayarlar sayfasını yap."
Ajan:   AGENTS.md'yi okur  →  yalnız bu sayfanın gerektirdiği kuralları açar
        →  AISloop token'larıyla kurar  →  sonucu kontrol listesine göre doğrular
Sonuç:  Apple'ın kendi yazılımları gibi sakin, anlaşılır ve özenli bir sayfa
```

İki türü kapsar:

| | Hissi | Nerede |
|---|---|---|
| **Uygulama arayüzleri** | Apple'ın kendi uygulamaları: Ayarlar, Notlar, Mail, Finder, Pages | listeler, ayarlar, editörler, paneller |
| **Ürün ve giriş sayfaları** | apple.com: büyük yazı, güçlü görsel, atmosfer | ürün sayfaları, lansmanlar, giriş sayfaları |

## Farkı ne

**Stili değil, özensizliği yasaklar.**
Çoğu anti-slop listesi görünümleri yasaklar: cam yok, koyu giriş yok, ışıma yok. AISloop yasaklamaz. Özenle yapılmış popüler bir görünüm kabul edilir. Yasaklanan, slop'u slop yapan şeydir:

| Çöp slop | Kaliteli (popüler bir stil olsa bile) |
|---|---|
| Her ürüne uyan metin | Yalnız bu ürüne ait söz ve görsel |
| Aynı altı kart, aynı giriş | Tek güçlü fikir, gerisi sakin |
| Etkileyici görünsün diye eklenmiş efekt | Hiyerarşiyi ya da atmosferi taşıyan efekt |
| Stok avatarlar, uydurma sayılar | Gerçek ya da gerçekçi içerik, uç durumlar dahil |
| Sıkışık satırlar, düşük kontrast, kesik metin | Ölçülmüş hiza, boşluk ve kontrast |
| Sahte Mac pencereleri | Apple'ın oranları ve davranışı, dürüstçe web'e çevrilmiş |

**Hafızadan değil, kanıttan kurulur.**
- Apple'ın tasarım rehberinden (HIG) **92 sayfa**: konu konu, Apple'ın verdiği her sayıyla.
- Güncel iOS, iPadOS ve macOS uygulamalarından **89 resmi ekran görüntüsü**, **piksel piksel ölçüldü**: satır yükseklikleri, kenar boşlukları, köşe yarıçapları, renk katmanları.
- **Apple'ın kendi web uygulamaları** (Music, Podcasts, App Store, Maps, Developer) tarayıcıda canlı ölçüldü: "Apple web için tasarlasa nasıl yapardı" sorusunun en yakın cevabı.
- Tasarım ilkeleri, Liquid Glass ve yapay zekâ destekli prototipleme üzerine **WWDC oturumları**.

**Ortalama bir zevkten değil, gerçek bir zevkten kurulur.**
Apple'ın rehberi Apple'ın ne yaptığını söyler; senin neyi sevdiğini söylemez. AISloop'taki her yön, seçeneklerin yan yana konup gözle oylandığı bir panodan geçer. Sonuç [`preferences.md`](preferences.md) dosyasında, her karar ve gerekçesi [`decisions.md`](decisions.md) dosyasında durur.

**Kopyalamaz, çevirir.**
Apple'ın yazı tipleri, ikonları ve UI kitleri yalnız Apple platformları için lisanslıdır. AISloop bunların hiçbirini içermez. Oranları, hiyerarşiyi ve davranışı alır, sade web diline çevirir: sistem yazı tipi yığını, CSS değişkenleri, açık lisanslı ikon seti.

## Araştırmanın bulduğu birkaç şey

- Apple'ın kendi web uygulamaları iOS'un 17 px'ini değil, **macOS'un yazı ölçeğini** (13 px gövde) kullanıyor.
- **Cam çerçeveye aittir, içeriğe asla.** HIG, gerçek uygulamalar ve Apple'ın web CSS'i aynı şeyi söylüyor.
- İç içe köşeler hesaplanabilir bir kurala uyuyor: **iç yarıçap = dış yarıçap − boşluk**, en az 6 px civarında.
- **Her ekranda tek vurgu rengi**, en olası tek eylemde; araç çubukları ve ikonlar tek renk.
- Apple'ın web uygulamalarında koyu mod **siyah değil, koyu gri (#1f1f1f)**.

## Düzen

| Yol | İçinde ne var |
|---|---|
| [`preferences.md`](preferences.md) | Her kuralın uyduğu zevk profili |
| [`decisions.md`](decisions.md) | Her karar, tarihi ve gerekçesiyle |
| [`research/`](research/) | Kanıtlar: HIG özeti, ölçümler, kaynaklar, oy sonuçları |
| [`tools/`](tools/) | Araştırma ve tasarım doğrulama için ekran görüntüsü aracı |
| [`apple-native/`](apple-native/) | Yalnız sadece Apple platformları için yapılan uygulamalar (SwiftUI/UIKit). Geri kalan her şey her proje için. |

Temeller, bileşenler, kalıplar, token'lar ve `AGENTS.md` giriş kapısı yol haritası ilerledikçe eklenecek.

## Yol haritası

| Faz | | Durum |
|---|---|---|
| 0 | İskelet, lisans, karar kaydı | bitti |
| 1 | Zevk kalibrasyonu: araştırma, pano, 51 oy | bitti |
| 2 | Temeller: yazı, renk, boşluk, köşeler, malzeme, hareket → token'lar + canlı örnek sayfa | sırada |
| 3 | `AGENTS.md` giriş kapısı ve son yapı | planlandı |
| 4 | Kalıplar tek tek (ayarlar, liste-detay, formlar, giriş sayfası…), her biri gerçek bir projede denenerek | planlandı |

## Uyarı

AISloop, Apple'ın tasarım dilinden esinlenmiştir; Apple Inc. ile bağlantısı yoktur ve Apple tarafından onaylanmamıştır. Repoda Apple'a ait hiçbir dosya yoktur: logo, ikon, yazı tipi (ör. SF Pro), UI kiti ya da ekran görüntüsü bulunmaz. Ürün adları yalnız ürünlere atıf için kullanılır.

## Lisans

[MIT](LICENSE)
