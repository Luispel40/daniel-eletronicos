const data = [];

async function pushTableFromSheets(params) {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQi5zr7ghSpQbiwx1QWPmgPHl6_wZvmxmzATwXUIu3n5bkJJ3FZMA6gw-TscGjdiamFE30pk3kWS92l/pubhtml"
  );
  const html = await response.text();
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  const table = tempElement.querySelector("tbody");

  const rows = table.querySelectorAll("tr");

  let postsCount = 0;
  const postsLimit = 6;

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

  sessionStorage.setItem("data", JSON.stringify(data));

  const gridProducts1 = document.querySelector("#grid-products-1");
  gridProducts1.innerHTML = "";

  data.forEach((product, index) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    if (index >= postsLimit) {
      productElement.style.display = "none";
    }
    productElement.id = product.index;
    productElement.className +=
      " " +
      product.category.toLowerCase().split(" ").join("") +
      " " +
      `${product.avaliable ? "" : "unavaliable"}`;

    productElement.innerHTML = `
      <img src="${product.image}" alt="" id="${product.index}"/>
      <div class="info">
        <h3>${product.productName} 
        ${
          product.offer
            ? `<span>de <s>${product.value}</s> por ${product.offer}</span>`
            : `<span> ${product.value}</span>`
        }</h3>
        <p>${product.description}</p>
        <button >
          <a href="../product/index.html?id=${product.index}" class="button
    }">${product.avaliable ? "Ver Mais" : "Em Breve"}</a>
        </button>
      </div>
    `;

    gridProducts1.appendChild(productElement);
  });
}

const openMoreProducts = () => {
  const products = document.querySelectorAll(".product");
  const seeMoreButton = document.querySelector(".see-more");

  setTimeout(() => {
    products.forEach((product, index) => {
      if (product.style.display === "none") {
        product.style.display = "flex";
        seeMoreButton.innerText = "ver menos";
      } else if (index >= 6 && product.style.display === "flex") {
        product.style.display = "none";
        seeMoreButton.innerText = "ver mais";
      }
    });
  }, 300);
};

const createCategories = () => {
  const categories = document.querySelector(".carousel-categories");
  const categoriesArray = [];

  data.forEach((product) => {
    if (!categoriesArray.includes(product.category)) {
      categoriesArray.push(product.category);
      categoriesArray.sort();
    }
  });

  categoriesArray.forEach((category) => {
    const categoryElement = document.createElement("a");
    categoryElement.classList.add("category");
    categoryElement.innerText = category;
    categories.appendChild(categoryElement);
  });
};

const filterProducts = () => {
  const products = document.querySelectorAll(".product");
  const buttonCategories = document.querySelectorAll(".category");

  let setThisCategory = "";

  buttonCategories.forEach((thisCategory) => {
    thisCategory.addEventListener("click", () => {
      setThisCategory = thisCategory.innerText;
      products.forEach((product) => {
        if (
          product.classList.contains(
            setThisCategory.toLowerCase().split(" ").join("")
          )
        ) {
          product.style.display = "flex";
        } else {
          product.style.display = "none";
        }

        if (setThisCategory === thisCategory.innerText) {
          document.querySelector(".active").classList.remove("active");
          thisCategory.classList.add("active");
          document.querySelector(".see-more").innerText =
            "ver todos os produtos";
          document.querySelector("h3").innerText = setThisCategory;
        }
      });
    });
  });
};

const categoriesButtons = document.querySelectorAll(".category");
categoriesButtons.forEach((categoryButton) => {
  categoryButton.addEventListener("click", filterProducts);
});

const addProducts = async () => {
  await pushTableFromSheets();
  createCategories();
  filterProducts();
};

addProducts();
