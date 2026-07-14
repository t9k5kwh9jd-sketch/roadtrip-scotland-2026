# Roadtrip Scotland 2026

## Version 4.0 – Build 1 Foundation

Dauerhaft gepflegte, installierbare Offline-Reise-App für vier Personen. Dieser Stand ist die technische GitHub-Basis für Sprint 2 und Version 4.0 Final.

## Starten
Die App über einen lokalen Webserver oder GitHub Pages öffnen. Direktes Öffnen per `file://` unterstützt Service Worker nicht vollständig.

## Struktur
```text
index.html
css/                  Designsystem und UI
js/                   Anwendungslogik
js/components/        wiederverwendbare Komponenten
data/                  zentrale Reisedaten
assets/icons/          PWA-Icons
assets/images/         Bilder für Sprint 2
docs/                  Architekturhinweise
service-worker.js      Offline-Cache
manifest.webmanifest   PWA-Konfiguration
CHANGELOG.md           Release-Historie
```

## Entwicklungsregel
GitHub ist ab diesem Build die zentrale Quelle. Neue Builds werden auf diesem Verzeichnis aufgebaut; ZIP-Dateien dienen nur noch als Übergabe oder Release-Archiv.
