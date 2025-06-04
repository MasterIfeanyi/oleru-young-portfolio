import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

import {
  getFirestore, collection, addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";




// Your Firebase config (replace with your own values)
const firebaseConfig = {
    apiKey: "AIzaSyAYrgz9-LLhatfGSeP7iRJsFz1AVF5onpI",
    authDomain: "oleru-young.firebaseapp.com",
    projectId: "oleru-young",
    storageBucket: "oleru-young.firebasestorage.app",
    messagingSenderId: "416968907489",
    appId: "1:416968907489:web:38b922f619fe2b003075a0"
};


// initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app, "photosdb");


// auth check
onAuthStateChanged(auth, user => {
    if (!user) {
    // User is not logged in
    window.location.href = "login.html"; // redirect to login page
    } else {
    console.log("Welcome:", user.email);
    }
});

// preview image
function previewImage(event) {
    const preview = document.getElementById('imagePreview');
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        console.log("here");
        reader.onload = function(e) {
        preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = `<span>No preview</span>`;
    }
}

window.previewImage = previewImage;

// Upload
const uploadForm = document.getElementById("upload-form");

uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const file = document.getElementById("photo").files[0];

    if (!file) {
        console.error("Please select a file.");
        return;
    }

    let url;

     if (file) {
        const storage = getStorage(app);
        const storageRef = ref(storage, 'uploads/' + file.name);
        const snapshot = await uploadBytes(storageRef, file);
        url = await getDownloadURL(snapshot.ref);
        console.log("File uploaded successfully:", url);
    }

    await addDoc(collection(db, "photos"), {
      title, url, createdAt: new Date()
    });

    uploadForm.reset();

    
});