import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Your Firebase config (replace with your own values)
const firebaseConfig = {
  apiKey: "AIzaSyAYrgz9-LLhatfGSeP7iRJsFz1AVF5onpI",
  authDomain: "oleru-young.firebaseapp.com",
  projectId: "oleru-young",
  storageBucket: "oleru-young.firebasestorage.app",
  messagingSenderId: "416968907489",
  appId: "1:416968907489:web:38b922f619fe2b003075a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Login
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async (e) => {

    e.preventDefault(); // Prevent default form submission

    console.log("Script loaded");
    console.log("loginBtn:", loginBtn);

    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    if (!email || !password) {
        console.error("Email and password are required.");
        return;
    }


    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in: " + userCredential.user.email);

        window.location.href = "dashboard.html";


    } catch (error) {
        console.error(`Error: ${error.message}`);
    }

});