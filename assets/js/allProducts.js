//Récupération et affichage des produits.
let request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let allProducts = JSON.parse(this.responseText);
        for (data in allProducts) {
            //DOM.
            let priceWithoutCents = allProducts[data]['price']/100;
            document.querySelector('.products__items').insertAdjacentHTML('beforeend', `<a href="product.html?id=${allProducts[data]['_id']}"><div class="products__item"><img src="${allProducts[data]['imageUrl']}"><div class="products__description"><p>${allProducts[data]['name']}</p><p class="price">${priceWithoutCents}€</p></div></div></a>`);
        }
    }
};

request.open('GET', 'http://localhost:3000/api/cameras');
request.send();