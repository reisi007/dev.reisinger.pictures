---
domain: technical
topic: search
status: done
---

# Technical Concept: Pagefind Search Integration

## 🛠 SOLL-Zustand (Target State)
Der Blog bietet eine rasend schnelle, lokale Textsuche basierend auf [Pagefind](https://pagefind.app/). 
Die Suche ist als Custom-UI-Komponente nahtlos ins DaisyUI-Design integriert. Wir verwenden **nicht** das vorgefertigte Pagefind-UI, sondern rufen die native JavaScript-API ab.

### Build-Prozess & Indizierung
- Pagefind ist ein Post-Build-Schritt. Der `build`-Befehl in der `package.json` führt zuerst `astro build` aus und jagt danach die Pagefind-CLI über das `dist/` Verzeichnis.
- Pagefind indiziert automatisch alle generierten HTML-Dateien und legt den Suchindex in `dist/pagefind/` ab.

### Frontend Integration (`Search.astro`)
- Die Suchkomponente ist ein natives DaisyUI-Eingabefeld.
- Sobald der Nutzer tippt, wird dynamisch die `/pagefind/pagefind.js` via ES-Module-Import geladen.
- Das Rendern der Ergebnisse geschieht clientseitig und rendert sauberes Tailwind/DaisyUI-HTML direkt in ein absolut positioniertes Dropdown-Feld.
- **Dev-Modus:** Da der Ordner `/pagefind/` im `dev`-Modus ohne vorherigen Build nicht existiert, fängt ein `try-catch`-Block Fehler beim dynamischen Import elegant ab und zeigt dem Nutzer im Such-Dropdown einen entsprechenden Hinweis.
