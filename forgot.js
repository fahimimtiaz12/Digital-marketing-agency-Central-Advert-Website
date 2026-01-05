// Canvas logo
window.addEventListener('load', () => {
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
// Firebase forgot‑password logic
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyB-nX2AYq3awQKX86OynEkgmofL6wNJEJ4",
  authDomain: "central-advert.firebaseapp.com",
  projectId: "central-advert",
  storageBucket: "central-advert.firebasestorage.app",
  messagingSenderId: "876770335760",
  appId: "1:876770335760:web:fb87b8c0db3b5af8793e95",
  measurementId: "G-07J778SEF9"
};
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const emailInput = document.getElementById('resetEmail');
const btn        = document.getElementById('resetBtn');
const msg        = document.getElementById('resetMsg');
btn.addEventListener('click', async () => {
  msg.textContent = '';
  const email = emailInput.value.trim();

  if (!email) {
    msg.style.color = '#ff8b8b';
    msg.textContent = 'Please enter your email.';
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    msg.style.color = '#7CFF8B';
    msg.textContent = 'If this email is registered, a reset link has been sent.';
  } catch (err) {
    msg.style.color = '#ff8b8b';
    msg.textContent = err.message;
  }
});
