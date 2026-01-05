let zoomLevel = 1;
const zoomStep = 0.1;
const zoomMin = 0.7;
const zoomMax = 1.5;

const zoomWrapper = document.getElementById('zoom-wrapper');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');

function applyZoom() {
  zoomWrapper.style.transform = `scale(${zoomLevel})`;
}

zoomInBtn.addEventListener('click', () => {
  if (zoomLevel < zoomMax) {
    zoomLevel += zoomStep;
    applyZoom();
  }
});

zoomOutBtn.addEventListener('click', () => {
  if (zoomLevel > zoomMin) {
    zoomLevel -= zoomStep;
    applyZoom();
  }
});

let selectedBrand = null;

// Coupon logic
const couponCodes = { WELCOME10: 0.10, SAVE20: 0.20 };
document.getElementById("applyCouponBtn").onclick = function () {
  const code = document.getElementById("couponCode").value.trim().toUpperCase();
  const planPriceElem = document.getElementById("plan-price");
  const couponMsg = document.getElementById("couponMsg");
  let basePrice = 199; // Default Professional
  const planText = document.getElementById("plan-type").textContent.toLowerCase();
  if (planText === "starter") basePrice = 99;
  else if (planText === "enterprise") basePrice = 399;

  if (couponCodes[code]) {
    const discount = Math.round(basePrice * couponCodes[code]);
    const finalPrice = basePrice - discount;
    planPriceElem.textContent = `$${finalPrice}`;
    couponMsg.textContent = `Coupon applied! You saved $${discount}.`;
  } else if (code) {
    planPriceElem.textContent = `$${basePrice}`;
    couponMsg.textContent = "Invalid coupon code.";
  } else {
    planPriceElem.textContent = `$${basePrice}`;
    couponMsg.textContent = "";
  }
};

// Show/hide extra fields
function showExtraFields(brand) {
  ["extra-visa", "extra-mastercard", "extra-amex", "extra-discover"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
  if (!brand) return;
  if (brand === "Visa") document.getElementById("extra-visa").style.display = "block";
  else if (brand === "MasterCard") document.getElementById("extra-mastercard").style.display = "block";
  else if (brand === "Amex") document.getElementById("extra-amex").style.display = "block";
  else if (brand === "Discover") document.getElementById("extra-discover").style.display = "block";
}

document.querySelectorAll(".card-icons img").forEach(icon => {
  icon.addEventListener("click", () => {
    document.querySelectorAll(".card-icons img").forEach(i => i.classList.remove("selected"));
    icon.classList.add("selected");
    selectedBrand = icon.getAttribute("data-brand");
    document.getElementById("card-error").style.display = "none";
    showExtraFields(selectedBrand);
  });
});

document.querySelector(".card-number").addEventListener("input", e => {
  let val = e.target.value.replace(/\s+/g, "");
  let autoBrand = null;
  document.querySelectorAll(".card-icons img").forEach(i => i.classList.remove("selected"));

  if (/^4/.test(val)) {
    document.getElementById("icon-visa").classList.add("selected");
    autoBrand = "Visa";
  } else if (/^5/.test(val)) {
    document.getElementById("icon-mastercard").classList.add("selected");
    autoBrand = "MasterCard";
  } else if (/^3[47]/.test(val)) {
    document.getElementById("icon-amex").classList.add("selected");
    autoBrand = "Amex";
  } else if (/^6/.test(val)) {
    document.getElementById("icon-discover").classList.add("selected");
    autoBrand = "Discover";
  }
  selectedBrand = autoBrand;
  document.getElementById("card-error").style.display = "none";
  showExtraFields(selectedBrand);
});

// Main submit handler
function submitDemo(e) {
  e.preventDefault();
  if (!selectedBrand) {
    document.getElementById("card-error").style.display = "block";
    return false;
  }

  document.getElementById("modal").classList.add("show");

  setTimeout(() => {
    document.getElementById("modal").classList.remove("show");

    const planName = document.getElementById("plan-type").textContent;
    const planPrice = document.getElementById("plan-price").textContent;
    const buyerName = document.getElementById("cardholderName").value.trim() || "Guest";
    const buyerEmail = ""; // plug in real email if you have it

    showCuteReceipt({
      planName,
      priceText: planPrice,
      buyer: buyerName,
      email: buyerEmail
    });
  }, 1200);

  return false;
}

// Fallback closeModal (not used in new flow)
function closeModal() {
  const plan = document.getElementById("plan-type").textContent.toLowerCase();
  window.location.href = `index.html?plan=${encodeURIComponent(plan)}`;
}

// Get plan info from URL
const urlParams = new URLSearchParams(window.location.search);
let plan = urlParams.get("plan");
if (plan) {
  document.getElementById("plan-type").textContent =
    plan.charAt(0).toUpperCase() + plan.slice(1);
  document.getElementById("plan-price").textContent =
    plan === "starter" ? "$99" :
    plan === "enterprise" ? "$399" :
    "$199";
}

// Logo canvas drawing
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("logoCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0b1b29";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.shadowColor = "#00fefe";
  ctx.shadowBlur = 18;

  ctx.font = 'bold 26px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#4dffff";
  ctx.fillText("Central", 12, 28);

  ctx.shadowBlur = 12;
  ctx.fillStyle = "#33e0ff";
  ctx.fillText("Advert", 12, 46);

  ctx.shadowBlur = 8;
  ctx.strokeStyle = "#00e5ff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(10, 52);
  ctx.lineTo(170, 52);
  ctx.stroke();
});

// Cute receipt + downloads + Formspree (no auto redirect)
function showCuteReceipt(order) {
  const overlay = document.getElementById("receipt-overlay");
  const card = document.getElementById("receipt-card");
  const idEl = document.getElementById("r-id");
  const planNameEl = document.getElementById("r-plan-name");
  const planPriceEl = document.getElementById("r-plan-price");
  const dateEl = document.getElementById("r-date");
  const buyerEl = document.getElementById("r-buyer");
  const btnPdf = document.getElementById("btn-receipt-pdf");
  const btnPng = document.getElementById("btn-receipt-img");
  const btnJpg = document.getElementById("btn-receipt-jpg");
  const btnHome = document.getElementById("btn-receipt-home");

  const orderId = `NP-${Date.now().toString().slice(-6)}`;
  const orderDate = new Date().toLocaleString();

  idEl.textContent = `Order #${orderId}`;
  planNameEl.textContent = order.planName;
  planPriceEl.textContent = order.priceText;
  dateEl.textContent = orderDate;
  buyerEl.textContent = order.buyer || "Guest";

  overlay.style.display = "flex";

  // Send details to Formspree in background (no redirect)
  fetch("https://formspree.io/f/xldqvkww", {
    method: "POST",
    headers: { "Accept": "application/json" },
    body: new URLSearchParams({
      customer_email: order.email || "",
      plan_name: order.planName,
      plan_price: order.priceText,
      order_id: orderId,
      order_date: orderDate
    })
  }).catch(() => {});

  // PDF
  btnPdf.onclick = () => {
    const opt = {
      margin: 8,
      filename: `receipt-${orderId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a6", orientation: "portrait" }
    };
    html2pdf().set(opt).from(card).save();
  };

  // PNG
  btnPng.onclick = () => {
    html2canvas(card, { scale: 2 }).then(canvas => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `receipt-${orderId}.png`;
      link.click();
    });
  };

  // JPG
  btnJpg.onclick = () => {
    html2canvas(card, { scale: 2 }).then(canvas => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.download = `receipt-${orderId}.jpg`;
      link.click();
    });
  };

  // Go to homepage when user clicks button
  btnHome.onclick = () => {
    const planText = document.getElementById("plan-type").textContent.toLowerCase();
    window.location.href = `index.html?plan=${encodeURIComponent(planText)}`;
  };
}
