//Calcul du nombre de produits dans le panier.
let myCart = JSON.parse(localStorage.getItem('myCart'));
let numberProductsInCart;

if (myCart == null) {
    numberProductsInCart = 0;
}
else {
    numberProductsInCart = myCart.length;
}

//DOM.
document.querySelector('.myCart').textContent = `Mon panier (${numberProductsInCart})`;