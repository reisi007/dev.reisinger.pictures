---
domain: technical
topic: search
status: done
---

# Technical Concept: Pagefind Search Integration

## 🛠 SOLL-Zustand (Target State)
Der Blog bietet eine rasend schnelle, lokale Textsuche basierend auf [Pagefind](https://pagefind.app/). 
Die Suche öffnet sich als modales Fenster (DaisyUI) global aus dem Header heraus.

### Build-Prozess & Indizierung
- Pagefind ist ein Post-Build-Schritt. Der `build`-Befehl in der `package.json` führt zuerst `astro build` aus und jagt danach die Pagefind-CLI über das `dist/` Verzeichnis.
- Pagefind indiziert automatisch alle generierten HTML-Dateien und legt den Suchindex sowie die UI-Assets in `dist/pagefind/` ab.

### Frontend Integration (`Search.astro`)
- Die Suchkomponente bindet die Dateien `/pagefind/pagefind-ui.css` und `/pagefind/pagefind-ui.js` dynamisch ein.
- **Wichtig für Dev-Modus:** Da der Ordner `/pagefind/` im `dev`-Modus ohne vorherigen Build nicht existiert, wird ein `try-catch` Mechanismus im Skript verwendet, um 404-Fehler im Dev-Server elegant abzufangen, ohne dass die Konsole überflutet wird. Die Suche funktioniert logischerweise erst nach einem einmaligen `pnpm run build`.
