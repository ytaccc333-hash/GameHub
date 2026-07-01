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

function showTab(tabId) {
  document.querySelectorAll("#mainScreen .tab").forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
}

/* ADMIN */
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

function showAdminTab(tabId) {
  document.querySelectorAll("#adminScreen .tab").forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
}

/* SEARCH */
function searchLinks() {
  let input = document.getElementById("search").value.toLowerCase();
  let links = document.querySelectorAll("a");

  links.forEach(link => {
    link.style.display = link.innerText.toLowerCase().includes(input)
      ? "block"
      : "none";
  });
}
