(function () {
  'use strict';

  const content = document.getElementById('historyContent');
  const privacyNote = document.getElementById('privacyNote');

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);
  }

  function signInUrl() {
    return 'signin.html?redirect=' + encodeURIComponent('/certificate-history.html') + '&notice=certificates';
  }

  function card(record, index) {
    const score = record.mode === 'participation'
      ? 'Certificate of Participation'
      : (record.metricValue || (record.correct != null && record.total != null
        ? record.correct + '/' + record.total + ' (' + Math.round(record.percentage || 0) + '%)'
        : record.awardTitle));
    const detail = [record.subjectLine, record.termLabel, record.categoryTitle].filter(Boolean).join(' · ');
    const issuedAt = new Date(record.issuedAt);
    const hasIssuedTime = !Number.isNaN(issuedAt.getTime());
    const issuedDate = record.date || (hasIssuedTime
      ? issuedAt.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })
      : 'Date unavailable');
    const issuedTime = hasIssuedTime
      ? issuedAt.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
      : '';
    return '<article class="certificate-card ' + (record.mode === 'participation' ? 'participation' : '') + '">' +
      '<div class="issued-date"><span class="date">' + escapeHtml(issuedDate) + '</span>' +
      (issuedTime ? '<span class="time">' + escapeHtml(issuedTime) + '</span>' : '') + '</div>' +
      '<h2>' + escapeHtml(record.gameTitle) + '</h2>' +
      '<p>' + escapeHtml(detail) + '</p>' +
      '<p class="score">' + escapeHtml(score) + '</p>' +
      '<button type="button" data-certificate-index="' + index + '">Open Certificate</button>' +
      '</article>';
  }

  function render() {
    const helper = window.MayCertificateHistory;
    if (!helper || !helper.isSignedIn()) {
      content.innerHTML = '<div class="notice"><h2>Sign in to see your certificate history</h2><p>When you are signed in, certificates completed on this device will appear here automatically.</p><a href="' + signInUrl() + '">Sign In</a></div>';
      return;
    }

    privacyNote.hidden = false;
    const records = helper.list();
    if (!records.length) {
      content.innerHTML = '<div class="notice"><h2>No certificates here yet</h2><p>Complete a recent assessment game to add your first certificate.</p></div>';
      return;
    }

    content.innerHTML = '<div class="certificate-list">' + records.map(card).join('') + '</div>';
    content.addEventListener('click', (event) => {
      const button = event.target.closest('[data-certificate-index]');
      if (!button) return;
      const record = records[Number(button.dataset.certificateIndex)];
      if (record && window.MayHubCertificates && typeof window.MayHubCertificates.showSaved === 'function') {
        window.MayHubCertificates.showSaved(record);
      }
    });
  }

  render();
})();
