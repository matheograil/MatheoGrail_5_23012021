//Vérification du produit.
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let productSelectedId = urlParams.get('id')

let request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let allProducts = JSON.parse(this.responseText);
        let productSelectedIdIsValid;

        for (data in allProducts) {
            if (allProducts[data]['_id'] == productSelectedId) {
                productSelectedIdIsValid = true;
                break;
            }
        }
        if (productSelectedIdIsValid != true) {
            document.location.href='../'; 
        }
    }
};

request.open('GET', 'http://localhost:3000/api/cameras');
request.send();

