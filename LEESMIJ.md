# Glow Cupping – website

## Foto's toevoegen
Zet je foto's in de map `images` met de namen uit `images/FOTOS-HIER.txt`.
Staat een foto er nog niet, dan toont de site een nette crèmekleurige plaats.

## Online zetten met GitHub Pages
1. Maak een gratis account op github.com en een nieuwe repository, bv. `glowcupping`.
2. Upload alle bestanden uit deze map (ook `CNAME` en de map `images`).
3. Ga naar **Settings → Pages**. Kies bij *Source*: "Deploy from a branch", branch `main`, map `/ (root)`. Opslaan.
4. Het bestand `CNAME` bevat al `glowcupping.be`.

## Domein koppelen (bij je registrar, bv. Strato of Theory7)
Voeg in de DNS-instellingen deze records toe:

| Type  | Naam | Waarde                     |
|-------|------|----------------------------|
| A     | @    | 185.199.108.153            |
| A     | @    | 185.199.109.153            |
| A     | @    | 185.199.110.153            |
| A     | @    | 185.199.111.153            |
| CNAME | www  | JOUWGEBRUIKERSNAAM.github.io |

Wacht tot het werkt (enkele minuten tot een paar uur) en vink daarna in
**Settings → Pages** "Enforce HTTPS" aan.

## Nog in te vullen
In `voorwaarden.html` en `privacy.html` staan gele stukjes [Vul in …]
voor annuleringsbeleid, betaling en bewaartermijn.
