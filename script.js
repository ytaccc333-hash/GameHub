
// 🔑 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDJ7PGMsLzI_s9U5x-FZSHOv0cEjw3lC44",
  authDomain: "homejpagey.firebaseapp.com",
  databaseURL: "https://homejpagey-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "homejpagey"
};

// INIT
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// -------------------- LOGIN --------------------
function checkCode() {
  const code = document.getElementById("codeInput").value;
  const error = document.getElementById("error");

  if (code === "JY521") {
    document.getElementById("loginScreen").classList.remove("active");
    document.getElementById("mainScreen").classList.add("active");
  } else {
    error.textContent = "Wrong code!";
  }
}


// -------------------- TABS --------------------
function showTab(tabId) {
  document.querySelectorAll("#mainScreen .tab").forEach(t => {
    t.classList.remove("active");
  });

  const el = document.getElementById(tabId);
  if (el) el.classList.add("active");
}


// -------------------- ADMIN --------------------
function openAdmin() {
  const code = prompt("Enter admin code:");

  if (code === "7765") {
    document.getElementById("mainScreen").classList.remove("active");
    document.getElementById("adminScreen").classList.add("active");
  } else {
    alert("Wrong admin code");
  }
}

function closeAdmin() {
  document.getElementById("adminScreen").classList.remove("active");
  document.getElementById("mainScreen").classList.add("active");
}


// -------------------- REAL-TIME GAMES --------------------
db.ref("games").on("value", (snap) => {
  const data = snap.val();
  const el = document.getElementById("gamesList");

  el.innerHTML = "";

  if (!data) return;

  Object.values(data).forEach(i => {
    if (i?.name && i?.url) {
      el.innerHTML += `<a href="${i.url}" target="_blank">${i.name}</a>`;
    }
  });
});


// -------------------- REAL-TIME SITES --------------------
db.ref("sites").on("value", (snap) => {
  const data = snap.val();
  const el = document.getElementById("sitesList");

  el.innerHTML = "";

  if (!data) return;

  Object.values(data).forEach(i => {
    if (i?.name && i?.url) {
      el.innerHTML += `<a href="${i.url}" target="_blank">${i.name}</a>`;
    }
  });
});


// -------------------- SEARCH (FIXED SCOPE) --------------------
function searchLinks() {
  const input = document.getElementById("search").value.toLowerCase();

  const visibleLinks = document.querySelectorAll(".tab.active a");

  visibleLinks.forEach(link => {
    const match = link.innerText.toLowerCase().includes(input);
    link.style.display = match ? "block" : "none";
  });
}
