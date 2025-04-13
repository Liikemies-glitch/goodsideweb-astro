---
title: Kaikki paitsi LinkedIn on turhaa
pubDate: '2025-01-30T14:19:26.000Z'
description: >-
  Data&#x2d;analyysi paljastaa LinkedInin ylivoimaisuuden B2B&#x2d;myynnissä.
  Vertailussa mukana liidimäärät, konversiot ja euromääräiset tulokset eri
  kanavista.
seoTitle: LinkedIn on tehokkain B2B&#x2d;myyntikanava
author: Mikki Aalto-Ylevä
tags:
  - Tekoäly
  - Myynti
  - Data-analyysi
heroImage: ../../assets/blog/images/linkedin-on-myyntikanavien-ykkonen/featured.jpg
heroImageAlt: Kaikki paitsi LinkedIn on turhaa
---

Myynnin data-analyysi vahvisti LinkedInin ylivoimaisuuden myyntikanaviemme joukossa niin liidien määrässä, konversiossa kuin euroissa mitattuna. LinkedIn-liidit konvertoituvat kaupaksi yhtä todennäköisesti kuin suorat yhteydenotot tutuilta. Tässä artikkelissa avaan yksityiskohtaisesti, miten tein analyysin ja mitä työkaluja käytin. Lukuaika: 5 minuuttia.

## CRM datan validointi

Ensimmäinen steppi oli selvittää, että mistä kanavasta tulevat kaupat konvertoituvat parhaiten kaupaksi. Tätä varten tarvittiin lista voitetuista kaupoista ja tieto, että mitä kanavaa pitkin myyntimahdollisuus oli syntynyt. Otin listan voitetuista kaupoista ulos HubSpotista ja kirjasin kunkin myyntimahdollisuuden kohdalle käsin tiedot myyntikanavasta. Tää tieto mulla oli päässä, olinhan ollut jokaisessa myyntimahdollisuudessa jollain tavalla itse mukana. On enemmän poikkeus kun sääntö, että CRM-järjestelmään merkataan kaupan loppusumma "vähä sinneppäin -hengessä" eli mäkin aloitin tarkistamalla, että HubSpottiin merkatut eurot on oikeasti linjassa sen kans mitä on tehty ja laskutettu. Ennen tarkistusta, käydään läpi meidän myyntikanavat:

-   **LinkedIn -** tarve on tunnistettu LinkedInissä
-   **WhatsApp -** tarve on tunnistettu WhatsApissa
-   **Kylmäsoitto -** liidit, joissa myyntiprosessi on alkanut puhelinsoitosta asiakkaalle
-   **Kylmämeili -** myyntiprosessi on alkanut asiakkaalta tulleesta positiivisesta vastauksesta meidän sähköpostiin
-   **www-yhteydenottolomake -** tarve on ilmaistu yhteydenottolomakkeen kautta tai asiakas on etsinyt myyjän yhteystiedot osoitteesta goodside.fi
-   **Suorat inbound yhteydenotot -** tarpeesta kerrotaan suoraan asiantuntijalle tai myyjälle suoralla yhteydenotolla privaatisti
-   **Muu -** kaikki muut liidit, myös ne joiden alkuperä on hämärän peitossa

Vertailin keskenään myyntidataa toteutuneeseen liikevaihtoon kanavakohtaisesti. Kun huomasin, että erot näissä selittyy sillä, että kaupat on tehty hiljattain mutta niitä ei ole vielä laskutettu, pystyin päättelemään, että HubSpottiin merkattu euro ennustaa aika kivasti sitä me todellisuudessa tullaan laskuttamaan.

## Historiallisesta datasta tulevaisuuden näkymiin

Tässä kohtaa näytti jo siltä, että LinkedIn dominoi. En kuitenkaan halunnut tehdä tän datan perusteella vielä päätelmiä koska tiesin meidän ottaneen kylmäsoitot ja meilit valikoimaan vasta paljon sen jälkeen kun olimme aloittaneet ponnistelut LinkedInissä. Saadakseni näkymän tulevaan mun oli katsottava myyntiputkea laajemmasta näkökulmasta eikä pelkästään toteutuneiden kauppojen ja toteutuneiden eurojen kautta. Aloin siis tarkastelemaan kaikkien tarjousten, eli potentiaalisten kauppojen dataa. Myyntimahdollisuuksia oli kertynyt syyskuusta 2024 tähän päivään mitattaessa yli sata.

## Datan jalostaminen ja työkalujen valinta

Jotta sain jokaiselle myyntimahdollisuudelle tiedon myyntikanavasta mun piti tehdä uusi attribuutti HubSpotiin ja kirjata tää tieto jokaiselle myyntimahdollisuudelle. Tää oli kohtalaisen helppo ja nopea homma koska oon ite tehnyt noista 90% niin tiedän mistä ne on tulleet. Lopulta kun data oli kunnossa, koitin ensin muodostaa siitä raportteja HubSpotilla. Törmäsin ongelmiin raportointinäkymän käytössä sekä kuukausitilaukseni laajuudessa, joten päätin kokeilla datan visualisointiin jotain toista työkalua, ja päädyin ottamaan datan ulos .csv muodossa ja heittämään sen Google Sheetille.

## Tekoäly apuna datan analysoinnissa

Nyt mulla oli edessäni dataa. Mä tiesin, että kun koskettelen sitä oikeasta paikasta niin se alkaa puhumaan mulle. En vaan ollut ihan varma, että mistä paikasta pitäisi kopeloida ja millä tekniikalla. Toisinsanoen en siis osaa käyttää Google Sheettiä, ja esimerkiksi Pivot taulukon käyttö osoittautui liian haastavaksi. No mikä ratkaisuksi? Tekoäly tietenkin. Annoin datasheeting Claudelle ja pyysin tekemään ensimmäisen analyysin promptilla: "Laskentataulukossa on data myyntimahdollisuuksista kanavittain. En tiedä mikä näistä myyntikanavista toimii parhaiten? Voitko tehdä analyysin minulle" Paljon muuta en sitten tarvinnutkaan. Nykyisin yllättävän usein tekoäly ei tyydy vain kirjoittamaan vastausta tekstillä, vaan kirjaimellisesti lennosta, koodaa sulle interaktiivisen työkalun, joka ratkaisee sun ongelman. Niin kävi tälläkin kertaa. Claude teki mulle interaktiivisen taulukon sekä raportin siitä mitkä kanavat toimivat parhaiten. Ilman sen kummempaa hienosäätöä sain vertailtavaksi mm:

-   Kauppojen määrä yhteensä
-   Voitettujen kauppojen määrä
-   Win Rate (%)
-   Voitetut kaupat (€)
-   Keskiarvo / voitettu (€)
-   Pipeline kokonaisarvo (€)

## Ensihavainnot datasta

Olen tehnyt erilaisiin CRM-järjestelmiin vuosien aikana aika monta raporttinäkymää. Olen myös aika montaa kertaa tehnyt pylväsdiagrammeja Google Sheetillä, jotta saisin kuvattua dataa tavalla, joka mahdollistaisi uusien näkemysten muodostamisen ja oikeiden päätelmien tekemisen. Ja voihan kakka tikun nokassa! Noin vaan mulla oli juuri mun sen hetkiseen tarpeeseen räätälöity interaktiivinen kuvaaja, josta pystyin tarkastelemaan kanavakohtaisesti toteutuneiden kauppoja tilastoja. Olin ällikällä lyöty ja hemmetin innoissani. Ekana mun huomioni keskittyi siihen, että LinkedIn näyttää toimivan hienosti:

-   Eniten myyntimahdollisuuksia kappalemäärällisesti
-   Eniten myyntimahdollisuuksien euroissa mitaten
-   Tarjousten winrate on toiseksi korkein ja voitetun kaupan keskiarvo toiseksi korkein

Seuraavana päivänä palasin täydentämään tätä blogipostausta ja analysoin dataa syvällisemmin ja tein kiinnostavia löydöksiä. Analysoin jokaisen kanavan erikseen. Sain kanavakohtaisesti datasta vaikka kuinka paljon irti ja kirjoitettuani yhden A4 liuskan pelkästä kylmäsoittokanavaan liittyvän datan analysoinnista tekoälyllä, painoin isosti deletee, ja totesin sen sisällön kuuluvan johonkin toiseen blogiin. Joten, keskitytään tässä siihen mitä isoja linjoja data-analyysistä pystyi vetämään.

## LinkedInin ylivoima ja kylmämailien positiiviset trendit

LinkedIn-liidit konvertoituvat kaupaksi yhtä todennäköisesti kuin suorat yhteydenotot tutuilta. Tää kannattaa pitää mielessä. Sen kautta on luotu eniten uusia myyntimahdollisuuksia ja voitettu määrällisesti eniten kauppoja. Keskikauppa on isoin ja Linkkarin kautta tulleiden liidien euromääräinen pipeline on suurin. Voittajasta ei ole epäselvyyksiä. LinkedIn kanavan myyntidata:

-   Total deals 41
-   Won deals 11
-   Winrate (kaikista tarjouksista) 26,8%
-   Winrate (klousatuista tarjouksista) 55,0%
-   Won deals value (€) 110 800€
-   Avg Value / Won (€) 10 073
-   Pipeline total Value (€) 666 600

Pyysin tekoäly vielä laskemaan mahdollisuuksien winraten huomioimalla vain klosatut myyntimahdollisuudet, jonka jälkeen sain todellisen winraten osaksi taulukkoa. Samalla data myös paljasti sen, että myös kylmämaileilla rakennetaan toimivaa pipelinee ja data vihjailee kanavaan liittyvistä positiivisista trendeistä.

## Kylmäsoitto on nimenomaan kylmä

Kylmäsoitto kanavan kautta luotuja mahdollisuuksia on klousattu vähän (klousattuja 2kpl). Dataa on niin vähän, että siihen täytyy suhtautua varauksella. Kanavakohtaisesti kaupan keskikoon tai läpimenoajan suhteen analyysi ei paljastanut mitään muista kanavista poikkeavaa. Ehkä tässä näkyy se, että kohderyhmä on kuitenkin sama kanavasta riippumatta, joten keskikauppaan ja kaupan läpimenoaikaan sillä ei kamalasti ole vaikutusta.

## Muut

Tää on sellanen Dark funnel, jossa valtaosa keisseistä tulee työpöydälle Jannen kautta. Janne ei oo myyjä vaan asiantuntija, joten tässä näkyy selkeesti se, että Janne ei follow-uppaa liidejä ollenkaan niin aktiivisesti kun minä. Sen takia avoinna olevien diilien läpimenoaika on todella pitkä ja voitettujen lyhyt. Jannelta ostetaan mutta jos asiakas ei osta niin kukaan ei aktiivisesti klousaa kauppaa, jonka seurauksena meillä roikkuu myyntiputkessa tarjouksia, jotka ei todennäköisesti koskaan tuu realisoitumaan. Diilien läpimenoaika

-   Voitetut keskimäärin: 7.0 päivää
-   Hävityt keskimäärin: 83.5 päivää

## Alihankintaverkostoa varten paperit kuntoon

Kaupat isoja mutta myyntiprosessi pitäs optimoida näihin. Ratkaisevaa on tässä esimerkiksi tekijöiden portfoliot ja CV:t mihin me ei olla kauheesti panostettu. Tää on ollut meillä todella pienellä priolla ja siksi tässä ei olla onnistuttu.

## Suorat yhteydenotot

Nää yleensä jotain tuttuja tai puolituttuja. Ja näissä kaupat klousaantuu hitaasti, varsinkin, epävarmat kaupat, jotka todennäköisesti hävitään. Syy tähän se, että tuttuja ei haluta painostaa vaan halutaan luottaa siihen, että "kyllä se ilmottaa jos kauppa toteutuu" ja sit näitä ei follow-upata niin ahkerasti. Muuten ihan ok "kanava".

## www-yhteydenottolomake

Tää on kaikista epäselvin kanava. Miksi ei yhteydenottolomakkeen kautta tulleet liidit konvertoidu kaupaksi? Me vastataan kyllä nopeasti ja edetään vauhdilla neuvotteluihin mutta jotenkin nää on toistaiseksi olleet luonteeltaan sellasia et "ei me tehdäkään mitään". Vaatii lisää selvittelyä.

## Johtopäätökset ja pohdintaa

Nyt oon käyttänyt analyysiin yhden kokonaisen työpäivän. Eilen tein pikaista, pintapuolista analyysiä ja nopeita johtopäätöksiä, joita tarkastelin uudestaan tänään, eli seuraavana päivänä. Menin myös vähän syvemmälle kanavakohtaisessa analyysissä. Tässä huomiot mitä koko prosessista jäi päällimmäisenä mieleen: LinkedIn on kanava ylivoimainen ja kannattaisi todellakin harkita, että keskittääkö sinne enemmän panoksia. Tätä puoltaa myös se ajatus, että sosiaalinen media ja siellä tapahtuva brändimielikuvan rakentaminen ja sisältöjen jakaminen ruokkii myös jokaista muuta myyntikanavaa. Meillä on dataa siitä, että kylmämailit toimii paremmin kohderyhmälle, jolle me ollaan somesta tuttuja. Yhden kanavan taktiikkaa kannattaa kuitenkin välttää koska tiedämme, että kohderyhmässä on paljon päättäjiä, joita on helpompi puhutella toisessa kanavassa. Oleellista on saada prosessit niin tehokkaiksi, että vähillä resursseilla voidaan hoitaa usempaa kanavaa. Data-analyysissä tekoäly on todella taitava. Käyttämäni kielimalli oli Claude 3.5 Sonnet, joka on selkeästi kehittynyt viimeisen puolen aikana datan analysoinnissa. Tätä kannattaa hyödyntää ja oma fiilis on, että ihmettelen todella todella paljon, jos CRM järjestelmien raportointinäkymät ja datan analysointitoiminnallisuudet eivät pian kehitä tähän suuntaan, mitä GEN Ai työkalut tarjoavat hyllytavarana kelle vaan 20€/kk tilauksella. Mikki Aalto-Ylevä mikki@goodside.fi 0408698887