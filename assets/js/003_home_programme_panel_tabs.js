// JavaScript extracted from inline <script> block 003 in the 'home' template/context. Related area: programme_panel_tabs.

function csiKeynoteSlide() {
    var fill = document.getElementById('knProgressFill');
    var nextLabel = document.getElementById('knNextLabel');
    var timerEl = document.getElementById('knTimer');
    var slides = document.querySelectorAll('.kn-slide');
    var imgs = document.querySelectorAll('[data-slide-img]');
    var navButtons = document.querySelectorAll('[data-keynote-nav]');
    if (!fill || !slides.length) return;
    var slideNames = ['Dr Geraldine Fraser-Moleketi', 'Dr Mogamad GamoefEbrajo'];
    var tickTimer;
    var secondsLeft = 6;
    var current = 0;
    var animating = false;
    var timer;
    var total = slides.length;
    var interval = 6000;

    function stopTick() { clearInterval(tickTimer); }

    function startTick() {
        secondsLeft = Math.round(interval / 1000);
        if (timerEl) timerEl.textContent = secondsLeft + 's';
        stopTick();
        tickTimer = setInterval(function() {
            secondsLeft--;
            if (secondsLeft < 0) secondsLeft = 0;
            if (timerEl) timerEl.textContent = secondsLeft + 's';
        }, 1000);
    }

    function showSlide(index) {
        if (animating || index === current) return;
        animating = true;
        var prev = current;
        current = index;
        var curEl = slides[prev];
        var nextEl = slides[current];
        if (nextLabel) nextLabel.textContent = slideNames[(current + 1) % total];
        var counter = document.getElementById('knCounter');
        if (counter) counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
        imgs.forEach(function(img) {
            img.style.opacity = img.getAttribute('data-slide-img') === String(current) ? '1' : '0';
        });
        curEl.style.transition = 'opacity .3s ease';
        curEl.style.opacity = '0';
        fill.style.transition = 'none';
        fill.style.width = '0%';
        setTimeout(function() {
            fill.style.transition = 'width ' + (interval/1000) + 's linear';
            fill.style.width = '100%';
        }, 20);
        setTimeout(function() {
            curEl.style.display = 'none';
            curEl.classList.remove('kn-slide-active');
            nextEl.style.display = '';
            nextEl.style.opacity = '1';
            nextEl.style.transform = 'none';
            nextEl.classList.add('kn-slide-active');
            animating = false;
            startTick();
        }, 320);
    }

    if (nextLabel) nextLabel.textContent = slideNames[1];
    var counterInit = document.getElementById('knCounter');
    if (counterInit) counterInit.textContent = '01 / ' + String(total).padStart(2, '0');
    imgs.forEach(function(img) {
        img.style.opacity = img.getAttribute('data-slide-img') === String(current) ? '1' : '0';
    });
    slides.forEach(function(s, i) {
        if (i !== current) s.style.display = 'none';
    });
    setTimeout(function() {
        fill.style.transition = 'width ' + (interval/1000) + 's linear';
        fill.style.width = '100%';
    }, 50);
    navButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            clearInterval(timer);
            var dir = btn.getAttribute('data-keynote-nav');
            var next = dir === 'prev' ? (current - 1 + total) % total : (current + 1) % total;
            showSlide(next);
            timer = setInterval(function() {
                showSlide((current + 1) % total);
            }, interval);
        });
    });
    timer = setInterval(function() {
        showSlide((current + 1) % total);
    }, interval);
}
document.addEventListener('DOMContentLoaded', csiKeynoteSlide);

function csiWebinarComingSoonPopup() {
    let popup = document.querySelector('[data-webinar-popup]');

    if (!popup) {
        popup = document.createElement('div');
        popup.setAttribute('data-webinar-popup', '');
        popup.innerHTML = '<div class="csi-webinar-popup-card" role="dialog" aria-modal="true" aria-labelledby="csiWebinarPopupTitle"><button class="csi-webinar-popup-close" type="button" aria-label="Close webinar popup">×</button><span>Coming soon</span><h3 id="csiWebinarPopupTitle"></h3><p>This webinar page is being prepared. Full details will be added once the final client content is supplied.</p></div>';
        document.body.appendChild(popup);

        popup.addEventListener('click', function(event) {
            if (event.target === popup || event.target.closest('.csi-webinar-popup-close')) {
                popup.classList.remove('is-open');
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') popup.classList.remove('is-open');
        });
    }

    document.querySelectorAll('[data-webinar-coming-soon]').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const title = link.getAttribute('data-webinar-coming-soon') || 'Webinar details';
            popup.querySelector('#csiWebinarPopupTitle').textContent = title;
            popup.classList.add('is-open');
        });
    });
}
document.addEventListener('DOMContentLoaded', csiWebinarComingSoonPopup);

function csiSmoothBackToTop() {
  const start = window.pageYOffset || document.documentElement.scrollTop || 0;
  const duration = Math.min(1100, Math.max(620, start * 0.45));
  const startTime = performance.now();
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  function step(now) {
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, Math.round(start * (1 - easeOutCubic(progress))));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
function showCsiProProgrammePanel(button, panelName) {
  const section = button.closest('.csi-pro-programme');
  if (!section) return;
  section.querySelectorAll('.csi-pro-tab').forEach(tab => tab.classList.remove('active'));
  button.classList.add('active');
  section.querySelectorAll('.csi-pro-panel').forEach(panel => panel.classList.remove('active'));
  const nextPanel = section.querySelector('[data-csi-pro-panel="' + panelName + '"]');
  if (nextPanel) nextPanel.classList.add('active');
}
function filterCsiProRooms(button, roomName) {
  const panel = button.closest('.csi-pro-panel');
  if (!panel) return;
  panel.querySelectorAll('.csi-room-filter').forEach(filter => filter.classList.remove('active'));
  button.classList.add('active');
  panel.querySelectorAll('.csi-pro-row[data-room]').forEach(row => {
    row.classList.toggle('is-hidden', roomName !== 'all' && row.dataset.room !== roomName);
  });
}
function filterCsiProRoom(button, roomName) {
  filterCsiProRooms(button, roomName);
}

(function startCsiAwardsCountdown() {
  const countdown = document.querySelector('[data-csi-awards-countdown]');
  if (!countdown) return;

  const dayEl = countdown.querySelector('[data-countdown-days]');
  const hourEl = countdown.querySelector('[data-countdown-hours]');
  const minuteEl = countdown.querySelector('[data-countdown-minutes]');
  const secondEl = countdown.querySelector('[data-countdown-seconds]');
  const baseTarget = new Date('2026-07-14T09:00:00+02:00').getTime();
  const loopWindow = 7 * 24 * 60 * 60 * 1000;
  const pad = value => String(value).padStart(2, '0');

  function getLoopedTarget(now) {
    if (now < baseTarget) return baseTarget;
    return baseTarget + Math.ceil((now - baseTarget + 1) / loopWindow) * loopWindow;
  }

  function updateCountdown() {
    const now = Date.now();
    const target = getLoopedTarget(now);
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diff % (60 * 1000)) / 1000);

    if (dayEl) dayEl.textContent = pad(days);
    if (hourEl) hourEl.textContent = pad(hours);
    if (minuteEl) minuteEl.textContent = pad(minutes);
    if (secondEl) secondEl.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
