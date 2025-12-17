/* --------------------------------------------------
   PRELOADER
-------------------------------------------------- */
window.onload = () => {
    document.getElementById("preloader").style.display = "none";
    AOS.init();
};

window.addEventListener("DOMContentLoaded", function() {
  const user = localStorage.getItem("currentUser");
  const greeting = document.getElementById("user-greeting");
  const logoutBtn = document.getElementById("logout-btn");
  const urlParams = new URLSearchParams(window.location.search);
  const userPlan = urlParams.get("plan");

  if (user) {
    if (userPlan) {
      greeting.innerHTML = `Welcome, ${user} — Plan: ${userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}`;
    } else {
      greeting.innerHTML = `Welcome, ${user}!`;
    }
    greeting.style.display = "inline-block";
    logoutBtn.style.display = "inline-block";

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
          .then(res => res.json())
          .then(data => {
            const city = data.city || data.locality || data.principalSubdivision || '';
            const country = data.countryName || '';
            let locationDisplay = '';
            if (city && country) {
              locationDisplay = `${city}, ${country}`;
            } else if (country) {
              locationDisplay = country;
            } else {
              locationDisplay = `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
            }
            greeting.innerHTML += `<br>Location: ${locationDisplay}`;
            // Save to login history
            let loginLocations = JSON.parse(localStorage.getItem("loginLocations") || "[]");
            loginLocations.push({
              date: new Date().toLocaleString(),
              location: locationDisplay
            });
            localStorage.setItem("loginLocations", JSON.stringify(loginLocations));
          });
      });
    }
  } else {
    greeting.style.display = "none";
    logoutBtn.style.display = "none";
  }

  logoutBtn.onclick = function() {
    localStorage.removeItem("currentUser");
    location.reload();
  };
});



/* --------------------------------------------------
   SCROLL PROGRESS BAR
-------------------------------------------------- */
window.addEventListener("scroll", () => {
    const progress = document.getElementById("scrollProgress");
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progressWidth = (window.pageYOffset / totalHeight) * 100;
    progress.style.width = progressWidth + "%";
});


/* --------------------------------------------------
   TYPEWRITER TEXT
-------------------------------------------------- */
const typewriterText = [
    "Grow Your Business",
    "With Central Advert",
    "World’s #1 Digital Agency",
    "CEO: Md Fahim Imtiaz Khan"
];

let typeIndex = 0;
let charIndex = 0;
let currentText = "";
let typeInterval;

function typeWriter() {
    currentText = typewriterText[typeIndex];
    document.querySelector(".typewriter").textContent = currentText.substring(0, charIndex);
    charIndex++;

    if (charIndex > currentText.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
            typeIndex = (typeIndex + 1) % typewriterText.length;
            charIndex = 0;
            typeInterval = setInterval(typeWriter, 80);
        }, 1500);
    }
}

typeInterval = setInterval(typeWriter, 80);


/* --------------------------------------------------
   LIGHT / DARK MODE
-------------------------------------------------- */
const themeToggle = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});


/* --------------------------------------------------
   SMOOTH SCROLLING
-------------------------------------------------- */
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", evt => {
        const href = link.getAttribute("href");

        // Only smooth scroll for anchors within the same page
        if (href.startsWith("#")) {
            evt.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
        // For external pages (like team.html), default behavior happens automatically
    });
});


/* --------------------------------------------------
   ACTIVE NAVBAR HIGHLIGHT (SCROLL SPY)
-------------------------------------------------- */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});


/* --------------------------------------------------
   COUNTER ANIMATION
-------------------------------------------------- */
const counters = document.querySelectorAll(".counter");

function startCounters(){
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const duration = 3000; // total animation time in ms (3 seconds)
        const intervalTime = 20; // update every 20ms
        const steps = duration / intervalTime; // number of steps
        const increment = target / steps;

        function update(){
            count += increment;
            if(count < target){
                counter.textContent = Math.ceil(count);
                setTimeout(update, intervalTime);
            } else {
                counter.textContent = target;
            }
        }
        update();
    });
}

// Start counters immediately on page load
window.addEventListener("DOMContentLoaded", startCounters);




/* --------------------------------------------------
   GALLERY POPUP
-------------------------------------------------- */
document.querySelectorAll(".gallery-grid img").forEach(img => {
    img.addEventListener("click", () => openPopup(img.src));
});

function openPopup(src){
    const popup = document.createElement("div");
    popup.className = "img-popup";
    popup.innerHTML = `
        <div class="img-popup-content">
            <img src="${src}">
            <span class="close-btn">&times;</span>
        </div>
    `;
    document.body.appendChild(popup);

    popup.querySelector(".close-btn").onclick = () => popup.remove();
    popup.onclick = (e) => { if(e.target === popup) popup.remove(); };
}

const popupStyle = document.createElement("style");
popupStyle.innerHTML = `
.img-popup{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.92);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:3000;
}
.img-popup-content img{
    max-width:90%;
    max-height:90%;
    border-radius:10px;
    border:2px solid #0ef;
}
.close-btn{
    position:absolute;
    top:-10px;
    right:-10px;
    width:35px;
    height:35px;
    background:#0ef;
    color:black;
    border-radius:50%;
    font-size:22px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
}
`;
document.head.appendChild(popupStyle);

/* --------------------------------------------------
   CONTACT FORM: LOCAL STORAGE + FORMSPREE SUBMISSION
-------------------------------------------------- */
const nameField = document.getElementById("nameField");
const emailField = document.getElementById("emailField");
const msgField = document.getElementById("msgField");

// Restore saved data on page load
nameField.value = localStorage.getItem("savedName") || "";
emailField.value = localStorage.getItem("savedEmail") || "";
msgField.value = localStorage.getItem("savedMsg") || "";

// Save to localStorage as user types
nameField.addEventListener("input", () => {
    localStorage.setItem("savedName", nameField.value);
});
emailField.addEventListener("input", () => {
    localStorage.setItem("savedEmail", emailField.value);
});
msgField.addEventListener("input", () => {
    localStorage.setItem("savedMsg", msgField.value);
});

// Handle real form submission
document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = msgField.value.trim();

    // Validation
    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Show sending state (optional but nice)
    const submitBtn = document.querySelector("#contactForm .btn");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://formspree.io/f/xldqvkww", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
            alert("✅ Message sent successfully! We'll get back to you soon.");
            localStorage.clear();
            document.getElementById("contactForm").reset();
        } else {
            alert("❌ Failed to send. Please try again later.");
            console.error("Formspree error:", await response.text());
        }
    } catch (err) {
        alert("⚠️ Network error. Check your internet and try again.");
        console.error("Network error:", err);
    } finally {
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});


/* --------------------------------------------------
   FOOTER CANVAS ANIMATION
-------------------------------------------------- */
const canvas = document.getElementById("agencyCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 230;

let x = 0;

function animateCanvas(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#0ef";
    ctx.beginPath();
    ctx.arc(x, 115, 12, 0, Math.PI * 2);
    ctx.fill();

    x += 2.5;
    if(x > canvas.width) x = 0;

    requestAnimationFrame(animateCanvas);
}
animateCanvas();


/* --------------------------------------------------
   SWIPER TESTIMONIAL SLIDER
-------------------------------------------------- */
const swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: { delay: 3000 },
    pagination: { el: ".swiper-pagination", clickable: true }
});


/* --------------------------------------------------
   TILT HOVER EFFECT (3D tilt)
-------------------------------------------------- */
document.querySelectorAll(".tilt").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;

        card.style.transform = `rotateX(${-y/20}deg) rotateY(${x/20}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
});


// Handle auth UI
function updateAuthUI() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userGreeting = document.getElementById("user-greeting");
  const logoutBtn = document.getElementById("logout-btn");
  const loginLink = document.getElementById("loginLink");
  const signupLink = document.getElementById("signupLink");

  if (user) {
    userGreeting.textContent = `Welcome, ${user.name}!`;
    userGreeting.style.display = "block";
    logoutBtn.style.display = "block";
    if (loginLink) loginLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
  } else {
    if (loginLink) loginLink.style.display = "block";
    if (signupLink) signupLink.style.display = "block";
    userGreeting.style.display = "none";
    logoutBtn.style.display = "none";
  }
}

// Run on load
document.addEventListener("DOMContentLoaded", updateAuthUI);

// Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
  localStorage.removeItem("user");
  updateAuthUI();
  window.location.reload(); // Optional
});

// Show newsletter popup after 10 seconds
setTimeout(() => {
    const popup = document.getElementById("newsletterPopup");
    if (popup && !localStorage.getItem("newsletterDismissed")) {
        popup.style.display = "flex";
    }
}, 3000); // 3 seconds

// Close popup
function closeNewsletter() {
    const popup = document.getElementById("newsletterPopup");
    if (popup) {
        popup.style.display = "none";
        localStorage.setItem("newsletterDismissed", "true"); // Don't show again
    }
}

// Handle form submission (optional - send to Formspree)
document.getElementById("newsletterForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.querySelector("input").value.trim();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    try {
        const response = await fetch("https://formspree.io/f/xldqvkww", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, source: "newsletter-popup" })
        });

        if (response.ok) {
            alert("✅ Thanks for subscribing! Check your inbox for our welcome gift.");
            closeNewsletter();
        } else {
            alert("❌ Something went wrong. Please try again.");
        }
    } catch (err) {
        alert("⚠️ Network error. Please try again later.");
    }
});


// Define your plans
const plans = [
    { name: "Starter Plan", price: "$99", color: "#0ef" },
    { name: "Professional Plan", price: "$199", color: "#0ef" },
    { name: "Enterprise Plan", price: "$399", color: "#0ef" }
];

// Sample locations (for realism)
const locations = ["New York", "London", "Tokyo", "Sydney", "Paris", "Berlin", "Dhaka", "Mumbai", "Singapore", "Toronto"];

function showDemoPopup() {
    const popup = document.getElementById("demoPopup");
    if (!popup) return;

    // Pick random plan and location
    const plan = plans[Math.floor(Math.random() * plans.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const minutesAgo = Math.floor(Math.random() * 5) + 1;

    // Update content
    document.getElementById("popupLocation").textContent = location;
    document.getElementById("popupPlan").textContent = plan.name;
    document.getElementById("popupTime").textContent = `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''}`;

    // Optional: Change icon color based on plan (if you want to get fancy)
    // document.querySelector(".product-icon").style.backgroundColor = plan.color;

    // Show popup
    popup.style.display = "block";

    // Auto hide after 4 seconds
    setTimeout(() => {
        popup.style.display = "none";
    }, 4000);
}

function closeDemoPopup() {
    const popup = document.getElementById("demoPopup");
    if (popup) popup.style.display = "none";
}

// Start showing every 5 seconds
setInterval(showDemoPopup, 5000);

// Show first one after 3 seconds
setTimeout(showDemoPopup, 3000);


/* --------------------------------------------------
   FLOATING PARTICLES BACKGROUND
-------------------------------------------------- */
const particleCanvas = document.getElementById("particleCanvas");
const pctx = particleCanvas.getContext("2d");

particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

const particles = [];

for(let i = 0; i < 80; i++){
    particles.push({
        x: Math.random()*particleCanvas.width,
        y: Math.random()*particleCanvas.height,
        size: Math.random()*3 + 1,
        speedX: Math.random()*0.6 - 0.3,
        speedY: Math.random()*0.6 - 0.3
    });
}

function animateParticles(){
    pctx.clearRect(0,0,particleCanvas.width,particleCanvas.height);

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if(p.x < 0 || p.x > particleCanvas.width) p.speedX *= -1;
        if(p.y < 0 || p.y > particleCanvas.height) p.speedY *= -1;

        pctx.fillStyle = "#0ef";
        pctx.shadowBlur = 20;
        pctx.shadowColor = "#0ef";

        pctx.beginPath();
        pctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        pctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();


