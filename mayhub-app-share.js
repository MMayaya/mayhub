(function () {
  'use strict';

  const assetBase = document.currentScript.src;
  const targets = {
    website: {
      url: 'https://maylearninghub.co.za/',
      text: 'Explore lessons, games and activities on May Learning Hub:',
      introduction: 'Share the website with anyone, including iPhone users.',
      openLabel: 'Open Website',
      qrAsset: new URL('mayhub-website-qr.png', assetBase).href,
      qrAlt: 'QR code linking to the May Learning Hub website',
      qrCaption: 'Scan to open the May Learning Hub website.',
      copyMessage: 'Website link copied!'
    },
    app: {
      url: 'https://play.google.com/store/apps/details?id=com.maylearninghub.app&hl=en',
      text: 'Learn and practise with May Learning Hub. Get the Android app on Google Play:',
      introduction: 'Share the Android app with someone who can use Google Play.',
      openLabel: 'Open on Google Play',
      qrAsset: new URL('mayhub-app-qr.png', assetBase).href,
      qrAlt: 'QR code linking to the May Learning Hub app on Google Play',
      qrCaption: 'Scan to get the May Learning Hub app on Google Play.',
      copyMessage: 'Google Play link copied!'
    }
  };
  const ua = navigator.userAgent || '';
  const isIOS = /(iPhone|iPad|iPod)/i.test(ua)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  function init() {
    if (document.getElementById('mayhub-app-share-launch')) return;

    const bar = document.createElement('div');
    bar.className = 'mayhub-app-share-bar';
    bar.innerHTML = '<button type="button" id="mayhub-app-share-launch" class="mayhub-app-share-launch" aria-label="Share May Learning Hub" title="Share May Learning Hub">'
      + '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></svg>'
      + '<span>Share May Learning Hub</span></button>';
    document.body.append(bar);

    const launch = bar.firstElementChild;
    const dialog = document.createElement('dialog');
    dialog.className = 'mayhub-app-share-dialog';
    dialog.setAttribute('aria-labelledby', 'mayhub-app-share-title');
    dialog.innerHTML = '<h2 id="mayhub-app-share-title" tabindex="-1">Share May Learning Hub</h2>'
      + '<p>Choose what you would like to share.</p>'
      + '<div class="mayhub-app-share-options" role="group" aria-label="Share destination">'
      + '<button type="button" data-mode="website" aria-pressed="false">Website</button>'
      + '<button type="button" data-mode="app" aria-pressed="false">Android app</button>'
      + '</div>'
      + '<p class="mayhub-app-share-introduction"></p>'
      + '<pre class="mayhub-app-share-preview"></pre>'
      + '<div class="mayhub-app-share-actions">'
      + '<button type="button" data-action="share">Share</button>'
      + '<button type="button" data-action="whatsapp">WhatsApp</button>'
      + '<button type="button" data-action="copy">Copy Link</button>'
      + '<button type="button" data-action="qr" aria-expanded="false" aria-controls="mayhub-app-share-qr">Show QR Code</button>'
      + '<a data-destination-link></a>'
      + '</div>'
      + '<div id="mayhub-app-share-qr" class="mayhub-app-share-qr" tabindex="-1" hidden>'
      + '<img width="328" height="328" alt="">'
      + '<p></p></div>'
      + '<p class="mayhub-app-share-note">Inside an app? If the link does not open, copy and paste it into your browser.</p>'
      + '<textarea class="mayhub-app-share-manual" aria-label="Link to copy manually" readonly hidden></textarea>'
      + '<p role="status" aria-live="polite"></p>'
      + '<button type="button" class="mayhub-app-share-close" data-close>Close</button>';
    document.body.append(dialog);

    const preview = dialog.querySelector('.mayhub-app-share-preview');
    const qrPanel = dialog.querySelector('.mayhub-app-share-qr');
    const qrButton = dialog.querySelector('[data-action="qr"]');
    const manual = dialog.querySelector('.mayhub-app-share-manual');
    const status = dialog.querySelector('[role="status"]');
    const destinationLink = dialog.querySelector('[data-destination-link]');
    let mode = isIOS ? 'website' : 'app';

    function notify(message) { status.textContent = message; }

    function setMode(nextMode) {
      if (!targets[nextMode]) return;
      mode = nextMode;
      const target = targets[mode];
      dialog.querySelectorAll('[data-mode]').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
      });
      dialog.querySelector('.mayhub-app-share-introduction').textContent = target.introduction;
      preview.textContent = target.text + '\n' + target.url;
      destinationLink.href = target.url;
      destinationLink.textContent = target.openLabel;
      const qrImage = qrPanel.querySelector('img');
      qrImage.src = target.qrAsset;
      qrImage.alt = target.qrAlt;
      qrPanel.querySelector('p').textContent = target.qrCaption;
      qrPanel.hidden = true;
      qrButton.textContent = 'Show QR Code';
      qrButton.setAttribute('aria-expanded', 'false');
      manual.hidden = true;
      notify('');
    }

    async function copyLink(target = targets[mode]) {
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(target.url);
        notify(target.copyMessage);
        return;
      } catch (_) { /* Older WebViews may only support selection-based copying. */ }

      manual.hidden = false;
      manual.value = target.url;
      manual.focus();
      manual.select();
      manual.setSelectionRange(0, manual.value.length);
      try {
        if (document.execCommand('copy')) {
          manual.hidden = true;
          notify(target.copyMessage);
          return;
        }
      } catch (_) { /* Leave the selected link available for manual copying. */ }
      notify('Touch and hold the selected link to copy it.');
    }

    async function share() {
      const target = targets[mode];
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({ title: 'May Learning Hub', text: target.text, url: target.url });
          return;
        } catch (error) {
          if (error && error.name === 'AbortError') return;
        }
      }
      await copyLink(target);
    }

    function close() {
      if (typeof dialog.close === 'function' && dialog.open && !dialog.classList.contains('is-fallback')) dialog.close();
      else {
        dialog.removeAttribute('open');
        dialog.classList.remove('is-fallback');
        launch.focus();
      }
    }

    function open() {
      setMode(mode);
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else {
        dialog.classList.add('is-fallback');
        dialog.setAttribute('open', '');
      }
      dialog.querySelector('h2').focus({ preventScroll: true });
      dialog.scrollTop = 0;
    }

    launch.addEventListener('click', open);
    dialog.addEventListener('close', () => launch.focus());
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Escape' && dialog.classList.contains('is-fallback')) close();
    });
    dialog.querySelector('[data-close]').addEventListener('click', close);
    dialog.querySelector('.mayhub-app-share-options').addEventListener('click', event => {
      const button = event.target.closest('[data-mode]');
      if (button) setMode(button.dataset.mode);
    });
    dialog.querySelector('.mayhub-app-share-actions').addEventListener('click', event => {
      const button = event.target.closest('[data-action]');
      if (!button) return;
      const action = button.dataset.action;
      if (action === 'share') void share();
      if (action === 'copy') void copyLink();
      if (action === 'whatsapp') {
        const target = targets[mode];
        window.location.assign('https://wa.me/?text=' + encodeURIComponent(target.text + '\n' + target.url));
      }
      if (action === 'qr') {
        qrPanel.hidden = !qrPanel.hidden;
        qrButton.textContent = qrPanel.hidden ? 'Show QR Code' : 'Hide QR Code';
        qrButton.setAttribute('aria-expanded', String(!qrPanel.hidden));
        if (!qrPanel.hidden) {
          qrPanel.focus();
          qrPanel.scrollIntoView({ block: 'nearest' });
        }
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}());
