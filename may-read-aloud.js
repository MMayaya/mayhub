(function (global) {
  'use strict';

  if (global.MayReadAloud) return;

  const state = {
    controller: null,
    currentSlide: 1,
    generation: 0,
    panelOpen: false,
    paused: false,
    player: null,
    queue: [],
    speaking: false,
    ui: null
  };

  const ignoredInterfaceText = new Set([
    'close', 'contents', 'fullscreen', 'help', 'menu', 'mute', 'next',
    'pause', 'play', 'previous', 'replay', 'resume', 'settings', 'stop',
    'unmute', 'volume'
  ]);

  function injectStyles() {
    if (document.getElementById('may-read-aloud-styles')) return;
    const style = document.createElement('style');
    style.id = 'may-read-aloud-styles';
    style.textContent = `
      .may-read-aloud-root,
      .may-read-aloud-root * { box-sizing: border-box; }
      .may-read-aloud-root {
        --may-reader-blue: #0b4f8a;
        --may-reader-deep: #062f57;
        --may-reader-gold: #d5aa38;
        position: fixed;
        top: max(12px, env(safe-area-inset-top));
        right: max(12px, env(safe-area-inset-right));
        z-index: 2147483000;
        color: #102a43;
        font-family: "Segoe UI", Arial, sans-serif;
        line-height: 1.35;
      }
      .may-read-aloud-launcher {
        display: inline-flex;
        min-height: 42px;
        padding: 8px 13px;
        float: right;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(255,255,255,.56);
        border-radius: 999px;
        color: #fff;
        background: linear-gradient(135deg, var(--may-reader-deep), var(--may-reader-blue));
        box-shadow: 0 10px 28px rgba(1, 24, 49, .28);
        font: inherit;
        font-size: 13px;
        font-weight: 800;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      .may-read-aloud-launcher:hover { filter: brightness(1.08); }
      .may-read-aloud-launcher:focus-visible,
      .may-reader-control:focus-visible,
      .may-reader-rate:focus-visible,
      .may-reader-close:focus-visible {
        outline: 3px solid rgba(252, 211, 77, .9);
        outline-offset: 2px;
      }
      .may-read-aloud-launcher svg { width: 19px; height: 19px; fill: currentColor; }
      .may-reader-panel {
        display: none;
        width: min(340px, calc(100vw - 24px));
        margin-top: 52px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.72);
        border-radius: 18px;
        background: rgba(255,255,255,.98);
        box-shadow: 0 24px 60px rgba(2, 30, 57, .32);
        backdrop-filter: blur(16px);
      }
      .may-reader-panel.open { display: block; animation: mayReaderIn 170ms ease-out; }
      @keyframes mayReaderIn {
        from { opacity: 0; transform: translateY(-8px) scale(.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .may-reader-header {
        display: flex;
        padding: 14px 14px 12px;
        align-items: center;
        gap: 10px;
        color: #fff;
        background: linear-gradient(125deg, #062f57, #0d5d9d 72%, #1d75b6);
      }
      .may-reader-header-mark {
        display: grid;
        width: 36px;
        height: 36px;
        flex: 0 0 36px;
        place-items: center;
        border: 1px solid rgba(255,255,255,.38);
        border-radius: 11px;
        color: #fff4c7;
        background: rgba(255,255,255,.1);
      }
      .may-reader-header-mark svg { width: 20px; height: 20px; fill: currentColor; }
      .may-reader-heading { min-width: 0; flex: 1; }
      .may-reader-heading strong { display: block; font-size: 15px; letter-spacing: .01em; }
      .may-reader-heading span { display: block; margin-top: 1px; color: #d9ecfb; font-size: 10.5px; font-weight: 650; }
      .may-reader-close {
        display: grid;
        width: 34px;
        height: 34px;
        padding: 0;
        place-items: center;
        border: 0;
        border-radius: 10px;
        color: #fff;
        background: rgba(255,255,255,.1);
        font: inherit;
        font-size: 21px;
        cursor: pointer;
      }
      .may-reader-body { padding: 15px; }
      .may-reader-slide-card {
        display: flex;
        padding: 11px 12px;
        align-items: center;
        gap: 10px;
        border: 1px solid #d8e7f3;
        border-radius: 13px;
        background: linear-gradient(145deg, #f8fcff, #eef6fc);
      }
      .may-reader-slide-number {
        min-width: 70px;
        color: var(--may-reader-blue);
        font-size: 13px;
        font-weight: 850;
      }
      .may-reader-slide-summary {
        min-width: 0;
        color: #52697e;
        font-size: 11.5px;
        font-weight: 650;
      }
      .may-reader-status {
        min-height: 35px;
        padding: 10px 2px 4px;
        color: #41586d;
        font-size: 11.5px;
      }
      .may-reader-status[data-tone="warning"] { color: #8a4b12; }
      .may-reader-status[data-tone="active"] { color: #075c4c; font-weight: 750; }
      .may-reader-controls {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 7px;
        margin-top: 8px;
      }
      .may-reader-control {
        display: inline-flex;
        min-height: 42px;
        padding: 8px 12px;
        align-items: center;
        justify-content: center;
        gap: 7px;
        border: 1px solid #cadbea;
        border-radius: 12px;
        color: #173b5c;
        background: #f7fbfe;
        font: inherit;
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
      }
      .may-reader-control svg { width: 17px; height: 17px; fill: currentColor; }
      .may-reader-control.primary {
        border-color: #0b4f8a;
        color: #fff;
        background: linear-gradient(135deg, #073963, #0c67aa);
      }
      .may-reader-control:disabled { opacity: .45; cursor: not-allowed; }
      .may-reader-speed-row {
        display: flex;
        margin-top: 12px;
        padding-top: 11px;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border-top: 1px solid #e4edf4;
        color: #52697e;
        font-size: 11.5px;
        font-weight: 750;
      }
      .may-reader-rate {
        min-height: 34px;
        padding: 5px 28px 5px 9px;
        border: 1px solid #cadbea;
        border-radius: 9px;
        color: #173b5c;
        background: #fff;
        font: inherit;
        font-size: 11.5px;
        font-weight: 750;
      }
      .may-reader-note { margin-top: 8px; color: #738495; font-size: 9.8px; text-align: center; }
      @media (max-width: 520px) {
        .may-read-aloud-root {
          top: auto;
          right: max(10px, env(safe-area-inset-right));
          bottom: max(10px, env(safe-area-inset-bottom));
        }
        .may-reader-panel {
          position: absolute;
          right: 0;
          bottom: 52px;
          margin-top: 0;
          border-radius: 17px;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .may-reader-panel.open { animation: none; }
      }
    `;
    document.head.appendChild(style);
  }

  function createIcon(path) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"></path></svg>`;
  }

  function createUi() {
    if (state.ui || !document.body) return state.ui;
    injectStyles();

    const root = document.createElement('div');
    root.className = 'may-read-aloud-root';
    root.innerHTML = `
      <button class="may-read-aloud-launcher" type="button" aria-expanded="false" aria-controls="mayReaderPanel">
        ${createIcon('M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12zm-2.5-8.24v2.06a7 7 0 0 1 0 12.36v2.06A9 9 0 0 0 14 3.76z')}
        <span>Read aloud</span>
      </button>
      <section class="may-reader-panel" id="mayReaderPanel" aria-label="Read Aloud controls">
        <header class="may-reader-header">
          <span class="may-reader-header-mark">${createIcon('M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12z')}</span>
          <span class="may-reader-heading"><strong>Read Aloud</strong><span>Grade 11 Geography · Term 3</span></span>
          <button class="may-reader-close" type="button" aria-label="Close Read Aloud">×</button>
        </header>
        <div class="may-reader-body">
          <div class="may-reader-slide-card">
            <span class="may-reader-slide-number">Slide 1</span>
            <span class="may-reader-slide-summary">Checking visible text…</span>
          </div>
          <div class="may-reader-status" role="status" aria-live="polite">Read the visible words on the current slide.</div>
          <div class="may-reader-controls">
            <button class="may-reader-control primary may-reader-play" type="button">
              ${createIcon('M8 5v14l11-7z')}<span>Read slide</span>
            </button>
            <button class="may-reader-control may-reader-pause" type="button" aria-label="Pause reading" disabled>
              ${createIcon('M6 5h4v14H6zm8 0h4v14h-4z')}
            </button>
            <button class="may-reader-control may-reader-stop" type="button" aria-label="Stop reading" disabled>
              ${createIcon('M6 6h12v12H6z')}
            </button>
          </div>
          <label class="may-reader-speed-row">
            <span>Reading speed</span>
            <select class="may-reader-rate" aria-label="Reading speed">
              <option value="0.8">Slower</option>
              <option value="1" selected>Normal</option>
              <option value="1.2">Faster</option>
            </select>
          </label>
          <p class="may-reader-note">Reads visible text. Text inside pictures may not be available.</p>
        </div>
      </section>`;

    document.body.appendChild(root);
    const ui = {
      root,
      launcher: root.querySelector('.may-read-aloud-launcher'),
      panel: root.querySelector('.may-reader-panel'),
      close: root.querySelector('.may-reader-close'),
      slideNumber: root.querySelector('.may-reader-slide-number'),
      slideSummary: root.querySelector('.may-reader-slide-summary'),
      status: root.querySelector('.may-reader-status'),
      play: root.querySelector('.may-reader-play'),
      playLabel: root.querySelector('.may-reader-play span'),
      pause: root.querySelector('.may-reader-pause'),
      stop: root.querySelector('.may-reader-stop'),
      rate: root.querySelector('.may-reader-rate')
    };

    try {
      const savedRate = localStorage.getItem('mayReadAloudRate');
      if (savedRate && [...ui.rate.options].some(option => option.value === savedRate)) ui.rate.value = savedRate;
    } catch (_) {}

    ui.launcher.addEventListener('click', () => setPanelOpen(!state.panelOpen));
    ui.close.addEventListener('click', () => setPanelOpen(false));
    ui.play.addEventListener('click', readCurrentSlide);
    ui.pause.addEventListener('click', togglePause);
    ui.stop.addEventListener('click', () => stopReading('Reading stopped.'));
    ui.rate.addEventListener('change', () => {
      try { localStorage.setItem('mayReadAloudRate', ui.rate.value); } catch (_) {}
      if (state.speaking) readCurrentSlide();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && state.panelOpen) setPanelOpen(false);
    });

    state.ui = ui;
    if (!supportsSpeech()) {
      ui.play.disabled = true;
      setStatus('Read Aloud is not available in this browser.', 'warning');
    }
    updateSlideDetails();
    return ui;
  }

  function setPanelOpen(open) {
    const ui = createUi();
    if (!ui) return;
    state.panelOpen = Boolean(open);
    ui.panel.classList.toggle('open', state.panelOpen);
    ui.launcher.setAttribute('aria-expanded', String(state.panelOpen));
    if (state.panelOpen) {
      updateSlideDetails(180);
      ui.close.focus({ preventScroll: true });
    } else {
      ui.launcher.focus({ preventScroll: true });
    }
  }

  function supportsSpeech() {
    return 'speechSynthesis' in global && 'SpeechSynthesisUtterance' in global;
  }

  function isVisible(element) {
    if (!element || element.closest('.may-read-aloud-root,[aria-hidden="true"]')) return false;
    const style = global.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 0.5
      && rect.height > 0.5
      && rect.bottom > 0
      && rect.right > 0
      && rect.top < global.innerHeight
      && rect.left < global.innerWidth;
  }

  function cleanFragment(value) {
    return String(value || '')
      .replace(/\u00a0/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function usableFragment(value) {
    const text = cleanFragment(value);
    if (!text || ignoredInterfaceText.has(text.toLowerCase())) return '';
    if (/^\d+\s*(?:\/|of)\s*\d+$/i.test(text)) return '';
    if (/^(?:slide|page)\s+\d+$/i.test(text)) return '';
    return text;
  }

  function extractVisibleSlideText() {
    const playerView = document.getElementById('playerView') || document.getElementById('content');
    if (!playerView) return '';

    const candidates = [...playerView.querySelectorAll('span[id^="txt"], [data-width]')]
      .filter(isVisible)
      .map(element => ({
        text: usableFragment(element.innerText || element.textContent),
        rect: element.getBoundingClientRect()
      }))
      .filter(item => item.text)
      .sort((left, right) => {
        const rowDifference = left.rect.top - right.rect.top;
        return Math.abs(rowDifference) > 5 ? rowDifference : left.rect.left - right.rect.left;
      });

    const fragments = [];
    const seen = new Set();
    let previousTop = null;
    for (const item of candidates) {
      const key = item.text.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      const newLine = previousTop !== null && Math.abs(item.rect.top - previousTop) > Math.max(14, item.rect.height * 0.7);
      fragments.push({ text: item.text, newLine });
      previousTop = item.rect.top;
    }

    let text = '';
    fragments.forEach((fragment, index) => {
      if (index > 0) text += fragment.newLine ? '. ' : ' ';
      text += fragment.text;
    });

    if (!text) {
      const meaningfulAlt = [...playerView.querySelectorAll('img[alt]')]
        .filter(isVisible)
        .map(image => usableFragment(image.alt))
        .find(alt => alt.length > 12 && !/(png|jpe?g|download|icon|logo|background|image)/i.test(alt));
      if (meaningfulAlt) text = `Image description. ${meaningfulAlt}`;
    }

    return text
      .replace(/\s+([,.;:!?])/g, '$1')
      .replace(/([.!?])(?:\.\s*)+/g, '$1 ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function getCurrentSlideNumber() {
    try {
      if (state.controller && typeof state.controller.currentSlideIndex === 'function') {
        const index = Number(state.controller.currentSlideIndex());
        if (Number.isFinite(index)) return index + 1;
      }
    } catch (_) {}
    return state.currentSlide || 1;
  }

  function setStatus(message, tone) {
    const ui = createUi();
    if (!ui) return;
    ui.status.textContent = message;
    if (tone) ui.status.dataset.tone = tone;
    else delete ui.status.dataset.tone;
  }

  function updateSlideDetails(delay) {
    const applyUpdate = () => {
      const ui = createUi();
      if (!ui) return;
      state.currentSlide = getCurrentSlideNumber();
      const text = extractVisibleSlideText();
      const wordCount = text ? wordsIn(text) : 0;
      ui.slideNumber.textContent = `Slide ${state.currentSlide}`;
      ui.slideSummary.textContent = wordCount
        ? `${wordCount} visible word${wordCount === 1 ? '' : 's'} ready`
        : 'No readable text detected yet';
    };
    if (delay) global.setTimeout(applyUpdate, delay);
    else applyUpdate();
  }

  function wordsIn(text) {
    return String(text || '').trim().split(/\s+/).filter(Boolean).length;
  }

  function splitForSpeech(text) {
    const sentences = String(text || '').match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    const chunks = [];
    sentences.forEach(sentence => {
      const clean = cleanFragment(sentence);
      if (!clean) return;
      if (clean.length <= 240) {
        chunks.push(clean);
        return;
      }
      const words = clean.split(' ');
      let chunk = '';
      words.forEach(word => {
        if (chunk && `${chunk} ${word}`.length > 220) {
          chunks.push(chunk);
          chunk = word;
        } else {
          chunk = chunk ? `${chunk} ${word}` : word;
        }
      });
      if (chunk) chunks.push(chunk);
    });
    return chunks;
  }

  function preferredVoice() {
    const voices = global.speechSynthesis.getVoices ? global.speechSynthesis.getVoices() : [];
    return voices.find(voice => /^en-ZA$/i.test(voice.lang))
      || voices.find(voice => /^en-GB$/i.test(voice.lang))
      || voices.find(voice => /^en/i.test(voice.lang))
      || null;
  }

  function updateControlState() {
    if (!state.ui) return;
    state.ui.pause.disabled = !state.speaking;
    state.ui.stop.disabled = !state.speaking;
    state.ui.playLabel.textContent = state.speaking ? 'Restart slide' : 'Read slide';
    state.ui.pause.setAttribute('aria-label', state.paused ? 'Resume reading' : 'Pause reading');
    state.ui.pause.innerHTML = state.paused
      ? `${createIcon('M8 5v14l11-7z')}`
      : `${createIcon('M6 5h4v14H6zm8 0h4v14h-4z')}`;
  }

  function stopReading(message) {
    state.generation += 1;
    state.queue = [];
    state.speaking = false;
    state.paused = false;
    if (supportsSpeech()) global.speechSynthesis.cancel();
    updateControlState();
    if (message) setStatus(message);
  }

  function speakNext(generation) {
    if (generation !== state.generation) return;
    if (state.queue.length === 0) {
      state.speaking = false;
      state.paused = false;
      updateControlState();
      setStatus(`Slide ${state.currentSlide} reading complete.`, 'active');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(state.queue.shift());
    utterance.lang = 'en-ZA';
    utterance.rate = Number(state.ui.rate.value) || 1;
    const voice = preferredVoice();
    if (voice) utterance.voice = voice;
    utterance.onend = () => speakNext(generation);
    utterance.onerror = event => {
      if (event.error === 'canceled' || generation !== state.generation) return;
      stopReading('The slide could not be read. Please try again.');
    };
    global.speechSynthesis.speak(utterance);
  }

  function readCurrentSlide() {
    if (!supportsSpeech()) {
      setStatus('Read Aloud is not available in this browser.', 'warning');
      return;
    }

    try {
      if (state.controller && typeof state.controller.pause === 'function') state.controller.pause();
    } catch (_) {}

    const text = extractVisibleSlideText();
    state.currentSlide = getCurrentSlideNumber();
    updateSlideDetails();
    if (!text) {
      stopReading();
      setStatus('This slide appears to contain pictures or text that cannot be read automatically.', 'warning');
      return;
    }

    stopReading();
    state.generation += 1;
    const generation = state.generation;
    state.queue = splitForSpeech(text);
    state.speaking = true;
    state.paused = false;
    updateControlState();
    setStatus(`Reading slide ${state.currentSlide} aloud…`, 'active');
    speakNext(generation);
  }

  function togglePause() {
    if (!state.speaking || !supportsSpeech()) return;
    if (state.paused) {
      global.speechSynthesis.resume();
      state.paused = false;
      setStatus(`Reading slide ${state.currentSlide} aloud…`, 'active');
    } else {
      global.speechSynthesis.pause();
      state.paused = true;
      setStatus('Reading paused.');
    }
    updateControlState();
  }

  function handleSlideChange() {
    stopReading();
    state.currentSlide = getCurrentSlideNumber();
    setStatus('Read the visible words on the current slide.');
    updateSlideDetails(320);
    updateSlideDetails(900);
  }

  function attachISpringPlayer(player) {
    state.player = player || null;
    try {
      state.controller = player && player.view && player.view().playbackController
        ? player.view().playbackController()
        : null;
    } catch (_) {
      state.controller = null;
    }

    if (state.controller) {
      try {
        const slideEvent = state.controller.slideChangeEvent && state.controller.slideChangeEvent();
        if (slideEvent && typeof slideEvent.addHandler === 'function') slideEvent.addHandler(handleSlideChange);
      } catch (_) {}
    }
    createUi();
    updateSlideDetails(300);
    updateSlideDetails(1000);
  }

  function init() {
    createUi();
    global.addEventListener('pagehide', () => stopReading());
  }

  global.MayReadAloud = Object.freeze({
    attachISpringPlayer,
    extractVisibleSlideText,
    readCurrentSlide,
    stop: stopReading
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}(window));

