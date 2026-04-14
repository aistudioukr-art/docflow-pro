function addRow() {
  const table = document.getElementById("table");
  const row = table.insertRow();

  for (let i = 0; i < 3; i++) {
    const cell = row.insertCell();
    const input = document.createElement("input");
    cell.appendChild(input);
  }
}

async function generate() {
  const rows = [];
  const table = document.getElementById("table");

  for (let i = 1; i < table.rows.length; i++) {
    const cells = table.rows[i].cells;

    rows.push({
      container: cells[0].children[0].value,
      weight: cells[1].children[0].value,
      expiry: cells[2].children[0].value
    });
  }

  const res = await fetch("/generate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      sender: document.getElementById("sender").value,
      consignee: document.getElementById("consignee").value,
      rows
    })
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "certificates.zip";
  a.click();
}