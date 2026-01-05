// Draw Central Advert logo on canvas
window.addEventListener('load', function () {
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

// Firebase sign-up logic (module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-nX2AYq3awQKX86OynEkgmofL6wNJEJ4",
  authDomain: "central-advert.firebaseapp.com",
  projectId: "central-advert",
  storageBucket: "central-advert.firebasestorage.app",
  messagingSenderId: "876770335760",
  appId: "1:876770335760:web:fb87b8c0db3b5af8793e95",
  measurementId: "G-07J778SEF9"
};

// Initialize Firebase, Auth, Firestore
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// Form elements
const form       = document.getElementById('signupForm');
const usernameInp = document.getElementById('newuser');
const emailInp    = document.getElementById('newemail');
const passInp     = document.getElementById('newpass');
const pass2Inp    = document.getElementById('newpass2');
const errorP      = document.getElementById('signupError');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorP.textContent = '';

  const username = usernameInp.value.trim();
  const email    = emailInp.value.trim();
  const pass1    = passInp.value;
  const pass2    = pass2Inp.value;

  if (!username) {
    errorP.textContent = 'Username is required.';
    return;
  }
  if (pass1 !== pass2) {
    errorP.textContent = 'Passwords do not match.';
    return;
  }

  try {
    // 1) Create user in Firebase Authentication
    const cred = await createUserWithEmailAndPassword(auth, email, pass1);
    const user = cred.user;

    // 2) Save username → email mapping in Firestore
    await setDoc(doc(db, "usernames", username.toLowerCase()), {
      username: username,
      email: email,
      uid: user.uid
    });

    // uid -> username
    await setDoc(doc(db, "userByUid", user.uid), {
      username: username,
      email: email
    });

    // 3) Optional: remember username locally
    localStorage.setItem('currentUser', username);

    alert('Account created! You can log in with email OR username.');
    window.location.href = 'login.html';
  } catch (err) {
    errorP.textContent = err.message;
  }
});

// Show / hide password buttons
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
