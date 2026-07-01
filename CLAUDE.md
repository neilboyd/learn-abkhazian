# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Jekyll static site (using the [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) theme) that teaches
Abkhazian. Lessons are published in three languages — English, Russian, and Turkish — each a parallel translation of
the same course.

## Commands

Setup (first time / after theme updates):
```bash
git submodule init && git submodule update   # assets/lib = chirpy-static-assets theme submodule
bundle install
npm install
```

Run the site locally:
```bash
bundle exec jekyll serve
```
Site is served at `http://localhost:4000`.

Run Cypress end-to-end tests (site must be running, see above):
```bash
npm run cy:open   # interactive runner — does NOT work in a VM/devcontainer, host machine only
npm run cy:run     # headless run, works everywhere including CI
```
To run a single spec headlessly: `npx cypress run --spec cypress/e2e/3-lesson-en.cy.js`.

CI (`.github/workflows/cypress.yml`) runs on every PR: checks out submodules, installs Ruby/npm, starts
`jekyll serve --detach`, then runs the full Cypress suite against `localhost:4000`.

There is a `.devcontainer/devcontainer.json` for VS Code Dev Containers (Ruby 3.3.4, Jekyll image + Cypress feature).

## Architecture

**Content is duplicated per language, not templated from a single source.** Each language has its own Jekyll
collection with its own set of lesson files:
- `_en/` — English (`les1.html` … `les22.html`, `answers1.html` … `answers7.html`, `additional.html`,
  `ab-en.md`/`en-ab.md` dictionaries, `index.html` table of contents)
- `_ru/` — Russian, same file naming scheme
- `_tr/` — Turkish, same file naming scheme

When adding or fixing a lesson, check whether the same content/bug exists in the other two language collections —
they are independent copies, not generated from each other.

Collections are declared in `_config.yml` (`collections:` + matching `defaults:` blocks), which sets each
collection's `permalink` (`/en/:title`, `/ru/:title`, `/tr/:title`), `layout: lesson`, and `lang`.

**Lesson pages** (`_layouts/lesson.html`) render front matter (`title`, `subtitle`, `order`, optional `wip` for
work-in-progress) and `{{ content }}`, plus a GitHub "edit this page" link and Disqus comments (configured under
`comments:` in `_config.yml`).

**Audio**: every pronounced word/phrase in a lesson is wrapped with `{% include audio.html file="<id>" %}`, which
renders a speaker icon that plays `<site.audiourl>/<id>.wav` on click (see `_includes/audio.html` and
`assets/js/audio.js`, loaded per-page by the `lesson` layout). `site.audiourl` (in `_config.yml`) points at a
separately hosted audio CDN — audio files are not stored in this repo. File IDs follow `<lesson>-<number>` (e.g.
`1-001`, `1-102`).

**Dictionaries**: `ab-en.md`/`en-ab.md` (and the `ru`/`tr` equivalents) are flat Markdown word lists, one entry per
line, in the format `abkhazian_word translation. Example sentence. Translation.` — not tied to individual lessons.

**Search** uses Jekyll's built-in JSON search index (`_layouts/search-json.json`) loaded via
`_includes/search-loader.html`; Cypress tests exercise it directly (e.g. searching for "bookshop" and checking
result content), so dictionary/lesson wording changes can break search assertions.

**Localization of UI strings** (not lesson content) lives in `_data/locales/{en,ru-RU,tr-TR}.yml`, consumed via
`site.data.locales[lang]` in layouts/includes — this is theme chrome (buttons, labels), separate from the lesson
content translations in `_en`/`_ru`/`_tr`.

**`_plugins/posts-lastmod-hook.rb`** sets `last_modified_at` on blog posts (`_posts/`) by reading git history —
requires a real git checkout (not a shallow/worktree-only file) to compute correctly.

## Testing conventions

Cypress specs in `cypress/e2e/` are numbered by page type and mirror the three languages, e.g.
`3-lesson-en.cy.js` / `3-lesson-ru.cy.js` / `3-lesson-tr.cy.js` each test the same behavior (title, lesson
navigation, TOC link, search, comments) against the language-specific pages. When changing shared behavior (nav,
search, layout), verify or update the spec for all three languages, not just one.
