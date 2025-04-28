async function pushTableFromSheets(params) {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-Ec4yQHAejSfAOK_Y6emKGU2kL7rB2q5iCOsdR-6MGZrThUUuxfYsNvoIwmdA4Mtx831qkJFhG7GT/pubhtml?gid=0&single=true"
  );
  const html = await response.text();
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  const table = tempElement.querySelector("tbody");

  const rows = table.querySelectorAll("tr");
  const data = [];

  const headers = Array.from(rows[0].querySelectorAll("td")).map((td) =>
    td.innerText.trim()
  );

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cells = Array.from(row.querySelectorAll("td")).map((td) =>
      td.innerText.trim()
    );

    const rowData = {};
    headers.forEach((header, index) => {
      rowData[header] = cells[index] || ""; // Se não tiver dado, coloca string vazia
    });

    rowData.index = i - 1;

    data.push(rowData);
  }

  console.log(data);

  const paramsFromUrl = new URLSearchParams(window.location.search);
  const id = paramsFromUrl.get("id");

  const product = data.find((product) => product.index == id);
  const h3 = document.querySelector(".info h3");
  const span = document.querySelector("span");
  span.innerText = product.offer && "R$ " + product.offer || ``;
  h3.innerText = product.productName + " " + span.innerHTML;

  const p = document.querySelector("p");
  p.innerText = product.description;

  const img = document.querySelector(".product img");
  img.src = product.image;

  
}

pushTableFromSheets();
