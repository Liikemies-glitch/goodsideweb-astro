# Projekti: Verkkosivuston Kansainvälistäminen (i18n) - Astro

Tämä tiedosto sisältää ohjeet kielimallille (AI Assistant) ja projektin etenemisen seurannan milestonejen avulla.

## Tavoite

Toteutetaan verkkosivustosta suomen- ja englanninkieliset versiot käyttäen Astro i18n -integraatiota (Suunnitelma 2). Tavoitteena on näyttää sisältö automaattisesti käyttäjän sijainnin perusteella: suomeksi Suomesta tuleville ja englanniksi muualta tuleville. Juuri-URL ("/") ohjaa tai näyttää oikean kieliversion.

## Ohjeet Kielimallille (AI Assistant)

1.  **Työskentelytapa:** Projekti etenee alla määriteltyjen milestonejen mukaisesti. Keskity aina yhteen milestoneen kerrallaan.
2.  **Milestonen Valmistuminen:** Kun olet saanut yhden milestonen tehtävät valmiiksi, ilmoita siitä minulle ja pyydä minua katselmoimaan tekemäsi muutokset.
3.  **Katselmointi ja Hyväksyntä:** Älä etene seuraavaan milestoneen, ennen kuin olen tarkistanut työn ja antanut sinulle luvan merkitä milestone valmiiksi.
4.  **Merkintä ja Jatko:** Kun olen antanut luvan, muokkaa tätä tiedostoa merkitsemällä kyseinen milestone valmiiksi (esim. lisäämällä `[x]` checkboxiin). Ilmoita minulle, että milestone on merkitty valmiiksi ja että konteksti-ikkuna tyhjennetään (simuloidusti). Jää tämän jälkeen odottamaan ohjeitani seuraavan *tekemättömän* milestonen aloittamiseksi.

## Milestonet

Seuraa näitä milestoneja järjestyksessä:

-   [x] **Milestone 1: Perusasetukset ja Konfigurointi**
    -   Hyödynnetään Astro:n sisäänrakennettua i18n-reititystä.
    -   Määrittele tuetut kielet (`fi`, `en`) ja oletuskieli (`fi`) `astro.config.mjs`-tiedostossa.
    -   Konfiguroi reititys `astro.config.mjs`-tiedostossa niin, että kielet erotellaan URL-polussa (esim. `/fi/` ja `/en/`, `routing: { prefixDefaultLocale: true }`). Varmistetaan, että juuri-URL (`/`) ohjautuu oletuskieleen (`/fi/`).
    -   **Testausohjeet:**
        -   Käynnistä kehityspalvelin (`npm run dev` tai vastaava).
        -   Varmista, että palvelin käynnistyy ilman virheitä liittyen i18n-asetuksiin.
        -   Avaa selaimessa juuri-URL (`http://localhost:4321/` tai vastaava). Sen pitäisi automaattisesti ohjautua osoitteeseen `http://localhost:4321/fi/`.
        -   Kokeile navigoida manuaalisesti olemassa olevalle sivulle englanninkielisellä polulla (esim. `http://localhost:4321/en/`). Sen pitäisi näyttää 404-virhe (koska sisältöä ei ole vielä käännetty), mutta *ei* konfiguraatiovirhettä.

    *Muistiinpanot (AI): Milestone 1 suoritettu. Astro:n i18n-konfiguraatio lisätty `astro.config.mjs`-tiedostoon (`defaultLocale: 'fi'`, `locales: ['fi', 'en']`, `routing: { prefixDefaultLocale: true }`). Testattu, että juuri-URL ohjautuu `/fi/`-polkuun ja sekä `/fi/` että `/en/` palauttavat 404-virheen odotetusti ilman konfiguraatiovirheitä.*

-   [x] **Milestone 2: Yksinkertainen Käännös ja Komponentti**
    -   Luo perusrakenne käyttöliittymän käännöstiedostoille (esim. `src/i18n/ui.ts` tai vastaava Astro:n dokumentaation mallin mukaisesti, sisältäen `fi`- ja `en`-objektit).
    -   Lisää muutama perustason käännösavain (esim. sivuston nimi, navigaation linkit) molemmille kielille `ui.ts`-tiedostoon.
    -   Muokkaa yhtä yleiskäyttöistä komponenttia (esim. `src/components/Header.astro`) käyttämään `Astro.currentLocale`-ominaisuutta ja `ui.ts`-tiedostoa näyttämään oikean kielisen tekstin.
    -   **Testausohjeet:**
        -   Varmista, että kehityspalvelin on käynnissä.
        -   Navigoi sivulle, joka käyttää muokattua komponenttia suomenkielisessä polussa (esim. `/fi/`). Komponentin tekstien tulisi näkyä suomeksi `ui.ts`-tiedostosta.
        -   Navigoi *manuaalisesti* saman sivun oletettuun englanninkieliseen polkuun (esim. `/en/`). Vaikka itse sivu saattaa vielä antaa 404-virheen (koska sivutiedostoa ei ole `/en/`-polulle), muokatun komponentin (kuten Header) tulisi silti yrittää renderöityä ja näyttää *englanninkieliset* tekstit `ui.ts`-tiedostosta.

    *Muistiinpanot (AI): Milestone 2 suoritettu. Luotu `src/i18n/ui.ts` ja `src/i18n/utils.ts`. Muokattu `src/components/Footer.astro` käyttämään käännöksiä. Poiketen suunnitelmasta, luotiin `src/pages/fi` ja `src/pages/en` hakemistot, siirrettiin `src/pages/index.astro` -> `src/pages/fi/index.astro` ja luotiin kopiona `src/pages/en/index.astro` sekä minimaalinen `src/pages/index.astro` juureen, jotta testaus onnistui. Korjattiin myös siirrettyjen sivujen import-polut. Testattu, että `/fi/`- ja `/en/`-polut latautuvat ja Footer näyttää oikeat kieli-spesifit tekstit molemmilla poluilla.*

-   [ ] **Milestone 3: Sisältökokoelmien (Content Collections) Käännökset**
    -   Projektisi käyttää sisältökokoelmia (`src/content/`) MD-tiedostoille. Määritellään strategia kieliversioiden hallintaan. Yleinen tapa on käyttää tiedostonimeä erotteluun, esim. `blogipostaus.fi.md` ja `blogipostaus.en.md`.
    -   Muokkaa sisältökokoelmien skeemaa (`src/content/config.ts`) tarvittaessa (yleensä ei välttämätöntä pelkälle kielelle, mutta hyvä tarkistaa).
    -   Luo manuaalisesti *yhdestä* olemassa olevasta `.md`-tiedostosta englanninkielinen versio (esim. kopioi `jotain.fi.md` -> `jotain.en.md` ja käännä sisältö nopeasti).
    -   Päivitä sivut, jotka renderöivät sisältökokoelmien dataa (esim. blogin etusivu ja yksittäisen postauksen sivu), käyttämään `getCollection`-funktiota filtteröiden tulokset `Astro.currentLocale`-muuttujan perusteella. Varmista, että linkit osoittavat oikeisiin kieliversioihin.
    -   **Testausohjeet:**
        -   Navigoi sivulle, joka listaa sisältökokoelman kohteita (esim. blogi) suomeksi (`/fi/blog/`). Listauksen tulisi näyttää vain `.fi.md`-tiedostot.
        -   Navigoi vastaavalle sivulle englanniksi (`/en/blog/`). Listauksen tulisi näyttää vain `.en.md`-tiedostot (eli tässä vaiheessa vain se yksi manuaalisesti luotu).
        -   Klikkaa suomenkielisen postauksen linkkiä. Sen tulisi viedä `/fi/blog/postaus-slug`-osoitteeseen ja näyttää suomenkielinen sisältö.
        -   Klikkaa englanninkielisen postauksen linkkiä. Sen tulisi viedä `/en/blog/postaus-slug`-osoitteeseen ja näyttää englanninkielinen sisältö.

    *Muistiinpanot (AI): Milestonessa 3 työstettiin seuraavat asiat:*
    *1. Korjattiin `/en/blog/` sivu, jotta se toimii ja näyttää englanninkieliset artikkelit.*
    *2. Filtteröinti toimii niin, että /fi/blog näyttää vain .fi.md-tiedostot ja /en/blog näyttää vain .en.md-tiedostot.*
    *3. Linkit osoittavat kieliversiokohtaisiin osoitteisiin: `/fi/blog/slug/` ja `/en/blog/slug/`.*
    
    *Vielä tehtävää:*
    *1. Tagien kääntäminen (tag-elementit näyttävät edelleen samat tagit molemmissa kieliversioissa).*
    *2. Varmistettava, että englanninkieliset postaukset hakevat kuvat oikein.*
    *3. Sisältökokoelmien skeeman tarkistus (`src/content/config.ts`).*
    *4. Varmistettava, että ainakin yksi .md-tiedosto on käännetty englanninkieliseksi.*

-   [ ] **Milestone 4: Layoutin Päivitys (`hreflang` ja Kielilinkit)**
    -   Päivitä pääasiallinen layout-tiedosto (`src/layouts/Layout.astro` tai vastaava).
    -   Käytä Astro:n `Astro.url`- ja i18n-konfiguraatiotietoja generoidaksesi dynaamisesti oikeat `hreflang`-linkkitagit `<head>`-osioon jokaiselle tuetulle kielelle.
    -   Lisää kielenvaihtolinkki ("Suomeksi / In English") layoutiin. Linkkien tulisi osoittaa nykyisen sivun vastineeseen toisella kielellä. Käytä `getStaticPaths` (tarvittaessa) tai `Astro.currentLocale` apuna oikeiden URL-osoitteiden muodostamiseen.
    -   **Testausohjeet:**
        -   Avaa kehitystyökalut (selaimen Inspect Element) mille tahansa sivulle (esim. `/fi/` tai `/en/blog/jotain`).
        -   Tarkista `<head>`-osion sisältö. Sieltä pitäisi löytyä `<link rel="alternate" hreflang="fi" href="...">` ja `<link rel="alternate" hreflang="en" href="...">` -tagit, jotka osoittavat oikeisiin URL-osoitteisiin.
        -   Etsi ja klikkaa kielenvaihtolinkkiä (esim. "In English", kun olet suomenkielisellä sivulla). Sinut pitäisi ohjata saman sivun englanninkieliseen versioon (esim. `/fi/about` -> `/en/about`). Varmista, että linkki toimii molempiin suuntiin.

-   [ ] **Milestone 5: Kielen Tunnistus ja Juuri-URL:n Käsittely Vercelissä**
    -   Toteuta Astro Middleware (`src/middleware.ts` tai `src/middleware.js`).
    -   Middlewaren tulee:
        -   Tarkistaa pyynnöt, jotka kohdistuvat juuri-URL:iin (`/`).
        -   *Ei* puuttua pyyntöihin, jotka sisältävät jo kieliprefiksin (`/fi/*`, `/en/*`).
        -   Tarkistaa pyynnön `Accept-Language`-otsake. Jos se sisältää `fi` ennen muita kieliä, aseta kieleksi `fi`. Muuten aseta kieleksi `en`.
        -   Käytä `Astro.redirect` tai `context.rewrite` (riippuen halutusta toiminnasta: näkyvä uudelleenohjaus vs. sisäinen reititys) ohjaamaan käyttäjä vastaavalle kielelliselle etusivulle (`/fi/` tai `/en/`). Uudelleenohjaus (`Astro.redirect`) on yleensä selkeämpi.
        -   *Huom:* IP-pohjainen tunnistus vaatisi Vercel Edge Functionsia tai Serverless Functionsia ja ulkoista GeoIP-palvelua/kirjastoa. Pidetään tämä yksinkertaisempana ja käytetään `Accept-Language` -otsaketta ensisijaisena metodina, se kattaa suurimman osan tapauksista.
    -   **Testausohjeet:**
        -   Muuta selaimen kieliasetuksia:
            -   Aseta suomi ensisijaiseksi kieleksi. Avaa juuri-URL (`/`). Sinut pitäisi ohjata `/fi/`-osoitteeseen.
            -   Aseta englanti ensisijaiseksi kieleksi (ja poista suomi tai siirrä se alemmaksi). Avaa juuri-URL (`/`). Sinut pitäisi ohjata `/en/`-osoitteeseen.
        -   Varmista, että suorat navigoinnit osoitteisiin kuten `/fi/blog` tai `/en/about` toimivat edelleen ilman ylimääräisiä uudelleenohjauksia middlewaren toimesta.
        -   Testaa Vercelin esikatseluympäristössä (`preview deployment`), jotta varmistutaan middlewaren toiminnasta Vercelin infrassa.

-   [ ] **Milestone 6: Testaus ja Viimeistely**
    -   Käännä *muutama lisää* sisältösivua ja blogipostausta englanniksi, jotta testaaminen on kattavampaa.
    -   Testaa kaikki sivutyypit (etusivu, tavalliset sivut, blogilistaus, yksittäinen blogipostaus) molemmilla kielillä.
    -   Tarkista linkkien toimivuus (sisäiset linkit, navigaatio, kielenvaihtolinkit) molemmilla kielillä.
    -   Varmista `hreflang`-tagien oikeellisuus useilla eri sivuilla.
    -   Tarkista juuri-URL:n uudelleenohjauksen toiminta eri selainasetuksilla.
    -   Siivoa koodia, poista turhat kommentit ja lisää selventäviä kommentteja tarvittaessa.
    -   Suorita tuotanto-build (`npm run build`) ja esikatsele se paikallisesti (`npm run preview`) varmistaaksesi, ettei virheitä ilmene.
    -   Tee lopullinen testaus Vercelin preview-ympäristössä ennen tuotantoon vientiä.
    -   **Testausohjeet:** Suorita kaikki yllä mainitut testit systemaattisesti. Pyydä tarvittaessa toista henkilöä testaamaan eri selaimella tai kieliasetuksilla.

---

Aloitetaan **Milestone 1: Perusasetukset ja Konfigurointi**. Mitä i18n-ratkaisua suosit Astroon perustuen nykyiseen projektirakenteeseen ja tavoitteisiin? Vai haluatko minun tutkivan vaihtoehtoja ensin? 