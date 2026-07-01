function checkCode() {
  const code = document.getElementById("codeInput").value;
  const error = document.getElementById("error");

  if (code === "JY521") {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("mainPage").classList.remove("hidden");
  } else {
    error.textContent = "Wrong code!";
  }
}
