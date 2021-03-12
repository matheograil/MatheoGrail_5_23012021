//On essaie de récupérer les données de la commande.
try {
    myOrder = JSON.parse(localStorage.getItem('myOrder'));
    //DOM.
    document.querySelector('.thankYou__thanks').innerHTML = `👍 Merci d'avoir commandé sur notre site Internet (${myOrder['totalPrice']}€). Veuillez sauvegarder précieusement l'identifiant de la commande : <code>${myOrder['id']}</code>. Bonne journée !`;
} catch(err) {
    window.location='index.html';
}