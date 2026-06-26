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

export function getSavedActivityAccess() {
    const savedAccess = safeRead("localStorage") || safeRead("sessionStorage");

    if (!savedAccess || Number(savedAccess.expiresAt || 0) <= Date.now()) {
        safeRemove("localStorage");
        safeRemove("sessionStorage");
        return null;
    }

    return savedAccess;
}

export function rememberActivityAccess(user) {
    const access = {
        uid: user?.uid || "firebase-user",
        email: user?.email || "",
        grantedAt: Date.now(),
        expiresAt: Date.now() + ACTIVITY_ACCESS_MS
    };

    safeWrite("localStorage", access);
    safeWrite("sessionStorage", access);
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