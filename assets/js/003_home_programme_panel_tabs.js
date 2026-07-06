// JavaScript extracted from inline <script> block 003 in the 'home' template/context. Related area: programme_panel_tabs.

function csiKeynoteSlide() {
    const fill = document.getElementById('knProgressFill');
    const countdown = document.getElementById('knCountdown');
    const countdownNumber = document.getElementById('knCountdownNumber');
    const countdownName = document.getElementById('knNextName');
    const slides = document.querySelectorAll('.kn-slide');
    const imgs = document.querySelectorAll('[data-slide-img]');
    const navButtons = document.querySelectorAll('[data-keynote-nav]');
    if (!fill || !slides.length) return;
    let current = 0;
    let isAnimating = false;
    let countdownTimer;
    let autoTimer;
    const total = slides.length;
    const duration = 5500;
    const speakerNames = ['Dr Geraldine Fraser-Moleketi', 'Dr Mogamad GamoefEbrajo'];

    function resetProgress() {
        fill.style.transition = 'none';
        fill.style.width = '0%';
        setTimeout(function() {
            fill.style.transition = 'width ' + (duration/1000) + 's linear';
            fill.style.width = '100%';
        }, 50);
    }

    function hideCountdown() {
        clearInterval(countdownTimer);
        countdown.style.display = 'none';
    }

    function startCountdown(nextIndex) {
        hideCountdown();
        countdown.style.display = 'flex';
        countdownName.textContent = speakerNames[nextIndex];
        countdownNumber.textContent = '3';

        let count = 3;
        countdownTimer = setInterval(function() {
            count--;
            if (count > 0) {
                countdownNumber.textContent = count;
            } else {
                clearInterval(countdownTimer);
                countdown.style.display = 'none';
                showSlide(nextIndex, 'next');
            }
        }, 1000);
    }

    function showSlide(nextIndex, direction) {
        if (isAnimating || nextIndex === current) return;
        isAnimating = true;
        const cur = slides[current];
        const next = slides[nextIndex];
        resetProgress();
        imgs.forEach(function(img) {
            img.style.opacity = img.getAttribute('data-slide-img') === String(nextIndex) ? '1' : '0';
        });
        cur.style.transition = 'opacity .3s ease';
        cur.style.opacity = '0';
        setTimeout(function() {
            cur.style.display = 'none';
            cur.classList.remove('kn-slide-active');
            cur.style.transition = '';
            cur.style.opacity = '';
            next.style.display = '';
            next.style.transform = 'none';
            next.style.opacity = '1';
            next.classList.add('kn-slide-active');
            current = nextIndex;
            isAnimating = false;
        }, 320);
    }

    function goNext() {
        showSlide((current + 1) % total, 'next');
    }

    function goPrev() {
        showSlide((current - 1 + total) % total, 'prev');
    }

    function restartAutoTimer() {
        clearInterval(autoTimer);
        autoTimer = setInterval(function() {
            startCountdown((current + 1) % total);
        }, duration + 650);
    }

    slides.forEach(function(slide, index) {
        if (index !== current) slide.style.display = 'none';
    });
    resetProgress();
    navButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            hideCountdown();
            if (button.getAttribute('data-keynote-nav') === 'prev') {
                goPrev();
            } else {
                goNext();
            }
            restartAutoTimer();
        });
    });

    autoTimer = setInterval(function() {
        startCountdown((current + 1) % total);
    }, duration + 650);
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
