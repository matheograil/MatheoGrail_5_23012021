//Récupération des produits enregistrés dans le panier.
let myCart;
let totalPrice = 0;

try {
	myCart = JSON.parse(localStorage.getItem('myCart'));
} catch(err) {
	myCart == null;
} finally {
	for (data in myCart) {
		let priceWithoutCents = (myCart[data]['price']*myCart[data]['amount'])/100;
		totalPrice = totalPrice + priceWithoutCents;
		//DOM.
		document.querySelector('.myCart__items').insertAdjacentHTML('beforeend', `<a href="selectedProduct.html?id=${myCart[data]['_id']}"><div class="myCart__item"><img class="myCart__img" src="${myCart[data]['imageUrl']}"><div class="myCart__description"><p><code>${myCart[data]['amount']}x</code> ${myCart[data]['name']}</p><p class="myCart__price">${priceWithoutCents}€</p></div></div></a>`);
	}
}

//Affichage du prix total du panier.
document.querySelector('.myCart__title').textContent = `Mon panier (${totalPrice}€)`;