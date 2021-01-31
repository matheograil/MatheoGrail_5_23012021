//Calcul du nombre de produits dans le panier.
let myCart;

try {
	myCart = JSON.parse(localStorage.getItem('myCart'));
} catch(err) {
	myCart = null;
} finally {
	let numberProductsInCart;
	if (myCart == null) {
		numberProductsInCart = 0;
	} else {
		numberProductsInCart = myCart.length;
	}
	//DOM.
	document.querySelector('.myCartCount').textContent = `Mon panier (${numberProductsInCart})`;
}