# 🤖 AI Agent Guidelines: dev.reisinger.pictures

**CRITICAL ROLE:** Behandle den Benutzer bei allen Antworten und technischen Entscheidungen vom Fachwissen her wie einen Senior Architekten. Die direkte Anrede "Senior Architekt" ist jedoch untersagt.

## 1. AI Workflow & TODO Management
* **Planning Phase:** Always start your response with a clear "**Planungsphase**" and review `Agents.todo.md`.
* **Language Policy:** Code, Architektur & Docs: English. UI/Frontend & Konversation: Deutsch.
* **Documentation (SOLL-ZUSTAND REQUIRED):** The single source of truth for all technical concepts is the `docs/domains/` or `docs/tech/` directory. BEFORE implementing any new logic, the target state (Soll-Zustand) MUST be thoroughly documented in a corresponding Markdown file.
* **Task & Test Tracking:** Every feature requires actionable TODOs in `Agents.todo.md`. You MUST explicitly include TODOs for writing test cases (wo anwendbar).

## 2. Architektur: Doc-as-Code & Standard Astro
* **Code:** Wir nutzen die klassische Astro-Struktur (`src/components/`, `src/layouts/`, `src/pages/`).
* **Tech-Stack:** Astro (SSG), Tailwind 4 via Vite-Plugin, DaisyUI, Iconify.
* **Inhalt:** MDX in Page-Bundles (Ordner pro Beitrag). Normale, statische Einzelseiten (wie "Über mich" oder "Impressum") MÜSSEN zwingend über die `simple` Content Collection angelegt werden, statt sie als `.astro`-Dateien in `src/pages/` zu programmieren.

## 3. AI Operating Rules (STRICT)
* **CSS & Styling (STRICT):** Styling via `<style>`-Tags in `.astro` Dateien ist streng verboten! Jegliches CSS MUSS zentral in `src/styles/global.css` definiert werden. Dort gilt weiterhin: Manuelles Schreiben von reinen CSS-Eigenschaften ist verboten. Nutze zwingend Tailwinds `@apply`-Direktive (z.B. `@apply mt-2 text-red-500;`). Die einzige Ausnahme ist die Deklaration von nativen CSS-Variablen (z.B. für Theming).
* **ESLint & TypeScript:** The use of `eslint-disable`, `@ts-ignore`, or `any` is **strictly forbidden**. All typing issues must be resolved structurally using exact interfaces, `unknown`, or generic type constraints.
* **Testing Execution Output:** Whenever you create or modify tests, you MUST output the exact command to run them in a separate code block at the end of your response.
* **Test Debugging Transparency:** When analyzing test failure reports, you must explicitly document your debugging progress and thought process in the "Planungsphase" before proposing a fix. Explain what failed, why it failed, and how the fix addresses the root cause.
* **Patching & File Modification (CRITICAL):**
  * Multi-line Regex for search-and-replace in code is STRICTLY FORBIDDEN. It is too brittle.
  * Base64 output for file content is STRICTLY FORBIDDEN.
  * **Safe Patching Policy:** Alle `.mjs` Scripts zur Dateimanipulation MÜSSEN den Erfolg einer Ersetzung validieren. Prüfe zwingend mit `.includes()` oder `.indexOf()`, ob der Zielstring existiert, *bevor* du `.replace()` aufrufst. Prüfe danach, ob sich der `content` tatsächlich verändert hat. Brich mit einer klaren `console.error` ab, falls der Patch ins Leere läuft. Blinde `.replace()` Aufrufe sind untersagt! 
  * **Fallback:** Wenn die teilweise Ersetzung fehlschlägt, MUSS das Skript als Fallback die gesamte Datei überschreiben, um fehlerhafte Zustände zu vermeiden.
* **Astro SSG Root-Routing Ausnahme (CRITICAL):** Entgegen der offiziellen Astro-Dokumentation, die `undefined` für den Root-Pfad bei Rest-Parametern vorsieht, benötigt dieses spezifische Projekt-Setup zwingend den String `"/"`, damit die `index.html` für die Startseite im Build korrekt generiert wird. Bei dynamischen Routen wie `[...lang]/[...slug].astro` muss für leere Slugs (die Root-Startseite) daher immer `slug: "/"` übergeben werden. Die Verwendung von `undefined` für leere Slugs ist untersagt.

* **Single Patch Script Policy (CRITICAL):** Liefere immer ein einziges, großes Node-Skript (z.B. `patch.mjs`), das alle notwendigen Dateiänderungen projektweit gebündelt durchführt, anstatt mehrere kleine Skripte zu splitten.

## 4. AI Agent Roles & Responsibilities
The system and workflow are managed via three strictly separated agent roles:
* **Planner:** Analyzes the problem, designs the architecture/solution, documents the requirements in the `docs/` folder, and creates tasks in `Agents.todo.md`.
* **Maker:** Reads the planning and strictly implements the changes in code (e.g., generates `.mjs` scripts). The Maker must **never** independently remove items from `Agents.todo.md`. Also update the documents in the `docs/` folder and add tasks in `Agents.todo.md` as needed.
* **Checker:** Verifies the Maker's changes against the Definition of Done (DoD) and runs tests. Only when all tests pass and the quality is met is the Checker allowed to close and remove the corresponding TODOs in `Agents.todo.md`.
* **Testing Execution Rule (STRICT):** Führe Tests (z.B. Playwright) nie direkt auf, sondern nutze zwingend definierte Runner-Scripte (wie `node ai_test_runner.mjs`), falls vorhanden, um sicherzustellen, dass Fehler-Reports für die Analyse generiert werden.

## 5. Repomix & Kommunikation
* Die Repository-Kontext-Zusammenfassung erfolgt über `repomix.config.ts`.
* Der Output wird in `repomix-dev.md` geschrieben.
* Tools wie `repomix` dürfen nur als Dev-Dependencies (`-D`) installiert werden.
