function showPage(page) {
  document.getElementById("generator").style.display = "none";
  document.getElementById("history").style.display = "none";

  document.getElementById(page).style.display = "block";
}

async function loadHistory() {
  const user = document.getElementById("login").value;

  const res = await fetch(`/history/${user}`);
  const data = await res.json();

  const div = document.getElementById("historyList");
  div.innerHTML = "";

  data.forEach(d => {
    const el = document.createElement("div");
    el.innerText = d.file;
    div.appendChild(el);
  });
}
