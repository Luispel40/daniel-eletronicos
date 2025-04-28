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

    data.push(rowData);
  }

  console.log(data);

  const gridProducts = document.querySelector(".grid-products");
  gridProducts.innerHTML = "";

  data.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.innerHTML = `
      <img src="${product.image}" alt="" />
      <div class="info"></div>
        <h3>${product.productName} <span>${product.value}</span></h3>
        <p>${product.description}</p>
        <button>
          <a href="./product/" class="button">saber mais</a>
        </button>
      </div>
    `;

    gridProducts.appendChild(productElement);
  });

}

const addProducts = () => {
  pushTableFromSheets();
  
};

addProducts();

