var scarpe = [];
var magliette = [];
var pantaloni = [];


function estraiCookie(cookieStr) {
  if (cookieStr.length > 2 && controlloScadenza(cookieStr[1])) {
    for (var i = 2; i < cookieStr.length; i++) {
      var tipoProdotto = cookieStr[i].tipo;
      var prodotto = cookieStr[i].quantita;
      console.log(tipoProdotto, prodotto)
      smistaProdotti(tipoProdotto, prodotto);
    }
  } else {
    window.location.href = "../index.html";
    alert("C'è stato un errore inaspettato ricominciare la sessione!");
  }

}
function smistaProdotti(primo, secondo) {
  if (primo.includes("Scarpe")) {
    scarpe.push({ tipo: primo, quantita: secondo });
  } else if (primo.includes("Magliette")) {
    magliette.push({ tipo: primo, quantita: secondo });
  } else if (primo.includes("Pantaloni")) {
    pantaloni.push({ tipo: primo, quantita: secondo });
  }
}

function generaElementiHTML() {
  function creaElementiPerProdotto(arrayProdotti, idContenitore) {
    var contenitore = document.getElementById(idContenitore);
    contenitore.innerHTML = "";

    arrayProdotti.forEach((prodotto) => {
      var nodo = document.createElement("div");
      nodo.innerHTML = `Tipo: ${prodotto.tipo}, Quantità: ${prodotto.quantita}`;
      contenitore.appendChild(nodo);
    });
  }
console.log(scarpe.length);
  creaElementiPerProdotto(scarpe, "contenitoreScarpe");
  creaElementiPerProdotto(magliette, "contenitoreMagliette");
  creaElementiPerProdotto(pantaloni, "contenitorePantaloni");
}
window.onload = function () {
  cookieStr = JSON.parse(localStorage.getItem("cookieStr")) || [];
  estraiCookie(cookieStr);
  generaElementiHTML();
}