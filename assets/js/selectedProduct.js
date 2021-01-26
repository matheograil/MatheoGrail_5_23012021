//Vérification du produit.
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let productSelectedId = urlParams.get('id');

let request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let allProducts = JSON.parse(this.responseText);

        let productSelected;
        let productSelectedIdIsValid;
        for (data in allProducts) {
            if (allProducts[data]['_id'] == productSelectedId) {
                productSelectedIdIsValid = true;
                //On en profite pour sauvegarder le contenu du produit pour plus tard.
                productSelected = allProducts[data];
                break;
            }
        }
        if (productSelectedIdIsValid != true) {
            document.location.href='../'; 
        }

        //DOM.
        document.title = `Orinico - ${productSelected['name']}`;
        document.querySelector('meta[name="description"]').setAttribute('content', productSelected['description']);

        let div = document.querySelector('.selectedProduct__title');
        div.textContent = productSelected['name'];
        document.querySelector('img[class="selectedProduct__img"]').setAttribute('src', productSelected['imageUrl']);
        div = document.querySelector('.selectedProduct__name');
        div.textContent = 'Produit → ' + productSelected['name'];
        div = document.querySelector('.selectedProduct__description');
        div.textContent = 'Description → ' + productSelected['description'];
        div = document.querySelector('.selectedProduct__price');
        div.textContent = 'Prix → ' + productSelected['price']/100 + '€';

        let i = 0;
        for (data in productSelected['lenses']) {
            let newDiv = document.querySelector('.selectedProduct__options');
            newDiv.insertAdjacentHTML('beforeend', `<option value="${i}">${productSelected['lenses'][i]}</option>`);
            i++;
        }
    }
};

request.open('GET', 'http://localhost:3000/api/cameras');
request.send();

//On écoute les évènements pour savoir quand ajouter l'article au panier.
let button = document.querySelector('.button');
button.addEventListener('click', function() {
    let lenseSelected = document.querySelector('.selectedProduct__options');
    let strUser = lenseSelected.value;

    //...

    window.alert('Article ajouté au panier !');
    document.location.reload();
});
