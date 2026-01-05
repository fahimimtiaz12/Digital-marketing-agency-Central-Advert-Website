
    function clearLocations() {
      localStorage.removeItem("loginLocations");
      location.reload();
    }
    function goHome() {
      window.location.href = "index.html";
    }
    let loginLocations = JSON.parse(localStorage.getItem("loginLocations") || "[]");
    const container = document.getElementById("locations-list");
    if (loginLocations.length) {
      container.innerHTML = "<ul>" +
        loginLocations.map(loc => `<li>${loc.date}: ${loc.location}</li>`).join("") +
        "</ul>";
    } else {
      container.innerHTML = '<div class="empty-msg">No login locations saved yet.</div>';
    }