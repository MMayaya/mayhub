(function () {
  'use strict';

  const accessStorageKey = 'mayhubActivityAccess';
  const historyPrefix = 'mayhubCertificateHistory:v1:';
  const historyLimit = 100;

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }

  function signedInIdentity() {
    const access = readJson(accessStorageKey, {});
    const uid = String(access.uid || '').trim();
    if (!uid || uid === 'firebase-user' || Number(access.expiresAt || 0) <= Date.now()) return null;
    return {
      uid,
      name: String(access.profile?.fullName || access.name || access.displayName || '').trim()
    };
  }

  function storageKey(identity) {
    return historyPrefix + encodeURIComponent(identity.uid);
  }

  function list() {
    const identity = signedInIdentity();
    if (!identity) return [];
    const records = readJson(storageKey(identity), []);
    return Array.isArray(records) ? records : [];
  }

  function safeText(value, maxLength) {
    return String(value == null ? '' : value).trim().slice(0, maxLength);
  }

  function normalise(record) {
    if (!record || typeof record !== 'object') return null;
    const completionId = safeText(record.completionId, 160);
    const gameTitle = safeText(record.gameTitle, 160);
    if (!completionId || !gameTitle) return null;

    return {
      completionId,
      learnerName: safeText(record.learnerName, 120),
      grade: safeText(record.grade, 40),
      subject: safeText(record.subject, 100),
      certificateTitle: safeText(record.certificateTitle, 120),
      awardTitle: safeText(record.awardTitle, 120),
      message: safeText(record.message, 320),
      tierClass: safeText(record.tierClass, 40),
      gameTitle,
      topic: safeText(record.topic, 160),
      layout: safeText(record.layout, 40),
      categoryTitle: safeText(record.categoryTitle, 160),
      subjectLine: safeText(record.subjectLine, 160),
      termLabel: safeText(record.termLabel, 80),
      mode: record.mode === 'participation' ? 'participation' : 'scored',
      correct: Number.isFinite(Number(record.correct)) ? Number(record.correct) : null,
      total: Number.isFinite(Number(record.total)) ? Number(record.total) : null,
      percentage: Number.isFinite(Number(record.percentage)) ? Number(record.percentage) : null,
      metricLabel: safeText(record.metricLabel, 80),
      metricValue: safeText(record.metricValue, 80),
      minutes: Number.isFinite(Number(record.minutes)) ? Number(record.minutes) : null,
      seconds: Number.isFinite(Number(record.seconds)) ? Number(record.seconds) : null,
      date: safeText(record.date, 80),
      issuedAt: safeText(record.issuedAt, 40) || new Date().toISOString(),
      shareUrl: safeText(record.shareUrl, 500)
    };
  }

  function record(entry) {
    const identity = signedInIdentity();
    const item = normalise(entry);
    if (!identity || !item) return false;

    const records = list().filter((existing) => existing.completionId !== item.completionId);
    records.unshift(item);
    try {
      localStorage.setItem(storageKey(identity), JSON.stringify(records.slice(0, historyLimit)));
      return true;
    } catch (error) {
      return false;
    }
  }

  window.MayCertificateHistory = Object.freeze({
    isSignedIn: () => Boolean(signedInIdentity()),
    getIdentity: signedInIdentity,
    list,
    record
  });
})();
