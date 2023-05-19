/*  Pobieranie danych za pomocą fetch api */
const product_container = document.querySelector('#product_container');
const dropbtn_number = document.querySelector('.dropbtn--number');
let n = 4; // default number of products
fetchProduct(n);

function dropDownId(element)
    {
        var dropDownId = element.dataset.dropdownId;
        let n;
        n = dropDownId;
        product_container.innerHTML ='';
        dropbtn_number.innerHTML = n;
        fetchProduct(n);
        console.log(n);

    }

function fetchProduct(n){
    fetch("https://www.mamezi.pl/praca/front/products/data.json")
        .then(res => res.json())
        .then(data => {
            const products = data.list;
            console.log(data.list);
            for(let i=0;i<n;i++){
                loadProducts(products[i]);
            }
        })
}
/* Ładowanie produktów z szablonu*/
function loadProducts(product) {

    const template = document.querySelector("#product-template");
    const clone = template.content.cloneNode(true);

    const avibilityName = clone.querySelector(".availability-name");
    avibilityName.innerHTML = product.availability.name;
    const promoPrice = clone.querySelector(".promo-price");
    promoPrice.innerHTML = product.price.gross.base_float - product.price.gross.final_float+` zł`;
    const productImg = clone.querySelector(".product-img");
    productImg.innerHTML = `<img alt="Zdjęcie produktu" src="https://www.mamezi.pl/praca/front/products/upload/${product.main_image}.png">`;
    const productFinalPrice = clone.querySelector(".final-price");
    productFinalPrice.innerHTML = product.price.gross.final_float+` zł`;
    const productBasePrice = clone.querySelector(".base-price");
    productBasePrice.innerHTML = product.price.gross.base_float+` zł`;
    const productName = clone.querySelector(".name");
    productName.innerHTML = product.name;
    const producerName = clone.querySelector(".producer");
    producerName.innerHTML = product.producer.name;
    product_container.appendChild(clone);

}
