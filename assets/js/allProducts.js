//Récupération et affichage des produits.
let request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let allProducts = JSON.parse(this.responseText);
        for (data in allProducts) {
            //DOM.
            let priceWithoutCents = allProducts[data]['price']/100;
            document.querySelector('.allProducts__items').insertAdjacentHTML('beforeend', `<a href="selectedProduct.html?id=${allProducts[data]['_id']}"><div class="allProducts__item"><img class="allProducts__img" src="${allProducts[data]['imageUrl']}"><div class="allProducts__description"><p>${allProducts[data]['name']}</p><p class="allProducts__price">${priceWithoutCents}€</p></div></div></a>`);
        }
    }
};

request.open('GET', 'http://localhost:3000/api/cameras');
request.send();