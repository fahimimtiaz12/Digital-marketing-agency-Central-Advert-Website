/* --------------------------------------------------
   RESET + GLOBAL
-------------------------------------------------- */
@media (max-width: 600px) {
  body {
    font-size: 16px;
  }

  .container {
    width: 100%;
    padding: 0 10px;
  }
}
img {
  max-width: 100%;
  height: auto;
}

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins', sans-serif;
}

html{
    scroll-behavior:smooth;
}

body{
    background:#0f0f0f;
    color:white;
    overflow-x:hidden;
    transition:0.3s;
}

/* LIGHT MODE (SAFE, DOES NOT BREAK UI) */
body.light{
    background:#f5f5f5;
    color:#111;
}

/* --------------------------------------------------
   SCROLL PROGRESS BAR
-------------------------------------------------- */
#scrollProgress{
    position:fixed;
    top:0;
    left:0;
    height:4px;
    background:#0ef;
    width:0%;
    z-index:9999;
}

/* --------------------------------------------------
   PRELOADER
-------------------------------------------------- */
#preloader{
    position:fixed;
    inset:0;
    background:#000;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:2000;
}

.loader{
    width:50px;
    height:50px;
    border:5px solid #0ef;
    border-top-color:transparent;
    border-radius:50%;
    animation:spin 0.8s linear infinite;
}

@keyframes spin{
    100%{transform:rotate(360deg);}
}

/* --------------------------------------------------
   HEADER
-------------------------------------------------- */
#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 40px;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(10px);
  z-index: 999;
  border-bottom: 1.2px solid rgba(0,220,255,0.07);
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
}
body.team-page #header.header-hidden {
  transform: translateY(-100%);
  opacity: 0;
}

.header-left {
  position: relative;
  width: 220px;    /* Adjust as needed for your logo */
  height: 60px;    /* Adjust as needed for your logo */
  display: flex;
  align-items: center;
}

/* Canvas background for logo */
#logoCanvas {
  position: absolute;
  top: 0; left: 0;
  width: 220px;
  height: 60px;
  z-index: 0;
  pointer-events: none;
}

/* Logo stays above canvas */
.header-left .logo {
  position: absolute;
  left: 32px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  font-size: 2em;
  font-weight: bold;
  color: #fff;
  letter-spacing: 1.1px;
  padding-right: 24px;
}

.header-left .logo span {
  color: #0ef;
}

#navbar {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}
#navbar .nav-link {
  color: #eaf6ff;
  text-decoration: underline;
  text-underline-position: under;
  font-size: 1.08em;
  padding: 4px 0;
  transition: color 0.2s, text-shadow 0.2s;
  border-radius: 2px;
  letter-spacing: 0.03em;
}
#navbar .nav-link.active,
#navbar .nav-link:hover {
  color: #0ef;
  text-shadow: 0 2px 14px #0ef2, 0 0px 2px #a7cfff77;
  background: rgba(0,238,255,0.11);
}

.header-user {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(36,98,175,0.10);
  padding: 2px 8px 2px 10px;
  border-radius: 15px;
  box-shadow: 0 2px 10px 0 rgba(0,238,255,0.09);
  margin-left: 18px;
}
.welcome-banner {
  min-width: 170px;
  margin-right: 7px;
  margin-left: 0;
  font-weight: 600;
  color: #16213e;
  background: linear-gradient(92deg,#b9eaff 0%,#96defe 100%);
  border-radius: 12px;
  padding: 6px 19px 6px 16px;
  font-size: 1.01em;
  letter-spacing: .03em;
  text-align: left;
  box-shadow: 0 2px 8px #0deeff25,0 1px 2px #a0cfff3b;
  opacity: 1;
  transform: none;
  animation: none;
}
.logout-btn, .theme-btn {
  padding: 7px 17px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #a0cfff 60%, #0ef 120%);
  color: #232323;
  font-weight: bold;
  font-size: 1em;
  margin-left: 4px;
  margin-right: 2px;
  box-shadow: 0 1px 6px #0ef1;
  transition: background 0.16s, color 0.16s, box-shadow 0.13s;
  cursor: pointer;
}
.logout-btn:hover,
.theme-btn:hover {
  background: linear-gradient(90deg, #fff, #a0cfff 100%);
  color: #0ef;
  box-shadow: 0 2px 12px #0efc;
}
.theme-btn {
  font-size: 1.22em;
}

/* Responsive: Make sure nav and user panel stack on small screens */
@media (max-width: 950px) {
  #header {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 8px 18px 8px;
  }
 .header-left {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 64px;
  padding-left: 20px;
}


#logoCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 170px;
  height: 60px;
  z-index: 0;
  pointer-events: none;
}


 #navbar, .header-user {
    width: 100%;
    justify-content: flex-start;
  }
  #navbar {
    flex-wrap: wrap;
    gap: 10px;
  }
  .header-user {
    margin-left: 0;
  }
}

/* --------------------------------------------------
   PARTICLE CANVAS
-------------------------------------------------- */
#particleCanvas{
    position:fixed;
    inset:0;
    width:100%;
    height:100%;
    z-index:-1;
}


.welcome-banner {
  display: inline-block;
  margin: 8px 0 2px 0;
  padding: 7px 18px;
  border-radius: 14px;
  background: linear-gradient(90deg, #0ef 0%, #a0cfff 80%);
  box-shadow: 0 2px 7px #0ef2, 0 1px 4px #a0cfff;
  color: #151515;
  font-family: 'Poppins', sans-serif;
  font-size: 1.08em;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 5px #fafd;
  opacity: 0;
  transform: translateY(-12px) scale(0.97);
  animation: welcomeFadeIn 1.4s cubic-bezier(.45,1.4,.41,.95) forwards;
}
@keyframes welcomeFadeIn {
  from { opacity: 0; transform: translateY(-16px) scale(0.97);}
  to   { opacity: 1; transform: translateY(0) scale(1);}
}


.logout-btn {
  margin-left: 10px;
  padding: 6px 16px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(90deg, #a0cfff 60%, #0ef 120%);
  color: #222;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 1em;
  cursor: pointer;
  box-shadow: 0 1px 5px #0ef3;
  transition: background 0.16s, color 0.16s;
}
.logout-btn:hover {
  background: linear-gradient(90deg, #fff, #a0cfff);
  color: #0ef;
}

/* --------------------------------------------------
   HERO
-------------------------------------------------- */
.hero{
    padding:160px 10% 120px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:40px;
    min-height:100vh;
}

.hero-content{
    max-width:700px;
}

.typewriter{
    font-size:48px;
    min-height:120px;
    line-height:1.2;
}

.gradient-text{
    background:linear-gradient(45deg,#0ef,#4cf);
    -webkit-background-clip:text;
    color:transparent;
}

.hero p{
    margin-top:15px;
     margin-bottom:35px;
    max-width:500px;
    color:#ccc;
    font-size:18px;
    line-height:1.5;
}
.hero .btn {
    margin-top:0; /* reset if needed, the paragraph margin handles spacing */
}

.btn{
    padding:12px 25px;
    font-weight:600;
    background:#0ef;
    color:black;
    border:none;
    border-radius:6px;
    cursor:pointer;
    margin-top:20px;
}

.glow{
    box-shadow:0 0 15px #0ef;
}

.glow:hover{
    box-shadow:0 0 30px #0ef;
}

.counters{
    margin-top:35px;
    display:flex;
    gap:40px;
}

.counter{
    font-size:44px;
    font-weight:700;
    color:#0ef;
}

.hero-img img{
    width:420px;
    border-radius:12px;
    border:2px solid #0ef;
    box-shadow:0 0 25px rgba(0,255,255,0.4);
}

/* --------------------------------------------------
   GENERIC SECTIONS
-------------------------------------------------- */
.section{
    padding:80px 10%;
}

.section-title{
    font-size:36px;
    text-align:center;
    margin-bottom:18px;
}

.section-desc{
    max-width:700px;
    text-align:center;
    margin:auto;
    color:#ccc;
}

.dark{
    background:#151515;
}
/* --------------------------------------------------
   SERVICES
-------------------------------------------------- */
.services-grid{
    margin-top:50px;
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    gap:30px;
}

.service-card{
    background:#1b1b1b;
    padding:30px;
    border-radius:12px;
    border:1px solid #333;
    transition:0.3s;
    box-shadow:0 5px 25px rgba(0,0,0,0.3);
}

.service-card h3{
    color:#0ef;
    margin-bottom:10px;
}

.service-card:hover{
    transform:translateY(-8px);
    border-color:#0ef;
    box-shadow:0 0 25px rgba(0,255,255,0.4);
}

/* --------------------------------------------------
   MEDIA SECTION
-------------------------------------------------- */
.media-grid{
    margin-top:40px;
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(350px,1fr));
    gap:40px;
}

.media-box{
    background:#1b1b1b;
    padding:25px;
    border-radius:12px;
    border:1px solid #333;
    transition:0.3s;
}

.media-box h3{
    color:#0ef;
    margin-bottom:10px;
}

.media-box:hover{
    transform:translateY(-8px);
    border-color:#0ef;
    box-shadow:0 0 25px rgba(0,255,255,0.4);
}

audio, video{
    width:100%;
    margin-top:10px;
    border-radius:10px;
    border:1px solid #333;
}

/* --------------------------------------------------
   PRICING
-------------------------------------------------- */
.pricing-grid{
    margin-top:40px;
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    gap:30px;
}

.price-card{
    background:#1b1b1b;
    padding:25px;
    border-radius:12px;
    border:1px solid #333;
    text-align:center;
    transition:0.3s;
}

.price-card h3{
    color:white;
}

.price-card h1{
    font-size:40px;
    margin:15px 0;
    color:#0ef;
}

.price-card ul{
    margin:15px 0;
    color:#ccc;
    list-style:none;
}

.price-card:hover{
    transform:translateY(-8px);
    border-color:#0ef;
    box-shadow:0 0 25px rgba(0,255,255,0.4);
}

.recommended{
    transform:scale(1.06);
    border-color:#0ef;
    box-shadow:0 0 40px rgba(0,255,255,0.5);
}

/* --------------------------------------------------
   TESTIMONIALS
-------------------------------------------------- */
.testimonial-box{
    background:#1b1b1b;
    padding:30px;
    border-radius:12px;
    border:1px solid #333;
    text-align:center;
    color:#ddd;
    box-shadow:0 0 20px rgba(0,255,255,0.2);
}

.swiper-pagination-bullet{
    background:#0ef;
}

/* --------------------------------------------------
   GALLERY
-------------------------------------------------- */
.gallery-grid{
    margin-top:50px;
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
    gap:25px;
}

.gallery-grid img{
    width:100%;
    height:220px;
    object-fit:cover;
    border-radius:12px;
    border:1px solid #333;
    transition:0.3s ease;
}

.gallery-grid img:hover{
    transform:scale(1.08);
    border-color:#0ef;
    box-shadow:0 15px 45px rgba(0,255,255,0.35);
}

/* --------------------------------------------------
   CONTACT FORM
-------------------------------------------------- */
.contact-form{
    margin:auto;
    max-width:700px;
    display:flex;
    flex-direction:column;
    gap:15px;
}

.contact-form input,
.contact-form textarea{
    padding:12px;
    background:#1b1b1b;
    border:1px solid #333;
    border-radius:6px;
    color:white;
    font-size:16px;
}

.contact-form textarea{
    height:140px;
}

/* --------------------------------------------------
   FOOTER
-------------------------------------------------- */
footer{
    background:black;
    padding:20px;
    text-align:center;
    color:#aaa;
    font-size:15px;
    margin-top:60px;
}

/* --------------------------------------------------
   RESPONSIVE
-------------------------------------------------- */
@media (max-width:900px){
    header{
        padding:18px 20px;
    }

    nav{
        display:none;
    }

    .hero{
        flex-direction:column;
        text-align:center;
    }

    .hero-img img{
        width:300px;
    }

    .counters{
        justify-content:center;
        gap:20px;
    }
}
/* ==================================================
   TEAM PAGE — SAFE, ISOLATED, WILL NOT AFFECT HOMEPAGE
================================================== */

body.team-page{
    background:#0f0f0f !important;
    padding-top: 0;
    color:white !important;
    overflow-x: hidden;
}

/* Team hero */
.team-hero {
  padding-top: 120px;
  padding-bottom: 60px; /* Make this match your header height */
  text-align: center;
   animation: fadeInUp 1s ease;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* Team Section Title */
.team-page .team-title{
    text-align:center;
    font-size:48px;
    margin-top:20px;
    margin-bottom:10px;
    background:linear-gradient(45deg,#0ef,#4cf);
    -webkit-background-clip:text;
    color:transparent;
}

.team-page .team-grid{
    opacity:1 !important;
    transform:none !important;
}

/* Optional: Make each team card fully visible from start */
.team-page .team-card{
    opacity:1 !important;
    transform:none !important;
}

.team-page .team-subtitle{
    text-align:center;
    color:#ccc;
    margin-bottom:20px;
    font-size:18px;
}

/* GRID */
.team-page .team-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    gap:40px;
    padding:0;
    opacity: 1 !important;
    transform: none !important;
}

/* --------------------------------------------------
   TEAM CARDS (Glassmorphism + Neon Border)
-------------------------------------------------- */
.team-page .team-card{
    position:relative;
    background:rgba(255,255,255,0.05);
    backdrop-filter:blur(10px);
    padding:30px;
    border-radius:16px;
    border:2px solid rgba(0,255,255,0.25);
    text-align:center;
    transition:0.35s;
    overflow:hidden;
    transform-style:preserve-3d;
    box-shadow:0 0 25px rgba(0,255,255,0.25);
}

/* Neon animated border */
.team-page .team-card::before {
    content:"";
    position:absolute;
    inset:0;
    background:linear-gradient(135deg,#0ef,#00e6ff,#0ef);
    padding:2px;
    border-radius:16px;
    -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
    -webkit-mask-composite:xor;
    animation:neonRotate 5s linear infinite;
    pointer-events: none;  /* <- add this */
}


@keyframes neonRotate{
    0%{filter:hue-rotate(0deg);}
    100%{filter:hue-rotate(360deg);}
}

/* Card Hover (3D Tilt + Glow) */
.team-page .team-card:hover{
    transform:rotateY(10deg) rotateX(6deg) scale(1.05);
    box-shadow:0 0 40px rgba(0,255,255,0.55);
}

/* Member Image */
.team-page .team-card img{
    width:120px;
    height:120px;
    border-radius:50%;
    border:2px solid #0ef;
    object-fit:cover;
    margin-bottom:15px;
}

/* --------------------------------------------------
   CEO — Highlighted Larger Card
-------------------------------------------------- */
.team-page .team-ceo{
    grid-column:span 2;
    transform:scale(1.15);
    border-color:#00eaff;
    box-shadow:0 0 50px rgba(0,255,255,0.7);
}

.team-page .team-ceo img{
    width:160px;
    height:160px;
}

/* CEO Signature */
.signature{
    width:140px;
    opacity:0.9;
    margin:12px auto 0;
    display:block;
}

/* Badge */
.team-page .badge{
    position:absolute;
    top:12px;
    right:12px;
    background:#0ef;
    color:black;
    padding:6px 15px;
    border-radius:20px;
    font-size:13px;
    font-weight:700;
}

/* Social Icons */
.team-page .team-social{
    margin-top:10px;
}

.team-page .team-social a{
    font-size:20px;
    margin:0 6px;
    color:#0ef;
    transition:0.3s;
}

.team-page .team-social a:hover{
    color:white;
    text-shadow:0 0 10px #0ef;
}

/* View Profile Button */
.team-page .view-profile{
    margin-top:12px;
    padding:10px 22px;
    background:#0ef;
    border:none;
    border-radius:8px;
    color:black;
    font-weight:600;
    cursor:pointer;
    transition:0.3s;
}

.team-page .view-profile:hover{
    box-shadow:0 0 20px #0ef;
}


/* --------------------------------------------------
   TEAM PROFILE MODAL
-------------------------------------------------- */
.team-modal{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.85);
    display:flex;
    justify-content:center;
    align-items:center;
    visibility:hidden;
    opacity:0;
    transition:0.3s;
    z-index:9999;
}

.team-modal.active{
    visibility:visible;
    opacity:1;
}

.team-modal-content{
    width:360px;
    background:rgba(255,255,255,0.1);
    backdrop-filter:blur(14px);
    padding:30px;
    border-radius:16px;
    border:2px solid #0ef;
    animation:modalPop 0.35s ease;
}

@keyframes modalPop{
    0%{transform:scale(0.6);}
    100%{transform:scale(1);}
}

.team-modal-content img{
    width:150px;
    height:150px;
    border-radius:50%;
    border:3px solid #0ef;
    object-fit:cover;
    margin:auto;
    display:block;
}

.team-modal-content h2{
    margin-top:15px;
    text-align:center;
    color:#0ef;
}

.team-modal-content p{
    color:#ddd;
    margin-top:10px;
    text-align:center;
    line-height:1.6;
    font-size:15px;
}

.modal-close{
    margin-top:15px;
    width:100%;
    background:#0ef;
    padding:10px;
    border:none;
    border-radius:8px;
    font-weight:600;
    cursor:pointer;
    color:black;
} 

/* ==================== CLEAN HEADER UPGRADE ==================== */

/* Reduce nav link density */
#navbar {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  align-items: center;
  max-width: 800px; /* Prevents overflow on wide screens */
}

/* Hide "extra" links on medium screens */
@media (max-width: 1100px) {
  .nav-extra {
    display: none;
  }
}

/* Auth links styled like buttons */
.auth-link {
  display: inline-block;
  padding: 6px 16px;
  background: transparent;
  color: #0ef;
  text-decoration: none;
  border: 1px solid #0ef;
  border-radius: 20px;
  font-size: 0.95em;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.auth-link:hover {
  background: #0ef;
  color: #000;
  box-shadow: 0 0 12px rgba(0, 238, 255, 0.6);
}

/* Ensure user panel aligns nicely */
.header-user {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(36, 98, 175, 0.1);
  padding: 4px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 238, 255, 0.1);
}

/* Mobile: stack header vertically */
@media (max-width: 950px) {
  #header {
    flex-wrap: wrap;
    padding: 12px 15px;
    gap: 12px;
  }
  .header-left {
    width: auto;
    height: auto;
    justify-content: flex-start;
  }
  #logoCanvas {
    width: 160px;
    height: 50px;
  }
  .header-left .logo {
    font-size: 1.6em;
    left: 24px;
  }
  #navbar {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    gap: 10px;
  }
  .header-user {
    margin-left: 0;
    order: 2;
  }
}


/* ==================== NEWSLETTER POPUP ==================== */

.newsletter-popup {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    animation: fadeIn 0.5s ease-out;
}

.popup-content {
    background: #111;
    border: 2px solid #0ef;
    border-radius: 16px;
    box-shadow: 0 0 40px rgba(0, 238, 255, 0.4);
    width: 90%;
    max-width: 600px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20px;
}

@media (max-width: 768px) {
    .popup-content {
        flex-direction: column;
        padding: 15px;
    }
}

.popup-image {
    flex: 0 0 40%;
    overflow: hidden;
    border-radius: 12px;
    position: relative;
}

.popup-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.8);
}

.popup-text {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.popup-text h3 {
    color: #0ef;
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.popup-text p {
    color: #ccc;
    margin-bottom: 20px;
    line-height: 1.5;
}

#newsletterForm {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#newsletterForm input {
    padding: 12px;
    background: #222;
    border: 1px solid #333;
    border-radius: 6px;
    color: white;
    font-size: 1rem;
}

#newsletterForm button {
    padding: 12px;
    background: #0ef;
    color: black;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
}

#newsletterForm button:hover {
    background: #00e6ff;
    box-shadow: 0 0 15px rgba(0, 238, 255, 0.6);
}

.close-btn-small {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #ff6b81; /* Soft pink */
    color: white;
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    box-shadow: 0 0 4px rgba(255, 107, 129, 0.5);
}

.close-btn-small:hover {
    background: #ff4757; /* Darker pink on hover */
     transform: scale(1.1);
    box-shadow: 0 0 8px rgba(255, 71, 87, 0.8);
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1); }
}
 

/* ==================== DEMO PURCHASE NOTIFICATION ==================== */

.demo-popup {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 9998;
    animation: slideInLeft 0.4s ease-out;
}

.demo-content {
    background: #1a1a1a;
    border: 1px solid #0ef;
    border-radius: 10px;
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 280px;
    box-shadow: 0 4px 12px rgba(0, 238, 255, 0.2);
}

.product-icon {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    object-fit: cover;
}

.demo-text p {
    margin: 0;
    font-size: 0.85rem;
    color: #ccc;
}

.demo-text h4 {
    margin: 4px 0;
    font-size: 0.95rem;
    color: #0ef;
    font-weight: 600;
}

.demo-text .time-ago {
    font-size: 0.75rem;
    color: #777;
}

.demo-close {
    background: rgba(255, 107, 129, 0.2);
    color: white;
    border: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 0.8rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.demo-close:hover {
    background: #ff6b81;
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
