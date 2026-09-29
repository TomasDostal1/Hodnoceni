async function rateProduct(rating) {
  console.log("Uživatel ohodnotil", rating);

  await sql(`INSERT INTO hodnoceni (hodnota) VALUES ('${rating}')`);

  location.reload();
}

async function showData() {
  const rows = await sql(`
    SELECT hodnota, COUNT(*) AS pocet
    FROM hodnoceni
    GROUP BY hodnota
  `);

  const counts = [0, 0, 0, 0, 0];

  rows.forEach((row) => {
    counts[Number(row.hodnota) - 1] = Number(row.pocet);
  });

  const graphDisplay = document.getElementById("graphDisplay");
  graphDisplay.innerHTML = "";

  counts.forEach((count, index) => {
    const column = document.createElement("div");
    column.className = "column";

    column.innerHTML = `
      <span class="count">${count}</span>
      <div class="bar" style="height: ${Math.max(count * 30, 4)}px"></div>
      <span class="label">${index + 1}</span>
    `;

    graphDisplay.appendChild(column);
  });
}

document.addEventListener("DOMContentLoaded", showData);
