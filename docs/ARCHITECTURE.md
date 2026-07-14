# Architektur

## Grundsatz
`index.html` enthält nur die App-Struktur. Darstellung, Logik und Reisedaten werden getrennt gepflegt.

## Verzeichnisse
- `css/`: Designsystem und Oberflächenebenen
- `js/`: Controller, Navigation und lokale Funktionen
- `js/components/`: wiederverwendbare Komponenten für Sprint 2
- `data/`: zentrale, austauschbare Reisedaten
- `assets/images/`: systematisch gepflegte lokale Bilder
- `assets/icons/`: PWA-Symbole
- `docs/`: technische Dokumentation

## Entwicklungsregel
Neue Sehenswürdigkeiten, Restaurants und Charlie-Tipps werden ausschließlich in den zentralen Datenquellen ergänzt. Oberflächenkomponenten lesen diese Daten und werden nicht pro Eintrag kopiert.
