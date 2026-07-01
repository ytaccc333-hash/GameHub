// 🔑 YOUR FIREBASE CONFIG (PASTE YOURS HERE)
const firebaseConfig = {
  apiKey: "AIzaSyDJ7PGMsLzI_s9U5x-FZSHOv0cEjw3lC44",
  authDomain: "homejpagey.firebaseapp.com",
  databaseURL: "https://homejpagey-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "homejpagey"
};

// INIT
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// LOGIN
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


// TABS
function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}


// ADMIN
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


// REAL-TIME GAMES
db.ref("games").on("value", (snap) => {
  const data = snap.val();
  const el = document.getElementById("gamesList");
  el.innerHTML = "";

  if (data) {
    Object.values(data).forEach(i => {
      el.innerHTML += `<a href="${i.url}" target="_blank">${i.name}</a>`;
    });
  }
});


// REAL-TIME SITES
db.ref("sites").on("value", (snap) => {
  const data = snap.val();
  const el = document.getElementById("sitesList");
  el.innerHTML = "";

  if (data) {
    Object.values(data).forEach(i => {
      el.innerHTML += `<a href="${i.url}" target="_blank">${i.name}</a>`;
    });
  }
});


// SEARCH
function searchLinks() {
  const input = document.getElementById("search").value.toLowerCase();
  const links = document.querySelectorAll("a");

  links.forEach(l => {
    l.style.display = l.innerText.toLowerCase().includes(input)
      ? "block"
      : "none";
  });
}
