// Draw Central Advert logo on canvas
window.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('logoCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 180, 0);
  gradient.addColorStop(0, '#0ef');
  gradient.addColorStop(0.5, '#a0cfff');
  gradient.addColorStop(1, '#4cf');

  ctx.shadowColor = '#0ef';
  ctx.shadowBlur = 12;

  ctx.fillStyle = gradient;
  ctx.font = 'bold 22px Poppins, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('Central', 8, 25);

  ctx.shadowBlur = 18;
  ctx.font = 'bold 20px Poppins, sans-serif';
  ctx.fillText('Advert', 8, 42);

  ctx.shadowBlur = 6;
  ctx.strokeStyle = 'rgba(14, 238, 255, 0.4)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(8, 46);
  ctx.lineTo(160, 46);
  ctx.stroke();

  ctx.shadowBlur = 0;
});

// Firebase login logic (module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-nX2AYq3awQKX86OynEkgmofL6wNJEJ4",
  authDomain: "central-advert.firebaseapp.com",
  projectId: "central-advert",
  storageBucket: "central-advert.firebasestorage.app",
  messagingSenderId: "876770335760",
  appId: "1:876770335760:web:fb87b8c0db3b5af8793e95",
  measurementId: "G-07J778SEF9"
};

const app      = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth     = getAuth(app);
const db       = getFirestore(app);

const loginForm  = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.textContent = '';

  const identifier = document.getElementById('username').value.trim(); // email OR username
  const password   = document.getElementById('password').value;

  if (!identifier) {
    loginError.textContent = 'Please enter email or username.';
    return;
  }

  try {
    let emailToUse = identifier;

    // If it doesn't look like an email, treat it as username
    if (!identifier.includes('@')) {
      const docRef = doc(db, "usernames", identifier.toLowerCase());
      const snap   = await getDoc(docRef);

      if (!snap.exists()) {
        loginError.textContent = 'Username not found.';
        return;
      }

      emailToUse = snap.data().email;
    }

    // Log in using email + password
    const cred = await signInWithEmailAndPassword(auth, emailToUse, password);
    const user = cred.user;

    // Decide name for greeting
    let nameForGreeting = identifier;

    // If user typed email, fetch username by uid
    if (identifier.includes('@')) {
      try {
        const userDoc = await getDoc(doc(db, "userByUid", user.uid));
        if (userDoc.exists() && userDoc.data().username) {
          nameForGreeting = userDoc.data().username;
        } else {
          nameForGreeting = user.email;
        }
      } catch (e) {
        nameForGreeting = user.email;
      }
    }

    // Save username for greeting
    localStorage.setItem('currentUser', nameForGreeting);
    window.location.href = 'index.html';

  } catch (err) {
    loginError.textContent = err.message;
  }
});

// Show / hide password button
document.querySelectorAll('.toggle-pass').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    if (!input) return;

    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = '🙈';
    } else {
      input.type = 'password';
      btn.textContent = '👁️';
    }
  });
});
