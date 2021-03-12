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

//On écoute les évènements pour savoir quand valider la commande.
document.querySelector('#checkMyCart').addEventListener('click', function() {
    //Pour afficher les erreurs.
    function showError (message) {
        document.querySelector('#checkMyCart').textContent = `❌ ${message}`;
        setTimeout(function(){
            document.querySelector('#checkMyCart').textContent = '✅  Valider ma commande';
        }, 2000);
    }

    //Le panier est-il vide ?
    if (myCartCount() == 0) {
        showError('Votre panier est vide !');
    } else {
        //Récupération des formulaires.
        let contact = new Object();
        contact.firstName = document.getElementById('firstName').value;
        contact.lastName = document.getElementById('lastName').value;
        contact.address = document.getElementById('address').value;
        contact.city = document.getElementById('city').value;
        contact.email = document.getElementById('email').value;

        let firstAndLastNameCityRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        let addressRegex = /^(\d+) ?([A-Za-z](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$/u;
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        
        //Vérification des données de l'utilisateur.
        if (firstAndLastNameCityRegex.test(contact.firstName) && firstAndLastNameCityRegex.test(contact.lastName) && addressRegex.test(contact.address) && firstAndLastNameCityRegex.test(contact.city) && emailRegex.test(contact.email)) {
            //Préparation des données pour l'API.
            let myCart = JSON.parse(localStorage.getItem('myCart'));
            let totalPrice = 0;
            let products = [];
            for (i in myCart) {
                for (let x = 0; x < myCart[i]['amount']; x++) {
                    products.push(myCart[i]['_id']);
                    totalPrice = totalPrice + myCart[i]['price']/100;
                }
            }
            let orderData = {contact: contact, products: products};

            //Envoie à l'API.
            fetch('http://localhost:3000/api/cameras/order', {method: "POST", body: JSON.stringify(orderData), headers: {"Content-type": "application/json; charset=UTF-8"}})
                .then((response) => {
                    return response.json();
                })
                .then((orderResponse) => {
                    localStorage.removeItem('myCart');
                    let myOrder = new Object();
                    myOrder.id = orderResponse['orderId'];
                    myOrder.totalPrice = totalPrice;
                    localStorage.setItem('myOrder', JSON.stringify(myOrder));
                    window.location='thankYou.html';
                })
                .catch((err) => {
                    //Si une erreur se produit.
                    document.write("Nous sommes désolés, mais une erreur s'est produite. Nous allons vous rediriger dans quelques instants.");
                    setTimeout(function(){
                        window.location='index.html';
                    }, 5000);
                })
        } else {
            showError('Données incorrectes !');
        }
    }
});