(function () {
  'use strict';

  const firebaseConfig = {
    apiKey: 'AIzaSyApyOAfcEB8nGc-B3IO4X8wIl-nVi3nKeo',
    authDomain: 'maylearninghub.firebaseapp.com',
    projectId: 'maylearninghub',
    storageBucket: 'maylearninghub.firebasestorage.app',
    messagingSenderId: '237875455146',
    appId: '1:237875455146:web:21310d33b56664d669dcd3',
    measurementId: 'G-LJMFCM44TQ'
  };
  const PROFILE_EDIT_LIMIT = 2;
  const PROFILE_SUBJECTS = ['Mathematics', 'Social Sciences', 'Geography', 'Life Sciences'];
  const MAYHUB_ADMIN_UID = 'hVp1p5UP9WQ8JTvngErmjVkrXcj1';
  let currentAccess = null;
  let currentUser = null;
  let currentProfile = null;
  let firebaseServices = null;
  let formHasBeenFilled = false;

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
    navName: document.getElementById('profileNavName'),
    navEmail: document.getElementById('profileNavEmail'),
    signOut: document.getElementById('profileSignOut'),
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
    refresh: document.getElementById('refreshDashboard'),
    editForm: document.getElementById('profileEditForm'),
    editFullName: document.getElementById('editProfileFullName'),
    editPhone: document.getElementById('editProfilePhone'),
    editSchool: document.getElementById('editProfileSchool'),
    editGrade: document.getElementById('editProfileGrade'),
    editGradeField: document.getElementById('editProfileGradeField'),
    editSubjectsField: document.getElementById('editProfileSubjectsField'),
    editSubjectOptions: document.getElementById('editProfileSubjectOptions'),
    editStatus: document.getElementById('editProfileStatus'),
    editHelp: document.getElementById('profileEditHelp'),
    saveProfile: document.getElementById('saveProfileForm'),
    resetProfile: document.getElementById('resetProfileForm')
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

  function clearAccess() {
    try { window.localStorage.removeItem('mayhubActivityAccess'); } catch {}
    try { window.sessionStorage.removeItem('mayhubActivityAccess'); } catch {}
  }

  function isAdmin(user, profile) {
    const uid = String(user?.uid || profile?.uid || '');
    const role = String(profile?.role || '').toLowerCase();
    return uid === MAYHUB_ADMIN_UID || role === 'admin' || profile?.isAdmin === true;
  }

  function getEditState(profile) {
    const year = new Date().getFullYear();
    const used = Number(profile?.profileEditYear) === year ? Number(profile?.profileEditCount || 0) : 0;
    if (isAdmin(currentUser, profile)) return { year, used, remaining: Infinity, unlimited: true };
    return { year, used, remaining: Math.max(0, PROFILE_EDIT_LIMIT - used), unlimited: false };
  }

  function setEditStatus(message, color = '#173c63') {
    if (!elements.editStatus) return;
    elements.editStatus.textContent = message;
    elements.editStatus.style.color = color;
  }

  function renderEditSubjects(selectedSubjects) {
    if (!elements.editSubjectOptions) return;
    const selected = new Set(Array.isArray(selectedSubjects) ? selectedSubjects : []);
    elements.editSubjectOptions.innerHTML = PROFILE_SUBJECTS.map(subject =>
      '<label><input type="checkbox" value="' + escapeHtml(subject) + '"' +
      (selected.has(subject) ? ' checked' : '') + '> ' + escapeHtml(subject) + '</label>'
    ).join('');
  }

  function updateEditVisibility() {
    const role = String(currentProfile?.role || currentAccess?.profile?.role || 'learner').toLowerCase();
    const grade = Number(elements.editGrade?.value || currentProfile?.grade || currentAccess?.profile?.grade || 0);
    const showGrade = role === 'learner' || !role;
    const showSubjects = role === 'teacher' || role === 'admin' || (showGrade && grade >= 10);
    if (elements.editGradeField) elements.editGradeField.hidden = !showGrade;
    if (elements.editSubjectsField) elements.editSubjectsField.hidden = !showSubjects;
  }

  function fillEditForm(profile, force) {
    if (!elements.editForm || (!force && formHasBeenFilled)) return;
    const data = profile || currentAccess?.profile || {};
    elements.editFullName.value = safeText(data.fullName || currentAccess?.name || currentAccess?.displayName, '');
    elements.editPhone.value = safeText(data.phone, '');
    elements.editSchool.value = safeText(data.school, '');
    elements.editGrade.value = String(data.grade || '11');
    renderEditSubjects(data.subjects);
    updateEditVisibility();
    formHasBeenFilled = true;

    const state = getEditState(data);
    if (state.unlimited) {
      elements.editHelp.textContent = 'Administrator profile edits are unlimited.';
      setEditStatus('Your profile is ready to edit.');
      elements.saveProfile.disabled = false;
    } else {
      elements.editHelp.textContent = 'You can edit your profile two times per calendar year.';
      setEditStatus(state.remaining + ' profile edit' + (state.remaining === 1 ? '' : 's') + ' remaining this year.', state.remaining ? '#173c63' : '#a52735');
      elements.saveProfile.disabled = state.remaining <= 0;
    }
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
    elements.navName.textContent = fullName;
    elements.navEmail.textContent = safeText(access.email, 'Signed-in account');
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
      elements.continueLink.href = '#edit-profile';
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
    const access = currentAccess || readAccess();
    if (!access) {
      elements.dashboard.hidden = true;
      elements.signedOut.hidden = false;
      return;
    }
    currentAccess = access;
    const helper = window.MayCertificateHistory;
    const records = helper && helper.isSignedIn() ? helper.list() : [];
    const profile = renderProfile(access, records);
    renderStats(records);
    renderContinue(access, profile.route);
    renderAchievements(records);
    fillEditForm(currentProfile || access.profile, false);
    elements.signedOut.hidden = true;
    elements.dashboard.hidden = false;
  }

  async function importWithTimeout(modulePath, timeoutMs) {
    return Promise.race([
      import(modulePath),
      new Promise((resolve, reject) => window.setTimeout(() => reject(new Error('Timed out loading ' + modulePath)), timeoutMs || 4500))
    ]);
  }

  async function initializeFirebase() {
    const [appModule, appCheckModule, authModule, firestoreModule, authStateModule] = await Promise.all([
      importWithTimeout('https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js'),
      importWithTimeout('https://www.gstatic.com/firebasejs/12.11.0/firebase-app-check.js'),
      importWithTimeout('https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js'),
      importWithTimeout('https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js'),
      importWithTimeout('./mayhub-auth-state.js')
    ]);
    const app = appModule.initializeApp(firebaseConfig);
    try {
      appCheckModule.initializeAppCheck(app, {
        provider: new appCheckModule.ReCaptchaV3Provider('6LfPNb0sAAAAAKWmsT-rqt2jQTfOuJWTN9Wlv4Vj'),
        isTokenAutoRefreshEnabled: true
      });
    } catch (error) {
      console.warn('Profile App Check could not start.', error);
    }
    const auth = authModule.getAuth(app);
    const db = firestoreModule.getFirestore(app);
    if (authStateModule.setBestAvailablePersistence) {
      await authStateModule.setBestAvailablePersistence(auth);
    }
    firebaseServices = {
      auth,
      db,
      authModule,
      firestoreModule,
      authStateModule
    };
    authModule.onAuthStateChanged(auth, async user => {
      if (!user) {
        currentUser = null;
        currentProfile = null;
        currentAccess = null;
        authStateModule.clearActivityAccess();
        render();
        return;
      }
      currentUser = user;
      let profile = currentAccess?.profile || {};
      try {
        const snapshot = await firestoreModule.getDoc(firestoreModule.doc(db, 'users', user.uid));
        if (snapshot.exists()) profile = snapshot.data();
      } catch (error) {
        console.warn('The online profile could not be refreshed.', error);
      }
      currentProfile = profile;
      authStateModule.rememberActivityAccess(user, profile);
      currentAccess = readAccess();
      formHasBeenFilled = false;
      render();
      fillEditForm(profile, true);
      if (window.location.hash === '#edit-profile') {
        window.requestAnimationFrame(() => document.getElementById('edit-profile')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      }
    });
  }

  async function saveProfile(event) {
    event.preventDefault();
    if (!firebaseServices || !currentUser || !currentProfile) {
      setEditStatus('Connect to the internet and confirm that you are signed in before saving.', '#a52735');
      return;
    }
    const state = getEditState(currentProfile);
    if (!state.unlimited && state.remaining <= 0) {
      setEditStatus('You have used both profile edits for this year.', '#a52735');
      return;
    }

    const fullName = elements.editFullName.value.trim();
    const school = elements.editSchool.value.trim();
    const role = String(currentProfile.role || 'learner').toLowerCase();
    if (!fullName || !school) {
      setEditStatus('Please enter your full name and school.', '#a52735');
      return;
    }

    const updates = {
      fullName,
      phone: elements.editPhone.value.trim(),
      school,
      profileEditedAt: firebaseServices.firestoreModule.serverTimestamp()
    };
    if (!state.unlimited) {
      updates.profileEditYear = state.year;
      updates.profileEditCount = state.used + 1;
    }

    if (role === 'learner' || !role) {
      updates.grade = elements.editGrade.value;
      if (!updates.grade) {
        setEditStatus('Please choose your grade.', '#a52735');
        return;
      }
      if (Number(updates.grade) >= 10) {
        updates.subjects = Array.from(elements.editSubjectOptions.querySelectorAll('input:checked')).map(input => input.value);
        if (!updates.subjects.length) {
          setEditStatus('Please choose at least one subject.', '#a52735');
          return;
        }
      } else {
        updates.subjects = [];
      }
    } else if (role === 'teacher' || role === 'admin') {
      updates.subjects = Array.from(elements.editSubjectOptions.querySelectorAll('input:checked')).map(input => input.value);
      if (!updates.subjects.length && role !== 'admin') {
        setEditStatus('Please choose at least one subject.', '#a52735');
        return;
      }
    }

    try {
      elements.saveProfile.disabled = true;
      setEditStatus('Saving your profile…');
      await firebaseServices.authModule.updateProfile(currentUser, { displayName: fullName });
      await firebaseServices.firestoreModule.updateDoc(
        firebaseServices.firestoreModule.doc(firebaseServices.db, 'users', currentUser.uid),
        updates
      );
      currentProfile = {
        ...currentProfile,
        ...updates,
        profileEditedAt: new Date().toISOString()
      };
      firebaseServices.authStateModule.rememberActivityAccess(currentUser, currentProfile);
      currentAccess = readAccess();
      formHasBeenFilled = false;
      render();
      fillEditForm(currentProfile, true);
      setEditStatus('Profile updated successfully.', '#17743a');
      const nextState = getEditState(currentProfile);
      elements.saveProfile.disabled = !nextState.unlimited && nextState.remaining <= 0;
    } catch (error) {
      console.error('Profile update failed.', error);
      setEditStatus('Your profile could not be saved. Please try again.', '#a52735');
      elements.saveProfile.disabled = false;
    }
  }

  async function signOut() {
    if (elements.signOut) {
      elements.signOut.disabled = true;
      elements.signOut.textContent = 'Signing Out…';
    }
    try {
      if (firebaseServices?.auth) {
        await firebaseServices.authModule.signOut(firebaseServices.auth);
      }
    } catch (error) {
      console.warn('Firebase sign out did not complete cleanly.', error);
    } finally {
      if (firebaseServices?.authStateModule?.clearActivityAccess) firebaseServices.authStateModule.clearActivityAccess();
      else clearAccess();
      currentAccess = null;
      currentUser = null;
      currentProfile = null;
      window.location.href = 'index.html';
    }
  }

  elements.refresh?.addEventListener('click', render);
  elements.editGrade?.addEventListener('change', updateEditVisibility);
  elements.editForm?.addEventListener('submit', saveProfile);
  elements.editForm?.addEventListener('reset', () => {
    window.setTimeout(() => fillEditForm(currentProfile || currentAccess?.profile, true), 0);
  });
  elements.signOut?.addEventListener('click', signOut);
  window.addEventListener('storage', event => {
    if (event.key && (event.key === 'mayhubActivityAccess' || event.key.startsWith('mayhub'))) {
      currentAccess = readAccess();
      render();
    }
  });

  currentAccess = readAccess();
  render();
  initializeFirebase().catch(error => {
    console.warn('Online profile services are unavailable.', error);
    if (elements.saveProfile) elements.saveProfile.disabled = true;
    if (currentAccess) setEditStatus('Profile details are available offline. Connect to the internet to save changes.', '#7a5b13');
  });
})();
