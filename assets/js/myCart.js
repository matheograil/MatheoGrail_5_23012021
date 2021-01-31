//Récupération des produits enregistrés dans le panier.
myCart = JSON.parse(localStorage.getItem('myCart'));

for (data in myCart) {
	//DOM.
	let priceWithoutCents = myCart[data]['price']/100;
	document.querySelector('.myCart__items').insertAdjacentHTML('beforeend', `<div class="myCart__item"><img class="myCart__img" src="${myCart[data]['imageUrl']}"><div class="myCart__description"><p>${myCart[data]['name']}</p><p class="myCart__price">${priceWithoutCents}€</p></div></div>`);
}
