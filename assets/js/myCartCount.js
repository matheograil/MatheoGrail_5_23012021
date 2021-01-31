function myCartCount() {
	let myCartCount;

	try {
		myCartCount = JSON.parse(localStorage.getItem('myCart'));
	} catch(err) {
		myCartCount = null;
	} finally {
		let numberProductsInCart;
		if (myCartCount == null) {
			numberProductsInCart = 0;
		} else {
			numberProductsInCart = myCartCount.length;
		}
		//DOM.
		document.querySelector('.myCartCount').textContent = `Mon panier (${numberProductsInCart})`;
	}
}

//Calcul du nombre de produits dans le panier.
myCartCount();