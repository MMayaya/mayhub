import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import {
    clearActivityRedirectMarker,
    getSavedActivityAccess,
    rememberActivityAccess,
    setBestAvailablePersistence,
    shouldWaitLongerForRecentSignin
} from "./mayhub-auth-state.js";

const firebaseConfig = {
    apiKey: "AIzaSyApyOAfcEB8nGc-B3IO4X8wIl-nVi3nKeo",
    authDomain: "maylearninghub.firebaseapp.com",
    projectId: "maylearninghub",
    storageBucket: "maylearninghub.firebasestorage.app",
    messagingSenderId: "237875455146",
    appId: "1:237875455146:web:21310d33b56664d669dcd3",
    measurementId: "G-LJMFCM44TQ"
};

const NORMAL_AUTH_WAIT_MS = 2500;
const RECENT_SIGNIN_AUTH_WAIT_MS = 10000;

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const signinUrl = new URL("signin.html", import.meta.url);

function revealActivity() {
    document.getElementById("activity-auth-guard-style")?.remove();
}

function getReturnUrl() {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function waitForSignedInUser(timeoutMs) {
    return new Promise((resolve) => {
        let settled = false;
        let unsubscribe = () => {};

        const finish = (user) => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            unsubscribe();
            resolve(user || auth.currentUser || null);
        };

        const timer = setTimeout(() => finish(auth.currentUser), timeoutMs);

        unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                if (user) finish(user);
            },
            () => finish(null)
        );
    });
}

function redirectToSignin() {
    const returnUrl = getReturnUrl();
    sessionStorage.setItem("redirectURL", returnUrl);
    signinUrl.searchParams.set("redirect", returnUrl);
    signinUrl.searchParams.set("notice", "activity");
    window.location.replace(signinUrl.href);
}

try {
    await setBestAvailablePersistence(auth);

    if (typeof auth.authStateReady === "function") {
        await auth.authStateReady();
    }

    const waitMs = shouldWaitLongerForRecentSignin()
        ? RECENT_SIGNIN_AUTH_WAIT_MS
        : NORMAL_AUTH_WAIT_MS;
    const user = auth.currentUser || await waitForSignedInUser(waitMs);

    if (user) {
        rememberActivityAccess(user);
        clearActivityRedirectMarker();
        revealActivity();
    } else if (getSavedActivityAccess()) {
        revealActivity();
    } else {
        redirectToSignin();
    }
} catch (error) {
    console.error("Could not confirm activity access.", error);

    if (getSavedActivityAccess()) {
        revealActivity();
    } else {
        redirectToSignin();
    }
}