const codes = {};

document.getElementById("codeInput").addEventListener("keydown", e => {
  if (e.key !== "Enter") return;
  const val = e.target.value.trim().toLowerCase();
  if (codes[val]) {
    codes[val]();
    e.target.value = "";
  } else {
    e.target.value = "";
  }
});
