import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

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

try {
    await auth.authStateReady();

    if (!auth.currentUser) {
        sessionStorage.setItem("redirectURL", window.location.href);
        window.location.replace(signinUrl.href);
    } else {
        document.getElementById("activity-auth-guard-style")?.remove();
    }
} catch (error) {
    console.error("Could not confirm activity access.", error);
    sessionStorage.setItem("redirectURL", window.location.href);
    window.location.replace(signinUrl.href);
}