//Récupération et affichage des produits.
let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        response = JSON.parse(this.responseText);
        let newD = document.createElement('div');
        for (data in response) {
            let div = document.querySelector('#products__items');
            div.insertAdjacentHTML('beforeend', `<a href="/product/?id=${response[data]['_id']}"><div class="products__item"><img src="${response[data]['imageUrl']}"><div class="products__description"><p>${response[data]['name']}</p><p class="price">${response[data]['price']}€</p></div></div></a>`);
        }
    }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();