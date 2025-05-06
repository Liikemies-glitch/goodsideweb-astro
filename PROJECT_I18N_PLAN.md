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

-   [x] **Milestone 3: Sisältökokoelmien (Content Collections) Käännökset**
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

-   [x] **Milestone 4: Layoutin Päivitys (`hreflang` ja Kielilinkit)**
    -   Päivitä pääasiallinen layout-tiedosto (`src/layouts/Layout.astro` tai vastaava).
    -   Käytä Astro:n `Astro.url`- ja i18n-konfiguraatiotietoja generoidaksesi dynaamisesti oikeat `hreflang`-linkkitagit `<head>`-osioon jokaiselle tuetulle kielelle.
    -   Lisää kielenvaihtolinkki ("Suomeksi / In English") layoutiin. Linkkien tulisi osoittaa nykyisen sivun vastineeseen toisella kielellä. Käytä `getStaticPaths` (tarvittaessa) tai `Astro.currentLocale` apuna oikeiden URL-osoitteiden muodostamiseen.
    -   **Testausohjeet:**
        -   Avaa kehitystyökalut (selaimen Inspect Element) mille tahansa sivulle (esim. `/fi/` tai `/en/blog/jotain`).
        -   Tarkista `<head>`-osion sisältö. Sieltä pitäisi löytyä `<link rel="alternate" hreflang="fi" href="...">` ja `<link rel="alternate" hreflang="en" href="...">` -tagit, jotka osoittavat oikeisiin URL-osoitteisiin.
        -   Etsi ja klikkaa kielenvaihtolinkkiä (esim. "In English", kun olet suomenkielisellä sivulla). Sinut pitäisi ohjata saman sivun englanninkieliseen versioon (esim. `/fi/about` -> `/en/about`). Varmista, että linkki toimii molempiin suuntiin.

-   [x] **Milestone 5: Kielen Tunnistus ja Juuri-URL:n Käsittely Vercelissä**
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

-   [ ] **Milestone 6: Sivujen inventaario ja kääntämisen valmistelu**
    -   Tee kattava inventaario kaikista sivustolla olevista sivuista.
        -   Etsi ja listaa kaikki `src/pages/` -hakemistossa olevat sivut, jotka tulee kääntää:
            - `palvelut.astro` → `src/pages/en/palvelut.astro` (tai "services")
            - `referenssit.astro` → `src/pages/en/referenssit.astro` (tai "references") 
            - `contact.astro` → `src/pages/en/contact.astro`
            - `diy-opas.astro` → `src/pages/en/diy-opas.astro` Tätä ei käännetä.
            - `referenssit/eemel.astro` → `src/pages/en/referenssit/eemel.astro`
        -   Etsi ja listaa kaikki blogitekstit (`src/content/blog/`) ja varmista, että ne on nimetty johdonmukaisesti (`.fi.md`-päätteiset tiedostot):
            - Yhteensä 87 kääntämätöntä blogiartikkelia
            - Kolme artikkelia jo käännetty englanniksi: `mita-on-palvelumuotoilu.en.md`, `kaytettavyys-ja-hakukoneoptimointi.en.md`, `design-ops.en.md`
        -   Varmista, että blogin mahdolliset listaustiedostot toimivat molemmilla kielillä:
            - `src/pages/fi/blog/index.astro` → `src/pages/en/blog/index.astro` (jo luotu)
            - `src/pages/fi/blog/[slug].astro` → `src/pages/en/blog/[slug].astro` (tarkistettava)
    -   Järjestä kaikki käännettävät sivut ja blogitekstit prioriteettijärjestykseen:
        -   **Korkea prioriteetti (Milestone 8 - nämä 5 artikkelia):**
            - `design-osana-strategiaa-top-5-esimerkit.fi.md`
            - `design-thinking-prosessi-joka-sytyttaa-luovuuden-liekin.fi.md`
            - `designerin-rooli-asiakaskokemuksen-parantamisessa.fi.md` 
            - `designin-tulee-olla-kaiken-ytimessa-v-2.fi.md`
            - `designin-yhtenaisyys-muutosten-keskella.fi.md`
        -   **Keskitason prioriteetti (Milestone 9 - seuraavat 10 artikkelia):**
            - `designops-muotoiluosaamisen-kumppani.fi.md`
            - `designops-nain-paaset-alkuun.fi.md`
            - `dieter-rams-ja-10-hyvan-muotoilun-periaatetta.fi.md`
            - `digipalvelun-uudistaminen.fi.md`
            - `digiprojektin-budjetointi.fi.md`
            - `digitaalinen-asiakaskokemus-nain-alkuun.fi.md`
            - `digitalisaation-megatrendit-muokkaavat-liiketoimintaa.fi.md`
            - `empatia-palvelumuotoilussa.fi.md`
            - `ideasta-appiin-selviytymisopas.fi.md`
            - `jakobs-law-intuitiivisen-kayttoliittymasuunnittelun-kulmakivi.fi.md`
        -   **Matala prioriteetti (Milestone 10 - loput ~72 artikkelia)**
    -   Blogitiedostot noudattavat jo johdonmukaista `.fi.md`-päätteistä nimeämiskäytäntöä. Uudelleennimeäminen ei ole tarpeen.
    -   Tarkista `src/content/config.ts`:
        - Nykyinen määrittely tukee monikielisiä tiedostoja, koska se ei määrittele kieltä osana skeemaa
        - Z-objektiin on määritelty seuraavat pakolliset kentät: title, pubDate, description, author, tags
        - Nämä kentät tulee kääntää jokaiselle artikkelille
    -   **Testausohjeet:**
        -   Varmista, että kaikilla inventaarion sivuilla ja tiedostoilla on selvä suunnitelma englanninkielisten versioiden luomiseksi.
        -   Varmista, että kaikki blogitekstit on nimetty oikein ja ne on järjestetty prioriteettijärjestykseen Milestone 8-10 mukaisesti.

-   [ ] **Milestone 7: Staattisten sivujen kääntäminen**
    -   Käännä kaikki staattiset sivut (etusivu, palvelut, referenssit, yhteydenotto, jne.) englannin kielelle.
        -   Etsi ja tunnista sivut `src/pages/` -hakemistosta.
        -   Luo vastaavat englanninkieliset versiot `src/pages/en/` -hakemistoon.
        -   Varmista, että kaikki sivukohtaiset komponentit ja elementit käännetään.
        -   Huomioi SEO-tagit ja metatiedot, kuvaukset ja otsikot.
    -   Tarkista ja testaa jokainen käännetty sivu sekä ulkoasun että sisällön osalta.
    -   Varmista, että kaikki navigaatioelementit toimivat oikein molemmilla kielillä.
    -   **Testausohjeet:**
        -   Käy läpi kaikki käännetyt sivut englanniksi ja varmista, että ne vastaavat sisällöltään suomenkielisiä sivuja.
        -   Tarkista, että sivuilla ei ole jäljellä suomenkielistä tekstiä.
        -   Testaa, että navigointi toimii sujuvasti englanninkielisessä versiossa.
        -   Varmista, että kielenvaihtolinkit ohjaavat oikeisiin vastinsivuihin.

-   [ ] **Milestone 8: Blogitekstien kääntäminen (Osa 1 - Tärkeimmät ja uusimmat artikkelit)**
    -   Valitse 3-5 tärkeintä tai uusinta blogiartikkelia käännettäväksi ensimmäisessä vaiheessa.
    -   Käännä valitut blogiartikkelit seuraavasti:
        -   Kopioi jokainen `.fi.md`-tiedosto vastaavaksi `.en.md`-tiedostoksi.
        -   Käännä frontmatter-metatiedot (otsikko, kuvaus, tagit, jne.).
        -   Käännä artikkelin leipäteksti ylläpitäen alkuperäisen muotoilun.
        -   Varmista, että kuvaviittaukset toimivat oikein.
        -   Käännä tagit ja muut luokittelutiedot.
    -   Tee tarvittavat muutokset, jos blogilistaussivut vaativat kielispesifejä muutoksia.
    -   **Testausohjeet:**
        -   Tarkista, että käännetyt blogiartikkelit näkyvät oikein `/en/blog/` -sivulla.
        -   Varmista, että artikkelien kuvat, muotoilut ja tagit toimivat englanninkielisessä versiossa.
        -   Varmista, että artikkelin metatiedot ja SEO-ominaisuudet on käännetty oikein.

-   [ ] **Milestone 9: Blogitekstien kääntäminen (Osa 2 - Seuraava erä artikkeleita)**
    -   Valitse seuraavat 5-10 blogiartikkelia käännettäväksi toisessa vaiheessa.
    -   Käännä nämä artikkelit samalla prosessilla kuin Milestone 8:ssa:
        -   Kopioi jokainen `.fi.md`-tiedosto vastaavaksi `.en.md`-tiedostoksi.
        -   Käännä frontmatter-metatiedot (otsikko, kuvaus, tagit, jne.).
        -   Käännä artikkelin leipäteksti ylläpitäen alkuperäisen muotoilun.
        -   Varmista, että kuvaviittaukset toimivat oikein.
        -   Käännä tagit ja muut luokittelutiedot.
    -   Tarkista mahdolliset viittaukset toisiin artikkeleihin ja päivitä ne tarvittaessa.
    -   **Testausohjeet:**
        -   Toista samat testit kuin Milestone 8:ssa.
        -   Varmista, että artikkelien väliset viittaukset toimivat oikein englanninkielisessä versiossa.

-   [ ] **Milestone 10: Blogitekstien kääntäminen (Osa 3 - Loput artikkelit)**
    -   Käännä kaikki jäljellä olevat blogiartikkelit:
        -   Kopioi jokainen `.fi.md`-tiedosto vastaavaksi `.en.md`-tiedostoksi.
        -   Käännä frontmatter-metatiedot (otsikko, kuvaus, tagit, jne.).
        -   Käännä artikkelin leipäteksti ylläpitäen alkuperäisen muotoilun.
        -   Varmista, että kuvaviittaukset toimivat oikein.
        -   Käännä tagit ja muut luokittelutiedot.
    -   Tarkista mahdolliset arkistointi- tai kategoriasivu ja varmista, että ne toimivat molemmilla kielillä.
    -   **Testausohjeet:**
        -   Varmista, että kaikki artikkelit näkyvät `/en/blog/` -sivulla.
        -   Tarkista kategoriat, tagit ja arkistot molemmilla kielillä.
        -   Varmista, että blogin hakutoiminto (jos sellainen on) toimii molemmilla kielillä.

-   [ ] **Milestone 11: Testaus, optimointi ja tuotantoon vienti**
    -   Suorita kattava testaus koko sivustolla molemmilla kielillä:
        -   Käy läpi kaikki sivut ja varmista, että sisältö näkyy oikein.
        -   Tarkista kaikki navigaatioelementit, linkit ja toiminnallisuudet.
        -   Varmista, että kielenvaihto toimii kaikilla sivuilla oikein.
        -   Testaa `middleware.ts` -toiminta juuri-URL:n kanssa molemmilla käyttötapauksilla (URL-parametrit).
    -   Tee hakukoneoptimoinnin tarkistus:
        -   Varmista, että kaikilla sivuilla on asianmukaiset SEO-metatiedot molemmilla kielillä.
        -   Tarkista `hreflang`-tagien toiminta kaikilla sivuilla.
        -   Varmista, että sivukartta (`sitemap.xml`) sisältää molemmat kieliversiot.
    -   Optimoi suorituskyky:
        -   Tarkista ja optimoi kuvatiedostot.
        -   Suorita Lighthouse tai vastaava suorituskykytesti molemmilla kieliversioilla.
    -   Tee lopullinen tuotantobuild ja julkaise sivusto:
        -   Suorita `npm run build` ja tarkista, ettei virheitä ilmene.
        -   Tarkista build-artefaktit varmistaaksesi, että kaikki sivut on generoitu oikein.
        -   Testaa sivusto Vercelin esikatseluympäristössä ennen lopullista julkaisua.
        -   Julkaise sivusto tuotantoon ja tarkista, että kaikki toimii odotetusti.
    -   **Testausohjeet:**
        -   Suorita kattava tarkistus kaikille sivuille tuotantoympäristössä.
        -   Tarkista sivuston toiminta eri selaimilla ja laitteilla.
        -   Varmista, että kielenvaihto ja juuri-URL:n käsittely toimii oikein tuotannossa.

---

Tämä laajennettu suunnitelma kattaa koko sivuston kääntämisen suomesta englanniksi ja varmistaa, että kaikki sisältö, blogitekstit ja toiminnallisuudet toimivat moitteettomasti molemmilla kielillä. Milestonet on jaettu loogisiin kokonaisuuksiin, jotta työ voidaan tehdä hallituissa erissä.