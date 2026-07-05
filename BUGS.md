# Chester's Shoe Tree — Planted Problems (for the bit, not for the client)

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
8. **`alert("DEBUG: remove this before we go live!!")`** fires on every page
   load — the classic forgotten debug statement.
9. **Console spam** on load: a stray `console.log`, `console.warn`, and a
   `console.error` about a function (`getCustomerDiscount`) that was never
   written.
10. **Fake visitor counter** — re-randomizes on every refresh, never persists.
11. **Sale countdown pointed at a past date** (Black Friday 2023) — the
    "limited time sale" has been over for a long time and happily counts
    into negative days/hours/minutes.
12. **Glitter/sparkle cursor trail** follows the mouse everywhere, unrelated
    to a shoe store, never asked for.
13. **Newsletter signup** disables its button, says "Subscribing...", throws
    a console error, and never re-enables — subscribing is a lie.
14. **Contact form** always shows "Message sent successfully!" while
    throwing `Uncaught ReferenceError: sendToCRM is not defined` in the
    console — the message goes nowhere.
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
23. **"Best Viewed In Internet Explorer 6+" badge**, presented with a
    straight face.
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

28. **Broken testimonial photo** on the new Testimonials page
    (`testimonials.html`) — plain 404'd `<img>`, plus its little "Verified"
    badge icon is *also* a broken image, so the verification badge fails to
    verify itself.
29. **Infinite loading spinner** on a second testimonial — a CSS spinner
    with a "Loading photo…" label that spins forever because no JS was ever
    written to replace it with anything.
30. *(see 29 — spinner is pure CSS, `.spinner` in style.css, nothing ever
    stops it)*
31. **Fake "Retry" button** on a third testimonial — click it, it spins for
    1.5 seconds to look busy, then fails again with the exact same 404,
    forever. `retryLoad()` in script.js.
32. **"Video testimonial"** with both the poster image and the video file
    itself pointing at paths that don't exist (`images/testimonials/harold-
    poster.jpg`, `videos/harold-testimonial.mp4`) — a testimonial you are
    explicitly told to go watch and structurally cannot.
33. **Frozen fake progress bar** stuck at "Loading image… 37%" — hardcoded
    CSS width, no JS drives it, so it will sit at 37% until the heat death
    of the universe.
34. **Broken photo carousel** on the last testimonial — the prev arrow
    throws `Uncaught ReferenceError: slideEl is not defined` in the console,
    the next arrow runs with no error but was wired to update an element
    that isn't on the page, so the visible photo never changes no matter
    how many times you click either arrow.

## Suggested reveal order for a live demo
Open devtools console first (bugs 8, 9 hit immediately), then: hero image
(5), countdown (11), add a couple items to cart (17), try the newsletter
(13), try contact form (14), try search (16), click chat (15), click Blog
in the nav (20), scroll to footer for the copyright/fine print (7, 21).
If you've dropped an audio file in, that one starts blasting the instant
the page loads, before you've said a word — good cold open. Save the
History page's Back to Top button (27) for last: scroll all the way down
through the wall of text, hit the button, and just... wait with the client
in real time. The Testimonials page (28-34) is its own little tour — six
customer photos, six different ways to fail to show a photo.
