import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyApyOAfcEB8nGc-B3IO4X8wIl-nVi3nKeo",
    authDomain: "maylearninghub.firebaseapp.com",
    projectId: "maylearninghub",
    storageBucket: "maylearninghub.firebasestorage.app",
    messagingSenderId: "237875455146",
    appId: "1:237875455146:web:21310d33b56664d669dcd3",
    measurementId: "G-LJMFCM44TQ"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const signinUrl = new URL("signin.html", import.meta.url);
const NORMAL_AUTH_WAIT_MS = 2500;
const RECENT_SIGNIN_AUTH_WAIT_MS = 10000;
const RECENT_SIGNIN_WINDOW_MS = 60000;

function revealActivity() {
    document.getElementById("activity-auth-guard-style")?.remove();
}

function getReturnUrl() {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function shouldWaitLongerForRecentSignin() {
    const redirectAt = Number(sessionStorage.getItem("mayhubAuthRedirectAt") || 0);
    return redirectAt > 0 && Date.now() - redirectAt < RECENT_SIGNIN_WINDOW_MS;
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
    await setPersistence(auth, browserLocalPersistence).catch((error) => {
        console.warn("Could not force saved sign-in persistence. Firebase will use the available fallback.", error);
    });

    if (typeof auth.authStateReady === "function") {
        await auth.authStateReady();
    }

    const waitMs = shouldWaitLongerForRecentSignin()
        ? RECENT_SIGNIN_AUTH_WAIT_MS
        : NORMAL_AUTH_WAIT_MS;
    const user = auth.currentUser || await waitForSignedInUser(waitMs);

    if (!user) {
        redirectToSignin();
    } else {
        sessionStorage.removeItem("mayhubAuthRedirectAt");
        revealActivity();
    }
} catch (error) {
    console.error("Could not confirm activity access.", error);
    redirectToSignin();
}