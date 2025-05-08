# Ohje uusien blogiartikkelien luomiseen kielimallille

## Käyttötapaus: Kuolleiden linkkien 301-uudelleenohjaus

Tämä ohje on tarkoitettu tilanteisiin, jossa meillä on kuolleita linkkejä ja haluamme ohjata liikenteen uusiin blogiartikkeleihin. Kun kielimalli (LLM) luo uuden blogiartikkelin, sen täytyy noudattaa seuraavia sääntöjä ja käytäntöjä.

## Vaatimukset blogiartikkelin luomiseen

### 1. Frontmatter-määrittely

Käytä aina tätä frontmatter-rakennetta, korvaten vain sisältö tarpeen mukaan:

```md
---
title: "Artikkelin otsikko"
description: "Lyhyt ytimekäs kuvaus, noin 150-200 merkkiä pitkä."
pubDate: "YYYY-MM-DD" # Käytä nykyistä päivämäärää
heroImage: ../../assets/blog/images/kategoria-aihe/featured.webp # Käytä olemassa olevaa kuvaa, valitse satunnaisesti joku kategoria
author: "Mikki Aalto-Ylevä" # PAKOLLINEN, älä muuta
categories: ["Kategoria1", "Kategoria2"] # Valitse sopivat kategoriat
tags: ["tag1", "tag2", "tag3"] # ENINTÄÄN 3 tagia
slug: "artikkelin-url-slug" # Käytä SEO-ystävällistä slugia
---
```

### 2. Sisältövaatimukset

- **Alkuperäinen konteksti**: Kirjoita korvaava sisältö, joka vastaa mahdollisimman hyvin alkuperäisen kuolleen linkin aihetta ja tarkoitusta.
- **Pituus**: Vähintään 700 sanaa, mieluiten 1000-1500 sanaa.
- **Rakenne**: Käytä selkeitä otsikoita (H2, H3) ja lyhyitä kappaleita.
- **Tyyli**: Asiantunteva, mutta helposti lähestyttävä. Vältä liian teknistä kieltä.

### 3. Call-to-Action (pakollinen)

Jokaisen blogiartikkelin loppuun tulee lisätä call-to-action, joka ohjaa käyttäjän contact-sivulle. Käytä aina tätä muotoa (voit muokata tekstiä aiheeseen sopivaksi):

```md
## Ota yhteyttä asiantuntijoihimme

Haluatko kuulla lisää aiheesta tai keskustella, miten voimme auttaa organisaatiotasi [aiheeseen liittyvä asia]? Kokeneet asiantuntijamme auttavat sinua mielellään.

[Ota yhteyttä asiantuntijoihimme tästä](/contact) ja kerro tarpeistasi - palaamme asiaan pian!
```

## Prosessi uuden blogiartikkelin luomiseen ja uudelleenohjaukseen

1. **Analysoi kuollut linkki**: Ymmärrä, mitä aihetta alkuperäinen URL käsitteli.
2. **Luo uusi blogiartikkeli**: Noudata yllä olevia ohjeita ja vaatimuksia.
3. **Tallenna tiedosto**: Käytä nimeämiskäytäntöä `aihe-avainsana.fi.md` ja tallenna se hakemistoon `src/content/blog/`.
4. **Lisää uudelleenohjaus**: Astro-konfiguraatiossa lisää 301-uudelleenohjaus:

```javascript
// astro.config.mjs:
redirects: {
  '/vanha-url-osoite/': '/uusi-artikkelin-slug/',
  // muut uudelleenohjaukset...
}
```

## Esimerkkiartikkeli (rakenne)

```md
---
title: "Digitaalinen transformaatio pk-yrityksissä"
description: "Miten pienet ja keskisuuret yritykset voivat hyödyntää digitalisaatiota liiketoiminnan kehittämisessä ja kasvattamisessa."
pubDate: "2024-05-15"
heroImage: ../../assets/blog/images/digitalisaatio/featured.webp
author: "Mikki Aalto-Ylevä"
categories: ["Digitalisaatio", "Liiketoimintastrategia"]
tags: ["digitalisaatio", "pk-yritykset", "kilpailukyky"]
slug: "digitaalinen-transformaatio-pk-yrityksissa"
---

# Digitaalinen transformaatio pk-yrityksissä

[Artikkelisisältö tähän...]

## Ota yhteyttä asiantuntijoihimme

Haluatko kuulla lisää digitaalisesta transformaatiosta tai keskustella, miten voimme auttaa yrityksesi digitaalisessa uudistumisessa? Kokeneet asiantuntijamme auttavat sinua mielellään.

[Ota yhteyttä asiantuntijoihimme tästä](/contact) ja kerro tarpeistasi - palaamme asiaan pian!
```

---

**Huomautus**: Täyden hyödyn saamiseksi näistä uudelleenohjauksista, varmista että:
1. 301-uudelleenohjaukset on konfiguroitu oikein `astro.config.mjs`-tiedostoon
2. Uudet blogisisällöt vastaavat aidosti alkuperäistä aihetta, jotta hakukoneet tulkitsevat ne asianmukaisiksi korvaajiksi
3. Kuvalähteet (heroImage) ovat olemassa ja toimivia 

Lisäksi tässä lista avainsanoista, jotka ovat suomessa performoineet hyvin. Käytä jotain näistä, jos ne sopivat aiheeseen:

- käyttökokemus
- konseptointi
- käytettävyys
- nielsenin heuristiikka
- prototyyppi