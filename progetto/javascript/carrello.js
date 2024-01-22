var scarpe = [];
var magliette = [];
var pantaloni = [];
var cookieStr = [];

function estraiCookie() {
  if (cookieStr.length > 2 && controlloScadenza(cookieStr[1])) {
    for (var i = 2; i < cookieStr.length; i++) {
      var valSalvato = cookieStr[i].split("=");
      var tipoProdotto = valSalvato[0];
      var prodotto = valSalvato[1];
      smistaProdotti(tipoProdotto, prodotto);
    }
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

  creaElementiPerProdotto(scarpe, "contenitoreScarpe");
  creaElementiPerProdotto(magliette, "contenitoreMagliette");
  creaElementiPerProdotto(pantaloni, "contenitorePantaloni");
}
