# Chester's Shoe Tree — Planted Problems (for the bit, not for the client)

Update. Again.

Cheat sheet of every intentional issue, numbered to match code comments in
`css/style.css` and `js/script.js`. Use this to decide what to "discover" live.

1. **Comic Sans everywhere** — the entire site's font-family.
2. **Tiled 2003-era diagonal background** on `<body>`.
3. **Clashing neon pink/teal gradient** on the header.
4. **Blinking site title** — CSS animation reviving `<blink>`.
5. **Broken hero image** — `images/hero-shoe.jpg` doesn't exist, so the hero
   background never loads (open devtools Network tab to show the 404).
6. **Z-index soup** — sparkle trail (9999) and chat bubble (500) fight with
   the hero heading; nothing was planned, numbers were just picked at random.
7. **Unreadable 8px fine print** in the footer, low contrast on purpose.
9. **Console spam** on load: a stray `console.log`, `console.warn`, and a
   `console.error` about a function (`getCustomerDiscount`) that was never
   written.
10. **Fake visitor counter** — re-randomizes on every refresh, never persists.
11. **Sale countdown pointed at a past date** (Black Friday 2023) — the
    "limited time sale" has been over for a long time and happily counts
    into negative days/hours/minutes.
12. **Cursor trail of 🩴🩴 (a pair of crocs)** follows the mouse everywhere,
    never asked for.
13. **Newsletter signup** disables its button, says "Subscribing...", throws
    a console error, and never re-enables — subscribing is a lie.
14. ~~**Contact form** always shows "Message sent successfully!" while
    throwing `Uncaught ReferenceError: sendToCRM is not defined` in the
    console — the message goes nowhere.~~ *(the Contact page itself is gone —
    see 47 below)*
15. **Live chat bubble** opens a window that always says "Agent Chester is
    typing..." — nobody is coming.
16. **Search box** always replies "No products found" no matter what you
    type, even an exact product name.
17. **Cart math bug** — prices are concatenated as strings instead of added,
    so two items produce garbage like `$9.9912.99` instead of `$22.98`.
    Great one to demo live: add 2-3 items and read the "total" out loud.
18. **Sort dropdown** on the shop page does nothing except log to console.
19. **Missing favicon** (`images/favicon.ico`) — another quiet 404.
20. **"Blog" nav link** points to `blog.html`, which does not exist — a real,
    live 404 if clicked.
21. **Copyright year stuck at 2011** in every footer.
22. **Star ratings don't match review text** — e.g. a one-star, "would not
    recommend" review displayed with a full 5-star widget.
23. ~~**"Best Viewed In Internet Explorer 6+" badge**, presented with a
    straight face.~~ *(removed from the header across all pages)*
24. **"Under Construction" banner on About**, claiming the page has been
    under construction since 1998 while the rest of the site is "live."
25. **Marquee ticker** (literal `<marquee>` tag) blasting an all-caps sale
    banner at the top of every page.
26. **Autoplaying background audio on Home** — `<audio autoplay loop>` with
    no `controls`, so once a file exists there's no visible way to stop it.
    Points at `audio/welcome-to-chesters.mp3`, which doesn't exist yet —
    drop any file in at that path to "activate" it. Empty `audio/` folder
    is already there waiting.
27. **"Back to Top" button on the new History page** (`history.html`) —
    technically works, just takes a hardcoded 25 seconds to scroll back up
    no matter where on the page you clicked it, crawling the whole way while
    the button helpfully insists "Scrolling to top... please wait...". The
    History page itself is deliberately long and rambling (a full decade-by-
    decade "company history" nobody asked for) so the scroll has plenty of
    distance to be agonizing over, and several more broken images
    (`images/history-*.jpg`) along the way.

28. **Testimonial photos all load fine — they're just not of customers**
    (`testimonials.html`) — all six testimonial photos are real, working
    images (`images/2.png` through `images/7.png`). They're just someone's
    vacation pictures (a family on the beach, a coral reef, a resort at
    dusk, a kid on shoulders, a tiki cocktail) that got uploaded to the
    testimonial slots by mistake, sitting directly under review text that
    has nothing to do with any of it. Presented completely straight-faced.
    (Retired the previous 29–34, which were about broken/frozen loading
    states for these same photo slots — spinner, retry button, missing
    video, frozen progress bar, and dead carousel arrows are all gone now
    that there's a real, if wrong, image in every slot.)

35. **Sandal World page** (`sandal-world.html`) — a whole page themed around
    sandals (beach gradient background, flip-flop marquee ticker, sandal
    emoji decor) built around a "Catch The Sandal" mini-game. The theming
    itself works fine; the game does not, on purpose, in the following ways:
36. **Scoring is inverted** — successfully catching a falling sandal in the
    basket *loses* a point, missing one *gains* a point, while the
    instructions still say "catch sandals to win."
37. **Controls are swapped** — the ← key moves the basket right and the →
    key moves it left.
38. **Sandals fall in erratic teleporting jumps** instead of a smooth,
    consistent descent (random jump size each tick rather than a fixed
    increment).
39. **"Pause" doesn't pause** — it doubles the fall speed instead, and the
    button label never changes, so it still says "Pause" no matter how many
    times you click it.
40. **Timer counts up, not down**, despite being labeled "Time Left." The
    game-over check (`timeLeft <= 0`) is effectively dead code because of
    this, so a round never ends on its own.
41. **High score is stored and compared as a raw string** — multi-digit
    scores compare lexically (`"9" > "10"` is `true` in JS) and "saving" a
    new high score concatenates strings instead of using `Math.max`, so the
    high score routinely turns into nonsense like `"010"`.
42. **Basket hitbox doesn't match its visual position** — a CSS
    `transform: translateX(40px)` shifts the basket after the JS has
    already computed where it thinks the basket is, so catches that look
    dead-on register as misses (and vice versa).
43. **Missing sound effect** — `audio/sandal-flop.mp3` doesn't exist, so
    every catch/miss throws a 404 in the console trying to play it.
44. **Start/Restart never clean up first** — neither button clears the
    previous spawn loop, timer, or leftover sandals on screen, so mashing
    either button stacks multiple accelerating games on top of each other.

45. **"Reviews" nav link** (`index.html`, `history.html`, `shop.html`, `about.html`,
    `contact.html`) no longer scrolls to the on-page reviews section — it now goes
    to `hacked.html`, a fake nation-state ransomware takeover screen (blinking
    glitch text, a fake countdown ransom timer that loops forever instead of
    reaching zero, a fake terminal log "encrypting" testimonials, and demands
    payable in Bitcoin or orthopedic loafers). Entirely cosmetic, no real
    scripts leave the page. Great cold-open swap: click "Reviews" expecting
    star ratings, get "seized" instead.

46. **Illegible body text on About** (`about.html`) — `images/bg.png` (a
    dense, chaotic collage of hundreds of shoes) is tiled directly behind
    the "Our Story" and "Meet The Team" copy with nothing to offset it —
    no card background, no overlay. Fully intentional: the text is not
    supposed to be readable.

47. **Contact page is gone, replaced by "Shoe-bert"** (`contact.html`) — the
    contact form, phone number, and address are gone entirely. The nav item
    (still pointing at `contact.html` on every page) now reads "Shoe-bert"
    and the page is just `images/qbert.png` — Q*bert, in sneakers — with no
    explanation given anywhere on the site.

## Suggested reveal order for a live demo
Open devtools console first (bug 9 hits immediately), then: hero image
(5), countdown (11), add a couple items to cart (17), try the newsletter
(13), try contact form (14), try search (16), click chat (15), click Blog
in the nav (20), scroll to footer for the copyright/fine print (7, 21).
If you've dropped an audio file in, that one starts blasting the instant
the page loads, before you've said a word — good cold open. Save the
History page's Back to Top button (27) for last: scroll all the way down
through the wall of text, hit the button, and just... wait with the client
in real time. The Testimonials page (28) is its own little tour — six customer reviews,
six photos that are very clearly someone's vacation, not a single shoe in
sight. Save Sandal
World (35-44) for a big finish: play the game live, catch a sandal and
watch the score go *down*, then hit Pause and watch everything speed up
instead.
