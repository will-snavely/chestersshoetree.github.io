// Chester's Shoe Tree — site script
// (BUG references match BUGS.md)

// BUG 9: console noise a curious client might open devtools and find
console.log('loading chester shoe tree v0.9-FINAL-final2-USE_THIS_ONE.js');
console.warn('TODO: hook up real payment processor, currently fake');
console.error('Uncaught: getCustomerDiscount is not defined');

// BUG 10: fake visitor counter, re-randomizes every single page load
(function renderVisitorCounter() {
  const el = document.querySelector('[data-visitor-counter]');
  if (!el) return;
  const fakeCount = Math.floor(Math.random() * 999999);
  el.textContent = String(fakeCount).padStart(6, '0');
})();

// BUG 11: countdown timer pointed at a date in the past, so the "limited time sale"
// has actually been over for a long time, and the timer happily shows negative numbers.
(function saleCountdown() {
  const el = document.querySelector('[data-countdown]');
  if (!el) return;
  const saleEndsAt = new Date('2023-11-24T00:00:00').getTime(); // Black Friday 2023, oops

  function tick() {
    const diff = saleEndsAt - Date.now();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    el.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
  }
  tick();
  setInterval(tick, 1000);
})();

// BUG 12: glitter/sparkle cursor trail, because it's still 2004 somewhere
(function sparkleTrail() {
  const sparkles = ['✨', '⭐', '💫'];
  let last = 0;
  document.addEventListener('mousemove', function (e) {
    const now = Date.now();
    if (now - last < 60) return; // throttle a little, still too much
    last = now;
    const span = document.createElement('span');
    span.className = 'floating-sparkle';
    span.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    span.style.left = e.clientX + 'px';
    span.style.top = e.clientY + 'px';
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 800);
  });
})();

// BUG 13: newsletter signup that spins forever and never actually completes
function subscribeNewsletter(event) {
  event.preventDefault();
  const btn = event.target.querySelector('button');
  const original = btn.textContent;
  btn.textContent = 'Subscribing...';
  btn.disabled = true;
  console.error('Uncaught TypeError: mailingList.push is not a function');
  // intentionally never resolves / never restores the button
  return false;
}

// BUG 14: contact form "succeeds" with an alert while actually throwing in console
function submitContactForm(event) {
  event.preventDefault();
  alert('Thank you! Your message has been sent successfully.');
  console.error('Uncaught ReferenceError: sendToCRM is not defined');
  // form data goes precisely nowhere
  return false;
}

// BUG 15: live chat bubble that "connects" and never responds, forever
function toggleChat() {
  const win = document.querySelector('[data-chat-window]');
  if (!win) return;
  win.classList.toggle('open');
}

// BUG 16: search box always confidently returns the wrong answer
function fakeSearch(event) {
  event.preventDefault();
  const input = event.target.querySelector('input[type="search"]');
  const box = document.querySelector('[data-search-results]');
  if (box) {
    box.textContent = `No products found matching "${input.value}".`;
  }
  return false;
}

// BUG 17: cart math bug — prices are read as strings and "added" with +,
// so the total is string concatenation, not a sum. $9.99 + $12.99 = "9.9912.99".
let cartItemsHTML = '';
function addToCart(name, price) {
  cartItemsHTML += `<div>${name} - $${price}</div>`;
  const list = document.querySelector('[data-cart-items]');
  const totalEl = document.querySelector('[data-cart-total]');
  if (list) list.innerHTML = cartItemsHTML;

  if (totalEl) {
    let total = totalEl.getAttribute('data-running-total') || '0';
    total = total + price; // BUG: string concatenation instead of addition
    totalEl.setAttribute('data-running-total', total);
    totalEl.textContent = '$' + total;
  }
}

// BUG 18: sort dropdown on the shop page is wired up... to do absolutely nothing
function sortProducts() {
  console.log('sortProducts() called, but nobody ever implemented it');
}

// BUG 27: "Back to Top" button on the History page technically works,
// it just takes a punishingly long time no matter how far down the page you are.
// A fixed 25-second crawl, because someone implemented this with a hardcoded
// duration instead of, say, scrollTo({ behavior: 'smooth' }).
function backToTopSlowly() {
  const btn = document.getElementById('back-to-top-btn');
  const startY = window.scrollY;
  const startTime = performance.now();
  const duration = 25000; // 25 excruciating seconds, every single time

  if (btn) {
    btn.disabled = true;
    btn.textContent = '⬆ Scrolling to top... please wait...';
  }

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY * (1 - progress));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else if (btn) {
      btn.disabled = false;
      btn.textContent = '⬆ Back to Top';
    }
  }
  requestAnimationFrame(step);
}

