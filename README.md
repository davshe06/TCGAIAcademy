# AI Fluency Academy

A gamified training app that teaches a digital staffing sales team how AI has changed marketing
and creative work, so they can hold informed conversations with clients and candidates.

## Running it

No build step, no dependencies. Open `index.html` in a browser, or serve the folder statically:

```bash
python3 -m http.server 8000
```

It also works on GitHub Pages or any static host.

## What's in it

- **Ten briefings**, each ending in a five-question quiz: The Big Shift (vocabulary and the AI
  Fluency Ladder), UX and Product Design (Figma Make, Figma AI), Creative and Brand Design (Adobe
  Firefly and Creative Cloud), Marketing Automation (HubSpot, Salesforce, Adobe, Klaviyo, Braze),
  Front-End Development (Claude Code, Codex, Cursor), AEO and AI Search, Copywriting and Content,
  Learning and Instructional Design, Client Conversations (the STACK intake), and Candidate
  Conversations (Show, Tell, Trade-off).
- **Arcade**: Call Simulator (six branching role-plays), Signal Check (strong signal or dig
  deeper?), Tool Sort (timed tool-to-discipline matching), Jargon Decoder (flip cards), and a
  15-question Certification Exam.
- **Field Kit**: per-discipline client questions, candidate questions, signals, tools and
  objection handlers, with copy buttons. Meant to be opened before a call.
- **Progress**: XP, seven ranks, ten badges, a day streak and a certificate. Saved in the
  browser's `localStorage`; there is no shared leaderboard or backend.

## Keeping content current

All content is in `data.js` and was reviewed in **November 2026**. AI product names and
availability change quickly, so review it each quarter and update `CONTENT_DATE`.

- `MODULES`: briefing cards, tools, titles, questions, signals and quizzes. In each quiz
  question the **first option is the correct one**; the app shuffles them.
- `SCENARIOS`: Call Simulator role-plays. Each turn lists the best, acceptable and poor reply,
  in that order, with feedback.
- `SIGNALS`, `JARGON`, `OBJECTIONS`, `RANKS`, `BADGES`: the remaining game content.
- If a tool fits two disciplines, add it to `SORT_ALSO` in `app.js` so Tool Sort never offers
  the second one as a wrong answer.

`app.js` is the render engine and game logic; `styles.css` holds the light and dark themes.
