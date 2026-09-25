# Inner Circle with Alex: landing page

A single landing page for Alex Vislosky's new paid mentorship and consulting offer. It sits in the middle of his lineup. Members do BRRRR and rental investing themselves, and Alex advises on their deals. It is not a community membership and it is not done-for-you.

Plain HTML, CSS, and JS. No build step.

## Run it

```bash
cd inner-circle-site
python3 -m http.server 8765
# open http://localhost:8765
```

Opening `index.html` straight from the file system also works. A local server just matches production.

## Files

| File | What it is |
|---|---|
| `index.html` | The page. The placeholder config sits at the bottom |
| `styles.css` | All styles. Brand tokens are at the top in `:root` |
| `script.js` | Placeholder filling, reveal on scroll, sticky mobile CTA, FAQ, 75% calculator |
| `CONTENT.md` | Every fact on the page with its source tag |
| `images/` | Web assets taken from the research pack (see the image notes below) |

## Placeholder swap list

Everything is set in one place: the `window.INNER_CIRCLE` block near the bottom of `index.html`. Fill in a value and it replaces every chip on the page. Leave it empty and the orange `[PLACEHOLDER]` chip stays visible, so nothing ships half done without anyone noticing.

| Key | Status | Where it shows |
|---|---|---|
| `PROGRAM_NAME` | **Assumed:** Inner Circle with Alex (alt: Deal Desk Inner Circle). Default text is already in the HTML | Header, hero, spectrum, offer card, sticky bar, footer, page title |
| `PROGRAM_DURATION` | one year | Offer card, FAQ |
| `APPLICATION_URL` | https://www.lvrgd.co/book. **Primary CTA** | Every Apply button. When empty, buttons scroll to the offer section |
| `CALL_CADENCE` | three times a week | What you get, offer card, FAQ |
| `MESSAGING_SLA` | replies within 30 minutes | What you get, offer card, FAQ |
| `SEAT_COUNT` | Optional. Only use it if the cap is real | Offer card line, hidden until filled |
| `VSL_URL` | Unknown. Hero video (YouTube, Vimeo or Wistia link) | Hero VSL. When empty, the play button goes to `APPLICATION_URL`. Poster image is `images/vsl-poster.jpg` |

Button labels still say "Apply for the Inner Circle". If the name changes, search `index.html` for "the Inner Circle" and update those labels too.

## Side doors (kept quiet on purpose)

The free Portfolio Lab and Deal Engine DFY only appear in these places:
- the "Where this sits" spectrum
- the "Not for you if" list
- a small "Other ways to work with us" row under the offer
- the FAQ and the footer

None of them is pitched as the product. Every primary button points to `APPLICATION_URL`.

## What's on the page, in order

1. Hero: headline, the application CTA, and the Alex cutout with a "deal on the desk" checklist card
2. Problem: six numbered "sound familiar" cards
3. Origin: the Alex and Antonio still, the story in Alex's voice, and a sourced timeline
4. Proof strip: four soft claims, each with its source
5. What you get: the four-lane "where this sits" spectrum, six advisory pillars, a "not included" strip, and four steps
6. For and not for
7. The work: three cases (origin, a working 75% calculator, operator lens), a ledger of Skool post titles, and a Shorts strip
8. Offer card with the process guarantee, plus the side doors
9. FAQ (10 questions, including free vs paid vs DFY vs Inner Circle)
10. Final CTA
11. Footer with the required risk line

## Image notes

- `alex-cutout.png` was keyed out of the blue YouTube avatar (`01`) so it sits on the brand green. The original is kept as `alex-headshot.jpg` for the OG image.
- `alex-antonio.jpg` is cropped from the Skool About screenshot (`07`). The play button and 2:15 timestamp are part of the capture, so the page shows it as a video still that links to the Skool About page.
- `short-*.jpg` are the 9:16 center of the letterboxed YouTube Shorts thumbnails (`09` to `17`).
- **Pack issue:** `12-yt-hired-assistant-at-22.jpg` and `13-yt-fire-yourself-from-portfolio.jpg` are byte-identical. The page uses that image once, for "I hired an assistant at 22." The "fire yourself" video has no thumbnail on the page. Swap one in if you get the real one.
- The DFY testimonial stills (Andy, Nick) are not used. The FAQ mentions them only as DFY stories.
- Video links are built from the IDs in the thumbnail URLs in `IMAGE-MANIFEST.md`.

## Before publishing

- [ ] Fill in the `window.INNER_CIRCLE` values
- [ ] Get Alex to confirm the 75% calculator matches how he teaches it (it's labeled as a simplified example)
- [ ] Get Alex to confirm the Skool post titles in the ledger are fine to quote
- [ ] Check that no orange `[PLACEHOLDER]` chips are left on the page
