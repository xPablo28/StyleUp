// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAre9HKNJ5UZooyQLB6jD1euE6AicNh23U",
  authDomain: "styleup-ec638.firebaseapp.com",
  projectId: "styleup-ec638",
  storageBucket: "styleup-ec638.firebasestorage.app",
  messagingSenderId: "67635686490",
  appId: "1:67635686490:web:502ebe92d453d6ff3e3c63",
  measurementId: "G-KKV45GS5D0"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Event Adding and Retrieval
document.getElementById("addEvent").addEventListener("click", () => {
  const eventInput = document.getElementById("eventInput").value;
  if (eventInput) {
    const eventRef = database.ref("events").push();
    eventRef.set({
      name: eventInput,
      timestamp: new Date().toISOString(),
    });
    alert("Event added!");
  }
});

document.getElementById("getEventSuggestions").addEventListener("click", () => {
  const eventSuggestionsDiv = document.getElementById("eventSuggestions");
  eventSuggestionsDiv.innerHTML = "Loading...";
  database
    .ref("events")
    .once("value")
    .then((snapshot) => {
      const events = snapshot.val();
      eventSuggestionsDiv.innerHTML = events
        ? Object.values(events)
            .map((event) => `<p>${event.name}</p>`)
            .join("")
        : "No events found.";
    });
});

// Canvas Drawing
const canvas = document.getElementById("designCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", () => (drawing = true));
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  ctx.fillStyle = document.getElementById("colorPicker").value;
  ctx.fillRect(e.offsetX, e.offsetY, 2, 2);
});

// Clear Canvas
document.getElementById("clearCanvas").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const designsRef = db.collection('designs');

document.getElementById('saveDesign').addEventListener('click', async () => {
  const canvasData = canvas.toDataURL();
  const storageRef = storage.ref(`designs/${Date.now()}.png`);

  // Convert data URL to Blob
  const response = await fetch(canvasData);
  const blob = await response.blob();

  // Upload to Storage
  await storageRef.put(blob);
  const designUrl = await storageRef.getDownloadURL();

  // Save to Firestore
  await designsRef.add({ designUrl, timestamp: Date.now() });

  alert('Design saved successfully!');
});


// script.js
// ... (other JavaScript code)

// Add a new user document
const db = firebase.firestore();
const userRef = db.collection('users').doc('user1');
userRef.set({
  username: 'fashionista',
  email: 'fashionista@example.com',
  preferences: ['dresses', 'accessories']
});

const eventRef = db.collection('events');

// Populate events in Firestore (one-time setup, run in console)
// const populateEvents = async () => {
//   await eventRef.doc('wedding').set({ suggestions: ['Elegant gown', 'Heels', 'Clutch purse'] });
//   await eventRef.doc('party').set({ suggestions: ['Sparkly dress', 'Statement jewelry', 'High heels'] });
//   await eventRef.doc('interview').set({ suggestions: ['Blazer', 'Dress pants', 'Simple accessories'] });
// };
// populateEvents();

document.getElementById('getEventSuggestions').addEventListener('click', async () => {
  const event = eventInput.value.trim().toLowerCase();
  const doc = await eventRef.doc(event).get();

  if (doc.exists) {
    const suggestions = doc.data().suggestions;
    eventSuggestions.innerHTML = `
      <h3>Suggestions for ${event}:</h3>
      <ul>${suggestions.map((item) => `<li>${item}</li>`).join('')}</ul>
    `;
  } else {
    eventSuggestions.innerHTML = `<p>No suggestions available for this event.</p>`;
  }
});


const storage = firebase.storage();
const uploadDressesRef = db.collection('uploadedDresses');

document.getElementById('getUploadSuggestions').addEventListener('click', async () => {
  const file = uploadInput.files[0];
  if (!file) {
    alert('Please upload a file!');
    return;
  }

  const storageRef = storage.ref(`dresses/${file.name}`);
  await storageRef.put(file);
  const imageUrl = await storageRef.getDownloadURL();

  // Save to Firestore
  await uploadDressesRef.add({ imageUrl, timestamp: Date.now() });

  uploadSuggestions.innerHTML = `
    <h3>Uploaded successfully!</h3>
    <p>Matching suggestions:</p>
    <ul>
      <li>Matching heels</li>
      <li>Gold clutch</li>
      <li>Statement earrings</li>
    </ul>
  `;
});


// Load Sample Dress
document.getElementById("loadSample").addEventListener("click", () => {
  const img = new Image();
  img.src = "https://via.placeholder.com/800x400?text=Sample+Dress";
  img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
});
