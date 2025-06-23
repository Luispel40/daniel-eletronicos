let aData = [];

aData = JSON.parse(sessionStorage.getItem("data"));

const carousel = document.getElementById("grid-products-2");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

console.log(aData);

carousel.innerHTML = "";

let currentSlide = 0;

const createProductsFromCarousel = () => {
  aData.map((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <div class="info">
                <h3 class="title">${product.productName} ${
      product.offer
        ? `<span>de <s>${product.value}</s> por ${product.offer}</span>`
        : `<span> ${product.value}</span>`
    }</h3>
        </h3>
                <p>${product.description}</p>
                <button >
          <a href="../product/index.html?id=${product.index}" class="button
    }">${product.avaliable ? "Ver Mais" : "Em Breve"}</a>
        </button>
            </div>
        `;
    carousel.innerHTML += productElement.outerHTML;
  });
};

createProductsFromCarousel();
