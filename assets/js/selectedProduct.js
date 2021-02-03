//Vérification du produit.
let productSelectedId = new URLSearchParams(window.location.search).get('id');
let productSelectedData;

fetch(`http://localhost:3000/api/cameras/${productSelectedId}`)
	.then((response) => {
		return response.json();
	})
	.then((productSelected) => {
		productSelectedData = productSelected;
		//DOM.
		document.title = `Orinico - ${productSelected['name']}`;
		document.querySelector('meta[name="description"]').setAttribute('content', productSelected['description']);
		document.querySelector('.selectedProduct__title').textContent = productSelected['name'];
		document.querySelector('img[class="selectedProduct__img"]').setAttribute('src', productSelected['imageUrl']);
		document.querySelector('.selectedProduct__name').textContent = 'Produit → ' + productSelected['name'];
		document.querySelector('.selectedProduct__description').textContent = 'Description → ' + productSelected['description'];
		document.querySelector('.selectedProduct__price').textContent = 'Prix → ' + productSelected['price']/100 + '€';

		for (i in productSelected['lenses']) {
			document.querySelector('.selectedProduct__selector').insertAdjacentHTML('beforeend', `<option value="${i}">${productSelected['lenses'][i]}</option>`);
		}
	})
	.catch((err) => {
		//Si une erreur se produit.
		document.write("Nous sommes désolés, mais une erreur s'est produite. Nous allons vous rediriger dans quelques instants.");
		setTimeout(function(){
			window.location='index.html';
		}, 5000);
	})

//On écoute les évènements pour savoir quand ajouter l'article au panier.
document.querySelector('.button').addEventListener('click', function() {
	let myCart;

	try {
		myCart = JSON.parse(localStorage.getItem('myCart'));
	} catch(err) {
		localStorage.removeItem('myCart');
		myCart = null;
	} finally {
		addProductInCart(myCart);
		myCartCount();
		document.querySelector('.button').textContent = '✅ Produit ajouté';
		setTimeout(function(){
			document.querySelector('.button').textContent = '🛍️ Ajouter au panier';
		}, 1000);
	}
});

function addProductInCart(myCart) {
	if (myCart == null) {
		productSelectedData['amount'] = 1;
		myCart = [productSelectedData];
		localStorage.setItem('myCart', JSON.stringify(myCart));
	} else {
		let productAlreadyInCart = false;
		for (i in myCart) {
			if (myCart[i]['_id'] == productSelectedData['_id']) {
				myCart[i]['amount']++;
				localStorage.setItem('myCart', JSON.stringify(myCart));
				productAlreadyInCart = true;
				break;
			}
		}
		if (productAlreadyInCart != true) {
			productSelectedData['amount'] = 1;
			myCart.push(productSelectedData);
			localStorage.setItem('myCart', JSON.stringify(myCart));
		}
	}
}
