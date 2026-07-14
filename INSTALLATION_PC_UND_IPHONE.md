# Roadtrip Scotland 2026 – Installation auf GitHub Pages und iPhone

## Teil A – Dateien am Windows-PC vorbereiten

1. Lade die ZIP-Datei `roadtrip-scotland-2026_GitHub_fertig.zip` herunter.
2. Öffne im Windows-Explorer den Ordner `Downloads`.
3. Klicke mit der rechten Maustaste auf die ZIP-Datei.
4. Wähle **Alle extrahieren…**.
5. Klicke auf **Extrahieren**.
6. Öffne den entpackten Ordner `roadtrip-scotland-2026`.

Im Ordner müssen direkt diese Dateien und Ordner sichtbar sein:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `service-worker.js`
- `.nojekyll`
- `icons`
- `README.md`
- `INSTALLATION_PC_UND_IPHONE.md`

Wichtig: Auf GitHub werden die **Inhalte dieses Ordners** hochgeladen, nicht die ZIP-Datei und nicht ein zusätzlicher übergeordneter Ordner.

## Teil B – Dateien in das vorhandene GitHub-Repository hochladen

1. Öffne am PC `https://github.com` und melde dich an.
2. Öffne dein Repository `roadtrip-scotland-2026`.
3. Klicke auf den blauen Link **uploading an existing file**. Falls dieser Link nicht mehr sichtbar ist: **Add file** → **Upload files**.
4. Öffne im Windows-Explorer den entpackten Ordner `roadtrip-scotland-2026`.
5. Drücke `Strg + A`, damit alle Dateien und der Ordner `icons` markiert sind.
6. Ziehe die gesamte Markierung in das große Upload-Feld von GitHub.
7. Warte, bis alle Dateien vollständig hochgeladen sind. Prüfe insbesondere, dass `index.html`, `app.js`, `styles.css`, `manifest.webmanifest`, `service-worker.js` und der Ordner `icons` erscheinen.
8. Scrolle nach unten.
9. Bei der Commit-Nachricht kannst du `Roadtrip Scotland 2026 veröffentlichen` eintragen.
10. Klicke auf **Commit changes**.

## Teil C – GitHub Pages einschalten

1. Öffne im Repository oben **Settings**.
2. Klicke links auf **Pages**.
3. Unter **Build and deployment** wählst du bei **Source**: `Deploy from a branch`.
4. Bei **Branch** wählst du `main`.
5. Beim Ordner wählst du `/ (root)`.
6. Klicke auf **Save**.
7. Warte einige Minuten und aktualisiere die Seite.
8. Sobald oben die veröffentlichte Adresse erscheint, klicke auf **Visit site**.

Die Adresse hat normalerweise dieses Muster:

`https://DEIN-GITHUB-NAME.github.io/roadtrip-scotland-2026/`

## Teil D – Funktionstest am PC

Öffne die veröffentlichte Adresse in Chrome oder Edge und prüfe:

- Die Startseite erscheint im dunklen Highland-Design.
- Die Navigation zu Reise, Karte, Fotografie, Essen, Tickets, Unterkünfte, Packliste und Budget funktioniert.
- Ein Reisetag lässt sich aufklappen.
- Suchfelder reagieren.
- Packlisten-Häkchen bleiben nach einem Neuladen erhalten.
- Im Budget kann eine Zahl geändert werden und die Summe aktualisiert sich.

Erst wenn dieser Test funktioniert, die App auf dem iPhone installieren.

## Teil E – Als App auf dem iPhone installieren

1. Öffne die veröffentlichte GitHub-Pages-Adresse auf dem iPhone ausdrücklich in **Safari**.
2. Warte, bis die App vollständig geladen ist.
3. Tippe unten in Safari auf das **Teilen-Symbol** (Quadrat mit Pfeil nach oben).
4. Scrolle nach unten und tippe auf **Zum Home-Bildschirm**.
5. Falls angezeigt, aktiviere **Als Web-App öffnen**.
6. Prüfe den Namen `Roadtrip Scotland 2026` und tippe auf **Hinzufügen**.
7. Starte die App danach über das neue Symbol auf dem Home-Bildschirm.
8. Öffne nacheinander die wichtigsten Bereiche einmal bei bestehender Internetverbindung. Dadurch werden die App-Dateien im Offline-Cache gespeichert.

## Teil F – Offline-Test

1. Schließe die App vollständig.
2. Aktiviere auf dem iPhone den Flugmodus.
3. Öffne `Roadtrip Scotland 2026` über das Symbol auf dem Home-Bildschirm.
4. Prüfe Reise, Karte, Fotografie, Essen, Tickets, Unterkünfte, Packliste und Budget.

Die eingebetteten Reisedaten funktionieren offline. Externe Google-Maps-Navigation benötigt dagegen Internet oder zuvor heruntergeladene Offline-Karten in der Karten-App.

## Wenn etwas nicht funktioniert

### GitHub zeigt eine 404-Seite
- Prüfe unter **Settings → Pages**, ob `main` und `/ (root)` gewählt sind.
- Prüfe, ob `index.html` direkt im Hauptverzeichnis des Repositorys liegt.
- Warte nach Änderungen einige Minuten und lade die Seite neu.

### Die App zeigt eine alte Version
- Öffne die GitHub-Pages-Seite einmal in Safari und lade sie neu.
- Entferne notfalls das alte Home-Bildschirm-Symbol und füge die Seite erneut hinzu.
- Bei zukünftigen App-Updates muss die Cache-Version in `service-worker.js` erhöht werden.

### Offline funktioniert noch nicht
- Die App muss nach der Veröffentlichung mindestens einmal vollständig online geöffnet worden sein.
- Öffne sie einmal über Safari und einmal über das Home-Bildschirm-Symbol, bevor du den Flugmodus testest.

### „Zum Home-Bildschirm“ fehlt
- Scrolle in der Teilen-Liste ganz nach unten.
- Tippe auf **Aktionen bearbeiten** und füge **Zum Home-Bildschirm** hinzu.
