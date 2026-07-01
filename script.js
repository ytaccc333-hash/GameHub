
// ================= FIREBASE =================
const firebaseConfig = {
  apiKey: "AIzaSyDJ7PGMsLzI_s9U5x-FZSHOv0cEjw5lC44",
  authDomain: "homejpagey.firebaseapp.com",
  databaseURL: "https://homejpagey-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "homejpagey"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// ================= LOGIN =================
function checkCode() {
  const code = document.getElementById("codeInput").value;

  if (code === "JY521") {
    document.getElementById("loginScreen").classList.remove("active");
    document.getElementById("mainScreen").classList.add("active");
  } else {
    document.getElementById("error").textContent = "Wrong code!";
  }
}


// ================= MAIN TABS =================
function showTab(tabId) {
  document.querySelectorAll("#games, #sites").forEach(tab => {
    tab.style.display = "none";
  });

  const target = document.getElementById(tabId);
  if (target) target.style.display = "block";
}


// ================= ADMIN POPUP =================
function openAdmin() {
  document.getElementById("adminPopup").classList.remove("hidden");
}

function closeAdminPopup() {
  document.getElementById("adminPopup").classList.add("hidden");
  document.getElementById("adminError").textContent = "";
  document.getElementById("adminCodeInput").value = "";
}

function checkAdminCode() {
  const code = document.getElementById("adminCodeInput").value;

  if (code === "7765") {
    closeAdminPopup();
    document.getElementById("adminScreen").classList.add("active");
  } else {
    document.getElementById("adminError").textContent = "Wrong code!";
  }
}


// ================= ADMIN CLOSE =================
function closeAdmin() {
  document.getElementById("adminScreen").classList.remove("active");
}


// ================= ADMIN TABS =================
function adminTab(tabId) {
  document.querySelectorAll("#adminScreen .adminTab").forEach(tab => {
    tab.style.display = "none";
  });

  const target = document.getElementById(tabId);
  if (target) target.style.display = "block";
}


// ================= ADD GAME =================
function addGame() {
  const name = document.getElementById("gameName").value.trim();
  const url = document.getElementById("gameURL").value.trim();

  if (!name || !url) return alert("Fill both fields");

  db.ref("games").push({
    name,
    url
  });

  document.getElementById("gameName").value = "";
  document.getElementById("gameURL").value = "";
}


// ================= ADD SITE =================
function addSite() {
  const name = document.getElementById("siteName").value.trim();
  const url = document.getElementById("siteURL").value.trim();

  if (!name || !url) return alert("Fill both fields");

  db.ref("sites").push({
    name,
    url
  });

  document.getElementById("siteName").value = "";
  document.getElementById("siteURL").value = "";
}


// ================= LOAD GAMES =================
db.ref("games").on("value", snap => {
  const data = snap.val();
  const el = document.getElementById("gamesList");

  el.innerHTML = "";
  if (!data) return;

  Object.values(data).forEach(item => {
    if (!item?.name || !item?.url) return;

    el.innerHTML += `
      <a class="linkCard" href="${item.url}" target="_blank">
        🎮 ${item.name}
      </a>
    `;
  });
});


// ================= LOAD SITES =================
db.ref("sites").on("value", snap => {
  const data = snap.val();
  const el = document.getElementById("sitesList");

  el.innerHTML = "";
  if (!data) return;

  Object.values(data).forEach(item => {
    if (!item?.name || !item?.url) return;

    el.innerHTML += `
      <a class="linkCard" href="${item.url}" target="_blank">
        🌐 ${item.name}
      </a>
    `;
  });
});


// ================= SEARCH =================
function searchLinks() {
  const input = document.getElementById("search").value.toLowerCase();

  document.querySelectorAll(".linkCard").forEach(link => {
    const text = link.innerText.toLowerCase();
    link.style.display = text.includes(input) ? "block" : "none";
  });
}


// ================= ADMIN TOOLS =================
function clearSearch() {
  document.getElementById("search").value = "";
  searchLinks();
}

function reloadData() {
  location.reload();
}
