# Unit Test Report – Angular Example

**Projekti:** angular-example (LAB)
**Tekijä:** Jari Tuomoja
**Repo:** https://github.com/vonhara/angular.example.git

## Mitä testattiin
Ajettiin yksikkötestit sekä Angularin omille komponenteille että omalle self-made palvelulle `SignalAnalyzerService`.

### Komponentit
- AppComponent – kaikki ok?
- HomeComponent – toimiiko?
- FeedbackComponent – toimiiko?
- PagenotfoundComponent – toimiiko?

### Oma palvelu: SignalAnalyzerService
Omat metodit:
- **normalize()** – muuttaa arvot välille 0–1
- **movingAverage()** – laskee liukuvan keskiarvon
- **detectSpikes()** – etsii poikkeavat arvot 2σ-rajalla
- **correlation()** – tarkistaa kahden signaalin välisen korrelaation
- **classifyStability()** – arvioi onko data "stable", "unstable" vai "no-data"

Mukana on myös testit virheellisille arvoille ja tyhjille listoille.

## Miksi testattiin
Tarkoitus oli varmistaa, että omat metodit toimii kuten pitää.  

Raja-arvot, virheenkäsittely ja laskentalogiikka. Tuotantologiikkaa. 

## Tulokset
Testejä = 15 kpl
Ajoin ne komennolla: ng test (terminaalissa)

Kaikki meni läpi (ok)  
Säätöä tuli `detectSpikes`-metodin kanssa: alkuperäinen 3σ-raja oli liian tiukka ja pienen datan kanssa piikki ei mennyt läpi. Vaihdoin sen 2σ:aan, jolloin logiikka toimii ja testi antaa toistettavan tuloksen.

## Yhteenveto
- Kaikki toimii.  
- Kaikki komponentit ja oma palveluluokka läpäisevät testit.  
- Testit kattaa normaalit tapaukset, virhetilanteet ja muutaman rajatapauksen.  
- Tämä setti täyttää tehtävänannon ja antaa selkeän kuvan siitä, että metodit toimii.
- Koodi aina lontooksi ja hyvä käytäntönä kaikille, koska se on yleinen työkieli ja ei tule skandien kanssa ongelmia.

## Työkalut ja paketit
- phpStorm 2025.2.3
- Chrome 141.0.7390.108
- Angular CLI: 18.2.20
  Node: 22.17.0
  Package Manager: npm 10.9.2
  OS: win32 x64

Angular: 18.2.13
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1802.20
@angular-devkit/build-angular   18.2.20
@angular-devkit/core            18.2.20
@angular-devkit/schematics      18.2.20
@angular/cdk                    18.2.14
@angular/cli                    18.2.20
@angular/material               18.2.14
@schematics/angular             18.2.20
rxjs                            7.8.2
typescript                      5.5.4
zone.js                         0.14.10
