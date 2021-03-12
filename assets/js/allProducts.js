//Récupération des produits.
fetch('http://localhost:3000/api/cameras')
    .then((response) => {
        return response.json();
    })
    .then((allProducts) => {
        for (i in allProducts) {
            //DOM.
            let priceWithoutCents = allProducts[i]['price']/100;
            document.querySelector('.allProducts__items').insertAdjacentHTML('beforeend', `<a href="selectedProduct.html?id=${allProducts[i]['_id']}"><div class="allProducts__item"><img class="allProducts__img" src="${allProducts[i]['imageUrl']}"><div class="allProducts__description"><p>${allProducts[i]['name']}</p><p class="allProducts__price">${priceWithoutCents}€</p></div></div></a>`);
        }
    })
    .catch((err) => {
        //Si une erreur se produit.
        document.write("Nous sommes désolés, mais la connexion à l'API est impossible. Rafraîchissement de la page dans 10 secondes...");
        setTimeout(function(){
            document.location.reload();
        }, 10000);
    })