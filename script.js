function checkCode() {
  const code = document.getElementById("codeInput").value;
  const error = document.getElementById("error");

  if (code === "JY521") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("mainPage").style.display = "block";
  } else {
    error.textContent = "Wrong code!";
  }
}

function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
}

/* SEARCH BAR */
function searchLinks() {
  let input = document.getElementById("search").value.toLowerCase();
  let links = document.querySelectorAll("a");

  links.forEach(link => {
    if (link.innerText.toLowerCase().includes(input)) {
      link.style.display = "block";
    } else {
      link.style.display = "none";
    }
  });
}

/* ADMIN (PLACEHOLDER ONLY) */
function checkAdmin() {
  const code = document.getElementById("adminInput").value;

  if (code === "7765") {
    alert("Admin panel unlocked (not built yet)");
  } else {
    alert("Wrong admin code");
  }
}
