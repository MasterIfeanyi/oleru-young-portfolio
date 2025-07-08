import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

import {
  getFirestore, collection, addDoc, getDocs, query, orderBy
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";

 
// DOM manipulation
const uploadForm = document.getElementById("upload-form");
const imageUploader = document.getElementById("photo");
const statusMessage = document.getElementById('statusMessage');
const submitBtn = document.getElementById("submitBtn");



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
const db = getFirestore(app);
const storage = getStorage(app);



function showStatusMessage(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message status-${type}`;
    statusMessage.style.display = 'block';

    // Auto-hide success messages after 3 seconds
    if (type === "success") {
        setTimeout(() => {
        hideStatusMessage()
        }, 3000)
    }
}

function hideStatusMessage() {
    statusMessage.style.display = 'none';
}





// auth check
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        // User is not logged in
        console.log("❌ User not authenticated, redirecting to login")
        window.location.href = "login.html"; // redirect to login page
    } else {
        console.log("Welcome:", user.email);
        await loadAllImages();
        // Test Firestore connection
        testFirestoreConnection()
    }
});




// Test Firestore connection
async function testFirestoreConnection() {
  try {
    console.log("🧪 Testing Firestore connection...")

    // Try to create a test document
    const testRef = collection(db, "connection-test")
    const testDoc = await addDoc(testRef, {
      test: true,
      timestamp: new Date(),
      userId: auth.currentUser?.uid || "anonymous",
    })

    console.log("✅ Firestore connection successful! Test doc ID:", testDoc.id)
    return true
  } catch (error) {
    console.error("❌ Firestore connection failed:")
    console.error("Error code:", error.code)
    console.error("Error message:", error.message)

    if (error.code === "permission-denied") {
      showStatusMessage("Database permission denied. Please check Firestore rules.", "error")
    } else if (error.code === "unavailable") {
      showStatusMessage("Database service unavailable. Please try again later.", "error")
    } else {
      showStatusMessage("Database connection failed. Please refresh the page.", "error")
    }

    return false
  }
}

async function loadAllImages() {

    const imagesBody = document.getElementById('imagesBody');

    try {
        imagesBody.innerHTML = '<tr><td colspan="4">Loading images...</td></tr>';

        // const querySnapshot = await db.collection('images').orderBy('createdAt', 'desc').get();

        const q = query(collection(db, 'images'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
                
        if (querySnapshot.empty) {
            imagesBody.innerHTML = '<tr><td colspan="4">No images found.</td></tr>';
            return;
        }

        imagesBody.innerHTML = '';

        console.log(querySnapshot)

        querySnapshot.forEach((doc) => {
            const imageData = doc.data();
            console.log(imageData)
            createImageRow(imageData, doc.id);
        });

        
    } catch (error) {
        console.error("Error loading images:", error);
        document.getElementById('imagesBody').innerHTML = '<tr><td colspan="4">Error loading images</td></tr>';
    }
}



// Function to create image row
function createImageRow(imageData, docId) {
    const imagesBody = document.getElementById('imagesBody');
    
    const row = document.createElement('tr');
    
    // Image cell
    const imageCell = document.createElement('td');
    imageCell.className = 'image-cell';
    const img = document.createElement('img');
    img.src = imageData.url;
    img.alt = imageData.title;
    imageCell.appendChild(img);
    
    // Title cell
    const titleCell = document.createElement('td');
    titleCell.textContent = imageData.title;
    
    // Date cell
    const dateCell = document.createElement('td');
    dateCell.className = 'status-cell';
    if (imageData.createdAt) {
        const date = imageData.createdAt.toDate();
        dateCell.textContent = date.toLocaleDateString();
    } else {
        dateCell.textContent = 'Unknown date';
    }
    
    // Actions cell
    const actionsCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteImage(docId, imageData.fileName);
    actionsCell.appendChild(deleteBtn);
    
    // Append all cells to row
    row.appendChild(imageCell);
    row.appendChild(titleCell);
    row.appendChild(dateCell);
    row.appendChild(actionsCell);
    
    // Append row to table
    imagesBody.appendChild(row);
}



// preview image
function previewImage(event) {
    const preview = document.getElementById('imagePreview');
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = `<span>No preview</span>`;
    }
}

window.previewImage = previewImage;


let selectedFile = null;
let url;
const timestamp = Date.now();





uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // uploading
    submitBtn.disabled = true;
    submitBtn.textContent = "Uploading...."


    // Check authentication
    const user = auth.currentUser

    


    if (!user) {
        showStatusMessage("Please log in to upload images", "error")
        return
    }

    try {

        // Get form data
        const file = imageUploader.files[0];
        const title = document.getElementById("title").value.trim();

        if (!title.trim()) {
            showStatusMessage('Please enter a title.', 'error');
            return;
        }


        if (!file) {
            console.error("Please select a file.");
            showStatusMessage('Please select an image first', 'error');
            return;
        }

        if (!file.type.startsWith("image/")) {
            showStatusMessage("Please select a valid image file", "error")
            return
        }


        if (file && file.type.startsWith('image/')) {

            selectedFile = file;

            hideStatusMessage();
            
            const storageRef = ref(storage, 'uploads/' + file.name);
            const snapshot = await uploadBytes(storageRef, file);
            url = await getDownloadURL(snapshot.ref);
            console.log("File uploaded successfully:", url);

            // Store image data in localStorage
            const imageData = {
                url,
                filename: file.name,
                uploadTime: new Date().toISOString(),
                id: timestamp.toString()
            };
            

            // console.log("About to save to Firestore...");
            // console.log("Firestore save completed");
            // await addDoc(collection(db, "uploadsdb"), {
            //     title, url, createdAt: new Date()
            // });

            await addDoc(collection(db, "images"), {
                title, 
                url, 
                userId: user.uid,
                createdAt: new Date()
            })

            localStorage.setItem('uploadedImage', JSON.stringify(imageData));

            showStatusMessage('Image uploaded successfully!', 'success');

            

            uploadForm.reset();
            console.log("Form reset completed");



            console.log("Redirecting now...");

            // window.location.replace("index.html")

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        }

    } catch (error) {
        showStatusMessage(`Upload failed: ${error.message}`, `error`);
        console.error(`Upload error: ${error.message}`);
        if(submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
        }
    }
});




