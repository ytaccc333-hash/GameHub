function checkCode() {
  const code = document.getElementById("codeInput").value;

  if (code === "JY521") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("mainPage").classList.remove("hidden");
  } else {
    document.getElementById("error").innerText = "Wrong code!";
  }
}