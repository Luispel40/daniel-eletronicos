let aData = [];

aData = JSON.parse(sessionStorage.getItem("data"));

const carousel = document.getElementById("grid-products-2");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

let currentSlide = 0;

const createProductsFromCarousel = () => {
  aData.map((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.id = product.index;
    productElement.className +=
      " " +
      product.category.toLowerCase().split(" ").join("") +
      " " +
      `${product.avaliable ? "" : "unavaliable"}`;
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


const nextSlide = () => {
  const products = document.querySelectorAll(".carousel .product");
  products.forEach((product) => {
    firstProduct = products[0];
    firstProduct.style.width = "0px";
    document.querySelector(".prev").style.opacity = "1";
    document.querySelector(".prev").style.pointerEvents = "all";
    setTimeout(() => {
      firstProduct.remove();
      carousel.appendChild(firstProduct);
      firstProduct.removeAttribute('style')
    }, 400);
  });
};

const prevSlide = () => {
  const products = document.querySelectorAll(".carousel .product");
  products.forEach((product) => {
    lastProduct = products[products.length - 1];
    lastProduct.style.width = "0px";
    lastProduct.remove();
    carousel.prepend(lastProduct);
    setTimeout(() => {
      lastProduct.removeAttribute('style')
    }, 10);
  });
};

createProductsFromCarousel();
