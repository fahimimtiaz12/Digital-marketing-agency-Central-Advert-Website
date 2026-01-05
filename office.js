// Leaflet map + offices logic for offices page

// Custom icon for Head Office (Bangladesh)
const headOfficeIcon = L.divIcon({
  className: 'head-office-marker',
  html: '<div style="background:#3498db;width:32px;height:32px;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:16px;">H</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const regularIcon = L.Icon.Default;

const offices = [
  {
    name: "Dhaka Head Office",
    region: "South Asia",
    lat: 23.8103,
    lng: 90.4125,
    address: "Plot 45, Gulshan Avenue, Dhaka 1212, Bangladesh",
    phone: "+880 2 1234 5678",
    email: "fahimimtiaz992@gmail.com",
    hours: "Sun–Thu: 9AM–6PM",
    isHeadOffice: true
  },
  {
    name: "Mumbai Office",
    region: "South Asia",
    lat: 19.0760,
    lng: 72.8777,
    address: "Andheri East, MIDC, Mumbai 400093, India",
    phone: "+91 22 4567 8901",
    email: "mumbai@centraladvert.com",
    hours: "Mon–Fri: 9:30AM–6:30PM IST",
    isHeadOffice: false
  },
  {
    name: "Lahore Office",
    region: "South Asia",
    lat: 31.5204,
    lng: 74.3587,
    address: "DHA Phase V, Lahore 54890, Pakistan",
    phone: "+92 42 3577 1234",
    email: "lahore@centraladvert.com",
    hours: "Mon–Fri: 9AM–5PM PKT",
    isHeadOffice: false
  },
  {
    name: "Hong Kong HQ",
    region: "Asia",
    lat: 22.3193,
    lng: 114.1694,
    address: "123 Central Boulevard, Central, Hong Kong",
    phone: "+852 1234 5678",
    email: "hk@centraladvert.com",
    hours: "Mon–Fri: 9AM–6PM"
  },
  {
    name: "Singapore Office",
    region: "Asia",
    lat: 1.3521,
    lng: 103.8198,
    address: "10 Raffles Place, Singapore 048619",
    phone: "+65 6123 4567",
    email: "sg@centraladvert.com",
    hours: "Mon–Fri: 8:30AM–5:30PM"
  },
  {
    name: "New York Office",
    region: "North America",
    lat: 40.7128,
    lng: -74.0060,
    address: "456 Madison Ave, New York, NY 10022, USA",
    phone: "+1 212 555 0198",
    email: "ny@centraladvert.com",
    hours: "Mon–Fri: 9AM–5PM EST"
  },
  {
    name: "London Office",
    region: "Europe",
    lat: 51.5074,
    lng: -0.1278,
    address: "789 Oxford Street, London W1D 1BS, UK",
    phone: "+44 20 7946 0958",
    email: "london@centraladvert.com",
    hours: "Mon–Fri: 9AM–5:30PM GMT"
  }
];

window.addEventListener('DOMContentLoaded', () => {
  // Initialize Map
  const map = L.map('map').setView([20, 20], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const cardsContainer = document.getElementById('offices-cards');

  offices.forEach(office => {
    const icon = office.isHeadOffice ? headOfficeIcon : new regularIcon();
    const marker = L.marker([office.lat, office.lng], { icon }).addTo(map);

    const popupContent = `
      <b>${office.name}${office.isHeadOffice ? ' ⭐' : ''}</b><br/>
      ${office.address}<br/>
      📞 ${office.phone}<br/>
      ✉️ ${office.email}<br/>
      🕒 ${office.hours}
    `;
    marker.bindPopup(popupContent);

    const card = document.createElement('div');
    card.className = 'office-card';
    card.dataset.region = office.region;

    const nameDisplay = office.isHeadOffice
      ? `${office.name} <span class="head-office-badge">Head Office</span>`
      : office.name;

    card.innerHTML = `
      <div class="office-info">
        <div class="office-name">${nameDisplay}</div>
        <div class="office-detail">📍 ${office.address}</div>
        <div class="office-detail">📞 ${office.phone}</div>
        <div class="office-detail">✉️ ${office.email}</div>
        <div class="office-detail">🕒 ${office.hours}</div>
      </div>
      <a href="https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}&travelmode=driving"
         target="_blank" class="btn-directions">
        Visit Our Office
      </a>
    `;
    cardsContainer.appendChild(card);
  });

  // Filter logic
  const regionFilter = document.getElementById('region-filter');
  if (regionFilter) {
    regionFilter.addEventListener('change', (e) => {
      const region = e.target.value;
      const cards = document.querySelectorAll('.office-card');
      cards.forEach(card => {
        card.style.display =
          (region === 'all' || card.dataset.region === region) ? 'flex' : 'none';
      });
    });
  }

  // Hide header on scroll
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
    });
  }

  // DARK/LIGHT MODE TOGGLE
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  const savedOfficeTheme = localStorage.getItem('officeTheme');
  if (savedOfficeTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    body.classList.remove('dark-mode');
    if (themeToggle) themeToggle.textContent = '🌙';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
        localStorage.setItem('officeTheme', 'light');
      } else {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
        localStorage.setItem('officeTheme', 'dark');
      }
    });
  }

  // WELCOME CHARACTER MODAL
  const welcomeOverlay = document.getElementById('welcomeOverlay');
  const welcomeClose = document.getElementById('welcomeClose');
  const welcomeLater = document.getElementById('welcomeLater');
  const welcomeExplore = document.getElementById('welcomeExplore');

  const hideWelcome = () => {
    if (welcomeOverlay) welcomeOverlay.classList.remove('active');
  };

  if (welcomeOverlay) {
    setTimeout(() => {
      welcomeOverlay.classList.add('active');
    }, 500);
  }

  if (welcomeClose) welcomeClose.addEventListener('click', hideWelcome);
  if (welcomeLater) welcomeLater.addEventListener('click', hideWelcome);
  if (welcomeExplore) {
    welcomeExplore.addEventListener('click', () => {
      hideWelcome();
      const mapEl = document.getElementById('map');
      if (mapEl) {
        mapEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
