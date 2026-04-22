---
domain: blog
topic: archive
status: done
---

# Feature: Blog-Archiv (Jahr, Monat, Tag)

## 🛠 SOLL-Zustand (Target State)
Das Blog-Archiv ermöglicht das chronologische Filtern von Beiträgen anhand ihres Veröffentlichungsdatums (`pubDate`).

### Routing & Views (SSG)
- **Hauptübersicht (`/archiv/`)**: Listet alle Jahre auf, in denen Beiträge verfasst wurden, idealerweise gruppiert.
- **Dynamisches Datums-Routing (`/archiv/[...slug]/`)**:
  - `/archiv/YYYY/`: Alle Beiträge eines spezifischen Jahres.
  - `/archiv/YYYY/MM/`: Alle Beiträge eines Jahres und Monats.
  - `/archiv/YYYY/MM/DD/`: Alle Beiträge eines exakten Tages.

## 💻 Technical Decisions (Maker Notes)
- Verwendet Astros Rest-Parameter (`[...slug].astro`) zusammen mit `getStaticPaths`, um alle möglichen Kombinationen aus den `pubDate`-Daten der MDX-Dateien zur Build-Zeit zu berechnen.
- Monate und Tage werden zur sauberen URL-Struktur (und Sortierbarkeit) mit `padStart(2, '0')` formatiert (z.B. `05` statt `5`).
