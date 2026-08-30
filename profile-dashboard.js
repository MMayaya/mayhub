(function () {
  'use strict';

  const routes = {
    8: {
      title: 'HistoryQuest: The African Expedition',
      subject: 'Social Sciences History',
      stages: 6,
      storagePrefix: 'mayhubHistoryQuest:',
      path: 'Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/HistoryQuest.html',
      gamesPath: 'Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/history-assessment-games.html'
    },
    10: {
      title: 'GeoQuest: The Population Expedition',
      subject: 'Geography',
      stages: 5,
      storagePrefix: 'mayhubGrade10GeoQuest:',
      path: 'Geography/Term-3/Grade-10/Games/Assessment%20Games/GeoQuest/GeoQuest.html',
      gamesPath: 'Geography/Term-3/Grade-10/Games/Assessment%20Games/assessment-games.html'
    },
    11: {
      title: 'GeoQuest: The Development Expedition',
      subject: 'Geography',
      stages: 5,
      storagePrefix: 'mayhubGeoQuest:',
      path: 'Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/GeoQuest.html',
      gamesPath: 'Geography/Term-3/Grade-11/Games/Assessment%20Games/assessment-games.html'
    }
  };

  const elements = {
    dashboard: document.getElementById('dashboard'),
    signedOut: document.getElementById('signedOut'),
    greeting: document.getElementById('dashboardGreeting'),
    subtitle: document.getElementById('dashboardSubtitle'),
    chips: document.getElementById('dashboardChips'),
    profileName: document.getElementById('profileName'),
    profileEmail: document.getElementById('profileEmail'),
    profileGrade: document.getElementById('profileGrade'),
    profileSchool: document.getElementById('profileSchool'),
    profileSubjects: document.getElementById('profileSubjects'),
    certificates: document.getElementById('statCertificates'),
    average: document.getElementById('statAverage'),
    distinctions: document.getElementById('statDistinctions'),
    latest: document.getElementById('statLatest'),
    latestNote: document.getElementById('statLatestNote'),
    continueStage: document.getElementById('continueStage'),
    continueTitle: document.getElementById('continueTitle'),
    continueCopy: document.getElementById('continueCopy'),
    continueLink: document.getElementById('continueLink'),
    achievementList: document.getElementById('achievementList'),
    assessmentGamesLink: document.getElementById('assessmentGamesLink'),
    refresh: document.getElementById('refreshDashboard')
  };

  function safeText(value, fallback) {
    const text = String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
    return text || fallback;
  }

  function readAccess() {
    for (const storage of [window.localStorage, window.sessionStorage]) {
      try {
        const access = JSON.parse(storage.getItem('mayhubActivityAccess') || 'null');
        if (access && access.uid && Number(access.expiresAt || 0) > Date.now()) return access;
      } catch {}
    }
    return null;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);
  }

  function formatDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? 'Recently'
      : date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function profileGrade(access, records) {
    const grade = Number(access?.profile?.grade || 0);
    if (routes[grade]) return grade;
    const latestGrade = Number(String(records[0]?.grade || '').replace(/\D/g, ''));
    return routes[latestGrade] ? latestGrade : 0;
  }

  function stageProgress(route, uid) {
    const completed = new Set();
    const active = new Set();
    const suffix = encodeURIComponent(uid);
    try {
      for (let index = 0; index < window.localStorage.length; index += 1) {
        const key = window.localStorage.key(index);
        if (!key || !key.startsWith(route.storagePrefix) || !key.endsWith(suffix)) continue;
        const stageMatch = key.match(/:stage-(\d+):/);
        if (!stageMatch) continue;
        const stage = Number(stageMatch[1]);
        if (stage < 1 || stage > route.stages) continue;
        const state = JSON.parse(window.localStorage.getItem(key) || 'null');
        if (state?.completed) completed.add(stage);
        else if (state?.started || Number(state?.current || 0) > 0) active.add(stage);
      }
    } catch {}
    const activeStage = [...active].sort((a, b) => a - b)[0] || 0;
    return { completed: completed.size, activeStage };
  }

  function renderProfile(access, records) {
    const profile = access.profile || {};
    const fullName = safeText(profile.fullName || access.name || access.displayName || access.email?.split('@')[0], 'Learner');
    const firstName = fullName.split(' ')[0];
    const grade = profileGrade(access, records);
    const route = routes[grade];
    const subjects = Array.isArray(profile.subjects) && profile.subjects.length
      ? profile.subjects.join(', ')
      : (route ? route.subject : 'Not selected');
    elements.greeting.textContent = 'Welcome back, ' + firstName + '.';
    elements.subtitle.textContent = route
      ? 'Your Grade ' + grade + ' Term 3 progress, certificates and next learning step are ready.'
      : 'Your learning progress, certificates and next best step are all in one place.';
    elements.profileName.textContent = fullName;
    elements.profileEmail.textContent = safeText(access.email, 'Signed-in learner');
    elements.profileGrade.textContent = grade ? 'Grade ' + grade : 'Not selected';
    elements.profileSchool.textContent = safeText(profile.school, 'Not added yet');
    elements.profileSubjects.textContent = subjects;
    elements.chips.innerHTML = [
      grade ? '<span class="chip">Grade ' + grade + '</span>' : '',
      route ? '<span class="chip">' + escapeHtml(route.subject) + '</span>' : '',
      '<span class="chip">Term 3</span>'
    ].join('');
    return { grade, route };
  }

  function renderStats(records) {
    const scored = records.filter(record => record.mode === 'scored' && Number(record.total) > 0);
    const average = scored.length
      ? Math.round(scored.reduce((sum, record) => sum + (Number(record.correct) / Number(record.total)) * 100, 0) / scored.length)
      : null;
    const distinctions = scored.filter(record => Number(record.percentage) >= 80).length;
    const latest = records[0];
    elements.certificates.textContent = String(records.length);
    elements.average.textContent = average === null ? '—' : average + '%';
    elements.distinctions.textContent = String(distinctions);
    elements.latest.textContent = latest?.mode === 'scored' && Number(latest.percentage) >= 0
      ? Math.round(Number(latest.percentage)) + '%'
      : (latest ? 'Done' : '—');
    elements.latestNote.textContent = latest
      ? safeText(latest.gameTitle, 'Latest certificate') + ' · ' + formatDate(latest.issuedAt)
      : 'complete a game to begin';
  }

  function renderContinue(access, route) {
    if (!route) {
      elements.continueStage.textContent = 'Explore';
      elements.continueTitle.textContent = 'Choose a learning area';
      elements.continueCopy.textContent = 'Add your grade and subjects in your profile to receive a more personalised next step.';
      elements.continueLink.href = 'index.html?profile=edit';
      elements.continueLink.textContent = 'Complete My Profile';
      elements.assessmentGamesLink.href = 'index.html';
      return;
    }
    const progress = stageProgress(route, access.uid);
    const nextStage = progress.activeStage || Math.min(route.stages, progress.completed + 1);
    elements.assessmentGamesLink.href = route.gamesPath;
    elements.continueLink.href = route.path;
    if (progress.completed >= route.stages) {
      elements.continueStage.textContent = 'Expedition complete';
      elements.continueTitle.textContent = 'You completed ' + route.title + '.';
      elements.continueCopy.textContent = 'Excellent work. Revisit the expedition to strengthen your recall or explore another assessment game.';
      elements.continueLink.textContent = 'Open My Games';
      elements.continueLink.href = route.gamesPath;
      return;
    }
    elements.continueStage.textContent = 'Stage ' + nextStage + ' of ' + route.stages;
    elements.continueTitle.textContent = progress.activeStage
      ? 'Continue ' + route.title + '.'
      : 'Your next ' + route.title + ' stage is ready.';
    elements.continueCopy.textContent = progress.completed
      ? progress.completed + ' of ' + route.stages + ' stages are completed. Continue when you feel ready.'
      : 'Begin your first stage and build your confidence one question at a time.';
    elements.continueLink.textContent = progress.activeStage ? 'Continue Expedition' : 'Begin Expedition';
  }

  function scoreLabel(record) {
    if (record.mode === 'participation') return 'Participation';
    if (Number(record.total) > 0) return Math.round(Number(record.percentage || 0)) + '%';
    return safeText(record.awardTitle, 'Achievement');
  }

  function renderAchievements(records) {
    if (!records.length) {
      elements.achievementList.innerHTML = '<p class="empty-state">No certificates yet. Complete an assessment game and your newest achievement will appear here.</p>';
      return;
    }
    elements.achievementList.innerHTML = records.slice(0, 3).map(record =>
      '<article class="achievement"><div><h3>' + escapeHtml(record.gameTitle) + '</h3><p>' +
      escapeHtml([record.certificateTitle, formatDate(record.issuedAt)].filter(Boolean).join(' · ')) +
      '</p></div><strong class="achievement-score">' + escapeHtml(scoreLabel(record)) + '</strong></article>'
    ).join('');
  }

  function render() {
    const access = readAccess();
    if (!access) {
      elements.dashboard.hidden = true;
      elements.signedOut.hidden = false;
      return;
    }
    const helper = window.MayCertificateHistory;
    const records = helper && helper.isSignedIn() ? helper.list() : [];
    const profile = renderProfile(access, records);
    renderStats(records);
    renderContinue(access, profile.route);
    renderAchievements(records);
    elements.signedOut.hidden = true;
    elements.dashboard.hidden = false;
  }

  elements.refresh?.addEventListener('click', render);
  window.addEventListener('storage', event => {
    if (event.key && (event.key === 'mayhubActivityAccess' || event.key.startsWith('mayhub'))) render();
  });
  render();
})();
