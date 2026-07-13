import {
    browserLocalPersistence,
    browserSessionPersistence,
    indexedDBLocalPersistence,
    setPersistence
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const ACTIVITY_ACCESS_KEY = "mayhubActivityAccess";
const ACTIVITY_ACCESS_DAYS = 30;
const ACTIVITY_ACCESS_MS = ACTIVITY_ACCESS_DAYS * 24 * 60 * 60 * 1000;
const RECENT_SIGNIN_WINDOW_MS = 60000;
export const MAYHUB_ADMIN_UID = "hVp1p5UP9WQ8JTvngErmjVkrXcj1";

function getStorage(storageName) {
    try {
        return window[storageName] || null;
    } catch {
        return null;
    }
}

function safeRead(storageName) {
    const storage = getStorage(storageName);
    if (!storage) return null;

    try {
        return JSON.parse(storage.getItem(ACTIVITY_ACCESS_KEY) || "null");
    } catch {
        return null;
    }
}

function safeWrite(storageName, value) {
    const storage = getStorage(storageName);
    if (!storage) return;

    try {
        storage.setItem(ACTIVITY_ACCESS_KEY, JSON.stringify(value));
    } catch {
        // Some webviews/private browsers block storage. Firebase auth can still be used when available.
    }
}

function safeRemove(storageName) {
    const storage = getStorage(storageName);
    if (!storage) return;

    try {
        storage.removeItem(ACTIVITY_ACCESS_KEY);
    } catch {
        // Ignore unavailable storage.
    }
}

function normalizeSubjectName(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "")
        .trim();
}


export function isMayHubAdmin(user = null, profile = null) {
    const uid = String(user?.uid || user?.userId || user?.id || profile?.uid || profile?.userId || "");
    const role = String(profile?.role || user?.role || "").toLowerCase();
    return uid === MAYHUB_ADMIN_UID || role === "admin" || profile?.isAdmin === true || user?.isAdmin === true;
}
function compactProfile(profile, user = null) {
    if (!profile) return null;

    return {
        role: profile.role || "",
        grade: profile.grade || "",
        subjects: Array.isArray(profile.subjects) ? profile.subjects : [],
        fullName: profile.fullName || "",
        school: profile.school || "",
        isAdmin: isMayHubAdmin(user, profile)
    };
}

export function getResourceAccessRequirement(urlValue = window.location.href) {
    let pathname = "";

    try {
        pathname = decodeURIComponent(new URL(urlValue, window.location.href).pathname);
    } catch {
        pathname = decodeURIComponent(String(urlValue || ""));
    }

    const requiresProfile = /\/(Activities|Chat|LearningForum)\//i.test(pathname);
    const gradeMatch = pathname.match(/\/Grade-(\d+)(?:\/|$)/i);
    let subject = "";

    if (/\/Social-Sciences\//i.test(pathname)) {
        subject = "Social Sciences";
    } else if (/\/Life-Sciences\//i.test(pathname)) {
        subject = "Life Sciences";
    } else if (/\/Geography\//i.test(pathname)) {
        subject = "Geography";
    } else if (/\/Maths\//i.test(pathname) || /\/Mathematics\//i.test(pathname)) {
        subject = "Mathematics";
    }

    return {
        pathname,
        requiresProfile,
        grade: gradeMatch ? gradeMatch[1] : "",
        subject
    };
}

export function canProfileAccessResource(profile, resource) {
    if (!resource || !resource.requiresProfile) return true;
    if (isMayHubAdmin(null, profile)) return true;
    if (!profile) return false;

    const role = String(profile.role || "").toLowerCase();
    const profileGrade = String(profile.grade || "").trim();
    const resourceGrade = String(resource.grade || "").trim();
    const profileSubjects = Array.isArray(profile.subjects) ? profile.subjects : [];
    const normalizedResourceSubject = normalizeSubjectName(resource.subject);
    const hasSubjectSelection = profileSubjects.length > 0;
    const subjectMatches = !normalizedResourceSubject
        || !hasSubjectSelection
        || profileSubjects.some(subject => normalizeSubjectName(subject) === normalizedResourceSubject);

    if (role === "learner") {
        const gradeMatches = !resourceGrade || profileGrade === resourceGrade;
        return gradeMatches && subjectMatches;
    }

    if (role === "teacher" || role === "explorer") {
        return subjectMatches;
    }

    return subjectMatches;
}

export function getSavedActivityAccess() {
    const savedAccess = safeRead("localStorage") || safeRead("sessionStorage");

    if (!savedAccess || Number(savedAccess.expiresAt || 0) <= Date.now()) {
        clearActivityAccess();
        return null;
    }

    return savedAccess;
}

export function rememberActivityAccess(user, profile = null) {
    const access = {
        uid: user?.uid || "firebase-user",
        email: user?.email || "",
        profile: compactProfile(profile, user),
        grantedAt: Date.now(),
        expiresAt: Date.now() + ACTIVITY_ACCESS_MS,
        isAdmin: isMayHubAdmin(user, profile)
    };

    safeWrite("localStorage", access);
    safeWrite("sessionStorage", access);
}

export function clearActivityAccess() {
    safeRemove("localStorage");
    safeRemove("sessionStorage");
}

export function markActivityRedirect() {
    try {
        sessionStorage.setItem("mayhubAuthRedirectAt", Date.now().toString());
    } catch {
        // Ignore unavailable session storage.
    }
}

export function clearActivityRedirectMarker() {
    try {
        sessionStorage.removeItem("mayhubAuthRedirectAt");
    } catch {
        // Ignore unavailable session storage.
    }
}

export function shouldWaitLongerForRecentSignin() {
    try {
        const redirectAt = Number(sessionStorage.getItem("mayhubAuthRedirectAt") || 0);
        return redirectAt > 0 && Date.now() - redirectAt < RECENT_SIGNIN_WINDOW_MS;
    } catch {
        return false;
    }
}

export async function setBestAvailablePersistence(auth) {
    const persistenceOptions = [
        indexedDBLocalPersistence,
        browserLocalPersistence,
        browserSessionPersistence
    ];

    for (const persistence of persistenceOptions) {
        try {
            await setPersistence(auth, persistence);
            return;
        } catch {
            // Try the next browser storage option.
        }
    }

    console.warn("May Learning Hub could not enable saved Firebase sign-in persistence in this browser.");
}
