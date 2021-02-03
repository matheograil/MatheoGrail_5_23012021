function myCartCount() {
	let myCartCount;

	try {
		myCartCount = JSON.parse(localStorage.getItem('myCart'));
	} catch(err) {
		myCartCount = null;
	} finally {
		let numberProductsInCart = 0;
		for (i in myCartCount) {
			numberProductsInCart = numberProductsInCart + myCartCount[i]['amount'];
		}
		//DOM.
		document.querySelector('.myCartCount').textContent = `Mon panier (${numberProductsInCart})`;
	}
}

//Calcul du nombre de produits dans le panier.
myCartCount();