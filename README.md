# Atua TCG

A kid-friendly card explorer for **Atua TCG**, a trading card game that pairs the atua (gods) of Māori stories with strengths-based ideas about neurodiversity. It is designed for primary to intermediate children, so it leans on icons, colour and short plain-English sentences rather than long text.

## Features

- **Atua cards (19):** gods, ancestor, unity and mana cards, each with a *gift*, a *way to help* and a *challenge* (Ngā Pūmanawa, Te Manaakitanga, Ngā Werohanga).
- **Helper Cards (45):** Accommodation, Affirmation and Task cards across three collections: Genetic, Epigenetic and Environmental.
- **Filtering:** two tabs on the Cards page, each with its own filters.
  - *Atua:* card type, trait, element, rarity.
  - *Helper Cards:* kind, where it comes from, condition.
  - Search and sorting work on both tabs, and each tab shows a live match count.
- **Card detail modal:** abilities, accommodations, Māori perspective, sources and related cards, with previous/next navigation.
- **Cross-links:** Atua cards link to matching helper cards, and helper cards link back to their Atua.
- **Pages:** Home, Cards, Game Rules, About.
- **Mobile-first:** bottom tab bar, collapsible filters, large touch targets.
- **Language toggle (EN / MI):** translates navigation and interface labels only (see [Cultural care](#cultural-care)).

## Running it

1. Go to https://lucasmckinney.github.io/AtuaTCG or
2. Download then open `index.html` in a modern browser, or
3. Host it on Vercel, Netlify, etc.

## How the file is organised

Inside the HTML file, in order:

| Section | What it holds |
| --- | --- |
| `<style>` | Design tokens and all styling |
| SVG sprite | Every icon (elements, traits, card kinds, origins, UI) |
| Markup | Four views (Home, Cards, Rules, About), plus the card modal |
| Script 1 | Atua card data, elements, traits, translations, helper card data, embedded art |
| Script 2 | Hash router, filtering, rendering, modal logic |

Routes are hash-based: `#/`, `#/cards`, `#/rules`, `#/about`. Card details open in a modal rather than a separate page, so filters and scroll position are kept.

## Adding or editing cards

**Atua cards** are entries in the `CARDS` array. Each needs `id`, `number`, `supertype` (`atua`, `tupuna`, `kotahi` or `mana`), `name`, `epithet`, `elements`, `mana`, `rarity`, `art`, and three `abilities` of kinds `gift`, `help` and `challenge`. Signature cards also carry a `trait`, `accommodations`, `story` and `gameTip`.

**Helper cards** are rows passed to `_mk(origin, rows)`:

```js
[condition, kind, code, conditionLabel, title, text, extra]
// kind: "a" (accommodation) | "f" (affirmation) | "t" (task)
```

For Environmental cards, leave `title` empty and add the condition's cause and "adapted from" note in `ENV_META`. References live in `SUPPORT_REFS`.

**Card art:** illustrated cards embed a base64 WebP in the `IMAGES` object. Cards without art use a symbolic SVG generated from their element.

## Cultural care

Correct te reo Māori, including macrons.

- Te reo names, macrons and card text for the Helper Cards.
- Core terms (Pūmanawa, Kōwhai, Pō, Tāwhirimātea and others) were checked against published sources.
- **Translation is deliberately limited.** The language toggle only covers short interface labels. Full sentences are left in English until reviewed.
- Atua are living figures in Māori spirituality. Cards without illustration use abstract, symbolic art rather than generated depictions of the atua.

## Design notes for kids

- Icon first, label second, on every filter.
- Condition causes (for example, prenatal exposures) are kept out of the card tiles and shown only in a "For grown-ups" section of the detail view.
- Respects `prefers-reduced-motion` and uses visible focus outlines.

## Roadmap ideas

- Read-aloud button and a dyslexia-friendly reading mode
- Saved favourites ("My Collection")
- Pronunciation helper for te reo names
- Symbols for each helper-card condition
- Define how helper cards are used in play (for example, attaching to a compatible Atua)
- A simple playable mode

## Credits

- **Card art:** Tāwhirimātea, Hine-moana and Mahuika illustrations by Māori Mermaid. Artwork remains the property of its artist.
- **Further reading on Māori mythology:** [Te Ara, the Encyclopedia of New Zealand](https://teara.govt.nz)
- **Support organisations linked in the app:** [ADHD New Zealand](https://www.adhd.org.nz), [Autism New Zealand](https://www.autismnz.org.nz), [Dyslexia Foundation of New Zealand](https://dfnz.org.nz)
