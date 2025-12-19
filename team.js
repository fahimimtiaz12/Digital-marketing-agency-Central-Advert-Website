/* --------------------------------------------------
   AOS INIT
-------------------------------------------------- */
AOS.init({
    once: false,      // animate every time element scrolls into view
    mirror: true,     // animate elements when scrolling past in opposite direction
    startEvent: 'DOMContentLoaded'
});

window.addEventListener('load', () => {
    AOS.refresh();
});


/* --------------------------------------------------
   TEAM MEMBER DATA (Modal Info)
-------------------------------------------------- */
const members = [
    {
        img: "media/ceo.jpg",
        name: "MD Fahim Imtiam Khan",
        role: "Founder & CEO",
        bio: "A visionary leader focused on scaling businesses through digital marketing, performance ads, branding, and AI-driven growth strategies.",
        linkedin: "https://www.linkedin.com/in/md-fahim-imtiaz-khan-7558782ab/",
        instagram: "https://www.instagram.com/exquisite_demon_3/?igsh=N3dkOWwzOW56dDlz"
    },
    {
        img: "media/mem7.jpg",
        name: "Muhammad Umer",
        role: "Graphic Designer",
        bio: "Expert in brand identity, creative graphics, UI visuals, and commercial design for modern digital brands.",
        linkedin: "https://www.instagram.com/x.umzz?igsh=ZXNvdWs3cjJja256&utm_source=qr",
        instagram: "https://www.instagram.com/x.umzz?igsh=ZXNvdWs3cjJja256&utm_source=qr"
    },
    {
        img: "media/member2.jpg",
        name: "Masum Kabir",
        role: "Full Stack Web Developer",
        bio: "Experienced Full Stack Web Developer skilled in building modern, scalable web applications. Passionate about clean code and delivering strong user experiences.",
        linkedin: "https://www.instagram.com/__masumkabir__?igsh=anMxamI5eG1pb3N5",
        instagram: "https://www.instagram.com/__masumkabir__?igsh=anMxamI5eG1pb3N5"
    },
    {
        img: "media/ceo.jpg",
        name: "Fahim Imtiaz",
        role: "Web Developer & Java Developer",
        bio: "Web Developer and Java Developer skilled in building responsive, efficient, and scalable web applications. Experienced in front-end technologies and backend Java development, focused on delivering clean code and optimal user experiences.",
        linkedin: "https://www.linkedin.com/in/md-fahim-imtiaz-khan-7558782ab/",
        instagram: "https://www.instagram.com/exquisite_demon_3/?igsh=N3dkOWwzOW56dDlz"
    },
    {
        img: "media/member4.jpeg",
        name: "Nusrat Jahan",
        role: "Social Media Manager",
        bio: "Specialist in content strategy, brand growth, social media ads, and maintaining strong digital presence for brands.",
        linkedin: "https://www.linkedin.com/in/md-fahim-imtiaz-khan-7558782ab/",
        instagram: "https://www.instagram.com/exquisite_demon_3/?igsh=N3dkOWwzOW56dDlz"
    },
    {
        img: "media/member5.jpg",
        name: "Kantom Prio",
        role: "Marketing Specialist",
        bio: "Focuses on customer acquisition, paid campaigns, sales funnel building, and business positioning.",
        linkedin: "https://www.instagram.com/priiioo?igsh=eGVuc2J1aHJldGh4",
        instagram: "https://www.instagram.com/priiioo?igsh=eGVuc2J1aHJldGh4"
    },
    {
        img: "media/member6.jpg",
        name: "Shams Anam",
        role: "Ads Expert",
        bio: "Performance marketer with expertise in Facebook Ads, TikTok Ads, Google Ads, and ROI optimization.",
        linkedin: "https://www.instagram.com/shams_anam69?igsh=MWYzczRuMnhkbGEwcw==",
        instagram: "https://www.instagram.com/shams_anam69?igsh=MWYzczRuMnhkbGEwcw=="
    }
];


/* --------------------------------------------------
   MODAL OPEN / CLOSE
-------------------------------------------------- */
function openModal(index){
    const modal = document.getElementById("teamModal");
    modal.classList.add("active");

    document.getElementById("modalImg").src = members[index].img;
    document.getElementById("modalName").textContent = members[index].name;
    document.getElementById("modalRole").textContent = members[index].role;
    document.getElementById("modalBio").textContent = members[index].bio;
     document.getElementById("modalLinkedin").href = members[index].linkedin;
    document.getElementById("modalInstagram").href = members[index].instagram;
}

function closeModal(){
    const modal = document.getElementById("teamModal");
    modal.classList.remove("active");
}

// Close modal on clicking outside content
window.addEventListener("click", (e) => {
    const modal = document.getElementById("teamModal");
    if (e.target === modal) modal.classList.remove("active");
});


/* --------------------------------------------------
   3D TILT EFFECT
-------------------------------------------------- */
document.querySelectorAll(".tilt").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / 15);
        const rotateY = ((centerX - x) / 15);

        card.style.transform = `
            perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.07)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(800px) scale(1)";
    });
});


/* --------------------------------------------------
   PARTICLE BACKGROUND
-------------------------------------------------- */
const canvas = document.getElementById("teamParticleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for(let i=0; i<70; i++){
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.6 - 0.3,
        speedY: Math.random() * 0.6 - 0.3
    });
}

function animateParticles(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if(p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if(p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.fillStyle = "#0ef";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#0ef";

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


/* --------------------------------------------------
   HIDE HEADER ON SCROLL
-------------------------------------------------- */
let lastScrollY = window.scrollY;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;

  // Always show when at the very top
  if (currentY <= 0) {
    header.classList.remove('header-hidden');
    lastScrollY = currentY;
    return;
  }

  if (currentY > lastScrollY) {
    // Scrolling down → hide
    header.classList.add('header-hidden');
  } else {
    // Scrolling up → show
    header.classList.remove('header-hidden');
  }

  lastScrollY = currentY;
});

