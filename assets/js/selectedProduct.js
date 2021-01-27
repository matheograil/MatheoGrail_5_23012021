//Vérification du produit.
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let productSelectedId = urlParams.get('id');

let request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let productSelected = JSON.parse(this.responseText);

        //DOM.
        document.title = `Orinico - ${productSelected['name']}`;
        document.querySelector('meta[name="description"]').setAttribute('content', productSelected['description']);
        document.querySelector('.selectedProduct__title').textContent = productSelected['name'];
        document.querySelector('img[class="selectedProduct__img"]').setAttribute('src', productSelected['imageUrl']);
        document.querySelector('.selectedProduct__name').textContent = 'Produit → ' + productSelected['name'];
        document.querySelector('.selectedProduct__description').textContent = 'Description → ' + productSelected['description'];
        document.querySelector('.selectedProduct__price').textContent = 'Prix → ' + productSelected['price']/100 + '€';

        let i = 0;
        for (data in productSelected['lenses']) {
            let newDiv = document.querySelector('.selectedProduct__options');
            newDiv.insertAdjacentHTML('beforeend', `<option value="${i}">${productSelected['lenses'][i]}</option>`);
            i++;
        }
    }
};

request.open('GET', `http://localhost:3000/api/cameras/${productSelectedId}`);
request.send();

//On écoute les évènements pour savoir quand ajouter l'article au panier.
document.querySelector('.button').addEventListener('click', function() {
    let selectedOption = document.querySelector('.selectedProduct__options').value;

    let myCart = JSON.parse(localStorage.getItem('myCart'));
    if (myCart == null) {
        myCart = [[productSelectedId, selectedOption]];
        localStorage.setItem('myCart', JSON.stringify(myCart));
    }
    else {
        let newProductInCart = myCart.push(productSelectedId);
        localStorage.setItem('myCart', JSON.stringify(myCart));
    }

    window.alert('Article ajouté au panier !');
    document.location.reload();
});
