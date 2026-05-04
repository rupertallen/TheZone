# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start local dev server (Vite)
npm run build      # production build (outputs to dist/)
npm run deploy     # build then publish to GitHub Pages (gh-pages -d dist)
```

There are no lint, format, or test commands configured.

## Architecture

**The Zone** is a React 19 + TypeScript single-page educational app for school children (Years 5–8), deployed to GitHub Pages at `/TheZone/`.

### Navigation model

There is no router. `App.tsx` owns a single `activeScreen: Screen` state (a union string literal defined in `types.ts`) and renders the appropriate component via a `switch` block. All navigation is callback-based: child components receive `onGoHome`, `onGoBack`, and similar props. The `Screen` union must be extended in `types.ts` whenever a new top-level screen is added.

`currentYear` and `currentTerm` (also in `App.tsx`) are persisted to `localStorage` and passed to every screen that needs them. All data filtering against year/term happens in-component.

### Four top-level sections

| Section | Entry Screen | Internal navigation |
|---|---|---|
| Learning | `MenuScreen` → `ListSelectionScreen` / `SingleLanguageListSelectionScreen` → game | via `App.tsx` `activeScreen` state |
| Poetry | `PoetryScreen` | local state |
| Chess | `ChessScreen` | local `mode` state; renders sub-components from `components/chess/` |
| Maths | `MathsScreen` | local `activeActivity` state; renders sub-components from `components/maths/` |

### Data layer

All content is static TypeScript in `data/`. Each file exports a named array of typed list objects:

- `WORD_LISTS` (`WordList[]`) – bilingual word pairs (French vocabulary, etc.)
- `DEFINITION_LISTS` (`DefinitionList[]`) – term/meaning pairs
- `CASE_LISTS` (`CaseList[]`) – Latin noun declension tables
- `VERB_LISTS` (`VerbList[]`) – Latin verb conjugation entries
- `ENGLISH_WORD_LISTS` (`SingleWordList[]`) – English spelling words (used by Listen & Spell)
- `HISTORY_LISTS` (`HistoryList[]`) – dated historical events

Every list object carries `year: AcademicYear` and `term: AcademicTerm` fields. Components filter by both to determine what content to show and whether game buttons should be enabled.

### Game components and the `WordPair` normalisation pattern

`WordMatchGame` accepts an `AnyList` (the union of all list types). Because `GameBoard` only understands `WordPair[]`, the game normalises DefinitionLists and CaseLists into `WordPair[]` objects inside `processList()` before passing them down. This pattern is the only place cross-list-type conversion happens.

`SpellingGame`, `VerbGame`, and `SingleLanguageSpellingGame` all share the same `AnswerStatus` type (`'default' | 'correct' | 'incorrect' | 'showing-answer'`) and the same two-attempt scoring logic (first-attempt correct = score; second-attempt correct = correction), each duplicated in-component.

### Shared UI primitives

`ProgressBar` and `ScoreScreen` are reused across all game components. `WordButton` is used only by `GameBoard`. `SpellingInput` is shared by `SpellingGame`, `VerbGame`, and `SingleLanguageSpellingGame`.

### Environment

`vite.config.ts` exposes `GEMINI_API_KEY` from `.env` as `process.env.GEMINI_API_KEY`, but no component currently consumes it.

`@/*` is aliased to the repo root, so imports can use either `../` relative paths or `@/` absolute paths.
