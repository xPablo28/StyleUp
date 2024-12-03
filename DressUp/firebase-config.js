 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAre9HKNJ5UZooyQLB6jD1euE6AicNh23U",
  authDomain: "styleup-ec638.firebaseapp.com",
  projectId: "styleup-ec638",
  storageBucket: "styleup-ec638.firebasestorage.app",
  messagingSenderId: "67635686490",
  appId: "1:67635686490:web:502ebe92d453d6ff3e3c63",
  measurementId: "G-KKV45GS5D0"
}
// firebase.js
// ... (other Firebase code)

// Add a new user document
const db = firebase.firestore();
const usersRef = db.collection('users');
const newUserRef = usersRef.doc(); // Automatically generates a unique document ID

newUserRef.set({
  username: 'fashionista',
  email: 'fashionista@example.com',
  preferences: ['dresses', 'accessories']
})
.then(() => {
  console.log('User added successfully!');
})
.catch(error => {
  console.error('Error adding user:', error);
});

const eventRef = db.collection('events');

document.getElementById('getEventSuggestions').addEventListener('click', async () => {
  const event = document.getElementById('eventInput').value.trim().toLowerCase();
  const doc = await eventRef.doc(event).get();

  if (doc.exists) {
    const suggestions = doc.data().suggestions;
    document.getElementById('eventSuggestions').innerHTML = `
      <h3>Suggestions for ${event}:</h3>
      <ul>${suggestions.map((item) => `<li>${item}</li>`).join('')}</ul>
    `;
  } else {
    document.getElementById('eventSuggestions').innerHTML = `<p>No suggestions available for this event.</p>`;
  }
});
