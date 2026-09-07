# Predict Then Verify

A single-file, offline trainer for **reading** code — not writing it. You get a snippet, you predict what it outputs **before** you run it, then you verify. Wrong predictions are the point: they show you exactly where your mental model of the language is broken.

![screenshot](docs/screenshot.png)

**Open `index.html` in a browser. That's the whole install.** No build step, no server, no account, no data leaving your machine.

---

## Motivation

Most learning platforms teach you to write code from a blank file. Real work is the opposite: you open somebody else's repository, and 90% of the job is figuring out what the existing code already does — before you dare touch it.

I was hitting that wall daily. I could follow tutorials fine, but a real diff from a real codebase still looked like noise. Courses did not help, because they kept handing me empty editors instead of other people's code.

So I built the drill I actually needed. One snippet a day. Predict the output out loud, in writing, with a number or a string — no hedging. Then run it. The gap between your prediction and reality is the only thing worth studying, and it is invisible unless you commit to a guess first.

The spaced-repetition deck exists for the same reason: forgetting is the default state, so the concepts you got wrong come back on a schedule until they stop being surprising.

---

## Quick start

1. Download or clone this repository.
2. Open `index.html` in any modern browser (double-click it).
3. Start with **Today** → answer the recall cards → read the snippet → write your prediction → reveal.

That is it. Your progress lives in your browser's `localStorage`. Nothing is uploaded anywhere.

> **Back up your progress.** Clearing browser data wipes it. Use **Settings → Export progress** to save a JSON file, and **Import progress** to restore it (also handy for moving between machines).

---

## Usage

**Grading without any AI (default).** After you submit an answer, the app compares it with the answer key by keyword overlap and always shows you the full key. The machine only counts words — you make the final call. This is deliberate: self-assessment against a visible key is how flashcard systems have always worked, and it keeps the app free and fully offline.

**Grading with a model (optional).** Paste your own Anthropic API key in **Settings**. Then answers are graded by a model, and two extra features come alive: the **Mentor** chat (asks you guiding questions without spoiling the answer) and the **Interview simulator**. The key is stored only in your browser's `localStorage` and is sent only to the provider's API. Never commit it anywhere.

**Language.** Full PL/EN toggle for the interface in **Settings**. Note: the bundled lesson content is currently Polish — an English content pack is in progress.

**What is inside**

| Tab | What it does |
|---|---|
| Today | The daily loop: recall cards → snippet → prediction → reveal → quiz |
| Map | Phases, concept map, bosses at the end of each phase |
| Course | Companion drills tied to chapters of an external course you are taking |
| Career | Role readiness scoring against a weighted role model you can edit |
| Roles | A readiness ladder: what to prove before applying for each level |
| Intel | A reading/watching queue |
| Lab | Sandbox to run JS in-page, trace tables, mentor chat, interview sim |

**Bring your own content.** Encounters live in plain JSON (`encounters`, `checkpoints`, `bosses`). Each item carries the snippet, the verified output, a quiz and a spaced-repetition card. Add your own and the app will serve them.

---

## Contributing

```bash
git clone https://github.com/<you>/predict-then-verify.git
cd predict-then-verify
# no dependencies, no build — just open index.html
# optional local server (some browsers restrict file:// for certain features):
node _serve.js   # then open http://127.0.0.1:8777/
```

Everything is one self-contained `index.html`: styles, logic and the bundled content. There is no bundler on purpose — you should be able to read the whole app the same way it teaches you to read everything else.

Issues and pull requests are welcome, especially: English lesson content, new encounter formats, and translations.

## License

MIT — see [LICENSE](LICENSE).
