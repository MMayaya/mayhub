import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import {
    canProfileAccessResource,
    clearActivityRedirectMarker,
    getResourceAccessRequirement,
    getSavedActivityAccess,
    isMayHubAdmin,
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
const db = getFirestore(app);
const signinUrl = new URL("signin.html", import.meta.url);
const homeUrl = new URL("index.html", import.meta.url);
const resourceRequirement = getResourceAccessRequirement(window.location.href);

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

function renderBlockedAccess(message) {
    revealActivity();

    const render = () => {
        document.body.innerHTML = `
            <main style="min-height:100vh;display:grid;place-items:center;background:#f0f4f8;color:#123;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;padding:24px;">
                <section style="max-width:620px;background:#fff;border-top:5px solid #002b5e;border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,.12);padding:28px;text-align:center;">
                    <h1 style="color:#002b5e;margin-bottom:12px;">This section is not on your profile</h1>
                    <p style="font-size:1rem;line-height:1.6;margin-bottom:18px;">${message}</p>
                    <a href="${homeUrl.href}" style="display:inline-block;background:#002b5e;color:#fff;text-decoration:none;font-weight:700;border-radius:8px;padding:11px 18px;">Back to May Learning Hub</a>
                </section>
            </main>
        `;
    };

    if (document.body) {
        render();
    } else {
        window.addEventListener("DOMContentLoaded", render, { once: true });
    }
}

async function loadUserProfile(user) {
    const profileSnapshot = await getDoc(doc(db, "users", user.uid));
    return profileSnapshot.exists() ? profileSnapshot.data() : null;
}

function cachedAccessAllowsResource() {
    const savedAccess = getSavedActivityAccess();
    return Boolean(savedAccess && (savedAccess.isAdmin || canProfileAccessResource(savedAccess.profile, resourceRequirement)));
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
        let profile = null;

        try {
            profile = await loadUserProfile(user);
        } catch (error) {
            console.warn("Could not load activity profile; checking saved profile access.", error);
        }

        if (isMayHubAdmin(user, profile) || (profile && canProfileAccessResource(profile, resourceRequirement))) {
            rememberActivityAccess(user, profile);
            clearActivityRedirectMarker();
            revealActivity();
        } else if (!profile && cachedAccessAllowsResource()) {
            clearActivityRedirectMarker();
            revealActivity();
        } else {
            renderBlockedAccess("Your saved profile does not match the grade or subject for this activity. Please use the resources linked to the grade and subjects you registered for.");
        }
    } else if (cachedAccessAllowsResource()) {
        revealActivity();
    } else {
        redirectToSignin();
    }
} catch (error) {
    console.error("Could not confirm activity access.", error);

    if (cachedAccessAllowsResource()) {
        revealActivity();
    } else {
        redirectToSignin();
    }
}
