//Vérification du produit.
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let productSelectedId = urlParams.get('id');
let productSelected;

let request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        productSelected = JSON.parse(this.responseText);

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
            document.querySelector('.selectedProduct__options').insertAdjacentHTML('beforeend', `<option value="${i}">${productSelected['lenses'][i]}</option>`);
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
        productSelected['amount'] = 1;
        myCart = [productSelected];
        localStorage.setItem('myCart', JSON.stringify(myCart));
    }
    else {
        i = 0;
        let loopTrue = false;
        for (data in myCart) {
            if (myCart[i]['_id'] == productSelected['_id']) {
                myCart[i]['amount']++;
                localStorage.setItem('myCart', JSON.stringify(myCart));
                loopTrue = true;
                break;
            }
            i++;
        }
        if (loopTrue != true) {
            productSelected['amount'] = 1;
            myCart.push(productSelected);
            localStorage.setItem('myCart', JSON.stringify(myCart));
        }
    }

    window.alert('Article ajouté au panier !');
    document.location.reload();
});
