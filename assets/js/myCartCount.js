//Calcul du nombre de produits dans le panier.
let myCart = sessionStorage.getItem('myCart');
let numberProductsInCart = 0;

let productsInCart = JSON.parse(myCart);
for (data in productsInCart) {
    numberProductsInCart++;
}

let div = document.querySelector('.myCart');
div.textContent = `Mon panier (${numberProductsInCart})`;