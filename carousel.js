let aData = [];

aData = JSON.parse(sessionStorage.getItem('data'));

const carousel = document.getElementById('grid-products-2');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');

console.log(aData);

carousel.innerHTML = '';

let currentSlide = 0;

const createProductsFromCarousel = () => {
    aData.map((product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <div class="info">
                <h3 class="title">${product.productName} <span>R$ ${product.value}</span></h3>
                <p>${product.description}</p>
                <button class="button" onClick="sendToWhatsapp()">Comprar com o vendedor</button>
            </div>
        `;
        carousel.innerHTML += productElement.outerHTML;
    })
}

createProductsFromCarousel();

