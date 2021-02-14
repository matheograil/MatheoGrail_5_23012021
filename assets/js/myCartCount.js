function myCartCount() {
	let myCart;

	try {
		myCart = JSON.parse(localStorage.getItem('myCart'));
	} catch(err) {
		myCart = null;
	} finally {
		let numberProductsInCart = 0;
		for (i in myCart) {
			numberProductsInCart = numberProductsInCart + myCart[i]['amount'];
		}
		//DOM.
		document.querySelector('.myCartCount').textContent = `Mon panier (${numberProductsInCart})`;

		return numberProductsInCart;
	}
}

//Calcul du nombre de produits dans le panier.
myCartCount();