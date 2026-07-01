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
  document.querySelectorAll("#mainScreen .tab").forEach(t => {
    t.classList.remove("active");
  });

  const tab = document.getElementById(tabId);
  if (tab) tab.classList.add("active");
}


// ================= ADMIN OPEN/CLOSE =================
function openAdmin() {
  const code = prompt("Enter admin code:");

  if (code === "7765") {
    document.getElementById("adminScreen").classList.add("active");
  } else {
    alert("Wrong admin code");
  }
}

function closeAdmin() {
  document.getElementById("adminScreen").classList.remove("active");
}


// ================= ADMIN TAB SWITCH (FIXED) =================
function adminTab(tabId) {
  document.querySelectorAll("#adminScreen .adminTab").forEach(t => {
    t.style.display = "none";
  });

  document.getElementById(tabId).style.display = "block";
}


// ================= ADD GAME =================
function addGame() {
  const name = document.getElementById("gameName").value;
  const url = document.getElementById("gameURL").value;

  if (!name || !url) return alert("Fill both fields");

  const newGame = db.ref("games").push();
  newGame.set({
    name: name,
    url: url
  });

  document.getElementById("gameName").value = "";
  document.getElementById("gameURL").value = "";
}


// ================= ADD WEBSITE =================
function addSite() {
  const name = document.getElementById("siteName").value;
  const url = document.getElementById("siteURL").value;

  if (!name || !url) return alert("Fill both fields");

  const newSite = db.ref("sites").push();
  newSite.set({
    name: name,
    url: url
  });

  document.getElementById("siteName").value = "";
  document.getElementById("siteURL").value = "";
}


// ================= REALTIME GAMES =================
db.ref("games").on("value", snap => {
  const data = snap.val();
  const el = document.getElementById("gamesList");

  el.innerHTML = "";

  for (let id in data) {
    el.innerHTML += `<a href="${data[id].url}" target="_blank">${data[id].name}</a>`;
  }
});


// ================= REALTIME SITES =================
db.ref("sites").on("value", snap => {
  const data = snap.val();
  const el = document.getElementById("sitesList");

  el.innerHTML = "";

  for (let id in data) {
    el.innerHTML += `<a href="${data[id].url}" target="_blank">${data[id].name}</a>`;
  }
});


// ================= SEARCH =================
function searchLinks() {
  const input = document.getElementById("search").value.toLowerCase();

  const links = document.querySelectorAll(".tab.active a");

  links.forEach(link => {
    const match = link.innerText.toLowerCase().includes(input);
    link.style.display = match ? "block" : "none";
  });
}
