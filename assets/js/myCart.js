function myCart(refresh) {
	let myCart;
	let totalPrice = 0;

	try {
		myCart = JSON.parse(localStorage.getItem('myCart'));
	} catch(err) {
		myCart == null;
	} finally {
		//On enlève les anciens élements du panier.
		if (refresh == true) {
			let element = document.querySelector('.myCart__items');
			while (element.firstChild) {
				element.removeChild(element.firstChild);
			}
		}
		for (i in myCart) {
			let priceWithoutCents = (myCart[i]['price']*myCart[i]['amount'])/100;
			totalPrice = totalPrice + priceWithoutCents;
			//DOM.
			document.querySelector('.myCart__items').insertAdjacentHTML('beforeend', `<a href="selectedProduct.html?id=${myCart[i]['_id']}"><div class="myCart__item"><img class="myCart__img" src="${myCart[i]['imageUrl']}"><div class="myCart__description"><p><code>${myCart[i]['amount']}x</code> ${myCart[i]['name']}</p><p class="myCart__price">${priceWithoutCents}€</p></div></div></a>`);
		}
	}

	//Affichage du prix total du panier.
	document.querySelector('.myCart__title').textContent = `Mon panier (${totalPrice}€)`;
}

//Récupération des produits enregistrés dans le panier.
myCart();

//On écoute les évènements pour savoir quand supprimer le panier.
document.querySelector('#deleteMyCart').addEventListener('click', function() {
	localStorage.removeItem('myCart');
	myCartCount();
	myCart(true);
});