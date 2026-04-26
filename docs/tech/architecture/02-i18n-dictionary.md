---
domain: technical
topic: i18n
status: done
---

# Technical Concept: Strict UI Dictionary (i18n)

## 🛠 SOLL-Zustand (Target State)
Um die Zweisprachigkeit konsistent zu halten, gilt im gesamten Projekt ein striktes Verbot für Hardcoded-UI-Strings in den `.astro` Dateien. 

1. **Keine Ternaries für Übersetzungen:** Konstrukte wie `lang === 'de' ? 'Hallo' : 'Hello'` sind im Astro-Frontmatter oder JSX-Bereich strengstens untersagt.
2. **Nutzung von `useTranslations`:** Jede UI-Komponente und jede Page MUSS die Übersetzungs-Funktion `t()` aus `src/i18n/ui.ts` verwenden.
3. **Vanilla JS Anbindung:** Skripte, die clientseitig laufen (z.B. die Suchfunktion in `Search.astro`), müssen ihre übersetzten Strings über `data-t-*` Attribute vom gerenderten Astro-HTML-Container übergeben bekommen. JS darf keine eigenen UI-Texte deklarieren.
4. **Pluralisierung:** Für Strings mit Variablen (z.B. Anzahl von Beiträgen) wird das Token `{count}` im Dictionary verwendet und via `.replace('{count}', wert)` im Code ersetzt.
